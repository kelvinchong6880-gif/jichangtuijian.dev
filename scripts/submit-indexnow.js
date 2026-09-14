import fs from 'fs';
import path from 'path';

// Parse sitemap
const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap-0.xml');
if (!fs.existsSync(sitemapPath)) {
    console.error('sitemap-0.xml not found. Please run build first.');
    process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);

if (!urlMatches || urlMatches.length === 0) {
    console.error('No URLs found in sitemap.');
    process.exit(1);
}

const urlList = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
const host = 'jichangtuijian.pro';
const key = 'f9aa68cc9d2342f19ccdeb8ca30df445';
const keyLocation = `https://${host}/${key}.txt`;

const payload = {
    host,
    key,
    keyLocation,
    urlList
};

console.log(`[IndexNow] Prepared to submit ${urlList.length} URLs for host: ${host}`);

async function submitToIndexNow() {
    const endpoint = 'https://api.indexnow.org/indexnow';
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        });

        const status = response.status;
        const statusText = response.statusText;
        
        console.log(`[IndexNow] Endpoint: ${endpoint}`);
        console.log(`[IndexNow] HTTP Response Status: ${status} ${statusText}`);
        
        if (status === 200 || status === 202) {
            console.log('[IndexNow] Submission successful! Search engines will prioritize crawling these URLs.');
        } else {
            const text = await response.text();
            console.error(`[IndexNow] Submission failed. Response body: ${text}`);
        }
    } catch (error) {
        console.error('[IndexNow] Error submitting to IndexNow:', error);
    }
}

submitToIndexNow();
