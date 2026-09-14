const fs = require('fs');
const lines = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/cc3f1f53-385b-4c50-a677-a370961c45eb/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');

const files = {};

for (const line of lines) {
  if (!line) continue;
  const step = JSON.parse(line);
  if (step.step_index >= 390) break;
  
  if (step.type === 'PLANNER_RESPONSE' && step.tool_calls) {
    for (const tc of step.tool_calls) {
      if (!tc.name.includes('write_to_file') && !tc.name.includes('replace_file_content')) continue;
      
      const args = typeof tc.args === 'string' ? JSON.parse(tc.args) : tc.args;
      if (!args || !args.TargetFile) continue;
      
      let tf = args.TargetFile.replace(/\\\\/g, '/').replace(/"/g, '');
      
      if (tc.name.includes('write_to_file')) {
        files[tf] = args.CodeContent;
      }
      if (tc.name.includes('replace_file_content') && !tc.name.includes('multi')) {
        if (files[tf]) {
          files[tf] = files[tf].replace(args.TargetContent, args.ReplacementContent);
        }
      }
      if (tc.name.includes('multi_replace_file_content')) {
         if (files[tf] && args.ReplacementChunks) {
            for (const chunk of args.ReplacementChunks) {
               files[tf] = files[tf].replace(chunk.TargetContent, chunk.ReplacementContent);
            }
         }
      }
    }
  }
}

let restoredCount = 0;
for (const [path, content] of Object.entries(files)) {
  if (path.includes('src/pages') || path.includes('src/components')) {
    try {
        fs.writeFileSync(path, content, 'utf8');
        console.log('Restored', path);
        restoredCount++;
    } catch(e) {
        console.log('Error restoring', path, e.message);
    }
  }
}
console.log('Total restored:', restoredCount);
