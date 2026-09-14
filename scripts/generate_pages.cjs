const fs = require('fs');
const path = require('path');

const pagesData = {
  'knowledge/what-is-jichang': {
    title: '机场是什么？全面解析科学上网代理',
    description: '在科学上网语境中，机场通常指的是提供 SS、SSR、V2Ray、Trojan 等协议节点的代理服务商。本文为您详细解析机场的工作原理。',
    content: '## 机场这个词是怎么来的？\n\n早期由于 Shadowsocks 客户端的图标像一个小飞机，因此提供 SS 节点的服务商便被用户戏称为“机场”。如今这一称呼已经泛指所有提供多节点翻墙服务的代理商。\n\n## 机场和传统的 VPN 有什么区别？\n\n传统的 VPN 侧重于企业级安全加密，而现代机场使用的协议（如 V2Ray、Trojan）更多是为突破网络审查而生，隐蔽性更强，延迟更低，适合流媒体和日常上网。\n\n## 优质机场的特征\n\n- 使用稳定专线（如 IPLC / IEPL）\n- 拥有多国节点选择\n- 晚高峰不卡顿\n- 对主流平台（Netflix, ChatGPT）支持良好'
  },
  'knowledge/iplc-iepl': {
    title: 'IPLC 与 IEPL 专线解析：中转和直连有什么区别',
    description: '了解为什么高端机场都标榜 IPLC / IEPL 专线。一文读懂中转节点与直连节点的本质区别，以及如何根据需求选择合适线路。',
    content: '## 什么是 IPLC 和 IEPL？\n\nIPLC（国际私有租用线路）和 IEPL（国际以太网专线）都是企业级专线。使用这类专线意味着数据不过传统的公网防火墙，而是直接端到端传输。\n\n**优势：**\n- **超低延迟：** 尤其是在网络晚高峰期，专线能提供游戏级的低延迟。\n- **不被墙：** 因为不过防火墙，几乎不存在 IP 被封的情况。\n\n## 中转 vs 直连\n\n- **直连节点：** 数据从你的设备直接发往海外服务器。如果服务器 IP 被墙，节点就会失效。\n- **中转节点：** 数据先发往国内服务器，再由国内服务器转发到海外。这极大提高了稳定性。\n- **专线中转：** 最顶级的方案。数据在国内汇聚后，通过内网专线直接传输到海外。\n\n如果您对网络稳定性要求极高，请务必选择支持 IPLC / IEPL 的机场（如我们榜单中的 SOGOCloud）。'
  },
  'knowledge/traffic-multiplier': {
    title: '什么是机场订阅、流量与倍率？',
    description: '新手在使用机场时常常遇到流量消耗快的问题。本文讲解什么是订阅链接、节点倍率，以及如何正确计算您的流量。',
    content: '## 什么是机场订阅链接？\n\n订阅链接是一串 URL，包含您账号的身份信息及节点列表。客户端（如 Clash）可以通过这串链接自动下载并更新所有节点。\n\n## 什么是流量与节点倍率？\n\n并非所有的节点都会按 1:1 计算流量消耗。\n\n有些高成本的专线节点，机场可能会设置 **倍率（Multiplier）**。例如，如果某节点的倍率是 `1.5x`，您消耗了 1GB 的实际流量，后台会扣除 1.5GB 的配额。\n\n**建议：**\n在选购机场时，尽量选择标明“所有节点 x1 倍率”的机场（如榜单中的 SOGOCloud、无忧链接），这样不容易产生流量焦虑。'
  },
  'vpn/vpn-vs-proxy': {
    title: 'VPN、机场与 Proxy 有什么区别？',
    description: 'VPN和机场经常被混为一谈。了解传统VPN与现代翻墙代理（Proxy）在技术原理和使用场景上的根本区别。',
    content: '## 技术原理差异\n\n- **传统 VPN（如 OpenVPN、IPsec）：** 在设备层面上建立虚拟局域网，强制接管所有系统流量。它侧重于数据加密和企业安全，由于特征明显，容易被 GFW（防火墙）识别和阻断。\n- **机场 / Proxy（如 Shadowsocks、V2Ray）：** 通常在应用层或网络层代理流量，主要目的是“混淆数据特征”，让防火墙以为是正常的网页浏览流量。这被称为科学上网的最佳实践。\n\n## 结论\n\n对于中国大陆用户，为了看视频、访问 ChatGPT 或是流畅浏览网页，**机场（Proxy）是比传统 VPN 更好的选择**。传统 VPN 速度慢且容易断线。'
  },
  'vpn/vpn-slow': {
    title: 'VPN 或机场节点速度慢怎么办？常见排查与解决方法',
    description: '连上节点后网速变慢、视频卡顿？了解导致 VPN / 机场速度慢的原因及提升速度的常见技巧。',
    content: '## 1. 检查节点倍率与线路类型\n\n如果是普通的“直连”节点，晚高峰速度变慢是正常现象。建议切换到标记为“IPLC”、“IEPL”或“中转”的高端节点。\n\n## 2. 切换代理模式\n\n确保客户端开启了“规则（Rule）”或“绕过大陆”模式，而不是“全局（Global）”模式。全局模式会让国内流量也走代理，导致访问淘宝、微信变卡。\n\n## 3. 更换节点地理位置\n\n如果您在南方，选择香港或新加坡节点通常较快；如果在北方，日本或韩国节点可能延迟更低。如果某个节点拥堵，尝试切换到冷门地区的节点。\n\n## 4. 检查本地网络\n\n有时候是本地 Wi-Fi 或运营商（如宽带出国带宽被限制）的问题。重启路由器往往有奇效。'
  },
  'vpn/vpn-disconnect': {
    title: 'VPN 经常断线、无法上网怎么排查？',
    description: '遇到代理连不上、断线或有网络无外网的情况？按本文步骤一步步解决您的 VPN 连通性问题。',
    content: '## 现象 1：连上代理后完全上不了网\n\n- **原因：** 可能是系统代理设置被卡死，或者节点已失效。\n- **解决：** 更新订阅链接。如果还是不行，关闭客户端并检查系统的“代理设置”，将手动代理关闭。\n\n## 现象 2：经常断线\n\n- **原因：** 传统 VPN 容易遭到防火墙主动探测（Active Probing）从而被阻断。或者是因为您使用的节点是“直连”且已经被墙。\n- **解决：** 建议使用提供专线服务的机场。由于数据不过公网防火墙，根本不存在被墙或断线的问题。\n\n## 现象 3：订阅无法更新\n\n- **解决：** 您的机场官网可能更换了域名，或者机场跑路。如果是前者，请通过邮件或通知群获取最新官网；如果是后者，请参考本站《2026 稳定机场推荐榜单》寻找可靠的新服务商。'
  },
  'tutorial/windows': {
    title: 'Windows 系统常见代理客户端配置指南',
    description: '如何在 Windows 上使用机场订阅？本文为您介绍 Clash for Windows 等主流客户端的下载与配置教程。',
    content: '## 推荐客户端：Clash (或 v2rayN)\n\n对于大部分机场，在 Windows 上的最佳体验客户端是基于 Clash 核心的软件。\n\n### 配置步骤\n\n1. **获取订阅链接：** 登录您的机场后台，找到“一键订阅”或“复制 Clash 订阅链接”。\n2. **下载客户端：** 下载并安装客户端，运行程序。\n3. **导入订阅：** 在客户端的 Profiles（配置）页面，粘贴订阅链接并点击 Download。\n4. **选择节点：** 在 Proxies（代理）页面，选择您需要的节点。\n5. **开启系统代理：** 在 General（常规）页面，勾选 System Proxy 即可科学上网。'
  },
  'tutorial/mac': {
    title: 'macOS 苹果电脑代理客户端配置指南',
    description: '如何在 Mac 上配置科学上网？介绍 ClashX / Surge 等主流工具的使用方法。',
    content: '## 推荐客户端：ClashX (免费) / Surge (付费)\n\n对于新手，我们强烈推荐使用免费且功能强大的 ClashX。\n\n### ClashX 配置步骤\n\n1. 登录机场后台，复制“Clash 订阅链接”。\n2. 下载 ClashX 并将应用拖入 Applications 文件夹。\n3. 启动应用，点击右上角状态栏的小猫咪图标。\n4. 选择 `配置` -> `托管配置` -> `管理`，点击添加，粘贴订阅链接。\n5. 在下拉菜单中选择一个节点，并勾选 `设置为系统代理`。'
  },
  'tutorial/ios': {
    title: 'iPhone (iOS) 设备配置机场指南',
    description: '在 iPhone 和 iPad 上如何使用机场订阅？一文了解 Shadowrocket（小火箭）的购买和使用。',
    content: '## 推荐客户端：Shadowrocket (俗称小火箭)\n\n这是 iOS 上性价比最高、使用最广泛的代理工具。\n\n### 准备工作\n\n由于中国区 App Store 不提供此类应用，您需要一个**非中国区（如美区或港区）**的 Apple ID 来下载。\n\n### 配置步骤\n\n1. 在 App Store 登录外区账号，搜索并下载 Shadowrocket。\n2. 登录机场后台，点击“一键导入 Shadowrocket”。通常会自动跳转并添加订阅。\n3. 如果无法自动跳转，请复制“SSR / V2Ray 订阅链接”。\n4. 在 Shadowrocket 中点击右上角 `+`，类型选择 `Subscribe`，粘贴链接并保存。\n5. 展开节点列表，选择一个节点，打开顶部开关即可。'
  },
  'tutorial/android': {
    title: 'Android 安卓手机客户端配置指南',
    description: '安卓手机如何配置代理？Clash for Android 等主流工具的简单教程。',
    content: '## 推荐客户端：Clash for Android (CFA) / v2rayNG\n\nCFA 界面美观，功能强大，是安卓用户的首选。\n\n### 配置步骤\n\n1. 从 Github 或信任的渠道下载 Clash for Android 的 APK 并安装。\n2. 登录机场后台，复制“Clash 订阅链接”。\n3. 打开应用，进入 `配置` -> `新配置` -> `从 URL 导入`。\n4. 粘贴链接并保存（名称可随意填写，如“我的机场”）。\n5. 返回主界面，点击 `启动` 按钮，并在弹出的 VPN 确认框中选择允许。'
  }
};

