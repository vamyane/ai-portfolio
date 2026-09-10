/* ============================================================
 * 公众号排版器 V2 - 模板组 E
 * ============================================================ */

/* ---------- 17. 极客终端 ---------- */
registerTemplate('terminal', {
  name: '极客终端',
  desc: '黑底绿字等宽字体，程序员专属',
  category: 'tech',
  tokens: { accent: '#4ade80', text: '#a7e8c0', bg: '#0d1117' },
  decorators: {
    h1: { style: 'num', num: '>_', numBg: 'transparent', numColor: '{accent}', numSize: 'auto', numFont: '20px', numRadius: '0', color: '{accent}', fontSize: '22px', fontFamily: 'monospace', align: 'left' },
    h2: { style: 'tag', width: '4px', color: '{accent}', fontSize: '17px', fontFamily: 'monospace' },
    h3: { style: 'bar', color: '{accent}', width: '12px', height: '2px' },
    p: { fontFamily: 'monospace', color: '#b8e6c8', fontSize: '14px', lineHeight: '2' },
    quote: { style: 'solid', bg: 'rgba(74,222,128,0.08)', color: '{accent}', radius: '4px', quoteMark: '$ ', quoteMarkColor: '{accent}', quoteMarkSize: '14px' },
    strong: { color: '{accent}' },
    list: { icon: '▸', iconColor: '{accent}' },
    divider: { style: 'dashed', color: 'rgba(74,222,128,0.3)', margin: '26px 0' },
    card: { style: 'double', border: 'rgba(74,222,128,0.3)', border2: 'rgba(74,222,128,0.08)', color: '#b8e6c8', bg: 'transparent', radius: '4px' },
    highlight: { bg: 'rgba(74,222,128,0.15)', color: '{accent}', bold: true },
    headerDeco: { text: '> system@wechat:~$', style: 'left', color: '{accent}', fontSize: '13px', letterSpacing: '0px', fontFamily: 'monospace' }
  }
});

/* ---------- 18. 暖调咖啡 ---------- */
registerTemplate('coffee', {
  name: '暖调咖啡',
  desc: '焦糖棕调 + 色块标题，咖啡馆氛围',
  category: 'warm',
  tokens: { accent: '#92400e', text: '#4a3728', bg: '#fdf8f2' },
  decorators: {
    h1: { style: 'bar', bg: '{accent}', color: '#fff', fontSize: '20px', padding: '10px 22px', radius: '8px', align: 'center' },
    h2: { style: 'leftblock', blockW: '5px', blockH: '16px', fontSize: '17px' },
    h3: { style: 'dot', color: '{accent}' },
    p: { lineHeight: '2' },
    quote: { style: 'paper', bg: '#f7ecdd', border: '#e8d5ba', accentBar: '{accent}', color: '#5a4a38' },
    strong: { color: '{accent}' },
    list: { icon: '☕', iconColor: '{accent}', iconSize: '12px' },
    divider: { style: 'wave', color: '#d6b28c', fontSize: '18px' },
    card: { style: 'topbar', barBg: '{accent}', bg: '#fff', color: '#4a3728', radius: '10px' },
    highlight: { bg: '#f5e3cc', color: '#7c4a12', bold: true },
    headerDeco: { text: '☕ 咖 啡 时 光 ☕', style: 'center', color: '{accent}', letterSpacing: '5px' }
  }
});

/* ---------- 19. 梦幻紫罗 ---------- */
registerTemplate('purple', {
  name: '梦幻紫罗',
  desc: '紫色渐变 + 柔和圆角，梦幻浪漫',
  category: 'elegant',
  tokens: { accent: '#8b5cf6', text: '#3f3a52', bg: '#ffffff' },
  decorators: {
    h1: { style: 'gradient', bg: 'linear-gradient(135deg,#8b5cf6,#d946ef)', color: '#fff', fontSize: '21px', padding: '12px 26px', radius: '16px', align: 'center' },
    h2: { style: 'bgsoft', bg: '{accentSoft}', color: '{accentDeep}', fontSize: '16px', padding: '6px 16px', radius: '16px' },
    h3: { style: 'star', color: '{accent}' },
    p: { lineHeight: '2', letterSpacing: '0.5px' },
    quote: { style: 'gradient', bg: 'linear-gradient(135deg,#f5f3ff,#fdf4ff)', color: '#5b4a8a', radius: '14px', quoteMark: '"', quoteMarkColor: '{accent}' },
    strong: { color: '{accent}' },
    list: { icon: '✦', iconColor: '{accent}' },
    divider: { style: 'gradient', height: '3px', grad1: '#8b5cf6', grad2: '#d946ef', radius: '2px' },
    card: { style: 'soft', bg: '{accentSofter}', color: '#3f3a52', radius: '16px' },
    img: { style: 'polaroid' },
    highlight: { bg: '{accentSoft}', color: '{accentDeep}', bold: true },
    headerDeco: { text: '✦ 紫 罗 之 梦 ✦', style: 'center', color: '{accent}', letterSpacing: '6px' }
  }
});

/* ---------- 20. 简约蓝 ---------- */
registerTemplate('steel', {
  name: '简约蓝',
  desc: '冷静克制的钢铁蓝，专业理性',
  category: 'business',
  tokens: { accent: '#0f62fe', text: '#333a45', bg: '#ffffff' },
  decorators: {
    h1: { style: 'num', num: '01', numBg: '{accent}', numColor: '#fff', numSize: '38px', numFont: '17px', fontSize: '21px' },
    h2: { style: 'underline', lineW: '2px', lineColor: '{accent}', fontSize: '17px' },
    h3: { style: 'square', color: '{accent}' },
    p: { lineHeight: '2' },
    quote: { style: 'bigmark', width: '3px', quoteMark: '"', quoteMarkColor: '{accent}', quoteMarkSize: '32px' },
    strong: { color: '{accent}' },
    list: { style: 'circle', badgeBg: '{accent}', badgeColor: '#fff', badgeSize: '22px', badgeFont: '11px' },
    divider: { style: 'gradient', height: '2px', grad1: '#0f62fe', grad2: '#42a5f5', radius: '1px' },
    card: { style: 'topbar', barBg: '{accent}', bg: '#fff', radius: '10px' },
    highlight: { bg: '{accentSoft}', color: '{accentDeep}' },
    headerDeco: { text: 'S T E E L · 简约蓝', style: 'center', color: '{accent}', letterSpacing: '4px' }
  }
});
