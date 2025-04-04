import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    host: 'blog-srr.fronterbest.ru',
    port: 24678,
    hmr: {
      protocol: 'wss',
      host: 'blog-srr.fronterbest.ru',
      port: 24678,
    },
    allowedHosts: ["blog-srr.fronterbest.ru"],
  },
  assetsInclude: ["**/*.html"],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
})
