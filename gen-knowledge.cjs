const fs = require('fs');

const layoutTemplate = (title, desc, topic, h1, content) => `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout 
    title="${title}"
    description="${desc}"
>
    <div class="container">
        <div style="margin-bottom: 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                <a href="/" style="color: var(--primary); text-decoration: none;">首页</a> &gt; <a href="/knowledge/" style="color: var(--primary); text-decoration: none;">机场知识</a> &gt; <span>${topic}</span>
            </div>
            <h1>${h1}</h1>
        </div>

        <div class="article-content" style="background: var(--card-bg); padding: 2rem; border-radius: 8px; border: 1px solid var(--border-color);">
${content}
        </div>
    </div>
</BaseLayout>
`;

const files = {};

// 1. what-is-jichang
files['what-is-jichang.astro'] = layoutTemplate(
    '机场是什么？新手零基础科普指南 | 机场知识',
    '第一次看到“机场”这个网络术语？本文为您详细解释机场是什么、为什么叫机场，以及它的基本组成和主要用途。',
    '机场是什么',
    '机场是什么？新手零基础科普指南',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>“机场”是提供科学上网（翻墙）节点的服务商的代称。新手用户通过购买机场的套餐，将节点导入到特定的客户端软件中，即可实现国际互联网的无缝访问。
            </div>
            
            <h2>机场是什么？为什么叫“机场”？</h2>
            <p>在网络环境中，“机场”并不是指现实中的飞机场，而是提供跨境网络加速节点的服务商。这个词起源于早期最流行的一种代理协议叫做 Shadowsocks，其客户端软件的图标是一架小纸飞机。随着时间推移，提供大量纸飞机节点的服务商就被网友们形象地称为“机场”。</p>
            <p>机场的核心作用就是提供一条或者多条“代理线路”，帮助您的设备（手机、电脑）通过这些线路连接到全球各地的服务器，从而访问您本地网络无法直接访问的网站，例如 Google、YouTube、GitHub 等。</p>

            <h2>机场的基本组成</h2>
            <p>一个完整的机场服务通常包含以下几个部分：</p>
            <ul>
                <li><strong>官方网站与后台面板：</strong> 用于注册账号、查看套餐、购买以及获取订阅链接。</li>
                <li><strong>节点（服务器）：</strong> 机场在不同国家和地区（如香港、日本、美国）部署的服务器，它们是您上网的中转站。如果您想了解更多关于节点的知识，请阅读我们的<a href="/knowledge/node/">机场节点指南</a>。</li>
                <li><strong>订阅链接（Subscribe Link）：</strong> 一串包含所有节点信息的 URL 链接，您只需要将它复制到客户端中即可自动获取所有节点。相关知识请查看<a href="/knowledge/subscription/">机场订阅说明</a>。</li>
                <li><strong>流量与套餐：</strong> 机场通常按照时间（月付/年付）和可用流量（GB）来售卖套餐。</li>
            </ul>

            <h2>机场有什么用途？</h2>
            <p>机场主要被用于以下场景：</p>
            <ol>
                <li><strong>查阅资料与学习：</strong> 访问海外学术数据库、Google 搜索、维基百科等。</li>
                <li><strong>流媒体娱乐：</strong> 观看 Netflix、Disney+、HBO、YouTube 等流媒体服务。由于不同国家版权限制，很多人使用机场节点来解锁特定国家的内容。</li>
                <li><strong>跨境电商与外贸：</strong> 访问 TikTok 国际版、亚马逊后台等需要当地原生网络环境的业务。</li>
                <li><strong>AI 工具：</strong> 顺畅访问 ChatGPT、Midjourney、Claude 等限制区域的 AI 工具。</li>
            </ol>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">常见误区</h3>
                <p><strong>误区：买了机场就能直接翻墙。</strong></p>
                <p>正解：机场只是“网络服务提供商”，它不提供 App 本身。您必须先在手机或电脑上安装兼容的<strong>客户端软件</strong>（如 Clash、Shadowrocket、v2rayN），然后将机场的订阅链接导入到软件中，才能开始使用。</p>
            </div>

            <h2>常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 机场和 VPN 有什么区别？</strong>
                <p style="margin-top: 0.5rem;">A: 简单的区分是，传统 VPN（如 ExpressVPN）提供一键连接的 App，主要用于加密和隐私保护；而“机场”通常基于代理协议，主要目的是绕过防火墙。机场在突破网络封锁的速度和伪装性上通常优于传统 VPN。详细对比可以看<a href="/vpn/vpn-vs-proxy/">VPN和机场的区别</a>。</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 机场安全吗？我的隐私会被泄露吗？</strong>
                <p style="margin-top: 0.5rem;">A: 机场主要解决连通性问题，不具备传统 VPN 极强的隐私加密特性。建议在不明机场环境下避免进行敏感的金融交易，日常网页浏览使用 HTTPS 是相对安全的。</p>
            </div>

            <p style="margin-top: 3rem; text-align: center;">如果您已经理解了机场是什么，可以继续查看 <a href="/recommend/">2026 机场套餐与价格对比</a>。</p>
`
);

// 2. node
files['node.astro'] = layoutTemplate(
    '机场节点是什么？如何选择合适的节点国家与线路',
    '深入理解机场节点（服务器）的概念。节点国家怎么选？游戏、流媒体和日常上网对节点有什么不同要求？',
    '机场节点',
    '机场节点是什么？如何选择合适的节点',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>“节点”就是机场部署在世界各地的服务器。连接某个节点，您的设备在互联网上就会伪装成该节点所在地的 IP，从而享受当地的网络访问权限。
            </div>

            <h2>什么是机场节点？</h2>
            <p>如果您已经看过我们的<a href="/knowledge/what-is-jichang/">机场是什么</a>，就会知道机场本质上提供的是网络中转服务。而这个中转的实体，就是“节点”。</p>
            <p>当您连接到一个“日本节点”时，您的所有上网数据会先发送到机场在日本的服务器，然后由该服务器去请求您想访问的网站（如 Google）。这样，Google 看到的访问者就来自日本，从而允许您访问内容。</p>

            <h2>节点国家/地区怎么选？</h2>
            <p>不同的使用场景对节点地区的要求不同：</p>
            <ul>
                <li><strong>香港 (HK)：</strong> 物理距离大陆最近，通常是<strong>延迟最低、速度最快</strong>的节点。适合日常快速网页浏览、游戏加速和追求极速响应的用户。</li>
                <li><strong>日本 (JP) / 韩国 (KR)：</strong> 亚洲地区的优质选择，拥有极高的带宽。非常适合观看 YouTube 等高质量流媒体。</li>
                <li><strong>美国 (US)：</strong> 带宽极大且通常倍率较低。适合大文件下载或访问严格限制美国 IP 的特定服务（如原版 ChatGPT）。</li>
                <li><strong>台湾 (TW) / 新加坡 (SG)：</strong> 适合特定区域流媒体解锁（如动画疯或特定 Netflix 剧集）或游戏锁区需求。</li>
            </ul>

            <h2>节点的线路类型</h2>
            <p>除了国家地区，节点名称中通常还会带有线路类型的缩写（如 IEPL、IPLC、BGP 等）。这些代表了数据从您本地传输到该服务器的底层路径质量：</p>
            <p>通常情况下，高端机场会采用专线传输。如果您想深入了解，可以查看我们的 <a href="/knowledge/iplc-iepl/">IPLC 与 IEPL 解析</a> 以及 <a href="/knowledge/direct-relay-dedicated/">直连、中转与专线的区别</a>。</p>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">常见误区</h3>
                <p><strong>误区：节点越多越好。</strong></p>
                <p>正解：很多劣质机场会通过技术手段将一台服务器复制出几十个节点名称来凑数。相比数量，<strong>节点的质量、连通率和带宽</strong>才是决定体验的核心。10 个极其稳定的专线节点远胜于 100 个经常掉线的劣质节点。</p>
            </div>

            <h2>常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 节点名称中的“1x”, “0.5x” 是什么意思？</strong>
                <p style="margin-top: 0.5rem;">A: 这是节点的流量倍率。使用高倍率节点会成倍消耗您的套餐流量。详情请参考<a href="/knowledge/traffic-multiplier/">节点流量倍率说明</a>。</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 为什么某些节点无法连接？</strong>
                <p style="margin-top: 0.5rem;">A: 节点可能因为服务器维护、线路波动或遭到防火墙封锁而暂时失效。正规机场通常会自动监控并修复，您可以尝试切换到其他国家的节点继续使用。</p>
            </div>
`
);

