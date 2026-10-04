// 机场数据层：读取 src/data/providers/*.json，解析价格/流量，供所有页面计算排名和对比。
// 改价格、流量、优惠码只需要改对应的 JSON 文件，首页 / 排行榜 / 便宜 / 性价比 / 对比 / 测评页会自动更新。

export type Billing = 'Monthly' | 'Quarterly' | 'Yearly' | 'One-Time';

export interface RawPlan { name: string; price: string; traffic: string; validity?: string; note?: string }
export interface RawProvider {
  id: string; name: string; slug: string; rank: number;
  officialUrl: string; affiliateUrl: string;
  price: string; priceUnit: string; traffic: string; validity: string; routeInfo: string;
  features: string[]; deviceInfo?: string; officialDescription?: string; lastVerified: string;
  plans: RawPlan[]; logo?: string;
  promo?: string | null; lines?: string[]; streaming?: boolean | null; ai?: boolean | null;
  nodeRegions?: string; verdict?: string; bestFor?: string;
}
export interface Plan { name: string; price: number; billing: Billing; traffic: number | null; custom: boolean; raw: RawPlan }
export interface Provider extends RawProvider {
  url: string;
  allPlans: Plan[]; // 解析后的全部套餐（含定制）
  priced: Plan[]; // 参与价格计算的套餐（不含定制）
  monthly: Plan[]; yearly: Plan[]; oneTime: Plan[];
  entry: Plan | null; // 最便宜的月付
  minYearly: Plan | null;
  bestValue: Plan | null; // 每 GB 最便宜的周期套餐
  minTraffic: number; maxTraffic: number;
  lineLabel: string; premium: boolean;
}

/* ---------- 站点常量 ---------- */
export const UPDATED = '2026-10-04';
export const UPDATED_LABEL = '2026 年 10 月 4 日';
export const UPDATED_MONTH = '2026年10月';

/* ---------- 解析 ---------- */
function parseBilling(price: string): Billing {
  if (/年/.test(price)) return 'Yearly';
  if (/季/.test(price)) return 'Quarterly';
  if (/次|一次性/.test(price)) return 'One-Time';
  return 'Monthly';
}
function parseTraffic(t: string): number | null {
  const inner = t.match(/（(\d+(?:\.\d+)?)\s*GB）/);
  if (inner) return parseFloat(inner[1]);
  const m = t.match(/(\d+(?:\.\d+)?)\s*(TB|GB)/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  return m[2].toUpperCase() === 'TB' ? Math.round(n * 1000) : n;
}
function parsePlan(p: RawPlan): Plan {
  const price = parseFloat((p.price.match(/(\d+(?:\.\d+)?)/) ?? ['0', '0'])[1]);
  return { name: p.name, price, billing: parseBilling(p.price), traffic: parseTraffic(p.traffic), custom: /定制/.test(p.name), raw: p };
}

/* ---------- 计算工具 ---------- */
export function monthlyEq(p: Plan): number | null {
  if (p.billing === 'Monthly') return p.price;
  if (p.billing === 'Quarterly') return p.price / 3;
  if (p.billing === 'Yearly') return p.price / 12;
  return null;
}
export function perGB(p: Plan): number | null {
  if (!p.traffic) return null;
  return (monthlyEq(p) ?? p.price) / p.traffic;
}
export const fmtGB = (n: number | null) => (n == null ? '—' : n >= 1000 ? `${+(n / 1000).toFixed(2)}TB` : `${n}GB`);
export const fmtPrice = (n: number) => `¥${Number.isInteger(n) ? n : n.toFixed(1)}`;
export const billingLabel = (b: Billing) => ({ Monthly: '月付', Quarterly: '季付', Yearly: '年付', 'One-Time': '不限时' })[b];
export const unit = (b: Billing) => ({ Monthly: '月', Quarterly: '季', Yearly: '年', 'One-Time': '次' })[b];
export const planPrice = (p: Plan) => `${fmtPrice(p.price)}/${unit(p.billing)}`;
export const planTraffic = (p: Plan) => (p.billing === 'One-Time' ? `${fmtGB(p.traffic)}（不过期）` : `${fmtGB(p.traffic)}/月`);

/* ---------- 读取 ---------- */
const files = import.meta.glob<RawProvider>('./providers/*.json', { eager: true, import: 'default' });

function toProvider(r: RawProvider): Provider {
  const allPlans = r.plans.map(parsePlan);
  const priced = allPlans.filter((p) => !p.custom);
  const by = (b: Billing) => priced.filter((p) => p.billing === b).sort((a, c) => a.price - c.price);
  const periodic = priced.filter((p) => p.billing !== 'One-Time' && p.traffic);
  const traffic = priced.map((p) => p.traffic).filter((t): t is number => t != null);
  const lines = r.lines ?? [];
  return {
    ...r,
    url: `/review/${r.slug}/`,
    allPlans, priced,
    monthly: by('Monthly'), yearly: by('Yearly'), oneTime: by('One-Time'),
    entry: by('Monthly')[0] ?? null,
    minYearly: by('Yearly')[0] ?? null,
    bestValue: [...periodic].sort((a, c) => perGB(a)! - perGB(c)!)[0] ?? null,
    minTraffic: Math.min(...traffic), maxTraffic: Math.max(...traffic),
    lineLabel: lines.length ? lines.join(' / ') : 'IPLC',
    premium: lines.some((l) => l === 'IPLC' || l === 'IEPL'),
  };
}

const ALL: Provider[] = Object.values(files).map(toProvider).sort((a, b) => a.rank - b.rank);

export function getProviders(): Provider[] {
  return ALL;
}
export function getProviderBySlug(slug: string): Provider | undefined {
  return ALL.find((p) => p.slug === slug);
}

/* ---------- 按用量选 ---------- */
export const USAGE = [
  { key: 'light', label: '轻度', need: 50, desc: '查资料、用 ChatGPT、刷社交软件' },
  { key: 'daily', label: '日常', need: 150, desc: '每天看 1–2 小时视频' },
  { key: 'video', label: '追剧', need: 300, desc: '经常看 4K、YouTube、Netflix' },
  { key: 'heavy', label: '重度', need: 600, desc: '多设备、全家共用、常下载' },
];
/** 满足每月用量的最便宜周期套餐（按折合月价） */
export function cheapestFor(p: Provider, need: number): Plan | null {
  return (
    p.priced
      .filter((x) => x.billing !== 'One-Time' && (x.traffic ?? 0) >= need)
      .sort((a, c) => monthlyEq(a)! - monthlyEq(c)! || (c.traffic ?? 0) - (a.traffic ?? 0))[0] ?? null
  );
}
export const usagePrice = (x: Plan) =>
  x.billing === 'Monthly' ? `${fmtPrice(x.price)}/月` : `${fmtPrice(x.price)}/${unit(x.billing)}（折合 ${fmtPrice(monthlyEq(x)!)}/月）`;

/* ---------- 两两对比 ---------- */
export const PAIRS: [string, string][] = [
  ['sogocloud', 'weifeng'],
  ['sogocloud', 'flycat'],
  ['sogocloud', 'wuyou'],
  ['sogocloud', 'firefly'],
  ['flycat', 'weifeng'],
  ['wuyou', 'kuajieyun'],
  ['firefly', 'shanyue'],
  ['kuajieyun', 'lingmao'],
];
export const pairSlug = (a: string, b: string) => `${a}-vs-${b}`;

export const unlockText = (p: Provider) => {
  const s = [p.streaming ? '流媒体' : null, p.ai ? 'ChatGPT' : null].filter(Boolean);
  return s.length ? s.join(' + ') : '官网未标注';
};
