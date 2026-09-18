import os
import re
import json

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

ranking = ["sogo", "飞猫", "微风", "firefly", "无忧", "跨界", "闪跃", "灵猫"]

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

table_rows = []
all_urls_to_check = set()

for f in files:
    basename = os.path.basename(f)
    bname = get_base_name(basename)
    
    with open(f, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
        
    # Extract Packages
    # We look for blocks separated by "Starting From", or just grab all lines
    lines = [l.strip() for l in content.split('\n') if l.strip()]
    
    packages_desc = ""
    monthly_price = None
    yearly_price = None
    bw_gb = None
    bw_period = "monthly"
    multiplier_desc = []
    device_limit = None
    
    # Simple extraction
    for i, line in enumerate(lines):
        if "Starting From" in line or "月付" in line or "¥" in line or "元/月" in line:
            pm = re.search(r'(\d+(\.\d+)?)\s*(/月|元|¥|/mo)', line, re.IGNORECASE)
            if pm and not monthly_price:
                monthly_price = float(pm.group(1))
            pm_year = re.search(r'(\d+(\.\d+)?)\s*(/年|元/年|¥/年)', line, re.IGNORECASE)
            if pm_year and not yearly_price:
                yearly_price = float(pm_year.group(1))
                
        if ("不限时" in line or "一次性" in line or "无限制" in line) and "流量" in line:
            if not monthly_price: # if it's an unlimited time package
                bw_period = "none"
                
        bw_match = re.search(r'(包含流量|流量|可用流量)[:\s]*(\d+(\.\d+)?)\s*(GB|G|TB|T)', line, re.IGNORECASE)
        if bw_match and not bw_gb:
            val = float(bw_match.group(2))
            unit = bw_match.group(4).upper()
            if 'T' in unit: val *= 1024
            bw_gb = int(val)
            
        dev_match = re.search(r'设备(限制)?[:\s]*(\d+|不限)', line)
        if dev_match and not device_limit:
            device_limit = dev_match.group(2)
            
        if "倍率" in line:
            multiplier_desc.append(line)

    if not monthly_price and yearly_price:
        pass # Only yearly available
    
    if not monthly_price and not yearly_price:
        monthly_price = 999 # Need manual check
        
    if not bw_gb: bw_gb = 999
    
    # Get links
    reg_link = ""
    for k, v in links.items():
        if k in basename or k.lower() in basename.lower() or bname == k.lower():
            reg_link = v
            bname = k
            break
            
    if not reg_link:
        if 'sogo' in bname: reg_link = links['sogo']; bname='sogo'
        else: reg_link = "https://example.com/reg"
        
    if not reg_link.startswith('http'): reg_link = "https://" + reg_link
    off_site = reg_link.split('/#')[0]
    
    all_urls_to_check.add(reg_link)
    all_urls_to_check.add(off_site)
        
    promo = promos.get(bname, "资料未提供优惠码")
    
    sort_order = 999
    if bname in ranking:
        sort_order = ranking.index(bname) + 1
        
    slug = bname.replace(' ', '-').lower()
    
    # Find missing fields
    missing = []
    if monthly_price == 999 and not yearly_price: missing.append("价格")
    if bw_gb == 999: missing.append("流量")
    if not device_limit: missing.append("设备限制")
    if not multiplier_desc: missing.append("倍率说明")
    
    table_rows.append(f"| {bname}云 | {basename} | {off_site} | {reg_link} | {'/'.join(multiplier_desc) if multiplier_desc else '未说明'} | {monthly_price if monthly_price else (str(yearly_price)+'/年')} | {bw_period} | {bw_gb}G | {device_limit if device_limit else '未说明'} | {promo} | {', '.join(missing) if missing else '无'} |")

    # Write Markdown
    md_content = f"""---
name: "{bname}云"
official_site: "{off_site}"
register_link: "{reg_link}"
is_sponsored: {'true' if bname == 'sogo' else 'false'}
currency: "CNY"
{'price_monthly: ' + str(monthly_price) if monthly_price and monthly_price != 999 else ''}
{'price_yearly: ' + str(yearly_price) if yearly_price else ''}
bandwidth_gb: {bw_gb}
bandwidth_reset_period: "{bw_period}"
verification_date: "2026-09-18"
evidence_status: "本站未实测"
sort_order: {sort_order}
---

> **声明：** 本页面包含的所有关于速度、解锁能力及稳定性的描述，均摘录自 **“官方宣传”**，本站**尚未对该品牌进行独立实测**，请用户自行甄别风险。

## 注册与优惠
- **专属优惠码**：`{promo}`
- **注册链接**：[前往官网]({reg_link}) (包含推广参数)

## 官方套餐与计费
本站根据官方资料提取的部分套餐信息如下：

```text
{content[:800]}...
```

## 未明确资料 (数据缺口)
{'- 暂未发现明确的倍率说明' if not multiplier_desc else '- 倍率说明: ' + ' / '.join(multiplier_desc)}
{'- 暂未发现明确的设备数量限制' if not device_limit else '- 设备限制: ' + str(device_limit)}
"""
    with open(f"c:/Users/USER/Desktop/jichangtuijianpro.com/src/content/brands/{slug}.md", 'w', encoding='utf-8') as out_f:
        out_f.write(md_content)

# Write Verification Table Artifact
table_md = """# 25 个品牌录入核对表

| 品牌名称 | 来源文件 | 官网 | 注册链接 | 倍率 | 价格 | 计费周期 | 流量 | 设备限制 | 优惠条件 | 缺口 |
|---|---|---|---|---|---|---|---|---|---|---|
"""
table_md += "\n".join(table_rows)
with open("c:/Users/USER/Desktop/jichangtuijianpro.com/VERIFICATION_TABLE.md", 'w', encoding='utf-8') as f:
    f.write(table_md)

# Prepare URL check script output
with open("c:/Users/USER/Desktop/jichangtuijianpro.com/urls_to_check.json", 'w', encoding='utf-8') as f:
    json.dump(list(all_urls_to_check), f)
