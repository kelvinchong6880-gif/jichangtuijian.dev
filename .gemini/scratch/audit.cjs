const fs = require('fs');
const path = require('path');

const rawDir = 'C:/Users/USER/Desktop/官网套餐价格和基本资料';
const dataDir = 'src/data/providers';
const distDir = 'dist/review';

const providersMap = {
  'sogocloud': { txt: 'sogo 云套餐价格.txt', name: 'SOGOCloud' },
  'weifeng': { txt: '微风价格.txt', name: '微风' },
  'flycat': { txt: '飞猫云套餐价格.txt', name: '飞猫云' },
  'firefly': { txt: 'firefly 套餐价格.txt', name: 'Firefly' },
  'wuyou': { txt: '无忧套餐价格.txt', name: '无忧链接' },
  'kuajieyun': { txt: '跨界云套餐价格.txt', name: '跨界云' },
  'lingmao': { txt: '灵猫套餐价格.txt', name: '灵猫' },
  'shanyue': { txt: '闪跃套餐价格.txt', name: '闪跃' }
};

function parseTxt(content) {
  let plans = [];
  let affUrl = '';
  const lines = content.split('\n').map(l => l.trim());
  
  let currentPlan = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('官网注册链接') || line.includes('http')) {
      const match = line.match(/https?:\/\/[^\s]+/);
      if (match) affUrl = match[0];
    }

    // A very basic heuristic for this specific data structure
    // Find lines like "xxx版" or "xxx餐" or similar headers
    if (line && !line.includes('：') && !line.includes(':') && !line.startsWith('-') && !line.includes('官网') && !line.includes('节点') && !line.includes('适用') && !line.includes('流量') && !line.includes('Starting From') && !line.includes('包含') && !line.includes('设备限制') && !line.includes('套餐亮点') && !line.includes('¥')) {
      if (['sogo 云套餐价格', '主推套餐', '精选方案', '微风', '无忧链接', '无忧节点', '无忧套餐', '飞猫云套餐价格', '跨界云套餐价格', '灵猫云套餐价格', '闪跃套餐价格', 'Firefly套餐价格', '基础版', '优选版'].includes(line)) {
        // Skip some known non-plan headers, wait, "基础版", "优选版" are plan names!
        if (!['基础版', '优选版', '强化版', '顶配版', 'SOGO基础餐不限时版'].includes(line)) continue;
      }
      
      // If we see a price nearby, it's a plan
      let hasPriceNearby = false;
      for (let j = 1; j <= 4; j++) {
        if (lines[i+j] && lines[i+j].includes('¥')) hasPriceNearby = true;
      }
      
      if (hasPriceNearby) {
        if (currentPlan) plans.push(currentPlan);
        currentPlan = { name: line, price: '', traffic: '', period: '', isOneTime: false, raw: [] };
      }
    }
    
    if (currentPlan) {
      currentPlan.raw.push(line);
      if (line.includes('¥') && !currentPlan.price) {
        currentPlan.price = line;
      }
      if ((line.includes('流量') || line.includes('GB') || line.includes('TB')) && !currentPlan.traffic) {
        if (!line.includes('政策') && !line.includes('重置') && !line.includes('政策：')) {
          currentPlan.traffic = line;
        }
      }
      if (line.includes('一次性') || line.includes('无限时长') || line.includes('不自动重置')) {
        currentPlan.isOneTime = true;
      }
    }
  }
  if (currentPlan) plans.push(currentPlan);
  
  return { plans, affUrl };
}

function audit() {
  let totalProviders = 0;
  let passCount = 0;
  let failCount = 0;
  let reviewCount = 0;
  
  let totalSource = 0;
  let totalData = 0;
  let totalDisplayed = 0;

  for (const [slug, info] of Object.entries(providersMap)) {
    totalProviders++;
    console.log(`\n==================================================`);
    console.log(`Provider: ${info.name}`);
    
    // 1. Read TXT
    const txtPath = path.join(rawDir, info.txt);
    let txtContent = '';
    try {
      txtContent = fs.readFileSync(txtPath, 'utf8');
    } catch(e) {
      console.log(`ERROR reading ${txtPath}`);
      continue;
    }
    const txtData = parseTxt(txtContent);
    console.log(`Source file: ${info.txt}`);
    console.log(`Source plans count: ${txtData.plans.length}`);
    totalSource += txtData.plans.length;
    
    txtData.plans.forEach(p => {
      console.log(`  - ${p.name} | ${p.price} | ${p.traffic} | OneTime: ${p.isOneTime}`);
    });

    // 2. Read Data Layer
    const jsonPath = path.join(dataDir, `${slug}.json`);
    let jsonData = null;
    try {
      jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch(e) {
      console.log(`ERROR reading ${jsonPath}`);
      continue;
    }
    
    console.log(`Data Layer plans count: ${jsonData.plans.length}`);
    totalData += jsonData.plans.length;
    
    let mismatch = false;
    let mismatchReasons = [];
    
    if (txtData.plans.length !== jsonData.plans.length) {
      mismatch = true;
      mismatchReasons.push(`Plans count mismatch: Source(${txtData.plans.length}) vs JSON(${jsonData.plans.length})`);
    }

    if (txtData.affUrl !== jsonData.affiliateUrl) {
      mismatch = true;
      mismatchReasons.push(`Affiliate URL mismatch: Source(${txtData.affUrl}) vs JSON(${jsonData.affiliateUrl})`);
    }
    
    // 3. Read HTML
    const htmlPath = path.join(distDir, slug, 'index.html');
    let htmlContent = '';
    try {
      htmlContent = fs.readFileSync(htmlPath, 'utf8');
    } catch(e) {
      console.log(`ERROR reading ${htmlPath}`);
    }
    
    // Quick count of plans in HTML by counting <tr> in the table. 
    // This is a rough heuristic.
    let htmlPlansCount = 0;
    if (htmlContent) {
      const tableMatch = htmlContent.match(/<table[\s\S]*?<\/table>/);
      if (tableMatch) {
         const rows = tableMatch[0].match(/<tr/g);
         htmlPlansCount = rows ? rows.length - 1 : 0; // -1 for header
      }
    }
    console.log(`Page displayed plans count: ${htmlPlansCount}`);
    totalDisplayed += htmlPlansCount;
    
    if (htmlPlansCount !== jsonData.plans.length) {
      mismatch = true;
      mismatchReasons.push(`HTML plans count mismatch: JSON(${jsonData.plans.length}) vs HTML(${htmlPlansCount})`);
    }
    
    if (mismatch) {
      console.log(`Status: FAIL`);
      failCount++;
      mismatchReasons.forEach(r => console.log(`  Reason: ${r}`));
    } else {
      console.log(`Status: PASS`);
      passCount++;
    }
  }
}

audit();
