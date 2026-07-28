# Agent Artwork Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Agent mode its own iconic dithered artwork while preserving chat space and creating a smooth visual handoff from Portfolio mode.

**Architecture:** Extract the existing Kanagawa hero into a reusable artwork component backed by the current `DitherShader`. Portfolio mode renders Kanagawa and Agent mode renders Caspar David Friedrich’s public-domain “Wanderer above the Sea of Fog” inside the same responsive frame and named React View Transition. Agent mode smoothly collapses that frame after the first message so the conversation regains vertical space.

**Tech Stack:** Next.js 16 App Router, React 19 View Transitions, TypeScript, Tailwind CSS v4, Vercel Eve, existing canvas-based `DitherShader`.

---

### Task 1: Extract the shared artwork frame

**Files:**
- Create: `src/components/artwork-hero.tsx`
- Modify: `src/components/sections/portfolio-hero.tsx`

- [ ] **Step 1: Create a reusable artwork component**

```tsx
export function ArtworkHero({
  compact = false,
  desktopPosition,
  mobilePosition,
  src,
}: ArtworkHeroProps) {
  return (
    <ViewTransition name="portfolio-artwork">
      <section className={cn(
        "relative w-full overflow-hidden border-x border-t border-line",
        "transition-[height] duration-500",
        compact ? "h-14 sm:h-18" : "artwork-height",
      )}>
        <DitherShader src={src} objectPosition={objectPosition} />
      </section>
    </ViewTransition>
  );
}
```

The full height uses viewport-aware clamps so short desktop windows preserve
chat space while both modes retain identical geometry.

- [ ] **Step 2: Replace the portfolio-specific implementation**

`PortfolioHero` becomes a thin configuration wrapper around `ArtworkHero` with
`/images/kanagawa.jpeg`, keeping its current crop and grayscale palette.

- [ ] **Step 3: Run type checking**

Run: `npx tsc --noEmit`

Expected: PASS.

### Task 2: Add the Agent artwork and progressive collapse

**Files:**
- Create: `src/components/agent/agent-artwork.tsx`
- Modify: `src/components/agent/portfolio-agent.tsx`

- [ ] **Step 1: Configure the Agent artwork**

Render `/images/wanderer-above-the-sea-of-fog.jpeg` with a central focal
position so the wanderer’s silhouette remains visible after cover cropping.

- [ ] **Step 2: Track whether a conversation exists**

`PortfolioAgent` owns `hasConversation`. `PortfolioAgentSession` reports
`agent.data.messages.length > 0` through an effect so restored sessions also
collapse the artwork.

- [ ] **Step 3: Preserve the chat viewport**

The artwork starts at the same responsive height as Portfolio mode and
transitions to `h-14 sm:h-18` after the first message. The remaining agent
shell stays `min-h-0 flex-1`, so the conversation scroll area absorbs the
reclaimed height without moving the composer or bottom navigation.

### Task 3: Enable smooth cross-route artwork transitions

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Enable the documented Next.js integration**

```ts
experimental: {
  viewTransition: true,
}
```

- [ ] **Step 2: Add restrained transition timing**

```css
::view-transition-group(portfolio-artwork) {
  animation-duration: 420ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Disable nonessential motion under `prefers-reduced-motion: reduce`.

### Task 4: Validate layout and interaction

**Files:**
- Verify: `src/components/artwork-hero.tsx`
- Verify: `src/components/agent/portfolio-agent.tsx`

- [ ] **Step 1: Run automated validation**

Run: `npm test && npm run lint && npx tsc --noEmit && npm run build:agent && npm run build`

Expected: tests and builds pass; no new lint errors.

- [ ] **Step 2: Inspect Portfolio and Agent modes**

At desktop and mobile widths, confirm identical initial artwork geometry,
correct crops, smooth route crossfade, and a compact Agent artwork after the
first message.

- [ ] **Step 3: Exercise a real agent turn**

Send one prompt and confirm the hero collapses without changing composer
position, hiding content, or breaking conversation scrolling.
