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
                <a href="/" style="color: var(--primary); text-decoration: none;">首页</a> &gt; <a href="/tutorial/" style="color: var(--primary); text-decoration: none;">使用教程</a> &gt; <span>${topic}</span>
            </div>
            <h1>${h1}</h1>
        </div>

        <div class="article-content" style="background: var(--card-bg); padding: 2rem; border-radius: 8px; border: 1px solid var(--border-color);">
${content}
        </div>
    </div>
</BaseLayout>
`;

const hubTemplate = (title, desc, h1, content) => `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout 
    title="${title}"
    description="${desc}"
>
    <div class="container">
        <div style="margin-bottom: 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                <a href="/" style="color: var(--primary); text-decoration: none;">首页</a> &gt; <span>使用教程</span>
            </div>
            <h1>${h1}</h1>
        </div>

        <div class="article-content">
${content}
        </div>
    </div>
</BaseLayout>
`;

const files = {};

// 1. Android
files['android.astro'] = layoutTemplate(
    'Android 安卓手机配置与使用指南',
    '如何在 Android 安卓手机上配置网络代理？从客户端下载、订阅导入到常见问题排查的完整新手教程。',
    'Android',
    'Android 安卓手机网络配置教程',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速说明：</strong>本教程适用于已经拥有服务商订阅的用户，指导您如何在 Android（安卓）手机或平板上完成客户端配置与连接。
            </div>

            <h2>一、准备工作</h2>
            <ul>
                <li><strong>有效的订阅：</strong> 您需要提前从服务商处获取订阅链接（Subscription URL）或节点信息。如果您还没有订阅，可以先了解 <a href="/knowledge/plan-selection/">套餐怎么选</a>。</li>
                <li><strong>网络连接：</strong> 确保手机当前有基础的 Wi-Fi 或移动数据网络，以便下载客户端和获取配置。</li>
                <li><strong>兼容的客户端：</strong> 服务商通常会推荐特定的第三方开源客户端。请仔细阅读服务商提供的文档，确认他们支持哪些客户端协议。</li>
            </ul>

            <h2>二、客户端选择与下载安装</h2>
            <p>Android 平台上有多种兼容主流协议的客户端工具。请注意，<strong>不要假定所有服务都使用同一种客户端</strong>，具体应以您的服务商后台说明为准。</p>
            <ul>
                <li><strong>下载原则：</strong> 请务必通过 <strong>Google Play 商店</strong> 或开源项目的 <strong>官方 GitHub Release</strong> 页面下载 APK 安装包。</li>
                <li><strong>安全警告：</strong> 严禁从未知来源的第三方下载站、网盘或论坛下载所谓的“破解版”或“汉化修改版”，这些应用极有可能被植入木马，导致设备数据泄露。</li>
            </ul>

            <h2>三、导入订阅 (Import Subscription)</h2>
            <p>不同客户端的菜单名称可能略有差异，但通用流程基本如下：</p>
            <ol>
                <li>登录您的服务商网站后台，找到“一键订阅”或“复制订阅链接”的按钮。</li>
                <li>打开 Android 客户端，找到类似于 <strong>订阅管理 (Subscriptions)</strong>、<strong>配置 (Profiles)</strong> 或右上角的 <strong>+ 号</strong> 添加按钮。</li>
                <li>选择 <strong>“从剪贴板导入”</strong> 或 <strong>“从 URL 导入”</strong>。</li>
                <li>粘贴您刚才复制的订阅链接，并点击保存或更新。如果客户端支持扫描二维码（QR Code），您也可以直接扫描服务商后台的二维码导入。</li>
            </ol>

            <h2>四、选择节点与连接</h2>
            <p>订阅更新成功后，您将看到一系列的服务器节点列表。</p>
            <ol>
                <li>根据您的实际需求选择一个地区节点。如果您不清楚如何选择，请阅读 <a href="/knowledge/node/">机场节点选择建议</a>。</li>
                <li>返回客户端主界面，点击底部的 <strong>连接图标 (通常是一个圆形的播放或开关按钮)</strong>。</li>
                <li>首次连接时，Android 系统会弹出一个安全提示：“连接请求：XXX 想要设置一个 VPN 连接…”，请点击 <strong>“确定”或“允许”</strong>。这是系统赋予应用接管流量的正常权限。</li>
            </ol>

            <h2>五、验证连接</h2>
            <p>连接成功后，状态栏通常会出现一个钥匙图标（或 VPN 字样）。</p>
            <p>要确认网络是否正常接管，请打开浏览器访问一个查 IP 的网站，确认您的公网 IP 已经变更为节点所在地区的 IP。详细验证步骤请参考 <a href="/vpn/vpn-check/">如何检测连接是否生效</a>。请注意，IP 变化仅代表基础流量已转发，并不等于您已经完全匿名。</p>

            <h2>六、常见错误与排障</h2>
            <ul>
                <li><strong>连接成功但无法上网：</strong> 请确认系统时间是否准确，或尝试更换节点。详见 <a href="/vpn/vpn-not-working/">连接成功无网络排查</a>。</li>
                <li><strong>频繁断线：</strong> Android 系统的电池优化（杀后台）是导致断线的最常见原因。请进入系统设置，将该客户端的电池策略改为“无限制”。详见 <a href="/vpn/vpn-disconnect/">频繁断线排查</a>。</li>
                <li><strong>网速极其缓慢：</strong> 可能是当前节点负载过高，请更换冷门节点或测试本地基础网络。详见 <a href="/vpn/vpn-slow/">网速缓慢排查</a>。</li>
                <li><strong>订阅更新失败：</strong> 检查复制的链接是否完整，或尝试在非当前客户端接管的纯净网络下更新。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">安全提示</h3>
                <ul>
                    <li><strong>不要分享订阅：</strong> 您的订阅链接包含您的专属密钥。截图分享或公开发布会导致他人盗用您的流量，服务商也可能因此封禁您的账号。</li>
                    <li><strong>临时排障还原：</strong> 如果为了排查问题，临时关闭了手机系统级别的某些安全拦截功能，请务必在排障结束后立即恢复原状，不要让设备处于无保护状态。</li>
                </ul>
            </div>

            <h2>七、常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 系统提示“此应用可能耗电过快”，我该关闭它吗？</strong>
                <p style="margin-top: 0.5rem;">A: 这是 Android 系统的常规提醒。网络代理客户端需要维持后台连接，必然会有一定的合理耗电。如果强行关闭，会导致网络中断。</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 为什么部分国内 App 显示我还在原地址？</strong>
                <p style="margin-top: 0.5rem;">A: 大多数现代客户端默认使用“分流规则”（即国内流量直连，国外流量代理），因此国内应用看到的是您的真实本地 IP。</p>
            </div>
    `
);

