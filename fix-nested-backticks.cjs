const fs = require('fs');
let s = fs.readFileSync('gen-vpn.cjs', 'utf8');
s = s.replace(/`8\.8\.8\.8`/g, '<code>8.8.8.8</code>');
s = s.replace(/`1\.1\.1\.1`/g, '<code>1.1.1.1</code>');
s = s.replace(/`ipleak\.net`/g, '<code>ipleak.net</code>');
s = s.replace(/`example\.com`/g, '<code>example.com</code>');
fs.writeFileSync('gen-vpn.cjs', s, 'utf8');
console.log('Fixed nested backticks');
