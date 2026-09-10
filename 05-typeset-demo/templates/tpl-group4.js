/* ============================================================
 * 公众号排版器 V2 - 模板组 4：5 套
 * 16. porcelain   青花瓷韵    —— 白瓷底、青花蓝、釉色边框
 * 17. terminal    极客终端    —— 黑底绿字、终端光标、黑客风
 * 18. ocean       海洋物语    —— 海浪、蓝色渐变、清新治愈
 * 19. sakura      樱花和风    —— 粉樱、和风、柔美淡雅
 * 20. mono        极简黑白    —— 大字号、纯黑白、设计感
 * ============================================================ */

/* ---------- 16. 青花瓷韵 porcelain ---------- */
registerTemplate('porcelain', {
  name: '青花瓷韵',
  desc: '白瓷底、青花蓝、釉色边框，典雅东方美',
  category: 'chinese',
  tokens: {
    accent: '#1e5aa8',
    accent2: '#3b82c4',
    text: '#1f3a5f',
    bg: '#f8fbfe',
    font: '"Songti SC", "SimSun", "STSong", serif'
  },
  decorators: {
    h1: {
      fontSize: '24px', color: '#1e5aa8', margin: '28px 0 18px', align: 'center',
      pre: '<span style="display:inline-block;width:28px;height:2px;background:#3b82c4;vertical-align:middle;margin-right:10px"></span>',
      post: '<span style="display:inline-block;width:28px;height:2px;background:#3b82c4;vertical-align:middle;margin-left:10px"></span>'
    },
    h2: {
      fontSize: '18px', color: '#1e5aa8', margin: '22px 0 12px',
      tag: { width: '4px', color: '#3b82c4' }
    },
    h3: {
      fontSize: '15px', color: '#4169a8', margin: '16px 0 10px',
      dot: { color: '#1e5aa8' }
    },
    p: { fontSize: '15px', lineHeight: '2.05', color: '#1f3a5f' },
    quote: {
      solid: { bg: '#eaf2fc', color: '#1e3a5f', radius: '6px' },
      quoteMark: { size: '28px', color: '#3b82c4' }
    },
    strong: { color: '#1e5aa8', underline: { color: '#3b82c4' } },
    list: { icon: '❖', iconColor: '#3b82c4', color: '#1f3a5f' },
    divider: { style: 'diamond', color: '#3b82c4' },
    card: { bg: '#eaf2fc', radius: '8px', border: '1px solid #c3d9f0', shadow: 'none', leftBar: { width: '4px', color: '#1e5aa8' } },
    img: { frame: { width: '3px', color: '#c3d9f0', shadow: '0 3px 10px rgba(30,90,168,0.15)' }, radius: '6px' },
    table: { headBg: '#1e5aa8', headColor: '#f8fbfe', border: '#c3d9f0', zebra: '#eef5fc' },
    highlight: { bg: '#dbeafe', color: '#1e3a8a', bold: true },
    headerDeco: function (t) {
      return '<div style="text-align:center;border:2px solid #3b82c4;border-radius:50%;width:56px;height:56px;line-height:52px;margin:0 auto 16px;color:#1e5aa8;font-size:22px">青</div>';
    }
  }
});

