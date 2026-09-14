const fs = require('fs');
const path = require('path');

const providersDir = path.join(__dirname, '../src/data/providers');
if (!fs.existsSync(providersDir)) {
  fs.mkdirSync(providersDir, { recursive: true });
}

const providers = [
  {
    id: "sogocloud",
    name: "SOGOCloud",
    slug: "sogocloud",
    rank: 1,
    officialUrl: "https://wzjc.sogoyunaff.cc/#/?code=BC2BL855",
    affiliateUrl: "https://wzjc.sogoyunaff.cc/#/?code=BC2BL855",
    price: "8",
    priceUnit: "元/月起 (按年付)",
    traffic: "60GB - 1.1TB",
    validity: "月付/季付/半年付/年付/一次性",
    routeInfo: "全 IPLC/IEPL 专线，最高 2.5Gbps 速率，原生 IP",
    features: [
      "全节点 x1 倍率，晚高峰不降速",
      "多设备不限量同时在线",
      "解锁 Netflix / Disney+ / ChatGPT / TikTok",
      "智能路由自动择优",
      "支持一次性不限时流量包"
    ],
    deviceInfo: "不限制并发设备",
    officialDescription: "适合各种流量需求，从轻量新手到大流量团队，全 IPLC/IEPL 专线提供稳定低延迟体验。",
    source: "Desktop/官网套餐价格和基本资料",
    lastVerified: "2026-09",
    plans: [
      { name: "小包-年付版", price: "¥98.00/年", traffic: "60GB/月" },
      { name: "基础版", price: "¥25.00/月起", traffic: "150GB/月" },
      { name: "优选版", price: "¥45.00/月起", traffic: "350GB/月" },
      { name: "强化版", price: "¥80.00/月起", traffic: "550GB/月" },
      { name: "顶配版", price: "¥150.00/月起", traffic: "1.1TB/月" },
      { name: "基础不限时版", price: "¥100.00/次", traffic: "120GB永久" }
    ]
  },
  {
    id: "weifeng",
    name: "微风",
    slug: "weifeng",
    rank: 2,
    officialUrl: "https://edp01.breezenetaff.com/#/?code=hM8APccJ",
    affiliateUrl: "https://edp01.breezenetaff.com/#/?code=hM8APccJ",
    price: "11.4",
    priceUnit: "元/月起 (按年付)",
    traffic: "100GB - 1.2TB",
    validity: "年付/月付/一次性",
    routeInfo: "全 IPLC 专线，享受低延迟高速率",
    features: [
      "购买日算起自动重置",
      "不限制设备同时接入",
      "晚高峰不限速",
      "永久不过期流量包可选"
    ],
    deviceInfo: "不限制设备同时接入",
    officialDescription: "主打低延迟 IPLC 专线，覆盖多地节点，套餐配置灵活，包括常规月付及大容量永久不限时套餐。",
    source: "Desktop/官网套餐价格和基本资料",
    lastVerified: "2026-09",
    plans: [
      { name: "清风", price: "¥137/年", traffic: "100GB/月" },
      { name: "乘风", price: "¥27/月", traffic: "200GB/月" },
      { name: "破风", price: "¥57/月", traffic: "500GB/月" },
      { name: "御风", price: "¥127/月", traffic: "1.2TB/月" },
      { name: "信风·不限时", price: "¥200/次", traffic: "270GB永久" },
      { name: "长风·不限时", price: "¥370/次", traffic: "570GB永久" }
    ]
  },
  {
    id: "flycat",
    name: "飞猫云",
    slug: "flycat",
    rank: 3,
    officialUrl: "https://flycat1.flycatvipaff.cc/#/?code=w5lO9fqB",
    affiliateUrl: "https://flycat1.flycatvipaff.cc/#/?code=w5lO9fqB",
    price: "7",
    priceUnit: "元/月起 (按年付)",
    traffic: "50GB - 1.0TB",
    validity: "年付/季付/月付/一次性",
    routeInfo: "全 IPLC 专线网络，提供最高 2.5Gbps 稳定速率",
    features: [
      "所有节点 x1 倍率，高峰时段不降速",
      "原生 IP 线路，解锁 Netflix 等流媒体",
      "智能流量分配与路由优化",
      "长周期享有8折、7折、6折优惠"
    ],
    deviceInfo: "不限制设备连接数量",
    officialDescription: "从低流量学生党到企业级定制，满足各阶层需求，拥有丰富的节点和长周期折扣。",
    source: "Desktop/官网套餐价格和基本资料",
    lastVerified: "2026-09",
    plans: [
      { name: "学生版", price: "¥84.00/年", traffic: "50GB/月" },
      { name: "星耀版", price: "¥25.00/月", traffic: "150GB/月" },
      { name: "星环版", price: "¥45.00/月", traffic: "300GB/月" },
      { name: "银河版", price: "¥85.00/月", traffic: "600GB/月" },
      { name: "宇宙版", price: "¥150.00/月", traffic: "1.0TB/月" },
      { name: "不限时套餐", price: "¥680.00/次", traffic: "1.0TB永久" }
    ]
  },
  {
    id: "firefly",
    name: "Firefly",
    slug: "firefly",
    rank: 4,
    officialUrl: "https://vip02.fireflyaff.com/#/?code=8nDg6OEY",
    affiliateUrl: "https://vip02.fireflyaff.com/#/?code=8nDg6OEY",
    price: "8",
    priceUnit: "元/月起 (按年付)",
    traffic: "60GB - 1.0TB",
    validity: "年付/月付/一次性",
    routeInfo: "IPLC专线网络，不限速",
    features: [
      "每月30天重置（订阅版）",
      "永久不过期（不限时版）",
      "不限速，不限设备数",
      "主要覆盖亚美核心节点"
    ],
    deviceInfo: "不限设备数",
    officialDescription: "界面简单直接，套餐层级分明，无隐性限制，IPLC 专线保障日常上网和流媒体需求。",
    source: "Desktop/官网套餐价格和基本资料",
    lastVerified: "2026-09",
    plans: [
      { name: "Firefly年付版", price: "¥96/年", traffic: "60GB/月" },
      { name: "Firefly Lite", price: "¥25/月", traffic: "150GB/月" },
      { name: "Firefly Plus", price: "¥45/月", traffic: "300GB/月" },
      { name: "Firefly Blaze", price: "¥85/月", traffic: "600GB/月" },
      { name: "Firefly Nova", price: "¥150/月", traffic: "1.0TB/月" },
      { name: "Firefly不限时", price: "¥100/次", traffic: "100GB永久" }
    ]
  },
  {
    id: "wuyou",
    name: "无忧链接",
    slug: "wuyou",
    rank: 5,
    officialUrl: "https://wep01.worryfreeaff.com/#/?code=s1kH64A8",
    affiliateUrl: "https://wep01.worryfreeaff.com/#/?code=s1kH64A8",
    price: "6.58",
    priceUnit: "元/月起 (按年付)",
    traffic: "40GB - 1.0TB",
    validity: "年付/月付/一次性",
    routeInfo: "全IPLC专线，节点速率×1",
    features: [
      "稳定全球 Chatgpt，Gemini 等 AI 支持",
      "4K流畅 Netflix 等流媒体体验",
      "订单日自动重置",
      "百兆级稳定带宽"
    ],
    deviceInfo: "未提及限制",
    officialDescription: "专注于流媒体 4K 体验与全球 AI 工具稳定解锁，套餐选择覆盖不同需求群体。",
    source: "Desktop/官网套餐价格和基本资料",
    lastVerified: "2026-09",
    plans: [
      { name: "MINI链接", price: "¥79.00/年", traffic: "40GB/月" },
      { name: "舒心链接", price: "¥19.00/月", traffic: "100GB/月" },
      { name: "省心链接", price: "¥33.00/月", traffic: "200GB/月" },
      { name: "随心链接", price: "¥77.00/月", traffic: "500GB/月" },
      { name: "忘忧链接", price: "¥117.00/月", traffic: "1.0TB/月" },
      { name: "100G永久不限时", price: "¥108.00/次", traffic: "100GB永久" }
    ]
  },
  {
    id: "kuajieyun",
    name: "跨界云",
    slug: "kuajieyun",
    rank: 6,
    officialUrl: "https://vip02.kuajieaff.com/#/?code=hh3QezsW",
    affiliateUrl: "https://vip02.kuajieaff.com/#/?code=hh3QezsW",
    price: "8",
    priceUnit: "元/月起 (按年付)",
    traffic: "60GB - 1.8TB",
    validity: "年付/月付 (支持更长周期)",
    routeInfo: "IPLC高端线路，不限速，所有节点x1倍率",
    features: [
      "流媒体和 AI 平台全解锁",
      "明确标注每天预估可看剧时长",
      "不限制设备登录数，在线客服答疑",
      "周期越长越省（年付8折、两年7折）"
    ],
    deviceInfo: "不限制设备登录数",
    officialDescription: "按不同用量（每天看剧1小时到全家共享）精准推荐套餐，IPLC 线路确保大流量下载与多屏观影顺畅。",
    source: "Desktop/官网套餐价格和基本资料",
    lastVerified: "2026-09",
    plans: [
      { name: "跨界年付版", price: "¥96.00/年", traffic: "60GB/月" },
      { name: "轻云 Lite", price: "¥20.00/月", traffic: "120GB/月" },
      { name: "跃云 Leap", price: "¥40.00/月", traffic: "330GB/月" },
      { name: "凌云 Soar", price: "¥90.00/月", traffic: "830GB/月" },
      { name: "无界 Infinity", price: "¥130.00/月", traffic: "1.8TB/月" }
    ]
  },
  {
    id: "lingmao",
    name: "灵猫",
    slug: "lingmao",
    rank: 7,
    officialUrl: "https://edp01.civetaff.com/#/?code=CYg7QSJo",
    affiliateUrl: "https://edp01.civetaff.com/#/?code=CYg7QSJo",
    price: "7.08",
    priceUnit: "元/月起 (按年付)",
    traffic: "45GB - 300GB",
    validity: "年付/季付/月付",
    routeInfo: "全IPLC专线，最大带宽 1000 Mbps",
    features: [
      "原生IP解锁 Netflix 等流媒体及 AI",
      "不限速，不限制客户端",
      "订单日自动重置或者购买加油包补充",
      "客服全天在线指导"
    ],
    deviceInfo: "不限制客户端",
    officialDescription: "专注于优质网络体验，千兆带宽支持，适合需要高品质原生 IP 解锁服务的用户。",
    source: "Desktop/官网套餐价格和基本资料",
    lastVerified: "2026-09",
    plans: [
      { name: "灵猫·年付小包", price: "¥85.00/年", traffic: "45GB/月" },
      { name: "年付Small", price: "¥195.00/年", traffic: "150GB/月" },
      { name: "年付Big", price: "¥295.00/年", traffic: "300GB/月" },
      { name: "季付Big", price: "¥125.00/季", traffic: "300GB/月" },
      { name: "月付Small", price: "¥25.00/月", traffic: "150GB/月" },
      { name: "月付Big", price: "¥45.00/月", traffic: "300GB/月" }
    ]
  },
  {
    id: "shanyue",
    name: "闪跃",
    slug: "shanyue",
    rank: 8,
    officialUrl: "https://wep01.flashleapaff.com/#/?code=cs0ekCMG",
    affiliateUrl: "https://wep01.flashleapaff.com/#/?code=cs0ekCMG",
    price: "8",
    priceUnit: "元/月起 (按年付)",
    traffic: "60GB - 1.0TB",
    validity: "年付/月付",
    routeInfo: "全IPLC专线，原生IP",
    features: [
      "所有节点x1倍率",
      "晚高峰不限速",
      "原生IP解锁各大流媒体",
      "解锁 ChatGPT，TikTok"
    ],
    deviceInfo: "未明确限制",
    officialDescription: "追求晚高峰不限速的极致体验，全 IPLC 原生 IP 线路覆盖广泛业务需求。",
    source: "Desktop/官网套餐价格和基本资料",
    lastVerified: "2026-09",
    plans: [
      { name: "闪跃年付版", price: "¥96.00/年", traffic: "60GB/月" },
      { name: "闪动 (Flicker)", price: "¥24.00/月", traffic: "150GB/月" },
      { name: "飞跃 (Leap)", price: "¥44.00/月", traffic: "300GB/月" },
      { name: "瞬移 (Teleport)", price: "¥84.00/月", traffic: "600GB/月" },
      { name: "跃迁 (Warp)", price: "¥134.00/月", traffic: "1.0TB/月" }
    ]
  }
];

providers.forEach(p => {
  fs.writeFileSync(path.join(providersDir, `${p.id}.json`), JSON.stringify(p, null, 2));
});

console.log('Provider data generated successfully.');
