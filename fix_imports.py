import glob
import os

files = glob.glob('c:/Users/USER/Desktop/jichangtuijianpro.com/src/pages/knowledge/*.astro') + \
        glob.glob('c:/Users/USER/Desktop/jichangtuijianpro.com/src/pages/vpn/*.astro') + \
        glob.glob('c:/Users/USER/Desktop/jichangtuijianpro.com/src/pages/tutorial/*.astro')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = content.replace("import { SITE } from '../data/config';", "")
    content = content.replace("import { SITE } from '../../data/config';", "")
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
