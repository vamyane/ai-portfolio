/* ============================================================
 * 公众号排版器 V2 - 模板组 1：核心 5 套
 * 1. minimal      简约白      —— 黑白灰、极简、零装饰
 * 2. china-ink    墨韵中国风  —— 宣纸底、竖排引用、红印章、毛笔标题
 * 3. newspaper    复古报纸    —— 米黄纸、衬线、首字下沉、双线分隔
 * 4. magazine     现代杂志    —— 大字标题、色块标签、图片海报感
 * 5. neon         赛博霓虹    —— 深底、发光边框、扫描线、未来感
 * ============================================================ */

/* ---------- 1. 简约白 minimal ---------- */
registerTemplate('minimal', {
  name: '简约白',
  desc: '黑白灰极简，干净利落，适合大多数文章',
  category: 'basic',
  tokens: {
    accent: '#333333',
    text: '#444444',
    bg: '#ffffff',
    font: '-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif'
  },
  decorators: {
    h1: { fontSize: '22px', color: '#222', margin: '24px 0 14px', fontWeight: '700' },
    h2: { fontSize: '18px', color: '#333', margin: '20px 0 12px', fontWeight: '700' },
    h3: { fontSize: '16px', color: '#555', margin: '16px 0 10px', fontWeight: '600' },
    p: { fontSize: '15px', lineHeight: '1.9', color: '#444' },
    quote: { width: '3px', color: '#bbb', bg: '#f7f7f7', textColor: '#666', quoteMark: false },
    strong: { color: '#111' },
    list: { icon: '·', iconColor: '#999', color: '#444' },
    divider: { style: 'line', color: '#e5e5e5' },
    card: { bg: '#f8f8f8', radius: '8px', border: '1px solid #eee' },
    img: { radius: '4px', margin: '14px 0' },
    table: { headBg: '#333', headColor: '#fff', border: '#e5e5e5', zebra: '#fafafa' },
    highlight: { bg: '#f0f0f0', color: '#333', bold: true }
  }
});

/* ---------- 2. 墨韵中国风 china-ink ---------- */
registerTemplate('china-ink', {
  name: '墨韵中国风',
  desc: '宣纸底、水墨晕染、红印章点缀，古韵盎然',
  category: 'chinese',
  tokens: {
    accent: '#8c3a2e',
    accent2: '#4a3f35',
    text: '#3d3a36',
    bg: '#f7f3ea',
    font: '"STKaiti", "KaiTi", "SimSun", serif'
  },
  decorators: {
    h1: {
      fontSize: '24px', color: '#3d3a36', margin: '28px 0 16px', align: 'center',
      pre: '<span style="display:inline-block;width:34px;height:2px;background:#8c3a2e;vertical-align:middle;margin-right:10px"></span>',
      post: '<span style="display:inline-block;width:34px;height:2px;background:#8c3a2e;vertical-align:middle;margin-left:10px"></span>'
    },
    h2: {
      fontSize: '19px', color: '#4a3f35', margin: '22px 0 12px',
      tag: { width: '4px', color: '#8c3a2e' },
      post: '<span style="display:inline-block;width:26px;height:2px;background:#c9a87c;vertical-align:middle;margin-left:10px"></span>'
    },
    h3: {
      fontSize: '16px', color: '#6b5d4e', margin: '16px 0 10px',
      dot: { color: '#8c3a2e' }
    },
    p: { fontSize: '15px', lineHeight: '2.1', color: '#3d3a36', textIndent: true, firstLetter: { size: '34px', color: '#8c3a2e' } },
    quote: {
      solid: { bg: '#efe6d8', color: '#5c4f41', radius: '2px' },
      quoteMark: { size: '30px', color: '#c9a87c' }
    },
    strong: { color: '#8c3a2e' },
    list: { icon: '◆', iconColor: '#b08a5a', color: '#3d3a36' },
    divider: { style: 'diamond', color: '#c9a87c' },
    card: { bg: '#efe6d8', radius: '4px', border: '1px solid #d8c9b2', leftBar: { width: '4px', color: '#8c3a2e' } },
    img: { frame: { width: '4px', color: '#d8c9b2', shadow: '0 4px 12px rgba(0,0,0,0.15)' }, radius: '2px' },
    table: { headBg: '#4a3f35', headColor: '#f7f3ea', border: '#d8c9b2', zebra: '#f3ecdf' },
    highlight: { bg: '#f0e4d0', color: '#6b4f2a' },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin:10px 0 4px"><span style="display:inline-block;width:60px;height:60px;border:2px solid #8c3a2e;border-radius:50%;color:#8c3a2e;font-size:26px;line-height:56px;text-align:center;font-family:STKaiti,serif">印</span></div>';
    }
  }
});