const baseDir = path.join(__dirname, '../src/pages');

Object.entries(pagesData).forEach(([route, data]) => {
  const dirPath = path.join(baseDir, path.dirname(route));
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const content = `---
layout: '../../layouts/BaseLayout.astro'
title: "${data.title}"
description: "${data.description}"
---

<div class="container" style="max-width: 800px; margin: 0 auto;">
  <div style="margin-bottom: 2rem;">
    <h1>${data.title}</h1>
  </div>
  
  <div class="article-content" style="line-height: 1.8; font-size: 1.1rem;">
    ${data.content.split('\\n').map(line => {
      if (line.startsWith('## ')) return `<h2 style="margin-top: 2rem; margin-bottom: 1rem;">${line.replace('## ', '')}</h2>`;
      if (line.startsWith('### ')) return `<h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">${line.replace('### ', '')}</h3>`;
      if (line.startsWith('- **')) {
        const parts = line.replace('- **', '').split('**');
        return `<li><strong>${parts[0]}</strong>${parts[1]}</li>`;
      }
      if (line.startsWith('- ')) return `<li>${line.replace('- ', '')}</li>`;
      if (line.trim() === '') return '';
      return `<p style="margin-bottom: 1.2rem;">${line.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')}</p>`;
    }).join('\\n    ')}
  </div>
  
  <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
    <a href="/" class="btn btn-outline">&larr; 返回首页</a>
  </div>
