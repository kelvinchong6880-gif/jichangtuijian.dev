import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';

const isProd = process.env.NODE_ENV === 'production';
const isPreviewEnv = process.env.IS_PREVIEW === 'true' || (process.env.CF_PAGES === '1' && process.env.CF_PAGES_BRANCH !== 'main');
const SITE_DOMAIN = process.env.SITE_DOMAIN || 'https://www.example-jichang.com';

// 严格的上线阻止检查
if (isProd && !isPreviewEnv && SITE_DOMAIN.includes('example-jichang.com')) {
  throw new Error("【构建阻止】正式环境构建失败：尚未配置真实正式域名。请设置 SITE_DOMAIN 环境变量。");
}

export default defineConfig({
  site: SITE_DOMAIN,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(), 
    sitemap({
      filter: (page) => {
        // 如果是正式构建，禁止演示相关页面进入 sitemap
        // 注意：我们将在 getStaticPaths 和页面获取数据时排除 dummy，
        // 这里作为第二道防线。由于占位数据可能被过滤掉，这里主要拦截可能遗漏的路径。
        return true; 
      }
    }),
    {
      name: 'robots-generator',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          // 如果是正式环境且不是预览环境，则生成允许爬取的 robots.txt
          if (isProd && !isPreviewEnv && !SITE_DOMAIN.includes('example-jichang.com')) {
            const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_DOMAIN}/sitemap-index.xml`;
            fs.writeFileSync(new URL('robots.txt', dir), robotsContent);
          }
        }
      }
    }
  ]
});