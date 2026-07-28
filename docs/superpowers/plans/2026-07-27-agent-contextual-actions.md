# Agent Contextual Actions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two answer-specific follow-up questions, trusted evidence links, and a restrained hatched divider to the portfolio agent.

**Architecture:** The agent appends a hidden, JSON-encoded `portfolio-ui` comment to each substantive answer. A small client-side parser removes that metadata from rendered Markdown, validates exactly two follow-ups, and resolves evidence keys through a local allowlist so model output can never create arbitrary evidence URLs. The response UI renders evidence on its answer and follow-ups only on the latest completed answer.

**Tech Stack:** Vercel Eve, React 19, TypeScript, Vitest, Tailwind CSS v4, React Markdown.

---

### Task 1: Parse and validate response metadata

**Files:**
- Create: `src/lib/agent-response-ui.ts`
- Create: `src/lib/agent-response-ui.test.ts`

- [ ] **Step 1: Write failing parser tests**

```ts
expect(parseAgentResponse(answer, "pt-BR")).toMatchObject({
  visibleText: "Resposta",
  suggestions: ["Pergunta 1?", "Pergunta 2?"],
});
expect(parseAgentResponse(answer, "pt-BR").evidence[0].href)
  .toBe("/pt-BR#experience");
```

- [ ] **Step 2: Verify the tests fail**

Run: `npx vitest run src/lib/agent-response-ui.test.ts`

Expected: FAIL because `agent-response-ui.ts` does not exist.

- [ ] **Step 3: Implement the parser and evidence allowlist**

```ts
export function parseAgentResponse(
  text: string,
  locale: Locale
): ParsedAgentResponse {
  // Remove an incomplete marker while streaming, parse completed JSON,
  // constrain follow-ups to two, and resolve only known evidence keys.
}
```

Supported evidence keys are `experience`, `projects`, `stack`,
`project:<featured-project-slug>`, and `code:<featured-project-slug>`.

- [ ] **Step 4: Verify parser tests pass**

Run: `npx vitest run src/lib/agent-response-ui.test.ts`

Expected: PASS.

### Task 2: Teach the agent the UI metadata contract

**Files:**
- Modify: `agent/instructions.md`

- [ ] **Step 1: Add the hidden metadata protocol**

```md
<!-- portfolio-ui {"suggestions":["...","..."],"evidence":["experience"]} -->
```

Require exactly two concise, answer-specific questions and up to three
allowlisted evidence keys. The block must be the final content in every
substantive answer.

- [ ] **Step 2: Build the Eve agent**

Run: `npm run build:agent`

Expected: Eve compiles the updated instructions successfully.

### Task 3: Render contextual actions

**Files:**
- Create: `src/components/agent/response-actions.tsx`
- Modify: `src/components/agent/message-part.tsx`
- Modify: `src/components/agent/portfolio-agent.tsx`
- Modify: `src/i18n/locales/en.json`
- Modify: `src/i18n/locales/pt-BR.json`

- [ ] **Step 1: Strip metadata from Markdown rendering**

Call `stripAgentResponseUi(part.text)` before passing assistant text to
`MessageResponse`, including while the final comment is still streaming.

- [ ] **Step 2: Render trusted evidence links**

Render resolved evidence as compact editorial links under the answer. Internal
links navigate back to a localized portfolio hash; repository links open in a
new tab with `rel="noreferrer"`.

- [ ] **Step 3: Render only the current follow-ups**

Render exactly two contextual questions below the latest completed assistant
answer. Clicking one places it in the composer and focuses the textarea,
preserving the existing suggestion interaction.

- [ ] **Step 4: Add accessible localized labels**

Add English and Brazilian Portuguese navigation labels for evidence and
follow-up controls.

### Task 4: Add stable project anchors and agent hatching

**Files:**
- Modify: `src/components/sections/projects.tsx`
- Modify: `src/components/agent/portfolio-agent.tsx`

- [ ] **Step 1: Add project-specific anchors**

Set each project card wrapper to `id={"project-" + project.slug}` with the
existing scroll margin so evidence links can target a specific project.

- [ ] **Step 2: Reuse the portfolio hatch language**

Add one thin `diagonal-stripes` divider between the agent header and
conversation, using `--line` as the pattern color. Do not add gradients,
rounded cards, or additional decoration.

### Task 5: Verify behavior

**Files:**
- Test: `src/lib/agent-response-ui.test.ts`

- [ ] **Step 1: Run automated validation**

Run: `npm test && npm run lint && npx tsc --noEmit && npm run build:agent && npm run build`

Expected: all tests, lint, type checking, Eve build, and Next.js production
build pass.

- [ ] **Step 2: Check the agent page visually**

Verify in both locales and desktop/mobile widths that the hatch stays subtle,
metadata never appears as text, evidence links resolve correctly, and only the
latest answer exposes two follow-ups.
