/* ============================================================
 * 公众号排版器 V2 - 应用逻辑
 * 自己实现，不复用旧代码。
 * 功能：模板切换、实时预览、手机预览、一键复制（微信兼容）、
 *       自定义配色、混搭模式、插入工具、KaTeX 公式、分享、缩放
 * ============================================================ */

/* ---------- 全局状态 ---------- */
var state = {
  curTpl: 'minimal',          // 当前模板
  curCategory: 'all',         // 当前分类
  customColors: null,         // 自定义颜色 null=使用模板默认
  wxCompat: true,             // 微信兼容模式
  previewScale: 1,            // 预览缩放
  stackTpls: [],              // 堆叠模板列表
  stackIndex: 0,
  mixMode: false,             // 混搭模式
  mixOverrides: {},           // 混搭覆盖
  tableTpl: 'default',
  imgStyle: 'default',
  imgCaption: '',
  // 编辑区示例内容（用于展示）
  sampleContent: [
    { type: 'h1', text: '这是大标题' },
    { type: 'p', text: '这里是正文内容，展示文章的段落排版效果。公众号排版工具可以让你的文章更加美观易读，提升读者的阅读体验。' },
    { type: 'h2', text: '二级小标题' },
    { type: 'p', text: '第二段正文，用于展示段落之间的间距与阅读节奏。合理使用标题可以让文章结构更清晰。' },
    { type: 'quote', text: '引用内容：值得被强调的句子，可以引起读者的注意和思考。' },
    { type: 'strong', text: '重点强调文字' },
    { type: 'p', text: '正文继续，这里展示重点文字在段落中的呈现效果。' },
    { type: 'card', text: '卡片内容区域，适合展示重点信息、注意事项或公告提示。' },
    { type: 'ul', items: ['列表项目一：简洁明了', '列表项目二：重点突出', '列表项目三：层次清晰'] },
    { type: 'ol', items: ['第一步：打开排版器', '第二步：选择模板', '第三步：一键复制'] },
    { type: 'divider' },
    { type: 'h2', text: '表格示例' },
    { type: 'p', text: '表格可以用于展示数据对比、步骤说明等结构化内容。' }
  ]
};

/* ---------- KaTeX 公式渲染 ---------- */
function renderMath(text) {
  if (typeof renderMathInElement !== 'function') return esc(text);
  var div = document.createElement('div');
  div.style.display = 'inline';
  div.textContent = text;
  try {
    renderMathInElement(div, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  } catch (e) {}
  return div.innerHTML;
}

/* ---------- 微信兼容处理 ---------- */
function stripWxUnsupported(html) {
  /* 微信公众平台不支持的 CSS 属性，剥离之 */
  var UNSUPPORTED = [
    'background-clip', '-webkit-background-clip', '-webkit-text-fill-color',
    'text-shadow', 'box-shadow', '-webkit-gradient',
    'filter', 'backdrop-filter', 'clip-path'
  ];
  UNSUPPORTED.forEach(function (prop) {
    var re = new RegExp(prop + '\\s*:[^;]+;?', 'gi');
    html = html.replace(re, '');
  });
  return html;
}

/* ---------- 复制到剪贴板（微信兼容） ---------- */
function buildCopyHTML(content, tplId) {
  var tpl = TPL_REGISTRY[tplId];
  if (!tpl) return '';

  // 如果内容为空，用示例内容
  var data = (content && content.length > 0) ? content : state.sampleContent;

  // 渲染 HTML
  var raw = renderTpl(tpl, data, {
    colors: state.customColors,
    mix: state.mixMode ? state.mixOverrides : null
  });

  // 处理 KaTeX
  raw = raw.replace(/\$\$(.*?)\$\$/g, function (m, eq) {
    try {
      return katex.renderToString(eq, { displayMode: true, throwOnError: false });
    } catch (e) { return m; }
  });
  raw = raw.replace(/\$(.*?)\$/g, function (m, eq) {
    try {
      return katex.renderToString(eq, { displayMode: false, throwOnError: false });
    } catch (e) { return m; }
  });

  // 微信兼容：剥离不支持属性
  if (state.wxCompat) {
    raw = stripWxUnsupported(raw);
    // 渐变文字属性剥离后给一个回退色
    raw = raw.replace(/(style="[^"]*)background-clip[^"]*"/g, '$1"');
    raw = raw.replace(/(style="[^"]*)-webkit-text-fill-color[^"]*"/g, '$1"');
  }

  // 用 table 包裹（公众号粘贴格式）
  var copyHTML = '<table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:677px;margin:0 auto;font-size:16px;line-height:1.8;color:#333">' +
    '<tr><td>' + raw + '</td></tr></table>';

  return copyHTML;
}

function copyToClipboard() {
  var editor = document.getElementById('editor');
  var rawText = editor.innerText.trim();
  var content = parseContent(rawText);
  var html = buildCopyHTML(content, state.curTpl);

  var blob = new Blob([html], { type: 'text/html' });
  var clipboardItem = new ClipboardItem({ 'text/html': blob });
  navigator.clipboard.write([clipboardItem]).then(function () {
    showToast('已复制到剪贴板，可直接粘贴到公众号！');
  }).catch(function () {
    // 降级：复制纯文本
    navigator.clipboard.writeText(editor.innerText).then(function () {
      showToast('复制成功（纯文本模式）');
    }).catch(function () {
      showToast('复制失败，请手动全选复制');
    });
  });
}

/* ---------- 内容解析：文本 → 结构化数据 ---------- */
function parseContent(text) {
  if (!text || !text.trim()) return [];
  var lines = text.split('\n');
  var content = [];
  var i, line;

  /* 表格收集 */
  var tableRows = [];
  function flushTable() {
    if (tableRows.length === 0) return;
    /* 第一行为表头，第二行为分隔行 */
    var header = tableRows[0];
    var body = [];
    for (var r = 1; r < tableRows.length; r++) {
      var row = tableRows[r];
      var isSep = row.every(function (c) { return /^:?-{2,}:?$/.test(String(c).trim()); });
      if (!isSep) body.push(row);
    }
    content.push({ type: 'table', cols: header.length, header: header, rows: body });
    tableRows = [];
  }

  for (i = 0; i < lines.length; i++) {
    line = lines[i].trim();
    if (!line) continue;

    /* 表格行 */
    if (line.startsWith('|')) {
      var cells = line.split('|').slice(1, -1).map(function (s) { return s.trim(); });
      if (cells.length > 0) tableRows.push(cells);
      continue;
    }
    flushTable();

    /* 对齐前缀 <l> <c> <r> <j> */
    var align = null;
    var am = line.match(/^<([lcrj])>\s*/);
    if (am) { align = am[1]; line = line.slice(am[0].length); }

    if (line.startsWith('# ')) {
      content.push({ type: 'h1', text: line.slice(2), align: align });
    } else if (line.startsWith('## ')) {
      content.push({ type: 'h2', text: line.slice(3), align: align });
    } else if (line.startsWith('### ')) {
      content.push({ type: 'h3', text: line.slice(4), align: align });
    } else if (line.startsWith('> ')) {
      content.push({ type: 'quote', text: line.slice(2), align: align });
    } else if (line.startsWith('![')) {
      /* 图片 ![](url) */
      var m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (m) {
        content.push({ type: 'img', src: m[2], alt: m[1] });
      } else {
        content.push({ type: 'p', text: line, align: align });
      }
    } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      content.push({ type: 'strong', text: line.slice(2, -2) });
    } else if (line.startsWith('---')) {
      content.push({ type: 'divider' });
    } else if (/^\d+\./.test(line)) {
      /* 有序列表 */
      content.push({ type: 'ol', items: [line.replace(/^\d+\.\s*/, '')], align: align });
    } else if (/^[-*•]\s/.test(line)) {
      /* 无序列表 */
      content.push({ type: 'ul', items: [line.replace(/^[-*•]\s*/, '')], align: align });
    } else {
      content.push({ type: 'p', text: line });
    }
  }
  flushTable();
  return content;
}

