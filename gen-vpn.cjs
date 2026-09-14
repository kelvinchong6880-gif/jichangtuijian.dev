const fs = require('fs');
const path = require('path');

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
                <a href="/" style="color: var(--primary); text-decoration: none;">首页</a> &gt; <a href="/vpn/" style="color: var(--primary); text-decoration: none;">VPN 基础与排障</a> &gt; <span>${topic}</span>
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

// 1. what-is-vpn
files['what-is-vpn.astro'] = layoutTemplate(
    'VPN 是什么？新手必须了解的基础概念与核心作用',
    '第一次接触 VPN？本文用通俗易懂的语言解释 VPN 是什么，它能做什么，以及它的核心局限。',
    'VPN 是什么',
    'VPN 是什么？基础概念与用途通俗解析',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>VPN（虚拟专用网络）是一种网络技术，它在您的设备和互联网之间建立一条加密通道，从而隐藏您的真实 IP 地址，并在一定程度上保护您的网络数据不被中间人轻易窃听。
            </div>
            
            <h2>VPN 到底是什么？</h2>
            <p>VPN 的全称是 Virtual Private Network（虚拟专用网络）。如果把互联网比作一条人人都能看见的公共高速公路，那么 VPN 就像是在这条公路上为您专门修建了一条“不透明的地下隧道”。</p>
            <p>当您开启 VPN 时，通常，您的 VPN 客户端会根据系统和路由配置，将指定的网络请求进入这条加密隧道，传输到 VPN 服务商位于其他国家或地区的服务器，然后再由该服务器替您访问目标网站。网站看到的是 VPN 服务器的 IP，而不是您的真实 IP。</p>

            <h2>VPN 有什么主要用途？</h2>
            <ol>
                <li><strong>保护公共 Wi-Fi 安全：</strong> 在咖啡馆、机场等公共 Wi-Fi 环境下，黑客可能窃听未加密的数据。VPN 的加密隧道可以有效防止您的登录凭据和隐私被同局域网的恶意用户截获。</li>
                <li><strong>隐藏真实 IP 地址：</strong> 您的真实 IP 地址可能暴露您的粗略地理位置。VPN 可以将其伪装成 VPN 服务器所在地的 IP，从而保护隐私。</li>
                <li><strong>绕过地理封锁：</strong> 某些流媒体平台（如 Netflix、BBC iPlayer）会限制观看者的国家。连接到特定国家的 VPN 服务器，通常可以解除这种地区限制。</li>
                <li><strong>远程办公内网访问：</strong> 许多企业使用私有 VPN，让员工在家里也能安全地接入公司内网服务器。</li>
            </ol>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">常见误区：VPN 不是万能的</h3>
                <p><strong>误区 1：开启 VPN 就绝对匿名了。</strong></p>
                <p>正解：VPN 可以对 ISP（网络运营商）和目标网站隐藏您的活动，但 <strong>VPN 服务商本身</strong>是知道您在干什么的。如果您使用了不可靠的 VPN，他们可能会记录您的访问日志并出售给第三方广告商。没有任何网络工具能提供 100% 绝对的匿名，请谨慎选择服务商。</p>
                <p><strong>误区 2：VPN 可以防病毒。</strong></p>
                <p>正解：VPN 只负责传输通道的加密，它不具备杀毒软件的功能。如果您下载了带木马的文件，依然会中毒。</p>
            </div>

            <h2>VPN 和“机场（Proxy）”的区别</h2>
            <p>在中文互联网语境下，大家经常把 VPN 和“机场（代理 Proxy）”混淆。传统 VPN 侧重于全域加密和隐私保护，而机场通常是指专门提供跨国网络加速与突破防火墙封锁的服务商。两者的协议实现、客户端体验和核心侧重点有所不同。如果想了解详细差异，请阅读 <a href="/vpn/vpn-vs-proxy/">VPN 和机场（Proxy）的区别</a>。</p>

            <h2>常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: VPN 是非法的吗？</strong>
                <p style="margin-top: 0.5rem;">A: 在绝大多数国家和地区，使用 VPN 本身是完全合法的，它是一种正当的隐私保护工具。但在极少数国家，未经批准提供或使用 VPN 可能面临法律限制，请遵守当地法律法规。</p>
            </div>
`
);

// 2. vpn-how-it-works
files['vpn-how-it-works.astro'] = layoutTemplate(
    'VPN 工作原理详解：一文读懂加密隧道如何工作',
    'VPN 是如何实现加密和 IP 伪装的？本文用新手能理解的方式，拆解 VPN 客户端、服务器与加密隧道的工作原理。',
    'VPN 工作原理',
    'VPN 是如何工作的？加密隧道原理拆解',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>VPN 的工作原理是：您的设备（客户端）将网络数据加密，发送到远端的 VPN 服务器。服务器解密后代您访问目标网站，然后将结果加密送回给您。整个过程中，本地网络运营商只能看到一堆乱码数据。
            </div>

            <h2>VPN 系统的三大核心组件</h2>
            <p>要理解 <a href="/vpn/what-is-vpn/">VPN 是什么</a>，我们需要先认识 VPN 工作过程中的三个关键角色：</p>
            <ul>
                <li><strong>客户端 (Client)：</strong> 您安装在手机或电脑上的 VPN 软件。它负责在数据离开您的设备前对其进行加密。</li>
                <li><strong>VPN 服务器 (Server)：</strong> VPN 服务商部署在全球各地的大型计算机。它负责接收您的加密数据，解密并转发给真正的目标网站。</li>
                <li><strong>加密隧道 (Tunnel)：</strong> 客户端和服务器之间建立的逻辑通道。任何在这条通道里传输的数据都是经过加密的。</li>
            </ul>

            <h2>一次完整的 VPN 连接过程</h2>
            <p>假设您现在坐在咖啡馆，想要连接美国的 VPN 访问 <code>example.com</code>，以下是幕后发生的事情：</p>
            <ol>
                <li><strong>建立隧道：</strong> 您的 VPN 客户端与美国的 VPN 服务器取得联系，通过安全协议（如 OpenVPN、WireGuard 或 IPsec）验证身份并生成加密密钥，建立隧道。</li>
                <li><strong>本地加密：</strong> 您在浏览器输入网址。VPN 客户端将这个访问请求（连同 DNS 解析请求）用密钥加密成一堆无意义的乱码。</li>
                <li><strong>隐蔽传输：</strong> 这些乱码数据通过咖啡馆的 Wi-Fi 和您的网络运营商（ISP）传输出去。虽然 ISP 能看到您在发送数据，但由于数据是加密的，他们无法知道您访问了什么网站、发送了什么内容。</li>
                <li><strong>服务器代访：</strong> 美国的 VPN 服务器收到乱码，使用对应的密钥解密出真实的请求，然后代替您向 <code>example.com</code> 发起访问。</li>
                <li><strong>加密回传：</strong> 网站将网页数据返回给 VPN 服务器，服务器再次将其加密，通过隧道送回您的设备，您的客户端解密后展示在屏幕上。</li>
            </ol>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">原理解析：关于 DNS 的重要性</h3>
                <p>在不使用 VPN 时，您访问网站的第一步是请求 DNS（域名系统）将网址翻译成 IP 地址。这个请求通常是由您的本地运营商处理的，如果不加密，运营商就能清楚地记录您的访问痕迹（这就是所谓的 <strong>DNS 泄露</strong>）。<br>
                优秀的 VPN 会接管系统的 DNS 请求，将其一起加密发送到 VPN 服务器，由服务器的专属 DNS 进行解析，从而避免部分隐私泄露。如果您怀疑存在泄露，请查看 <a href="/vpn/vpn-check/">如何检测 VPN 是否生效</a>。</p>
            </div>

            <h2>常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: VPN 加密会导致速度变慢吗？</strong>
                <p style="margin-top: 0.5rem;">A: 是的，加密解密过程需要消耗设备的 CPU 算力，且数据绕道远端服务器也会增加物理传输路径。因此，使用 VPN 通常会带来一定程度的网速折损。如果遇到严重卡顿，请参考 <a href="/vpn/vpn-slow/">VPN 速度慢排查指南</a>。</p>
            </div>
`
);

