const fs = require('fs');
let b = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');
let ep = b.indexOf('The following is an <EPHEMERAL_MESSAGE>');
if (ep !== -1) b = b.substring(0, ep).trim() + '\n';

b = b.replace('canonicalUrl?: string;', 'canonicalUrl?: string;\n  noindex?: boolean;');
b = b.replace('canonicalUrl = new URL(Astro.url.pathname, SITE.domain).href', 'canonicalUrl = new URL(Astro.url.pathname, SITE.domain).href,\n  noindex = false');
b = b.replace('<title>{title}</title>', '<title>{title}</title>\n  {noindex && <meta name="robots" content="noindex, follow" />}\n');

fs.writeFileSync('src/layouts/BaseLayout.astro', b, 'utf8');

let f = fs.readFileSync('src/pages/404.astro', 'utf8');
ep = f.indexOf('The following is an <EPHEMERAL_MESSAGE>');
if (ep !== -1) f = f.substring(0, ep).trim() + '\n';
f = f.replace('<BaseLayout ', '<BaseLayout noindex={true} ');
fs.writeFileSync('src/pages/404.astro', f, 'utf8');

console.log('Fixed 404 & BaseLayout');
