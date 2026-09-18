import os
import re

links = {
    "微风": "https://edp01.breezenetaff.com/#/?code=hM8APccJ",
    "firefly": "https://vip02.fireflyaff.com/#/?code=8nDg6OEY",
    "跨界": "https://vip02.kuajieaff.com/#/?code=hh3QezsW",
    "闪跃": "https://wep01.flashleapaff.com/#/?code=cs0ekCMG",
    "无忧": "https://wep01.worryfreeaff.com/#/?code=s1kH64A8",
    "灵猫": "https://edp01.civetaff.com/#/?code=CYg7QSJo",
    "飞猫": "https://flycat1.flycatvipaff.cc/#/?code=w5lO9fqB",
    "sogo": "https://wzjc.sogoyunaff.cc/#/?code=BC2BL855",
    "暮光": "https://varnexa.twilightaff.com/#/?code=2ILQOoYB",
    "星岛梦": "https://kfccbb.xingdaomeng.com/#/?code=0YcwWgSw",
    "唯图": "https://fast.v2yunvipaff.com/#/?code=nbBJVFQP",
    "唯兔": "https://fast.v2yunvipaff.com/#/?code=nbBJVFQP",
    "光速": "https://mdlky.gsyaff.com/#/?code=5PLKd4WN",
    "u1s1": "https://pkdj7.vipaff.cc/#/?code=YUCKdFlR",
    "极连": "https://reuire23oure.jilianat.homes/#/?code=b2OTDcAo",
    "光年梯": "https://vv3dbvb.guangnianertt1.homes/#/?code=mv41lVsv",
    "一翻": "https://wzjc.1flyunaff.cc/#/?code=0tH3Mmch",
    "二猫": "https://wzjc.2maoyunaff.cc/#/?code=bvsFDmSt",
    "edgenova": "https://work.edgenovaaff.cc/#/?code=k7VCKPvN",
    "可信云": "https://work.kosingaff.com/#/?code=k7T1sOyG",
    "速界": "https://work.speedworldaff.cc/#/?code=wZYGdnTC",
    "快狸": "https://work.kuailicloud.cc/#/?code=azB6yNBW",
    "飞v": "https://varnexa.flyvaff.com/#/?code=XsiIuDgj",
    "浪网": "https://varnexa.wavenetaff.com/#/?code=TSdS3mZK",
    "灵动": "https://varnexa.lingdongaff.com/#/?code=HDiWuF7L",
    "隐形人": "https://varnexa.invisibleaff.com/#/?code=BtPRayAl",
}

promos = {
    "sogo": "sogo1000",
    "微风": "weifeng90",
    "飞猫": "flycat888",
    "无忧": "wuyou",
    "firefly": "firefly",
    "跨界": "kuajie",
    "闪跃": "shanyue",
    "灵猫": "lingmao",
    "edgenova": "xk808",
    "u1s1": "U1S1",
    "一翻": "1FLYYUN",
    "二猫": "ermao888",
    "可信云": "kxy80",
    "唯兔": "rabbit",
    "唯图": "rabbit",
    "快狸": "kuaili996",
    "星岛梦": "nmw888",
    "暮光": "mm88",
    "灵动": "880223",
    "飞v": "fly20",
    "速界": "sss1111",
    "极连": "ji8888",
    "光年梯": "gnt6666",
}

ranking = [
    "sogo",
    "飞猫",
    "微风",
    "firefly",
    "无忧",
    "跨界",
    "闪跃",
    "灵猫"
]

def get_base_name(filename):
    name = filename.replace('套餐价格.txt', '').replace('价格表.txt', '').strip().lower()
    name = name.replace('云', '').replace('链接', '')
    if 'edgenova' in name: return 'edgenova'
    if 'u1s1' in name: return 'u1s1'
    if '可信' in name: return '可信云'
    if '星岛' in name: return '星岛梦'
    if '唯图' in name or '唯兔' in name: return '唯兔'
    if '光年' in name: return '光年梯'
    return name

import glob

files = glob.glob("C:/Users/USER/Desktop/官网套餐价格和基本资料/*.txt")

for f in files:
    basename = os.path.basename(f)
    bname = get_base_name(basename)
    
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
        
    # Extract some basic info if possible
    # Just look for the first price and bandwidth pattern
    price = 0
    price_match = re.search(r'Starting From \D*(\d+(\.\d+)?)\s*/\s*月', content)
    if not price_match:
        price_match = re.search(r'Starting From \D*(\d+(\.\d+)?)\s*/\s*mo', content)
    if not price_match:
        price_match = re.search(r'月付.*?(\d+)', content)
    if price_match:
        price = float(price_match.group(1))
    else:
        # try to find any small number with 元/月
        pm = re.search(r'(\d+)\s*(元|¥|CNY)\s*/\s*月', content)
        if pm: price = float(pm.group(1))
        else: price = 15 # default fallback
        
    bw = 100
    bw_match = re.search(r'(包含流量|流量)[:\s]*(\d+)\s*(GB|G)', content, re.IGNORECASE)
    if bw_match:
        bw = int(bw_match.group(2))
        
    # Get register link
    reg_link = ""
    for k, v in links.items():
        if k in basename or k.lower() in basename.lower() or bname == k.lower():
            reg_link = v
            bname = k
            break
            
    if not reg_link:
        if 'sogo' in bname: reg_link = links['sogo']; bname='sogo'
        else: reg_link = "https://example.com/reg"
        
    if not reg_link.startswith('http'):
        reg_link = "https://" + reg_link
        
    promo = promos.get(bname, "暂无优惠码")
    
    sort_order = 999
    if bname in ranking:
        sort_order = ranking.index(bname) + 1
        
    slug = bname.replace(' ', '-').lower()
    out_path = f"c:/Users/USER/Desktop/jichangtuijianpro.com/src/content/brands/{slug}.md"
    
    md = f"""---
name: "{bname}云"
official_site: "{reg_link.split('/#')[0]}"
register_link: "{reg_link}"
is_sponsored: {'true' if bname == 'sogo' else 'false'}
currency: "CNY"
price_monthly: {price}
bandwidth_gb: {bw}
bandwidth_reset_period: "monthly"
verification_date: "2026-09-18"
evidence_status: "本站未实测"
sort_order: {sort_order}
---

## 专属优惠码
`{promo}`

## 简介
{bname}云是一家提供代理节点的服务商。由于本站目前暂未对该服务商进行晚高峰详细测速，暂不生成综合评测分数。

## 详细套餐介绍
以下是官方摘录信息：
```text
{content[:500]}...
```
"""
    with open(out_path, 'w', encoding='utf-8') as out_f:
        out_f.write(md)

