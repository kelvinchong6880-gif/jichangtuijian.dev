import os
import re
import sys
from bs4 import BeautifulSoup

def check_links():
    dist_dir = 'c:/Users/USER/Desktop/jichangtuijianpro.com/dist'
    
    html_files = []
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
                
    valid_paths = set()
    valid_paths.add('/')
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            if file == 'index.html':
                rel = os.path.relpath(root, dist_dir).replace('\\', '/')
                if rel == '.':
                    valid_paths.add('/')
                else:
                    valid_paths.add('/' + rel + '/')
                    valid_paths.add('/' + rel)
            else:
                rel = os.path.relpath(os.path.join(root, file), dist_dir).replace('\\', '/')
                valid_paths.add('/' + rel)

    errors = []
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
            
        for a in soup.find_all('a', href=True):
            href = a['href']
            # Ignore external links and anchors
            if href.startswith('http') or href.startswith('mailto:') or href.startswith('#'):
                continue
                
            # Strip query params
            href = href.split('?')[0].split('#')[0]
            
            if href not in valid_paths:
                errors.append(f"Broken link {href} in {html_file}")
                
        for link in soup.find_all('link', href=True):
            href = link['href']
            if href.startswith('http'): continue
            href = href.split('?')[0].split('#')[0]
            if href not in valid_paths:
                errors.append(f"Broken asset link {href} in {html_file}")

        for script in soup.find_all('script', src=True):
            src = script['src']
            if src.startswith('http'): continue
            src = src.split('?')[0].split('#')[0]
            if src not in valid_paths:
                errors.append(f"Broken script link {src} in {html_file}")

    if errors:
        print("Broken links found:")
        for err in errors:
            print(err)
        sys.exit(1)
    else:
        print("All internal links and assets are valid.")

check_links()
