const fs = require('fs');
let c = fs.readFileSync('src/pages/review/sogocloud.astro', 'utf8').trim();
if (c.startsWith('"')) {
   c = JSON.parse(c);
   fs.writeFileSync('src/pages/review/sogocloud.astro', c, 'utf8');
   console.log('Fixed sogocloud.astro');
}
