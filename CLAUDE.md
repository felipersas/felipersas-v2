# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16 portfolio website** featuring interactive 3D scenes, a built-in music player, and full internationalization support (English/Portuguese). The design follows a Tokyo Lo-fi aesthetic with a dark, cozy theme.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js/React Three Fiber, Framer Motion, i18next

## Development Commands

```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture

### App Router Structure

- **`app/`** - Next.js App Router pages and layouts
- **`app/layout.tsx`** - Root layout with all providers (TranslationProvider, MusicPlayerProvider)
  - Default locale is `pt-BR` (Brazilian Portuguese)
  - Includes global fonts (Inter, JetBrains Mono)
  - Dark mode is enforced (`className="dark"`)

### Component Organization

Components are grouped by feature, not by type:

- **`components/3d/`** - Three.js scene components (avatar, desk, character)
- **`components/sections/`** - Page sections (hero, stack, contact, etc.)
- **`components/layout/`** - Header, footer, language switcher
- **`components/ui/`** - Reusable UI components using `class-variance-authority` pattern
- **`components/music-player/`** - Music player UI and controls
- **`components/blog/`** - Blog-specific components
- **`components/animations/`** - Animation wrappers (scroll progress, etc.)

### Content Management Pattern

All content is **data-driven** through TypeScript files in `content/`:

- **`content/projects.ts`** - Project data with multilingual support
- **`content/music-playlist.ts`** - Music tracks for the player
- **`content/blog-posts.ts`** - Blog post metadata
- **`content/tech-icons.tsx`** - Technology stack icons

**Key pattern:** Content objects have `title: { en: string, 'pt-BR': string }` for i18n.

### Custom Hooks Pattern

Context providers are co-located with their hooks in `hooks/`:

- **`use-translation.tsx`** - TranslationProvider with locale persistence in localStorage
  - Returns `{ t, locale, setLocale }` where `t` is the entire translation object
  - Server components can use `getTranslations(locale)` function
- **`use-music-player.tsx`** - MusicPlayerProvider with audio state management
  - Single audio element ref reused across track changes
  - Volume and track index persisted to localStorage
- **`use-theme.tsx`** - Theme management (next-themes integration)

### Internationalization (i18n)

- Translation files: `i18n/locales/en.json` and `i18n/locales/pt-BR.json`
- Default locale: `pt-BR` (Brazilian Portuguese)
- Supported locales: `'en' | 'pt-BR'`
- The `useTranslation()` hook returns the entire translation object as `t`, not a function
- Access translations like `t.hero.title` instead of `t('hero.title')`

### 3D Scene Architecture

- **React Three Fiber + Drei** for declarative Three.js
- **AvatarScene** (`components/3d/avatar-scene.tsx`) is the main 3D component
- Scene includes: desk, monitor, keyboard, coffee mug, plant, and blocky character
- **Tokyo Lo-fi lighting** - warm cream colors (`#ecdfbf`), soft shadows, city environment preset
- Scene rotates slowly with `useFrame` for ambient effect
- **OrbitControls** enabled for user interaction

### Styling System

- **Tailwind CSS v4** with `@theme` inline directives in `app/globals.css`
- **CSS variables** define the Tokyo Lo-fi color palette
- **`cn()` utility** from `lib/utils.ts` merges Tailwind classes using `clsx` and `tailwind-merge`
- UI components use `class-variance-authority` for variant-based styling
- Custom font variables: `--font-geist-sans` (Inter) and `--font-geist-mono` (JetBrains Mono)

### Utilities

- **`lib/utils.ts`** - Common utilities including `cn()`, `formatDate()`, `getGreeting()`, `truncate()`
- **`lib/animation-variants.ts`** - Framer Motion animation presets
- **`lib/skill-icons.tsx`** - Technology icon mappings
- **`lib/three-types.ts`** - Three.js TypeScript augmentations

### Path Aliases

TypeScript path aliases are configured (`@/*` maps to project root):

```ts
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

## Important Notes

- **Default locale is `pt-BR`**, not English
- All pages use the dark theme (enforced in root layout)
- Music player state persists across sessions via localStorage
- 3D scenes use responsive sizing with Tailwind breakpoints
- Projects have status: `'completed' | 'inProgress' | 'planned'`
- Blog uses MDX for content (configured in `next.config.ts`)