/* ---------- 3. 复古报纸 newspaper ---------- */
registerTemplate('newspaper', {
  name: '复古报纸',
  desc: '米黄纸感、衬线标题、首字下沉，老派报刊风',
  category: 'retro',
  tokens: {
    accent: '#2c2c2c',
    text: '#2b2b2b',
    bg: '#f5efdf',
    font: 'Georgia, "Times New Roman", "Songti SC", "SimSun", serif'
  },
  decorators: {
    h1: {
      fontSize: '26px', color: '#1a1a1a', margin: '26px 0 14px', align: 'center',
      pre: '<span style="display:block;border-top:3px double #2c2c2c;margin-bottom:8px;height:4px"></span>',
      post: '<span style="display:block;border-bottom:3px double #2c2c2c;margin-top:8px;height:4px"></span>',
      wrapStyle: { 'border-top': '1px solid #2c2c2c', 'border-bottom': '1px solid #2c2c2c', padding: '6px 0' }
    },
    h2: {
      fontSize: '20px', color: '#1a1a1a', margin: '22px 0 12px', align: 'center',
      pre: '<span style="display:inline-block;width:20px;height:1px;background:#2c2c2c;vertical-align:middle;margin-right:8px"></span>',
      post: '<span style="display:inline-block;width:20px;height:1px;background:#2c2c2c;vertical-align:middle;margin-left:8px"></span>'
    },
    h3: { fontSize: '17px', color: '#333', margin: '16px 0 10px' },
    p: { fontSize: '15px', lineHeight: '1.95', color: '#2b2b2b', firstLetter: { size: '36px', color: '#2c2c2c' } },
    quote: { width: '1px', color: '#999', bg: 'transparent', textColor: '#555', quoteMark: { size: '30px', color: '#999' } },
    strong: { color: '#1a1a1a', underline: { color: '#2c2c2c' } },
    list: { icon: '❖', iconColor: '#555', color: '#2b2b2b' },
    divider: { style: 'double', color: '#8a8a8a' },
    card: { bg: 'transparent', radius: '0', border: '1px solid #8a8a8a', shadow: 'none' },
    img: { frame: { width: '2px', color: '#8a8a8a', shadow: 'none' }, radius: '0' },
    table: { headBg: '#2c2c2c', headColor: '#f5efdf', border: '#8a8a8a', zebra: '#efe7d2' },
    highlight: { bg: '#e8ddc0', color: '#4a3b20' },
    headerDeco: function (t) {
      return '<div style="text-align:center;border-bottom:2px solid #2c2c2c;border-top:2px solid #2c2c2c;padding:6px 0;margin-bottom:16px;letter-spacing:8px;color:#2c2c2c;font-size:12px">—— 特 刊 ——</div>';
    }
  }
});

