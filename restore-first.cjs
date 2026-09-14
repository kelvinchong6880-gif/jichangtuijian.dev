const fs = require('fs');
const lines = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/cc3f1f53-385b-4c50-a677-a370961c45eb/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');

const firstViews = {};

for (const line of lines) {
  if (!line) continue;
  const step = JSON.parse(line);
  if (step.type === 'VIEW_FILE' && step.content) {
     if (step.content.includes('src/pages/index.astro') && !firstViews['index.astro']) {
        firstViews['index.astro'] = step.content;
     }
     if (step.content.includes('src/pages/review/[slug].astro') && !firstViews['[slug].astro']) {
        firstViews['[slug].astro'] = step.content;
     }
     if (step.content.includes('src/pages/recommend.astro') && !firstViews['recommend.astro']) {
        firstViews['recommend.astro'] = step.content;
     }
  }
}

for (let name in firstViews) {
   let text = firstViews[name];
   let linesOutput = text.split('\n');
   let realContent = [];
   let started = false;
   for(let l of linesOutput) {
      if (l.match(/^\d+:/)) {
         started = true;
         realContent.push(l.substring(l.indexOf(':') + 2));
      } else if (started && (l.includes('The above content shows the entire') || l.includes('<EPHEMERAL_MESSAGE>'))) {
         break;
      }
   }
   console.log('Restored', name, realContent.length, 'lines');
   let p = 'src/pages/';
   if (name === '[slug].astro') p = 'src/pages/review/';
   fs.writeFileSync(p + name, realContent.join('\n'), 'utf8');
}
