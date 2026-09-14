const fs = require('fs');

let a = fs.readFileSync('src/pages/review/[slug].astro', 'utf8');

const target = `{provider.protocols.map(p => (
                            <span style="display: inline-block; background: var(--bg-alt); padding: 0.2rem 0.5rem; border-radius: 4px; margin-right: 0.5rem; font-size: 0.85rem;">{p}</span>
                        ))}`;
                        
const replacement = '<span style="display: inline-block; background: var(--bg-alt); padding: 0.2rem 0.5rem; border-radius: 4px; margin-right: 0.5rem; font-size: 0.85rem;">SS/V2Ray/Trojan</span>';

a = a.replace(target, replacement);

// ALSO, wait... the EPHEMERAL_MESSAGE got appended to [slug].astro!!!
// I need to strip it out!
const ephemeralIndex = a.indexOf('The following is an <EPHEMERAL_MESSAGE>');
if (ephemeralIndex !== -1) {
    a = a.substring(0, ephemeralIndex).trim();
}

fs.writeFileSync('src/pages/review/[slug].astro', a, 'utf8');

console.log('Fixed [slug].astro!');
