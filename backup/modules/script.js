// ====== SISTEMA DE CONFIGURAÇÕES COMPLETO ======
const settings = {
  // Tema
  theme: 'default',

  // Fontes e alinhamento
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  textAlign: "left",

  // Layout
  pageMargins: "25mm",
  zoomLevel: "100%",

  // Espaçamentos
  lineHeight: 1.6,
  letterSpacing: "0px",
  wordSpacing: "0px",

  // Tamanhos de fonte
  fontSizeBase: "14px",
  fontSizeH1: "2em",
  fontSizeH2: "1.6em",
  fontSizeH3: "1.3em",
  fontSizeH4: "1.15em",
  fontSizeH5: "1em",
  fontSizeH6: "0.9em",

  // Cores dos títulos H1-H6 com fundo
  h1Color: "#1a1a1a", h1Bg: "#ffffff",
  h2Color: "#2563eb", h2Bg: "#ffffff",
  h3Color: "#059669", h3Bg: "#ffffff",
  h4Color: "#7c3aed", h4Bg: "#ffffff",
  h5Color: "#dc2626", h5Bg: "#ffffff",
  h6Color: "#ea580c", h6Bg: "#ffffff",

  // Cores de código - FUNDOS DIFERENCIADOS
  codeBlockBg: "#1e293b",
  codeBlockText: "#f1f5f9",
  inlineCodeBg: "#e2e8f0",
  inlineCodeText: "#0f172a",
  latexBorder: "#3b82f6"
};

// ====== SISTEMA DE PAGINAÇÃO ALTERNÁVEL ======
let isPaginatedMode = true; // começa no modo paginado

function togglePaginationMode() {
  isPaginatedMode = !isPaginatedMode;
  const toggle = document.getElementById('paginationToggle');
  const container = document.getElementById('pagesContainer');
  const title = document.getElementById('previewTitle');
  const pageCount = document.getElementById('pageCount');

  if (isPaginatedMode) {
    // Modo Paginado (A4)
    toggle.classList.add('active');
    container.classList.remove('continuous-mode');
    title.textContent = '👁️ Visualização Paginada (A4)';
    pageCount.style.display = 'inline';
    renderMarkdown(); // Re-renderiza com paginação
  } else {
    // Modo Contínuo
    toggle.classList.remove('active');
    container.classList.add('continuous-mode');
    title.textContent = '👁️ Visualização Contínua';
    pageCount.style.display = 'none';
    renderContinuousMode(); // Renderiza contínuo
  }
}

// ====== RENDER CONTÍNUO ======
function renderContinuousMode() {
  const markdownText = document.getElementById('editor').value;
  updateCounters(markdownText);

  const processedText = preprocessMarkdown(markdownText);
  marked.setOptions({ breaks: true, gfm: true });

  try {
    let htmlContent = marked.parse(processedText);

    // Correções do markup (remove <p> soltos em volta de listas e títulos)
    htmlContent = htmlContent
      .replace(/<\/h\d>\s*\n\n\s*<(ul|ol)>/g, '$1>\n<$2>')
      .replace(/<\/(ul|ol)>\s*<\/p>/g, '$1>')
      .replace(/\n\n\s*<(ul|ol)>/g, '<$1>')
      .replace(/<\/(ul|ol)>\s*\n\n/g, '$1>\n\n')
      .replace(/\n\n\s*<\/p>/g, '');

    const container = document.getElementById('pagesContainer');
    container.innerHTML = '';

    // Cria uma única página contínua
    const page = document.createElement('div');
    page.className = 'a4-page';

    const content = document.createElement('div');
    content.className = 'page-content';
    content.innerHTML = htmlContent;

    page.appendChild(content);
    container.appendChild(page);

    // Renderiza LaTeX
    if (window.renderMathInElement) {
      setTimeout(() => {
        // Protege cifrões monetários antes do KaTeX
        content.innerHTML = content.innerHTML.replace(
          /(\bR|\bUS)\$(\s?\d[\d\.,]*)/g,
          (m) => m.replace('$', '__CURRENCY__')
        );

        renderMathInElement(content, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false
        });

        // Restaura cifrões monetários
        content.innerHTML = content.innerHTML.replace(/__CURRENCY__/g, '$');
      }, 100);
    }
  } catch (error) {
    console.error('Erro ao renderizar:', error);
    document.getElementById('pagesContainer').innerHTML =
      '\n\nErro ao renderizar o conteúdo. Verifique o formato do Markdown.\n\n';
  }
}

