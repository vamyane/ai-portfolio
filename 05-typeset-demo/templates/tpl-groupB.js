/* ============================================================
 * 公众号排版器 V2 - 模板组 B
 * ============================================================ */

/* ---------- 5. 墨韵中国风 ---------- */
registerTemplate('china', {
  name: '墨韵中国风',
  desc: '宣纸底 + 红印章，古典雅致',
  category: 'chinese',
  tokens: { accent: '#a03a2a', text: '#3d3a36', bg: '#f7f2e7' },
  decorators: {
    h1: { style: 'lines', lineW: '40px', lineH: '2px', color: '{accent}', fontSize: '23px', align: 'center' },
    h2: { style: 'tag', width: '4px', color: '{accent}', fontSize: '18px' },
    h3: { style: 'dot', color: '{accent}' },
    p: { lineHeight: '2.1', letterSpacing: '1px', color: '#4a443c', indent: true },
    quote: { style: 'solid', bg: '{accentDark}', color: '#f5efe0', radius: '4px', quoteMark: '"', quoteMarkColor: '#d9b48f' },
    strong: { color: '{accent}' },
    list: { icon: '◆', iconColor: '{accent}', iconSize: '11px' },
    divider: { style: 'diamond', color: '#b98d6b', letterSpacing: '10px' },
    card: { style: 'soft', bg: '#efe6d2', border: '1px solid #e2d4b8', radius: '6px', color: '#4a443c' },
    highlight: { bg: '#f0e0c0', color: '#7a5c10' },
    headerDeco: { text: '印', style: 'seal' }
  }
});

/* ---------- 6. 复古报纸 ---------- */
registerTemplate('news', {
  name: '复古报纸',
  desc: '米黄纸感 + 衬线标题，老派报刊风',
  category: 'retro',
  tokens: { accent: '#3d3d3d', text: '#2b2b2b', bg: '#f5efdd' },
  decorators: {
    h1: { style: 'double', lineColor: '{accent}', color: '#1c1c1c', fontSize: '25px', align: 'center', margin: '26px 0 18px' },
    h2: { style: 'lines', lineW: '24px', lineH: '1px', lineColor: '#8a8a8a', color: '#1c1c1c', fontSize: '19px' },
    h3: { style: 'square', color: '{accent}' },
    p: { lineHeight: '1.95', color: '#2b2b2b', firstLetter: true, firstLetterSize: '34px', firstLetterColor: '{accent}' },
    quote: { style: 'bookend', color: '#8a8a8a', color2: '#555', fontSize: '14px' },
    strong: { color: '#1c1c1c', underline: true, underlineColor: '{accent}', underlineW: '1px' },
    list: { icon: '❖', iconColor: '#555', iconSize: '12px' },
    divider: { style: 'double', color: '#8a8a8a' },
    card: { style: 'default', bg: 'transparent', border: '1px solid #8a8a8a', radius: '0', color: '#2b2b2b' },
    highlight: { bg: '#e8dcc0', color: '#4a3b20' },
    headerDeco: { text: '—— 特 刊 ——', style: 'center', color: '{accent}', letterSpacing: '8px', doubleBorder: true }
  }
});

/* ---------- 7. 清新薄荷 ---------- */
registerTemplate('mint', {
  name: '清新薄荷',
  desc: '浅绿渐变 + 气泡感，清爽治愈',
  category: 'colorful',
  tokens: { accent: '#0d9488', text: '#334155', bg: '#ffffff' },
  decorators: {
    h1: { style: 'gradient', fontSize: '20px', padding: '10px 22px', radius: '24px', align: 'center' },
    h2: { style: 'bgsoft', bg: '{accentSoft}', color: '{accentDeep}', fontSize: '16px', padding: '6px 16px', radius: '16px' },
    h3: { style: 'dot', color: '{accent}' },
    p: { lineHeight: '2' },
    quote: { style: 'bubble', bg: '{accentSoft}', border: '{accentAlpha}', color: '#2c3e50' },
    strong: { color: '{accent}' },
    list: { icon: '○', iconColor: '{accent}', iconSize: '13px' },
    divider: { style: 'dashed', color: '{accentAlpha}', margin: '24px 0' },
    card: { style: 'soft', bg: '{accentSofter}', color: '#2c3e50', radius: '14px' },
    img: { style: 'polaroid' },
    highlight: { bg: '{accentSoft}', color: '{accentDeep}' },
    headerDeco: { text: '✿ 清新物语 ✿', style: 'center', color: '{accent}', letterSpacing: '4px' }
  }
});

/* ---------- 8. 奶油甜心 ---------- */
registerTemplate('cream', {
  name: '奶油甜心',
  desc: '粉嫩奶油色，软萌可爱风',
  category: 'cute',
  tokens: { accent: '#f472b6', text: '#5c3a4a', bg: '#fffbfd' },
  decorators: {
    h1: { style: 'bar', bg: '{accent}', color: '#fff', fontSize: '20px', padding: '10px 22px', radius: '18px', align: 'center' },
    h2: { style: 'pill', bg: '{accent}', color: '#fff', fontSize: '15px', padding: '5px 16px' },
    h3: { style: 'star', color: '{accent}' },
    p: { lineHeight: '2', letterSpacing: '0.5px', color: '#5c3a4a' },
    quote: { style: 'card', border: '{accent}', bg: '#fff', radius: '14px', quoteMark: '"', quoteMarkColor: '{accent}', quoteMarkSize: '28px' },
    strong: { color: '{accent}' },
    list: { icon: '♥', iconColor: '{accent}', iconSize: '12px' },
    divider: { style: 'heart', color: '{accent}', letterSpacing: '8px' },
    card: { style: 'soft', bg: '{accentSofter}', color: '#5c3a4a', radius: '14px' },
    img: { style: 'polaroid' },
    highlight: { bg: '{accentSoft}', color: '{accentDeep}' },
    headerDeco: { text: '♡ 甜 蜜 时 光 ♡', style: 'center', color: '{accent}', letterSpacing: '5px' }
  }
});
