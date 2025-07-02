import { defineConfig } from 'vite';
import * as path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
});
