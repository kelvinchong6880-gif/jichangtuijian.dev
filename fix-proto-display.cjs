const fs = require('fs');

let a = fs.readFileSync('src/pages/review/[slug].astro', 'utf8');
const target = '<span style="display: inline-block; background: var(--bg-alt); padding: 0.2rem 0.5rem; border-radius: 4px; margin-right: 0.5rem; font-size: 0.85rem;">SS/V2Ray/Trojan</span>';
const replacement = '{provider.protocols ? provider.protocols.map(p => (<span style="display: inline-block; background: var(--bg-alt); padding: 0.2rem 0.5rem; border-radius: 4px; margin-right: 0.5rem; font-size: 0.85rem;">{p}</span>)) : <span style="font-size: 0.9rem; color: var(--text-muted);">官方未明确说明</span>}';
a = a.replace(target, replacement);
fs.writeFileSync('src/pages/review/[slug].astro', a, 'utf8');

let s = fs.readFileSync('src/pages/review/sogocloud.astro', 'utf8');
const starget = '<div style="font-size: 1.1rem;">Shadowsocks, V2Ray, Trojan, Clash</div>';
const sreplacement = '<div style="font-size: 1.1rem;">{provider.protocols ? provider.protocols.join(\', \') : <span style="font-size: 0.9rem; color: var(--text-muted);">官方未明确说明</span>}</div>';
s = s.replace(starget, sreplacement);
fs.writeFileSync('src/pages/review/sogocloud.astro', s, 'utf8');

console.log('Fixed protocols to be honest');