// ====== PRÉ-PROCESSAMENTO DO MARKDOWN ======
function preprocessMarkdown(md) {
  // Ajustes simples (pode expandir conforme necessidade)
  return md
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, '  ');
}

// ====== RENDER PAGINADO ======
function renderMarkdown() {
  const markdownText = document.getElementById('editor').value;
  updateCounters(markdownText);

  const processedText = preprocessMarkdown(markdownText);
  marked.setOptions({ breaks: true, gfm: true });

  let html = marked.parse(processedText);

  // Pós-processamento para reduzir vãos artificiais
  html = html
    .replace(/<\/h\d>\s*\n\n\s*<(ul|ol)>/g, '$1>\n<$2>')
    .replace(/<\/(ul|ol)>\s*<\/p>/g, '$1>')
    .replace(/\n\n\s*<(ul|ol)>/g, '<$1>')
    .replace(/<\/(ul|ol)>\s*\n\n/g, '$1>\n\n')
    .replace(/\n\n\s*<\/p>/g, '');

  distributeContentToPages(html);
}

// ====== SISTEMA DE PAGINAÇÃO (ALTURA PELO CONTEÚDO) ======
class PaginationSystem {
  constructor(options = {}) {
    // Dimensões aproximadas A4 em mm (297 x 210), com margens
    //this.pageHeight = 297;
    this.pageWidth = 210;
    this.margins = parseFloat((settings.pageMargins || '25mm').replace('mm','')) || 25;
    this.contentHeight = this.pageHeight - 2 * this.margins;

    // Estados
    this.pages = [];
    this.currentPage = null;

    // Parâmetros
    this.THRESHOLD = 2; // mm de folga para evitar estouro
    this.HEADING_NEXT_RATIO = 0.0; // reserva 90% do próximo bloco p/ “anti-órfão”
    this.MEASURE_DPI_MM = 3.78; // px -> mm (aprox 96dpi)

    // Medidor
    this.measureContainer = this.createMeasureContainer();
  }

  createMeasureContainer() {
    const mc = document.createElement('div');
    mc.style.position = 'absolute';
    mc.style.visibility = 'hidden';
    mc.style.left = '-10000px';
    mc.style.top = '0';
    mc.style.width = `${this.pageWidth - 2 * this.margins}mm`; // largura interna
    mc.style.boxSizing = 'border-box';
    document.body.appendChild(mc);
    return mc;
  }

  clear() {
    this.pages = [];
    this.currentPage = null;
  }

  createNewPage() {
    const pageEl = document.createElement('div');
    pageEl.className = 'a4-page';

    const contentEl = document.createElement('div');
    contentEl.className = 'page-content';
    pageEl.appendChild(contentEl);

    const pageObj = {
      el: pageEl,
      contentEl,
      usedHeight: 0 // em mm
    };

    this.pages.push(pageObj);
    this.currentPage = pageObj;
  }

  ensurePage() {
    if (!this.currentPage) this.createNewPage();
  }

  pxToMm(px) {
    return px / this.MEASURE_DPI_MM;
  }

  calculateElementHeight(element) {
    // Clona para medir no container invisível com mesma largura da página
    const clone = element.cloneNode(true);
    // Normaliza largura
    clone.style.width = '100%';
    clone.style.boxSizing = 'border-box';
    clone.style.position = 'static';
    clone.style.maxWidth = 'none';
    this.measureContainer.innerHTML = '';
    this.measureContainer.appendChild(clone);
    const h = clone.offsetHeight;
    return this.pxToMm(h);
  }

  shouldBreakPageForHeading(el, isFirstOnPage) {
    return false;
  }

