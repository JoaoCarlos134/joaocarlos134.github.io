import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  // The hero's CV keycap links to /curriculo.pdf (pt) or /resume.pdf (en). Until
  // both files are in public/, the button is left out rather than shipped
  // pointing at a 404.
  define: {
    __HAS_RESUME__: JSON.stringify(
      ['curriculo.pdf', 'resume.pdf'].every((f) =>
        existsSync(fileURLToPath(new URL(`./public/${f}`, import.meta.url))),
      ),
    ),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
