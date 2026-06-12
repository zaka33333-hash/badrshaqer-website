import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zaka33333-hash.github.io',
  base: '/badrshaqer-website/',
  trailingSlash: 'ignore',
  output: 'static',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      assetsInlineLimit: 2048,
    },
  },
});