  addElementToPage(element, opts = {}) {
    const { isHeading = false, headingContext = {} } = opts;
    this.ensurePage();

    const elHeight = this.calculateElementHeight(element);
    let required = elHeight;

    const page = this.currentPage;
    const remaining = this.contentHeight - page.usedHeight;

    if (required + this.THRESHOLD > remaining) {
      // Nova página antes de inserir
      this.createNewPage();
    }

    // Inserção efetiva
    const target = this.currentPage.contentEl;
    target.appendChild(element);
    this.currentPage.usedHeight += elHeight;
  }

  renderPagesInto(container) {
    container.innerHTML = '';
    this.pages.forEach((p, idx) => {
      container.appendChild(p.el);
    });
  }
}

const pagination = new PaginationSystem();

// ====== DISTRIBUIÇÃO PARA PÁGINAS ======
function distributeContentToPages(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;

  pagination.clear();

  const elements = Array.from(tmp.childNodes).filter(n =>
    n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '')
  );

  const container = document.getElementById('pagesContainer');
  container.innerHTML = '';

  let lastWasH1OnSamePage = false;

  for (let i = 0; i < elements.length; i++) {
    const node = elements[i];

    // Converte TEXT_NODE simples em <p>
    let el = node.nodeType === Node.TEXT_NODE ? wrapTextInParagraph(node.textContent) : node;

    // Identificadores
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    const isHeading = /^h[1-6]$/.test(tag);

    // Agrupamentos sensíveis (keep-together) após H1/H2 com blocos
    let nextElCandidate = null;
    if (isHeading && i + 1 < elements.length) {
      // próximo bloco relevante
      nextElCandidate = normalizeNode(elements[i + 1]);
      const nextTag = nextElCandidate?.tagName ? nextElCandidate.tagName.toLowerCase() : '';
    }

    pagination.addElementToPage(el, {
      isHeading,
      headingContext: { nextElement: null }
    });

    // Atualiza contexto "H2 após H1"
    if (tag === 'h1') {
      lastWasH1OnSamePage = true;
    } else if (tag === 'h2') {
      // depois de um H2 consideramos que a sequência especial acabou
      lastWasH1OnSamePage = false;
    } else if (pagination.currentPage && pagination.currentPage.usedHeight === 0) {
      // nova página, zera flag
      lastWasH1OnSamePage = false;
    }
  }

  pagination.renderPagesInto(container);

  // Render LaTeX em modo paginado
  if (window.renderMathInElement) {
    setTimeout(() => {
      const scope = container;
      scope.innerHTML = scope.innerHTML.replace(
        /(\bR|\bUS)\$(\s?\d[\d\.,]*)/g,
        (m) => m.replace('$', '__CURRENCY__')
      );

      renderMathInElement(scope, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });

      scope.innerHTML = scope.innerHTML.replace(/__CURRENCY__/g, '$');
    }, 50);
  }
}

function normalizeNode(n) {
  if (!n) return null;
  if (n.nodeType === Node.TEXT_NODE) {
    const txt = n.textContent.trim();
    if (!txt) return null;
    return wrapTextInParagraph(txt);
  }
  return n;
}

function wrapTextInParagraph(text) {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
}

