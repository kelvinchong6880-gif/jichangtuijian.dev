import { SITE } from './config';
import type { Provider } from './providers';

export const faqSchema = (faq: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const itemListSchema = (name: string, list: Provider[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  numberOfItems: list.length,
  itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${SITE.domain}${p.url}` })),
});

export const articleSchema = (headline: string, description: string, path: string, published = '2026-09-01') => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  inLanguage: 'zh-CN',
  datePublished: published,
  dateModified: '2026-10-04T00:00:00+08:00',
  author: { '@type': 'Organization', name: SITE.author, url: `${SITE.domain}/` },
  publisher: { '@type': 'Organization', name: SITE.name, url: `${SITE.domain}/`, logo: { '@type': 'ImageObject', url: `${SITE.domain}/favicon.svg` } },
  image: `${SITE.domain}/og.png`,
  mainEntityOfPage: `${SITE.domain}${path}`,
});
