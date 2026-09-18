# 维护与更新指南

本项目的数据和页面结构进行了彻底解耦，您无需懂代码即可更新品牌套餐或发布新文章。

## 数据模型说明

所有品牌数据位于 `src/content/brands/` 目录。
您可以直接复制 `src/templates/brand_template.md` 模板文件到 `src/content/brands/`下来创建新品牌。注意：`src/templates` 目录已置于内容加载器外部，确保模板本身不会被编译发布。

## 演示数据与正式环境隔离机制

本站具备极强的数据隔离能力：
- **本地/预览环境（含占位域名时）**：允许显示带 `is_dummy: true` 的占位数据。系统会在所有页面的 `<head>` 强制注入 `<meta name="robots" content="noindex, nofollow" />`，并在根目录生成 `Disallow: /` 的 `robots.txt`，确保预览环境不会被搜索引擎错误索引。
- **正式发布拦截机制**：如果您尝试在生产环境（PROD）构建，但未提供真实正式域名（即仍为 example-jichang 占位符），或未提供哪怕一个真实的非演示品牌，Astro 将主动中断构建。
- **正式发布构建（验证通过）**：在正式发布成功时，生成的 HTML 页面将自动移除所有的 `noindex` 标签，`robots.txt` 会自动恢复允许抓取并指向正确的真实域名 Sitemap。我们已经在本地测试通过了这一环境切换行为。

### 正式上线前的资料准备（必须解决）：
1. 填写真实的 Sogo云 及其它 8-30 个品牌的资料，并将 `is_dummy: true` 删除或改为 `false`。
2. 配置正式域名环境变量 `SITE_DOMAIN`。
（注：当前提供的 `real_brand.md` 仅为环境测试用的真实验证品牌，正式上线时请填充完整的、经过核对真实官网与测速的品牌信息。）

## 部署至 Cloudflare Pages 与 DNS 设置

发布过程完全采用官方标准授权流程：
1. **GitHub 仓库**：在您的 GitHub 新建空仓库，然后推送本地代码：
   ```bash
   git remote add origin https://github.com/您的用户名/您的仓库.git
   git push -u origin main
   ```
2. **Cloudflare 授权与部署**：
   - 登录 Cloudflare 控制台，进入 `Workers & Pages` -> `Pages` -> `Connect to Git`。
   - 走官方 OAuth 流程授权读取该 GitHub 仓库，无需交出密码。
   - 选择框架为 `Astro`。
   - **必需的环境变量设置 (Environment variables)**:
     - 变量名: `SITE_DOMAIN`，值: `https://您的正式域名.com`
3. **DNS 绑定**：
   - 部署完成后，在 Pages 设置的 `Custom Domains` 中绑定域名。
   - 如果您的域名由 Cloudflare 托管，系统会自动添加 CNAME 记录。如果不托管，请按提示前往您的域名注册商处配置 CNAME 指向您的 `*.pages.dev`。

## Bing IndexNow 配置与发送通知 (待配置)

向 Bing 实时提交 URL 需要完成验证与请求两个步骤。
**1. 验证所有权**
- 建议直接在 Bing Webmaster Tools 中通过 Cloudflare DNS 导入或添加 CNAME/TXT 记录验证站点（无需更改代码）。
- 获取 IndexNow Key，将其放置在项目的 `public/` 目录下（例如 `public/your-key.txt`）。

**2. 发送 IndexNow 请求**
在您绑定正式域名并完成构建后，需向 Bing 发送标准 POST 请求。您可以在终端执行如下格式的命令进行提交：
```bash
curl -X POST "https://api.indexnow.org/indexnow" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
           "host": "您的正式域名.com",
           "key": "您获取的KEY",
           "keyLocation": "https://您的正式域名.com/your-key.txt",
           "urlList": [
             "https://您的正式域名.com/",
             "https://您的正式域名.com/brands/sogo/"
           ]
         }'
```
（注：未来可以将其配置为 GitHub Action 实现每次发布后自动 POST）。
