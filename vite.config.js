import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/edu-api-monitor/' : '/',
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
}))
