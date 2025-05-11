// @ts-check
import { defineConfig } from 'astro/config'; // Importación de la función defineConfig desde astro/config

import tailwindcss from '@tailwindcss/vite'; // Importación de tailwindcss para la configuración de estilos

import clerk from '@clerk/astro'; // Importación de Clerk para la autenticación y gestión de usuarios
import node from '@astrojs/node'; // Importación del adaptador de Node.js para Astro

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