// 2. iOS
files['ios.astro'] = layoutTemplate(
    'iPhone / iOS 配置与使用指南',
    '如何在 iPhone 或 iPad 上配置网络代理？详解 App Store 客户端下载、订阅导入与系统 VPN 权限设置。',
    'iPhone / iOS',
    'iPhone / iOS 网络配置教程',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速说明：</strong>本教程适用于 iPhone 和 iPad 用户，指导您如何在 iOS 系统上完成相关客户端的下载、权限授权与节点配置。
            </div>

            <h2>一、准备工作</h2>
            <ul>
                <li><strong>有效的订阅：</strong> 确保您已经获取了服务商提供的订阅链接。如果您还没有，可以参考 <a href="/knowledge/plan-selection/">如何选择套餐</a>。</li>
                <li><strong>可用网络：</strong> 需要有基础网络以便完成客户端下载。</li>
                <li><strong>兼容的客户端：</strong> iOS 生态较为封闭，支持的客户端相对集中，具体请以您的服务商文档推荐为准。</li>
            </ul>

            <h2>二、App Store 客户端下载</h2>
            <p>由于 iOS 的系统限制，所有的应用安装均需通过官方 App Store。请勿相信任何要求您安装“未知描述文件”以实现越狱或侧载的教程，这存在极大的安全风险。</p>
            <div style="background: #fff3cd; color: #856404; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <strong>重要地区可用性提醒：</strong><br>
                部分网络工具客户端可能因所在地区的 App Store 政策不同，无法在您当前的本地应用商店中直接搜索到（例如中国大陆区 App Store 通常不提供此类应用）。具体可用性请以当地 App Store 实际情况为准。
            </div>
            <ul>
                <li>请根据服务商提供的应用名称，在可获取该应用的地区 App Store 中进行搜索下载。</li>
                <li><strong>安全警告：</strong> 不要无依据地轻信网上的教程去购买未知来源的 Apple ID，或在设置中登录陌生人提供的 Apple ID（尤其是登录 iCloud），这可能导致您的设备被远程锁定勒索。不要随意关闭 Apple ID 的双重认证等核心安全功能。</li>
            </ul>

            <h2>三、导入订阅 (Import Subscription)</h2>
            <p>不同客户端界面略有差异，通常流程如下：</p>
            <ol>
                <li>登录您的服务商后台，复制适用于 iOS 客户端的订阅链接。</li>
                <li>打开已下载好的客户端 App，在主界面或设置页面中找到类似于 <strong>配置 (Profiles)</strong>、<strong>节点 (Servers)</strong> 或右上角的 <strong>+ 添加</strong> 按钮。</li>
                <li>选择 <strong>从 URL 下载</strong> 或 <strong>从剪贴板导入</strong>。</li>
                <li>粘贴链接并完成下载。如果支持，也可在电脑屏幕上打开二维码，使用 App 内部的扫码功能导入。</li>
            </ol>

            <h2>四、选择节点与系统权限授权</h2>
            <p>订阅更新完毕后：</p>
            <ol>
                <li>从节点列表中选择一个适合的地区节点（关于地区差异，可参考 <a href="/knowledge/node/">节点基础知识</a>）。</li>
                <li>点击客户端主页的大圆圈或连接开关。</li>
                <li><strong>首次连接：</strong> iOS 会弹出一个系统级提示：<code>“XXX” Would Like to Add VPN Configurations</code>。必须点击 <strong>“Allow (允许)”</strong>。</li>
                <li>系统会要求您输入 iPhone 锁屏密码或使用 Face ID 进行验证，验证通过后，VPN 配置文件将写入系统设置。</li>
            </ol>

            <h2>五、验证与使用</h2>
            <p>连接建立后，iPhone 屏幕左上角（或下拉控制中心）会出现 <strong>VPN</strong> 图标标识。</p>
            <p>请通过浏览器访问查询 IP 的网站，确认网络出口已变更为所选节点。更多验证手段请阅读 <a href="/vpn/vpn-check/">如何检测连接是否生效</a>。请牢记，IP 变化不等于完全匿名保护。</p>

            <h2>六、常见排障</h2>
            <ul>
                <li><strong>显示已连接，但没网络：</strong> 通常是节点本身失效或 DNS 配置冲突，请换一个节点，或参阅 <a href="/vpn/vpn-not-working/">连接成功无网络排查</a>。</li>
                <li><strong>锁屏后频繁断线：</strong> iOS 系统在深度休眠时可能会断开部分网络连接。如果长时间未使用，重新解锁后可能需要等待几秒钟让客户端自动重连。详见 <a href="/vpn/vpn-disconnect/">断线排查</a>。</li>
                <li><strong>节点延迟很高或极慢：</strong> 尝试选择地理位置更近的节点。详见 <a href="/vpn/vpn-slow/">网速缓慢排查</a>。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">安全提示</h3>
                <p>不要在公开的社交平台或论坛上截屏分享您的订阅二维码或链接。任何人只要扫描了您的二维码，就可以随意消耗您的流量额度，甚至导致账号被封禁。</p>
            </div>

            <h2>七、常见问题 (FAQ)</h2>
            <div style="margin-bottom: 1.5rem;">
                <strong>Q: 我能在系统“设置 -> VPN”里面直接添加订阅吗？</strong>
                <p style="margin-top: 0.5rem;">A: 通常不行。系统自带的 VPN 设置仅支持传统的 IKEv2 等标准协议。而服务商提供的订阅往往基于现代代理协议，必须依赖专用的第三方 App 来解析和建立连接。</p>
            </div>
    `
);

// 3. Windows
files['windows.astro'] = layoutTemplate(
    'Windows 电脑配置与使用指南',
    '如何在 Windows 10/11 电脑上配置网络客户端？涵盖 System Proxy、TUN 模式的区别及常见安全提示。',
    'Windows',
    'Windows 电脑网络配置教程',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速说明：</strong>本教程适用于 Windows 10 及 Windows 11 用户，指导您如何在电脑上下载安装客户端，并正确配置系统代理或虚拟网卡（TUN）。
            </div>

            <h2>一、准备工作</h2>
            <ul>
                <li><strong>有效订阅与资料：</strong> 从服务商后台准备好 Windows 端适用的订阅链接。（详见 <a href="/knowledge/plan-selection/">套餐知识</a>）</li>
                <li><strong>系统权限：</strong> 安装软件或安装虚拟网卡驱动时，您需要拥有当前 Windows 账户的管理员权限。</li>
            </ul>

            <h2>二、客户端下载与安装</h2>
            <p>Windows 平台的开源客户端种类繁多，请务必根据服务商的兼容性要求进行选择。</p>
            <ul>
                <li><strong>下载原则：</strong> 请通过服务商后台提供的官方下载链接，或者直接前往该开源项目的 <strong>官方 GitHub Release</strong> 页面下载。</li>
                <li><strong>安装过程：</strong> 解压或运行安装程序。建议将程序放置在没有中文和特殊字符的英文路径下（例如 <code>D:\\Tools\\ProxyClient\\</code>），避免因路径编码问题导致软件报错。</li>
            </ul>
            <div style="background: #fff3cd; color: #856404; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <strong>重要安全提醒（关于 Windows Defender / SmartScreen）：</strong><br>
                由于很多开源客户端没有购买昂贵的商业代码签名，Windows 可能会弹出“Windows 已保护你的电脑 (SmartScreen)”或安全软件拦截提示。
                <ul>
                    <li><strong>正确做法：</strong> 优先确认您的下载来源绝对可靠（如官方 GitHub）。确认无误后，点击“更多信息”并选择“仍要运行”，或者将其添加到安全软件的白名单中。</li>
                    <li><strong>错误做法：</strong> 绝对不要建议自己或他人<strong>永久关闭 Windows Defender</strong>、永久关闭系统防火墙，或运行网上来源不明的 PowerShell 脚本来强行屏蔽安全中心。不要使用任何盗版或被第三方篡改的客户端。</li>
                </ul>
            </div>

            <h2>三、导入订阅 (Import Subscription)</h2>
            <ol>
                <li>在服务商网站复制订阅链接。</li>
                <li>运行客户端软件，它通常会出现在屏幕右下角的系统托盘（任务栏角落）中。双击图标打开主界面。</li>
                <li>寻找类似于 <strong>配置 (Profiles)</strong> 或 <strong>订阅管理</strong> 的选项卡。</li>
                <li>选择“从剪贴板导入 URL”或手动粘贴链接并点击“下载/更新”。</li>
            </ol>

            <h2>四、System Proxy 与 TUN 模式基础概念</h2>
            <p>Windows 下的客户端通常提供两种接管网络的方式：</p>
            <ul>
                <li><strong>System Proxy (系统代理)：</strong> 客户端会在 Windows 设置中配置一个本地代理端口（如 127.0.0.1:1080）。绝大多数浏览器（Edge、Chrome）会自动遵循这个设置并走代理。但部分不遵循系统代理设置的软件（如命令行工具、部分游戏）依然会走直连。</li>
                <li><strong>TUN 模式 (虚拟网卡)：</strong> 客户端会在系统中创建一张虚拟网卡，强制接管整台电脑的所有网络流量，类似于传统 VPN 的全局效果。如果您发现某些软件始终无法走代理，可以尝试在客户端设置中开启 TUN 模式（需要管理员权限）。</li>
            </ul>

            <h2>五、选择节点与连接</h2>
            <ol>
                <li>在节点列表或代理（Proxies）页面中，选择一个延迟（Ping）和负载适合的节点。（关于节点的更多解释，见 <a href="/knowledge/node/">节点知识</a>）。</li>
                <li>在主界面或系统托盘右键菜单中，勾选 <strong>“设为系统代理 (Set as System Proxy)”</strong> 或开启 <strong>TUN 模式</strong> 以启动连接。</li>
            </ol>

            <h2>六、验证连接与常见错误</h2>
            <p>打开浏览器，访问查 IP 网站确认网络出口发生改变（见 <a href="/vpn/vpn-check/">连接验证指南</a>）。</p>
            <p><strong>常见排障：</strong></p>
            <ul>
                <li><strong>连接成功但毫无网络：</strong> 可能是系统时间未同步，或当前节点已失效。请尝试同步系统时间并更换节点。详见 <a href="/vpn/vpn-not-working/">无网络排障</a>。</li>
                <li><strong>速度异常缓慢：</strong> 请在客户端内对节点进行测速，并选择延迟较低的节点。详见 <a href="/vpn/vpn-slow/">网速缓慢排障</a>。</li>
                <li><strong>软件退出后电脑无法上网：</strong> 如果客户端非正常崩溃，系统代理设置可能未被还原。请进入 <code>Windows 设置 -> 网络和 Internet -> 代理</code>，手动关闭“使用代理服务器”开关。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">排障安全底线</h3>
                <p>如果为了排查是否被第三方杀毒软件拦截而进行了临时关闭测试，必须在测试明确结论后，立即恢复杀毒软件和防火墙的正常运行，切勿让 Windows 电脑长期处于裸奔状态。</p>
            </div>
    `
);