/* ---------- 4. 现代杂志 magazine ---------- */
registerTemplate('magazine', {
  name: '现代杂志',
  desc: '大字标题、色块标签、几何点缀，时尚期刊风',
  category: 'fashion',
  tokens: {
    accent: '#e63946',
    accent2: '#1d3557',
    text: '#333333',
    bg: '#ffffff',
    font: '-apple-system, "PingFang SC", "Helvetica Neue", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '26px', color: '#1d3557', margin: '26px 0 14px',
      badge: { bg: '#e63946', color: '#fff', text: 'TOPIC', fontSize: '10px' }
    },
    h2: {
      fontSize: '19px', color: '#1d3557', margin: '22px 0 12px',
      pill: { bg: '#e63946', color: '#fff' }
    },
    h3: {
      fontSize: '16px', color: '#333', margin: '16px 0 10px',
      bar: { width: '14px', height: '3px', color: '#e63946' }
    },
    p: { fontSize: '15px', lineHeight: '1.9', color: '#333' },
    quote: { width: '0', bg: '#1d3557', textColor: '#fff', padding: '16px 20px', radius: '0 12px 12px 0', solid: false },
    strong: { color: '#e63946' },
    list: { icon: '▸', iconColor: '#e63946', color: '#333' },
    divider: { style: 'gradient', grad1: '#e63946', grad2: '#1d3557' },
    card: { bg: '#f1f5f9', radius: '12px', border: 'none', shadow: '0 2px 8px rgba(29,53,87,0.08)', leftBar: { width: '4px', color: '#e63946' } },
    img: { rounded: '12px', frame: { width: '0', color: '#fff', shadow: '0 6px 18px rgba(0,0,0,0.15)' } },
    table: { headBg: '#1d3557', headColor: '#fff', border: '#e2e8f0', zebra: '#f8fafc' },
    highlight: { bg: '#fee2e2', color: '#991b1b', bold: true },
    headerDeco: function (t) {
      return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#e63946"></span><span style="font-size:12px;letter-spacing:4px;color:#1d3557;font-weight:bold">MAGAZINE</span><span style="flex:1;height:1px;background:#e2e8f0"></span><span style="font-size:12px;color:#94a3b8">VOL.01</span></div>';
    }
  }
});

/* ---------- 5. 赛博霓虹 neon ---------- */
registerTemplate('neon', {
  name: '赛博霓虹',
  desc: '深黑底、霓虹发光、扫描线，赛博朋克风',
  category: 'tech',
  tokens: {
    accent: '#00f5ff',
    accent2: '#ff2d95',
    text: '#d4faff',
    bg: '#0a0a1a',
    font: '"Courier New", "Consolas", monospace'
  },
  decorators: {
    h1: {
      fontSize: '24px', color: '#00f5ff', margin: '26px 0 14px', align: 'center',
      wrapStyle: { 'text-shadow': '0 0 8px #00f5ff, 0 0 20px rgba(0,245,255,0.5)', border: '1px solid rgba(0,245,255,0.3)', padding: '10px 0', 'border-radius': '4px', background: 'rgba(0,245,255,0.05)' }
    },
    h2: {
      fontSize: '18px', color: '#ff2d95', margin: '22px 0 12px',
      tag: { width: '3px', color: '#ff2d95' },
      wrapStyle: { 'text-shadow': '0 0 6px rgba(255,45,149,0.6)' }
    },
    h3: {
      fontSize: '15px', color: '#00f5ff', margin: '16px 0 10px',
      bar: { width: '12px', height: '2px', color: '#00f5ff' }
    },
    p: { fontSize: '14px', lineHeight: '1.9', color: '#c8e8ee' },
    quote: { width: '0', bg: 'rgba(0,245,255,0.08)', textColor: '#00f5ff', radius: '4px', border: '1px solid rgba(0,245,255,0.4)', quoteMark: { size: '24px', color: '#00f5ff' } },
    strong: { color: '#ff2d95' },
    list: { icon: '▶', iconColor: '#00f5ff', color: '#c8e8ee' },
    divider: { style: 'line', color: 'rgba(0,245,255,0.4)' },
    card: { bg: 'rgba(255,45,149,0.08)', radius: '6px', border: '1px solid rgba(255,45,149,0.4)', shadow: '0 0 12px rgba(255,45,149,0.15)', leftBar: { width: '3px', color: '#ff2d95' } },
    img: { frame: { width: '2px', color: '#00f5ff', shadow: '0 0 16px rgba(0,245,255,0.3)' }, radius: '6px' },
    table: { headBg: '#1a1a3a', headColor: '#00f5ff', border: 'rgba(0,245,255,0.3)', zebra: 'rgba(0,245,255,0.05)' },
    highlight: { bg: 'rgba(255,45,149,0.2)', color: '#ffb3d9', bold: true },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:14px;color:#ff2d95;font-size:11px;letter-spacing:6px;text-shadow:0 0 6px rgba(255,45,149,0.8)">◤ ◥  S Y S T E M  ◤ ◥</div>';
    }
  }
});
