// @ts-check

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';

export default defineConfig({
  integrations: [clerk()],
  vite: {
    plugins: [tailwindcss()],
  }
});