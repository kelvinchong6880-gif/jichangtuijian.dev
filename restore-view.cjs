const fs = require('fs');
const lines = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/cc3f1f53-385b-4c50-a677-a370961c45eb/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');

const lastViews = {};

for (const line of lines) {
  if (!line) continue;
  const step = JSON.parse(line);
  if (step.type === 'VIEW_FILE' && step.content) {
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/pages/index.astro`')) {
        lastViews['index.astro'] = step.content;
     }
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/pages/review/[slug].astro`')) {
        lastViews['[slug].astro'] = step.content;
     }
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/pages/recommend.astro`')) {
        lastViews['recommend.astro'] = step.content;
     }
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/pages/review/sogocloud.astro`')) {
        lastViews['sogocloud.astro'] = step.content;
     }
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/pages/review/index.astro`')) {
        lastViews['review-index.astro'] = step.content;
     }
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/components/Header.astro`')) {
        lastViews['Header.astro'] = step.content;
     }
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/components/Footer.astro`')) {
        lastViews['Footer.astro'] = step.content;
     }
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/components/Disclosure.astro`')) {
        lastViews['Disclosure.astro'] = step.content;
     }
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/components/ProviderCard.astro`')) {
        lastViews['ProviderCard.astro'] = step.content;
     }
     if (step.content.includes('File Path: `file:///C:/Users/USER/Desktop/jichangtuijian.dev/src/pages/404.astro`')) {
        lastViews['404.astro'] = step.content;
     }
  }
}

for (let name in lastViews) {
   let text = lastViews[name];
   let linesOutput = text.split('\n');
   let realContent = [];
   let started = false;
   for(let l of linesOutput) {
      if (l.match(/^\d+:/)) {
         started = true;
         realContent.push(l.substring(l.indexOf(':') + 2));
      } else if (started && l.includes('The above content shows the entire')) {
         break;
      }
   }
   console.log('Restored', name, realContent.length, 'lines');
   
   let p = 'src/pages/';
   if (name.includes('Header') || name.includes('Footer') || name.includes('Disclosure') || name.includes('ProviderCard')) {
       p = 'src/components/';
   } else if (name === '[slug].astro') {
       p = 'src/pages/review/';
   } else if (name === 'sogocloud.astro') {
       p = 'src/pages/review/';
   } else if (name === 'review-index.astro') {
       p = 'src/pages/review/';
       name = 'index.astro';
   }
   fs.writeFileSync(p + name, realContent.join('\n'), 'utf8');
}
