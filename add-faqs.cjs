const fs = require('fs');
let s = fs.readFileSync('src/pages/review/sogocloud.astro', 'utf8');

const extraFaqs = `        <div style="margin-bottom: 1.5rem;">
          <strong>Q: SOGOCloud 节点倍率如何？</strong>
          <p style="margin-top: 0.5rem;">A: 根据官方资料显示，全节点均为 x1 倍率，没有高倍率套路。</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <strong>Q: 晚高峰会限速或降速吗？</strong>
          <p style="margin-top: 0.5rem;">A: 官方页面称 SOGOCloud 晚高峰不降速，保障稳定的网络体验。</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <strong>Q: 是否支持流媒体解锁？</strong>
          <p style="margin-top: 0.5rem;">A: 官方说明支持解锁 Netflix、Disney+、ChatGPT、TikTok 等多种流媒体和服务。</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <strong>Q: 允许多少设备同时在线？</strong>
          <p style="margin-top: 0.5rem;">A: 根据官方套餐描述，SOGOCloud 支持多设备不限量同时在线。</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <strong>Q: 是否提供原生 IP？</strong>
          <p style="margin-top: 0.5rem;">A: 官方资料标注提供原生 IP 支持，有利于某些对 IP 纯净度要求高的业务。</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <strong>Q: 购买前需要注意什么？</strong>
          <p style="margin-top: 0.5rem;">A: 任何机场都有不可抗力风险。本站未进行独立长期性能验证，建议您先购买月付套餐，确认在您当地网络环境稳定后再做长期打算。</p>
        </div>
`;

s = s.replace('</div>\n    </section>', '</div>\n' + extraFaqs + '    </section>');
fs.writeFileSync('src/pages/review/sogocloud.astro', s, 'utf8');
console.log('Added 6 FAQs');
