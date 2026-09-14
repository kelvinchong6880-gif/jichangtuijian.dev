const fs = require('fs');
const path = require('path');

const brandDir = 'public/images/brand';
if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
}

const logoMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 65,20 L 65,60 A 25,25 0 0 1 15,60" fill="none" stroke="#2563eb" stroke-width="12" stroke-linecap="round"/>
  <circle cx="65" cy="20" r="10" fill="#f59e0b"/>
  <circle cx="15" cy="60" r="10" fill="#f59e0b"/>
  <circle cx="40" cy="85" r="7" fill="#2563eb"/>
  <path d="M 15,35 Q 50,5 85,30" fill="none" stroke="#64748b" stroke-width="4" stroke-dasharray="6,6" stroke-linecap="round"/>
  <circle cx="85" cy="30" r="5" fill="#64748b"/>
</svg>`;

const logoHorizontal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100">
  <g transform="translate(10, 0)">
    <path d="M 55,20 L 55,60 A 20,20 0 0 1 15,60" fill="none" stroke="#2563eb" stroke-width="10" stroke-linecap="round"/>
    <circle cx="55" cy="20" r="8" fill="#f59e0b"/>
    <circle cx="15" cy="60" r="8" fill="#f59e0b"/>
    <circle cx="35" cy="80" r="6" fill="#2563eb"/>
    <path d="M 15,35 Q 45,5 75,30" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="4,4" stroke-linecap="round"/>
    <circle cx="75" cy="30" r="4" fill="#64748b"/>
  </g>
  <text x="100" y="64" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="42" font-weight="bold" fill="#0f172a">机场推荐</text>
</svg>`;

fs.writeFileSync(path.join(brandDir, 'logo-mark.svg'), logoMark, 'utf8');
fs.writeFileSync(path.join(brandDir, 'logo-horizontal.svg'), logoHorizontal, 'utf8');
fs.writeFileSync('public/favicon.svg', logoMark, 'utf8');

console.log('Brand assets created successfully.');
