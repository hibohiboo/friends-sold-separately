/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();
const dev = process.env.npm_lifecycle_event === 'dev';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setupTest.ts'],
  },
  resolve: {
    // viteのホットリロードのために、/で始める必要がある。
    alias: [{ find: '@', replacement: '/src' }],
  },
  define: {
    VITE_DEFINE_BASE_PATH: JSON.stringify(dev ? '' : process.env.DEFINE_BASE_PATH),
    VITE_DEFINE_SKYWAY_KEY: JSON.stringify(process.env.DEFINE_SKYWAY_KEY),
    VITE_DEFINE_ROOM_PASSWORD: JSON.stringify(process.env.DEFINE_ROOM_PASSWORD),
  },
  base: dev ? '' : `/${process.env.DEFINE_BASE_PATH}/`,
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          rtk: ['react-redux', '@reduxjs/toolkit'],
          udonarium: ['crypto-js', 'lzbase62', 'msgpack-lite', 'pako', 'skyway-js'],
        },
      },
    },
  },
  server: { port: 4200 },
});