/* ---------- 实时预览渲染 ---------- */
function render() {
  var tpl = TPL_REGISTRY[state.curTpl];
  if (!tpl) return;

  var editor = document.getElementById('editor');
  var preview = document.getElementById('preview');
  if (!editor || !preview) return;

  var rawText = editor.innerText.trim();
  var content = parseContent(rawText);
  var data = (content.length > 0) ? content : state.sampleContent;

  /* 空态标记（用于显示占位提示） */
  editor.setAttribute('data-empty', content.length === 0 ? 'true' : 'false');

  var html = renderTpl(tpl, data, {
    colors: state.customColors,
    mix: state.mixMode ? state.mixOverrides : null
  });

  // KaTeX 公式
  html = html.replace(/\$\$(.*?)\$\$/g, function (m, eq) {
    try { return katex.renderToString(eq, { displayMode: true, throwOnError: false }); } catch (e) { return m; }
  });
  html = html.replace(/\$(.*?)\$/g, function (m, eq) {
    try { return katex.renderToString(eq, { displayMode: false, throwOnError: false }); } catch (e) { return m; }
  });

  if (state.wxCompat) html = stripWxUnsupported(html);

  preview.innerHTML = html;
  /* 自定义背景色联动：预览容器底色跟随 customColors.bg */
  var scrollerEl = document.getElementById('preview-scroll');
  if (scrollerEl) {
    var bgColor = (state.customColors && state.customColors.bg) ? state.customColors.bg : '#ffffff';
    scrollerEl.style.backgroundColor = bgColor;
    var pContent = document.getElementById('preview');
    if (pContent) pContent.style.backgroundColor = bgColor;
  }

  // 缩放
  var wrap = preview.querySelector('.preview-content') || preview;
  wrap.style.zoom = state.previewScale;
  wrap.style.transform = 'none';
  wrap.style.width = '';


}

/* ---------- 模板卡片预览生成 ---------- */
function buildTplCardHTML(tpl) {
  var t = tpl.tokens || {};
  var demo = getDemo(tpl);
  // 缩放到 0.38 防止溢出
  var scale = 0.38;
  return '<div class="tpl-card-demo" style="transform:scale(' + scale + ');transform-origin:top left;width:calc(100%/' + scale + ');pointer-events:none;line-height:1.5">' + demo + '</div>';
}

/* ---------- 初始化：读取编辑器内容 ---------- */
function getEditorContent() {
  var editor = document.getElementById('editor');
  return editor ? editor.innerText : '';
}

function setEditorContent(text) {
  var editor = document.getElementById('editor');
  if (editor) editor.innerText = text;
}

/* ---------- 模板面板：画廊网格 ---------- */
function initTplPanel() {
  var cats = document.getElementById('cat-select');
  var cat = cats ? cats.value : 'all';
  state.curCategory = cat;

  var list = (cat === 'all')
    ? TPL_ORDER.slice()
    : TPL_ORDER.filter(function (id) { return TPL_REGISTRY[id] && TPL_REGISTRY[id].category === cat; });

  state.stackTpls = list;
  state.stackIndex = list.indexOf(state.curTpl);
  if (state.stackIndex < 0) state.stackIndex = 0;

  renderTplGallery();
}