// ====== APLICAÇÃO DE CONFIGURAÇÕES ======
function applyAllSettings() {
	// Aplica as variáveis CSS
	document.documentElement.style.setProperty('--font-family', settings.fontFamily);
	document.documentElement.style.setProperty('--text-align', settings.textAlign);
	document.documentElement.style.setProperty('--page-margins', settings.pageMargins);
	document.documentElement.style.setProperty('--zoom-level', settings.zoomLevel);
	document.documentElement.style.setProperty('--line-height', settings.lineHeight);
	document.documentElement.style.setProperty('--letter-spacing', settings.letterSpacing);
	document.documentElement.style.setProperty('--word-spacing', settings.wordSpacing);
	document.documentElement.style.setProperty('--font-size-base', settings.fontSizeBase);
	document.documentElement.style.setProperty('--font-size-h1', settings.fontSizeH1);
	document.documentElement.style.setProperty('--font-size-h2', settings.fontSizeH2);
	document.documentElement.style.setProperty('--font-size-h3', settings.fontSizeH3);
	document.documentElement.style.setProperty('--font-size-h4', settings.fontSizeH4);
	document.documentElement.style.setProperty('--font-size-h5', settings.fontSizeH5);
	document.documentElement.style.setProperty('--font-size-h6', settings.fontSizeH6);
	
	// Aplica cores dos títulos
	document.documentElement.style.setProperty('--h1-color', settings.h1Color);
	document.documentElement.style.setProperty('--h1-bg', settings.h1Bg);
	document.documentElement.style.setProperty('--h2-color', settings.h2Color);
	document.documentElement.style.setProperty('--h2-bg', settings.h2Bg);
	document.documentElement.style.setProperty('--h3-color', settings.h3Color);
	document.documentElement.style.setProperty('--h3-bg', settings.h3Bg);
	document.documentElement.style.setProperty('--h4-color', settings.h4Color);
	document.documentElement.style.setProperty('--h4-bg', settings.h4Bg);
	document.documentElement.style.setProperty('--h5-color', settings.h5Color);
	document.documentElement.style.setProperty('--h5-bg', settings.h5Bg);
	document.documentElement.style.setProperty('--h6-color', settings.h6Color);
	document.documentElement.style.setProperty('--h6-bg', settings.h6Bg);
	
	// Aplica cores de código
	document.documentElement.style.setProperty('--code-bg', settings.codeBlockBg);
	document.documentElement.style.setProperty('--code-text', settings.codeBlockText);
	document.documentElement.style.setProperty('--inline-code-bg', settings.inlineCodeBg);
	document.documentElement.style.setProperty('--inline-code-text', settings.inlineCodeText);
	document.documentElement.style.setProperty('--latex-border', settings.latexBorder);
	
	// Aplica tema
	document.body.className = settings.theme;
	
	// Atualiza zoom no display
	document.getElementById('zoomLevel').textContent = settings.zoomLevel;
	
	// Re-renderiza o conteúdo
	renderMarkdown();
}

// Painel de configurações (exemplo de binding)
function setupSettingsPanel() {
	// Tema
	document.getElementById('themeSelect').value = settings.theme;
	
	// Fontes e alinhamento
	document.getElementById('fontFamily').value = settings.fontFamily;
	document.getElementById('textAlign').value = settings.textAlign;
	
	// Layout
	document.getElementById('pageMargins').value = parseInt(settings.pageMargins);
	document.getElementById('zoomLevel').value = parseInt(settings.zoomLevel);
	document.getElementById('marginsValue').textContent = settings.pageMargins;
	document.getElementById('zoomValue').textContent = settings.zoomLevel;
	
	// Espaçamentos
	document.getElementById('lineHeight').value = settings.lineHeight;
	document.getElementById('letterSpacing').value = parseFloat(settings.letterSpacing);
	document.getElementById('wordSpacing').value = parseFloat(settings.wordSpacing);
	document.getElementById('lineHeightValue').textContent = settings.lineHeight;
	document.getElementById('letterSpacingValue').textContent = settings.letterSpacing;
	document.getElementById('wordSpacingValue').textContent = settings.wordSpacing;
	
	// Tamanhos de fonte
	document.getElementById('fontSizeBase').value = parseInt(settings.fontSizeBase);
	document.getElementById('fontSizeH1').value = parseFloat(settings.fontSizeH1);
	document.getElementById('fontSizeH2').value = parseFloat(settings.fontSizeH2);
	document.getElementById('fontSizeBaseValue').textContent = settings.fontSizeBase;
	document.getElementById('fontSizeH1Value').textContent = settings.fontSizeH1;
	document.getElementById('fontSizeH2Value').textContent = settings.fontSizeH2;
	
	// Cores dos títulos H1-H6
	document.getElementById('h1Color').value = settings.h1Color;
	document.getElementById('h1BgColor').value = settings.h1Bg;
	document.getElementById('h2Color').value = settings.h2Color;
	document.getElementById('h2BgColor').value = settings.h2Bg;
	document.getElementById('h3Color').value = settings.h3Color;
	document.getElementById('h3BgColor').value = settings.h3Bg;
	document.getElementById('h4Color').value = settings.h4Color;
	document.getElementById('h4BgColor').value = settings.h4Bg;
	document.getElementById('h5Color').value = settings.h5Color;
	document.getElementById('h5BgColor').value = settings.h5Bg;
	document.getElementById('h6Color').value = settings.h6Color;
	document.getElementById('h6BgColor').value = settings.h6Bg;
	
	// Cores de código
	document.getElementById('codeBlockBg').value = settings.codeBlockBg;
	document.getElementById('codeBlockText').value = settings.codeBlockText;
	document.getElementById('inlineCodeBg').value = settings.inlineCodeBg;
	document.getElementById('inlineCodeText').value = settings.inlineCodeText;
}