</div>
`;

  fs.writeFileSync(path.join(baseDir, `${route}.astro`), content);
});

console.log('Markdown pages generated successfully.');

// Also generate index pages for knowledge, vpn, tutorial
const sections = {
  knowledge: { title: '机场知识普及', desc: '学习科学上网和代理技术的基础概念。' },
  vpn: { title: 'VPN 基础与排障', desc: '了解 VPN 工作原理，解决网速慢、易断线等常见问题。' },
  tutorial: { title: '客户端使用教程', desc: '手把手教您在各大平台配置网络代理。' }
};

Object.entries(sections).forEach(([sec, meta]) => {
  const links = Object.keys(pagesData)
    .filter(k => k.startsWith(sec + '/'))
    .map(k => {
      const slug = k.split('/')[1];
      const route = k;
      return `        <li><a href="/${route}" style="font-size: 1.1rem; display: block; padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 1rem;">${pagesData[k].title}</a></li>`;
    }).join('\\n');

  const idxContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="${meta.title}" description="${meta.desc}">
  <div class="container" style="max-width: 800px; margin: 0 auto;">
    <h1>${meta.title}</h1>
    <p style="color: var(--text-muted); margin-bottom: 3rem;">${meta.desc}</p>
    <ul style="list-style: none; padding: 0;">
${links}
    </ul>
    <div style="margin-top: 3rem;">
      <a href="/" class="btn btn-outline">&larr; 返回首页</a>
    </div>
  </div>
</BaseLayout>
`;
  fs.writeFileSync(path.join(baseDir, sec, 'index.astro'), idxContent);
});

console.log('Section index pages generated.');
