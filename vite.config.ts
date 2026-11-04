import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  // The hero's CV keycap links to /resume.pdf. Until that file is in public/,
  // the button is left out rather than shipped pointing at a 404.
  define: {
    __HAS_RESUME__: JSON.stringify(existsSync(fileURLToPath(new URL('./public/resume.pdf', import.meta.url)))),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