function renderTplGallery() {
  var container = document.getElementById('tpl-stack');
  if (!container) return;

  container.className = 'tpl-gallery';
  container.innerHTML = '';

  state.stackTpls.forEach(function (id) {
    var tpl = TPL_REGISTRY[id];
    if (!tpl) return;

    var card = document.createElement('div');
    card.className = 'tpl-card' + (id === state.curTpl ? ' active' : '');
    card.dataset.id = id;

    var demoWrap = document.createElement('div');
    demoWrap.className = 'tpl-card-demo';
    var pal = buildPalette(tpl.tokens || {});
    demoWrap.style.background = pal.bg;
    demoWrap.style.color = pal.text;
    var demoHtml = getDemo(tpl);
    var clip = document.createElement('div');
    clip.className = 'tpl-demo-clip';
    clip.style.cssText = 'transform:scale(0.55);transform-origin:top left;width:' + (100 / 0.55) + '%;';
    clip.innerHTML = demoHtml;
    demoWrap.appendChild(clip);

    var meta = document.createElement('div');
    meta.className = 'tpl-card-meta';
    var name = document.createElement('span');
    name.className = 'tpl-card-name';
    name.textContent = tpl.name;
    var cat = document.createElement('span');
    cat.className = 'tpl-card-cat';
    cat.textContent = CATEGORY_NAMES[tpl.category] || tpl.category;
    meta.appendChild(name);
    meta.appendChild(cat);

    card.appendChild(demoWrap);
    card.appendChild(meta);

    card.addEventListener('click', function () {
      selectTpl(id);
    });

    container.appendChild(card);
  });

  var desc = document.getElementById('tpl-desc');
  if (desc) {
    var tpl = TPL_REGISTRY[state.curTpl];
    desc.textContent = tpl ? (tpl.name + ' — ' + tpl.desc) : '';
  }
}

function selectTpl(id) {
  state.curTpl = id;
  state.stackIndex = state.stackTpls.indexOf(id);
  renderTplGallery();
  render();
}

function filterCategory(cat) {
  state.curCategory = cat;
  var sel = document.getElementById('cat-select');
  if (sel) sel.value = cat;
  initTplPanel();
}

/* 分类名映射 */
var CATEGORY_NAMES = {
  all: '全部', basic: '简约', chinese: '中国风', retro: '复古',
  fashion: '时尚', tech: '科技', cute: '可爱', elegant: '优雅',
  colorful: '多彩', warm: '温馨', business: '商务'
};

/* ---------- 快速插入工具（选区感知 + 撤销/重做） ---------- */
var undoStack = [];
var redoStack = [];
var undoLock = false;

function saveUndo() {
  if (undoLock) return;
  var editor = document.getElementById('editor');
  if (!editor) return;
  undoStack.push(editor.innerText);
  if (undoStack.length > 100) undoStack.shift();
  redoStack = [];
}

function undoEdit() {
  var editor = document.getElementById('editor');
  if (!editor || undoStack.length === 0) return;
  redoStack.push(editor.innerText);
  undoLock = true;
  editor.innerText = undoStack.pop();
  undoLock = false;
  /* 仅更新预览，不重写 editor.innerText（已正确） */
  var preview = document.getElementById('preview');
  if (preview) {
    var rawText = editor.innerText.trim();
    var content = parseContent(rawText);
    var data = (content.length > 0) ? content : state.sampleContent;
    var tpl = TPL_REGISTRY[state.curTpl];
    if (tpl) {
      var html = renderTpl(tpl, data, { colors: state.customColors, mix: state.mixMode ? state.mixOverrides : null });
      if (state.wxCompat) html = stripWxUnsupported(html);
      preview.innerHTML = html;
    }
  }
  showToast('已撤销');
}

function redoEdit() {
  var editor = document.getElementById('editor');
  if (!editor || redoStack.length === 0) return;
  undoStack.push(editor.innerText);
  undoLock = true;
  editor.innerText = redoStack.pop();
  undoLock = false;
  var preview = document.getElementById('preview');
  if (preview) {
    var rawText = editor.innerText.trim();
    var content = parseContent(rawText);
    var data = (content.length > 0) ? content : state.sampleContent;
    var tpl = TPL_REGISTRY[state.curTpl];
    if (tpl) {
      var html = renderTpl(tpl, data, { colors: state.customColors, mix: state.mixMode ? state.mixOverrides : null });
      if (state.wxCompat) html = stripWxUnsupported(html);
      preview.innerHTML = html;
    }
  }
  showToast('已重做');
}

/* 在光标处插入文本（不破坏选区语义） */
function insertAtCursor(text) {
  var editor = document.getElementById('editor');
  if (!editor) return;
  editor.focus();
  var sel = window.getSelection();
  if (sel.rangeCount > 0) {
    var range = sel.getRangeAt(0);
    var node = document.createTextNode(text);
    range.deleteContents();
    range.insertNode(node);
    range.setStartAfter(node);
    range.setEndAfter(node);
    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    editor.innerText += text;
  }
}

