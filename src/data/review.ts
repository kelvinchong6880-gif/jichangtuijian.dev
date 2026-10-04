// 测评文案生成：根据套餐数据自动给出优缺点和常见问题，数据一改文案跟着变。
import { getProviders, fmtGB, fmtPrice, perGB, planPrice, unlockText, cheapestFor, usagePrice, USAGE, type Provider } from './providers';

const all = () => getProviders();
const avgEntry = () => {
  const e = all().filter((p) => p.entry).map((p) => p.entry!.price);
  return e.reduce((a, c) => a + c, 0) / e.length;
};

export function prosCons(p: Provider) {
  const pros: string[] = [];
  const cons: string[] = [];
  pros.push(`${p.lineLabel} 专线，晚高峰比普通中转线路更稳定`);
  if (p.entry) {
    if (p.entry.price <= avgEntry() - 1) pros.push(`月付门槛低：${planPrice(p.entry)} 就有 ${fmtGB(p.entry.traffic)}`);
    else if (p.entry.price >= avgEntry() + 1) cons.push(`月付入门价 ${planPrice(p.entry)}，比收录机场平均价略高`);
  }
  if (p.minYearly) pros.push(`有年付小包：${planPrice(p.minYearly)}，每月 ${fmtGB(p.minYearly.traffic)}，折合约 ${fmtPrice(p.minYearly.price / 12)}/月`);
  if (p.oneTime.length) pros.push(`有 ${p.oneTime.length} 款不限时流量包（${fmtPrice(p.oneTime[0].price)} 起），流量不过期`);
  else cons.push('没有不限时流量包，偶尔用的人只能买周期套餐');
  if (p.maxTraffic >= 1000) pros.push(`最高 ${fmtGB(p.maxTraffic)}/月，大流量、多设备也够用`);
  else cons.push(`最大只有 ${fmtGB(p.maxTraffic)}/月，重度用户不够用`);
  if (p.streaming && p.ai) pros.push('官网写明可解锁 Netflix 等流媒体和 ChatGPT');
  if (p.streaming == null && p.ai == null) cons.push('官网没写流媒体和 ChatGPT 解锁情况，需要的话先月付测试');
  if (p.slug === 'lingmao') pros.push('少见的季付档：¥125/季 每月 300GB');
  if (p.slug === 'flycat') cons.push('不限时包门槛高：¥680 起（1TB）');
  if (p.slug === 'weifeng') cons.push('没有低于 ¥27 的月付档，轻度用户要选年付清风');
  return { pros, cons };
}

export function brandFaq(p: Provider) {
  const daily = cheapestFor(p, 150);
  const faq = [
    {
      q: `${p.name}怎么样？适合新手吗？`,
      a: `${p.name}：${p.verdict}。在本站机场排行榜排第 ${p.rank} 名，最适合${p.bestFor}。新手建议先买一个月试试。`,
    },
    {
      q: `${p.name}一个月多少钱？最便宜怎么买？`,
      a: `${p.entry ? `按月买最低 ${planPrice(p.entry)}，每月 ${fmtGB(p.entry.traffic)}` : '没有月付'}${p.minYearly ? `；一年付一次最低 ${planPrice(p.minYearly)}，每月 ${fmtGB(p.minYearly.traffic)}` : ''}${p.oneTime.length ? `；不过期的流量包 ${fmtPrice(p.oneTime[0].price)} 起` : ''}${p.promo ? `。结算时填优惠码 ${p.promo}` : ''}。`,
    },
    {
      q: `每天刷视频，买${p.name}哪个套餐？`,
      a: daily ? `每天看 1–2 小时视频，每月大约用 150GB，选 ${daily.name}：${usagePrice(daily)}，每月 ${fmtGB(daily.traffic)}。只查资料、用 ChatGPT 的话可以选更小的套餐。` : `${p.name}没有 150GB 以上的周期套餐，流量大的话建议看其他机场。`,
    },
    {
      q: `${p.name}能看 Netflix、用 ChatGPT 吗？`,
      a: p.streaming || p.ai ? `官网写明支持：${unlockText(p)}。如果某个节点打不开，换成香港、日本、新加坡或美国的其他节点试试。` : '官网没有写明。如果你主要是为了看 Netflix 或用 ChatGPT，建议先买月付测试，或者选官网写明支持的机场。',
    },
    {
      q: `买了${p.name}之后怎么用？`,
      a: `在 ${p.name} 官网的用户中心复制订阅链接，粘贴到客户端里导入，选一个节点打开开关就能用。不同设备的步骤见本站 Windows、Mac、iPhone、安卓教程。`,
    },
  ];
  return faq;
}

export { perGB, USAGE };
