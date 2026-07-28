# Portfolio Eve Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a production-ready, bilingual portfolio agent powered by Vercel Eve and OpenRouter, with a rich in-page chat and local Whisper speech-to-text.

**Architecture:** Eve runs as the repository's `agent/` application and is co-deployed with Next.js through `withEve`, exposing same-origin durable session routes consumed by `useEveAgent`. Stable identity stays in `instructions.md`; career, project, and contact knowledge is progressively disclosed through Eve skills. The browser records and resamples microphone audio, then transfers it to a lazy Transformers.js Web Worker so model loading and transcription never block the React thread.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vercel Eve 0.27, AI SDK 7, OpenRouter AI SDK Provider 3, AI Elements, Transformers.js 4, Vitest, Playwright/browser smoke tests.

---

## File map

- `agent/agent.ts`: OpenRouter model and bounded Eve session configuration.
- `agent/instructions.md`: always-on identity, disclosure, language, accuracy, and safety rules.
- `agent/skills/{career,projects,contact}/SKILL.md`: load-on-demand portfolio knowledge.
- `agent/channels/eve.ts`: explicit anonymous access for the public portfolio demo.
- `next.config.ts`: co-mount the Eve service and Next.js application.
- `.env.example`: document the server-only OpenRouter settings.
- `src/components/agent/portfolio-agent.tsx`: durable chat state, rendering, suggestions, actions, and composer.
- `src/components/agent/message-part.tsx`: Eve text/reasoning/load-skill/tool visualization.
- `src/components/agent/speech-input.tsx`: microphone state machine and transcription UX.
- `src/workers/transcription.worker.ts`: lazy multilingual Whisper pipeline.
- `src/lib/audio.ts`: decode/downmix/resample recorded audio to mono 16 kHz.
- `src/lib/eve-chat-storage.ts`: validate and persist Eve event/cursor snapshots.
- `src/components/ai-elements/*`: selected official Vercel AI Elements primitives.
- `src/components/navbar.tsx`: add an agent jump action.
- `src/app/[locale]/page.tsx`: insert the agent panel in the portfolio flow.
- `src/data/featured-projects.ts`: list this agent as a portfolio project.
- `src/components/sections/projects.tsx`: render a data-driven project count/layout.
- `src/i18n/locales/{en,pt-BR}.json`: bilingual agent UI copy.
- `src/**/*.test.ts`: focused tests for deterministic audio and storage helpers.
- `vitest.config.ts`: test runner configuration.

### Task 1: Runtime and Eve agent

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `next.config.ts`
- Create: `.env.example`
- Create: `agent/agent.ts`
- Create: `agent/instructions.md`
- Create: `agent/channels/eve.ts`

- [ ] **Step 1: Install the exact compatible runtime dependencies**

Run:

```bash
npm install eve@0.27.8 ai@^7 @openrouter/ai-sdk-provider@^3 @huggingface/transformers@^4
```

Expected: `eve`, AI SDK, OpenRouter, and Transformers.js resolve without peer dependency errors.

- [ ] **Step 2: Declare the Eve-compatible Node runtime**

Set:

```json
"engines": {
  "node": ">=24.0.0"
}
```

- [ ] **Step 3: Mount the agent**

Wrap the existing config without changing its image policy:

```ts
import { withEve } from "eve/next";

export default withEve(nextConfig);
```

- [ ] **Step 4: Configure OpenRouter**

Create `agent/agent.ts` with `createOpenRouter`, `OPENROUTER_API_KEY`, an overridable `OPENROUTER_MODEL`, attribution headers, a concrete context-window override, and conservative per-session input/output token limits. Throw a clear runtime error only when a model call is attempted without a key.

- [ ] **Step 5: Open the public browser channel explicitly**

Create:

```ts
import { eveChannel } from "eve/channels/eve";
import { none } from "eve/channels/auth";

export default eveChannel({ auth: [none()] });
```

- [ ] **Step 6: Verify the agent compiler**

Run:

```bash
npx eve build
```

Expected: Eve discovers the agent, compiles the instructions/channel, and emits `.output` without needing to call OpenRouter.

### Task 2: Structured portfolio knowledge

**Files:**
- Create: `agent/skills/career/SKILL.md`
- Create: `agent/skills/projects/SKILL.md`
- Create: `agent/skills/contact/SKILL.md`

- [ ] **Step 1: Write permanent instructions**

The prompt must disclose that the visitor is speaking with an AI representation of Felipe, answer in the visitor's language, speak in first person only when clearly attributed to Felipe's documented profile, never invent unavailable facts, load the matching skill before factual answers, and direct hiring/contact requests to verified links.

- [ ] **Step 2: Write the career skill**

Copy the verified roles, dates, outcomes, education, certifications, and technology strengths from `src/data/resume.tsx`, preserving Portuguese and English terminology.

- [ ] **Step 3: Write the projects skill**

Document DemoCraft, the real-time crash game, PayFlow, and this Eve agent with architecture, evidence, links, and accurate status.

- [ ] **Step 4: Write the contact skill**

Include only the public email, GitHub, LinkedIn, location, resumes, and availability wording already present in the portfolio.

- [ ] **Step 5: Inspect skill discovery**

Run:

```bash
npx eve info
```

Expected: the three skills appear with useful routing descriptions.

### Task 3: Official AI Elements and durable chat

