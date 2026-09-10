/* ============================================================
 * 公众号排版器 V2 - 模板组 2：5 套
 * 6. journal      清新手账    —— 网格底、胶带、手写体、便签
 * 7. biz          商务汇报    —— 深蓝、严谨、图表感、数据风
 * 8. zen          禅意留白    —— 大量留白、细线、淡雅、极简日式
 * 9. gradient     渐变活力    —— 渐变背景、圆角、多彩
 * 10. fairy       童话梦幻    —— 粉紫、圆润、云朵星星
 * ============================================================ */

/* ---------- 6. 清新手账 journal ---------- */
registerTemplate('journal', {
  name: '清新手账',
  desc: '网格纸底、胶带标签、手写风格，日记手账感',
  category: 'cute',
  tokens: {
    accent: '#7c9a92',
    accent2: '#d4a5a5',
    text: '#55524e',
    bg: '#fbf8f1',
    font: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '22px', color: '#7c9a92', margin: '26px 0 16px',
      pre: '<span style="display:inline-block;background:#f4d58d;color:#7a6a3d;font-size:11px;padding:2px 8px;border-radius:2px;transform:rotate(-2deg);margin-right:8px;box-shadow:0 1px 3px rgba(0,0,0,0.15)">TAPE</span>'
    },
    h2: {
      fontSize: '18px', color: '#d4a5a5', margin: '22px 0 12px',
      underline: { width: '2px', color: '#f0c8c8' }
    },
    h3: {
      fontSize: '15px', color: '#7c9a92', margin: '16px 0 10px',
      dot: { color: '#d4a5a5' }
    },
    p: { fontSize: '14px', lineHeight: '2', color: '#55524e' },
    quote: {
      card: { bg: '#fffdf8', border: '#e8dcc8', radius: '6px', shadow: '0 2px 6px rgba(0,0,0,0.06)' },
      quoteMark: { size: '22px', color: '#d4a5a5' }
    },
    strong: { color: '#d4a5a5' },
    list: { icon: '✎', iconColor: '#7c9a92', color: '#55524e' },
    divider: { style: 'asterisk', color: '#d4a5a5' },
    card: {
      bg: '#fffdf8', radius: '4px', border: '1px dashed #d8cfc0', shadow: 'none',
      topAccent: { color: '#f4d58d', height: '4px', radius: '4px 4px 0 0' }
    },
    img: { frame: { width: '4px', color: '#fff', shadow: '0 3px 10px rgba(0,0,0,0.12)' }, radius: '4px' },
    table: { headBg: '#7c9a92', headColor: '#fff', border: '#d8cfc0', zebra: '#f8f4ea' },
    highlight: { bg: '#fdf0d5', color: '#8a6d3b' },
    headerDeco: function (t) {
      return '<div style="background:repeating-linear-gradient(0deg,transparent,transparent 23px,#e8e2d4 23px,#e8e2d4 24px);border:1px solid #e8e2d4;padding:10px 12px;margin-bottom:16px;font-size:12px;color:#a99f8c;letter-spacing:2px;text-align:center">✎ 手账日记 · ' + new Date().getFullYear() + '</div>';
    }
  }
});

