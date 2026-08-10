import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Repo root — needed so Vite's dev server may read files from
// `New Surau Bateh Lori Design System/` which lives outside this project root.
const repoRoot = path.resolve(__dirname, '..');

// https://vite.dev/config/
export default defineConfig({
  base: '/surau-bateh-adjustment/',
  plugins: [react()],
  resolve: {
    // The design system components live outside this project root (in the
    // sibling `New Surau Bateh Lori Design System/` folder), so Node's
    // upward node_modules resolution never finds this project's React —
    // force every `react`/`react-dom` import to resolve to our copy.
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  server: {
    fs: { allow: [repoRoot] },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
