import re
import sys

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace (brand) => with (brand: any) =>
    content = re.sub(r'\(brand\) =>', '(brand: any) =>', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('c:/Users/USER/Desktop/jichangtuijianpro.com/src/pages/pianyi/index.astro')
fix_file('c:/Users/USER/Desktop/jichangtuijianpro.com/src/pages/xingjiabi/index.astro')