// 4. macOS
files['mac.astro'] = layoutTemplate(
    'macOS (Mac) 配置与使用指南',
    '如何在 MacBook 或 iMac 上配置网络客户端？解决“无法验证开发者”提示，完成订阅导入与系统网络扩展授权。',
    'macOS (Mac)',
    'macOS 苹果电脑网络配置教程',
    `
            <div style="background: var(--bg-alt); padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid var(--primary);">
                <strong>快速说明：</strong>本教程适用于使用 MacBook、iMac 或 Mac mini 的用户。涵盖客户端下载、macOS 权限许可及配置连接流程。
            </div>

            <h2>一、准备工作</h2>
            <ul>
                <li><strong>有效订阅：</strong> 确保从服务商后台获取了适用于 Mac 客户端的订阅链接。</li>
                <li><strong>兼容性确认：</strong> Mac 分为 Intel 芯片和 Apple Silicon (M1/M2/M3) 芯片。大部分现代客户端同时提供通用版（Universal），但如果是单独区分的版本，请根据系统信息（点击左上角苹果菜单 -> 关于本机）下载正确架构的安装包。</li>
            </ul>

            <h2>二、客户端下载与安装</h2>
            <p>请认准服务商提供的官方渠道，或开源项目的官方 GitHub Release 进行下载（通常是 <code>.dmg</code> 或 <code>.zip</code> 格式）。</p>
            <ol>
                <li>双击下载好的 <code>.dmg</code> 文件。</li>
                <li>在弹出的窗口中，将应用程序图标拖拽到旁边的 <strong>Applications (应用程序)</strong> 文件夹快捷方式中完成安装。</li>
            </ol>
            
            <div style="background: #fff3cd; color: #856404; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <strong>如何应对“无法打开，因为无法验证开发者”：</strong><br>
                由于部分开源项目没有缴纳 Apple 开发者费用并进行应用公证，macOS 的安全机制（Gatekeeper）会默认拦截应用启动。<br>
                <ul>
                    <li><strong>正确做法：</strong> 使用 macOS 提供的单次授权方式：打开系统 <strong>系统设置 (System Settings) -> 隐私与安全性 (Privacy & Security)</strong>，向下滑动找到被拦截的应用提示，点击 <strong>“仍要打开 (Open Anyway)”</strong> 并输入 Mac 密码进行一次性放行。</li>
                    <li><strong>错误做法：</strong> 绝对不要在终端 (Terminal) 中运行网上流传的 <code>sudo spctl --master-disable</code> 命令来永久彻底关闭整个 Gatekeeper 安全机制，这会让您的电脑暴露在严重的安全风险中。</li>
                </ul>
            </div>

            <h2>三、导入订阅与授权</h2>
            <ol>
                <li>在应用程序文件夹中找到并启动客户端。它通常会在屏幕右上角的菜单栏出现一个状态图标。</li>
                <li>点击菜单栏图标，找到类似于 <strong>配置 (Profiles)</strong> 或 <strong>订阅设置</strong>。</li>
                <li>选择“从剪贴板导入 (Import from Clipboard)” 或手动输入 URL 下载配置。</li>
                <li><strong>Network Extension 授权：</strong> 某些客户端如果支持增强型网络接管（类似 TUN 模式），首次启动或连接时系统会弹窗提示“某某应用想要添加 VPN 配置”或系统扩展被阻止。请前往“隐私与安全性”中给予授权（Allow）。</li>
            </ol>

            <h2>四、选择节点与连接</h2>
            <p>当订阅配置文件成功加载后：</p>
            <ol>
                <li>在节点列表或菜单中选择一个目标地区节点（如果对节点概念陌生，请阅读 <a href="/knowledge/node/">节点知识</a>）。</li>
                <li>勾选 <strong>“设为系统代理 (Set as System Proxy)”</strong> 即可启动连接。</li>
            </ol>

            <h2>五、验证与排障</h2>
            <p>通过浏览器访问查 IP 的网站验证出口（详见 <a href="/vpn/vpn-check/">连接验证指南</a>）。IP 变更不代表绝对匿名，请知悉。</p>
            <ul>
                <li><strong>连接显示成功但无网络：</strong> 通常是当前选中节点不可用，或 Mac 系统时间误差导致证书校验失败。请换节点并确保系统时间自动同步。详见 <a href="/vpn/vpn-not-working/">无网络排障</a>。</li>
                <li><strong>网页能开但某 App 连不上：</strong> 绝大部分 App 遵循系统代理，但如终端（Terminal）等工具默认不走代理。这需要在客户端中开启增强型网卡接管（TUN/Enhanced Mode），或者在终端内手动设置代理环境变量。</li>
                <li><strong>断线或速度慢：</strong> 请参考 <a href="/vpn/vpn-slow/">网速慢排障</a> 和 <a href="/vpn/vpn-disconnect/">频繁断线排障</a>，通常通过更换负载较低的节点即可解决。</li>
            </ul>

            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h3 style="margin-top: 0;">安全提示</h3>
                <p>不要为了使用来源不明的所谓“加速版”或“破解版”客户端，而随意修改 macOS 的核心安全文件或降低 SIP（系统完整性保护）等级。</p>
            </div>
    `
);

