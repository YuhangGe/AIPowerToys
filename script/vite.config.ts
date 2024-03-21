import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   minify: false,
  // },
  plugins: [
    tsconfigPaths({
      projects: [path.resolve(__dirname, '../tsconfig.json')],
    }),

    react(),
    ViteImageOptimizer(),
  ],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
});