// 3. vpn-vs-proxy
files['vpn-vs-proxy.astro'] = layoutTemplate(
    'VPN 和机场（Proxy）的区别是什么？新手该怎么选',
    '传统 VPN 与机场（代理）有什么核心区别？全面对比两者的协议、客户端、安全性和使用场景，帮助您做出正确选择。',
    'VPN 和机场的区别',
    'VPN 与机场 (Proxy 代理) 的区别：到底选哪个？',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>传统 VPN 侧重全局隐私加密，通常提供傻瓜式的官方 App；而“机场”是提供代理（Proxy）节点服务的民间俗称，侧重突破网络封锁和跨国加速，通常需要搭配第三方开源客户端使用。
            </div>

            <h2>概念澄清：什么是 VPN，什么是机场？</h2>
            <p><strong>VPN（虚拟专用网络）</strong> 是一项标准网络技术类别。市面上的传统 VPN 品牌（如 ExpressVPN、NordVPN）通常采用 OpenVPN、WireGuard 等成熟的工业级协议，为您提供从系统底层接管大部分流量的隐私保护服务。</p>
            <p><strong>机场（Proxy）</strong> 在中文语境下，并不是一种技术协议，而是指一类专门提供 Shadowsocks、V2Ray、Trojan 等代理节点的服务商（详见 <a href="/knowledge/what-is-jichang/">机场是什么</a>）。这些协议最初的设计目的就是为了伪装流量特征，绕过某些防火墙的深度包检测（DPI）。</p>

            <h2>核心差异对比</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; margin-bottom: 2rem;">
                <thead>
                    <tr style="background-color: var(--card-bg); border-bottom: 2px solid var(--border-color); text-align: left;">
                        <th style="padding: 1rem;">对比维度</th>
                        <th style="padding: 1rem;">传统 VPN</th>
                        <th style="padding: 1rem;">机场 (代理 Proxy)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>主要目的</strong></td>
                        <td style="padding: 1rem;">隐私加密、隐藏 IP、防窃听</td>
                        <td style="padding: 1rem;">绕过特定网络封锁、跨国专线加速</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>抗封锁能力</strong></td>
                        <td style="padding: 1rem;">较弱（标准协议特征明显，较易被屏蔽）</td>
                        <td style="padding: 1rem;">相对较强（流量伪装性高，部分提供<a href="/knowledge/direct-relay-dedicated/">内网专线</a>）</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>客户端体验</strong></td>
                        <td style="padding: 1rem;">极简，下载官方 App 即可一键连接</td>
                        <td style="padding: 1rem;">需一定门槛，依赖第三方开源客户端导入订阅</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>流量控制</strong></td>
                        <td style="padding: 1rem;">通常默认接管绝大部分系统流量，但也支持特定应用分流策略</td>
                        <td style="padding: 1rem;">支持分流规则（如国内直连，国外走代理）</td>
                    </tr>
                </tbody>
            </table>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">常见误区</h3>
                <p><strong>误区：传统 VPN 速度比机场慢。</strong></p>
                <p>正解：不同技术方案在连接方式、流量特征、网络路径和配置方式上存在差异。实际可用性和性能会受到用户所在地、运营商、网络限制、服务器部署、协议配置以及服务商网络质量等因素影响，因此不能仅根据“VPN”或“机场”这一名称判断哪一种一定更快或更稳定。</p>
            </div>

            <h2>您该如何选择？</h2>
            <ul>
                <li><strong>选择传统 VPN：</strong> 如果您的主要诉求是在欧美等无网络封锁地区保护公共 Wi-Fi 安全、防止运营商窃听，或者需要使用拥有严格隐私审计（无日志政策）的正规跨国品牌服务。</li>
                <li><strong>选择机场：</strong> 如果您的核心诉求是在限制网络环境下稳定访问海外网站、观看外区流媒体（如 Netflix）、进行外服游戏加速。</li>
            </ul>

            <p style="margin-top: 3rem; text-align: center;">如果您的目标是进一步比较不同机场服务商的套餐、流量和线路资料，可以查看本站的 <a href="/recommend/">2026 机场套餐与价格对比</a>。</p>
`
);

// 4. vpn-slow
files['vpn-slow.astro'] = layoutTemplate(
    'VPN 速度慢怎么办？网速卡顿的常见原因与排查步骤',
    '连上 VPN 后网速变得极其缓慢？本文列举导致 VPN 速度慢的物理与网络原因，并提供切实可行的排障步骤。',
    'VPN 速度慢排查',
    'VPN 速度慢怎么办？卡顿原因与排查指南',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>VPN 速度慢通常由物理距离过远、服务器负载过高、本地网络拥塞或协议开销引起。最简单的解决方法通常是：<strong>更换一个地理位置更近、负载更低的服务器节点。</strong>
            </div>

            <h2>为什么连上 VPN 后网速会变慢？</h2>
            <p>在 <a href="/vpn/vpn-how-it-works/">VPN 工作原理</a> 中提到，VPN 必须通过额外的加密隧道转发数据。以下是导致网速折损的核心原因：</p>
            <ul>
                <li><strong>物理距离与绕路：</strong> 如果您在亚洲，却连接了欧洲的 VPN 服务器访问美国的网站，数据在全球绕了一大圈，必然导致高<a href="/vpn/vpn-latency/">延迟</a>和速度下降。</li>
                <li><strong>服务器负载过载：</strong> 晚高峰时，如果同一台 VPN 服务器上拥挤了成千上万的用户，带宽被瓜分，每个人分配到的速度就会急剧下降。</li>
                <li><strong>加密协议开销：</strong> 复杂的加密算法（如 OpenVPN）会消耗设备的 CPU 性能，尤其在老旧路由器或低端手机上，这可能成为网速瓶颈。</li>
                <li><strong>本地网络与运营商限速：</strong> 您本身的 Wi-Fi 信号极差，或者您的运营商对国际出口带宽进行了严格的 QoS 限速。</li>
            </ul>

            <h2>排障排查步骤 (Troubleshooting)</h2>
            <p>遇到速度缓慢时，请按照以下步骤由易到难依次排查：</p>

            <h3>Step 1: 建立基准测试 (Baseline Test)</h3>
            <p>先暂时断开 VPN，访问测速网站（如 Speedtest.net）测试您当前的本地实际网速。如果本地网速本身就极度缓慢，那么任何 VPN 都无法拯救您的速度。详细测速方法见 <a href="/vpn/vpn-speed-test/">VPN 测速指南</a>。</p>

            <h3>Step 2: 更换服务器节点</h3>
            <p>这是解决速度问题最有效的一招。打开 VPN 客户端，断开当前连接，选择一个地理位置距离您更近（例如香港、日本）且显示负载较低的服务器，重新连接测试。</p>

            <h3>Step 3: 尝试更换传输协议</h3>
            <p>大部分 VPN 客户端允许在设置中切换协议。如果您使用的是 OpenVPN (TCP)，尝试切换到 <strong>WireGuard</strong> 或 <strong>IKEv2</strong>，它们通常在现代设备上能提供更高的吞吐量和更低的开销。</p>

            <h3>Step 4: 检查后台应用与分流</h3>
            <p>检查您的电脑或手机是否正在后台下载系统更新或大型软件，这会榨干所有带宽。如果是使用支持分流的代理客户端，确保您不要让本地局域网或不需要代理的国内流量错误地走入 VPN 隧道。</p>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">提示</h3>
                <p>如果尝试所有方法后，该服务商的所有节点依然缓慢，说明可能该服务商在您当地的国际出口路由极其糟糕。此时可以考虑更换服务商，例如了解提供专线或 BGP 中转技术的 <a href="/knowledge/what-is-jichang/">机场代理服务</a>，它们在特定情况下的加速体验可能有所改善。</p>
            </div>
`
);