// 5. Hub
files['index.astro'] = hubTemplate(
    '网络工具使用教程：Android、iPhone、Windows 与 macOS',
    '四大主流平台设备的网络工具配置指南，包含客户端下载、订阅导入与基础排障，适合初学者的一站式教程枢纽。',
    '网络工具使用教程：四大平台配置指南',
    `
            <p>无论您使用的是手机还是电脑，本教程中心均提供了从零开始的详尽操作指南。我们专注于教您如何安全地下载兼容客户端、完成订阅导入并排查基础网络故障。</p>

            <h2>选择您的设备平台</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
                
                <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; background: var(--bg-alt);">
                    <h3 style="margin-top: 0; color: var(--primary);">🤖 Android (安卓)</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">适合使用各类安卓手机及平板的用户。</p>
                    <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">讲解 APK 官方获取途径、订阅导入流程以及如何解决后台频繁杀应用导致断线的问题。</p>
                    <a href="/tutorial/android/" style="display: inline-block; background: var(--primary); color: #fff; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-weight: bold;">查看 Android 教程</a>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; background: var(--bg-alt);">
                    <h3 style="margin-top: 0; color: var(--primary);">🍎 iPhone / iOS</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">适合使用 iPhone 和 iPad 的用户。</p>
                    <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">详解 App Store 地区限制应对策略、系统 VPN 权限授予与网络状态验证指南。</p>
                    <a href="/tutorial/ios/" style="display: inline-block; background: var(--primary); color: #fff; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-weight: bold;">查看 iOS 教程</a>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; background: var(--bg-alt);">
                    <h3 style="margin-top: 0; color: var(--primary);">💻 Windows</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">适合使用 Windows 10/11 系统的电脑用户。</p>
                    <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">说明 System Proxy 与虚拟网卡的差异，指导安全应对 SmartScreen 拦截与基础连接排障。</p>
                    <a href="/tutorial/windows/" style="display: inline-block; background: var(--primary); color: #fff; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-weight: bold;">查看 Windows 教程</a>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; background: var(--bg-alt);">
                    <h3 style="margin-top: 0; color: var(--primary);">🍏 macOS (Mac)</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">适合 MacBook、iMac 等苹果电脑用户。</p>
                    <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">教您如何安全地通过系统设置处理 Gatekeeper“无法验证开发者”弹窗，以及完成网络扩展授权。</p>
                    <a href="/tutorial/mac/" style="display: inline-block; background: var(--primary); color: #fff; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-weight: bold;">查看 macOS 教程</a>
                </div>

            </div>

            <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
                <h2>新手开始前先了解</h2>
                <p>在开始动手配置客户端之前，我们强烈建议您先阅读以下基础知识，这能帮您避开 90% 的低级错误：</p>
                <ul>
                    <li><a href="/knowledge/subscription/">什么是机场订阅？</a> —— 理解那串以 http 开头的长链接到底包含什么信息。</li>
                    <li><a href="/knowledge/node/">节点知识普及</a> —— 为什么会有这么多国家地区的选项，该如何挑选。</li>
                    <li><a href="/vpn/vpn-check/">连接验证指南</a> —— 怎么确认我真的配置成功并改变了网络出口？</li>
                    <li><a href="/knowledge/plan-selection/">套餐如何选择？</a> —— 如果您还没有订阅，可以先了解如何选择适合自己的服务。</li>
                </ul>
            </div>
    `
);


for (const [filename, content] of Object.entries(files)) {
    fs.writeFileSync(path.join('src/pages/tutorial', filename), content, 'utf8');
}

console.log('Successfully generated all tutorial files!');
