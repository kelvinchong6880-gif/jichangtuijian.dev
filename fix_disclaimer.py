import sys
with open('c:/Users/USER/Desktop/jichangtuijianpro.com/src/pages/paihangbang/index.astro', 'r', encoding='utf-8') as f:
    c = f.read()
    
c = c.replace('当前已按照官方综合测速与推荐优先级进行排名（第1-8名为精选主推，其余随机）。', '本站编辑推荐顺序，不代表实测质量排名（第1-8名为精选主推，其余随机）。如存在商业合作，会在品牌旁标注“合作”。')

with open('c:/Users/USER/Desktop/jichangtuijianpro.com/src/pages/paihangbang/index.astro', 'w', encoding='utf-8') as f:
    f.write(c)
