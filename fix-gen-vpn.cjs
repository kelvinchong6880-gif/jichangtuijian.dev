const fs = require('fs');
let s = fs.readFileSync('gen-vpn.cjs', 'utf8');
s = s.replace('</div>\n`\n\n// 7. vpn-speed-test', '</div>\n`\n);\n\n// 7. vpn-speed-test');
fs.writeFileSync('gen-vpn.cjs', s, 'utf8');
console.log('Fixed syntax error');