**Files:**
- Create/Modify: `src/components/ai-elements/{conversation,message,shimmer,suggestion}.tsx`
- Create: `src/components/agent/message-part.tsx`
- Create: `src/components/agent/portfolio-agent.tsx`
- Create: `src/lib/eve-chat-storage.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add only the selected AI Elements**

Run:

```bash
npx ai-elements@latest add conversation message shimmer suggestion --yes
```

Expected: only required shadcn primitives and runtime dependencies are added.

- [ ] **Step 2: Add validated local persistence**

Implement:

```ts
export type StoredEveChat = {
  events: HandleMessageStreamEvent[];
  session?: SessionState;
};

export function parseStoredEveChat(value: string | null): StoredEveChat;
export function serializeEveChat(value: StoredEveChat): string;
```

Invalid or oversized browser data must return an empty chat instead of crashing hydration.

- [ ] **Step 3: Render Eve message parts**

Render text through `MessageResponse`, reasoning as a restrained expandable status, and `dynamic-tool` parts as compact activity rows. A `load-skill` part must visibly name the knowledge skill being consulted without dumping internal prompts or raw provider metadata.

- [ ] **Step 4: Build the portfolio-native panel**

Use the existing `Panel` border system, monochrome palette, font scale, line dividers, and max-width. Provide bilingual empty state copy, example questions, streaming shimmer, stop/reset/copy controls, keyboard submission, accessible live status, and mobile-safe sizing.

- [ ] **Step 5: Keep durable sessions across reloads**

Initialize `useEveAgent` from local storage and persist `{ events, session }` on every terminal turn. Reset must remove the matching locale-independent storage entry.

### Task 4: Local speech-to-text

**Files:**
- Create: `src/lib/audio.ts`
- Create: `src/workers/transcription.worker.ts`
- Create: `src/components/agent/speech-input.tsx`
- Test: `src/lib/audio.test.ts`

- [ ] **Step 1: Write failing audio tests**

Cover downmixing stereo channels, preserving a 16 kHz mono signal, resampling 48 kHz to 16 kHz, empty input, and bounded output amplitudes.

Run:

```bash
npm test -- src/lib/audio.test.ts
```

Expected: FAIL before `resampleTo16Khz` exists.

- [ ] **Step 2: Implement browser audio normalization**

Decode the `MediaRecorder` blob with `AudioContext`, average channels, and linearly resample to a transferable `Float32Array` at 16 kHz.

- [ ] **Step 3: Implement the lazy worker**

Use:

```ts
pipeline(
  "automatic-speech-recognition",
  "onnx-community/whisper-tiny",
  { device, dtype, progress_callback }
)
```

Prefer WebGPU when available and fall back to WASM. Transcribe with `{ language: locale === "pt-BR" ? "portuguese" : "english", task: "transcribe" }`. Emit typed `loading`, `ready`, `transcribing`, `complete`, and `error` messages.

- [ ] **Step 4: Implement microphone UX**

Request permission only after a click; display recording duration, first-download progress, local-processing disclosure, stop/cancel behavior, and actionable errors for unsupported/denied devices. Insert the transcript into the composer for review rather than sending automatically.

- [ ] **Step 5: Run the tests**

Run:

```bash
npm test -- src/lib/audio.test.ts
```

Expected: PASS.

### Task 5: Portfolio integration and localization

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/components/navbar.tsx`
- Modify: `src/data/resume.tsx`
- Modify: `src/data/featured-projects.ts`
- Modify: `src/components/sections/projects.tsx`
- Modify: `src/i18n/locales/en.json`
- Modify: `src/i18n/locales/pt-BR.json`

- [ ] **Step 1: Add the agent section**

Place the agent after certifications and before projects, separated with the existing striped divider.

- [ ] **Step 2: Add a navbar entry**

Add a same-page `#agent` action with a bot/spark icon and localized accessible label without changing external navigation behavior.

- [ ] **Step 3: Localize all agent UI**

Add equivalent English and Brazilian Portuguese copy for title, description, suggestions, status, errors, microphone, controls, and privacy notice.

- [ ] **Step 4: Add the agent as a project**

Add “Portfolio Agent” to `featuredProjects`, listing Eve, OpenRouter, Transformers.js, and Next.js with an in-page demo link.

- [ ] **Step 5: Make the project grid data-driven**

Keep the first project full-width and render every remaining project in a two-column bordered grid without direct numeric indexing.

### Task 6: Verification

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/lib/eve-chat-storage.test.ts`

- [ ] **Step 1: Add test scripts and storage tests**

Add:

```json
"test": "vitest run"
```

Test valid round-trips, corrupt JSON, missing fields, and payload-size rejection.

- [ ] **Step 2: Run static checks**

Run:

```bash
npm run lint
npx tsc --noEmit
npm test
```

Expected: all commands exit 0.

- [ ] **Step 3: Run both production builds**

Run:

```bash
npx eve build
npm run build
```

Expected: both services compile under Node 24 with no missing environment variable at build time.

- [ ] **Step 4: Browser smoke test**

Start the app, open `/pt-BR` and `/en`, and verify desktop/mobile layout, theme compatibility, focus order, suggestion-to-composer flow, microphone permission/error flow, model loading status, local storage reset, and that sending without a configured key produces a human-readable server configuration error instead of breaking the page.

- [ ] **Step 5: Final diff audit**

Run:

```bash
git status --short
git diff --check
```

Expected: only feature files are changed and there is no trailing whitespace.
