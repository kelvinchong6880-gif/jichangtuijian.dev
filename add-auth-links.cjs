const fs = require('fs');
const path = require('path');

function replaceWithLink(content, keyword, url) {
    const regex = new RegExp('(?<!<a[^>]*>)(?<!href=["\'])(?<!href=["\'][^"\']*)(' + keyword + ')(?![^<]*</a>)', 'i');
    return content.replace(regex, '<a href="' + url + '" target="_blank" rel="noopener noreferrer">$1</a>');
}

const dir = 'src/pages/tutorial';
const files = fs.readdirSync(dir);

for (const file of files) {
    if (file.endsWith('.astro')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        
        if (content.includes('Clash')) {
            content = replaceWithLink(content, 'Clash', 'https://github.com/MetaCubeX/mihomo');
        }
        if (content.includes('sing-box')) {
            content = replaceWithLink(content, 'sing-box', 'https://sing-box.sagernet.org/');
        }
        if (content.includes('Shadowrocket')) {
            content = replaceWithLink(content, 'Shadowrocket', 'https://apps.apple.com/us/app/shadowrocket/id932747118');
        }
        if (content.includes('GitHub Release')) {
             content = replaceWithLink(content, 'GitHub Release', 'https://github.com/');
        }
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
    }
}
console.log('Authority links injected into tutorials.');
