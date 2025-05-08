import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
// import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
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
  build: {
    minify: 'esbuild',
  }
})
