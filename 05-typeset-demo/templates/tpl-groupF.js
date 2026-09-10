/* ============================================================
 * 公众号排版器 V2 - 模板组 F（高差异化新模板）
 * 像素风 / 报纸头版 / 标签贴纸 / 极简黑金 / 手绘涂鸦 / 证件卡片
 * ============================================================ */

/* ---------- 21. 像素游戏 ---------- */
registerTemplate('pixel', {
  name: '像素游戏',
  desc: '8bit 复古像素风，游戏少年专属',
  category: 'tech',
  keywords: ['game', 'pixel', 'retro', 'tech'],
  tokens: { accent: '#2d8cf0', accent2: '#67c23a', text: '#1a1a2e', bg: '#f8f9fb' },
  decorators: {
    h1: { style: 'pixel', bg: '#2d8cf0', shadow: '#1a3a6b', fontSize: '20px', padding: '10px 18px' },
    h2: { style: 'pixel', bg: '#67c23a', shadow: '#2d5a1e', fontSize: '16px', padding: '8px 14px' },
    h3: { style: 'bar', width: '4px', height: '14px', bg: '#2d8cf0' },
    p: { lineHeight: '1.9', fontSize: '14px' },
    quote: { style: 'pixelbox', border: '3px solid #2d8cf0', bg: '#eaf2ff' },
    strong: { color: '#2d8cf0', bold: true },
    list: { icon: '▶', iconColor: '#67c23a' },
    divider: { style: 'pixel', color: '#2d8cf0' },
    card: { style: 'pixelbox', border: '3px solid #67c23a', bg: '#f0f9eb' },
    highlight: { bg: '#d9f0ff', color: '#1a3a6b', bold: true }
  }
});

/* ---------- 22. 报纸头版 ---------- */
registerTemplate('newspaper', {
  name: '报纸头版',
  desc: '老式报纸头版风，庄重有质感',
  category: 'retro',
  keywords: ['news', 'paper', 'retro', 'classic'],
  tokens: { accent: '#1a1a1a', text: '#2b2b2b', bg: '#f5f0e4' },
  decorators: {
    h1: { style: 'underline', fontSize: '30px', uw: '4px', uc: '#1a1a1a', color: '#1a1a1a' },
    h2: { style: 'underline', fontSize: '20px', uw: '2px', uc: '#8b7355', color: '#2b2b2b' },
    h3: { style: 'bar', width: '3px', height: '12px', bg: '#8b7355' },
    p: { lineHeight: '1.85', fontSize: '14px', letterSpacing: '0.3px' },
    quote: { style: 'default', width: '4px', color: '#8b7355' },
    strong: { color: '#8b7355', bold: true },
    list: { icon: '◆', iconColor: '#8b7355' },
    divider: { style: 'double', color: '#8b7355' },
    card: { style: 'soft', bg: '#efe7d5', border: '1px solid #d8cbb0', radius: '2px' },
    highlight: { bg: '#f0e6c8', color: '#5a4a2a', bold: true },
    headerDeco: { style: 'newspaper', text: 'DAILY' }
  }
});

/* ---------- 23. 手绘涂鸦 ---------- */
registerTemplate('doodle', {
  name: '手绘涂鸦',
  desc: '手写感涂鸦风，活泼不羁',
  category: 'cute',
  keywords: ['doodle', 'hand', 'cute', 'fun'],
  tokens: { accent: '#ff6b6b', accent2: '#4ecdc4', text: '#3d3d3d', bg: '#fffdf5' },
  decorators: {
    h1: { style: 'badge', bg: '#ff6b6b', fontSize: '19px', letterSpacing: '1px' },
    h2: { style: 'badge', bg: '#4ecdc4', fontSize: '16px' },
    h3: { style: 'bar', width: '4px', height: '13px', bg: '#ffd93d' },
    p: { lineHeight: '1.95', fontSize: '14px' },
    quote: { style: 'default', width: '5px', color: '#4ecdc4' },
    strong: { color: '#ff6b6b', bold: true },
    list: { icon: '✏️', iconColor: '#ff6b6b', iconSize: '14px' },
    divider: { style: 'doodle', color: '#ffd93d' },
    card: { style: 'doodle', border: '2px dashed #ff6b6b', bg: '#fff8f0' },
    highlight: { bg: '#fff3bf', color: '#8b5e3c', bold: true }
  }
});

