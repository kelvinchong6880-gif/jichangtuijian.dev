const fs = require('fs');

const indexAstro = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getProviders } from '../data/providers';
import { SITE } from '../data/config';

const providers = getProviders();
---

<BaseLayout 
    title="机场推荐与网络工具指南 | 机场知识、套餐测评与使用教程"
    description="本站提供：机场套餐资料、Provider Review、机场知识、VPN 基础、Windows / macOS / iPhone / Android 教程。服务商线路、功能、价格等资料以官方整理为基础；实际体验可能因网络环境而异。"
>
    <div class="container">
        <!-- Hero Section -->
        <div style="text-align: center; margin-bottom: 4rem; padding: 4rem 1rem; background: var(--card-bg); border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--primary);">机场推荐与网络工具新手指南</h1>
            <p style="font-size: 1.2rem; color: var(--text-muted); max-width: 800px; margin: 0 auto 2rem; line-height: 1.6;">
                帮助新手了解机场、比较套餐、查看服务商资料并完成客户端配置。本站基于各服务商官方公开资料进行聚合整理，为您提供客观的选择参考。
            </p>
            <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
                <a href="/recommend/" class="btn" style="padding: 1rem 2rem; font-size: 1.1rem; background-color: var(--primary); color: white;">查看 2026 机场推荐</a>
                <a href="/knowledge/what-is-jichang/" class="btn" style="padding: 1rem 2rem; font-size: 1.1rem; background-color: var(--bg-alt); color: var(--text-color); border: 1px solid var(--border-color);">新手先了解机场是什么</a>
            </div>
        </div>

        <!-- Top Providers Summary -->
        <div style="margin-bottom: 4rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
                <div>
                    <h2>2026 热门机场快速查看</h2>
                    <p style="color: var(--text-muted); margin-top: 0.5rem;">基于官方公开价格与线路整理的服务商摘要</p>
                </div>
                <a href="/recommend/" style="color: var(--primary); font-weight: bold;">查看完整 8 家套餐、价格和流量对比 &rarr;</a>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
                {providers.map((provider) => (
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0; margin-bottom: 0.5rem;">
                            <a href={\`/review/\${provider.slug}/\`} style="color: var(--text-color); text-decoration: none;">
                                {provider.name}
                            </a>
                        </h3>
                        <div style="color: var(--primary); font-weight: bold; font-size: 1.25rem; margin-bottom: 1rem;">
                            {provider.price} <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: normal;">{provider.priceUnit}</span>
                        </div>
                        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.5;">
                            {provider.routeInfo.length > 40 ? provider.routeInfo.substring(0, 40) + '...' : provider.routeInfo}
                        </p>
                        <a href={\`/review/\${provider.slug}/\`} class="btn" style="display: block; text-align: center; width: 100%; box-sizing: border-box; padding: 0.6rem;">查看 {provider.name} 详情</a>
                    </div>
                ))}
            </div>
        </div>

        <!-- Site Directory -->
        <div style="margin-bottom: 4rem;">
            <h2 style="margin-bottom: 1.5rem;">网站核心栏目</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                
                <div class="card" style="background: var(--card-bg); padding: 2rem; border-radius: 8px;">
                    <h3><a href="/knowledge/" style="color: var(--primary);">机场知识科普</a></h3>
                    <p style="color: var(--text-muted); margin-top: 1rem;">什么是 IPLC/IEPL？什么是节点流量倍率？帮助新手快速了解机场领域的专有名词。</p>
                </div>
                
                <div class="card" style="background: var(--card-bg); padding: 2rem; border-radius: 8px;">
                    <h3><a href="/tutorial/" style="color: var(--primary);">客户端使用教程</a></h3>
                    <p style="color: var(--text-muted); margin-top: 1rem;">提供 Windows、macOS、iOS (iPhone)、Android (安卓) 等全平台客户端的下载与配置指南。</p>
                </div>
                
                <div class="card" style="background: var(--card-bg); padding: 2rem; border-radius: 8px;">
                    <h3><a href="/vpn/" style="color: var(--primary);">VPN 基础与排障</a></h3>
                    <p style="color: var(--text-muted); margin-top: 1rem;">VPN 经常断线、速度慢怎么办？VPN 和机场（Proxy）有什么区别？</p>
                </div>

            </div>
        </div>
    </div>
</BaseLayout>
`;

fs.writeFileSync('src/pages/index.astro', indexAstro, 'utf8');
console.log('Rewrote index.astro');
