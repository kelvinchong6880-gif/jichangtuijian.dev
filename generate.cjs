const fs = require('fs');
const files = {
  'src/pages/knowledge/traffic-multiplier.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="什么是节点流量倍率？ | 机场知识" description="了解机场套餐中的节点流量倍率是什么，以及它是如何计算您消耗的实际流量的。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>什么是节点流量倍率？</h1></div>
    <div class="article-content">
      <p>在使用机场服务时，您经常会看到节点后面标注了“x0.5”、“x1”或“x5”等倍率。这就是<strong>节点流量倍率</strong>。</p>
      <h2>如何计算？</h2>
      <p>实际扣除流量 = 您实际使用的流量 × 节点倍率。</p>
      <ul>
        <li><strong>x1.0：</strong> 使用 1GB 扣除 1GB。这是最常见的倍率。</li>
        <li><strong>x0.5：</strong> 使用 1GB 仅扣除 0.5GB，通常用于冷门地区或优惠活动。</li>
        <li><strong>x5.0：</strong> 使用 1GB 扣除 5GB，通常用于极其昂贵且带宽高的高级 IPLC/IEPL 专线。</li>
      </ul>
      <p>建议日常浏览使用低倍率节点，对延迟要求高的游戏使用高倍率节点。</p>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/knowledge/what-is-jichang.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="机场是什么？ | 机场知识" description="新手科普：什么是机场？为什么大家用机场而不是传统 VPN？">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>机场是什么？</h1></div>
    <div class="article-content">
      <p>在网络语境中，<strong>“机场”</strong>通常指代提供 Shadowsocks、V2Ray、Trojan 等代理协议服务的供应商。因为早期的 Shadowsocks 客户端图标是一个纸飞机，所以这类服务商被网友们戏称为“机场”。</p>
      <h2>机场与传统 VPN 的区别</h2>
      <p>机场主要基于代理协议，专为突破网络封锁和提供低延迟路由而设计。相比传统 VPN，机场通常具有以下优势：</p>
      <ul>
        <li>更难被防火墙特征识别，稳定性更高。</li>
        <li>采用国内中转或专线（IPLC/IEPL），延迟极低。</li>
        <li>支持分流规则，国内网站直连，海外网站走代理。</li>
      </ul>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/knowledge/iplc-iepl.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="IPLC 与 IEPL 专线解析：中转和直连有什么区别？" description="了解为什么高端机场都标榜 IPLC / IEPL 专线。一文读懂中转节点与直连节点的本质区别。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>IPLC 与 IEPL 专线解析</h1></div>
    <div class="article-content">
      <p>IPLC（国际私有租用线路）和 IEPL（国际以太网专线）都是企业级专线。使用这类专线意味着数据不过传统的公网防火墙，而是直接端到端传输。</p>
      <h2>优势</h2>
      <ul>
        <li><strong>超低延迟：</strong> 尤其是在网络晚高峰期，专线能提供游戏级的低延迟。</li>
        <li><strong>不被墙：</strong> 因为不过防火墙，几乎不存在 IP 被封的情况。</li>
      </ul>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/tutorial/android.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="Android 客户端配置指南 | 使用教程" description="安卓手机如何配置机场？Clash for Android 与 v2rayNG 使用教程。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>Android 客户端配置指南</h1></div>
    <div class="article-content">
      <p>在 Android 系统上，主流的代理客户端是 Clash for Android 和 v2rayNG。</p>
      <h2>使用 Clash for Android</h2>
      <ol>
        <li>在服务商官网复制 <strong>Clash 订阅链接</strong>。</li>
        <li>打开应用，点击 <strong>配置 (Profiles)</strong> -> <strong>新配置 (New Profile)</strong>。</li>
        <li>选择 <strong>URL</strong>，粘贴订阅链接，点击右上角保存。</li>
        <li>选中刚才添加的配置，返回主页点击 <strong>启动 (Tap to start)</strong>。</li>
      </ol>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/tutorial/ios.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="iPhone (iOS) 客户端配置指南 | 使用教程" description="苹果 iOS 设备如何配置机场？Shadowrocket (小火箭) 使用教程。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>iPhone (iOS) 客户端配置指南</h1></div>
    <div class="article-content">
      <p>在 iOS 上，最常用的代理软件是 Shadowrocket（俗称小火箭）。由于国区 App Store 无法下载，您需要使用美区或非国区 Apple ID。</p>
      <h2>配置步骤</h2>
      <ol>
        <li>在服务商后台一键导入或复制 <strong>Subscribe 订阅链接</strong>。</li>
        <li>打开 Shadowrocket，点击右上角 <strong>+</strong> 号。</li>
        <li>类型选择 <strong>Subscribe</strong>，在 URL 处粘贴链接并保存。</li>
        <li>等待加载节点后，开启顶部的连接开关即可。</li>
      </ol>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/tutorial/mac.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="macOS 客户端配置指南 | 使用教程" description="Mac 电脑如何配置机场？ClashX 与 V2rayU 使用教程。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>macOS 客户端配置指南</h1></div>
    <div class="article-content">
      <p>Mac 用户通常使用 ClashX 或 ClashX Pro。</p>
      <h2>配置步骤</h2>
      <ol>
        <li>下载并安装 ClashX。</li>
        <li>在服务商后台复制 <strong>Clash 订阅链接</strong>。</li>
        <li>点击状态栏 ClashX 图标，选择 <strong>配置</strong> -> <strong>托管配置</strong> -> <strong>管理</strong>。</li>
        <li>点击 <strong>添加</strong>，粘贴链接并更新。</li>
        <li>选中相关配置并开启 <strong>设置为系统代理</strong>。</li>
      </ol>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/tutorial/windows.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="Windows 客户端配置指南 | 使用教程" description="Windows 电脑如何配置机场？Clash for Windows 及 v2rayN 使用教程。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>Windows 客户端配置指南</h1></div>
    <div class="article-content">
      <p>在 Windows 平台上，Clash for Windows 和 v2rayN 是最受欢迎的客户端。</p>
      <h2>Clash for Windows 配置步骤</h2>
      <ol>
        <li>在服务商网站复制 <strong>Clash 订阅链接</strong>。</li>
        <li>打开客户端，进入 <strong>Profiles</strong> 面板。</li>
        <li>在顶部输入框粘贴订阅链接并点击 <strong>Download</strong>。</li>
        <li>下载完成后点击选中该配置，然后进入 <strong>General</strong> 面板，开启 <strong>System Proxy</strong>。</li>
      </ol>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/vpn/vpn-disconnect.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="VPN 经常断线的排查方法" description="使用 VPN 或机场经常断线、连接不稳定怎么办？教你几个实用的排查方法。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>VPN 经常断线的排查方法</h1></div>
    <div class="article-content">
      <p>如果您在使用过程中遇到频繁断线，可以尝试以下排查步骤：</p>
      <ol>
        <li><strong>更新订阅：</strong> 节点可能已经更换了 IP，请在客户端中更新订阅。</li>
        <li><strong>更换节点：</strong> 避免使用拥挤的免费节点或公用节点。</li>
        <li><strong>检查本地网络：</strong> 确认您的本地 Wi-Fi 或蜂窝网络是否稳定。</li>
        <li><strong>关闭多余的代理软件：</strong> 确保没有其他代理软件产生冲突。</li>
      </ol>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/vpn/vpn-slow.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="VPN 速度慢怎么办？" description="VPN 或机场节点速度很慢、看视频卡顿的解决办法。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>VPN 速度慢怎么办？</h1></div>
    <div class="article-content">
      <p>如果您觉得连接速度不理想，可以按以下顺序尝试：</p>
      <ul>
        <li><strong>更换其他地区的节点：</strong> 比如从美国节点切换到距离更近的日本、香港或新加坡节点。</li>
        <li><strong>避开网络高峰期：</strong> 晚上 8:00 - 11:00 是网络晚高峰，普通线路可能会拥堵，建议购买提供专线（IPLC）的机场套餐。</li>
        <li><strong>检查客户端分流：</strong> 确保开启了“规则模式”（Rule），防止国内网站也绕道海外导致变慢。</li>
      </ul>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/vpn/vpn-vs-proxy.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="VPN 和机场（Proxy）的区别" description="为什么推荐使用机场而不是传统的 VPN 软件？两者在协议和使用场景上的核心区别。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>VPN 和机场（Proxy）的区别</h1></div>
    <div class="article-content">
      <p>很多新手容易混淆 VPN 与代理（Proxy，即机场），它们在技术实现和使用体验上有着本质区别：</p>
      <ul>
        <li><strong>VPN (虚拟专用网)：</strong> 全局接管您的网络，主要用于企业内网加密访问，特征明显，容易被墙。</li>
        <li><strong>代理 (Proxy/机场)：</strong> 基于 SS/V2Ray 等协议，专门为绕过防火墙设计，支持分流规则，体验更好，速度更快，更难被封锁。</li>
      </ul>
    </div>
  </div>
</BaseLayout>
`,
  'src/pages/knowledge/index.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="机场知识 | 新手科普与进阶" description="学习和了解机场、节点、线路等相关词汇与知识。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>机场知识科普</h1></div>
    <ul>
      <li><a href="/knowledge/what-is-jichang">机场是什么？</a></li>
      <li><a href="/knowledge/iplc-iepl">IPLC 与 IEPL 专线解析</a></li>
      <li><a href="/knowledge/traffic-multiplier">什么是节点流量倍率？</a></li>
    </ul>
  </div>
</BaseLayout>
`,
  'src/pages/tutorial/index.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="客户端使用教程 | Windows/Mac/iOS/Android" description="手把手教您在各平台设备上配置机场节点。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>客户端使用教程</h1></div>
    <ul>
      <li><a href="/tutorial/windows">Windows 客户端配置指南</a></li>
      <li><a href="/tutorial/mac">macOS 客户端配置指南</a></li>
      <li><a href="/tutorial/ios">iPhone (iOS) 客户端配置指南</a></li>
      <li><a href="/tutorial/android">Android 客户端配置指南</a></li>
    </ul>
  </div>
</BaseLayout>
`,
  'src/pages/vpn/index.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="VPN 基础知识与排障" description="了解 VPN 的原理及常见问题的排查方法。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>VPN 基础知识与排障</h1></div>
    <ul>
      <li><a href="/vpn/vpn-vs-proxy">VPN 和机场的区别</a></li>
      <li><a href="/vpn/vpn-slow">VPN 速度慢怎么办？</a></li>
      <li><a href="/vpn/vpn-disconnect">VPN 经常断线的排查方法</a></li>
    </ul>
  </div>
</BaseLayout>
`,
  'src/pages/review/index.astro': `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getProviders } from '../../data/providers';
const providers = getProviders();
---
<BaseLayout title="机场测评 | 2026 最新各服务商评测" description="全面、客观的各大机场测评，为您提供选购指南。">
  <div class="container">
    <div style="margin-bottom: 2rem;"><h1>机场测评目录</h1></div>
    <ul style="list-style: none; padding: 0;">
      {providers.map(p => (
        <li style="margin-bottom: 1rem;">
          <a href={\`/review/\${p.slug}\`} style="font-size: 1.25rem;">{p.name} 怎么样？</a>
          <p style="color: var(--text-muted); margin-top: 0.25rem;">起步价格：{p.price} | 流量：{p.traffic}</p>
        </li>
      ))}
    </ul>
  </div>
</BaseLayout>
`
};
for(let f in files) { fs.writeFileSync(f, files[f], 'utf8'); }
console.log('Restored remaining files!');
