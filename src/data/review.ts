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
      q: `${p.name}怎么样？`,
      a: `${p.name}：${p.verdict}。在本站机场排行榜排第 ${p.rank} 名，适合${p.bestFor}。`,
    },
    {
      q: `${p.name}多少钱一个月？`,
      a: `${p.entry ? `月付最低 ${planPrice(p.entry)}（${fmtGB(p.entry.traffic)}）` : '没有月付'}${p.minYearly ? `，年付最低 ${planPrice(p.minYearly)}（每月 ${fmtGB(p.minYearly.traffic)}）` : ''}${p.oneTime.length ? `，不限时包 ${fmtPrice(p.oneTime[0].price)} 起` : ''}。`,
    },
    {
      q: `${p.name}每天看视频选哪个套餐？`,
      a: daily ? `每天 1–2 小时视频每月约需 150GB，选 ${daily.name}：${usagePrice(daily)}，每月 ${fmtGB(daily.traffic)}。` : `${p.name}没有 150GB 以上的周期套餐。`,
    },
    {
      q: `${p.name}能看 Netflix、用 ChatGPT 吗？`,
      a: p.streaming || p.ai ? `官网写明支持：${unlockText(p)}。不同地区节点解锁情况不同，建议用香港、日本、新加坡、美国节点。` : '官网没有写明流媒体和 ChatGPT 解锁情况，需要的话先买月付实测。',
    },
  ];
  if (p.promo) faq.push({ q: `${p.name}有优惠码吗？`, a: `有，结算页填写优惠码 ${p.promo} 即可。优惠力度以官网结算页显示为准。` });
  return faq;
}

export { perGB, USAGE };
