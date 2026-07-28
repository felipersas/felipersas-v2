# Portfolio Agent Grounding Harness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio agent answer from canonical portfolio data, fail closed when grounding metadata is missing or invalid, and continuously test hallucination-prone questions.

**Architecture:** Add one deep grounding module whose interface builds canonical facts from `DATA` and `featuredProjects`, formats those facts for the agent, and validates model-emitted fact references. Eve receives the facts as always-on instructions; the browser trusts only validated metadata and derives evidence links and follow-up suggestions locally.

**Tech Stack:** TypeScript, Eve 0.27, OpenRouter, React 19, Vitest, Next.js 16.

---

### Task 1: Canonical grounding module

**Files:**
- Create: `src/lib/portfolio-grounding.ts`
- Create: `src/lib/portfolio-grounding.test.ts`

- [ ] **Step 1: Write failing tests for canonical facts**

Test that the module exposes stable facts for Keeper, FazzLeads, the MindGroup
performance metric, every featured project, and contact information. Test that
unknown fact IDs are rejected and that numeric claims must occur in cited facts.

- [ ] **Step 2: Run the focused test and verify failure**

Run:

```bash
npx vitest run src/lib/portfolio-grounding.test.ts
```

Expected: failure because `portfolio-grounding.ts` does not exist.

- [ ] **Step 3: Implement the deep module**

Expose this interface:

```ts
export type PortfolioFact = {
  evidenceKey: string;
  id: string;
  text: string;
  topic: "contact" | "education" | "experience" | "identity" | "projects" | "skills";
};

export function getPortfolioFacts(): readonly PortfolioFact[];
export function getPortfolioKnowledgeMarkdown(): string;
export function validatePortfolioGrounding(
  answer: string,
  factIds: readonly string[]
): { factIds: string[]; valid: boolean; reason?: string };
```

Generate the facts from `getPublicProfile("en")`, `DATA.education`,
`DATA.certifications`, and `featuredProjects`; do not copy career or project
claims into the module.

- [ ] **Step 4: Run the focused test**

Run:

```bash
npx vitest run src/lib/portfolio-grounding.test.ts
```

Expected: all grounding tests pass.

### Task 2: Always-on grounded agent

**Files:**
- Create: `agent/instructions/grounding.ts`
- Modify: `agent/instructions.md`
- Modify: `agent/skills/career/SKILL.md`
- Modify: `agent/skills/contact/SKILL.md`
- Modify: `agent/skills/projects/SKILL.md`
- Modify: `agent/openrouter-config.ts`
- Modify: `src/lib/openrouter-config.test.ts`
- Modify: `src/lib/agent-security.test.ts`

- [ ] **Step 1: Update tests to require the free router and canonical grounding**

Require `OPENROUTER_DEFAULT_MODEL` to equal `openrouter/free`.
Require `agent/instructions/grounding.ts` to call
`getPortfolioKnowledgeMarkdown()`. Require the permanent instructions to state
that conversation history and previous assistant answers are not evidence.

- [ ] **Step 2: Run tests and verify failure**

Run:

```bash
npx vitest run src/lib/openrouter-config.test.ts src/lib/agent-security.test.ts
```

Expected: failures for the auto-router model and missing grounding instructions.

- [ ] **Step 3: Implement always-on facts**

Create a build-time Eve instruction:

```ts
import { defineInstructions } from "eve/instructions";
import { getPortfolioKnowledgeMarkdown } from "../../src/lib/portfolio-grounding";

export default defineInstructions({
  markdown: getPortfolioKnowledgeMarkdown(),
});
```

Pin the default model. Remove duplicated factual bodies from skills and retain
only their response procedures. Replace the `MUST load skill` knowledge policy
with rules that treat the canonical fact block as the only truth and require a
grounding status plus fact IDs in response metadata.

- [ ] **Step 4: Verify agent compilation**

Run:

```bash
npm run build:agent
```

Expected: Eve compiles without diagnostics and includes the generated grounding
instruction.

### Task 3: Fail-closed response UI

**Files:**
- Modify: `src/lib/agent-response-ui.ts`
- Modify: `src/lib/agent-response-ui.test.ts`
- Modify: `src/components/agent/portfolio-agent.tsx`

- [ ] **Step 1: Write failing parser tests**

Cover:

- a grounded response with valid fact IDs;
- a grounded response with an unknown fact ID;
- a grounded response with an unsupported numeric metric;
- an `insufficient` response without facts;
- missing or malformed metadata;
- deterministic Portuguese and English follow-ups.

- [ ] **Step 2: Run the focused parser tests and verify failure**

Run:

```bash
npx vitest run src/lib/agent-response-ui.test.ts
```

Expected: failure because the old parser accepts broad evidence keys and
model-authored suggestions.

- [ ] **Step 3: Implement validated metadata**

Use this metadata contract:

```json
{"status":"grounded","factIds":["experience:mindgroup"],"evidence":["experience"]}
```

Allowed statuses are `grounded`, `insufficient`, `out-of-scope`, and
`conversational`. For `grounded`, reject missing/unknown facts and unsupported
numeric claims. For rejected responses, replace visible text with a localized
safe fallback. Derive two follow-up questions locally from cited topics and
ignore model-authored suggestions.

- [ ] **Step 4: Render validated text**

For completed assistant text parts, pass the parser's validated visible text to
`MessagePart`. Continue rendering activity parts unchanged.

- [ ] **Step 5: Run parser and UI tests**

Run:

```bash
npm test
```

Expected: all tests pass.

### Task 4: Eve regression evals and grounding telemetry

**Files:**
- Create: `evals/evals.config.ts`
- Create: `evals/grounding.eval.ts`
- Create: `agent/hooks/grounding.ts`
- Modify: `package.json`

- [ ] **Step 1: Add real-session eval cases**

Add grounded cases for Keeper, FazzLeads, MindGroup, and PayFlow. Add
abstention cases for Nubank employment, FazzLeads user count, Keeper
Kubernetes usage, compensation, and an invented number of Go experience years.
Every response must include valid `portfolio-ui` grounding metadata.

- [ ] **Step 2: Add the eval command**

Add:

```json
"eval:agent": "eve eval --strict"
```

- [ ] **Step 3: Add an observe-only hook**

On `message.completed`, parse the metadata comment and emit one structured log
record containing the session ID, grounding status, fact count, and metadata
validity. Do not log the visitor's message or the assistant's answer text.

- [ ] **Step 4: Type-check evals and compile the agent**

Run:

```bash
npm run build:agent
npx tsc --noEmit
```

Expected: no type or Eve build errors.

### Task 5: Final verification

**Files:**
- Modify only files required by failures found during verification.

- [ ] **Step 1: Run all deterministic checks**

```bash
npm test
npm run lint
npm run build:agent
npm run build
```

Expected: all commands exit zero.

- [ ] **Step 2: Inspect the compiled Eve manifest**

Confirm that the model is fixed, the canonical grounding instruction is
present, and all three procedural skills remain discoverable.

- [ ] **Step 3: Review the diff**

Run:

```bash
git diff --check
git status --short
```

Expected: only intentional harness, test, plan, and UI changes.
