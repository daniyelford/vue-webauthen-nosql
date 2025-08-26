// client/vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  root: path.resolve(__dirname), // مسیر ریشه frontend
  resolve: {
    alias: {
      '@': path.resolve(__dirname), // برای import از client/
    },
  },
  server: {
    port: 5173, // dev server روی این پورت
    open: true,
  },
  build: {
    outDir: path.resolve(__dirname, '../dist/client'), // خروجی build
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // فایل entry اصلی
    },
  },
  optimizeDeps: {
    include: ['axios', 'pinia', 'vue'],
  },
});
