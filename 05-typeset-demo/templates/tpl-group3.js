/* ============================================================
 * 公众号排版器 V2 - 模板组 3：5 套
 * 11. gold        暗金奢华    —— 深黑金、细金线、庄重质感
 * 12. letter      复古书信    —— 信纸、火漆印、手写问候
 * 13. fresh       果味清新    —— 绿植、圆润、自然活力
 * 14. starry      星空夜语    —— 深蓝星空、星光点缀、梦幻
 * 15. coffee      咖啡时光    —— 暖棕、手写体、温馨治愈
 * ============================================================ */

/* ---------- 11. 暗金奢华 gold ---------- */
registerTemplate('gold', {
  name: '暗金奢华',
  desc: '深黑金调、细金线、庄重质感，高端大气',
  category: 'elegant',
  tokens: {
    accent: '#c9a227',
    accent2: '#8a6d1a',
    text: '#e8e0d0',
    bg: '#1c1a17',
    font: 'Georgia, "Times New Roman", "Songti SC", serif'
  },
  decorators: {
    h1: {
      fontSize: '26px', color: '#d4af37', margin: '30px 0 18px', align: 'center',
      wrapStyle: {
        'border-top': '1px solid #c9a227', 'border-bottom': '1px solid #c9a227',
        padding: '12px 0', 'text-shadow': '0 0 12px rgba(201,162,39,0.4)',
        'letter-spacing': '2px'
      }
    },
    h2: {
      fontSize: '19px', color: '#d4af37', margin: '24px 0 14px',
      pre: '<span style="display:inline-block;width:24px;height:1px;background:linear-gradient(90deg,transparent,#c9a227);vertical-align:middle;margin-right:10px"></span>',
      post: '<span style="display:inline-block;width:24px;height:1px;background:linear-gradient(90deg,#c9a227,transparent);vertical-align:middle;margin-left:10px"></span>'
    },
    h3: {
      fontSize: '16px', color: '#d8cfa8', margin: '18px 0 12px',
      bar: { width: '16px', height: '1px', color: '#c9a227' }
    },
    p: { fontSize: '15px', lineHeight: '2', color: '#e8e0d0' },
    quote: {
      card: { bg: '#262219', border: '1px solid #5c4a1e', radius: '4px', shadow: '0 0 16px rgba(201,162,39,0.1)' },
      quoteMark: { size: '28px', color: '#c9a227' }
    },
    strong: { color: '#d4af37' },
    list: { icon: '◆', iconColor: '#c9a227', color: '#e8e0d0' },
    divider: { style: 'double', color: '#5c4a1e' },
    card: { bg: '#262219', radius: '4px', border: '1px solid #5c4a1e', shadow: '0 0 16px rgba(201,162,39,0.08)', leftBar: { width: '3px', color: '#c9a227' } },
    img: { frame: { width: '2px', color: '#5c4a1e', shadow: '0 6px 20px rgba(0,0,0,0.5)' }, radius: '4px' },
    table: { headBg: '#c9a227', headColor: '#1c1a17', border: '#5c4a1e', zebra: '#262219' },
    highlight: { bg: 'rgba(201,162,39,0.2)', color: '#e8d48a', bold: true },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:20px;color:#c9a227;font-size:18px;letter-spacing:10px;text-shadow:0 0 14px rgba(201,162,39,0.5)">✦ LUXURY ✦</div>';
    }
  }
});