/* ---------- 17. 极客终端 terminal ---------- */
registerTemplate('terminal', {
  name: '极客终端',
  desc: '黑底绿字、终端光标、代码风，黑客极客风',
  category: 'tech',
  tokens: {
    accent: '#00ff41',
    accent2: '#00b33c',
    text: '#00ff41',
    bg: '#0d1117',
    font: '"Consolas", "Courier New", "SF Mono", monospace'
  },
  decorators: {
    h1: {
      fontSize: '22px', color: '#00ff41', margin: '26px 0 16px',
      pre: '<span style="color:#00b33c">$ </span>',
      wrapStyle: { 'text-shadow': '0 0 8px rgba(0,255,65,0.5)' }
    },
    h2: {
      fontSize: '17px', color: '#00ff41', margin: '22px 0 12px',
      pre: '<span style="color:#00b33c">## </span>'
    },
    h3: {
      fontSize: '14px', color: '#7ee787', margin: '16px 0 10px',
      pre: '<span style="color:#00b33c"># </span>'
    },
    p: { fontSize: '14px', lineHeight: '1.9', color: '#c9d1d9' },
    quote: {
      solid: { bg: '#161b22', color: '#00ff41', radius: '4px' },
      pre: '<span style="color:#00b33c">│ </span>'
    },
    strong: { color: '#00ff41', bg: 'rgba(0,255,65,0.12)', padding: '1px 6px', radius: '3px' },
    list: { icon: '❯', iconColor: '#00ff41', color: '#c9d1d9' },
    divider: { style: 'line', color: '#30363d' },
    card: { bg: '#161b22', radius: '6px', border: '1px solid #30363d', shadow: 'none', leftBar: { width: '3px', color: '#00ff41' } },
    img: { frame: { width: '1px', color: '#30363d', shadow: '0 0 14px rgba(0,255,65,0.2)' }, radius: '4px' },
    table: { headBg: '#21262d', headColor: '#00ff41', border: '#30363d', zebra: '#161b22' },
    highlight: { bg: 'rgba(0,255,65,0.15)', color: '#00ff41', bold: true },
    headerDeco: function (t) {
      return '<div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:10px 14px;margin-bottom:18px;font-size:12px;color:#00ff41"><span style="color:#ff6b6b">root@wechat</span><span style="color:#c9d1d9">:</span><span style="color:#58a6ff">~</span><span style="color:#c9d1d9">$ </span><span style="background:#00ff41;display:inline-block;width:8px;height:14px;vertical-align:middle;animation:blink 1s infinite"> </span></div>';
    }
  }
});

/* ---------- 18. 海洋物语 ocean ---------- */
registerTemplate('ocean', {
  name: '海洋物语',
  desc: '海浪波纹、蓝绿渐变、清新治愈，海洋风',
  category: 'colorful',
  tokens: {
    accent: '#0ea5e9',
    accent2: '#2dd4bf',
    text: '#164e63',
    bg: '#f0f9ff',
    font: '-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '24px', color: '#0369a1', margin: '26px 0 16px',
      wrapStyle: { 'border-left': '6px solid #0ea5e9', background: 'linear-gradient(90deg,#e0f2fe,#f0fdfa)', padding: '10px 14px', 'border-radius': '0 12px 12px 0' }
    },
    h2: {
      fontSize: '18px', color: '#0369a1', margin: '22px 0 12px',
      pill: { bg: '#e0f2fe', color: '#0369a1' }
    },
    h3: {
      fontSize: '15px', color: '#0f766e', margin: '16px 0 10px',
      dot: { color: '#2dd4bf' }
    },
    p: { fontSize: '15px', lineHeight: '1.95', color: '#164e63' },
    quote: {
      solid: { bg: 'linear-gradient(135deg,#e0f2fe,#ccfbf1)', color: '#0c4a6e', radius: '12px' },
      quoteMark: { size: '24px', color: '#0ea5e9' }
    },
    strong: { color: '#0ea5e9' },
    list: { icon: '≋', iconColor: '#0ea5e9', color: '#164e63' },
    divider: { style: 'wave', color: '#0ea5e9' },
    card: { bg: '#e0f2fe', radius: '14px', border: '1px solid #bae6fd', shadow: '0 3px 12px rgba(14,165,233,0.12)', topAccent: { color: 'linear-gradient(90deg,#0ea5e9,#2dd4bf)', height: '5px', radius: '14px 14px 0 0' } },
    img: { rounded: '14px', frame: { width: '0', color: '#fff', shadow: '0 5px 16px rgba(14,165,233,0.2)' } },
    table: { headBg: '#0369a1', headColor: '#fff', border: '#bae6fd', zebra: '#f0f9ff' },
    highlight: { bg: '#cffafe', color: '#155e75', bold: true },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:16px;color:#0ea5e9;font-size:16px;letter-spacing:8px">≋ ≋ ≋</div>';
    }
  }
});