/* ---------- 24. 极简黑金 ---------- */
registerTemplate('blackgold', {
  name: '极简黑金',
  desc: '黑金高级感，商务晚宴风',
  category: 'elegant',
  keywords: ['black', 'gold', 'luxury', 'elegant'],
  tokens: { accent: '#d4af37', text: '#f5f5f0', bg: '#111111' },
  decorators: {
    h1: { style: 'badge', bg: '#d4af37', color: '#111', fontSize: '19px', letterSpacing: '4px' },
    h2: { style: 'underline', fontSize: '19px', uw: '2px', uc: '#d4af37', color: '#f5f5f0' },
    h3: { style: 'bar', width: '3px', height: '12px', bg: '#d4af37' },
    p: { lineHeight: '1.9', fontSize: '14px', color: '#d9d9d9' },
    quote: { style: 'default', width: '3px', color: '#d4af37', bg: '#1a1a1a' },
    strong: { color: '#d4af37', bold: true },
    list: { icon: '◆', iconColor: '#d4af37' },
    divider: { style: 'line', color: '#3a3a3a' },
    card: { style: 'soft', bg: '#1a1a1a', border: '1px solid #333', radius: '4px' },
    highlight: { bg: '#2a2410', color: '#d4af37', bold: true },
    container: { style: 'dark', bg: '#111111' }
  }
});

/* ---------- 25. 证件卡片 ---------- */
registerTemplate('idcard', {
  name: '证件卡片',
  desc: '工牌证件风，信息卡片感',
  category: 'basic',
  keywords: ['id', 'card', 'badge', 'clean'],
  tokens: { accent: '#4f6ef7', text: '#2d3350', bg: '#f0f2fa' },
  decorators: {
    h1: { style: 'bar', bg: '#4f6ef7', color: '#fff', fontSize: '18px', padding: '10px 20px', radius: '6px' },
    h2: { style: 'bar', bg: '#6c8cff', color: '#fff', fontSize: '15px', padding: '6px 14px', radius: '5px' },
    h3: { style: 'square', color: '#4f6ef7' },
    p: { lineHeight: '1.85', fontSize: '14px' },
    quote: { style: 'default', width: '4px', color: '#4f6ef7', bg: '#e8edff' },
    strong: { color: '#4f6ef7', bold: true },
    list: { icon: '▪', iconColor: '#4f6ef7' },
    divider: { style: 'line', color: '#dfe3f5' },
    card: { style: 'soft', bg: '#ffffff', border: '1px solid #e0e5f7', radius: '10px', shadow: '0 2px 8px rgba(79,110,247,0.1)' },
    highlight: { bg: '#e8edff', color: '#2d4bd8', bold: true }
  }
});

/* ---------- 26. 霓虹夜景 ---------- */
registerTemplate('neonnight', {
  name: '霓虹夜景',
  desc: '深紫霓虹灯牌，赛博都市夜',
  category: 'tech',
  keywords: ['neon', 'night', 'cyber', 'purple'],
  tokens: { accent: '#ff2d95', accent2: '#00e5ff', text: '#f0e6ff', bg: '#120a24' },
  decorators: {
    h1: { style: 'neon', color: '#ff2d95', fontSize: '25px', letterSpacing: '3px' },
    h2: { style: 'neon', color: '#00e5ff', fontSize: '18px', letterSpacing: '2px' },
    h3: { style: 'bar', width: '4px', height: '13px', bg: '#ff2d95' },
    p: { lineHeight: '1.9', fontSize: '14px', color: '#cfc4e6' },
    quote: { style: 'default', width: '3px', color: '#00e5ff', bg: 'rgba(0,229,255,0.08)' },
    strong: { color: '#ff2d95', bold: true },
    list: { icon: '✦', iconColor: '#00e5ff' },
    divider: { style: 'line', color: '#3a2a5e' },
    card: { style: 'soft', bg: 'rgba(255,45,149,0.08)', border: '1px solid rgba(255,45,149,0.25)', radius: '8px' },
    highlight: { bg: 'rgba(255,45,149,0.2)', color: '#ffb3d9', bold: true },
    container: { style: 'dark', bg: '#120a24' }
  }
});