// 5. vpn-disconnect
files['vpn-disconnect.astro'] = layoutTemplate(
    'VPN 经常断线？频繁断开连接的排查方法',
    'VPN 总是自动断开连接？本文汇总了导致 VPN 频繁掉线的网络环境、系统权限与后台限制原因，教您一步步恢复稳定连接。',
    'VPN 断线排查',
    'VPN 经常自动断线？不稳定原因与排查步骤',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>VPN 频繁断线多半是因为<strong>手机系统杀后台（省电策略）</strong>、网络环境频繁切换（如 Wi-Fi 掉回 4G）或特定服务器遭遇防火墙干扰。
            </div>

            <h2>导致 VPN 频繁断线的常见原因</h2>
            <ul>
                <li><strong>系统的省电与杀后台策略：</strong> （尤其在 Android 手机上最常见）当 VPN 客户端在后台运行一段时间后，系统为了省电，强行关闭了 VPN 进程，导致连接中断。</li>
                <li><strong>网络环境频繁波动：</strong> 比如您在乘坐高铁，手机信号在 4G/5G 甚至不同基站间来回切换；或者您走在街上，手机在微弱的公共 Wi-Fi 和数据网络之间反复横跳。</li>
                <li><strong>防火墙主动阻断：</strong> 某些网络环境（如严格的公司内网）识别到了您的 VPN 连接的流量特征，进行了强制阻断。</li>
                <li><strong>服务器端维护或过载：</strong> 您连接的那台特定服务器恰好崩溃或发生路由拥堵。</li>
            </ul>

            <h2>排障排查步骤 (Troubleshooting)</h2>
            <p>请按以下步骤依次检查并调整设置：</p>

            <h3>Step 1: 解除系统后台与省电限制（移动端最有效）</h3>
            <p><strong>对于 Android 用户：</strong></p>
            <ol>
                <li>进入手机的<strong>设置 > 应用管理</strong>，找到您的 VPN 或代理客户端。</li>
                <li>找到<strong>电池/省电策略</strong>选项，将其设置为<strong>“无限制”或“允许后台高耗电”</strong>。</li>
                <li>在多任务视图中，将该 App <strong>锁定（加锁）</strong>，防止一键清理时被杀掉。</li>
            </ol>
            <p><strong>对于 iOS 用户：</strong>确保没有开启“低电量模式”，且允许该应用进行后台应用刷新。</p>

            <h3>Step 2: 稳定本地网络环境</h3>
            <p>如果您所在区域 Wi-Fi 信号不稳定，建议暂时关闭 Wi-Fi，仅使用移动数据（或反之），避免手机在两种网络间频繁切换重建隧道。</p>

            <h3>Step 3: 启用“始终开启的 VPN” (Always-On)</h3>
            <p>在较新的 Android 系统或部分高级 VPN 客户端中，拥有“Always-On VPN”或“Kill Switch”选项。开启后，系统会竭尽全力维持 VPN 隧道的连接状态。</p>

            <h3>Step 4: 更换服务器或协议</h3>
            <p>如果您连接某个特定节点一直断开，立刻尝试更换其他国家或地区的节点。同时，尝试在客户端设置中将连接协议更改为 <strong>TCP</strong>（相比 UDP 在恶劣网络下更抗干扰）。</p>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">注意：不要盲目修改危险的系统设置</h3>
                <p>网上有些过时的教程可能会建议您“永久关闭系统防火墙”或“刷入未知内核”来提升稳定性，这存在极大的安全风险。如果常规的 App 权限和网络环境调整无效，通常是服务商线路的客观问题，不应强行破坏本地系统安全设置。</p>
            </div>
`
);

// 6. vpn-not-working
files['vpn-not-working.astro'] = layoutTemplate(
    'VPN 显示已连接但无法上网？排查指南',
    'VPN 客户端显示 Connected，但网页打不开、没有任何网络？按照本文的安全排查流程，快速定位是 DNS 故障、路由问题还是代理冲突。',
    'VPN 无法上网',
    'VPN 连接成功但无法上网怎么办？排查流程',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>连接显示成功却无网络，通常是因为 DNS 解析失败、系统代理设置残留冲突，或者该 VPN 服务器的实际出口路由已中断。
            </div>

            <h2>现象描述</h2>
            <p>这是新手最容易遇到的困惑之一：客户端界面上出现了绿色的“已连接 (Connected)”，甚至状态栏也出现了 VPN 小图标，但是打开浏览器却提示“无法访问此网站 (ERR_CONNECTION_TIMED_OUT)”或一直转圈。</p>
            <p>这种情况说明，您的设备与节点之间仅仅建立了初步握手，但数据在隧道内部或服务器出口处并未成功流转。</p>

            <h2>安全排查流程 (Troubleshooting Flow)</h2>
            <p>请严格按照以下从易到难的顺序进行排查：</p>

            <h3>Step 1: 断开 VPN 测试基础网络</h3>
            <p>首先，彻底断开 VPN。尝试打开一个普通的本地网站（如 baidu.com）。如果断开 VPN 后也无法上网，说明您本机的网络（Wi-Fi 或宽带）本身断了，请先修复本地网络故障。</p>

            <h3>Step 2: 更换 VPN 服务器节点</h3>
            <p>如果基础网络正常，请重新开启 VPN 并<strong>换一个不同国家/地区的节点</strong>。很多时候，显示“已连接”仅仅是因为认证服务器还在，但该节点的流量出口 IP 已经被封锁或瘫痪。换个节点往往能瞬间解决。</p>

            <h3>Step 3: 检查时间与日期同步</h3>
            <p>VPN 连接依赖极其严格的安全证书验证。如果您的电脑或手机时间与标准时间相差太大（比如差了几个小时甚至几天），证书校验就会出错，导致有连接无流量。请在系统设置中开启“自动设置时间 (NTP)”。</p>

            <h3>Step 4: 检查 DNS 故障</h3>
            <p>如果能通过 IP 地址访问服务（例如 Ping <code>8.8.8.8</code> 是通的），但输入域名（如 google.com）打不开，说明是 DNS 出了问题。尝试在 VPN 客户端设置中，开启“使用内置 DNS”或手动将系统 DNS 更改为可靠的公共 DNS（如 <code>1.1.1.1</code> 或 <code>8.8.8.8</code>）。</p>

            <h3>Step 5: 清理系统代理残留 (主要针对 Windows/macOS)</h3>
            <p>如果您之前安装过其他代理软件（如 Clash、v2rayN）非正常退出，系统的全局代理开关可能卡死了。请进入：<br>
            <strong>Windows：</strong> 设置 > 网络和 Internet > 代理，关闭所有“手动设置代理”的开关。<br>
            <strong>macOS：</strong> 系统设置 > 网络 > 详情 > 代理，取消勾选所有的代理选项。</p>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">安全提示</h3>
                <p>在排查过程中，<strong>千万不要永久关闭您的杀毒软件或系统内置防火墙</strong>。如果怀疑是第三方安全软件拦截了 VPN 虚拟网卡，可以尝试临时退出它们几分钟进行测试。如果确认是安全软件拦截，请将 VPN 客户端添加到白名单，而不是永久裸奔上网。如果为了排障进行了临时测试，必须在测试后立即恢复原安全设置。</p>
            </div>
`
);

