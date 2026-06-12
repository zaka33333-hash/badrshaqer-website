import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://badrshaqer.com',
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