// ====== CONTADORES, STATUS E AUXILIARES ======
function updateCounters(text) {
  const charCount = document.getElementById('charCount');
  const wordCount = document.getElementById('wordCount');
  const pageCount = document.getElementById('pageCountNumber');

  const words = (text.match(/\S+/g) || []).length;
  const chars = text.length;

  if (charCount) charCount.textContent = chars.toString();
  if (wordCount) wordCount.textContent = words.toString();

  // pageCount é atualizado ao final do render paginado
  setTimeout(() => {
    const pages = document.querySelectorAll('#pagesContainer .a4-page').length;
    if (pageCount) pageCount.textContent = pages.toString();
  }, 50);
}

// ====== INITIALIZAÇÃO ======
window.addEventListener('DOMContentLoaded', () => {
  applyAllSettings();
  setupSettingsPanel();
  if (isPaginatedMode) renderMarkdown();
  else renderContinuousMode();

  const toggleBtn = document.getElementById('paginationToggle');
  if (toggleBtn) toggleBtn.addEventListener('click', togglePaginationMode);

  const editor = document.getElementById('editor');
  if (editor) {
    editor.addEventListener('input', () => {
      if (isPaginatedMode) renderMarkdown();
      else renderContinuousMode();
    });
  }
});

// ====== FUNÇÕES AUXILIARES ======
function escapeHtml(unsafe) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function preprocessMarkdown(text) {
	const codeBlockRegex = /```[\s\S]*?```/g;
	text = text.replace(codeBlockRegex, function(match) {
		return match.replace(/\|/g, 'PIPE_PROTECTED');
	});
	
	const inlineCodeRegex = /`[^`\n]+?`/g;
	text = text.replace(inlineCodeRegex, function(match) {
		return match.replace(/\|/g, 'PIPE_PROTECTED');
	});
	
	return text;
}

function postprocessHTML(html) {
	return html.replace(/PIPE_PROTECTED/g, '|');
}

function updateCounters(text) {
	const words = text.trim().split(/\s+/).filter(word => word.length > 0);
	document.getElementById('wordCount').textContent = `${words.length} palavra${words.length !== 1 ? 's' : ''}`;
	document.getElementById('charCount').textContent = `${text.length} caractere${text.length !== 1 ? 's' : ''}`;
}

// ====== EVENT LISTENERS ======
function setupEventListeners() {
	const editor = document.getElementById('editor');
	
	// Debounce para renderização
	function debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	const debouncedRender = debounce(renderMarkdown, 400);

	editor.addEventListener('input', debouncedRender);
	
	// Botões principais
	document.getElementById('openFileBtn').addEventListener('click', openFile);
	document.getElementById('saveFileBtn').addEventListener('click', saveFile);
	document.getElementById('toGoBackBtn').addEventListener('click', toGoBack);
	document.getElementById('printBtn').addEventListener('click', printDocument);
	document.getElementById('settingsBtn').addEventListener('click', () => {
		setupSettingsPanel();
		document.getElementById('settingsPanel').classList.add('open');
		document.getElementById('overlay').classList.add('active');
	});
	
	// Fechar settings
	document.getElementById('closeSettingsBtn').addEventListener('click', closeSettings);
	document.getElementById('overlay').addEventListener('click', closeSettings);

	// Aplicar configurações
	document.getElementById('applySettingsBtn').addEventListener('click', applySettings);
	document.getElementById('resetSettingsBtn').addEventListener('click', resetSettings);

	// Atualizar valores dos ranges em tempo real
	document.querySelectorAll('input[type="range"]').forEach(range => {
		range.addEventListener('input', updateRangeValue);
	});
}

function updateRangeValue(e) {
	const target = e.target;
	const valueDisplay = document.getElementById(target.id + 'Value');
	
	if (valueDisplay) {
		if (target.id === 'pageMargins') {
			valueDisplay.textContent = target.value + 'mm';
		} else if (target.id === 'zoomLevel') {
			valueDisplay.textContent = target.value + '%';
		} else if (target.id === 'lineHeight') {
			valueDisplay.textContent = target.value;
		} else if (target.id === 'letterSpacing' || target.id === 'wordSpacing') {
			valueDisplay.textContent = target.value + 'px';
		} else if (target.id === 'fontSizeBase') {
			valueDisplay.textContent = target.value + 'px';
		} else if (target.id.startsWith('fontSizeH')) {
			valueDisplay.textContent = target.value + 'em';
		}
	}
}

function applySettings() {
	// Tema
	settings.theme = document.getElementById('themeSelect').value;
	
	// Fontes e alinhamento
	settings.fontFamily = document.getElementById('fontFamily').value;
	settings.textAlign = document.getElementById('textAlign').value;
	
	// Layout
	settings.pageMargins = document.getElementById('pageMargins').value + 'mm';
	settings.zoomLevel = document.getElementById('zoomLevel').value + '%';
	
	// Espaçamentos
	settings.lineHeight = parseFloat(document.getElementById('lineHeight').value);
	settings.letterSpacing = document.getElementById('letterSpacing').value + 'px';
	settings.wordSpacing = document.getElementById('wordSpacing').value + 'px';
	
	// Tamanhos de fonte
	settings.fontSizeBase = document.getElementById('fontSizeBase').value + 'px';
	settings.fontSizeH1 = document.getElementById('fontSizeH1').value + 'em';
	settings.fontSizeH2 = document.getElementById('fontSizeH2').value + 'em';
	settings.fontSizeH3 = (parseFloat(document.getElementById('fontSizeH2').value) * 0.8).toFixed(1) + 'em';
	settings.fontSizeH4 = (parseFloat(document.getElementById('fontSizeH2').value) * 0.7).toFixed(1) + 'em';
	settings.fontSizeH5 = (parseFloat(document.getElementById('fontSizeH2').value) * 0.6).toFixed(1) + 'em';
	settings.fontSizeH6 = (parseFloat(document.getElementById('fontSizeH2').value) * 0.5).toFixed(1) + 'em';
	
	// Cores dos títulos H1-H6
	settings.h1Color = document.getElementById('h1Color').value;
	settings.h1Bg = document.getElementById('h1BgColor').value;
	settings.h2Color = document.getElementById('h2Color').value;
	settings.h2Bg = document.getElementById('h2BgColor').value;
	settings.h3Color = document.getElementById('h3Color').value;
	settings.h3Bg = document.getElementById('h3BgColor').value;
	settings.h4Color = document.getElementById('h4Color').value;
	settings.h4Bg = document.getElementById('h4BgColor').value;
	settings.h5Color = document.getElementById('h5Color').value;
	settings.h5Bg = document.getElementById('h5BgColor').value;
	settings.h6Color = document.getElementById('h6Color').value;
	settings.h6Bg = document.getElementById('h6BgColor').value;
	
	// Cores de código
	settings.codeBlockBg = document.getElementById('codeBlockBg').value;
	settings.codeBlockText = document.getElementById('codeBlockText').value;
	settings.inlineCodeBg = document.getElementById('inlineCodeBg').value;
	settings.inlineCodeText = document.getElementById('inlineCodeText').value;
	
	applyAllSettings();
	closeSettings();
}

function resetSettings() {
	// Restaura configurações padrão
	Object.assign(settings, {
		theme: 'light',
		fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
		textAlign: "left",
		pageMargins: "25mm",
		zoomLevel: "100%",
		lineHeight: 1.6,
		letterSpacing: "0px",
		wordSpacing: "0px",
		fontSizeBase: "14px",
		fontSizeH1: "2em",
		fontSizeH2: "1.6em",
		fontSizeH3: "1.3em",
		fontSizeH4: "1.15em",
		fontSizeH5: "1em",
		fontSizeH6: "0.9em",
		h1Color: "#1a1a1a",
		h1Bg: "#ffffff",
		h2Color: "#2563eb",
		h2Bg: "#ffffff",
		h3Color: "#059669",
		h3Bg: "#ffffff",
		h4Color: "#7c3aed",
		h4Bg: "#ffffff",
		h5Color: "#dc2626",
		h5Bg: "#ffffff",
		h6Color: "#ea580c",
		h6Bg: "#ffffff",
		codeBlockBg: "#1e293b",
		codeBlockText: "#f1f5f9",
		inlineCodeBg: "#e2e8f0",
		inlineCodeText: "#0f172a",
		latexBorder: "#3b82f6"
	});
	
	setupSettingsPanel();
	applyAllSettings();
}

function closeSettings() {
	document.getElementById('settingsPanel').classList.remove('open');
	document.getElementById('overlay').classList.remove('active');
}

// ====== FUNÇÕES DE ARQUIVO ======
function openFile() {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.md,.markdown,text/markdown';
	
	input.onchange = e => {
		const file = e.target.files[0];
		if (!file) return;
		
		const reader = new FileReader();
		reader.onload = event => {
			document.getElementById('editor').value = event.target.result;
			renderMarkdown();
		};
		reader.readAsText(file);
	};
	
	input.click();
}

function saveFile() {
	const content = document.getElementById('editor').value;
	const blob = new Blob([content], { type: 'text/markdown' });
	const url = URL.createObjectURL(blob);
	
	const a = document.createElement('a');
	a.href = url;
	a.download = 'documento.md';
	a.click();
	
	URL.revokeObjectURL(url);
}

function toGoBack() {
	const base = window.location.origin;
	window.location.href = "../index.html";
}

function printDocument() {
	window.print();
}

// ====== INICIALIZAÇÃO ======
function init() {
	setupSettingsPanel();
	setupEventListeners();
	applyAllSettings();
	}

document.addEventListener('DOMContentLoaded', init);

// Função para detectar e ajustar layout responsivo
function initResponsiveLayout() {
    const container = document.querySelector('.container');
    const editorContainer = document.querySelector('.editor-container');
    const previewContainer = document.querySelector('.preview-container');
    
    function updateLayout() {
        const width = window.innerWidth;
        
        if (width < 992) {
            // Modo mobile - uma coluna
            container.style.flexDirection = 'column';
            editorContainer.style.minHeight = '400px';
            previewContainer.style.minHeight = '500px';
        } else {
            // Modo desktop - duas colunas
            container.style.flexDirection = 'row';
            editorContainer.style.minHeight = '600px';
            previewContainer.style.minHeight = '600px';
        }
        
        // Ajusta zoom para telas muito pequenas
        if (width < 480) {
            document.documentElement.style.setProperty('--zoom-level', '0.8');
        } else if (width < 768) {
            document.documentElement.style.setProperty('--zoom-level', '0.9');
        } else {
            document.documentElement.style.setProperty('--zoom-level', '1');
        }
    }
    
    // Executa na inicialização e no redimensionamento
    updateLayout();
    window.addEventListener('resize', updateLayout);
}

// Modifique a função de inicialização existente para incluir:
function initializeEditor() {
    // ... código existente ...
    
    // Inicializa layout responsivo
    initResponsiveLayout();
    
    // ... resto do código existente ...
}

// Adiciona tratamento de toque para mobile
function initTouchSupport() {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    
    // Previne zoom duplo-tap em elementos interativos
    editor.addEventListener('touchend', function(e) {
        if (e.touches && e.touches.length > 1) {
            e.preventDefault();
        }
    });
    
    // Melhora scrolling em mobile
    preview.style.WebkitOverflowScrolling = 'touch';
}

// Chama as funções de inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeEditor();
    initTouchSupport();
});

// Adicione estas funções ao seu script.js

// Função para melhorar a responsividade das tabelas
function enhanceTablesResponsiveness() {
    const pageContent = document.querySelector('.page-content');
    if (!pageContent) return;
    
    // Observa mudanças no conteúdo do preview
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                processTables();
            }
        });
    });
    
    observer.observe(pageContent, { childList: true, subtree: true });
    
    // Processa tabelas existentes
    processTables();
}

function processTables() {
    const tables = document.querySelectorAll('.page-content table');
    
    tables.forEach((table, index) => {
        // Adiciona container responsivo para tabelas largas
        if (!table.parentElement.classList.contains('table-container')) {
            const container = document.createElement('div');
            container.className = 'table-container';
            table.parentNode.insertBefore(container, table);
            container.appendChild(table);
        }
        
        // Adiciona labels para mobile
        addMobileLabels(table);
        
        // Detecta tabelas com muitas colunas
        const columnCount = table.rows[0] ? table.rows[0].cells.length : 0;
        if (columnCount > 5) {
            table.classList.add('many-columns');
        }
        
        // Ajusta largura das colunas
        autoAdjustColumns(table);
    });
}

function addMobileLabels(table) {
    const headers = [];
    const thCells = table.querySelectorAll('th');
    
    // Coleta os cabeçalhos
    thCells.forEach(th => {
        headers.push(th.textContent.trim());
    });
    
    // Adiciona data-labels para mobile
    const rows = table.querySelectorAll('tr');
    rows.forEach((row, rowIndex) => {
        if (rowIndex === 0) return; // Pula linha de cabeçalho
        
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, cellIndex) => {
            if (headers[cellIndex]) {
                cell.setAttribute('data-label', headers[cellIndex]);
            }
        });
    });
}

function autoAdjustColumns(table) {
    // Ajusta automaticamente a largura das colunas baseado no conteúdo
    const rows = table.rows;
    if (rows.length === 0) return;
    
    const colCount = rows[0].cells.length;
    
    for (let col = 0; col < colCount; col++) {
        let maxWidth = 0;
        
        // Encontra a largura máxima da coluna
        for (let row = 0; row < rows.length; row++) {
            if (rows[row].cells[col]) {
                const cell = rows[row].cells[col];
                const contentWidth = cell.textContent.length;
                maxWidth = Math.max(maxWidth, contentWidth);
            }
        }
        
        // Ajusta a largura da coluna (limite máximo de 30% por coluna)
        const maxColWidth = 30; // porcentagem
        const calculatedWidth = Math.min((maxWidth * 0.5) + 10, maxColWidth);
        
        for (let row = 0; row < rows.length; row++) {
            if (rows[row].cells[col]) {
                rows[row].cells[col].style.minWidth = calculatedWidth + '%';
                rows[row].cells[col].style.maxWidth = maxColWidth + '%';
            }
        }
    }
}

// Função para forçar redimensionamento de tabelas
function refreshTables() {
    processTables();
}

// Modifique a função de atualização do preview para incluir tabelas
function updatePreview() {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    
    if (editor && preview) {
        const markdownText = editor.value;
        const htmlContent = marked.parse(markdownText);
        
        // Atualiza o conteúdo
        const pagesContainer = document.getElementById('pagesContainer');
        pagesContainer.innerHTML = `
            <div class="a4-page">
                <div class="page-content">
                    ${htmlContent}
                </div>
            </div>
        `;
        
        // Renderiza LaTeX
        renderMathInElement(pagesContainer, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            throwOnError: false
        });
        
        // Aplica realce de sintaxe
        pagesContainer.querySelectorAll('pre code').forEach((block) => {
            Prism.highlightElement(block);
        });
        
        // Processa tabelas para responsividade
        setTimeout(() => {
            processTables();
        }, 100);
        
        updateWordCount();
        updatePageCount();
    }
}

// Inicializa o enhancement de tabelas quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    // Inicializa responsividade das tabelas
    enhanceTablesResponsiveness();
    
    // Re-processa tabelas quando a janela for redimensionada
    window.addEventListener('resize', function() {
        refreshTables();
    });
});