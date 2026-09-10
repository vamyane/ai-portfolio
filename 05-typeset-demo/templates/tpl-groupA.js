/* ============================================================
 * 公众号排版器 V2 - 模板组 A
 * ============================================================ */

/* ---------- 1. 极简商务 ---------- */
registerTemplate('minimal', {
  name: '极简商务',
  desc: '干净专业，大留白，适合职场干货',
  category: 'business',
  tokens: { accent: '#2563eb', text: '#374151', bg: '#ffffff' },
  decorators: {
    h1: { style: 'leftblock', blockW: '6px', blockH: '22px' },
    h2: { style: 'leftblock', blockW: '5px', blockH: '16px' },
    h3: { style: 'bar', width: '4px', height: '14px' },
    p: { lineHeight: '2' },
    quote: { style: 'default', width: '4px' },
    strong: { color: '{accent}', underline: true, underlineW: '2px', underlineColor: '{accent}' },
    list: { icon: '•', iconColor: '{accent}', iconSize: '15px' },
    divider: { style: 'line', color: '#e5e7eb' },
    card: { style: 'soft', bg: '#f8fafc', border: '1px solid #eef2f7', radius: '10px' },
    highlight: { bg: '{accentSoft}', color: '{accentDeep}', bold: true }
  }
});

/* ---------- 2. 现代杂志 ---------- */
registerTemplate('magazine', {
  name: '现代杂志',
  desc: '时尚编辑感，大色块强视觉',
  category: 'fashion',
  tokens: { accent: '#e11d48', text: '#1f2937', bg: '#ffffff' },
  decorators: {
    h1: { style: 'bar', bg: '{accent}', color: '#fff', fontSize: '21px', padding: '12px 24px', radius: '10px', letterSpacing: '2px' },
    h2: { style: 'gradient', fontSize: '17px', padding: '8px 18px', radius: '8px' },
    h3: { style: 'square', color: '{accent}' },
    p: { lineHeight: '1.95' },
    quote: { style: 'bigmark', width: '3px', quoteMark: '"', quoteMarkSize: '36px' },
    strong: { color: '{accent}' },
    list: { icon: '▸', iconColor: '{accent}' },
    divider: { style: 'gradient', height: '4px', radius: '2px' },
    card: { style: 'topbar', barBg: '{accent}', bg: '#fff' },
    headerDeco: { text: 'MAGAZINE · 杂志专栏', style: 'center' }
  }
});

/* ---------- 3. 文艺手账 ---------- */
registerTemplate('journal', {
  name: '文艺手账',
  desc: '清新手写感，像精致的手账本',
  category: 'warm',
  tokens: { accent: '#f59e0b', text: '#4b3f2e', bg: '#fffdf7' },
  decorators: {
    h1: { style: 'bgsoft', bg: '{accentSoft}', color: '{accentDeep}', fontSize: '19px', padding: '8px 20px', radius: '22px' },
    h2: { style: 'underline', lineW: '3px', lineColor: '{accent}' },
    h3: { style: 'star', color: '{accent}' },
    p: { lineHeight: '2', letterSpacing: '1px' },
    quote: { style: 'paper', bg: '#fffbe6', border: '#f5e9b8', accentBar: '{accent}', color: '#5c5a3a' },
    strong: { color: '{accentDeep}', bg: '{accentSoft}', padding: '2px 6px', radius: '4px' },
    list: { icon: '✦', iconColor: '{accent}' },
    divider: { style: 'flower', color: '{accent}', letterSpacing: '8px' },
    card: { style: 'dashed', border: '{accent}', bg: '#fffdf7', radius: '12px' },
    img: { style: 'polaroid' },
    highlight: { bg: '#ffe9a8', color: '#7a5c10' }
  }
});

/* ---------- 4. 赛博霓虹 ---------- */
registerTemplate('neon', {
  name: '赛博霓虹',
  desc: '深色底 + 霓虹发光，赛博朋克未来感',
  category: 'tech',
  tokens: { accent: '#00f5ff', text: '#c8e8ee', bg: '#0a0e1e' },
  decorators: {
    h1: { style: 'double', lineColor: '{accent}', color: '{accent}', fontSize: '22px', align: 'center' },
    h2: { style: 'tag', width: '4px', color: '{accent}', fontSize: '18px' },
    h3: { style: 'bar', color: '{accent}', width: '4px', height: '12px' },
    p: { color: '#b8d8e0', fontSize: '14px' },
    quote: { style: 'solid', bg: '{accentDeep}', color: '{accent}', radius: '6px' },
    strong: { color: '#ff2d95' },
    list: { icon: '▶', iconColor: '{accent}' },
    divider: { style: 'line', color: '{accentAlpha}', margin: '26px 0' },
    card: { style: 'double', border: '{accentAlpha}', border2: 'rgba(0,245,255,0.06)', color: '#b8d8e0', bg: 'transparent' },
    highlight: { bg: 'rgba(255,45,149,0.25)', color: '#ff9ec7', bold: true },
    headerDeco: { text: '◤ S Y S T E M ◥', style: 'center', color: '#ff2d95', letterSpacing: '6px' }
  }
});