// 3. subscription
files['subscription.astro'] = layoutTemplate(
    '机场订阅链接是什么？怎么用？安全注意事项',
    '机场订阅链接（Subscribe Link）是获取节点的关键。本文解答订阅链接的作用、导入方式以及切勿泄露订阅链接的安全风险。',
    '机场订阅',
    '机场订阅链接详解：作用、用法与安全防范',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>订阅链接是一串包含您机场账户所有可用节点信息的长链接（URL）。通过将它粘贴到代理客户端中，软件就能自动下载并配置好所有节点，免去手动填写的麻烦。
            </div>

            <h2>什么是订阅链接 (Subscribe Link)？</h2>
            <p>过去，配置代理节点需要手动输入服务器 IP、端口、密码和加密方式，非常繁琐且容易出错。为了解决这个问题，“订阅”机制应运而生。</p>
            <p>机场服务商会将您账号下所有可用的<a href="/knowledge/node/">节点</a>打包生成一个特定的网址（类似于 <code>https://api.example.com/sub?token=xxxx</code>）。这个网址就是订阅链接。客户端软件访问这个网址，就能自动读取并配置好几百个节点。</p>

            <h2>如何使用订阅链接？</h2>
            <p>使用过程通常只需简单的两步：</p>
            <ol>
                <li>登录您的机场官网后台，找到类似于“一键订阅”、“复制 Clash 订阅”、“复制 v2ray 订阅”的按钮，点击复制该链接。</li>
                <li>打开您的客户端软件（如 Clash、Shadowrocket、v2rayN），找到“订阅”、“配置”或“URL”选项，粘贴刚才复制的链接并点击下载/更新。</li>
            </ol>
            <p>如果您不知道如何在具体的设备上操作，请参考我们的<a href="/tutorial/">全平台使用教程</a>。</p>

            <h2>自动更新机制</h2>
            <p>订阅链接不仅用于初次导入。机场的节点 IP 可能会随时变动（比如遇到维护或被墙封锁）。当节点失效时，您只需要在客户端中点击<strong>“更新订阅 (Update)”</strong>，软件就会再次访问该链接，拉取最新的可用节点列表。优秀的客户端可以设置每天自动更新订阅。</p>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">安全防范：绝不要泄露您的订阅链接！</h3>
                <p>订阅链接相当于您机场账号的<strong>最高权限密码</strong>。链接中通常包含您独一无二的 token 密钥。</p>
                <ul>
                    <li>如果他人获得了您的订阅链接，他们就可以免费使用您的节点，消耗您的<a href="/knowledge/traffic/">套餐流量</a>。</li>
                    <li>更严重的是，机场后台通常有防滥用机制，如果检测到您的订阅链接在多个异常 IP 地址同时使用，可能会直接<strong>封禁您的账号</strong>。</li>
                </ul>
                <p>如果不小心泄露，请立即登录机场官网后台，找到“重置订阅链接 (Reset Subscribe Link)”按钮。重置后，旧的链接将立即失效，您必须将新链接重新导入到所有设备中。</p>
            </div>

            <h2>常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 为什么我导入订阅链接后提示下载失败？</strong>
                <p style="margin-top: 0.5rem;">A: 常见原因有两点：1. 您当前的网络环境（如公司内网）屏蔽了该机场的订阅域名；2. 您的套餐已经过期或流量耗尽。如果是前者，请尝试在不使用 Wi-Fi 的情况下用手机 4G/5G 网络更新订阅。</p>
            </div>
`
);

// 4. traffic
files['traffic.astro'] = layoutTemplate(
    '机场流量是什么？一个月多少 GB 够用？',
    '深度解析机场套餐中的流量概念。100GB、500GB 还是 1TB？帮助您根据真实使用场景选择最合适的机场流量。',
    '机场流量',
    '机场流量详解：一个月多少 GB 才够用？',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>轻度查阅资料 50-100GB 足够；重度刷视频、看流媒体建议 200-500GB；如果是下载大文件或全家多设备共享，建议 1TB 以上。
            </div>

            <h2>机场流量是如何消耗的？</h2>
            <p>当您连接机场节点后，您访问海外网站所产生的所有上传和下载数据，都会从您的机场套餐总流量中扣除。例如，您购买了 200GB/月的套餐，当月您消耗了 50GB，剩余流量即为 150GB。</p>
            <p><strong>注意：</strong>流量消耗还与您使用的<a href="/knowledge/node/">节点</a>有关。部分机场设有<a href="/knowledge/traffic-multiplier/">流量倍率</a>。如果您使用了 2 倍率节点下载 1GB 文件，套餐中将会扣除 2GB 的流量。</p>

            <h2>各场景流量消耗估算</h2>
            <p>为了帮助您选择，以下是常见网络行为的大致流量消耗估算：</p>
            <ul>
                <li><strong>网页浏览与查资料：</strong> 非常省流量，每天几小时浏览网页，一个月消耗通常在 10GB-30GB 之间。</li>
                <li><strong>社交媒体 (Twitter, Instagram)：</strong> 图片和短视频较多，每天重度使用，一个月约消耗 30GB-80GB。</li>
                <li><strong>观看 YouTube (1080P)：</strong> 1080P 画质每小时约消耗 1.5GB。每天看 1 小时，月消耗约 45GB。</li>
                <li><strong>观看 Netflix/Disney+ (4K 高清)：</strong> 4K 画质每小时约消耗 7GB。如果您是狂热追剧党，一个月可轻松突破 300GB。</li>
            </ul>

            <h2>我该选择多大的套餐？</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; margin-bottom: 2rem;">
                <thead>
                    <tr style="background-color: var(--card-bg); border-bottom: 2px solid var(--border-color); text-align: left;">
                        <th style="padding: 1rem;">用户类型</th>
                        <th style="padding: 1rem;">推荐流量</th>
                        <th style="padding: 1rem;">适用场景</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>轻度用户</strong></td>
                        <td style="padding: 1rem;">50GB - 100GB</td>
                        <td style="padding: 1rem;">Google 查资料、偶尔上推特、使用 ChatGPT 文字对话。</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>中度用户</strong></td>
                        <td style="padding: 1rem;">200GB - 500GB</td>
                        <td style="padding: 1rem;">日常刷 YouTube 短视频、追剧、长时间挂接代理。</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>重度用户</strong></td>
                        <td style="padding: 1rem;">1TB (1000GB) 以上</td>
                        <td style="padding: 1rem;">4K 电视重度观看 Netflix、下载海外资源、团队共享。</td>
                    </tr>
                </tbody>
            </table>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">常见误区</h3>
                <p><strong>误区：流量用不完可以攒到下个月。</strong></p>
                <p>正解：绝大多数常规机场套餐是“按月重置”的。无论您当月使用了多少，到了结算日（如每月15日或购买日），流量都会清零并恢复到套餐上限。如果您希望流量永不过期，可以考虑极少数机场提供的<a href="/knowledge/unlimited/">不限时套餐（按量付费）</a>。</p>
            </div>

            <p style="margin-top: 3rem; text-align: center;">明确了您的流量需求后，欢迎查阅 <a href="/recommend/">2026 机场套餐与价格对比</a> 来寻找合适的机场。</p>
`
);

