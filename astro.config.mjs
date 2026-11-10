import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://validthese.cebistats.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