/* ---------- 12. 复古书信 letter ---------- */
registerTemplate('letter', {
  name: '复古书信',
  desc: '信纸底纹、火漆印章、手写问候，书信体',
  category: 'retro',
  tokens: {
    accent: '#8d6e63',
    accent2: '#a1887f',
    text: '#4e342e',
    bg: '#faf3e8',
    font: '"KaiTi", "STKaiti", "FangSong", serif'
  },
  decorators: {
    h1: {
      fontSize: '24px', color: '#5d4037', margin: '28px 0 18px', align: 'center',
      wrapStyle: { 'letter-spacing': '4px' }
    },
    h2: {
      fontSize: '18px', color: '#6d4c41', margin: '22px 0 12px',
      underline: { width: '1px', color: '#bcaaa4' }
    },
    h3: { fontSize: '15px', color: '#795548', margin: '16px 0 10px' },
    p: { fontSize: '15px', lineHeight: '2.1', color: '#4e342e', textIndent: true },
    quote: {
      card: { bg: '#f6ede1', border: 'none', radius: '2px', shadow: 'none' },
      quoteMark: { size: '28px', color: '#a1887f' }
    },
    strong: { color: '#8d6e63', underline: { color: '#bcaaa4' } },
    list: { icon: '❧', iconColor: '#a1887f', color: '#4e342e' },
    divider: { style: 'wave', color: '#a1887f' },
    card: { bg: '#f6ede1', radius: '2px', border: 'none', shadow: 'none', leftBar: { width: '2px', color: '#a1887f' } },
    img: { frame: { width: '6px', color: '#f6ede1', shadow: '0 3px 10px rgba(0,0,0,0.15)' }, radius: '2px' },
    table: { headBg: '#8d6e63', headColor: '#faf3e8', border: '#d7ccc8', zebra: '#f6ede1' },
    highlight: { bg: '#f4e0c8', color: '#6d4c41' },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:18px"><span style="display:inline-block;width:52px;height:52px;border:2px solid #a1887f;border-radius:50%;color:#8d6e63;font-size:24px;line-height:48px;font-family:STKaiti,serif;box-shadow:0 2px 8px rgba(0,0,0,0.15)">信</span></div>';
    }
  }
});

/* ---------- 13. 果味清新 fresh ---------- */
registerTemplate('fresh', {
  name: '果味清新',
  desc: '绿意自然、圆润清爽、活力十足，清新风',
  category: 'colorful',
  tokens: {
    accent: '#4ade80',
    accent2: '#2dd4bf',
    text: '#3f4a44',
    bg: '#ffffff',
    font: '-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '24px', color: '#16a34a', margin: '26px 0 16px',
      wrapStyle: { 'border-left': '6px solid #4ade80', 'border-radius': '0 10px 10px 0', background: '#f0fdf4', padding: '10px 14px' }
    },
    h2: {
      fontSize: '18px', color: '#16a34a', margin: '22px 0 12px',
      pill: { bg: '#dcfce7', color: '#15803d' }
    },
    h3: {
      fontSize: '15px', color: '#64748b', margin: '16px 0 10px',
      dot: { color: '#2dd4bf' }
    },
    p: { fontSize: '15px', lineHeight: '1.95', color: '#3f4a44' },
    quote: {
      solid: { bg: '#f0fdf4', color: '#166534', radius: '12px' },
      quoteMark: { size: '24px', color: '#4ade80' }
    },
    strong: { color: '#16a34a' },
    list: { icon: '🍃', iconColor: '', color: '#3f4a44' },
    divider: { style: 'gradient', grad1: '#4ade80', grad2: '#2dd4bf' },
    card: { bg: '#f0fdf4', radius: '14px', border: '1px solid #bbf7d0', shadow: '0 3px 12px rgba(74,222,128,0.15)', topAccent: { color: '#4ade80', height: '5px', radius: '14px 14px 0 0' } },
    img: { rounded: '14px', frame: { width: '0', color: '#fff', shadow: '0 5px 16px rgba(34,197,94,0.2)' } },
    table: { headBg: '#16a34a', headColor: '#fff', border: '#bbf7d0', zebra: '#f0fdf4' },
    highlight: { bg: '#dcfce7', color: '#166534', bold: true },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:16px;color:#4ade80;font-size:14px;letter-spacing:6px">❀ GREEN ❀</div>';
    }
  }
});

