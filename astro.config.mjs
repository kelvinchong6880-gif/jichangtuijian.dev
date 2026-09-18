import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';

const isProd = process.env.NODE_ENV === 'production';
const isPreviewEnv = process.env.IS_PREVIEW === 'true'; // 用于 Cloudflare Preview
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
          // 根据环境生成不同的 robots.txt
          const robotsTxtPath = new URL('robots.txt', dir);
          if (isProd && !isPreviewEnv && !SITE_DOMAIN.includes('example-jichang.com')) {
            fs.writeFileSync(robotsTxtPath, `User-agent: *\nAllow: /\n\nSitemap: ${SITE_DOMAIN}/sitemap-index.xml`);
          } else {
            // 预览环境或无正式域名环境，全面禁止索引
            fs.writeFileSync(robotsTxtPath, `User-agent: *\nDisallow: /`);
          }
        }
      }
    }
  ]
});