/* ---------- 19. 樱花和风 sakura ---------- */
registerTemplate('sakura', {
  name: '樱花和风',
  desc: '粉樱色调、和风线条、柔美淡雅，日式风',
  category: 'cute',
  tokens: {
    accent: '#f472b6',
    accent2: '#f9a8d4',
    text: '#6b4a5a',
    bg: '#fffbfd',
    font: '"PingFang SC", "Microsoft YaHei", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '23px', color: '#db2777', margin: '26px 0 16px', align: 'center',
      pre: '<span style="color:#f9a8d4;margin-right:8px">🌸</span>',
      post: '<span style="color:#f9a8d4;margin-left:8px">🌸</span>'
    },
    h2: {
      fontSize: '18px', color: '#db2777', margin: '22px 0 12px',
      underline: { width: '2px', color: '#f9a8d4' }
    },
    h3: {
      fontSize: '15px', color: '#a8637f', margin: '16px 0 10px',
      dot: { color: '#f472b6' }
    },
    p: { fontSize: '15px', lineHeight: '2.05', color: '#6b4a5a' },
    quote: {
      card: { bg: '#fdf2f8', border: '1px solid #fbcfe8', radius: '12px', shadow: '0 3px 12px rgba(244,114,182,0.12)' },
      quoteMark: { size: '26px', color: '#f9a8d4' }
    },
    strong: { color: '#ec4899' },
    list: { icon: '❀', iconColor: '#f472b6', color: '#6b4a5a' },
    divider: { style: 'asterisk', color: '#f9a8d4' },
    card: { bg: '#fdf2f8', radius: '14px', border: '1px solid #fce7f3', shadow: '0 3px 12px rgba(244,114,182,0.1)' },
    img: { rounded: '14px', frame: { width: '5px', color: '#fff', shadow: '0 5px 16px rgba(244,114,182,0.25)' } },
    table: { headBg: '#ec4899', headColor: '#fff', border: '#fbcfe8', zebra: '#fdf2f8' },
    highlight: { bg: '#fce7f3', color: '#9d174d', bold: true },
    headerDeco: function (t) {
      return '<div style="text-align:center;margin-bottom:16px;color:#f9a8d4;font-size:14px;letter-spacing:6px">❀ 桜 ❀</div>';
    }
  }
});

/* ---------- 20. 极简黑白 mono ---------- */
registerTemplate('mono', {
  name: '极简黑白',
  desc: '超大字号、纯黑白、几何线条，设计杂志感',
  category: 'elegant',
  tokens: {
    accent: '#000000',
    accent2: '#555555',
    text: '#111111',
    bg: '#ffffff',
    font: '"Helvetica Neue", Arial, "PingFang SC", sans-serif'
  },
  decorators: {
    h1: {
      fontSize: '30px', color: '#000', margin: '30px 0 18px',
      wrapStyle: { 'letter-spacing': '1px', 'font-weight': '800' }
    },
    h2: {
      fontSize: '20px', color: '#000', margin: '24px 0 14px',
      number: { bg: '#000', color: '#fff', size: '30px', fontSize: '15px', text: '01' }
    },
    h3: {
      fontSize: '16px', color: '#333', margin: '16px 0 10px',
      bar: { width: '24px', height: '2px', color: '#000' }
    },
    p: { fontSize: '16px', lineHeight: '1.85', color: '#111' },
    quote: {
      width: '0', bg: '#000', textColor: '#fff', padding: '18px 22px', radius: '0',
      quoteMark: { size: '24px', color: '#fff' }
    },
    strong: { color: '#fff', bg: '#000', padding: '1px 6px', radius: '0' },
    list: { icon: '—', iconColor: '#000', color: '#111' },
    divider: { style: 'line', color: '#000' },
    card: { bg: '#fff', radius: '0', border: '2px solid #000', shadow: 'none' },
    img: { radius: '0', frame: { width: '0', color: '#fff', shadow: 'none' } },
    table: { headBg: '#000', headColor: '#fff', border: '#000', zebra: '#f5f5f5' },
    highlight: { bg: '#000', color: '#fff', bold: true },
    headerDeco: function (t) {
      return '<div style="border-top:4px solid #000;border-bottom:1px solid #000;padding:6px 0;margin-bottom:20px;font-size:11px;letter-spacing:10px;color:#000;text-align:center">BLACK &amp; WHITE</div>';
    }
  }
});
