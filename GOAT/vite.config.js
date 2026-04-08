import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  base: '/'   // local development ke liye
  // base: '/AMS-FrontEnd/'  // GitHub Pages deploy ke time yeh uncomment karo
})
