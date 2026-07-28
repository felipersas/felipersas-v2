# Agent Workspace Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the embedded portfolio chat with a first-class, URL-addressable Agent mode that users can switch to from the persistent navbar.

**Architecture:** The normal portfolio remains at `/{locale}` and the focused agent workspace lives at `/{locale}/agent`. The bottom navbar owns a two-option mode selector because the choice changes the whole application context; utility actions remain separate. The existing Eve session and local speech pipeline are reused without duplicating state.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Eve, AI Elements, Vitest

---

### Task 1: Add URL-based portfolio modes

**Files:**
- Create: `src/lib/portfolio-mode.ts`
- Create: `src/lib/portfolio-mode.test.ts`
- Modify: `src/components/navbar.tsx`

- [ ] **Step 1: Write failing mode tests**

```ts
import { describe, expect, it } from "vitest";
import { getPortfolioMode, getPortfolioModeHref } from "./portfolio-mode";

describe("portfolio mode routing", () => {
  it("detects the agent route", () => {
    expect(getPortfolioMode("/pt-BR/agent")).toBe("agent");
    expect(getPortfolioMode("/en")).toBe("portfolio");
  });

  it("builds localized mode URLs", () => {
    expect(getPortfolioModeHref("pt-BR", "agent")).toBe("/pt-BR/agent");
    expect(getPortfolioModeHref("en", "portfolio")).toBe("/en");
  });
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- src/lib/portfolio-mode.test.ts`

Expected: FAIL because `portfolio-mode.ts` does not exist.

- [ ] **Step 3: Implement the route helpers**

```ts
import type { Locale } from "@/hooks/use-translation";

export type PortfolioMode = "portfolio" | "agent";

export function getPortfolioMode(pathname: string): PortfolioMode {
  return /\/agent\/?$/.test(pathname) ? "agent" : "portfolio";
}

export function getPortfolioModeHref(
  locale: Locale,
  mode: PortfolioMode
): string {
  return mode === "agent" ? `/${locale}/agent` : `/${locale}`;
}
```

- [ ] **Step 4: Replace the home/robot icon pair with a segmented mode selector**

Use semantic Next.js links for `Portfolio` and `Agent`, set `aria-current="page"` on the selected mode, render text labels from `navbar.portfolioMode` and `navbar.agentMode` on desktop, and retain icons plus accessible names on mobile.

- [ ] **Step 5: Run the focused test**

Run: `npm test -- src/lib/portfolio-mode.test.ts`

Expected: PASS.

### Task 2: Create the dedicated Agent route

**Files:**
- Create: `src/app/[locale]/agent/page.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/components/agent/portfolio-agent.tsx`

- [ ] **Step 1: Add the localized Agent page**

Create a full-height `main` that leaves room for the fixed navbar and renders `<PortfolioAgent locale={locale} />` inside a centered `max-w-3xl` workspace.

- [ ] **Step 2: Remove the embedded agent panel from the normal page**

Delete the `PortfolioAgent` import, component instance, and its now-redundant separator from `src/app/[locale]/page.tsx`.

- [ ] **Step 3: Convert the agent component into a focused workspace**

Keep the existing Eve session behavior, but change the shell to:

- a compact identity header with title, description, disclosure, and runtime status;
- a `flex-1 min-h-0` conversation region;
- a composer anchored inside the workspace;
- centered empty state and suggestions;
- mobile-safe `100svh` sizing without body overflow.

- [ ] **Step 4: Verify the Eve session remains durable**

Open Agent mode, submit a message, switch to Portfolio mode, return to Agent mode, and verify the saved conversation rehydrates from `eve-chat-storage`.

### Task 3: Update navigation, localization, and project entry point

**Files:**
- Modify: `src/i18n/locales/en.json`
- Modify: `src/i18n/locales/pt-BR.json`
- Modify: `src/data/resume.tsx`
- Modify: `src/data/featured-projects.ts`
- Modify: `src/components/sections/projects.tsx`

- [ ] **Step 1: Add mode labels**

Add `navbar.portfolioMode` and `navbar.agentMode` in both locales.

- [ ] **Step 2: Remove obsolete navbar data**

Delete `DATA.navbar` and its `HomeIcon`/`BotMessageSquare` imports because primary mode navigation now belongs to the navbar component.

- [ ] **Step 3: Point the Portfolio Agent project to Agent mode**

Store `/agent` as the internal project link and resolve it to `/${locale}/agent` inside `ProjectCard`; external links continue opening in a new tab.

### Task 4: Validate the complete mode experience

**Files:**
- Test: `src/lib/portfolio-mode.test.ts`
- Test: existing project tests

- [ ] **Step 1: Run automated verification**

Run:

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build:agent
npm run build
git diff --check
```

Expected: all tests, types, and builds pass; lint has no new warnings.

- [ ] **Step 2: Validate desktop behavior**

Verify the selector is visible in the fixed navbar, each route has exactly one selected mode, Agent mode uses the full workspace, and Portfolio mode contains no embedded chat.

- [ ] **Step 3: Validate mobile behavior**

At 390×844, verify there is no horizontal overflow, the mode selector stays usable, the composer remains visible above the navbar, and conversation scrolling is contained.

- [ ] **Step 4: Validate localization and accessibility**

Check `/pt-BR`, `/pt-BR/agent`, `/en`, and `/en/agent`; confirm labels, document language, keyboard focus, `aria-current`, and console output.