/* ---------- 27. 清新绿野 ---------- */
registerTemplate('greenery', {
  name: '清新绿野',
  desc: '深绿森林系，安静治愈',
  category: 'warm',
  keywords: ['forest', 'green', 'nature', 'calm', 'greenery'],
  tokens: { accent: '#3d8b5f', text: '#2c3a2f', bg: '#f4faf5' },
  decorators: {
    h1: { style: 'leftblock', blockW: '8px', blockH: '26px', bg: '#3d8b5f' },
    h2: { style: 'leftblock', blockW: '6px', blockH: '18px', bg: '#6fae8a' },
    h3: { style: 'bar', width: '4px', height: '13px', bg: '#8fbf9f' },
    p: { lineHeight: '1.9', fontSize: '14px' },
    quote: { style: 'default', width: '4px', color: '#6fae8a', bg: '#eaf5ee' },
    strong: { color: '#3d8b5f', bold: true },
    list: { icon: '🌿', iconColor: '#3d8b5f', iconSize: '14px' },
    divider: { style: 'leaf', color: '#6fae8a' },
    card: { style: 'soft', bg: '#eaf5ee', border: '1px solid #d3e8db', radius: '12px' },
    highlight: { bg: '#d9efe0', color: '#2c6b46', bold: true }
  }
});

/* ---------- 28. 文艺手账（强化版） ---------- */
registerTemplate('journal2', {
  name: '文艺手账',
  desc: '精致手账贴纸风，少女心',
  category: 'cute',
  keywords: ['journal', 'sticker', 'cute', 'pretty'],
  tokens: { accent: '#e8a0bf', text: '#5a4a52', bg: '#fdf6f8' },
  decorators: {
    h1: { style: 'badge', bg: '#e8a0bf', fontSize: '18px', letterSpacing: '2px' },
    h2: { style: 'leftblock', blockW: '5px', blockH: '16px', bg: '#f0b8cc' },
    h3: { style: 'bar', width: '3px', height: '11px', bg: '#f5c6d6' },
    p: { lineHeight: '1.95', fontSize: '14px' },
    quote: { style: 'default', width: '4px', color: '#e8a0bf', bg: '#fdf0f4' },
    strong: { color: '#e06a9a', bold: true },
    list: { icon: '🌸', iconColor: '#e8a0bf', iconSize: '13px' },
    divider: { style: 'dotted', color: '#e8a0bf' },
    card: { style: 'soft', bg: '#fdf0f4', border: '1px dashed #e8a0bf', radius: '14px' },
    highlight: { bg: '#fde8ef', color: '#c24e80', bold: true }
  }
});

/* ---------- 29. 海洋气泡 ---------- */
registerTemplate('ocean2', {
  name: '海洋气泡',
  desc: '清爽海洋蓝，度假氛围',
  category: 'colorful',
  keywords: ['ocean', 'sea', 'blue', 'fresh'],
  tokens: { accent: '#1e88e5', accent2: '#00bcd4', text: '#1c3a4d', bg: '#f2f9fd' },
  decorators: {
    h1: { style: 'badge', bg: '#1e88e5', fontSize: '19px', letterSpacing: '2px' },
    h2: { style: 'leftblock', blockW: '6px', blockH: '18px', bg: '#00bcd4' },
    h3: { style: 'bar', width: '4px', height: '13px', bg: '#4fc3f7' },
    p: { lineHeight: '1.9', fontSize: '14px' },
    quote: { style: 'default', width: '4px', color: '#00bcd4', bg: '#e3f6fc' },
    strong: { color: '#1e88e5', bold: true },
    list: { icon: '🐬', iconColor: '#1e88e5', iconSize: '14px' },
    divider: { style: 'wave', color: '#4fc3f7' },
    card: { style: 'soft', bg: '#e3f6fc', border: '1px solid #c2e8f7', radius: '16px' },
    highlight: { bg: '#d6f0fa', color: '#0d6bb5', bold: true }
  }
});

