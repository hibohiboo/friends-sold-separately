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
  },
  base: dev ? '' : `/${process.env.DEFINE_BASE_PATH}/`,
});