// 5. traffic-multiplier
files['traffic-multiplier.astro'] = layoutTemplate(
    '什么是节点流量倍率？机场倍率如何计算？',
    '为什么刚用了几 GB 流量，后台却扣了十几 GB？本文为您详解机场节点流量倍率的计算方式与避坑指南。',
    '机场流量倍率',
    '什么是节点流量倍率？',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>节点倍率是机场计算您<a href="/knowledge/traffic/">消耗流量</a>的乘数。如果您使用 1x (一倍) 节点下载 1GB，扣 1GB。但如果您使用 5x (五倍) 节点下载 1GB，则会扣除 5GB 套餐流量。
            </div>

            <h2>为什么会有流量倍率？</h2>
            <p>机场在不同国家和线路上部署<a href="/knowledge/node/">节点</a>的成本是完全不同的。普通的海外 VPS 非常便宜，而深港 <a href="/knowledge/iplc-iepl/">IPLC 专线</a>等优质带宽的成本极高。</p>
            <p>为了让不同成本的节点能够在同一个套餐内供用户自由选择，机场引入了“倍率”概念：成本低廉的节点设置为 0.5x 或 1x；而成本极其昂贵的专线或稀缺地区节点，则设置为 2x 甚至 5x。</p>

            <h2>倍率计算实例演示</h2>
            <p>假设您当前套餐剩余 <strong>100GB</strong> 流量：</p>
            <ul>
                <li><strong>场景 A：使用 0.5x 节点传输 10GB 数据。</strong><br>
                扣费公式：10GB × 0.5 = 5GB。<br>
                套餐剩余：95GB。（相当于流量变多了）</li>
                
                <li><strong>场景 B：使用 1.0x 节点传输 10GB 数据。</strong><br>
                扣费公式：10GB × 1.0 = 10GB。<br>
                套餐剩余：90GB。（所见即所得）</li>
                
                <li><strong>场景 C：使用 5.0x 节点传输 10GB 数据。</strong><br>
                扣费公式：10GB × 5.0 = 50GB。<br>
                套餐剩余：50GB。（流量急剧消耗）</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">新手避坑指南</h3>
                <p>一些不良服务商会打出“10元 1000GB”的超低价噱头吸引用户。但购买后发现，所有稍微好用的节点倍率都是 10x 甚至 20x，这意味着 1000GB 实际上只能当 50GB 用，非常坑人。</p>
                <p>因此，在购买前，不要只看总流量，一定要看清该服务商是否搞“高倍率套路”。在我们的 <a href="/recommend/">机场推荐清单</a> 中，我们通常更青睐采用“全节点 1x 倍率”且定价透明的机场。</p>
            </div>

            <h2>常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 如何知道当前连接节点的倍率？</strong>
                <p style="margin-top: 0.5rem;">A: 大部分机场会在客户端的节点名称中直接标明（例如：<code>🇭🇰 香港 IEPL专线 | 1x</code>）。如果没有标明，通常可以在机场官网的面板“节点列表”处查看到对应倍率。</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 高倍率节点一定速度更快吗？</strong>
                <p style="margin-top: 0.5rem;">A: 不一定。高倍率通常是因为该线路的带宽成本高或 IP 稀缺（如原生住宅 IP）。如果只是为了看普通的 YouTube 视频，使用 1x 的大带宽节点通常体验更好且更省流量。</p>
            </div>
`
);

// 6. iplc-iepl
files['iplc-iepl.astro'] = layoutTemplate(
    'IPLC 与 IEPL 专线是什么？为什么高端机场都在用？',
    '一文读懂 IPLC（国际私有租用线路）与 IEPL（国际以太网专线）。了解专线网络为何拥有超低延迟且不会被墙封锁。',
    'IPLC / IEPL 专线',
    'IPLC 与 IEPL 专线解析',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>IPLC 和 IEPL 都是企业级的物理内网专线。由于数据传输不过传统的公网防火墙，这类线路不仅延迟极低，而且几乎完全免疫封锁（不被墙），是高端机场的标配。
            </div>

            <h2>什么是 IPLC？</h2>
            <p><strong>IPLC</strong> (International Private Leased Circuit，国际私有租用线路) 是一种传统的企业级点对点通信专线。它相当于在两点（例如深圳和香港）之间拉了一根专属的网线。</p>
            <p>使用 IPLC 专线的机场节点，您的网络数据会先进入国内服务器（如深圳入口），然后通过这根“专属网线”直接传输到海外服务器（如香港出口）。在此过程中，数据不经过公共的国际出口，因此<strong>不受到防火墙的干扰和检测</strong>。</p>

            <h2>什么是 IEPL？</h2>
            <p><strong>IEPL</strong> (International Ethernet Private Line，国际以太网专线) 可以看作是 IPLC 的升级版。它是基于纯以太网技术的端到端专线，拥有比传统 IPLC 更高的灵活性和更低的网络层级开销。</p>
            <p>对普通机场用户而言，IPLC 和 IEPL 在体验上的差异微乎其微。它们都被统称为“专线”，都具备极低的延迟和不被墙的优势。</p>

            <h2>专线（IPLC/IEPL）的巨大优势</h2>
            <ul>
                <li><strong>免疫封锁（防墙）：</strong> 每逢特定敏感时期，普通线路大批阵亡，但专线因为不过公网防火墙，通常能保持坚挺。</li>
                <li><strong>超低延迟：</strong> 由于是端到端直达（如深港专线延迟通常在个位数毫秒），它是外服游戏加速、高频交易的唯一选择。</li>
                <li><strong>晚高峰不卡顿：</strong> 晚上 8:00 - 11:00 是网络拥堵高峰，普通国际出口会发生严重丢包。而专线独享带宽，即使在晚高峰依然能跑满测速。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">常见误区</h3>
                <p><strong>误区：只要标注了 IPLC 就一定最快。</strong></p>
                <p>正解：专线成本极其高昂（通常按 Megabit 计费）。有些服务商虽然使用了真 IPLC 线路，但购买的带宽非常小（水管很细），当大量用户同时涌入时，依然会因为拥挤而变得极其缓慢。因此，除了线路名称，机场的总体带宽容量和冗余度同样重要。</p>
            </div>

            <h2>常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 为什么专线套餐往往更贵或流量更少？</strong>
                <p style="margin-top: 0.5rem;">A: 因为企业级专线的每 Mbps 带宽成本可能是普通公网带宽的百倍以上。羊毛出在羊身上，正规的专线机场往往只能提高单价或降低可用流量。如果想了解其他类型的线路（如直连或公网中转），请参考<a href="/knowledge/direct-relay-dedicated/">直连与中转的区别</a>。</p>
            </div>

            <p style="margin-top: 3rem; text-align: center;">如果你需要寻找稳定不掉线的专线服务，可以查阅 <a href="/recommend/">2026 高端 IPLC 机场对比指南</a>。</p>
`
);

