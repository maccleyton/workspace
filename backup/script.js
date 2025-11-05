// ====== SISTEMA DE CONFIGURAÇÕES COMPLETO ======
const settings = {
	// Tema
	theme: 'light',
	
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
	
	// Cores de código - FUNDOS DIFERENCIADOS
	codeBlockBg: "#1e293b",
	codeBlockText: "#f1f5f9",
	inlineCodeBg: "#e2e8f0",
	inlineCodeText: "#0f172a",
	latexBorder: "#3b82f6"
};

// ====== SISTEMA DE PAGINAÇÃO CORRIGIDO ======
class PaginationSystem {
	constructor() {
		this.pages = [];
		this.currentPage = null;
		this.pageCounter = 0;
		this.pageHeight = 297; // mm
		this.margins = 25; // mm
		this.contentHeight = this.pageHeight - (this.margins * 2);
	}

	createNewPage() {
		this.pageCounter++;
		const page = document.createElement('div');
		page.className = 'a4-page';
		
		const content = document.createElement('div');
		content.className = 'page-content';
		
		const header = document.createElement('div');
		header.className = 'page-header';
		header.textContent = `Documento - Página ${this.pageCounter}`;
		content.appendChild(header);
		
		page.appendChild(content);
		this.pages.push({ 
			element: page, 
			content: content, 
			height: 40, // Altura do cabeçalho
			elements: []
		});
		this.currentPage = this.pages[this.pages.length - 1];
		
		return this.currentPage;
	}

	addElementToPage(element, isHeading = false) {
		if (!this.currentPage) {
			this.createNewPage();
		}

		const elementHeight = this.calculateElementHeight(element);
		
		// VERIFICA SE PRECISA CRIAR NOVA PÁGINA PARA HEADINGS
		if (isHeading && this.shouldBreakPageForHeading(element)) {
			this.createNewPage();
		}
		
		// VERIFICA SE O ELEMENTO CABE NA PÁGINA ATUAL
		if (this.currentPage.height + elementHeight > this.contentHeight && this.currentPage.height > 50) {
			this.createNewPage();
		}

		// ADICIONA O ELEMENTO À PÁGINA ATUAL
		this.currentPage.content.appendChild(element);
		this.currentPage.elements.push(element);
		this.currentPage.height += elementHeight;
	}

	calculateElementHeight(element) {
		const tempDiv = document.createElement('div');
		tempDiv.style.cssText = `
			position: absolute; 
			visibility: hidden; 
			width: 160mm; 
			font-family: inherit; 
			font-size: inherit; 
			line-height: inherit;
			padding: 0;
			margin: 0;
		`;
		
		const clone = element.cloneNode(true);
		tempDiv.appendChild(clone);
		document.body.appendChild(tempDiv);
		
		const height = (tempDiv.offsetHeight / 3.78) + 10; // Convert pixels to mm + margem
		document.body.removeChild(tempDiv);
		
		return height;
	}

	shouldBreakPageForHeading(element) {
		const tagName = element.tagName;
		
		// H1 SEMPRE QUEBRA PÁGINA (exceto se for o primeiro elemento)
		if (tagName === 'H1') {
			return this.currentPage.elements.length > 0;
		} 
		// H2 QUEBRA PÁGINA APENAS SE NÃO VIER LOGO APÓS H1
		else if (tagName === 'H2') {
			const lastElement = this.currentPage.elements[this.currentPage.elements.length - 1];
			return lastElement && lastElement.tagName !== 'H1' && this.currentPage.elements.length > 0;
		}
		
		return false;
	}

	renderPages(container) {
		container.innerHTML = '';
		this.pages.forEach((page, index) => {
			const counter = document.createElement('div');
			counter.className = 'page-counter';
			counter.textContent = `${index + 1}`;
			page.element.appendChild(counter);
			
			container.appendChild(page.element);
		});
		document.getElementById('pageCount').textContent = `${this.pages.length} página${this.pages.length !== 1 ? 's' : ''}`;
	}

	clear() {
		this.pages = [];
		this.currentPage = null;
		this.pageCounter = 0;
	}
}

const pagination = new PaginationSystem();

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

// ====== CONFIGURAÇÃO DO PAINEL ======
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

// ====== FUNÇÕES PRINCIPAIS ======

