import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/edu-api-monitor/' : '/',
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
