# Personal Website — Andrii Tarasov

A single-page portfolio site for a backend software developer, built with React 19, TypeScript and Vite.

## Features

- **Dark emerald theme** driven by CSS custom properties in `src/index.css`
- **3D tilt photo card** that follows the cursor with spring physics (`src/components/TiltCard.tsx`, `src/hooks/useTilt.ts`)
- **GSAP motion system**: staggered name reveal, portrait wipe, scroll parallax, animated section rules, count-up stats and a scroll-driven experience timeline
- **Interactive details**: GSAP magnetic buttons, pointer-following card lighting, radial theme transitions and animated project dialogs
- **Ambient gradient blobs** as a CSS-animated background — no WebGL or heavy 3D dependencies
- **Contact form** that composes a `mailto:` link client-side, alongside direct phone and LinkedIn links — fully static, no backend required
- **Accessible motion**: honors `prefers-reduced-motion`, and disables tilt on touch devices

## Tech stack

| Purpose    | Choice                     |
| ---------- | -------------------------- |
| Framework  | React 19 + TypeScript      |
| Build tool | Vite                       |
| Animation  | GSAP + ScrollTrigger, @gsap/react |
| Icons      | lucide-react               |
| Styling    | Plain CSS with design tokens |

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Scripts

- `npm run dev` — start the dev server with HMR
- `npm run build` — type-check and build for production into `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint

## Project structure

```
src/
  components/    UI sections (Hero, About, Skills, Experience, Education, Contact)
  data/profile.ts   All copy and CV data in one typed file
  animation/gsap.ts  Shared GSAP registration and motion preference
  hooks/useTilt.ts  GSAP-driven 3D tilt and light
  gsap.css      Motion design and responsive refinements
  index.css      Design tokens, resets, shared utilities
  App.css        Component and layout styles
```

Content lives entirely in `src/data/profile.ts`, so text and details can be updated without touching the layout.
