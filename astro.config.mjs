import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const LASTMOD = '2026-10-04';
const PRIORITY = [
  [/^https:\/\/jichangtuijian\.pro\/$/, 1.0],
  [/\/(recommend|cheap|value|compare)\/$/, 0.9],
  [/\/(review|compare)\/[^/]+\/$/, 0.8],
];

export default defineConfig({
  site: 'https://jichangtuijian.pro',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        item.lastmod = LASTMOD;
        item.priority = PRIORITY.find(([re]) => re.test(item.url))?.[1] ?? 0.6;
        item.changefreq = 'weekly';
        return item;
      },
    }),
  ],
});
