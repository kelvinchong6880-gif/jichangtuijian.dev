const fs = require('fs');
const files = [
  'src/pages/index.astro',
  'src/pages/recommend.astro',
  'src/pages/review/[slug].astro',
  'src/pages/review/index.astro',
  'src/pages/review/sogocloud.astro'
];
for(let f of files) {
  let content = fs.readFileSync(f, 'utf8').trim();
  if (content.startsWith('"') && content.endsWith('"')) {
     try {
       content = JSON.parse(content);
       fs.writeFileSync(f, content, 'utf8');
       console.log('Fixed', f);
     } catch(e) { console.error('Error on', f, e.message) }
  }
}
