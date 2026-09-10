/* ============================================================
 * 公众号排版器 V2 - 模板组 C
 * ============================================================ */

/* ---------- 9. 暗金奢华 ---------- */
registerTemplate('gold', {
  name: '暗金奢华',
  desc: '深色底 + 金色点缀，高级仪式感',
  category: 'elegant',
  tokens: { accent: '#c9a227', text: '#e8e0cc', bg: '#1a1814' },
  decorators: {
    h1: { style: 'ribbon', bg: 'linear-gradient(90deg,#8a6d1f,#c9a227)', color: '#fff', fontSize: '21px', padding: '12px 28px', letterSpacing: '4px', align: 'center' },
    h2: { style: 'lines', lineW: '30px', lineH: '1px', lineColor: '{accent}', color: '{accent}', fontSize: '18px' },
    h3: { style: 'dot', color: '{accent}' },
    p: { lineHeight: '2', color: '#d8d0bc', letterSpacing: '0.5px' },
    quote: { style: 'gradient', bg: 'linear-gradient(135deg,#2a2418,#3d3320)', color: '{accent}', radius: '6px', quoteMark: '"', quoteMarkColor: '{accent}' },
    strong: { color: '{accent}' },
    list: { icon: '◆', iconColor: '{accent}', iconSize: '10px' },
    divider: { style: 'gradient', height: '2px', grad1: '#8a6d1f', grad2: '#c9a227', margin: '26px 0' },
    card: { style: 'double', border: '#8a6d1f', border2: 'rgba(201,162,39,0.15)', color: '#d8d0bc', bg: 'transparent', radius: '4px' },
    highlight: { bg: 'rgba(201,162,39,0.22)', color: '{accent}', bold: true },
    headerDeco: { text: '✦ 至 臻 ✦', style: 'center', color: '{accent}', letterSpacing: '10px' }
  }
});

/* ---------- 10. 学术论文 ---------- */
registerTemplate('academic', {
  name: '学术论文',
  desc: '理性克制的学术风，编号结构清晰',
  category: 'business',
  tokens: { accent: '#1e56a0', text: '#333333', bg: '#ffffff' },
  decorators: {
    h1: { style: 'num', num: '一', numBg: '{accent}', numColor: '#fff', numSize: '34px', numFont: '20px', fontSize: '21px' },
    h2: { style: 'num', num: '1', numSize: '26px', numFont: '13px', numRadius: '50%', fontSize: '18px' },
    h3: { style: 'square', color: '{accent}' },
    p: { lineHeight: '2', indent: true, fontSize: '14.5px' },
    quote: { style: 'bigmark', width: '3px', quoteMark: '"', quoteMarkColor: '{accent}', quoteMarkSize: '30px', color2: '#555' },
    strong: { color: '{accent}' },
    list: { style: 'badge', badgeBg: '{accent}', badgeColor: '#fff', badgeSize: '22px', badgeFont: '11px' },
    divider: { style: 'centertext', text: '○', textColor: '{accent}', color: '#ddd' },
    card: { style: 'default', bg: '#f8fafc', border: '1px solid #e5e9f0', radius: '6px', color: '#333' },
    highlight: { bg: '#eef4ff', color: '#1e56a0' }
  }
});

/* ---------- 11. 星空夜话 ---------- */
registerTemplate('starry', {
  name: '星空夜话',
  desc: '深蓝夜空 + 星光点缀，浪漫深邃',
  category: 'elegant',
  tokens: { accent: '#818cf8', text: '#d4dcf0', bg: '#0f172a' },
  decorators: {
    h1: { style: 'gradient', bg: 'linear-gradient(135deg,#6366f1,#a78bfa)', color: '#fff', fontSize: '21px', padding: '12px 24px', radius: '12px', align: 'center' },
    h2: { style: 'tag', width: '4px', color: '{accent}', fontSize: '17px' },
    h3: { style: 'star', color: '{accent}' },
    p: { lineHeight: '2', color: '#c3cbe4' },
    quote: { style: 'card', border: '{accent}', bg: 'rgba(99,102,241,0.08)', radius: '12px', color: '#c3cbe4', quoteMark: '"', quoteMarkColor: '{accent}' },
    strong: { color: '{accent}' },
    list: { icon: '✦', iconColor: '{accent}' },
    divider: { style: 'star', color: '{accent}', letterSpacing: '10px' },
    card: { style: 'leftbar', barColor: '{accent}', bg: 'rgba(99,102,241,0.06)', color: '#c3cbe4', radius: '0 12px 12px 0' },
    highlight: { bg: 'rgba(129,140,248,0.25)', color: '#c7d2fe', bold: true },
    headerDeco: { text: '✦ 星 夜 ✦', style: 'center', color: '{accent}', letterSpacing: '8px' }
  }
});

/* ---------- 12. 森系自然 ---------- */
registerTemplate('forest', {
  name: '森系自然',
  desc: '原木绿调 + 树叶装饰，自然疗愈',
  category: 'chinese',
  tokens: { accent: '#3f7d4e', text: '#3c423c', bg: '#f7faf5' },
  decorators: {
    h1: { style: 'leftblock', blockW: '6px', blockH: '24px', blockBg: '{accent}', fontSize: '21px' },
    h2: { style: 'underline', lineW: '3px', lineColor: '{accent}', fontSize: '17px' },
    h3: { style: 'dot', color: '{accent}' },
    p: { lineHeight: '2', letterSpacing: '0.5px' },
    quote: { style: 'paper', bg: '#f0f7ec', border: '#d8e8d0', accentBar: '{accent}', color: '#3c4a3c' },
    strong: { color: '{accent}' },
    list: { icon: '❧', iconColor: '{accent}', iconSize: '14px' },
    divider: { style: 'leaf', color: '{accent}', letterSpacing: '10px' },
    card: { style: 'soft', bg: '#eef5ea', color: '#3c423c', radius: '12px' },
    img: { style: 'polaroid' },
    highlight: { bg: '#e2f0dc', color: '#2f5d3a' },
    headerDeco: { text: '❧ 自 然 之 声 ❧', style: 'center', color: '{accent}', letterSpacing: '6px' }
  }
});
