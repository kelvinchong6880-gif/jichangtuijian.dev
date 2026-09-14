const fs = require('fs');

fs.writeFileSync('src/pages/index.astro', `---
import BaseLayout from '../layouts/BaseLayout.astro';
import Disclosure from '../components/Disclosure.astro';
import ProviderCard from '../components/ProviderCard.astro';
import { getProviders } from '../data/providers';
import { SITE } from '../data/config';

const providers = getProviders();
---

<BaseLayout 
    title={\`\${SITE.title} | 2026 机场推荐\`}
    description={\`\${SITE.description}\`}
>
    <div class="container">
        <div style="margin-bottom: 2rem;">
            <h1>2026 年精选机场推荐</h1>
            <p style="color: var(--text-muted);">
                <strong>最后更新：</strong> {SITE.lastVerified} | <strong>作者：</strong> {SITE.author}
            </p>
        </div>

        <Disclosure />

        <div style="margin-bottom: 2rem;">
            <h2>为什么选择这些机场？</h2>
            <p style="line-height: 1.8;">
                我们根据各服务商当前公开的套餐价格、流量、有效期、线路说明及使用场景，整理了 2026 年机场推荐与对比信息，帮助新手更快找到适合自己的稳定方案。
            </p>
        </div>

        <div style="margin-bottom: 3rem;">
            <h2>机场推荐列表 (Top {providers.length})</h2>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">以下列表基于编辑商业排序。</p>
            
            <div class="provider-list">
                {providers.map((provider, index) => (
                    <ProviderCard provider={provider} rank={index + 1} />
                ))}
            </div>
        </div>

        <section style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
            <h2>常见问题 (FAQ)</h2>
            <div style="margin-top: 1.5rem;">
                <div style="margin-bottom: 1.5rem;">
                    <strong>Q: 什么是 IPLC / IEPL 专线？</strong>
                    <p style="margin-top: 0.5rem;">A: 官方资料标注的 IPLC (国际私有租用线路) 和 IEPL (国际以太网专线) 通常是不经过公网防火墙的内网专线。根据官方页面称，这类线路在晚高峰期能提供极低的延迟和极高的稳定性，适合游戏和重度流媒体用户。</p>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <strong>Q: 我应该买年付还是月付？</strong>
                    <p style="margin-top: 0.5rem;">A: 强烈建议新手先购买“月付”套餐进行测试，确认在您当地的网络环境下速度和稳定性符合预期后，再考虑购买更划算的半年付或年付套餐。</p>
                </div>
            </div>
        </section>
    </div>
</BaseLayout>
`, 'utf8');

fs.writeFileSync('src/pages/recommend.astro', `---
import BaseLayout from '../layouts/BaseLayout.astro';
import Disclosure from '../components/Disclosure.astro';
import ProviderCard from '../components/ProviderCard.astro';
import { getProviders } from '../data/providers';
import { SITE } from '../data/config';

const providers = getProviders();
---

<BaseLayout 
    title={\`2026 年机场推荐：8 家热门机场套餐与价格对比 | \${SITE.title}\`}
    description="2026年机场推荐与套餐对比指南。全面介绍各机场的起步价格、流量以及支持的协议。"
>
    <div class="container">
        <div style="margin-bottom: 2rem;">
            <h1>2026 年机场推荐：8 家热门机场套餐与价格对比</h1>
            <p style="color: var(--text-muted);">
                <strong>最后更新：</strong> {SITE.lastVerified} | <strong>作者：</strong> {SITE.author}
            </p>
        </div>

        <Disclosure />

        <div style="margin-bottom: 3rem; margin-top: 2rem;">
            <h2>快速对比表格</h2>
            <div class="table-container" style="overflow-x: auto; margin-top: 1rem;">
                <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
                    <thead>
                        <tr style="background-color: var(--card-bg); border-bottom: 2px solid var(--border-color); text-align: left;">
                            <th style="padding: 1rem;">排名</th>
                            <th style="padding: 1rem;">机场名称</th>
                            <th style="padding: 1rem;">最低套餐 | 月付参考</th>
                            <th style="padding: 1rem;">基础流量</th>
                            <th style="padding: 1rem;">快速结论</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers.map((p, i) => (
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 1rem;">#{i + 1}</td>
                                <td style="padding: 1rem;">
                                    <a href={\`/review/\${p.slug}\`} style="font-weight: 600;">{p.name}</a>
                                </td>
                                <td style="padding: 1rem; color: var(--primary); font-weight: bold;">{p.price}</td>
                                <td style="padding: 1rem;">{p.traffic}</td>
                                <td style="padding: 1rem; font-size: 0.9rem;">
                                    {i === 0 ? "支持 IPLC，提供多档套餐" : 
                                     i === 1 ? "提供专线，适合日常和流媒体" : 
                                     i === 2 ? "高性价比，多种协议支持" : "根据官方资料，提供稳定接入"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div style="margin-bottom: 3rem;">
            <h2>详细介绍</h2>
            <div class="provider-list">
                {providers.map((provider, index) => (
                    <ProviderCard provider={provider} rank={index + 1} />
                ))}
            </div>
        </div>
    </div>
</BaseLayout>
`, 'utf8');

