# 机场推荐 - Astro 静态博客

这是一个基于 Astro v5 和 Tailwind CSS v4 构建的静态博客项目。设计目标是完全符合 Bing Webmaster Guidelines，拥有极快的加载速度和完全静态的 HTML（有利于搜索引擎爬取）。

## 开发与本地预览

确保您安装了 Node.js (v18+)

```bash
# 安装依赖
npm install

# 启动本地开发服务器
npm run dev

# 检查代码与数据类型是否匹配
npx astro check

# 构建静态产物 (至 dist 文件夹)
npm run build
```

## 部署到 Cloudflare Pages

此项目配置完全兼容 Cloudflare Pages。

### 所需的最少步骤：
1. **GitHub 推送**：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/您的用户名/您的仓库.git
   git push -u origin main
   ```
2. **Cloudflare 连接**：
   - 登录 Cloudflare 控制台，进入 `Workers & Pages` -> `Pages` -> `Connect to Git`。
   - 选择刚推送的 GitHub 仓库。
   - **Build settings**:
     - Framework preset: `Astro`
     - Build command: `npm run build`
     - Build output directory: `dist`
   - 点击保存并部署。
3. **绑定自定义域名**：
   - 部署成功后，在 Pages 项目设置的 `Custom Domains` 中添加您的正式域名。
4. **修改代码中的域名配置**：
   - 打开 `astro.config.mjs`，将 `site` 字段的 `https://www.example-jichang.com` 替换为您的真实域名。
   - 重新 Push 代码，触发重新构建。
