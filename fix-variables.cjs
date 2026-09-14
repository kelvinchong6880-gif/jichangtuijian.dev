const fs = require('fs');
let s = fs.readFileSync('gen-vpn.cjs', 'utf8');
s = s.replace(/\\\$\{/g, '${');
fs.writeFileSync('gen-vpn.cjs', s, 'utf8');
console.log('Fixed variables');
