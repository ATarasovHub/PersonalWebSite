# Personal Website — Andrii Tarasov

A single-page portfolio site for a backend software developer, built with React 19, TypeScript and Vite.

## Features

- **Dark emerald theme** driven by CSS custom properties in `src/index.css`
- **3D tilt photo card** that follows the cursor with spring physics (`src/components/TiltCard.tsx`, `src/hooks/useTilt.ts`)
- **Scroll-driven reveals** on every section via Framer Motion, with an animated timeline for work experience
- **Ambient gradient blobs** as a CSS-animated background — no WebGL or heavy 3D dependencies
- **Contact form** that composes a `mailto:` link client-side, alongside direct phone and LinkedIn links — fully static, no backend required
- **Accessible motion**: honors `prefers-reduced-motion`, and disables tilt on touch devices

## Tech stack

| Purpose    | Choice                     |
| ---------- | -------------------------- |
| Framework  | React 19 + TypeScript      |
| Build tool | Vite                       |
| Animation  | Framer Motion              |
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
  hooks/useTilt.ts  Pointer-driven 3D tilt logic
  index.css      Design tokens, resets, shared utilities
  App.css        Component and layout styles
```

Content lives entirely in `src/data/profile.ts`, so text and details can be updated without touching the layout.
