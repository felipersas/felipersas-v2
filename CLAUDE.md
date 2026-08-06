# CLAUDE.md

## Project Overview

Bilingual (pt-BR / en) portfolio for Felipe Marques, built on Next.js 16. Its
main feature is a grounded portfolio agent that answers questions about Felipe's
experience, projects, and stack, with browser-local speech-to-text.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
motion, Eve (agent runtime), OpenRouter (model access), Transformers.js (local
Whisper), Vitest

## Development Commands

```bash
npm run dev          # Next dev server; also starts the Eve dev runtime
npm run build        # Build for production
npm run build:agent  # Build the Eve agent
npm run eval:agent   # Run agent evals (strict)
npm run start        # Start production server
npm run test         # Run Vitest suite
npm run lint         # Run ESLint
```

## Architecture

### Directory Structure

```
agent/                      # Eve agent definition (runs server-side)
├── agent.ts                # Model wiring, output ceiling, session limits
├── instructions.md         # System prompt: identity, security, grounding
├── instructions/grounding.ts  # Injects canonical facts on every call
├── channels/eve.ts         # Public channel (no auth, uploads disabled)
└── skills/                 # career, contact, projects — response procedures
evals/                      # Eve eval config (no cases written yet)
src/
├── app/
│   ├── [locale]/           # pt-BR | en
│   │   ├── page.tsx        # Home
│   │   ├── agent/          # Agent chat page
│   │   ├── reading/        # Curated blog links, grouped by category
│   │   └── projects/[slug] # Case study pages (+ per-project OG image)
│   ├── globals.css
│   ├── llms.txt/           # Machine-readable profile for LLMs
│   ├── profile.json/       # Machine-readable profile
│   └── sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
├── components/
│   ├── agent/              # Chat UI, speech input, message parts
│   ├── ai-elements/        # Generic chat primitives (message, conversation)
│   ├── sections/           # Home page sections
│   ├── mdx/                # Code block, media container
│   └── ui/                 # Buttons, dither shader, skill SVGs
├── data/
│   ├── resume.tsx          # All personal data
│   ├── featured-projects.ts # Case studies (slug, tradeoffs, evidence)
│   └── reading-categories.ts # Reading-list categories (ordered, bilingual)
├── hooks/use-translation.tsx
├── i18n/locales/           # en.json, pt-BR.json
├── lib/
│   ├── portfolio-grounding.ts  # Builds the canonical fact block
│   ├── public-profile.ts       # Locale-aware profile projection
│   ├── reading-links.ts        # CSV reader for the reading list
│   └── eve-chat-storage.ts     # localStorage chat persistence
├── workers/                # Whisper transcription worker
└── proxy.ts                # Locale rewriting (Next 16 proxy, not middleware)
```

### Key Patterns

- **Data-driven:** personal data in `src/data/resume.tsx`, case studies in
  `src/data/featured-projects.ts`
- **Career facts live in two places:** `src/data/resume.tsx` (site + agent) and
  `cv/*.yaml` (RenderCV source for the PDFs). `resume-consistency.test.ts`
  asserts they agree on employers, titles, dates, education and credentials —
  edit both, or the suite fails. The PDF pipeline is
  `rendercv render cv/<file>.yaml` → `output/pdf/` → copied into `public/`, and
  `resume-assets.test.ts` guards that copy
- **Agent grounding:** `portfolio-grounding.ts` builds a canonical fact block
  injected on every model call. The agent may only state what appears there —
  see the Knowledge policy in `agent/instructions.md`
- **Agent output is untrusted:** hrefs the model emits are validated in
  `src/components/ai-elements/message.tsx` before becoming links
- **Navigation has no "mode" concept.** There are two persistent pieces, both
  mounted in `[locale]/layout.tsx`: `site-header.tsx` (fixed, 3rem, wordmark +
  résumé + a `⋯` menu holding Leituras, locale, theme and socials) and
  `ask-dock.tsx` (fixed bottom, hidden on `/agent`). The dock is a real GET form
  posting to `/[locale]/agent?prompt=…`, so it works without JavaScript and the
  agent opens already answering. Pages clear the header themselves — the home
  column needs `sm:pt-16` because the artwork is absolutely positioned from `sm`
  up
- **The reading list is the one remote data source.** `src/lib/reading-links.ts`
  reads a Google Sheet published as CSV (`BLOG_LINKS_CSV_URL`) so links can be
  added without a deploy. It never throws: an unset variable, a failed request,
  or a non-CSV response all return `{ links: [], ok: false }`. Because of it,
  `/[locale]` and `/[locale]/reading` are ISR (600s), not fully static
- **Keep the reading list out of `getPublicProfile()`** in
  `src/lib/public-profile.ts`. That single function feeds both the Eve system
  prompt (via `portfolio-grounding.ts`) and the public `llms.txt`, so anything
  added there becomes a claim the agent is allowed to make. The page, the home
  teaser and the sitemap are safe surfaces
- **i18n:** `src/proxy.ts` rewrites locale-less paths; `useTranslation` for
  client copy, `i18n-server.ts` for server
- **Styling:** Tailwind CSS v4, `cn()` utility for class merging
- **Animations:** `motion/react` (not framer-motion)
- **Icons:** skill icons as SVG components in `src/components/ui/svgs/`
- **Theme:** next-themes with light default

### Important Notes

- Default locale is `pt-BR`
- Path alias `@/*` maps to `src/`
- The Eve dev runtime starts alongside `npm run dev`; the agent needs
  `OPENROUTER_API_KEY` in `.env`
- `BLOG_LINKS_CSV_URL` points at the published reading-list sheet. It is
  optional — without it the reading page shows its failure state and the home
  teaser renders nothing
- Agent reply length is steered by the "Response length" section in
  `agent/instructions.md`, **not** by `maxOutputTokens` — that value is only a
  runaway guard, and lowering it truncates replies mid-sentence
- The public agent channel is unauthenticated. `src/proxy.ts` has a per-IP rate
  limiter for `/eve/v1`, but its counter is in-memory and **does not currently
  protect the Vercel deployment** — see the note in that file. Shared state or a
  platform firewall rule is still needed
- Chats persist in localStorage but expire after 24h, so a returning visitor
  gets the empty state instead of a stale transcript

## Dependencies

- **zod**: on v3.x, and it lives in `devDependencies` and is imported nowhere —
  do not reach for it in a Server Component without promoting it first
- **motion**: animation library (import from `motion/react`)
- **eve**: agent runtime; `@openrouter/ai-sdk-provider` for model access