/* ---------- 30. 复古胶片 ---------- */
registerTemplate('film', {
  name: '复古胶片',
  desc: '老电影胶片感，颗粒质感',
  category: 'retro',
  keywords: ['film', 'vintage', 'cinema', 'retro'],
  tokens: { accent: '#c98a3d', text: '#3d2f1e', bg: '#f7f0e3' },
  decorators: {
    h1: { style: 'underline', fontSize: '26px', uw: '3px', uc: '#c98a3d', color: '#3d2f1e' },
    h2: { style: 'leftblock', blockW: '5px', blockH: '17px', bg: '#c98a3d' },
    h3: { style: 'bar', width: '3px', height: '12px', bg: '#d9b483' },
    p: { lineHeight: '1.9', fontSize: '14px', letterSpacing: '0.4px' },
    quote: { style: 'default', width: '4px', color: '#c98a3d', bg: '#f3e9d4' },
    strong: { color: '#a06b2c', bold: true },
    list: { icon: '🎞️', iconColor: '#c98a3d', iconSize: '13px' },
    divider: { style: 'double', color: '#c98a3d' },
    card: { style: 'soft', bg: '#f3e9d4', border: '1px solid #e2d2b4', radius: '2px' },
    highlight: { bg: '#f0e0c0', color: '#7a5420', bold: true }
  }
});

/* ---------- 31. 夏日汽水 ---------- */
registerTemplate('soda', {
  name: '夏日汽水',
  desc: '明亮汽水色，青春活力',
  category: 'colorful',
  keywords: ['soda', 'summer', 'fresh', 'fun'],
  tokens: { accent: '#ff7043', accent2: '#ffca28', text: '#3a3a2a', bg: '#fffbf2' },
  decorators: {
    h1: { style: 'badge', bg: '#ff7043', fontSize: '19px', letterSpacing: '1px' },
    h2: { style: 'badge', bg: '#ffca28', color: '#5a4a00', fontSize: '15px' },
    h3: { style: 'bar', width: '4px', height: '13px', bg: '#ffa726' },
    p: { lineHeight: '1.9', fontSize: '14px' },
    quote: { style: 'default', width: '4px', color: '#ff7043', bg: '#fff0e8' },
    strong: { color: '#ff7043', bold: true },
    list: { icon: '🥤', iconColor: '#ff7043', iconSize: '14px' },
    divider: { style: 'dotted', color: '#ffca28' },
    card: { style: 'soft', bg: '#fff6e5', border: '1px solid #ffe9c2', radius: '12px' },
    highlight: { bg: '#ffe9c2', color: '#b25e00', bold: true }
  }
});

/* ---------- 32. 国风水墨（强化） ---------- */
registerTemplate('ink', {
  name: '国风水墨',
  desc: '水墨山水意境，古典雅致',
  category: 'chinese',
  keywords: ['ink', 'china', 'classic', 'poetry'],
  tokens: { accent: '#4a4a4a', text: '#2f2f2f', bg: '#faf7f0' },
  decorators: {
    h1: { style: 'underline', fontSize: '28px', uw: '2px', uc: '#4a4a4a', color: '#2f2f2f', letterSpacing: '6px' },
    h2: { style: 'leftblock', blockW: '12px', blockH: '2px', bg: '#4a4a4a' },
    h3: { style: 'bar', width: '3px', height: '12px', bg: '#8a8a8a' },
    p: { lineHeight: '2', fontSize: '14px', letterSpacing: '1px' },
    quote: { style: 'default', width: '3px', color: '#6a6a6a', bg: '#f2ede2' },
    strong: { color: '#4a4a4a', bold: true },
    list: { icon: '❖', iconColor: '#6a6a6a' },
    divider: { style: 'line', color: '#c9c2b0' },
    card: { style: 'soft', bg: '#f2ede2', border: '1px solid #ddd4c0', radius: '2px' },
    highlight: { bg: '#efe8d8', color: '#4a3a20', bold: true },
    headerDeco: { style: 'seal', text: '雅集' }
  }
});
