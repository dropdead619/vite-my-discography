import path from 'path';
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': ['useDark', 'useToggle', 'useIntervalFn', 'useBreakpoints', 'breakpointsTailwind'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  build: {
    rollupOptions: {
      input: path.resolve('googledd008bc8ac6199f4.html', ''),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
