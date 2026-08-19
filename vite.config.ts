import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is injected by the GitHub Actions workflow as `/<repo-name>/`
// so the build works under https://<user>.github.io/<repo-name>/ without
// hardcoding the repository name here. Defaults to '/' for local dev.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