// 7. vpn-speed-test
files['vpn-speed-test.astro'] = layoutTemplate(
    '如何正确测试 VPN 的速度？VPN 测速指南',
    '很多新手抱怨 VPN 速度慢，却不知如何正确测量。本文教您如何建立基准测试，并使用专业工具准确测试 VPN 的下载与上传表现。',
    'VPN 测速',
    '如何正确测试 VPN 的真实速度？',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>正确的测速必须具备对比性：先在关闭 VPN 时测一次本地“基准速度”，再连上 VPN 测一次，对比两者得出的网速损耗率才是衡量 VPN 表现的关键。
            </div>

            <h2>为什么要测速？</h2>
            <p>当您感觉网络卡顿时，测速能用客观的数据帮您定位问题：到底是您家里的宽带本身出了问题，还是 VPN 服务器的性能拉垮？单凭主观感受“看视频卡不卡”往往不够准确。</p>

            <h2>标准的 VPN 测速步骤</h2>
            
            <h3>第一步：建立基准测试 (Baseline Test)</h3>
            <ol>
                <li><strong>断开 VPN 连接。</strong> 确保您的设备处于纯净的本地网络环境中。</li>
                <li>使用浏览器访问全球公认的测速网站：<strong>Speedtest.net</strong>。</li>
                <li>点击“GO”进行测试，记录下三个关键数据：<a href="/vpn/vpn-latency/">Ping (延迟)</a>、<a href="/vpn/vpn-download-speed/">Download (下载速度)</a> 和 Upload (上传速度)。这就是您本地网络能达到的<strong>物理极限</strong>。</li>
            </ol>

            <h3>第二步：连接 VPN 进行对比测试</h3>
            <ol>
                <li>开启 VPN，连接到您想要测试的节点（如日本东京）。</li>
                <li>在 Speedtest.net 页面刷新，并确认测速节点（服务器）自动识别为了 VPN 所在地的测速点。</li>
                <li>再次点击“GO”，记录下新的三项数据。</li>
            </ol>

            <h2>如何解读测速结果？</h2>
            <p>通过对比两次数据，您可以得出结论：</p>
            <ul>
                <li><strong>优秀表现：</strong> 连上 VPN 后的下载速度，能达到基准速度的较高比例（如 70% - 90% 以上）。</li>
                <li><strong>正常损耗：</strong> 由于加密和物理距离，通常折损 30% - 50% 也可能属于正常可用范围。</li>
                <li><strong>表现较差：</strong> 连上 VPN 后速度跌破基准速度的极低比例（例如原本 100Mbps 掉到 2Mbps），说明该节点极度拥堵或遭遇了带宽瓶颈。此时请参考 <a href="/vpn/vpn-slow/">VPN 速度慢排查指南</a>。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">测速的常见误区</h3>
                <p><strong>误区 1：单次测速定终身。</strong></p>
                <p>网络是动态变化的。早上 8 点的测速可能表现优异，但晚上 9 点晚高峰可能就存在波动。一个节点是否好用，需要看它在晚高峰期间的实际表现。</p>
                <p><strong>误区 2：要求 VPN 达到家里宽带的绝对上限。</strong></p>
                <p>大部分 VPN 或代理网络都无法 100% 跑满您的本地最高宽带（例如千兆宽带）。加密过程和跨国传输的物理限制，必然会带来一定程度的开销。不存在“必须达到某个固定 Mbps”的绝对标准。</p>
            </div>
`
);

// 8. vpn-latency
files['vpn-latency.astro'] = layoutTemplate(
    'VPN 延迟 (Ping) 多少正常？理解毫秒与延迟',
    '打游戏卡顿？网页响应慢？本文带您理解 VPN 延迟（Ping 值）的概念。多少 ms 延迟算正常？延迟对我们的网络体验到底有什么影响。',
    'VPN 延迟与 Ping',
    'VPN 延迟 (Ping) 多少算正常？',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>延迟（Ping）是指数据从您的设备发送到服务器并返回所需的时间，单位是毫秒 (ms)。物理距离是决定延迟的最核心因素，不存在全球通用的“标准绝对延迟”。
            </div>

            <h2>什么是延迟 (Latency / Ping)？</h2>
            <p>在 <a href="/vpn/vpn-speed-test/">测速</a> 时，Ping 值反映的是网络的<strong>响应速度</strong>，而不是传输容量。想象您在寄快递：延迟就是包裹送到目的地并拿到回执所需的时间；而带宽（下载速度）则是快递车的载货量。</p>
            <p>当您点击一个网页链接时，如果延迟高，页面可能会等待几秒钟才开始加载；即使加载速度很快，这种滞后感也会影响交互体验。</p>

            <h2>决定延迟的核心：物理距离</h2>
            <p>信号在网络中的传输速度是有限的。您距离 VPN 服务器越远，延迟通常就越高，这是物理特性的体现：</p>
            <ul>
                <li>如果您在中国大陆连接<strong>周边地区节点（如香港、日本）</strong>：物理距离较近，通常延迟相对较低。</li>
                <li>如果您连接<strong>欧美节点</strong>：数据需要横跨大洋，即便使用高质量的网络链路，物理延迟也通常在 150ms 以上。</li>
            </ul>

            <h2>不同场景下的合理延迟范围示例</h2>
            <p><em>注意：以下区间仅作一般性用途参考示例，非统一质量标准。实际延迟受您本地 Wi-Fi 质量、运营商路由等多种因素共同影响。</em></p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; margin-bottom: 2rem;">
                <thead>
                    <tr style="background-color: var(--card-bg); border-bottom: 2px solid var(--border-color); text-align: left;">
                        <th style="padding: 1rem;">延迟范围参考</th>
                        <th style="padding: 1rem;">一般网络体验反馈</th>
                        <th style="padding: 1rem;">适用场景示例</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>10ms - 60ms</strong></td>
                        <td style="padding: 1rem;">响应极快。</td>
                        <td style="padding: 1rem;">对延迟极度敏感的竞技类网络游戏。</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>60ms - 150ms</strong></td>
                        <td style="padding: 1rem;">良好，网页点击后响应正常。</td>
                        <td style="padding: 1rem;">日常网页浏览、常规流媒体观看。</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>200ms 以上</strong></td>
                        <td style="padding: 1rem;">存在明显的滞后感。</td>
                        <td style="padding: 1rem;">可用于普通下载大文件，但不适合高频交互操作。</td>
                    </tr>
                </tbody>
            </table>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">常见误区：延迟低等于速度一定快？</h3>
                <p><strong>正解：延迟和下载速度是两个维度的指标。</strong></p>
                <p>一个极其拥堵的近距离节点，可能 Ping 值较低（响应快），但如果带宽耗尽，视频依然会卡顿。相反，一个远距离节点 Ping 值较高，但如果带宽非常充裕，看高质量视频可能会极其流畅。因此，评价网络质量必须结合延迟和 <a href="/vpn/vpn-download-speed/">下载速度</a> 综合评估。</p>
            </div>
`
);