/* ---------- 14. 星空夜语 starry ---------- */
registerTemplate('starry', {
  name: '星空夜语',
  desc: '深蓝星空、星光点缀、梦幻深邃，夜读风',
  category: 'tech',
  tokens: {
    accent: '#fbbf24',
    accent2: '#818cf8',
    text: '#c7d2fe',
    bg: '#0f172a',
    font: '-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '24px', color: '#fbbf24', margin: '28px 0 16px', align: 'center',
      wrapStyle: { 'text-shadow': '0 0 14px rgba(251,191,36,0.5)', 'letter-spacing': '2px' }
    },
    h2: {
      fontSize: '18px', color: '#a5b4fc', margin: '22px 0 12px',
      pre: '<span style="color:#fbbf24;margin-right:8px">✦</span>'
    },
    h3: {
      fontSize: '15px', color: '#e2e8f0', margin: '16px 0 10px',
      dot: { color: '#fbbf24' }
    },
    p: { fontSize: '15px', lineHeight: '2', color: '#c7d2fe' },
    quote: {
      card: { bg: 'rgba(99,102,241,0.12)', border: '1px solid rgba(129,140,248,0.4)', radius: '10px', shadow: '0 0 18px rgba(99,102,241,0.2)' },
      quoteMark: { size: '26px', color: '#818cf8' }
    },
    strong: { color: '#fbbf24' },
    list: { icon: '★', iconColor: '#fbbf24', color: '#c7d2fe' },
    divider: { style: 'asterisk', color: '#818cf8' },
    card: { bg: 'rgba(30,41,59,0.7)', radius: '12px', border: '1px solid rgba(129,140,248,0.3)', shadow: '0 4px 18px rgba(0,0,0,0.3)', leftBar: { width: '3px', color: '#fbbf24' } },
    img: { frame: { width: '2px', color: 'rgba(251,191,36,0.6)', shadow: '0 6px 22px rgba(0,0,0,0.4)' }, radius: '10px' },
    table: { headBg: '#312e81', headColor: '#fbbf24', border: '#3730a3', zebra: '#1e293b' },
    highlight: { bg: 'rgba(251,191,36,0.18)', color: '#fde68a', bold: true },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:18px;color:#818cf8;font-size:14px;letter-spacing:8px">✦ ✧ ✦ ✧ ✦</div>';
    }
  }
});

/* ---------- 15. 咖啡时光 coffee ---------- */
registerTemplate('coffee', {
  name: '咖啡时光',
  desc: '暖棕色调、手写体、温馨治愈，咖啡馆风',
  category: 'warm',
  tokens: {
    accent: '#a16207',
    accent2: '#d97706',
    text: '#44403c',
    bg: '#fdf8f1',
    font: '"PingFang SC", "Microsoft YaHei", "Comic Sans MS", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '23px', color: '#92400e', margin: '26px 0 16px',
      wrapStyle: { 'border-bottom': '2px solid #d97706', padding: '0 0 10px' }
    },
    h2: {
      fontSize: '18px', color: '#92400e', margin: '22px 0 12px',
      tag: { width: '4px', color: '#d97706' }
    },
    h3: {
      fontSize: '15px', color: '#78716c', margin: '16px 0 10px',
      dot: { color: '#d97706' }
    },
    p: { fontSize: '15px', lineHeight: '2', color: '#44403c' },
    quote: {
      card: { bg: '#f6efe3', border: '1px solid #e7d8c3', radius: '10px', shadow: '0 2px 8px rgba(161,98,7,0.1)' },
      quoteMark: { size: '24px', color: '#d97706' }
    },
    strong: { color: '#b45309' },
    list: { icon: '☕', iconColor: '', color: '#44403c' },
    divider: { style: 'wave', color: '#d97706' },
    card: { bg: '#f6efe3', radius: '10px', border: '1px solid #e7d8c3', shadow: '0 2px 8px rgba(161,98,7,0.1)' },
    img: { rounded: '10px', frame: { width: '5px', color: '#fff', shadow: '0 4px 14px rgba(161,98,7,0.2)' } },
    table: { headBg: '#a16207', headColor: '#fff', border: '#e7d8c3', zebra: '#faf3e8' },
    highlight: { bg: '#fef3c7', color: '#92400e', bold: true },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:16px;color:#d97706;font-size:16px">☕ · ☕ · ☕</div>';
    }
  }
});