// 7. direct-relay-dedicated
files['direct-relay-dedicated.astro'] = layoutTemplate(
    '直连、中转与专线：机场线路术语新手指南',
    '如何区分机场的直连、公网中转与专线？带你了解三种常见机场网络传输方式的原理与优缺点，帮助您根据需求选择合适的机场。',
    '直连/中转/专线',
    '直连、公网中转与专线有什么区别？',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>直连（便宜但易被墙且晚高峰卡顿）、公网中转（性价比高，速度尚可）、专线（最昂贵，延迟极低且免疫封锁）。
            </div>

            <h2>1. 直连线路 (Direct)</h2>
            <p>这是最基础、最便宜的网络方式。您的设备将数据包直接发送给国外的节点服务器（如美国的 VPS）。</p>
            <ul>
                <li><strong>优点：</strong> 成本极低，流量给得特别大，适合大文件下载。</li>
                <li><strong>缺点：</strong> 数据必须直接穿过国际公网出口和防火墙（GFW），非常容易被识别并封锁 IP。晚高峰期间，由于跨国宽带严重拥挤，丢包率极高，导致看视频频繁卡顿。</li>
            </ul>

            <h2>2. 公网中转线路 (Relay / Transit)</h2>
            <p>为了解决直连线路容易被封和拥堵的问题，中转线路在您的设备和海外节点之间，加入了一台“国内中转服务器”（如上海移动或广州电信服务器）。数据先发给国内的中转机，再由中转机发往海外。</p>
            <ul>
                <li><strong>优点：</strong> 国内直连国内中转机速度很快，中转机通常有优化的出国路由，因此整体速度和稳定性大幅高于直连。也是目前性价比最高的机场方案。</li>
                <li><strong>缺点：</strong> 数据仍然要经过公网防火墙，特殊时期仍有被封锁的风险。</li>
            </ul>

            <h2>3. 专线线路 (Dedicated / IPLC / IEPL)</h2>
            <p>高端机场的终极解决方案。它同样有国内入口和海外出口，但入口和出口之间并不是通过公共互联网连接，而是通过租用跨国运营商的<strong>企业级内网物理专线</strong>连接。</p>
            <ul>
                <li><strong>优点：</strong> 完全不过公网防火墙，免疫封锁（永不被墙）。独享带宽，即使晚高峰也能保持游戏级的超低延迟和满速。详见 <a href="/knowledge/iplc-iepl/">IPLC 与 IEPL 深度解析</a>。</li>
                <li><strong>缺点：</strong> 成本极高，导致套餐单价贵，给的<a href="/knowledge/traffic/">流量</a>相对较少。</li>
            </ul>

            <h2>线路对比总结表格</h2>
            <div class="table-container" style="overflow-x: auto; margin-top: 1rem; margin-bottom: 2rem;">
                <table style="width: 100%; border-collapse: collapse; min-width: 500px;">
                    <thead>
                        <tr style="background-color: var(--card-bg); border-bottom: 2px solid var(--border-color); text-align: left;">
                            <th style="padding: 1rem;">线路类型</th>
                            <th style="padding: 1rem;">防墙能力</th>
                            <th style="padding: 1rem;">晚高峰表现</th>
                            <th style="padding: 1rem;">价格成本</th>
                            <th style="padding: 1rem;">适用场景</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 1rem;">直连</td>
                            <td style="padding: 1rem; color: #d32f2f;">极弱</td>
                            <td style="padding: 1rem; color: #d32f2f;">卡顿严重</td>
                            <td style="padding: 1rem; color: #388e3c;">极低</td>
                            <td style="padding: 1rem;">平时下载超大文件</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 1rem;">公网中转</td>
                            <td style="padding: 1rem; color: #f57c00;">一般</td>
                            <td style="padding: 1rem; color: #f57c00;">较流畅</td>
                            <td style="padding: 1rem; color: #f57c00;">中等</td>
                            <td style="padding: 1rem;">日常刷视频、高性价比选择</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 1rem;">IPLC 专线</td>
                            <td style="padding: 1rem; color: #388e3c;">极强 (免翻)</td>
                            <td style="padding: 1rem; color: #388e3c;">丝滑流畅</td>
                            <td style="padding: 1rem; color: #d32f2f;">昂贵</td>
                            <td style="padding: 1rem;">游戏加速、重要工作、敏感期</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p style="margin-top: 3rem; text-align: center;">如果你想寻找优质的专线或中转机场，请查阅 <a href="/recommend/">2026 机场推荐与套餐对比</a>。</p>
`
);

// 8. unlimited
files['unlimited.astro'] = layoutTemplate(
    '什么是不限时机场（按量付费）？',
    '不限时套餐是无限流量吗？本文为您解答不限时机场、按量付费套餐的真实含义，以及它适合哪些人群购买。',
    '不限时机场',
    '不限时机场与按量付费套餐解析',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>不限时套餐（按量付费）是指：您购买的这笔流量（如 200GB）<strong>永远不会在月底清零过期</strong>，直到您把流量用完为止。它<strong>不是</strong>指无限流量。
            </div>

            <h2>常规月付套餐 vs 不限时套餐</h2>
            <p>绝大多数常规<a href="/knowledge/traffic/">机场流量</a>套餐都是基于时间的。例如 20 元/月 100GB，无论您当月用了 1GB 还是 99GB，到了下一个结算日，没用完的流量都会清零。</p>
            <p><strong>不限时套餐（又称一次性流量包、按量付费）</strong>则打破了时间限制。您花 50 元买 200GB，如果您每个月只用 10GB，那么这个套餐可以陪伴您长达 20 个月。在此期间，只要服务商还在运营，您的节点就可以正常使用。</p>

            <h2>不限时套餐适合什么人？</h2>
            <p>如果您属于以下情况，强烈建议购买不限时套餐：</p>
            <ul>
                <li><strong>极轻度用户：</strong> 只是偶尔需要查阅一些海外技术资料，一个月连 5GB 都用不到。买月付极其浪费。</li>
                <li><strong>备用节点需求：</strong> 已经买了一个主力机场，但担心偶尔遇到突发大断网（如拔网线），买一个不限时机场作为永远的备胎，非常有安全感。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">常见误区</h3>
                <p><strong>误区：不限时套餐比月付套餐便宜。</strong></p>
                <p>正解：如果单算“每 GB 流量的价格”，不限时套餐通常比月付套餐贵很多。服务商愿意卖不限时套餐，是因为他们笃定很多轻度用户买完后很长时间都不会产生太多带宽成本，或者还没用完机场就停止运营了。</p>
                <p><strong>误区：不限时 = 无限流量。</strong></p>
                <p>正解：完全错误。不限时指的是“时间不过期”，流量额度是用一点少一点的。真正的“无限流量套餐”在目前优质机场圈子中几乎不存在，因为专线带宽成本极高。</p>
            </div>

            <h2>常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 不限时套餐真的永远有效吗？</strong>
                <p style="margin-top: 0.5rem;">A: 理论上，只要您的流量没用完，且机场依然存在并在运营，它就有效。但请参考我们的<a href="/knowledge/risk-guide/">机场跑路风险指南</a>，所有非官方的灰色网络服务都存在因不可抗力关停的风险。所以一次性不要囤积太大的不限时流量包。</p>
            </div>

            <p style="margin-top: 3rem; text-align: center;">如果您需要寻找提供不限时套餐的服务商，请在 <a href="/recommend/">2026 机场推荐对比</a> 页面中留意标有“一次性”或“不限时”字样的机场（如 SOGOCloud 等）。</p>
`
);

