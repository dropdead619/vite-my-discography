import * as path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ imports: [
      'vue',
      'vue-router',
      {
        '@vueuse/core': ['useDark', 'useTitle', 'useHead', 'useToggle', 'useIntervalFn', 'useBreakpoints', 'breakpointsTailwind'],
      },
    ], dts: 'src/auto-imports.d.ts' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
});
