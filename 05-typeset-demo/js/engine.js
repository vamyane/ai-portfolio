/* ============================================================
 * 公众号排版器 V2 - 模板引擎 v4
 *
 * 设计哲学：模板 = 色板(palette) + 结构组件(style library)
 * - 色板：每个模板定义主色/文字/背景/字体，引擎自动派生整套色阶
 *   （深色/浅色/柔和底/渐变搭档…），模板内所有颜色通过 {accent}
 *   这类占位符引用色板 → 用户换主色时全模板联动，一模板×N色=百种样式
 * - 结构组件库：标题/引用/列表/分隔线/卡片/段落/图片/整文容器
 *   各有多种"结构变体"（色块条、编号、气泡、胶带、双线…），
 *   模板通过 style 字段选择不同结构 → 视觉真正差异化，而非只换色
 *
 * 兼容性：输出全部为 真实元素 + 内联样式（微信可识别、复制不丢失），
 * 不用伪元素；box-shadow/text-shadow 等微信剥离属性仅在预览使用
 * 时降级（复制时剥离并给回退色）。
 * ============================================================ */

/* ---------- 工具函数 ---------- */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* 行内格式解析：==高亮== 、{{字号}} 、**加粗** → 输出带内联样式的 span */
function inlineFormat(text, pal, accentColor) {
  var acc = accentColor || (pal ? pal.accent : '#6366f1');
  var hlBg = pal ? (pal.accentSoft || '#fff3bf') : '#fff3bf';
  var t = esc(text);
  /* {{数字}} 字号 */
  t = t.replace(/\{\{(\d+)\}\}([\s\S]*?)\{\{\/\}\}/g, function (_, size, inner) {
    return '<span style="font-size:' + size + 'px">' + inner + '</span>';
  });
  /* ==高亮== */
  t = t.replace(/==([^=]+)==/g, function (_, inner) {
    return '<span style="background:' + hlBg + ';color:' + (pal && pal.accentDeep ? pal.accentDeep : '#7c3aed') + ';padding:1px 5px;border-radius:4px;font-weight:600">' + inner + '</span>';
  });
  /* **加粗** */
  t = t.replace(/\*\*([^*]+)\*\*/g, function (_, inner) {
    return '<strong style="color:' + acc + '">' + inner + '</strong>';
  });
  return t;
}

function buildStyle(styleObj) {
  if (!styleObj) return '';
  var parts = [];
  for (var k in styleObj) {
    if (!styleObj.hasOwnProperty(k)) continue;
    if (styleObj[k] === null || styleObj[k] === undefined || styleObj[k] === '') continue;
    parts.push(k + ':' + styleObj[k]);
  }
  return parts.join(';');
}