/* 在光标处插入整行（用于分隔线/标题，独立成行） */
function insertLineAtCursor(mark) {
  var editor = document.getElementById('editor');
  if (!editor) return;
  saveUndo();
  editor.focus();
  var sel = window.getSelection();
  var atLineStart = false;
  if (sel.rangeCount > 0) {
    var range = sel.getRangeAt(0);
    var node = range.startContainer;
    var offset = range.startOffset;
    if (node.nodeType === 3) {
      var text = node.textContent || '';
      var lineStart = text.lastIndexOf('\n', offset - 1) + 1;
      atLineStart = (offset - lineStart) === 0;
    }
  }
  if (atLineStart) {
    insertAtCursor(mark + '\n');
  } else {
    insertAtCursor('\n' + mark + '\n');
  }
  render();
}

/* 普通插入：保存历史 */
function insertText(before, after) {
  saveUndo();
  insertAtCursor(before + (after ? '内容' : '') + after);
  render();
}

/* 包裹选区（加粗/斜体/删除线/高亮） */
function wrapSelection(before, after) {
  var editor = document.getElementById('editor');
  if (!editor) return;
  saveUndo();
  editor.focus();
  var sel = window.getSelection();
  if (sel.rangeCount > 0 && sel.toString()) {
    var text = sel.toString();
    var range = sel.getRangeAt(0);
    var node = document.createTextNode(before + text + after);
    range.deleteContents();
    range.insertNode(node);
  } else {
    insertAtCursor(before + '文字' + after);
  }
  render();
}

/* 引用：只对选中的段落生效（选中文字 → 整段变引用） */
function insertQuoteAtCursor() {
  var editor = document.getElementById('editor');
  if (!editor) return;
  saveUndo();
  editor.focus();
  var sel = window.getSelection();
  var text = sel ? sel.toString() : '';
  if (text) {
    /* 把选区每行都变成引用 */
    var lines = text.split('\n').map(function (l) {
      return l.trim() ? '> ' + l.replace(/^>\s*/, '') : l;
    }).join('\n');
    var range = sel.getRangeAt(0);
    var node = document.createTextNode(lines);
    range.deleteContents();
    range.insertNode(node);
  } else {
    insertLineAtCursor('> ');
  }
  render();
}

/* 分隔线：在光标位置插入 */
function insertDividerAtCursor() {
  insertLineAtCursor('---');
}

/* 高亮：选中文字加背景色（保留在编辑器中，渲染为 highlight） */
function insertHighlight() {
  var editor = document.getElementById('editor');
  if (!editor) return;
  saveUndo();
  editor.focus();
  var sel = window.getSelection();
  if (sel.rangeCount > 0 && sel.toString()) {
    var text = sel.toString();
    var range = sel.getRangeAt(0);
    var node = document.createTextNode('==' + text + '==');
    range.deleteContents();
    range.insertNode(node);
  } else {
    insertAtCursor('==高亮文字==');
  }
  render();
}

/* 对齐：设置光标所在段落（编辑器用 Markdown 标记模拟） */
function alignText(align) {
  var editor = document.getElementById('editor');
  if (!editor) return;
  saveUndo();
  editor.focus();
  var sel = window.getSelection();
  var text = sel ? sel.toString() : '';
  var prefix = align === 'left' ? '<l> ' : align === 'center' ? '<c> ' : align === 'right' ? '<r> ' : '<j> ';
  if (text) {
    var lines = text.split('\n').map(function (l) {
      return l.replace(/^<[lcrj]>\s*/, '') .replace(/^/, prefix);
    }).join('\n');
    var range = sel.getRangeAt(0);
    var node = document.createTextNode(lines);
    range.deleteContents();
    range.insertNode(node);
  } else {
    /* 应用到光标所在段落 */
    var node = sel.rangeCount > 0 ? sel.getRangeAt(0).startContainer : null;
    if (node && node.nodeType === 3) node = node.parentNode;
    var para = node ? node.closest ? node.closest('[data-para]') : null : null;
    if (para) {
      var t = para.textContent || '';
      para.textContent = t.replace(/^<[lcrj]>\s*/, '').replace(/^/, prefix);
    } else {
      insertAtCursor(prefix);
    }
  }
  render();
}

/* 字号：包裹选区或设置段落 */
function setFontSize(size) {
  var editor = document.getElementById('editor');
  if (!editor) return;
  saveUndo();
  editor.focus();
  var sel = window.getSelection();
  var text = sel ? sel.toString() : '';
  var mark = '{{' + size + '}}';
  if (text) {
    var range = sel.getRangeAt(0);
    var node = document.createTextNode(mark + text + '{{/}}');
    range.deleteContents();
    range.insertNode(node);
  } else {
    insertAtCursor(mark);
  }
  render();
}

function insertImage() {
  var url = prompt('请输入图片 URL：');
  if (!url) return;
  saveUndo();
  insertAtCursor('![图片](' + url + ')\n');
  render();
}

function insertTable() {
  var rows = prompt('表格行数（不含表头）：', '3');
  var cols = prompt('表格列数：', '3');
  rows = parseInt(rows, 10) || 3;
  cols = parseInt(cols, 10) || 3;
  if (rows < 1) rows = 1;
  if (cols < 1) cols = 1;
  saveUndo();
  var lines = ['| ' + Array(cols).fill('表头').join(' | ') + ' |'];
  lines.push('| ' + Array(cols).fill('---').join(' | ') + ' |');
  for (var r = 0; r < rows; r++) {
    lines.push('| ' + Array(cols).fill('内容').join(' | ') + ' |');
  }
  insertAtCursor('\n' + lines.join('\n') + '\n');
  render();
}

