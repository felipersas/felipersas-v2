# Agent Auto Router and UI Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Route portfolio questions automatically through OpenRouter and simplify Agent mode so it matches the portfolio's technical editorial minimalism.

**Architecture:** The Eve agent will use `openrouter/auto` as its default and documented local configuration, while preserving an explicit `OPENROUTER_MODEL` override. Failed sessions created before the provider fix will be invalidated with a storage schema version. The Agent workspace and navbar mode control will reuse the portfolio's monochrome palette, exposed hairlines, square geometry, and restrained typography.

**Tech Stack:** Eve, OpenRouter AI SDK provider, Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vitest

---

### Task 1: Make OpenRouter model selection automatic

**Files:**
- Modify: `agent/openrouter-config.ts`
- Modify: `agent/agent.ts`
- Modify: `.env.example`
- Modify: `.env`
- Modify: `src/lib/openrouter-config.test.ts`

- [ ] **Step 1: Add a failing default-model test**

```ts
import { OPENROUTER_DEFAULT_MODEL } from "../../agent/openrouter-config";

expect(OPENROUTER_DEFAULT_MODEL).toBe("openrouter/auto");
```

- [ ] **Step 2: Run the focused test**

Run: `npm test -- src/lib/openrouter-config.test.ts`

Expected: FAIL because `OPENROUTER_DEFAULT_MODEL` does not exist.

- [ ] **Step 3: Define and use the automatic model**

```ts
export const OPENROUTER_DEFAULT_MODEL = "openrouter/auto";
```

Use it as the fallback after `process.env.OPENROUTER_MODEL?.trim()`. Set the local and example environment values to `openrouter/auto` so an existing fixed model does not override the new default.

- [ ] **Step 4: Verify a real request**

Send `Reply with exactly: OK` using the real OpenRouter provider, `openrouter/auto`, the production attribution headers, and the configured API key.

Expected: response text `OK`.

### Task 2: Invalidate failed sessions from the old provider configuration

**Files:**
- Modify: `src/lib/eve-chat-storage.ts`
- Modify: `src/lib/eve-chat-storage.test.ts`

- [ ] **Step 1: Add a failing storage-version test**

Store a payload without the current version and expect `readStoredEveChat()` to return a fresh session with no events.

- [ ] **Step 2: Version the persisted payload**

Write `{ version: 2, session, events }`. Reject and remove payloads without `version: 2`, preventing parked `turn.failed` events from rehydrating after this provider migration.

- [ ] **Step 3: Run storage tests**

Run: `npm test -- src/lib/eve-chat-storage.test.ts`

Expected: PASS.

### Task 3: Reduce Agent mode to the essential interaction

**Files:**
- Modify: `src/components/agent/portfolio-agent.tsx`
- Modify: `src/i18n/locales/pt-BR.json`
- Modify: `src/i18n/locales/en.json`

- [ ] **Step 1: Simplify the workspace header**

Keep only the page title, a one-sentence prompt, and the new-conversation action. Remove the “live” badge, automated-representation disclosure, provider/Whisper status strip, and decorative bot frame.

- [ ] **Step 2: Simplify the empty state**

Use the direct question “O que você quer saber?” / “What would you like to know?” and show the three prompts as flat, hairline-separated actions only before the first message.

- [ ] **Step 3: Simplify the composer**

Keep textarea, microphone, and send/stop controls. Remove permanent explanatory text below the composer; runtime speech status remains available through the microphone control.

- [ ] **Step 4: Keep errors actionable**

Replace infrastructure-specific copy with “Não consegui responder. Tente uma nova conversa.” / “I couldn't answer. Start a new conversation and try again.”

### Task 4: Restyle the mode selector

**Files:**
- Modify: `src/components/navbar.tsx`

- [ ] **Step 1: Remove pill styling**

Replace rounded container, inverted active fill, and shadow with a rectangular hairline control. Separate options with a one-pixel rule, use `bg-muted/40` for the active state, and preserve icon-only mobile labels through `aria-label`.

- [ ] **Step 2: Verify navigation semantics**

Ensure each route has exactly one `aria-current="page"` mode and keyboard-visible focus styles.

### Task 5: Verify the complete result

**Files:**
- Test: `src/lib/openrouter-config.test.ts`
- Test: `src/lib/eve-chat-storage.test.ts`

- [ ] **Step 1: Run automated verification**

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build:agent
npm run build
git diff --check
```

- [ ] **Step 2: Validate desktop and mobile**

Check `/pt-BR/agent` and `/en/agent` at the default viewport and 390×844. Confirm no horizontal overflow, the composer stays above the navbar, the reduced header fits, the flat selector matches adjacent controls, and the console contains no application errors.

