const fs = require('fs');
const files = [
  'src/components/Header.astro',
  'src/components/Footer.astro',
  'src/components/Disclosure.astro',
  'src/components/ProviderCard.astro',
  'src/pages/index.astro',
  'src/pages/recommend.astro',
  'src/pages/review/[slug].astro',
  'src/pages/review/index.astro',
  'src/pages/404.astro',
  'src/pages/review/sogocloud.astro'
];
for(let f of files) {
  let content = fs.readFileSync(f, 'utf8');
  if (content.endsWith('\n')) content = content.substring(0, content.length - 1);
  if (content.endsWith('\r')) content = content.substring(0, content.length - 1);
  if (content.startsWith('"') && content.endsWith('"')) {
     try {
       content = JSON.parse(content);
       fs.writeFileSync(f, content, 'utf8');
       console.log('Fixed', f);
     } catch(e) { console.error('Error on', f, e.message) }
  }
}
