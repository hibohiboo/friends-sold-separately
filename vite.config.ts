/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();
const dev = process.env.npm_lifecycle_event === 'dev';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['console'],
  },
  // vite 4 を vitestが対応するまでの一時的対応
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setupTest.ts'],
    includeSource: ['src/**/*.ts'],
    coverage: {
      reportsDirectory: 'docs/documents/astro/public/coverage',
    },
  },
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: ['./tests/setupTest.ts'],
  //   includeSource: ['src/**/*.ts'],
  //   coverage: {
  //     reportsDirectory: 'docs/documents/astro/public/coverage',
  //   },
  // },
  resolve: {
    // viteのホットリロードのために、/で始める必要がある。
    alias: [{ find: '@', replacement: '/src' }],
  },
  define: {
    VITE_DEFINE_BASE_PATH: JSON.stringify(dev ? '' : process.env.DEFINE_BASE_PATH),
    VITE_DEFINE_SKYWAY_KEY: JSON.stringify(process.env.DEFINE_SKYWAY_KEY),
    VITE_DEFINE_ROOM_PASSWORD: JSON.stringify(process.env.DEFINE_ROOM_PASSWORD),
    'import.meta.vitest': 'undefined',
  },
  base: dev ? '' : `/${process.env.DEFINE_BASE_PATH}/`,
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          reactFamilies: ['react-icons'],
          rtk: ['react-redux', '@reduxjs/toolkit'],
          udonarium: ['crypto-js', 'lzbase62', 'msgpack-lite', 'pako', 'skyway-js'],
          analytics: ['firebase/app', 'firebase/analytics', 'web-vitals'],
          firestore: ['firebase/auth', 'firebase/firestore'],
          others: ['date-fns'],
        },
      },
    },
  },

  server: {
    port: 4200,
    // proxy: {
    //   '/v1': {
    //     target: 'http://example.com',
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
});