/* 编辑器输入/粘贴时记录历史 */
function bindEditorHistory() {
  var editor = document.getElementById('editor');
  if (!editor) return;
  var lastVal = editor.innerText;
  editor.addEventListener('input', function () {
    if (undoLock) return;
    /* 输入合并：500ms 内的连续输入算一步 */
    if (this._t) clearTimeout(this._t);
    var self = this;
    this._t = setTimeout(function () {
      if (self.innerText !== lastVal) {
        undoStack.push(lastVal);
        if (undoStack.length > 100) undoStack.shift();
        redoStack = [];
        lastVal = self.innerText;
      }
    }, 500);
  });
  /* 粘贴立即记一步 */
  editor.addEventListener('paste', function () {
    var self = this;
    setTimeout(function () {
      if (self.innerText !== lastVal) {
        undoStack.push(lastVal);
        if (undoStack.length > 100) undoStack.shift();
        redoStack = [];
        lastVal = self.innerText;
      }
    }, 50);
  });
}

/* ---------- 智能推荐模板 ---------- */
function recommendTpl() {
  var editor = document.getElementById('editor');
  var text = editor ? editor.innerText.trim() : '';
  if (!text) {
    /* 无内容：随机推荐一款 */
    var ids = TPL_ORDER.slice();
    var pick = ids[Math.floor(Math.random() * ids.length)];
    selectTpl(pick);
    showToast('内容为空，随机推荐：' + (TPL_REGISTRY[pick] ? TPL_REGISTRY[pick].name : pick));
    return;
  }
  /* 关键词打分 */
  var scores = {};
  TPL_ORDER.forEach(function (id) { scores[id] = 0; });
  var rules = [
    { re: /(科技|互联网|AI|智能|数码|代码|编程|产品|增长|数据|黑科技|极客|前沿|软件|硬件|芯片|机器人)/g, cats: ['tech', 'elegant'], boost: 3 },
    { re: /(美食|菜谱|探店|餐厅|味|好吃|厨房|咖啡|甜品)/g, cats: ['warm', 'colorful'], boost: 3 },
    { re: /(穿搭|时尚|美妆|护肤|品牌|潮流|街拍|设计|美学)/g, cats: ['fashion', 'elegant'], boost: 3 },
    { re: /(旅行|攻略|游记|风景|远方|机票|酒店|大海|夏天)/g, cats: ['colorful', 'warm'], boost: 3 },
    { re: /(职场|管理|效率|成长|学习|读书|方法论|干货|认知|商业|赚钱|创业)/g, cats: ['business', 'basic'], boost: 3 },
    { re: /(情感|鸡汤|治愈|晚安|语录|夜读|温暖|陪伴|爱情|思念)/g, cats: ['warm', 'cute'], boost: 3 },
    { re: /(国风|传统|书法|茶|戏曲|节气|古诗词|水墨|汉服|古典)/g, cats: ['chinese', 'retro'], boost: 4 },
    { re: /(金融|投资|理财|股票|经济|财富|黄金|奢侈|高端)/g, cats: ['elegant', 'business'], boost: 3 },
    { re: /(运动|健身|健康|养生|跑步|瑜伽|自然|森林|环保)/g, cats: ['colorful', 'basic'], boost: 3 },
    { re: /(音乐|电影|书籍|文化|展览|演出|手账|手写|文艺)/g, cats: ['fashion', 'retro'], boost: 3 },
    { re: /(育儿|教育|亲子|孩子|家长|学校|可爱|萌)/g, cats: ['cute', 'warm'], boost: 2 },
    { re: /(星空|宇宙|夜晚|梦境|浪漫|紫色|科幻)/g, cats: ['tech', 'elegant'], boost: 2 },
    { re: /(论文|学术|报告|数据|研究|分析|图表|统计)/g, cats: ['basic', 'business'], boost: 3 }
  ];
  var totalBoost = 0;
  rules.forEach(function (r) {
    var m = text.match(r.re);
    if (m && m.length) {
      totalBoost += m.length * r.boost;
      r.cats.forEach(function (cat) {
        TPL_ORDER.forEach(function (id) {
          var tpl = TPL_REGISTRY[id];
          if (tpl && (tpl.category === cat || (tpl.keywords || []).indexOf(cat) >= 0)) {
            scores[id] += m.length * r.boost;
          }
        });
      });
    }
  });
  /* 匹配不到关键词 → 随机 */
  var best = null, bestScore = 0;
  TPL_ORDER.forEach(function (id) {
    if (scores[id] > bestScore) { bestScore = scores[id]; best = id; }
  });
  if (!best || bestScore === 0) {
    var ids = TPL_ORDER.slice();
    best = ids[Math.floor(Math.random() * ids.length)];
    showToast('未识别内容主题，随机推荐：' + (TPL_REGISTRY[best] ? TPL_REGISTRY[best].name : best));
  } else {
    showToast('智能推荐：' + (TPL_REGISTRY[best] ? TPL_REGISTRY[best].name : best) + '（匹配度 ' + bestScore + '）');
  }
  selectTpl(best);
}

/* ---------- 混搭模式 ---------- */
function toggleMixMode() {
  state.mixMode = !state.mixMode;
  var btn = document.getElementById('mix-btn');
  if (btn) btn.classList.toggle('active', state.mixMode);
  var panel = document.getElementById('mix-panel');
  if (panel) panel.classList.toggle('hidden', !state.mixMode);
  if (state.mixMode) initMixPanel();
}

