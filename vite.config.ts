import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this repo from /PersonalWebSite/, so built assets need
  // that prefix. The dev server stays at the root, and BASE_PATH=/ switches
  // production back to the root for a custom domain.
  base: command === 'build' ? (process.env.BASE_PATH ?? '/PersonalWebSite/') : '/',
}))