/* ---------- 7. 商务汇报 biz ---------- */
registerTemplate('biz', {
  name: '商务汇报',
  desc: '深蓝基调、严谨结构、数据强调，专业商务风',
  category: 'business',
  tokens: {
    accent: '#1e3a5f',
    accent2: '#3b82c4',
    text: '#2c3e50',
    bg: '#ffffff',
    font: '-apple-system, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '23px', color: '#1e3a5f', margin: '26px 0 16px',
      tag: { width: '5px', color: '#3b82c4' }
    },
    h2: {
      fontSize: '18px', color: '#1e3a5f', margin: '22px 0 12px',
      number: { bg: '#1e3a5f', color: '#fff', size: '24px', fontSize: '13px', text: '01' }
    },
    h3: {
      fontSize: '15px', color: '#34495e', margin: '16px 0 10px',
      bar: { width: '10px', height: '3px', color: '#3b82c4' }
    },
    p: { fontSize: '15px', lineHeight: '1.85', color: '#2c3e50' },
    quote: { width: '0', bg: '#eef4fb', textColor: '#1e3a5f', radius: '6px', padding: '14px 18px' },
    strong: { color: '#3b82c4' },
    list: { icon: '▪', iconColor: '#3b82c4', color: '#2c3e50' },
    divider: { style: 'gradient', grad1: '#1e3a5f', grad2: '#3b82c4' },
    card: { bg: '#f4f8fd', radius: '8px', border: '1px solid #d6e4f5', leftBar: { width: '4px', color: '#3b82c4' } },
    img: { rounded: '8px', frame: { width: '0', color: '#fff', shadow: '0 4px 14px rgba(30,58,95,0.15)' } },
    table: { headBg: '#1e3a5f', headColor: '#fff', border: '#c8d8ea', zebra: '#f0f5fb' },
    highlight: { bg: '#dbe9f9', color: '#1e3a5f', bold: true },
    headerDeco: function (t) {
      return '<div style="background:#1e3a5f;color:#fff;padding:12px 16px;border-radius:6px;margin-bottom:18px;font-size:12px;letter-spacing:3px;text-align:center">◆ 商 务 汇 报 ◆</div>';
    }
  }
});

/* ---------- 8. 禅意留白 zen ---------- */
registerTemplate('zen', {
  name: '禅意留白',
  desc: '大量留白、极细线条、淡雅色调，日式侘寂',
  category: 'elegant',
  tokens: {
    accent: '#9a8c80',
    accent2: '#c8bfb4',
    text: '#5f574e',
    bg: '#fafaf8',
    font: '"Songti SC", "SimSun", "STSong", serif'
  },
  decorators: {
    h1: {
      fontSize: '22px', color: '#5f574e', margin: '32px 0 18px', align: 'center',
      pre: '<span style="display:block;width:36px;height:1px;background:#9a8c80;margin:0 auto 10px"></span>',
      post: '<span style="display:block;width:36px;height:1px;background:#9a8c80;margin:10px auto 0"></span>'
    },
    h2: {
      fontSize: '18px', color: '#5f574e', margin: '26px 0 14px', align: 'center',
      pre: '<span style="display:inline-block;width:16px;height:1px;background:#c8bfb4;vertical-align:middle;margin-right:10px"></span>',
      post: '<span style="display:inline-block;width:16px;height:1px;background:#c8bfb4;vertical-align:middle;margin-left:10px"></span>'
    },
    h3: { fontSize: '15px', color: '#7d7468', margin: '20px 0 12px' },
    p: { fontSize: '15px', lineHeight: '2.2', color: '#5f574e', letterSpacing: '1px' },
    quote: {
      card: { bg: '#f6f4f0', border: 'none', radius: '2px', shadow: 'none' },
      quoteMark: { size: '26px', color: '#c8bfb4' }
    },
    strong: { color: '#9a8c80' },
    list: { icon: '·', iconColor: '#c8bfb4', color: '#5f574e' },
    divider: { style: 'line', color: '#e3ddd4' },
    card: { bg: '#f6f4f0', radius: '2px', border: 'none', shadow: 'none' },
    img: { radius: '2px', frame: { width: '0', color: '#fff', shadow: 'none' }, margin: '20px 0' },
    table: { headBg: '#9a8c80', headColor: '#fafaf8', border: '#e3ddd4', zebra: '#f4f2ee' },
    highlight: { bg: '#f1ede6', color: '#7d7468' },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:22px"><span style="display:inline-block;width:44px;height:44px;border:1px solid #c8bfb4;border-radius:50%;color:#9a8c80;font-size:20px;line-height:42px">禅</span></div>';
    }
  }
});

