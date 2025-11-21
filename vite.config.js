import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const target = process.env.BUILD_TARGET || 'gh'
const base = process.env.BASE_PATH ?? (target === 'gh' ? '/' : '/')

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    'import.meta.env.VITE_HOST_TARGET': JSON.stringify(target)
  }
})
