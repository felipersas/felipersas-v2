# Portfolio Discovery and Agent Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve mobile discovery, project storytelling, contextual agent entry, contact conversion, and machine-readable portfolio discovery.

**Architecture:** Keep `src/data/featured-projects.ts` as the canonical project source and add small server-only serializers for public structured output. Add localized dynamic case-study routes that reuse the same project records, and pass a validated contextual prompt into the existing Eve client instead of creating a second chat flow.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Vercel Eve, Vitest

---

### Task 1: Navigation, visual rhythm, and closing contact

**Files:**
- Modify: `src/components/navbar.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Create: `src/components/sections/contact-footer.tsx`

- [ ] Show the `Portfólio` and `Agente` labels at mobile sizes while preserving the compact bottom navigation.
- [ ] Remove alternating decorative stripe separators so stripes mark only major content groups.
- [ ] Add a localized closing section with email, LinkedIn, résumé, and agent actions.
- [ ] Verify the page at 390×844 and at the default desktop viewport.

### Task 2: Immediate and contextual agent questions

**Files:**
- Modify: `src/app/[locale]/agent/page.tsx`
- Modify: `src/components/agent/portfolio-agent.tsx`
- Modify: `src/components/sections/projects.tsx`

- [ ] Let the agent route accept a bounded `prompt` query parameter.
- [ ] Send initial contextual prompts once after the client mounts.
- [ ] Make empty-state and follow-up suggestions send immediately instead of only filling the textarea.
- [ ] Add a localized “Ask about this project” link to every featured project.
- [ ] Verify direct entry, manual input, reset, and suggestion behavior.

### Task 3: Localized project case studies

**Files:**
- Modify: `src/data/featured-projects.ts`
- Create: `src/app/[locale]/projects/[slug]/page.tsx`
- Create: `src/app/[locale]/projects/[slug]/opengraph-image.tsx`

- [ ] Extend project records with localized challenge, approach, and outcome copy.
- [ ] Generate static params for every locale/project pair.
- [ ] Render a concise case study with evidence, stack, source links, and contextual agent CTA.
- [ ] Generate per-project page metadata and social images from the canonical record.
- [ ] Return `notFound()` for unknown slugs.

### Task 4: Public structured portfolio surfaces

**Files:**
- Create: `src/lib/public-profile.ts`
- Create: `src/lib/public-profile.test.ts`
- Create: `src/app/llms.txt/route.ts`
- Create: `src/app/profile.json/route.ts`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] Write tests proving the public profile is JSON serializable and contains only canonical public project links.
- [ ] Implement a compact serializer without React components or internal agent configuration.
- [ ] Serve `/profile.json` with a public JSON representation.
- [ ] Serve `/llms.txt` with canonical localized pages, projects, contact links, and usage guidance.
- [ ] Replace the single `Person` JSON-LD object with a graph containing `ProfilePage`, `Person`, `Organization`, `Project`, and `SoftwareSourceCode`.
- [ ] Derive `worksFor` from the current employer record instead of a hard-coded former employer.

### Task 5: Dynamic discovery metadata

**Files:**
- Create: `src/app/sitemap.ts`
- Delete: `public/sitemap.xml`
- Create: `src/app/manifest.ts`
- Delete: `public/manifest.json`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] Generate sitemap entries for both localized home pages, agent pages, and every case study.
- [ ] Generate a manifest matching the current monochrome identity, locale routes, and portfolio description.
- [ ] Point layout metadata at `/manifest.webmanifest`.

### Task 6: Verification

**Files:**
- Test: `src/lib/public-profile.test.ts`
- Test: existing agent and portfolio tests

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Inspect the home, one case study, and contextual agent entry on mobile and desktop.
- [ ] Confirm `/llms.txt`, `/profile.json`, `/sitemap.xml`, and `/manifest.webmanifest` return the expected content types and canonical URLs.