/* ---------- 9. 渐变活力 gradient ---------- */
registerTemplate('gradient', {
  name: '渐变活力',
  desc: '渐变背景、圆润卡片、多彩活泼，年轻潮流',
  category: 'colorful',
  tokens: {
    accent: '#6366f1',
    accent2: '#ec4899',
    text: '#374151',
    bg: '#ffffff',
    font: '-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '24px', color: '#ffffff', margin: '26px 0 16px', align: 'center',
      wrapStyle: {
        'background': 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)',
        padding: '14px 0', 'border-radius': '12px',
        'text-shadow': '0 2px 4px rgba(0,0,0,0.2)'
      }
    },
    h2: {
      fontSize: '18px', color: '#6366f1', margin: '22px 0 12px',
      pill: { bg: '#eef2ff', color: '#6366f1' }
    },
    h3: {
      fontSize: '15px', color: '#6b7280', margin: '16px 0 10px',
      dot: { color: '#ec4899' }
    },
    p: { fontSize: '15px', lineHeight: '1.9', color: '#374151' },
    quote: {
      solid: { bg: 'linear-gradient(135deg,#eef2ff,#fce7f3)', color: '#4c1d95', radius: '12px' },
      quoteMark: { size: '24px', color: '#8b5cf6' }
    },
    strong: { color: '#8b5cf6' },
    list: { icon: '✦', iconColor: '#ec4899', color: '#374151' },
    divider: { style: 'gradient', grad1: '#6366f1', grad2: '#ec4899' },
    card: {
      bg: 'linear-gradient(135deg,#f5f3ff,#fdf2f8)', radius: '14px', border: 'none',
      shadow: '0 4px 16px rgba(139,92,246,0.12)',
      topAccent: { color: 'linear-gradient(90deg,#6366f1,#ec4899)', height: '5px', radius: '14px 14px 0 0' }
    },
    img: { rounded: '14px', frame: { width: '0', color: '#fff', shadow: '0 6px 20px rgba(139,92,246,0.2)' } },
    table: { headBg: '#6366f1', headColor: '#fff', border: '#e5e7eb', zebra: '#f9fafb' },
    highlight: { bg: '#fce7f3', color: '#9d174d', bold: true },
    headerDeco: function (t) {
      return '<div style="background:linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899);height:6px;border-radius:6px;margin-bottom:18px"></div>';
    }
  }
});

/* ---------- 10. 童话梦幻 fairy ---------- */
registerTemplate('fairy', {
  name: '童话梦幻',
  desc: '粉紫调、圆润泡泡、云朵星星，童话少女风',
  category: 'cute',
  tokens: {
    accent: '#c084fc',
    accent2: '#f9a8d4',
    text: '#6b5b7b',
    bg: '#fff8fc',
    font: '"PingFang SC", "Microsoft YaHei", "Comic Sans MS", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '23px', color: '#c084fc', margin: '26px 0 16px', align: 'center',
      wrapStyle: {
        background: 'linear-gradient(135deg,#fdf2f8,#f3e8ff)', padding: '12px 0',
        'border-radius': '24px', border: '2px solid #f5d0fe'
      }
    },
    h2: {
      fontSize: '18px', color: '#e879a9', margin: '22px 0 12px',
      pill: { bg: '#fce7f3', color: '#be185d' }
    },
    h3: {
      fontSize: '15px', color: '#c084fc', margin: '16px 0 10px',
      dot: { color: '#f9a8d4' }
    },
    p: { fontSize: '15px', lineHeight: '2', color: '#6b5b7b' },
    quote: {
      card: { bg: '#fff5fb', border: '#f5d0fe', radius: '16px', shadow: '0 4px 14px rgba(192,132,252,0.15)' },
      quoteMark: { size: '26px', color: '#f9a8d4' }
    },
    strong: { color: '#e879a9' },
    list: { icon: '✿', iconColor: '#f9a8d4', color: '#6b5b7b' },
    divider: { style: 'asterisk', color: '#f9a8d4' },
    card: {
      bg: '#fff5fb', radius: '18px', border: '2px solid #fce7f3', shadow: '0 4px 14px rgba(249,168,212,0.2)',
      topAccent: { color: 'linear-gradient(90deg,#f9a8d4,#c084fc)', height: '6px', radius: '18px 18px 0 0' }
    },
    img: { rounded: '18px', frame: { width: '5px', color: '#fff', shadow: '0 6px 18px rgba(249,168,212,0.3)' } },
    table: { headBg: '#e879a9', headColor: '#fff', border: '#fbcfe8', zebra: '#fdf2f8' },
    highlight: { bg: '#fdf2f8', color: '#be185d', bold: true },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:16px;color:#f9a8d4;font-size:16px;letter-spacing:6px">☁ ✦ ☁ ✦ ☁</div>';
    }
  }
});