fs.writeFileSync('src/pages/review/[slug].astro', `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Disclosure from '../../components/Disclosure.astro';
import { getProviders } from '../../data/providers';
import { SITE } from '../../data/config';

export function getStaticPaths() {
    const providers = getProviders();
    return providers.map(p => ({
        params: { slug: p.slug },
        props: { provider: p }
    }));
}

const { provider } = Astro.props;
---

<BaseLayout 
    title={\`\${provider.name} 怎么样？2026 套餐价格与线路介绍\`}
    description={\`\${provider.name} 怎么样？本文为您介绍 \${provider.name} 的最新套餐价格、流量信息、线路特色以及优惠活动，帮助您选择合适的机场。\`}
>
    <div class="container">
        <div style="margin-bottom: 2rem;">
            <h1>{provider.name} 怎么样？2026 套餐价格与线路介绍</h1>
            <p style="color: var(--text-muted);">
                <strong>最后更新：</strong> {SITE.lastVerified}
            </p>
        </div>

        <Disclosure />

        <div class="card" style="margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h2 style="margin-bottom: 0.5rem;">{provider.name}</h2>
                    <p style="font-size: 1.1rem; color: var(--text-muted);">官方页面称提供稳定的线路和优质的流媒体解锁服务。</p>
                </div>
                <a href={provider.url} target="_blank" rel="sponsored nofollow noopener" class="btn">访问 {provider.name} 官网</a>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                <div>
                    <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.25rem;">起步套餐</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">{provider.price}</div>
                </div>
                <div>
                    <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.25rem;">包含流量</div>
                    <div style="font-size: 1.5rem; font-weight: bold;">{provider.traffic}</div>
                </div>
                <div>
                    <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.25rem;">支持协议</div>
                    <div style="font-size: 1.1rem;">
                        {provider.protocols.map(p => (
                            <span style="display: inline-block; background: var(--bg-alt); padding: 0.2rem 0.5rem; border-radius: 4px; margin-right: 0.5rem; font-size: 0.85rem;">{p}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 3rem;">
            <h2>线路与特点介绍</h2>
            <div class="article-content" style="margin-top: 1rem;">
                <p>根据官方资料，<strong>{provider.name}</strong> 提供了多种线路选择。</p>
                <ul style="margin-top: 1rem;">
                    {provider.features.map(f => (
                        <li style="margin-bottom: 0.5rem;">{f}</li>
                    ))}
                </ul>
                <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem;">* 注：以上特点均基于该服务商官网公布的信息，本站未进行独立长期性能验证。</p>
            </div>
        </div>

        <div style="margin-top: 3rem;">
            <h2>全部套餐与价格</h2>
            <div class="table-container" style="margin-top: 1.5rem; overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
                    <thead>
                        <tr style="background-color: var(--card-bg); border-bottom: 2px solid var(--border-color); text-align: left;">
                            <th style="padding: 1rem;">套餐名称</th>
                            <th style="padding: 1rem;">价格 (起)</th>
                            <th style="padding: 1rem;">流量 (月)</th>
                            <th style="padding: 1rem;">周期</th>
                        </tr>
                    </thead>
                    <tbody>
                        {provider.plans.map(plan => (
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 1rem; font-weight: 500;">{plan.name}</td>
                                <td style="padding: 1rem; color: var(--primary);">{plan.price}</td>
                                <td style="padding: 1rem;">{plan.traffic}</td>
                                <td style="padding: 1rem;">{plan.period}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: var(--card-bg); border-radius: 8px; text-align: center;">
            <h3 style="margin-bottom: 1rem;">前往 {provider.name} 查看最新活动</h3>
            <p style="margin-bottom: 1.5rem; color: var(--text-muted);">点击下方按钮可直达官方网站，获取最新的折扣信息和活动详情。</p>
            <a href={provider.url} target="_blank" rel="sponsored nofollow noopener" class="btn" style="padding: 0.8rem 2rem; font-size: 1.1rem;">立即访问</a>
        </div>
    </div>
</BaseLayout>
`, 'utf8');

console.log('Successfully recreated index.astro, recommend.astro, and [slug].astro!');
