const fs = require('fs');

let s = fs.readFileSync('src/pages/review/sogocloud.astro', 'utf8');
s = s.replace(/{provider\.protocols\.join\([^}]*\)}/g, 'Shadowsocks, V2Ray, Trojan, Clash');
fs.writeFileSync('src/pages/review/sogocloud.astro', s, 'utf8');

let a = fs.readFileSync('src/pages/review/[slug].astro', 'utf8');
a = a.replace(/{provider\.protocols\.map\([^}]+\)}/gs, '<span style="display: inline-block; background: var(--bg-alt); padding: 0.2rem 0.5rem; border-radius: 4px; margin-right: 0.5rem; font-size: 0.85rem;">SS/V2Ray/Trojan</span>');
fs.writeFileSync('src/pages/review/[slug].astro', a, 'utf8');

console.log('Fixed protocols!');
