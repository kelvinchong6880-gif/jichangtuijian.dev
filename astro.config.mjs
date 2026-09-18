import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';

const isProd = process.env.NODE_ENV === 'production';
const isPreviewEnv = process.env.IS_PREVIEW === 'true' || (process.env.CF_PAGES === '1' && process.env.CF_PAGES_BRANCH !== 'main'); // 鐢ㄤ簬 Cloudflare Preview
const SITE_DOMAIN = process.env.SITE_DOMAIN || 'https://www.example-jichang.com';

// 涓ユ牸鐨勪笂绾块樆姝㈡鏌?if (isProd && !isPreviewEnv && SITE_DOMAIN.includes('example-jichang.com')) {
  throw new Error("銆愭瀯寤洪樆姝€戞寮忕幆澧冩瀯寤哄け璐ワ細灏氭湭閰嶇疆鐪熷疄姝ｅ紡鍩熷悕銆傝璁剧疆 SITE_DOMAIN 鐜鍙橀噺銆?);
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
        // 濡傛灉鏄寮忔瀯寤猴紝绂佹婕旂ず鐩稿叧椤甸潰杩涘叆 sitemap
        // 娉ㄦ剰锛氭垜浠皢鍦?getStaticPaths 鍜岄〉闈㈣幏鍙栨暟鎹椂鎺掗櫎 dummy锛?        // 杩欓噷浣滀负绗簩閬撻槻绾裤€傜敱浜庡崰浣嶆暟鎹彲鑳借杩囨护鎺夛紝杩欓噷涓昏鎷︽埅鍙兘閬楁紡鐨勮矾寰勩€?        return true; 
      }
    }),
    {
      name: 'robots-generator',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          // 鏍规嵁鐜鐢熸垚涓嶅悓鐨?robots.txt
          const robotsTxtPath = new URL('robots.txt', dir);
          if (isProd && !isPreviewEnv && !SITE_DOMAIN.includes('example-jichang.com')) {
            fs.writeFileSync(robotsTxtPath, `User-agent: *\nAllow: /\n\nSitemap: ${SITE_DOMAIN}/sitemap-index.xml`);
          } else {
            // 棰勮鐜鎴栨棤姝ｅ紡鍩熷悕鐜锛屽叏闈㈢姝㈢储寮?            fs.writeFileSync(robotsTxtPath, `User-agent: *\nDisallow: /`);
          }
        }
      }
    }
  ]
});