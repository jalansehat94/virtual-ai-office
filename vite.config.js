import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Ready for static GitHub Pages hosting
  server: {
    port: 3000,
    open: false
  }
})
