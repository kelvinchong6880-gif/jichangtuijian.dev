import json
import urllib.request
import urllib.error
import ssl

with open('c:/Users/USER/Desktop/jichangtuijianpro.com/urls_to_check.json', 'r', encoding='utf-8') as f:
    urls = json.load(f)
    
results = []
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

print(f"Checking {len(urls)} URLs...")
for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10, context=ctx) as response:
            results.append(f"[OK] {url}")
    except urllib.error.HTTPError as e:
        if e.code in [403, 401]:
            results.append(f"[访问限制 (403/401)] {url}")
        else:
            results.append(f"[失效 ({e.code})] {url}")
    except urllib.error.URLError as e:
        if 'timeout' in str(e.reason).lower():
            results.append(f"[超时] {url}")
        else:
            results.append(f"[失效 ({e.reason})] {url}")
    except Exception as e:
        results.append(f"[错误 ({str(e)})] {url}")

with open('c:/Users/USER/Desktop/jichangtuijianpro.com/URL_CHECK_RESULTS.md', 'w', encoding='utf-8') as f:
    f.write("# 外部链接检查结果\n\n")
    for r in results:
        f.write(f"- {r}\n")
