import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  envDir: '../',
  publicDir: '../public',
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: '../dist',
  },
})
