# jichangtuijian.pro

机场推荐站（Astro 静态站，部署在 Cloudflare Pages）。

## 改数据
- 机场价格 / 流量 / 优惠码 / 推荐理由：`src/data/providers/*.json`
- 更新日期：`src/data/providers.ts` 顶部的 `UPDATED`，以及 `astro.config.mjs` 的 `LASTMOD`

首页、排行榜（/recommend/）、便宜机场（/cheap/）、性价比机场（/value/）、机场对比（/compare/）和测评页（/review/）都从这些数据自动计算。

## 命令
- `npm run dev` 本地预览
- `npm run build` 构建到 `dist/`
- `npm run indexnow` 构建后向 Bing 推送全部网址