/* ---------- 颜色工具 ---------- */
function hexToRgb(hex) {
  hex = String(hex || '').replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  var n = parseInt(hex, 16);
  if (isNaN(n)) return { r: 99, g: 102, b: 241 };
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgbToHex(r, g, b) {
  function h(v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }
  return '#' + h(r) + h(g) + h(b);
}
function mix(c1, c2, w) {
  var a = hexToRgb(c1), b = hexToRgb(c2);
  return rgbToHex(a.r + (b.r - a.r) * w, a.g + (b.g - a.g) * w, a.b + (b.b - a.b) * w);
}
function shade(hex, pct) { /* pct>0 变亮(向白)，pct<0 变暗(向黑) */
  return pct >= 0 ? mix(hex, '#ffffff', pct / 100) : mix(hex, '#000000', -pct / 100);
}
function tint(hex, pct) { return mix(hex, '#ffffff', pct / 100); }
function alpha(hex, a) {
  var c = hexToRgb(hex);
  return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a + ')';
}
/* 渐变搭档色：色相偏移 + 提亮 */
function gradPair(hex) {
  var c = hexToRgb(hex);
  var r = c.r / 255, g = c.g / 255, b = c.b / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  h = (h + 0.12) % 1;
  s = Math.min(1, s + 0.08);
  l = Math.min(1, l + 0.06);
  function hu2rgb(p, q, t) {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  var p = 2 * l - q;
  return rgbToHex(hu2rgb(p, q, h + 1 / 3) * 255, hu2rgb(p, q, h) * 255, hu2rgb(p, q, h - 1 / 3) * 255);
}

/* 从模板 tokens 构建完整色板 */
function buildPalette(tokens) {
  var accent = tokens.accent || '#6366f1';
  var text = tokens.text || '#444444';
  var bg = tokens.bg || '#ffffff';
  var accent2 = tokens.accent2 || gradPair(accent);
  return {
    accent: accent,
    accent2: accent2,
    accentDark: shade(accent, -18),
    accentDeep: shade(accent, -34),
    accentLight: shade(accent, 14),
    accentSoft: tint(accent, 86),
    accentSofter: tint(accent, 94),
    accentGrad: gradPair(accent),
    accentAlpha: alpha(accent, 0.1),
    text: text,
    textSoft: mix(text, '#ffffff', 0.45),
    textLight: mix(text, '#ffffff', 0.72),
    bg: bg,
    bgSoft: mix(bg, accent, 0.07),
    bgDeep: mix(bg, accent, 0.16),
    font: tokens.font || '-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif'
  };
}

/* 占位符替换：{accent} → 色板值 */
function resolveVars(v, pal) {
  if (typeof v === 'string') {
    return v.replace(/\{(\w+)\}/g, function (m, k) { return pal[k] != null ? pal[k] : m; });
  }
  if (Array.isArray(v)) {
    return v.map(function (x) { return resolveVars(x, pal); });
  }
  if (v && typeof v === 'object') {
    var o = {};
    for (var k in v) { if (v.hasOwnProperty(k)) o[k] = resolveVars(v[k], pal); }
    return o;
  }
  return v;
}

/* ---------- 注册表 ---------- */
var TPL_REGISTRY = {};
var TPL_ORDER = [];

function registerTemplate(id, config) {
  if (TPL_REGISTRY[id]) return;
  TPL_REGISTRY[id] = {
    id: id,
    name: config.name || id,
    desc: config.desc || '',
    category: config.category || 'other',
    contentTip: config.contentTip || '',
    tokens: config.tokens || {},
    decorators: config.decorators || {},
    render: config.render || null,
    demo: config.demo || null
  };
  TPL_ORDER.push(id);
}

/* 获取模板色板（支持自定义颜色覆盖） */
function getTplPalette(tpl, colors) {
  var tokens = tpl.tokens || {};
  var t = {};
  for (var k in tokens) t[k] = tokens[k];
  if (colors) {
    if (colors.accent) t.accent = colors.accent;
    if (colors.text) t.text = colors.text;
    if (colors.bg) t.bg = colors.bg;
  }
  return buildPalette(t);
}

/* ---------- 模板渲染主入口 ----------
 * renderTpl(tpl, content, opts)
 * opts: { colors: {accent,text,bg}, mix: {h1:'tplId', quote:'tplId', ...} }
 */
function renderTpl(tpl, content, opts) {
  opts = opts || {};
  var pal = getTplPalette(tpl, opts.colors || null);
  var d = resolveVars(tpl.decorators || {}, pal);

  /* 混搭：按元素类型替换装饰器来源 */
  function decoFor(type) {
    if (opts.mix && opts.mix[type]) {
      var src = TPL_REGISTRY[opts.mix[type]];
      if (src) {
        /* 用源模板自己的色板解析占位符，保证混搭元素保持源风格 */
        var srcPal = getTplPalette(src, opts.colors || null);
        var sd = resolveVars(src.decorators || {}, srcPal);
        if (sd[type]) return sd[type];
      }
    }
    return d[type] || {};
  }

  var out = [];

  if (d.headerDeco) out.push(typeof d.headerDeco === 'function' ? d.headerDeco(pal) : renderHeaderDeco(d.headerDeco, pal));

  for (var i = 0; i < content.length; i++) {
    var item = content[i];
    switch (item.type) {
      case 'h1': out.push(renderH1(pal, decoFor('h1'), item.text, item.align)); break;
      case 'h2': out.push(renderH2(pal, decoFor('h2'), item.text, item.align)); break;
      case 'h3': out.push(renderH3(pal, decoFor('h3'), item.text, item.align)); break;
      case 'p': out.push(renderP(pal, decoFor('p'), item.text, item.align)); break;
      case 'quote': out.push(renderQuote(pal, decoFor('quote'), item.text, item.align)); break;
      case 'strong': out.push(renderStrong(pal, decoFor('strong'), item.text, item.align)); break;
      case 'img': out.push(renderImg(pal, decoFor('img'), item.src, item.alt)); break;
      case 'num': out.push(renderNum(pal, decoFor('num'), item.text)); break;
      case 'card': out.push(renderCard(pal, decoFor('card'), item.text)); break;
      case 'ul': out.push(renderList(pal, decoFor('list'), item.items, 'ul')); break;
      case 'ol': out.push(renderList(pal, decoFor('list'), item.items, 'ol')); break;
      case 'divider': out.push(renderDivider(pal, decoFor('divider'))); break;
      case 'table': out.push(renderTable(pal, decoFor('table'), item)); break;
      case 'highlight': out.push(renderHighlight(pal, decoFor('highlight'), item.text)); break;
      default: out.push('<p>' + esc(item.text) + '</p>');
    }
  }

  if (d.footerDeco) out.push(typeof d.footerDeco === 'function' ? d.footerDeco(pal) : d.footerDeco);

  var body = out.join('\n');

  /* 整文容器：模板无 container 时自动创建默认容器（背景用 pal.bg，支持自定义背景色联动） */
  var c = d.container;
  if (c && c.style) {
    var cs = {};
    if (c.bg) cs['background'] = c.bg;
    else if (pal.bg) cs['background'] = pal.bg;
    if (c.border) cs['border'] = c.border;
    if (c.radius) cs['border-radius'] = c.radius;
    if (c.padding) cs['padding'] = c.padding;
    if (c.align) cs['text-align'] = c.align;
    if (c.margin) cs['margin'] = c.margin;
    body = '<section style="' + buildStyle(cs) + '">' + body + '</section>';
  } else if (pal.bg) {
    /* 默认容器：仅背景色（+ 最小 padding 保证观感），背景同色时无边框无副作用 */
    body = '<section style="' + buildStyle({ background: pal.bg, padding: '0px' }) + '">' + body + '</section>';
  }
  return body;
}

/* ============ 标题渲染 ============ */

function baseTitleStyle(pal, deco, fontSize, color, margin) {
  return {
    'font-size': deco.fontSize || fontSize,
    'font-weight': deco.fontWeight || 'bold',
    'color': deco.color || color || pal.accent,
    'text-align': deco.align || 'left',
    'margin': deco.margin || margin,
    'line-height': deco.lineHeight || '1.5'
  };
}

function renderH1(pal, d, text, align) {
  var style = baseTitleStyle(pal, d, '22px', pal.text, '26px 0 14px');
  var t = inlineFormat(text, pal);
  var inner;

  switch (d.style) {
    case 'bar': /* 色块标题 */
      inner = '<span style="display:inline-block;background:' + (d.bg || pal.accent) + ';color:' + (d.color || '#fff') + ';padding:' + (d.padding || '10px 22px') + ';border-radius:' + (d.radius || '8px') + ';font-size:' + (d.fontSize || '21px') + ';font-weight:bold;letter-spacing:' + (d.letterSpacing || '2px') + '">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '28px 0 18px') + '">' + inner + '</h1>';
    case 'gradient': /* 渐变条标题 */
      inner = '<span style="display:inline-block;background:' + (d.bg || ('linear-gradient(135deg,' + pal.accent + ',' + pal.accentGrad + ')')) + ';color:' + (d.color || '#fff') + ';padding:' + (d.padding || '10px 22px') + ';border-radius:' + (d.radius || '8px') + ';font-size:' + (d.fontSize || '21px') + ';font-weight:bold;letter-spacing:' + (d.letterSpacing || '2px') + '">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '28px 0 18px') + '">' + inner + '</h1>';
    case 'leftblock': /* 左侧色块 + 文字 */
      inner = '<span style="display:inline-block;width:' + (d.blockW || '6px') + ';height:' + (d.blockH || '24px') + ';background:' + (d.bg || pal.accent) + ';border-radius:3px;vertical-align:middle;margin-right:10px"></span><span style="' + buildStyle(style) + '">' + t + '</span>';
      return '<h1>' + inner + '</h1>';
    case 'pixel': /* 像素风标题：像素边框 + 像素色块 */
      var px = d.pixelSize || '4px';
      inner = '<span style="display:inline-block;background:' + (d.bg || pal.accent) + ';color:' + (d.color || '#fff') + ';padding:' + (d.padding || '10px 18px') + ';font-size:' + (d.fontSize || '20px') + ';font-weight:bold;letter-spacing:1px;box-shadow:' + px + ' ' + px + ' 0 0 ' + (d.shadow || pal.accentDeep || pal.accent) + ';image-rendering:pixelated">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '28px 0 18px') + '">' + inner + '</h1>';
    case 'badge': /* 徽章胶囊标题 */
      inner = '<span style="display:inline-block;background:' + (d.bg || pal.accent) + ';color:' + (d.color || '#fff') + ';padding:' + (d.padding || '6px 24px') + ';border-radius:999px;font-size:' + (d.fontSize || '18px') + ';font-weight:bold;letter-spacing:' + (d.letterSpacing || '3px') + ';box-shadow:0 4px 14px ' + alpha(pal.accent, 0.3) + '">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '26px 0 16px') + '">' + inner + '</h1>';
    case 'underline': /* 大字 + 粗下划线 */
      inner = '<span style="font-size:' + (d.fontSize || '26px') + ';font-weight:800;color:' + (d.color || pal.text) + ';letter-spacing:1px;border-bottom:' + (d.uw || '6px') + ' solid ' + (d.uc || pal.accent) + ';padding-bottom:6px;display:inline-block">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '30px 0 18px') + '">' + inner + '</h1>';
    case 'ribbon': /* 缎带标题：折角色带 */
      inner = '<span style="display:inline-block;background:' + (d.bg || pal.accent) + ';color:' + (d.color || '#fff') + ';padding:' + (d.padding || '8px 26px 8px 18px') + ';font-size:' + (d.fontSize || '19px') + ';font-weight:bold;clip-path:polygon(0 0, 100% 0, calc(100% - 14px) 50%, 100% 100%, 0 100%);position:relative">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '26px 0 16px') + '">' + inner + '</h1>';
    case 'neon': /* 霓虹发光标题 */
      inner = '<span style="font-size:' + (d.fontSize || '24px') + ';font-weight:900;color:' + (d.color || pal.accent) + ';text-shadow:0 0 8px ' + alpha(pal.accent, 0.8) + ',0 0 24px ' + alpha(pal.accent, 0.5) + ';letter-spacing:' + (d.letterSpacing || '2px') + '">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '28px 0 18px') + '">' + inner + '</h1>';
    case 'circle': /* 圆形徽章标题 */
      inner = '<span style="display:inline-flex;align-items:center;justify-content:center;width:' + (d.size || '86px') + ';height:' + (d.size || '86px') + ';border-radius:50%;background:' + (d.bg || pal.accent) + ';color:' + (d.color || '#fff') + ';font-size:' + (d.fontSize || '16px') + ';font-weight:bold;line-height:1.3;text-align:center;padding:8px;box-sizing:border-box">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '26px 0 16px') + '">' + inner + '</h1>';
    case 'lines': /* 左右对称线 */
      inner = '<span style="display:inline-block;width:' + (d.lineW || '44px') + ';height:' + (d.lineH || '1px') + ';background:' + (d.lineColor || pal.accent) + ';vertical-align:middle;margin-right:12px"></span><span style="' + buildStyle(style) + '">' + t + '</span><span style="display:inline-block;width:' + (d.lineW || '44px') + ';height:' + (d.lineH || '1px') + ';background:' + (d.lineColor || pal.accent) + ';vertical-align:middle;margin-left:12px"></span>';
      return '<h1 style="text-align:center;margin:' + (d.margin || '28px 0 18px') + '">' + inner + '</h1>';
    case 'num': /* 编号标题 */
      var n = d.num || '01';
      inner = '<span style="display:inline-block;min-width:' + (d.numSize || '40px') + ';height:' + (d.numSize || '40px') + ';line-height:' + (d.numSize || '40px') + ';text-align:center;background:' + (d.numBg || pal.accent) + ';color:' + (d.numColor || '#fff') + ';font-size:' + (d.numFont || '18px') + ';font-weight:bold;border-radius:' + (d.numRadius || '8px') + ';margin-right:12px;vertical-align:middle">' + esc(n) + '</span><span style="' + buildStyle(style) + '">' + t + '</span>';
      return '<h1>' + inner + '</h1>';
    case 'corner': /* 角标标题 */
      inner = '<span style="border-left:2px solid ' + (d.bg || pal.accent) + ';border-top:2px solid ' + (d.bg || pal.accent) + ';padding:6px 0 0 10px;display:inline-block">' + t + '</span><span style="display:block;border-right:2px solid ' + (d.bg || pal.accent) + ';border-bottom:2px solid ' + (d.bg || pal.accent) + ';height:6px;margin-left:' + (d.offset || '30px') + '"></span>';
      return '<h1 style="margin:' + (d.margin || '28px 0 18px') + '">' + inner + '</h1>';
    case 'bgsoft': /* 柔和底胶囊 */
      inner = '<span style="display:inline-block;background:' + (d.bg || pal.accentSoft) + ';color:' + (d.color || pal.accentDark) + ';padding:' + (d.padding || '6px 16px') + ';border-radius:' + (d.radius || '20px') + ';font-size:' + (d.fontSize || '19px') + ';font-weight:bold">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '28px 0 18px') + '">' + inner + '</h1>';
    case 'double': /* 上下双线 */
      inner = '<span style="display:block;border-top:2px solid ' + (d.lineColor || pal.accent) + ';border-bottom:2px solid ' + (d.lineColor || pal.accent) + ';padding:10px 0;' + buildStyle(style) + '">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '28px 0 18px') + '">' + inner + '</h1>';
    case 'ribbon': /* 缎带横幅 */
      inner = '<span style="display:inline-block;background:' + (d.bg || ('linear-gradient(90deg,' + pal.accentDeep + ',' + pal.accent + ')')) + ';color:' + (d.color || '#fff') + ';padding:' + (d.padding || '10px 26px') + ';font-size:' + (d.fontSize || '20px') + ';font-weight:bold;letter-spacing:' + (d.letterSpacing || '3px') + ';position:relative">' + t + '<span style="display:inline-block;border-left:8px solid ' + (d.tailColor || pal.accentDeep) + ';border-top:8px solid transparent;border-bottom:8px solid transparent;margin-left:14px"></span></span>';
      return '<h1 style="text-align:' + (d.align || 'center') + ';margin:' + (d.margin || '28px 0 18px') + '">' + inner + '</h1>';
    case 'underline': /* 下划线 */
      inner = '<span style="' + buildStyle(style) + ';border-bottom:' + (d.lineW || '3px') + ' solid ' + (d.lineColor || pal.accent) + ';padding-bottom:6px">' + t + '</span>';
      return '<h1 style="text-align:' + (d.align || 'left') + ';margin:' + (d.margin || '26px 0 16px') + '">' + inner + '</h1>';
    case 'tag': /* 左侧竖条 */
      inner = '<span style="' + buildStyle(style) + ';border-left:' + (d.width || '5px') + ' solid ' + (d.bg || pal.accent) + ';padding-left:12px">' + t + '</span>';
      return '<h1>' + inner + '</h1>';
    default: /* 纯文字 */
      if (d.pre || d.post) {
        inner = (d.pre || '') + '<span style="' + buildStyle(style) + '">' + t + '</span>' + (d.post || '');
        return '<h1 style="text-align:' + (d.align || 'left') + ';margin:' + (d.margin || '26px 0 16px') + '">' + inner + '</h1>';
      }
      return '<h1 style="' + buildStyle(style) + '">' + t + '</h1>';
  }
}

function renderH2(pal, d, text, align) {
  var style = baseTitleStyle(pal, d, '18px', pal.text, '22px 0 12px');
  var t = inlineFormat(text, pal);
  var inner;

  switch (d.style) {
    case 'bar':
      inner = '<span style="display:inline-block;background:' + (d.bg || pal.accent) + ';color:' + (d.color || '#fff') + ';padding:' + (d.padding || '6px 14px') + ';border-radius:' + (d.radius || '6px') + ';font-size:' + (d.fontSize || '17px') + ';font-weight:bold">' + t + '</span>';
      return '<h2 style="text-align:' + (d.align || 'left') + ';margin:' + (d.margin || '22px 0 12px') + '">' + inner + '</h2>';
    case 'gradient':
      inner = '<span style="display:inline-block;background:' + (d.bg || ('linear-gradient(90deg,' + pal.accent + ',' + pal.accentGrad + ')')) + ';color:' + (d.color || '#fff') + ';padding:' + (d.padding || '6px 14px') + ';border-radius:' + (d.radius || '6px') + ';font-size:' + (d.fontSize || '17px') + ';font-weight:bold">' + t + '</span>';
      return '<h2 style="text-align:' + (d.align || 'left') + ';margin:' + (d.margin || '22px 0 12px') + '">' + inner + '</h2>';
    case 'leftblock':
      inner = '<span style="display:inline-block;width:' + (d.blockW || '5px') + ';height:' + (d.blockH || '18px') + ';background:' + (d.bg || pal.accent) + ';border-radius:2px;vertical-align:middle;margin-right:8px"></span><span style="' + buildStyle(style) + '">' + t + '</span>';
      return '<h2>' + inner + '</h2>';
    case 'num':
      var n = d.num || '01';
      inner = '<span style="display:inline-block;min-width:' + (d.numSize || '26px') + ';height:' + (d.numSize || '26px') + ';line-height:' + (d.numSize || '26px') + ';text-align:center;background:' + (d.numBg || pal.accent) + ';color:' + (d.numColor || '#fff') + ';font-size:' + (d.numFont || '13px') + ';font-weight:bold;border-radius:' + (d.numRadius || '50%') + ';margin-right:9px;vertical-align:middle">' + esc(n) + '</span><span style="' + buildStyle(style) + '">' + t + '</span>';
      return '<h2>' + inner + '</h2>';
    case 'bgsoft':
      inner = '<span style="display:inline-block;background:' + (d.bg || pal.accentSoft) + ';color:' + (d.color || pal.accentDark) + ';padding:' + (d.padding || '5px 14px') + ';border-radius:' + (d.radius || '14px') + ';font-size:' + (d.fontSize || '16px') + ';font-weight:bold">' + t + '</span>';
      return '<h2 style="text-align:' + (d.align || 'left') + ';margin:' + (d.margin || '22px 0 12px') + '">' + inner + '</h2>';
    case 'lines':
      inner = '<span style="display:inline-block;width:' + (d.lineW || '28px') + ';height:' + (d.lineH || '1px') + ';background:' + (d.lineColor || pal.accent) + ';vertical-align:middle;margin-right:10px"></span><span style="' + buildStyle(style) + '">' + t + '</span><span style="display:inline-block;width:' + (d.lineW || '28px') + ';height:' + (d.lineH || '1px') + ';background:' + (d.lineColor || pal.accent) + ';vertical-align:middle;margin-left:10px"></span>';
      return '<h2 style="text-align:center;margin:' + (d.margin || '22px 0 12px') + '">' + inner + '</h2>';
    case 'underline':
      inner = '<span style="' + buildStyle(style) + ';border-bottom:' + (d.lineW || '2px') + ' solid ' + (d.lineColor || pal.accent) + ';padding-bottom:4px">' + t + '</span>';
      return '<h2>' + inner + '</h2>';
    case 'tag':
      inner = '<span style="' + buildStyle(style) + ';border-left:' + (d.width || '4px') + ' solid ' + (d.bg || pal.accent) + ';padding-left:10px">' + t + '</span>';
      return '<h2>' + inner + '</h2>';
    case 'pill':
      inner = '<span style="display:inline-block;background:' + (d.bg || pal.accent) + ';color:' + (d.color || '#fff') + ';padding:' + (d.padding || '4px 14px') + ';border-radius:20px;font-size:' + (d.fontSize || '15px') + ';font-weight:bold">' + t + '</span>';
      return '<h2 style="text-align:' + (d.align || 'left') + ';margin:' + (d.margin || '22px 0 12px') + '">' + inner + '</h2>';
    case 'corner':
      inner = '<span style="border-left:2px solid ' + (d.bg || pal.accent) + ';border-top:2px solid ' + (d.bg || pal.accent) + ';padding:4px 0 0 8px;display:inline-block">' + t + '</span><span style="display:block;border-right:2px solid ' + (d.bg || pal.accent) + ';border-bottom:2px solid ' + (d.bg || pal.accent) + ';height:4px;margin-left:' + (d.offset || '20px') + '"></span>';
      return '<h2 style="margin:' + (d.margin || '22px 0 12px') + '">' + inner + '</h2>';
    default:
      if (d.pre || d.post) {
        inner = (d.pre || '') + '<span style="' + buildStyle(style) + '">' + t + '</span>' + (d.post || '');
        return '<h2 style="text-align:' + (d.align || 'left') + ';margin:' + (d.margin || '22px 0 12px') + '">' + inner + '</h2>';
      }
      return '<h2 style="' + buildStyle(style) + '">' + t + '</h2>';
  }
}

function renderH3(pal, d, text, align) {
  var style = baseTitleStyle(pal, d, '16px', pal.textSoft, '16px 0 10px');
  style['font-weight'] = d.fontWeight || '600';
  var t = inlineFormat(text, pal);
  var inner;

  switch (d.style) {
    case 'dot':
      inner = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + (d.color || pal.accent) + ';vertical-align:middle;margin-right:8px"></span><span style="' + buildStyle(style) + '">' + t + '</span>';
      return '<h3>' + inner + '</h3>';
    case 'bar':
      inner = '<span style="display:inline-block;width:' + (d.width || '4px') + ';height:' + (d.height || '14px') + ';background:' + (d.color || pal.accent) + ';border-radius:2px;vertical-align:middle;margin-right:8px"></span><span style="' + buildStyle(style) + '">' + t + '</span>';
      return '<h3>' + inner + '</h3>';
    case 'square':
      inner = '<span style="display:inline-block;width:8px;height:8px;background:' + (d.color || pal.accent) + ';border-radius:2px;vertical-align:middle;margin-right:8px"></span><span style="' + buildStyle(style) + '">' + t + '</span>';
      return '<h3>' + inner + '</h3>';
    case 'bgsoft':
      inner = '<span style="display:inline-block;background:' + (d.bg || pal.accentSoft) + ';color:' + (d.color || pal.accentDark) + ';padding:' + (d.padding || '3px 10px') + ';border-radius:' + (d.radius || '10px') + ';font-size:' + (d.fontSize || '14px') + ';font-weight:bold">' + t + '</span>';
      return '<h3>' + inner + '</h3>';
    case 'star':
      inner = '<span style="color:' + (d.color || pal.accent) + ';margin-right:7px;font-size:12px">✦</span><span style="' + buildStyle(style) + '">' + t + '</span>';
      return '<h3>' + inner + '</h3>';
    default:
      return '<h3 style="' + buildStyle(style) + '">' + t + '</h3>';
  }
}

/* ============ 段落渲染 ============ */

function renderP(pal, d, text, align) {
  var style = {
    'font-size': d.fontSize || '15px',
    'line-height': d.lineHeight || '1.9',
    'color': d.color || pal.text,
    'letter-spacing': d.letterSpacing || '0.5px',
    'margin': d.margin || '12px 0',
    'text-align': d.align || 'left'
  };
  if (align) style['text-align'] = align === 'l' ? 'left' : align === 'c' ? 'center' : align === 'r' ? 'right' : 'justify';
  if (align) style['text-align'] = align === 'l' ? 'left' : align === 'c' ? 'center' : align === 'r' ? 'right' : 'justify';
  if (align) style['text-align'] = align === 'l' ? 'left' : align === 'c' ? 'center' : align === 'r' ? 'right' : 'justify';
  if (align) style['text-align'] = align === 'l' ? 'left' : align === 'c' ? 'center' : align === 'r' ? 'right' : 'justify';
  var t = inlineFormat(text, pal);

  if (d.mode === 'indent' || d.indent) style['text-indent'] = '2em';

  if (d.mode === 'center') style['text-align'] = 'center';

  if (d.mode === 'first-letter' && text.length > 1) {
    var first = esc(text.charAt(0));
    var rest = esc(text.slice(1));
    return '<p style="' + buildStyle(style) + '"><span style="float:left;font-size:' + (d.firstLetterSize || '34px') + ';line-height:1;font-weight:bold;color:' + (d.firstLetterColor || pal.accent) + ';margin:3px 8px 0 0">' + first + '</span>' + rest + '</p>';
  }

  if (d.mode === 'bg' || d.bg) {
    style['background'] = d.bg || pal.accentSoft;
    style['padding'] = d.padding || '12px 16px';
    style['border-radius'] = d.radius || '10px';
    style['border-left'] = d.leftBar ? (d.leftBarWidth || '4px') + ' solid ' + (d.leftBarColor || pal.accent) : undefined;
  }

  return '<p style="' + buildStyle(style) + '">' + t + '</p>';
}

/* ============ 引用渲染 ============ */

function renderQuote(pal, d, text, align) {
  var t = inlineFormat(text, pal);
  var inner = t;
  var qm = d.quoteMark ? '<span style="font-size:' + (d.quoteMarkSize || '30px') + ';line-height:1;color:' + (d.quoteMarkColor || pal.accent) + ';font-family:Georgia,serif;display:block;margin-bottom:4px">' + esc(d.quoteMark || '"') + '</span>' : '';

  switch (d.style) {
    case 'bubble': /* 对话气泡 + 小尾巴 */
      return '<div style="background:' + (d.bg || pal.accentSoft) + ';border-radius:' + (d.radius || '12px') + ';padding:' + (d.padding || '14px 16px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + ';border:1px solid ' + (d.border || pal.accentAlpha) + '">' + qm + inner + '<span style="display:block;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:10px solid ' + (d.bg || pal.accentSoft) + ';margin:8px 0 -14px 16px"></span></div>';
    case 'card': /* 卡片引用 */
      return '<div style="border:1px solid ' + (d.border || pal.accent) + ';border-radius:' + (d.radius || '10px') + ';background:' + (d.bg || '#fff') + ';padding:' + (d.padding || '14px 18px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + '">' + qm + inner + '</div>';
    case 'pixelbox': /* 像素边框引用 */
      return '<div style="border:' + (d.border || '3px solid #2d8cf0') + ';background:' + (d.bg || '#eaf2ff') + ';padding:' + (d.padding || '14px 16px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + ';box-shadow:' + (d.shadowSize || '4px') + ' ' + (d.shadowSize || '4px') + ' 0 0 ' + (d.shadow || '#1a3a6b') + '">' + inner + '</div>';
    case 'bookend': /* 上下线书签 */
      return '<div style="border-top:1px solid ' + (d.color || pal.accent) + ';border-bottom:1px solid ' + (d.color || pal.accent) + ';padding:' + (d.padding || '10px 4px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color2 || pal.textSoft) + ';text-align:center">' + inner + '</div>';
    case 'gradient': /* 渐变底引用 */
      return '<div style="background:' + (d.bg || ('linear-gradient(135deg,' + pal.accent + ',' + pal.accentGrad + ')')) + ';border-radius:' + (d.radius || '10px') + ';padding:' + (d.padding || '16px 20px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || '#fff') + '">' + qm + inner + '</div>';
    case 'bigmark': /* 大引号 + 细边 */
      return '<div style="border-left:' + (d.width || '2px') + ' solid ' + (d.color || pal.accent) + ';padding:' + (d.padding || '6px 16px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '15px') + ';line-height:1.9;color:' + (d.color2 || pal.text) + '">' + qm + inner + '</div>';
    case 'solid': /* 实心深底 */
      return '<div style="background:' + (d.bg || pal.accentDark) + ';border-radius:' + (d.radius || '8px') + ';padding:' + (d.padding || '16px 20px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || '#fff') + '">' + qm + inner + '</div>';
    case 'paper': /* 便签纸 */
      return '<div style="background:' + (d.bg || '#fffbe6') + ';border:1px solid ' + (d.border || '#f0e6b6') + ';border-radius:' + (d.radius || '4px') + ';padding:' + (d.padding || '14px 16px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || '#5c5a3a') + ';border-top:3px solid ' + (d.accentBar || pal.accent) + '">' + inner + '</div>';
    default: /* 左侧竖线（经典） */
      return '<blockquote style="border-left:' + (d.width || '4px') + ' solid ' + (d.color || pal.accent) + ';background:' + (d.bg || pal.accentSofter) + ';padding:' + (d.padding || '12px 16px') + ';margin:' + (d.margin || '14px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color2 || pal.text) + ';border-radius:0 6px 6px 0">' + qm + inner + '</blockquote>';
  }
}

/* ============ 强调文字 ============ */

function renderStrong(pal, d, text, align) {
  var style = { 'font-weight': 'bold', 'color': d.color || pal.accent };
  if (align) style['text-align'] = align === 'l' ? 'left' : align === 'c' ? 'center' : align === 'r' ? 'right' : 'justify';
  if (d.bg) style['background'] = d.bg;
  if (d.padding) style['padding'] = d.padding;
  if (d.radius) style['border-radius'] = d.radius;
  if (d.underline) style['border-bottom'] = (d.underlineW || '2px') + ' solid ' + (d.underlineColor || pal.accent);
  return '<strong style="' + buildStyle(style) + '">' + esc(text) + '</strong>';
}

/* ============ 图片 ============ */

function renderImg(pal, d, src, alt) {
  var style = {
    'width': '100%',
    'border-radius': d.radius || '8px',
    'display': 'block',
    'margin': d.margin || '14px 0',
    'box-sizing': 'border-box'
  };
  var caption = d.caption ? '<div style="font-size:12px;color:' + (d.captionColor || pal.textLight) + ';margin-top:6px;text-align:center">' + esc(d.caption) + '</div>' : '';

  switch (d.style) {
    case 'polaroid': /* 拍立得 */
      return '<div style="background:#fff;padding:10px 10px 8px;border-radius:4px;box-shadow:0 2px 10px rgba(0,0,0,0.12);margin:' + (d.margin || '16px 0') + '"><img src="' + esc(src) + '" alt="' + esc(alt || '') + '" style="width:100%;display:block;border-radius:2px" />' + (caption || '<div style="font-size:12px;color:#999;text-align:center;margin-top:8px;font-family:Georgia,serif">' + esc(alt || 'photo') + '</div>') + '</div>';
    case 'circle':
      style['border-radius'] = '50%';
      style['width'] = d.size || '70%';
      style['margin-left'] = 'auto';
      style['margin-right'] = 'auto';
      return '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" style="' + buildStyle(style) + '" />' + caption;
    case 'frame': /* 边框相框 */
      style['border'] = (d.borderW || '4px') + ' solid ' + (d.borderColor || '#fff');
      style['box-shadow'] = '0 0 0 1px ' + (d.ringColor || pal.accent) + ', 0 4px 14px rgba(0,0,0,0.12)';
      return '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" style="' + buildStyle(style) + '" />' + caption;
    default:
      if (d.frame) {
        style['border'] = (d.frame.width || '4px') + ' solid ' + (d.frame.color || '#fff');
      }
      return '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" style="' + buildStyle(style) + '" />' + caption;
  }
}

function renderNum(pal, d, text) {
  var style = {
    'font-size': d.fontSize || '30px',
    'font-weight': 'bold',
    'color': d.color || pal.accent,
    'text-align': 'center',
    'margin': '18px 0'
  };
  return '<div style="' + buildStyle(style) + '">' + esc(text) + '</div>';
}

/* ============ 卡片 ============ */

function renderCard(pal, d, text) {
  var t = esc(text);
  switch (d.style) {
    case 'gradient': /* 渐变卡片 */
      return '<div style="background:' + (d.bg || ('linear-gradient(135deg,' + pal.accent + ',' + pal.accentGrad + ')')) + ';border-radius:' + (d.radius || '14px') + ';padding:' + (d.padding || '18px 20px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || '#fff') + '">' + t + '</div>';
    case 'topbar': /* 顶部色条 */
      return '<div style="margin:' + (d.margin || '16px 0') + ';border-radius:' + (d.radius || '12px') + ';overflow:hidden;border:1px solid ' + (d.border || '#eee') + '"><div style="height:' + (d.barH || '5px') + ';background:' + (d.barBg || pal.accent) + '"></div><div style="background:' + (d.bg || '#fff') + ';padding:' + (d.padding || '16px 18px') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + '">' + t + '</div></div>';
    case 'dashed': /* 虚线卡片 */
      return '<div style="border:1px dashed ' + (d.border || pal.accent) + ';border-radius:' + (d.radius || '10px') + ';padding:' + (d.padding || '14px 16px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + ';background:' + (d.bg || 'transparent') + '">' + t + '</div>';
    case 'pixelbox': /* 像素边框卡片 */
      return '<div style="border:' + (d.border || '3px solid #67c23a') + ';background:' + (d.bg || '#f0f9eb') + ';padding:' + (d.padding || '16px 18px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + ';box-shadow:' + (d.shadowSize || '4px') + ' ' + (d.shadowSize || '4px') + ' 0 0 ' + (d.shadow || '#2d5a1e') + '">' + t + '</div>';
    case 'doodle': /* 手绘虚线卡片 */
      return '<div style="border:2px dashed ' + (d.border || '#ff6b6b') + ';border-radius:' + (d.radius || '14px') + ';background:' + (d.bg || '#fff8f0') + ';padding:' + (d.padding || '16px 18px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + ';transform:rotate(' + (d.rotate || '-0.5deg') + ')">' + t + '</div>';
    case 'double': /* 双线卡片 */
      return '<div style="border:1px solid ' + (d.border || pal.accent) + ';outline:1px solid ' + (d.border2 || pal.accentAlpha) + ';outline-offset:3px;border-radius:' + (d.radius || '10px') + ';padding:' + (d.padding || '14px 16px') + ';margin:' + (d.margin || '18px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + '">' + t + '</div>';
    case 'leftbar': /* 左竖线卡片 */
      return '<div style="border-left:' + (d.barW || '5px') + ' solid ' + (d.barColor || pal.accent) + ';background:' + (d.bg || pal.accentSoft) + ';border-radius:' + (d.radius || '0 10px 10px 0') + ';padding:' + (d.padding || '14px 16px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + '">' + t + '</div>';
    case 'soft': /* 柔和圆角卡 */
      return '<div style="background:' + (d.bg || pal.accentSoft) + ';border-radius:' + (d.radius || '12px') + ';padding:' + (d.padding || '16px 18px') + ';margin:' + (d.margin || '16px 0') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + '">' + t + '</div>';
    case 'title': /* 带标题卡片 */
      return '<div style="background:' + (d.bg || '#fff') + ';border-radius:' + (d.radius || '12px') + ';margin:' + (d.margin || '16px 0') + ';border:1px solid ' + (d.border || '#eee') + ';overflow:hidden"><div style="background:' + (d.titleBg || pal.accent) + ';color:' + (d.titleColor || '#fff') + ';padding:10px 18px;font-weight:bold;font-size:15px">' + esc(d.title || '') + '</div><div style="padding:' + (d.padding || '16px 18px') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + '">' + t + '</div></div>';
    default: /* 普通卡片 */
      return '<div style="background:' + (d.bg || pal.accentSofter) + ';border-radius:' + (d.radius || '12px') + ';padding:' + (d.padding || '16px 18px') + ';margin:' + (d.margin || '16px 0') + ';border:1px solid ' + (d.border || 'transparent') + ';font-size:' + (d.fontSize || '14px') + ';line-height:1.8;color:' + (d.color || pal.text) + '">' + t + '</div>';
  }
}

/* ============ 列表 ============ */

function renderList(pal, d, items, type) {
  var style = {
    'font-size': d.fontSize || '15px',
    'line-height': '1.9',
    'color': d.color || pal.text,
    'padding-left': '0',
    'margin': d.margin || '12px 0',
    'list-style': 'none'
  };
  var itemStyle = { 'margin': '8px 0', 'padding-left': d.padLeft || '26px', 'position': 'relative' };
  var icon = d.icon || (type === 'ol' ? null : '•');
  var iconColor = d.iconColor || pal.accent;
  var out = [];
  var tag = type === 'ol' ? 'ol' : 'ul';
  var i;

  for (i = 0; i < items.length; i++) {
    var li;
    if (type === 'ol') {
      if (d.style === 'badge' || d.style === 'circle') {
        /* 圆圈编号 */
        li = '<li style="' + buildStyle(itemStyle) + '"><span style="display:inline-block;min-width:' + (d.badgeSize || '24px') + ';height:' + (d.badgeSize || '24px') + ';line-height:' + (d.badgeSize || '24px') + ';text-align:center;background:' + (d.badgeBg || pal.accent) + ';color:' + (d.badgeColor || '#fff') + ';font-size:' + (d.badgeFont || '12px') + ';font-weight:bold;border-radius:' + (d.style === 'circle' ? '50%' : '6px') + ';margin-right:8px;vertical-align:middle">' + (i + 1) + '</span>' + esc(items[i]) + '</li>';
      } else if (d.style === 'square') {
        li = '<li style="' + buildStyle(itemStyle) + '"><span style="display:inline-block;width:10px;height:10px;background:' + (d.iconColor || pal.accent) + ';border-radius:2px;margin-right:8px;vertical-align:middle"></span>' + esc(items[i]) + '</li>';
      } else {
        li = '<li style="' + buildStyle(itemStyle) + '"><span style="display:inline-block;color:' + iconColor + ';font-weight:bold;margin-right:8px">' + (i + 1) + '.</span>' + esc(items[i]) + '</li>';
      }
    } else {
      li = '<li style="' + buildStyle(itemStyle) + '"><span style="color:' + iconColor + ';margin-right:8px;font-size:' + (d.iconSize || '13px') + '">' + esc(icon) + '</span>' + esc(items[i]) + '</li>';
    }
    out.push(li);
  }
  return '<' + tag + ' style="' + buildStyle(style) + '">' + out.join('') + '</' + tag + '>';
}

/* ============ 分隔线 ============ */

function renderDivider(pal, d) {
  var c = d.color || pal.accent;
  var gap = d.margin || '22px 0';
  switch (d.style) {
    case 'line':
      return '<div style="margin:' + gap + ';border-top:1px solid ' + c + '"></div>';
    case 'dashed':
      return '<div style="margin:' + gap + ';border-top:1px dashed ' + c + '"></div>';
    case 'double':
      return '<div style="margin:' + gap + ';border-top:2px solid ' + c + ';border-bottom:1px solid ' + c + ';height:3px"></div>';
    case 'gradient':
      return '<div style="margin:' + gap + ';height:' + (d.height || '3px') + ';border-radius:2px;background:linear-gradient(90deg,' + (d.grad1 || pal.accent) + ',' + (d.grad2 || pal.accentGrad) + ')"></div>';
    case 'diamond':
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '14px') + ';letter-spacing:' + (d.letterSpacing || '10px') + '">◆ ◆ ◆</div>';
    case 'flower':
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '15px') + ';letter-spacing:' + (d.letterSpacing || '8px') + '">✿ ✿ ✿</div>';
    case 'star':
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '14px') + ';letter-spacing:' + (d.letterSpacing || '10px') + '">✦ ✦ ✦</div>';
    case 'heart':
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '14px') + ';letter-spacing:' + (d.letterSpacing || '10px') + '">♥ ♥ ♥</div>';
    case 'pixel': /* 像素分隔线 */
      return '<div style="margin:' + gap + ';display:flex;align-items:center;justify-content:center;gap:' + (d.gap || '6px') + '"><span style="display:inline-block;width:' + (d.sq || '8px') + ';height:' + (d.sq || '8px') + ';background:' + c + ';box-shadow:' + (d.sq || '8px') + ' ' + (d.sq || '8px') + ' 0 0 ' + (d.shadow || pal.accentDeep || c) + '"></span><span style="display:inline-block;width:' + (d.sq || '8px') + ';height:' + (d.sq || '8px') + ';background:' + c + ';box-shadow:' + (d.sq || '8px') + ' ' + (d.sq || '8px') + ' 0 0 ' + (d.shadow || pal.accentDeep || c) + '"></span><span style="display:inline-block;width:' + (d.sq || '8px') + ';height:' + (d.sq || '8px') + ';background:' + c + ';box-shadow:' + (d.sq || '8px') + ' ' + (d.sq || '8px') + ' 0 0 ' + (d.shadow || pal.accentDeep || c) + '"></span></div>';
    case 'doodle': /* 手绘波浪线 */
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '16px') + ';letter-spacing:' + (d.letterSpacing || '6px') + '">~ ~ ~</div>';
    case 'leaf': /* 叶子分隔 */
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '15px') + ';letter-spacing:' + (d.letterSpacing || '8px') + '">❀ ── ❀</div>';
    case 'wave': /* 波浪分隔 */
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '16px') + ';letter-spacing:' + (d.letterSpacing || '5px') + '">∿∿∿</div>';
    case 'dots': /* 圆点分隔 */
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '12px') + ';letter-spacing:' + (d.letterSpacing || '12px') + '">● ● ●</div>';
    case 'wave':
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '18px') + ';letter-spacing:' + (d.letterSpacing || '6px') + '">〜〜〜</div>';
    case 'dots':
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '13px') + ';letter-spacing:' + (d.letterSpacing || '6px') + '">···</div>';
    case 'centertext': /* 左右线 + 中间文字 */
      return '<div style="margin:' + gap + ';display:flex;align-items:center;text-align:center"><span style="flex:1;border-top:1px solid ' + c + '"></span><span style="padding:0 12px;color:' + (d.textColor || pal.textSoft) + ';font-size:' + (d.fontSize || '13px') + ';letter-spacing:2px">' + esc(d.text || '·') + '</span><span style="flex:1;border-top:1px solid ' + c + '"></span></div>';
    case 'leaf':
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '16px') + ';letter-spacing:' + (d.letterSpacing || '10px') + '">❧ ❧ ❧</div>';
    default:
      return '<div style="margin:' + gap + ';text-align:center;color:' + c + ';font-size:' + (d.fontSize || '12px') + ';letter-spacing:6px">···</div>';
  }
}

/* ============ 表格 ============ */

function renderTable(pal, d, item) {
  var headBg = d.headBg || pal.accent;
  var headColor = d.headColor || '#fff';
  var rows = item.rows || [];
  var cols = item.cols || 0;
  var header = item.header || [];
  var out = [];
  var i, j;

  if (!cols && rows.length) cols = rows[0].length;

  out.push('<table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:14px;line-height:1.7">');

  if (header && header.length) {
    out.push('<thead><tr>');
    for (j = 0; j < header.length; j++) {
      out.push('<th style="background:' + headBg + ';color:' + headColor + ';padding:10px 12px;border:1px solid ' + (d.border || pal.accentAlpha) + ';text-align:' + (d.headAlign || 'left') + ';font-weight:bold">' + esc(header[j]) + '</th>');
    }
    out.push('</tr></thead>');
  }

  out.push('<tbody>');
  for (i = 0; i < rows.length; i++) {
    out.push('<tr>');
    for (j = 0; j < cols; j++) {
      var cell = rows[i][j];
      var tdStyle = 'padding:10px 12px;border:1px solid ' + (d.border || pal.accentAlpha) + ';text-align:' + (d.align || 'left');
      if (i % 2 === 1 && d.zebra) tdStyle += ';background:' + d.zebra;
      out.push('<td style="' + tdStyle + '">' + esc(cell) + '</td>');
    }
    out.push('</tr>');
  }
  out.push('</tbody></table>');
  return out.join('');
}

function renderHighlight(pal, d, text) {
  var style = {
    'background': d.bg || '#fff3bf',
    'color': d.color || '#5c4400',
    'padding': d.padding || '2px 6px',
    'border-radius': d.radius || '3px',
    'font-weight': d.bold ? 'bold' : 'normal'
  };
  return '<span style="' + buildStyle(style) + '">' + esc(text) + '</span>';
}

/* ============ 页头/页脚装饰 ============ */

function renderHeaderDeco(cfg, pal) {
  if (typeof cfg === 'string') return cfg;
  var text = esc(cfg.text || '');
  var color = cfg.color || pal.accent;
  var ls = cfg.letterSpacing || '3px';
  var fs = cfg.fontSize || '12px';
  var margin = cfg.margin || '4px 0 16px';

  switch (cfg.style) {
    case 'seal': /* 印章 */
      return '<div style="text-align:center;margin:' + margin + '"><span style="display:inline-block;width:' + (cfg.size || '58px') + ';height:' + (cfg.size || '58px') + ';border:2px solid ' + color + ';border-radius:50%;color:' + color + ';font-size:' + (cfg.textSize || '24px') + ';line-height:' + (cfg.size ? (parseInt(cfg.size) - 4) + 'px' : '54px') + ';text-align:center;font-family:STKaiti,serif;font-weight:bold">' + text + '</span></div>';
    case 'center': /* 居中文字 + 装饰线 */
      if (cfg.doubleBorder) {
        return '<div style="text-align:center;border-top:2px solid ' + color + ';border-bottom:2px solid ' + color + ';padding:7px 0;margin:' + margin + ';letter-spacing:' + ls + ';color:' + color + ';font-size:' + fs + ';font-weight:bold">' + text + '</div>';
      }
      return '<div style="text-align:center;margin:' + margin + ';letter-spacing:' + ls + ';color:' + color + ';font-size:' + fs + ';font-weight:' + (cfg.bold === false ? 'normal' : 'bold') + '">' + text + '</div>';
    case 'left': /* 左对齐终端风格 */
      return '<div style="margin:' + margin + ';color:' + color + ';font-size:' + fs + ';font-family:monospace;letter-spacing:1px">' + text + '</div>';
    default: /* 居中文字 + 两侧细线 */
      return '<div style="display:flex;align-items:center;text-align:center;margin:' + margin + '"><span style="flex:1;border-top:1px solid ' + color + '"></span><span style="padding:0 12px;color:' + color + ';font-size:' + fs + ';letter-spacing:' + ls + ';font-weight:bold">' + text + '</span><span style="flex:1;border-top:1px solid ' + color + '"></span></div>';
  }
}

/* ============ 模板 demo 生成 ============ */

function defaultDemo(tpl) {
  /* 紧凑 demo：标题/小标题/正文/引用/列表/分隔线/卡片，缩略图看得清结构差异 */
  var content = [
    { type: 'h1', text: '大标题' },
    { type: 'h2', text: '小标题' },
    { type: 'p', text: '正文段落内容排版效果展示。' },
    { type: 'quote', text: '引用内容：重点强调。' },
    { type: 'ul', items: ['列表项一', '列表项二'] },
    { type: 'divider' },
    { type: 'card', text: '卡片区域' }
  ];
  return renderTpl(tpl, content);
}

function getDemo(tpl) {
  if (tpl.demo) return tpl.demo();
  return defaultDemo(tpl);
}

/* 渲染模板卡片缩略图 */
function renderTplPreview(tpl) {
  return getDemo(tpl);
}

window.TPL_REGISTRY = TPL_REGISTRY;
window.TPL_ORDER = TPL_ORDER;
window.renderTpl = renderTpl;
window.getDemo = getDemo;
window.getTplPalette = getTplPalette;
window.buildPalette = buildPalette;
window.esc = esc;
window.buildStyle = buildStyle;
window.mix = mix;
window.shade = shade;
window.tint = tint;
window.alpha = alpha;
window.gradPair = gradPair;