function initMixPanel() {
  var panel = document.getElementById('mix-panel');
  if (!panel) return;
  var cats = [
    { key: 'h1', label: '大标题' },
    { key: 'h2', label: '小标题' },
    { key: 'h3', label: '三级标题' },
    { key: 'p', label: '正文' },
    { key: 'quote', label: '引用' },
    { key: 'strong', label: '强调文字' },
    { key: 'list', label: '列表' },
    { key: 'divider', label: '分隔线' },
    { key: 'card', label: '卡片' },
    { key: 'table', label: '表格' },
    { key: 'highlight', label: '高亮' },
    { key: 'container', label: '整文背景' },
    { key: 'headerDeco', label: '页头装饰' },
    { key: 'footerDeco', label: '页脚装饰' }
  ];
  var html = '';
  cats.forEach(function (cat) {
    html += '<div class="mix-group"><label>' + cat.label + '</label>';
    html += '<select class="mix-select" data-type="' + cat.key + '" onchange="applyMix(this)">';
    html += '<option value="">默认</option>';
    TPL_ORDER.forEach(function (id) {
      html += '<option value="' + id + '">' + (TPL_REGISTRY[id] ? TPL_REGISTRY[id].name : id) + '</option>';
    });
    html += '</select></div>';
  });
  html += '<button class="btn-reset-mix" onclick="resetMix()">恢复默认</button>';
  panel.innerHTML = html;
}

function applyMix(sel) {
  var type = sel.dataset.type;
  var tplId = sel.value;
  if (tplId) {
    state.mixOverrides[type] = tplId;
  } else {
    delete state.mixOverrides[type];
  }
  render();
}

function resetMix() {
  state.mixOverrides = {};
  document.querySelectorAll('.mix-select').forEach(function (s) { s.value = ''; });
  render();
}

/* ---------- 分类选择器 ---------- */
function buildCategoryOptions() {
  var cats = CATEGORY_NAMES;
  var sel = document.getElementById('cat-select');
  if (!sel) return;
  sel.innerHTML = '';
  Object.keys(cats).forEach(function (k) {
    var opt = document.createElement('option');
    opt.value = k;
    opt.textContent = cats[k];
    sel.appendChild(opt);
  });
}

/* ---------- Toast 提示 ---------- */
function showToast(msg) {
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(function () { el.classList.add('hidden'); }, 2200);
}

/* ---------- 快捷键 ---------- */
function initKeyboard() {
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'c':
          if (!window.getSelection().toString()) { e.preventDefault(); copyToClipboard(); }
          break;
        case 'z':
          e.preventDefault();
          break;
      }
    }
    if (e.key === 'Escape') {
    }
  });
}

/* ---------- DOM Ready ---------- */
document.addEventListener('DOMContentLoaded', function () {
  // 初始化编辑器（预填示例内容，所见即所得）
  var editor = document.getElementById('editor');
  if (editor) {
    editor.innerText = [
      '# 这是大标题',
      '这里是正文内容，展示文章的段落排版效果。公众号排版工具可以让你的文章更加美观易读，提升读者的阅读体验。',
      '## 二级小标题',
      '第二段正文，用于展示段落之间的间距与阅读节奏。合理使用标题可以让文章结构更清晰。',
      '> 引用内容：值得被强调的句子，可以引起读者的注意和思考。',
      '**重点强调文字**',
      '正文继续，这里展示重点文字在段落中的呈现效果。',
      '卡片内容区域，适合展示重点信息、注意事项或公告提示。',
      '列表项目一：简洁明了',
      '列表项目二：重点突出',
      '列表项目三：层次清晰',
      '---',
      '## 表格示例',
      '| 项目 | 说明 |',
      '| --- | --- |',
      '| 模板 | 20+ 套差异化设计 |',
      '| 功能 | 一键复制、微信兼容 |'
    ].join('\n');
    editor.addEventListener('input', render);
    editor.addEventListener('paste', function (e) {
      // 粘贴图片
      var items = e.clipboardData.items;
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') >= 0) {
          e.preventDefault();
          var file = items[i].getAsFile();
          var reader = new FileReader();
          reader.onload = function (ev) {
            editor.innerText += '\n![' + file.name + '](' + ev.target.result + ')\n';
            render();
          };
          reader.readAsDataURL(file);
          return;
        }
      }
      // 普通文本：延迟渲染
      setTimeout(render, 50);
    });

    // 拖拽图片
    editor.addEventListener('dragover', function (e) { e.preventDefault(); });
    editor.addEventListener('drop', function (e) {
      e.preventDefault();
      var files = e.dataTransfer.files;
      for (var i = 0; i < files.length; i++) {
        if (files[i].type.indexOf('image') >= 0) {
          var reader = new FileReader();
          reader.onload = function (ev) {
            editor.innerText += '\n![' + files[i].name + '](' + ev.target.result + ')\n';
            render();
          };
          reader.readAsDataURL(files[i]);
        }
      }
    });
  }

  // 分类下拉
  buildCategoryOptions();

  // 模板面板
  initTplPanel();

  // 颜色面板
  initColorPanel();

  // 微信兼容复选框
  var wxCb = document.getElementById('wx-checkbox');
  if (wxCb) {
    wxCb.checked = state.wxCompat;
    wxCb.addEventListener('change', function () {
      state.wxCompat = this.checked;
      render();
    });
  }

  // 初始渲染
  render();
  updateZoomDisplay();

  // 快捷键
  initKeyboard();

  // 关闭按钮事件
  document.querySelectorAll('.close-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = this.closest('.popup-panel, .slide-panel');
      if (panel) panel.classList.add('hidden');
    });
  });
});

