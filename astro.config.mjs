import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jichangtuijian.pro',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date()
    })
  ]
});
