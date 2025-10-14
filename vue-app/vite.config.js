import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: resolve(__dirname, '../public/js'),
    emptyOutDir: true,
    manifest: 'manifest.json', // <-- this creates manifest.json
    rollupOptions: {
      input: resolve(__dirname, 'src/main.js'), // adjust if entry file differs
    },
  },
})
