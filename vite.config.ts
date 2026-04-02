import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@navigation': fileURLToPath(new URL('./src/navigation', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@redux': fileURLToPath(new URL('./src/redux', import.meta.url)),
    },
  },
})
