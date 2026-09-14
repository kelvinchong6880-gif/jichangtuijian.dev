const fs = require('fs');
let s = fs.readFileSync('gen-vpn.cjs', 'utf8');
const searchString = '不是永久裸奔上网。</p>\n            </div>\n`\n\n// 7. vpn-speed-test';
const replaceString = '不是永久裸奔上网。</p>\n            </div>\n`\n);\n\n// 7. vpn-speed-test';
s = s.replace(searchString, replaceString);
fs.writeFileSync('gen-vpn.cjs', s, 'utf8');
console.log('Fixed missing parenthesis');
