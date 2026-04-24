# CLAUDE.md

## Project Overview

Next.js 16 portfolio website built with Magic UI Design Portfolio template. Features a built-in Lo-Fi music player and clean, minimal design.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, content-collections (MDX), motion, Magic UI components

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (ThemeProvider, MusicPlayerProvider, TooltipProvider)
│   ├── page.tsx            # Home page
│   ├── blog/               # Blog pages
│   └── globals.css         # Global styles
├── components/
│   ├── magicui/            # Magic UI components (flickering-grid, etc.)
│   ├── music-player/       # Lo-Fi music player UI components
│   ├── section/            # Page sections (about, projects, contact, etc.)
│   ├── ui/                 # Reusable UI components (button, card, svgs, etc.)
│   └── navbar.tsx          # Navigation bar
├── data/
│   ├── resume.tsx          # All personal data (experience, skills, projects, etc.)
│   └── playlist.ts         # Music player playlist
├── hooks/
│   └── use-music-player.tsx # Music player context provider
├── lib/
│   ├── utils.ts            # cn() utility
│   └── remark-code-meta.ts # Remark plugin
└── types/
    └── music-player.types.ts
content/                    # MDX blog posts (content-collections)
public/
├── audio/                  # Lo-Fi music files
└── resumes/                # PDF resumes
```

### Key Patterns

- **Data-driven:** All personal data in `src/data/resume.tsx`
- **Content:** Blog posts as MDX in `content/`, validated by `content-collections.ts`
- **Music Player:** React Context + Web Audio API, state persisted to localStorage
- **Styling:** Tailwind CSS v4, `cn()` utility for class merging
- **Animations:** `motion/react` (not framer-motion)
- **Icons:** Skill icons as SVG components in `src/components/ui/svgs/`
- **Theme:** next-themes with light default, ThemeProvider in layout

### Important Notes

- Default language is `pt-BR` (html lang attribute)
- Music player state persists across sessions via localStorage
- Uses zod v3 (not v4) — content-collections requires zod@3
- Path alias `@/*` maps to `src/`
- The hackathons section has been removed from the template

## Dependencies

- **zod**: Must stay on v3.x (content-collections compatibility)
- **motion**: Animation library (import from `motion/react`)
- **content-collections**: MDX blog system with Zod schema validation
