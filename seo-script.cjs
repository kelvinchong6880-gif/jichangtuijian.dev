const fs = require('fs');
const path = require('path');

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = dir + '/' + file;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, filesList);
    } else {
      if (name.endsWith('.html')) {
        filesList.push(name);
      }
    }
  }
  return filesList;
}

const htmlFiles = getFiles('dist');
const result = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let urlPath = file.replace('dist', '').replace(/\\/g, '/');
  if (urlPath.endsWith('index.html')) {
      urlPath = urlPath.replace('index.html', '');
  }
  if (!urlPath.endsWith('/')) {
      urlPath += '/';
  }
  if (urlPath === '//') urlPath = '/';
  
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const h1Match = content.match(/<h1[^>]*>([^<]*)<\/h1>/i);
  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]*)"/i);
  const robotsMatch = content.match(/<meta name="robots" content="([^"]*)"/i);
  
  result.push({
    URL: urlPath,
    Title: titleMatch ? titleMatch[1] : 'N/A',
    H1: h1Match ? h1Match[1] : 'N/A',
    Canonical: canonicalMatch ? canonicalMatch[1] : 'N/A',
    Indexable: robotsMatch && robotsMatch[1].includes('noindex') ? 'No' : 'Yes'
  });
}

fs.writeFileSync('seo-audit.json', JSON.stringify(result, null, 2), 'utf8');
console.log('Wrote seo-audit.json');
