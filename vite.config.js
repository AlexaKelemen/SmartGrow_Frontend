import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
  base: mode === 'production'
    ? '/SmartGrow_Frontend/'
    : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000, 
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    include:  ['src/**/*.test.{js,jsx}', 'src_test/**/*.test.{js,jsx}'], // ensures your test files are picked up
  },
}))