// 9. vpn-download-speed
files['vpn-download-speed.astro'] = layoutTemplate(
    'VPN 下载速度：Mbps 和 MB/s 的换算与理解',
    '测速结果是 100 Mbps，为什么实际下载软件只有 10 几 MB/s？为您解释带宽单位换算、协议开销以及实际吞吐量的关系。',
    'VPN 下载速度',
    '理解 VPN 下载速度：Mbps vs MB/s',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>宽带和测速软件标称的 <strong>Mbps</strong>（兆比特每秒）除以 <strong>8</strong>，大约等于我们日常下载软件时看到的理论最高 <strong>MB/s</strong>（兆字节每秒）。
            </div>

            <h2>最大误区：Mbps 与 MB/s 混淆</h2>
            <p>很多新手在进行 <a href="/vpn/vpn-speed-test/">VPN 测速</a> 后感到疑惑：“测速明明显示 80 Mbps，为什么浏览器下载文件时，速度只有 10 MB/s 左右？是不是被限速了？”</p>
            <p>实际上，这是计算机存储单位不同造成的正常现象：</p>
            <ul>
                <li><strong>网络带宽单位 (Mbps)</strong>：即 Megabit per second。网络运营商、Speedtest 测速软件普遍使用这个单位。</li>
                <li><strong>文件下载单位 (MB/s)</strong>：即 Megabyte per second。浏览器、常见下载软件普遍使用这个单位。</li>
            </ul>
            <p><strong>换算公式：1 Byte (字节) = 8 bit (比特)</strong>。<br>
            因此，理想状态下，80 Mbps 的带宽理论上约等于 10 MB/s 的下载速度。</p>

            <h2>为什么实际下载速度往往达不到理论值？</h2>
            <p>即使您换算正确，比如测出 80 Mbps 理论上应该有 10 MB/s，但实际下载时往往略低。这通常并非恶意限速，而是由以下因素决定：</p>
            <ol>
                <li><strong>协议与加密开销 (Overhead)：</strong> 在 <a href="/vpn/vpn-how-it-works/">VPN 原理</a> 中，数据需要被打包和加密传输。这些额外的封装本身就要占用一部分带宽。</li>
                <li><strong>目标服务器限制：</strong> 您的网络再快，如果提供下载的那个网站服务器限制了单用户的下载速度（比如某些免费网盘），您也只能获得对方允许的速度上限。</li>
                <li><strong>本地硬件瓶颈：</strong> 路由器性能限制、Wi-Fi 受到干扰，都可能导致实际吞吐量下降。</li>
            </ol>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">视频体验参考数据</h3>
                <p>其实，流畅观看流媒体并不需要追求极端的测速数据。作为一般性用途参考（非统一质量标准）：</p>
                <ul>
                    <li>流畅观看 1080P 高清视频：通常需要稳定达到 <strong>5 Mbps (~0.6 MB/s)</strong>。</li>
                    <li>流畅观看 4K 超高清视频：通常需要稳定达到 <strong>25 Mbps (~3 MB/s)</strong>。</li>
                </ul>
                <p>只要您的连接足够稳定并达到上述带宽，即可获得较好的视听体验。</p>
            </div>
`
);

// 10. vpn-check
files['vpn-check.astro'] = layoutTemplate(
    '如何检测 VPN 是否生效？确保连接的安全检查',
    'VPN 显示已连接，但它真的在工作吗？教你几个简单的步骤，通过检查公网 IP 和 DNS 来确认 VPN 连接状态。',
    'VPN 检测',
    '如何检测 VPN 是否真正生效？',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>确认 VPN 基础连接是否生效最直接的方法是：打开查 IP 的网站，看看显示的 IP 地址和地理位置是否已经变成了 VPN 服务器所在的地区。
            </div>

            <h2>为什么需要检测 VPN 状态？</h2>
            <p>有时候 VPN 客户端会产生“假死”现象：界面上显示“已连接”，但实际上流量由于配置错误或代理冲突，依然在使用您本地的真实网络。如果您需要保护公共环境下的网络连接，这可能带来隐私泄露风险。</p>

            <h2>基础检测：核对公网 IP 地址</h2>
            <p>这是最基础、最直观的检查方法：</p>
            <ol>
                <li><strong>断开 VPN 时：</strong> 在浏览器中搜索“IP”或访问类似 <code>ipleak.net</code> 的测试工具，记下页面显示的当前 IP 地址和城市（这通常是您真实的网络归属地）。</li>
                <li><strong>连接 VPN 后：</strong> 刷新该页面。如果显示的 IP 发生了变化，且地理位置变成了您选择的 VPN 节点地区，则说明最基本的流量转发已经生效。</li>
            </ol>
            <p>如果连接后 IP 没有变化，说明代理可能未正确接管浏览器流量，请参考 <a href="/vpn/vpn-not-working/">VPN 无法上网排查指南</a> 检查系统代理设置。</p>

            <h2>进阶检测：DNS 检查</h2>
            <p>在 <a href="/vpn/vpn-how-it-works/">VPN 原理</a> 中提过，即便您的 IP 变了，如果您的 DNS 请求依然发给本地运营商，部分访问特征依然可能暴露。</p>
            <ul>
                <li>在检测网站中查看 <strong>DNS Addresses</strong> 区域。</li>
                <li>如果检测到的 DNS 服务器归属地与您的 VPN 节点匹配，通常说明正常。</li>
                <li>如果列表中出现了您的真实 ISP 提供的 DNS，说明存在 <strong>DNS 泄露风险</strong>。您可以在客户端设置中寻找并开启“防止 DNS 泄露”或相关选项。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">防范误区：不要神化检测结果</h3>
                <p><strong>误区：IP 变了 = 绝对匿名。</strong></p>
                <p>正解：公网 IP 发生变化仅能作为流量出口变化的一个信号，但不能证明完全匿名、所有流量均已加密，也不能证明不存在 WebRTC 泄漏等问题。伪装 IP 只是基础防护。如果您登录了实名认证的网站，平台依然能识别您。任何工具都无法提供绝对的完全隐匿。</p>
                <p><strong>误区：DNS 无泄露 = 绝对安全。</strong></p>
                <p>正解：检测只能确认您和 VPN 服务器之间的基础配置是否按预期工作。DNS 测试通过也不等于绝对安全。如果 VPN 服务商本身隐私政策存疑，检测结果再完美也无法保障最终隐私。选择信誉良好的服务商才是根本保障。</p>
            </div>
`
);