function distributeContentToPages(html) {
pagination.clear();

const tempContainer = document.createElement('div');
tempContainer.innerHTML = html;

// Varremos manualmente com índice para evitar duplicação
const nodes = Array.from(tempContainer.childNodes).filter(n => n.nodeType === 1); // só elementos
let i = 0;

while (i < nodes.length) {
const el = nodes[i];
const tag = el.tagName || "";
const next = nodes[i + 1];
const nextTag = next ? (next.tagName || "") : "";

// Helper: clonar seguro
const cloneEl = (n) => n ? n.cloneNode(true) : null;

// 1) Título (H1..H6) + bloco seguinte (TABLE | PRE | UL | OL)
if (/^H[1-6]$/.test(tag) && next && /^(TABLE|PRE|UL|OL)$/.test(nextTag)) {
	// Caso lista: agrupar apenas o título + primeiro item da lista
	if (/^(UL|OL)$/.test(nextTag)) {
		const list = next;
		const firstItem = list.children[0];

		const group = document.createElement('div');
		group.className = 'keep-together';
		group.appendChild(cloneEl(el));
		if (firstItem) {
			const newListForFirst = document.createElement(nextTag.toLowerCase());
			newListForFirst.appendChild(firstItem.cloneNode(true));
			group.appendChild(newListForFirst);
		}
		pagination.addElementToPage(group, true);

		// Criar lista residual com os demais itens (pode quebrar entre páginas)
		if (list.children.length > 1) {
			const residual = document.createElement(nextTag.toLowerCase());
			for (let k = 1; k < list.children.length; k++) {
				residual.appendChild(list.children[k].cloneNode(true));
			}
			pagination.addElementToPage(residual, false);
		}

		i += 2; // consumiu Hx e UL/OL
		continue;
	}
	// Caso tabela/código: agrupa título + bloco inteiro
	if (/^(TABLE|PRE)$/.test(nextTag)) {
		const group = document.createElement('div');
		group.className = 'keep-together';
		group.appendChild(cloneEl(el));
		group.appendChild(cloneEl(next));
		pagination.addElementToPage(group, true);
		i += 2;
		continue;
	}
}

// 2) Parágrafo com "título" + lista logo abaixo
if (tag === "P" && next && /^(UL|OL)$/.test(nextTag)) {
	// Se o parágrafo não for vazio, considera como título antecedente
	const text = el.textContent.trim();
	if (text.length > 0) {
		const list = next;
		const firstItem = list.children[0];

		const group = document.createElement('div');
		group.className = 'keep-together';
		group.appendChild(cloneEl(el));
		if (firstItem) {
			const newListForFirst = document.createElement(nextTag.toLowerCase());
			newListForFirst.appendChild(firstItem.cloneNode(true));
			group.appendChild(newListForFirst);
		}
		pagination.addElementToPage(group, false);

		if (list.children.length > 1) {
			const residual = document.createElement(nextTag.toLowerCase());
			for (let k = 1; k < list.children.length; k++) {
				residual.appendChild(list.children[k].cloneNode(true));
			}
			pagination.addElementToPage(residual, false);
		}

		i += 2;
		continue;
	}
}

// 3) Parágrafo com "título" + tabela/código abaixo -> manter juntos
if (tag === "P" && next && /^(TABLE|PRE)$/.test(nextTag)) {
	const text = el.textContent.trim();
	if (text.length > 0) {
		const group = document.createElement('div');
		group.className = 'keep-together';
		group.appendChild(cloneEl(el));
		group.appendChild(cloneEl(next));
		pagination.addElementToPage(group, false);
		i += 2;
		continue;
	}
}

// Padrão: adiciona elemento atual (sem duplicar)
const isHeading = /^H[1-6]$/.test(tag);
pagination.addElementToPage(cloneEl(el), isHeading);
i += 1;
}

pagination.renderPages(document.getElementById('pagesContainer'));

// Renderiza LaTeX nas páginas
if (window.renderMathInElement) {
setTimeout(() => {
	document.querySelectorAll('.page-content').forEach(content => {
		renderMathInElement(content, {
			delimiters: [
				{left: '$$', right: '$$', display: true},
				{left: '$', right: '$', display: false},
				{left: '\[', right: '\]', display: true}
			],
			throwOnError: false
		});
	});
}, 100);
}
}

function renderMarkdown() {
	const markdownText = document.getElementById('editor').value;
	updateCounters(markdownText);
	
	const processedText = preprocessMarkdown(markdownText);
	
	marked.setOptions({
		highlight: function(code, lang) {
			const langClass = lang ? `language-${lang}` : '';
			return `<pre class="keep-together"><code class="${langClass}">${escapeHtml(code)}</code></pre>`;
		},
		breaks: true,
		gfm: true
	});
	
	try {
		let htmlContent = marked.parse(processedText);
		htmlContent = postprocessHTML(htmlContent);
		
		distributeContentToPages(htmlContent);
	} catch (error) {
		console.error('Erro ao renderizar Markdown:', error);
		document.getElementById('pagesContainer').innerHTML = '<div class="a4-page"><div class="page-content"><p>Erro ao renderizar o conteúdo. Verifique o formato do Markdown.</p></div></div>';
	}
}

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
