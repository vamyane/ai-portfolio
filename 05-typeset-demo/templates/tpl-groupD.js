/* ============================================================
 * 公众号排版器 V2 - 模板组 D
 * ============================================================ */

/* ---------- 13. 极简黑白 ---------- */
registerTemplate('mono', {
  name: '极简黑白',
  desc: '无彩色设计，纯粹的黑白构成',
  category: 'basic',
  tokens: { accent: '#1a1a1a', text: '#2b2b2b', bg: '#ffffff' },
  decorators: {
    h1: { style: 'double', lineColor: '#111', color: '#111', fontSize: '24px', align: 'center' },
    h2: { style: 'tag', width: '3px', color: '#333', fontSize: '18px' },
    h3: { style: 'bar', width: '14px', height: '2px', color: '#333' },
    p: { lineHeight: '2' },
    quote: { style: 'bookend', color: '#999', color2: '#555' },
    strong: { color: '#111', underline: true, underlineColor: '#111' },
    list: { icon: '—', iconColor: '#555', iconSize: '14px' },
    divider: { style: 'centertext', text: '·', textColor: '#aaa', color: '#ddd' },
    card: { style: 'double', border: '#333', border2: '#ccc', color: '#333', bg: 'transparent' },
    highlight: { bg: '#f0f0f0', color: '#111', bold: true },
    headerDeco: { text: '黑白 · 构成', style: 'center', color: '#333', letterSpacing: '6px' }
  }
});

/* ---------- 14. 活力橙 ---------- */
registerTemplate('energy', {
  name: '活力橙',
  desc: '明快橙调 + 动感波浪，阳光活力',
  category: 'colorful',
  tokens: { accent: '#f97316', text: '#4a3728', bg: '#ffffff' },
  decorators: {
    h1: { style: 'gradient', bg: 'linear-gradient(135deg,#f97316,#fb923c)', color: '#fff', fontSize: '21px', padding: '12px 24px', radius: '12px', align: 'center' },
    h2: { style: 'bgsoft', bg: '{accentSoft}', color: '{accentDeep}', fontSize: '17px', padding: '6px 16px', radius: '14px' },
    h3: { style: 'dot', color: '{accent}' },
    p: { lineHeight: '2' },
    quote: { style: 'paper', bg: '#fff7ed', border: '#fed7aa', accentBar: '{accent}', color: '#6b4a2e' },
    strong: { color: '{accent}' },
    list: { icon: '➤', iconColor: '{accent}' },
    divider: { style: 'wave', color: '{accent}', fontSize: '20px' },
    card: { style: 'leftbar', barColor: '{accent}', bg: '#fff7ed', color: '#4a3728', radius: '0 12px 12px 0' },
    highlight: { bg: '#ffedd5', color: '#c2410c', bold: true },
    headerDeco: { text: '☀ 活 力 一 天 ☀', style: 'center', color: '{accent}', letterSpacing: '5px' }
  }
});

/* ---------- 15. 海洋气泡 ---------- */
registerTemplate('ocean', {
  name: '海洋气泡',
  desc: '清爽蓝色 + 气泡引用，度假感',
  category: 'colorful',
  tokens: { accent: '#0ea5e9', text: '#334155', bg: '#ffffff' },
  decorators: {
    h1: { style: 'bar', bg: '{accent}', color: '#fff', fontSize: '20px', padding: '10px 24px', radius: '14px', align: 'center' },
    h2: { style: 'bgsoft', bg: '{accentSoft}', color: '{accentDeep}', fontSize: '16px', padding: '6px 16px', radius: '16px' },
    h3: { style: 'dot', color: '{accent}' },
    p: { lineHeight: '2' },
    quote: { style: 'bubble', bg: '{accentSofter}', border: '{accentAlpha}', color: '#2c3e50', quoteMark: '"', quoteMarkColor: '{accent}' },
    strong: { color: '{accent}' },
    list: { icon: '○', iconColor: '{accent}', iconSize: '13px' },
    divider: { style: 'wave', color: '{accent}', fontSize: '18px' },
    card: { style: 'soft', bg: '{accentSofter}', color: '#2c3e50', radius: '16px' },
    highlight: { bg: '{accentSoft}', color: '{accentDeep}' },
    headerDeco: { text: '○ 海 洋 之 声 ○', style: 'center', color: '{accent}', letterSpacing: '5px' }
  }
});

/* ---------- 16. 复古信笺 ---------- */
registerTemplate('letter', {
  name: '复古信笺',
  desc: '米色信纸 + 手写感，书信温度',
  category: 'retro',
  tokens: { accent: '#8b5e34', text: '#4a3b2a', bg: '#faf3e3' },
  decorators: {
    h1: { style: 'lines', lineW: '36px', lineH: '1px', color: '{accent}', fontSize: '22px' },
    h2: { style: 'underline', lineW: '2px', lineColor: '{accent}', color: '#4a3b2a' },
    h3: { style: 'dot', color: '{accent}' },
    p: { lineHeight: '2.1', letterSpacing: '0.5px' },
    quote: { style: 'paper', bg: '#fdf6e3', border: '#e8d9b8', accentBar: '{accent}', color: '#5a4a38' },
    strong: { color: '{accent}' },
    list: { icon: '✎', iconColor: '{accent}', iconSize: '13px' },
    divider: { style: 'flower', color: '{accent}', letterSpacing: '8px' },
    card: { style: 'dashed', border: '{accentAlpha}', bg: 'transparent', color: '#4a3b2a', radius: '8px' },
    img: { style: 'polaroid' },
    highlight: { bg: '#f2e5c8', color: '#6b4a2e' },
    headerDeco: { text: '致 · 你', style: 'center', color: '{accent}', letterSpacing: '10px' }
  }
});
