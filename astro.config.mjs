// @ts-check

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [clerk()],
  vite: {
    plugins: [tailwindcss()],
    logLevel: 'info',
  },
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});