// 9. plan-selection
files['plan-selection.astro'] = layoutTemplate(
    '机场套餐怎么选？月付还是年付？流量多少合适？',
    '面对琳琅满目的机场套餐不知如何下手？本文提供一套科学的机场套餐选择逻辑，帮助新手规避高危选项，挑选最适合自己需求的节点方案。',
    '套餐怎么选',
    '机场套餐选择指南：如何挑选最适合自己的套餐？',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>新手首次购买任何机场，<strong>绝对推荐先买一个月（月付）</strong>进行试用。确认速度和稳定性达标后，再考虑长期套餐。轻度上网选 50GB，重度看视频选 200GB+。
            </div>

            <h2>第一步：根据使用场景选择线路级别</h2>
            <p>价格差距往往体现在线路上（关于线路名词可复习 <a href="/knowledge/direct-relay-dedicated/">直连中转专线区别</a>）：</p>
            <ul>
                <li><strong>如果你是外服游戏玩家 / 晚高峰对网络极其敏感 / 重要跨境电商：</strong> 必须选择标有 <a href="/knowledge/iplc-iepl/">IPLC / IEPL</a> 的全专线机场套餐。</li>
                <li><strong>如果你是重度追剧党 / 日常查资料 / 追求性价比：</strong> 选择提供优质公网中转线路（如 BGP 中转）的机场，既能保证看视频流畅，又能获得充足的流量。</li>
            </ul>

            <h2>第二步：确定需要的流量大小</h2>
            <p>永远不要盲目追求“流量越大越好”，绝大部分人都高估了自己的用量。具体估算可参考我们的<a href="/knowledge/traffic/">流量消耗估算说明</a>：</p>
            <ul>
                <li><strong>极轻度偶尔用：</strong> 直接购买<a href="/knowledge/unlimited/">不限时套餐（按量付费包）</a>，用多少算多少，时间不过期。</li>
                <li><strong>每天几小时网页/推特：</strong> 50GB - 100GB / 月。</li>
                <li><strong>每天高强度刷视频 (YouTube/Netflix)：</strong> 200GB - 500GB / 月。</li>
            </ul>
            <p><em>注意：选购时务必确认机场是否存在恶意的<a href="/knowledge/traffic-multiplier/">高节点流量倍率</a>。</em></p>

            <h2>第三步：购买周期 (月付 vs 季付 vs 年付)</h2>
            <p>机场行业因为处于灰色地带，时刻面临不可抗力风险（详见<a href="/knowledge/risk-guide/">防跑路指南</a>）。关于付款周期，我们有以下铁律：</p>
            <ol>
                <li><strong>新机场首次接触：只能月付！</strong> 无论年付的折扣看起来多么诱人，必须先花小钱买一个月，在您自己当地的网络环境（联通/电信/移动）亲自体验晚高峰的速度。别人测速再快也不代表您用着快。</li>
                <li><strong>信任期后：季付或半年付。</strong> 如果一个机场您稳定使用了几个月，且服务商售后态度良好，可以考虑购买季付或半年付，以获得一定的折扣。</li>
                <li><strong>尽量避免：大额年付或三年付。</strong> 除非是行业里口碑极好、经营超过 5 年以上的老牌稳定机场，否则极度不推荐直接年付。省下的一两百块钱，很容易因为机场跑路而全部打水漂。</li>
            </ol>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">常见误区</h3>
                <p><strong>误区：花钱买最贵的“旗舰版”套餐速度就最快。</strong></p>
                <p>正解：很多机场的“基础版”和“旗舰版”在节点质量和速度上是完全一样的，唯一的区别只是给的流量多少，或者允许同时在线的设备数不同。请仔细阅读套餐的说明文本，如果没写“旗舰版拥有专属极速节点”，那速度大概率是一样的。</p>
            </div>

            <p style="margin-top: 3rem; text-align: center;">如果您已经掌握了选购技巧，欢迎前往 <a href="/recommend/">2026 机场推荐与套餐对比</a> 页面挑选您的理想服务商。</p>
`
);

// 10. risk-guide
files['risk-guide.astro'] = layoutTemplate(
    '机场会跑路吗？新手购买机场防坑与风险防范指南',
    '提供科学上网的机场安全吗？什么是机场跑路？本文揭示机场运营背后的风险，教您如何最大程度保护个人资金和隐私安全。',
    '机场风险防范',
    '机场安全与“跑路”风险防范指南',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>所有提供翻墙服务的机场都处于灰色地带，面临不可抗力打击或资金断裂的风险，任何机场都有可能“跑路”（关停跑路）。防范的最佳手段是：<strong>拒绝大额长周期付款（如年付/三年付），且始终准备一个备用机场。</strong>
            </div>

            <h2>什么是“机场跑路”？</h2>
            <p>“跑路”是指机场服务商在没有任何通知的情况下，突然关闭网站、清空 Telegram 售后群，导致用户之前购买的长期套餐直接作废，无法退款。</p>
            <p>引发跑路的原因通常有两种：</p>
            <ol>
                <li><strong>不可抗力打击：</strong> 服务器遭到封锁、支付渠道被冻结，甚至运营人员被查处。</li>
                <li><strong>资金链断裂或主观割韭菜：</strong> 许多劣质机场通过“超低价年付”进行疯狂促销，收到大量年付资金后，根本无力承担昂贵的海外带宽成本，直接卷款跑路。</li>
            </ol>

            <h2>如何防范资金受损？</h2>
            <p>了解了本质，您就能理解我们的核心建议（在<a href="/knowledge/plan-selection/">套餐选择指南</a>中也反复强调过）：</p>
            <ul>
                <li><strong>警惕超低价年付：</strong> 如果一家机场打出“100元/年 给你 IPLC 专线，每月 1000GB”的口号，它大概率是为了快速圈钱跑路的骗局。真正的优质宽带成本极高，不可能贱卖。</li>
                <li><strong>坚持月付或短期付款：</strong> 面对不熟悉的机场，即使年付打五折，也请按月购买。即使不幸遇到跑路，损失的也仅仅是十几二十块钱，买个教训即可。</li>
                <li><strong>购买不限时备用套餐：</strong> 强烈建议在您的主力机场之外，花几十块钱买一个其他商家的<a href="/knowledge/unlimited/">不限时按量付费套餐</a>。当主力机场临时维护或倒闭时，您依然有备用网络可以使用。</li>
            </ul>

            <h2>隐私与安全风险</h2>
            <p>除了资金风险，使用机场还伴随着一定的数据隐私风险。因为所有的机场流量都需要经过服务商的节点：</p>
            <ul>
                <li>机场管理者技术上完全可以记录您访问了什么域名（比如您访问了 Google，或者访问了某银行网站）。</li>
                <li><strong>防御措施：</strong> 请确保您在日常访问敏感服务（如网银、输入密码的后台）时，网站地址栏显示的是 <strong>HTTPS (挂锁图标)</strong>。只要是 HTTPS 加密流量，机场只能看到您访问了哪个网站的门牌号，但绝对无法解密您具体发送的账号、密码和聊天内容。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">安全防范：警惕恶意推广和客户端挂马</h3>
                <p>极少数无底线的机场，可能会诱导用户下载经过篡改的、植入了木马病毒的非官方代理客户端。为了安全起见，<strong>永远只从官方渠道（如 Apple App Store、Google Play 或开源作者的 GitHub 官方仓库）下载客户端软件。</strong>如果您不知道如何获取正版客户端，请查看本站的<a href="/tutorial/">全平台正规教程指南</a>。</p>
            </div>
`
);

