import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this repo from /PersonalWebSite/, so built assets need
  // that prefix. The dev server stays at the root, and BASE_PATH=/ switches
  // production back to the root for a custom domain.
  base: command === 'build' ? (process.env.BASE_PATH ?? '/PersonalWebSite/') : '/',
  // Vite does not pick up PORT on its own, and tooling that assigns a free port
  // hands it over that way. Falls back to the usual 5173 when nothing is set.
  server: { port: Number(process.env.PORT) || 5173 },
  // The legal pages and the 404 page are plain HTML beside the React app.
  // GitHub Pages serves 404.html for any path it does not know.
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        impressum: resolve(import.meta.dirname, 'impressum.html'),
        datenschutz: resolve(import.meta.dirname, 'datenschutz.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
}))
