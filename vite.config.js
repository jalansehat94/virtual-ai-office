import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/virtual-ai-office/',
  server: {
    port: 3000,
    open: false
  },
  preview: {
    port: 4173
  }
})
