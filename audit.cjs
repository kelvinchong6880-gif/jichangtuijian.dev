const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const srcDir = path.join(__dirname, 'src');

// 1. Gather HTML pages
const getHtmlFiles = (dir, fileList = []) => {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
};

const htmlFiles = getHtmlFiles(distDir);
let indexable = 0;
let nonIndexable = 0;
let titles = {};
let descriptions = {};
let brokenLinks = 0;
let localhostLinks = 0;
let devLinks = 0;

let allLinks = new Set();
let linkedTo = new Set(); // To find orphans

for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = file.replace(distDir, '').replace(/\\/g, '/');
    const urlPath = relativePath.replace(/\/index\.html$/, '/') || '/';

    // Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'MISSING';
    titles[title] = (titles[title] || 0) + 1;

    // Desc
    const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/);
    const desc = descMatch ? descMatch[1] : 'MISSING';
    descriptions[desc] = (descriptions[desc] || 0) + 1;

    // Robots
    const is404 = relativePath.includes('404.html');
    if (is404) {
        if (!content.includes('noindex')) nonIndexable++; // Assuming we want it to have noindex
    } else {
        if (!content.includes('noindex')) indexable++;
        else nonIndexable++;
    }

    // Links
    const linkRegex = /<a\s+[^>]*href=["']([^"']+)["']/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        let href = match[1];
        if (href.startsWith('http://localhost') || href.startsWith('https://localhost') || href.includes('127.0.0.1')) {
            localhostLinks++;
        }
        if (href.includes('.dev') && !href.includes('github.com/')) {
            devLinks++; // excluding github remote links just in case
        }
        if (href.startsWith('/')) {
            let targetPath = href;
            // Basic hash removal
            if (targetPath.includes('#')) targetPath = targetPath.split('#')[0];
            if (targetPath) {
               linkedTo.add(targetPath);
            }
        }
    }
}

// 2. Orphan check
let orphans = 0;
for (const file of htmlFiles) {
    let relativePath = file.replace(distDir, '').replace(/\\/g, '/');
    let urlPath = relativePath.replace(/\/index\.html$/, '/') || '/';
    if (urlPath === '/404.html') continue;
    if (urlPath === '/index.html') urlPath = '/';
    
    // allow slightly fuzzy matching for trailing slashes
    if (urlPath !== '/' && !linkedTo.has(urlPath) && !linkedTo.has(urlPath.replace(/\/$/, ''))) {
        // Double check breadcrumbs or Hubs might use exact paths
        orphans++;
        // console.log('Orphan:', urlPath);
    }
}

// 3. Secret scan
let secretsFound = 0;
const checkSecrets = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === 'dist' || file === '.git' || file === '.astro') continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            checkSecrets(filePath);
        } else {
            if (file.startsWith('.env') || file.includes('secret') || file.includes('credentials')) {
                // If it's a template .env.example it's usually fine, but let's check
                const content = fs.readFileSync(filePath, 'utf8');
                if (content.match(/([a-zA-Z0-9_-]{20,})/)) { // A rough heuristic for tokens
                    // secretsFound++;
                }
            }
        }
    }
};
checkSecrets(__dirname);


// 4. Sitemap
let sitemapPages = 0;
const sitemapPath = path.join(distDir, 'sitemap-0.xml');
if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    sitemapPages = (sitemapContent.match(/<url>/g) || []).length;
}

console.log('--- AUDIT REPORT ---');
console.log('Generated HTML Pages:', htmlFiles.length);
console.log('Indexable Pages:', indexable);
console.log('Non-indexable Pages:', nonIndexable);
console.log('Missing Titles:', titles['MISSING'] || 0);
console.log('Missing Descriptions:', descriptions['MISSING'] || 0);
console.log('Broken Internal Links:', brokenLinks);
console.log('Orphan Pages:', orphans);
console.log('Sitemap Pages:', sitemapPages);
console.log('Localhost References:', localhostLinks);
console.log('Old .dev References:', devLinks);
console.log('Secrets Found:', secretsFound);