/* ---------- 暴露给 window ---------- */
window.copyToClipboard = copyToClipboard;
window.insertDivider = insertDivider;
window.insertHighlight = insertHighlight;
window.insertImage = insertImage;
window.insertTable = insertTable;
window.clearEditor = clearEditor;
window.insertText = insertText;
window.shareTo = shareTo;
window.toggleShare = toggleShare;
window.toggleWxMode = toggleWxMode;
window.toggleMixMode = toggleMixMode;
window.previewZoomIn = previewZoomIn;
window.previewZoomOut = previewZoomOut;
window.stackPrev = stackPrev;
window.stackNext = stackNext;
window.selectTpl = selectTpl;
window.filterCategory = filterCategory;
window.setCustomAccent = setCustomAccent;
window.applyCustomColors = applyCustomColors;
window.resetCustomColor = resetCustomColor;



function insertDivider() { insertDividerAtCursor(); }

/* ---------- 清空编辑器（带确认） ---------- */
function clearEditor() {
  if (!confirm('确定清空编辑器内容吗？此操作不可撤销。')) return;
  var ed = document.getElementById('editor');
  if (ed) { ed.innerHTML = ''; saveUndo(); render(); }
}

/* ---------- 预览区缩放 ---------- */
function previewZoomIn() {
  var s = parseFloat((state.previewScale + 0.1).toFixed(1));
  if (s > 1.5) s = 1.5;
  state.previewScale = s;
  var p = document.getElementById('preview');
  if (p) {
    var wrap = p.querySelector('.preview-content') || p;
    wrap.style.zoom = s;
    wrap.style.transform = 'none';
    wrap.style.width = '';
  }
  var zEl = document.getElementById('zoom-level');
  if (zEl) zEl.textContent = Math.round(s * 100) + '%';
}
function previewZoomOut() {
  var s = parseFloat((state.previewScale - 0.1).toFixed(1));
  if (s < 0.5) s = 0.5;
  state.previewScale = s;
  var p = document.getElementById('preview');
  if (p) {
    var wrap = p.querySelector('.preview-content') || p;
    wrap.style.zoom = s;
    wrap.style.transform = 'none';
    wrap.style.width = '';
  }
  var zEl = document.getElementById('zoom-level');
  if (zEl) zEl.textContent = Math.round(s * 100) + '%';
}

/* ---------- 分享弹窗 ---------- */
function toggleShare() {
  var popup = document.getElementById('share-popup');
  if (popup) { popup.style.display = popup.style.display === 'none' || !popup.style.display ? 'flex' : 'none'; }
}
function shareTo(platform) {
  var url = encodeURIComponent(window.location.href);
  var urls = {
    qq: 'http://connect.qq.com/widget/shareqq/index.html?url=' + url + '&title=公众号排版器V2',
    weibo: 'http://service.weibo.com/share/share.php?url=' + url + '&title=公众号排版器V2 - 免费在线微信排版工具'
  };
  if (urls[platform]) { window.open(urls[platform], '_blank'); }
  toggleShare();
}
function copyShareLink() {
  navigator.clipboard.writeText(window.location.href).then(function() {
    alert('链接已复制到剪贴板！');
  }).catch(function() {
    prompt('复制链接：', window.location.href);
  });
  toggleShare();
}

/* ---------- 微信兼容模式切换 ---------- */
function toggleWxMode() {
  state.wxCompat = !state.wxCompat;
  var btn = document.getElementById('wx-mode-btn');
  if (btn) {
    btn.textContent = state.wxCompat ? '微信模式' : '标准模式';
    btn.className = 'tool-btn ' + (state.wxCompat ? 'active' : '');
  }
  render();
}

/* ---------- 模板历史导航（栈） ---------- */
function stackPrev() {
  if (state.stackIndex > 0) {
    state.stackIndex--;
    selectTpl(state.stackTpls[state.stackIndex]);
  }
}
function stackNext() {
  if (state.stackIndex < state.stackTpls.length - 1) {
    state.stackIndex++;
    selectTpl(state.stackTpls[state.stackIndex]);
  }
}

/* ---------- 选区感知插入工具 ---------- */
function wrapSelection(before, after) {
  saveUndo();
  var ed = document.getElementById('editor');
  if (!ed) return;
  var sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  var range = sel.getRangeAt(0);
  var selectedText = range.toString();
  if (!selectedText) selectedText = '选中文本';
  var newText = before + selectedText + after;
  var tn = ed.ownerDocument.createTextNode(newText);
  range.deleteContents();
  range.insertNode(tn);
  range.setStartAfter(tn);
  range.setEndAfter(tn);
  sel.removeAllRanges();
  sel.addRange(range);
  ed.dispatchEvent(new ed.ownerDocument.defaultView.Event('input', { bubbles: true }));
  render();
}
function setFontSize(size) {
  saveUndo();
  var ed = document.getElementById('editor');
  if (!ed) return;
  var sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  var range = sel.getRangeAt(0);
  var text = range.toString() || '文字';
  var marker = '{{' + size + '}}' + text + '{{/}}';
  var tn = ed.ownerDocument.createTextNode(marker);
  range.deleteContents();
  range.insertNode(tn);
  range.setStartAfter(tn);
  range.setEndAfter(tn);
  sel.removeAllRanges();
  sel.addRange(range);
  ed.dispatchEvent(new ed.ownerDocument.defaultView.Event('input', { bubbles: true }));
  render();
}
function insertQuoteAtCursor() {
  saveUndo();
  var ed = document.getElementById('editor');
  if (!ed) return;
  ed.focus();
  var sel = window.getSelection();
  var range;
  if (sel && sel.rangeCount > 0) range = sel.getRangeAt(0);
  else { range = ed.ownerDocument.createRange(); range.selectNodeContents(ed); range.collapse(false); }
  var text = range.toString();
  if (!text || text === ed.textContent.trim()) text = '输入引用内容';
  var marker = '> ' + text;
  var tn = ed.ownerDocument.createTextNode(marker + '\n');
  range.deleteContents();
  range.insertNode(tn);
  range.setStartAfter(tn);
  range.setEndAfter(tn);
  sel.removeAllRanges();
  sel.addRange(range);
  ed.dispatchEvent(new ed.ownerDocument.defaultView.Event('input', { bubbles: true }));
  render();
}

