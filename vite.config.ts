import { reactRouter } from '@react-router/dev/vite';
import tailwind from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const MODE = process.env.NODE_ENV;

export default defineConfig({
  build: {
    cssMinify: MODE === 'production',
  },
  plugins: [reactRouter(), tailwind()],
  server: {
    allowedHosts: ['.snehaa.store'],
    hmr: {
      overlay: false
    }
  },
});
