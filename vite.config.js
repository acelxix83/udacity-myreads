import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: process.cwd(),
  base: "./",
  server: {
    watch: {
      ignored: ['**/.vs/**', '**/node_modules/**'],
      usePolling: true,
    },
  },
});