/* ---------- 自定义颜色面板 ---------- */
function initColorPanel() {
  var panel = document.getElementById('color-panel');
  if (!panel) return;
  var presets = ['#2563eb','#e11d48','#16a34a','#9333ea','#ea580c','#0891b2','#be185d','#0f766e','#ca8a04','#1d4ed8','#334155','#65a30d','#7c3aed','#dc2626','#0284c7','#6366f1','#84cc16','#f59e0b','#14b8a6','#f97316'];
  panel.innerHTML = '<div class="color-section"><div class="color-label">主色</div><div class="color-swatches" id="accent-swatches">' + presets.map(function(c) {
    return '<button class="color-swatch" style="background:' + c + '" onclick="setCustomAccent(\'' + c + '\')" title="' + c + '"></button>';
  }).join('') + '</div></div>' +
    '<div class="color-section"><div class="color-label">背景色</div><div class="color-swatches">' + presets.map(function(c) {
      return '<button class="color-swatch" style="background:' + c + '" onclick="setCustomBg(\'' + c + '\')" title="背景:' + c + '"</button>';
    }).join('') + '</div></div>' +
    '<div class="color-row"><button class="btn btn-sm" onclick="resetCustomColor()">重置颜色</button></div>';
}
function setCustomAccent(color) {
  if (!state.customColors) state.customColors = {};
  state.customColors.accent = color;
  applyCustomColors();
  document.querySelectorAll('#accent-swatches .color-swatch').forEach(function(s) {
    var match = s.style.background === color;
    s.style.outline = match ? '2px solid #333' : 'none';
  });
}
function setCustomBg(color) {
  if (!state.customColors) state.customColors = {};
  state.customColors.bg = color;
  applyCustomColors();
}
function resetCustomColor() {
  state.customColors = null;
  applyCustomColors();
}
function applyCustomColors() {
  render();
}


/* ---------- 拖拽分栏 ---------- */
function initResizers() {
  var resizers = document.querySelectorAll('.resizer');
  resizers.forEach(function (rz) {
    rz.addEventListener('mousedown', function (e) {
      e.preventDefault();
      var side = rz.dataset.side;
      var startX = e.clientX;
      var root = document.documentElement;
      var tplW = parseFloat(getComputedStyle(document.querySelector('.panel-tpl')).width) || 300;
      var edW = parseFloat(getComputedStyle(document.querySelector('.panel-editor')).width) || 400;
      var pvW = parseFloat(getComputedStyle(document.querySelector('.panel-preview')).width) || 380;
      document.body.classList.add('resizing');
      rz.classList.add('active');
      function onMove(ev) {
        var dx = ev.clientX - startX;
        if (side === 'tpl') {
          var nw = Math.max(220, Math.min(560, tplW + dx));
          root.style.setProperty('--w-tpl', nw + 'px');
        } else {
          var nw2 = Math.max(280, Math.min(700, pvW - dx));
          root.style.setProperty('--w-preview', nw2 + 'px');
        }
      }
      function onUp() {
        document.body.classList.remove('resizing');
        rz.classList.remove('active');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        /* 保存到 localStorage */
        try {
          var w1 = document.querySelector('.panel-tpl').getBoundingClientRect().width;
          var w3 = document.querySelector('.panel-preview').getBoundingClientRect().width;
          localStorage.setItem('v2_lp_w', JSON.stringify({ tpl: Math.round(w1), preview: Math.round(w3) }));
        } catch (e) {}
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  });
  /* 恢复保存的宽度 */
  try {
    var saved = JSON.parse(localStorage.getItem('v2_lp_w') || 'null');
    if (saved) {
      if (saved.tpl) root.style.setProperty('--w-tpl', saved.tpl + 'px');
      if (saved.preview) root.style.setProperty('--w-preview', saved.preview + 'px');
    }
  } catch (e) {}
}

window.wrapSelection = wrapSelection;
window.setFontSize = setFontSize;
window.insertQuoteAtCursor = insertQuoteAtCursor;
window.previewZoomIn = previewZoomIn;
window.previewZoomOut = previewZoomOut;
window.toggleShare = toggleShare;
window.shareTo = shareTo;
window.copyShareLink = copyShareLink;
window.toggleWxMode = toggleWxMode;
window.stackPrev = stackPrev;
window.stackNext = stackNext;
window.clearEditor = clearEditor;
window.initColorPanel = initColorPanel;
window.setCustomBg = setCustomBg;
window.applyMix = applyMix;
window.resetMix = resetMix;
bindEditorHistory();
initResizers();
window.render = render;
window.state = state;