// 11. free-vs-paid-vpn
files['free-vs-paid-vpn.astro'] = layoutTemplate(
    '免费 VPN 和付费 VPN 的区别：如何做出选择？',
    '市面上有免费 VPN 和付费选项，两者有什么区别？全面比较商业模式、速度限制、隐私政策与潜在风险，帮助您根据需求做出选择。',
    '免费 vs 付费 VPN',
    '免费 VPN 和付费 VPN 的核心区别与选择建议',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速结论：</strong>运行全球服务器宽带需要极高成本。付费 VPN 通过订阅费维持运转；而部分不合规的免费 VPN 可能通过广告推送、限制速度、甚至收集并出售用户数据来维持运营。
            </div>

            <h2>商业模式的本质差异</h2>
            <p>要理解两者的区别，我们需要了解提供网络中转服务的成本。维持海外服务器集群的带宽和硬件开销是极其高昂的。</p>
            <p><strong>付费 VPN</strong> 和优质的 <a href="/knowledge/what-is-jichang/">机场服务</a>：向用户收取一定的订阅费，用这笔资金购买更好的带宽、研发更安全的加密协议，以此形成可持续发展的良性循环。</p>
            <p><strong>免费 VPN</strong>：由于不向用户直接收费，为了覆盖高昂的服务器成本，它们必须通过其他途径获取商业变现。常见的模式包括在 App 内铺满广告、在设备上安装合作软件，甚至可能滥用隐私权限。当然，免费不代表一定危险，部分知名厂商也会提供受限的免费增值（Freemium）服务。</p>

            <h2>核心体验对比参考</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; margin-bottom: 2rem;">
                <thead>
                    <tr style="background-color: var(--card-bg); border-bottom: 2px solid var(--border-color); text-align: left;">
                        <th style="padding: 1rem;">对比维度</th>
                        <th style="padding: 1rem;">免费 VPN 常见情况</th>
                        <th style="padding: 1rem;">付费服务 常见情况</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>速度与稳定性</strong></td>
                        <td style="padding: 1rem;">通常存在限速，高峰期易拥堵，有一定<a href="/vpn/vpn-disconnect/">断线</a>概率</td>
                        <td style="padding: 1rem;">带宽相对充足，稳定性更优，部分支持 4K 播放</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>流量与限制</strong></td>
                        <td style="padding: 1rem;">通常每月有严格的额度限制</td>
                        <td style="padding: 1rem;">通常提供大容量流量或无明确硬性限制</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 1rem;"><strong>节点资源</strong></td>
                        <td style="padding: 1rem;">通常仅提供少量公共节点</td>
                        <td style="padding: 1rem;">覆盖多国多地区，拥有丰富的节点池</td>
                    </tr>
                </tbody>
            </table>

            <h2>隐私与安全考量</h2>
            <p>除了使用体验，部分完全免费且来源不明的 App 可能伴随较高的隐性风险：</p>
            <ul>
                <li><strong>数据收集疑虑：</strong> 某些应用可能会在后台收集网页浏览偏好、地理位置等数据，以用作广告定向变现。</li>
                <li><strong>过度权限请求：</strong> 某些软件可能要求获取与网络不相关的权限，引发额外的隐私担忧。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">客观认知：辩证看待免费与付费</h3>
                <p>值得注意的是，部分知名、信誉良好的付费 VPN 品牌为了吸引新用户，会提供<strong>“合规的免费额度”</strong>（Freemium 模式）。这类由正规大厂提供的免费额度通常在隐私保护上与付费版保持一致，仅仅在速度和流量上有所限制。</p>
                <p>另一方面，付费服务并不代表 100% 绝对安全。在选择任何网络工具前，都应仔细查阅其隐私政策、公司信誉、权限要求以及数据处理说明。</p>
            </div>
`
);

// 12. Hub index.astro
files['index.astro'] = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import { SITE } from '../data/config';
---

<BaseLayout 
    title="VPN 基础与排障指南：工作原理、测速与断线排查"
    description="讲解 VPN 是什么、工作原理以及与代理工具的区别。提供 VPN 经常断线、速度慢、无法上网等常见故障的排查步骤。"
>
    <div class="container">
        <div style="margin-bottom: 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                <a href="/" style="color: var(--primary); text-decoration: none;">首页</a> &gt; <span>VPN 基础与排障</span>
            </div>
            <h1>VPN 基础知识与故障排查指南</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-top: 1rem;">
                网络连接问题总是令人困扰。本指南涵盖了从基础概念科普到常见故障诊断的实用内容，帮助新手理解原理并解决常见的“有连接无网络”、“频繁断线”等疑难问题。
            </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 3rem; margin-top: 3rem;">
            
            <!-- Category 1 -->
            <section>
                <h2 style="border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">VPN 基础知识</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/what-is-vpn/" style="color: var(--text-color); text-decoration: none;">VPN 是什么？</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">用通俗易懂的语言解释虚拟专用网络的概念、核心用途及隐私局限。</p>
                        <a href="/vpn/what-is-vpn/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/vpn-how-it-works/" style="color: var(--text-color); text-decoration: none;">VPN 工作原理</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">拆解客户端、服务器与加密隧道是如何协同工作并建立连接的。</p>
                        <a href="/vpn/vpn-how-it-works/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/vpn-vs-proxy/" style="color: var(--text-color); text-decoration: none;">VPN 与代理的区别</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">传统隐私软件与代理工具在技术侧重点和使用场景上的不同。</p>
                        <a href="/vpn/vpn-vs-proxy/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/free-vs-paid-vpn/" style="color: var(--text-color); text-decoration: none;">免费 vs 付费对比</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">剖析免费工具的潜在局限，探讨选择服务时的关键考量依据。</p>
                        <a href="/vpn/free-vs-paid-vpn/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                </div>
            </section>

            <!-- Category 2 -->
            <section>
                <h2 style="border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">连接排障 (Troubleshooting)</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/vpn-not-working/" style="color: var(--text-color); text-decoration: none;">显示已连接但无法上网</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">提供完整的排查流程，帮您定位 DNS 故障、节点失效或代理冲突。</p>
                        <a href="/vpn/vpn-not-working/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/vpn-disconnect/" style="color: var(--text-color); text-decoration: none;">VPN 经常断线</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">解析手机权限、网络环境波动等原因，提供防掉线排查策略。</p>
                        <a href="/vpn/vpn-disconnect/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/vpn-slow/" style="color: var(--text-color); text-decoration: none;">VPN 速度慢排查</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">网速卡顿怎么办？带您检查服务器负载、物理距离及本地网络问题。</p>
                        <a href="/vpn/vpn-slow/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                </div>
            </section>

            <!-- Category 3 -->
            <section>
                <h2 style="border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">测速与参数解读</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/vpn-speed-test/" style="color: var(--text-color); text-decoration: none;">如何正确测速？</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">教您建立基准测试，利用专业工具准确得出连接前后的网速对比。</p>
                        <a href="/vpn/vpn-speed-test/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/vpn-latency/" style="color: var(--text-color); text-decoration: none;">延迟 (Ping) 多少正常？</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">理解毫秒单位与物理距离的关联，以及它对实际网络操作体验的影响。</p>
                        <a href="/vpn/vpn-latency/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/vpn-download-speed/" style="color: var(--text-color); text-decoration: none;">下载速度单位换算</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">理清 Mbps 与 MB/s 的换算关系，解读测速数据与实际下载的差异。</p>
                        <a href="/vpn/vpn-download-speed/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>
                    
                    <div class="card" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 8px;">
                        <h3 style="margin-top: 0;"><a href="/vpn/vpn-check/" style="color: var(--text-color); text-decoration: none;">检测 VPN 是否生效</a></h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">通过核对公网 IP 和执行基础 DNS 检查，确认您的网络连接状态。</p>
                        <a href="/vpn/vpn-check/" style="color: var(--primary); font-weight: 500;">阅读全文 &rarr;</a>
                    </div>

                </div>
            </section>

        </div>
    </div>
</BaseLayout>
`

for (const [file, content] of Object.entries(files)) {
    const dir = path.dirname(path.join('src/pages/vpn', file));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join('src/pages/vpn', file), content, 'utf8');
}
console.log('Successfully generated all VPN files!');
