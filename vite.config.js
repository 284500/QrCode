import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
        // @ 替代为 src
      '@': resolve(__dirname, 'src'),
       // @component 替代为 src/component
      '@components': resolve(__dirname, 'src/components'),
    },
  },
})