// 11. Hub index.astro
files['index.astro'] = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import { SITE } from '../data/config';
---

<BaseLayout 
    title="机场知识科普：节点、订阅、流量与线路新手指南"
    description="新手必读的机场百科大全。详解机场是什么、如何选择节点、流量倍率计算、IPLC/IEPL专线科普，以及防范机场跑路的避坑指南。"
>
    <div class="container">
        <div style="margin-bottom: 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                <a href="/" style="color: var(--primary); text-decoration: none;">首页</a> &gt; <span>机场知识</span>
            </div>
            <h1>机场知识：节点、订阅、流量与线路新手指南</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-top: 1rem;">
                刚接触国际网络加速服务？面对五花八门的“节点”、“专线”、“倍率”等术语感到一头雾水？本知识库将用最通俗易懂的语言，为您拆解挑选与使用机场必备的核心概念。
            </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 3rem; margin-top: 3rem;">
            
            <!-- Category 1 -->
            <section>
                <h2 style="border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">新手入门</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/what-is-jichang/" style="color: var(--text-color); text-decoration: none;">机场是什么？</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">第一次看到“机场”这个网络术语？详细解释机场是什么、为什么叫机场以及基本组成。</p>
                        <a href="/knowledge/what-is-jichang/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/node/" style="color: var(--text-color); text-decoration: none;">机场节点是什么？</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">深入理解节点（服务器）概念。日本、香港、美国节点该怎么选？</p>
                        <a href="/knowledge/node/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/subscription/" style="color: var(--text-color); text-decoration: none;">机场订阅链接详解</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">订阅链接的作用、导入方式，以及切勿泄露链接的严重安全防范要求。</p>
                        <a href="/knowledge/subscription/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                </div>
            </section>

            <!-- Category 2 -->
            <section>
                <h2 style="border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">套餐与流量</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/traffic/" style="color: var(--text-color); text-decoration: none;">机场流量多少够用？</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">轻度还是重度用户？根据日常上网和刷视频习惯，推算您每月的流量需求。</p>
                        <a href="/knowledge/traffic/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/traffic-multiplier/" style="color: var(--text-color); text-decoration: none;">节点流量倍率说明</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">为什么用了几 GB 后台却扣了十几 GB？教你识别并规避高流量倍率套路。</p>
                        <a href="/knowledge/traffic-multiplier/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/unlimited/" style="color: var(--text-color); text-decoration: none;">不限时机场解析</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">不限时套餐是无限流量吗？按量付费套餐到底适合哪些人群购买。</p>
                        <a href="/knowledge/unlimited/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/plan-selection/" style="color: var(--text-color); text-decoration: none;">机场套餐怎么选？</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">提供科学的选择逻辑，帮您决定买月付还是年付，规避高危促销陷阱。</p>
                        <a href="/knowledge/plan-selection/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                </div>
            </section>

            <!-- Category 3 -->
            <section>
                <h2 style="border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">线路知识</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/iplc-iepl/" style="color: var(--text-color); text-decoration: none;">IPLC 与 IEPL 专线</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">一文读懂企业级内网专线为何拥有超低延迟，且无惧公网防火墙封锁。</p>
                        <a href="/knowledge/iplc-iepl/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/direct-relay-dedicated/" style="color: var(--text-color); text-decoration: none;">直连、中转与专线</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">理清公网直连、BGP 中转与内网专线的原理差异、防墙能力与价格成本对比。</p>
                        <a href="/knowledge/direct-relay-dedicated/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                </div>
            </section>

            <!-- Category 4 -->
            <section>
                <h2 style="border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">风险与避坑</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/knowledge/risk-guide/" style="color: var(--text-color); text-decoration: none;">机场跑路与风险防范</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">揭示机场运营背后的关停跑路风险，教您如何最大程度保护资金和隐私安全。</p>
                        <a href="/knowledge/risk-guide/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                </div>
            </section>

        </div>
    </div>
</BaseLayout>
`;

for (const [file, content] of Object.entries(files)) {
    fs.writeFileSync('src/pages/knowledge/' + file, content, 'utf8');
}
console.log('Successfully generated all knowledge files!');
