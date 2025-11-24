// Global variables
const editor = document.getElementById('markdownEditor');
const preview = document.getElementById('markdownPreview');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const lineCount = document.getElementById('lineCount');
const navSidebarContent = document.getElementById('navSidebarContent');
const settingsOverlay = document.getElementById('settingsOverlay');

// Tab management
let tabs = [
	{ id: 0, name: 'Documento 1', content: editor.value }
];
let currentTabId = 0;
let nextTabId = 1;

// Initialize
window.onload = () => {
	loadSettings();
	updatePreview();
	updateStats();
	updateNavigation();
};

// Tab Functions
function addNewTab() {
	const newTab = {
		id: nextTabId,
		name: `Documento ${nextTabId + 1}`,
		content: ''
	};
	tabs.push(newTab);
	renderTabs();
	switchTab(nextTabId);
	nextTabId++;
}

function closeTab(tabId, event) {
	event.stopPropagation();
	if (tabs.length === 1) {
		alert('Você deve manter pelo menos uma aba aberta!');
		return;
	}
	const index = tabs.findIndex(t => t.id === tabId);
	if (index !== -1) {
		tabs.splice(index, 1);
		if (currentTabId === tabId) {
			switchTab(tabs[0].id);
		}
		renderTabs();
	}
}

function switchTab(tabId) {
	// Save current tab content
	const currentTab = tabs.find(t => t.id === currentTabId);
	if (currentTab) {
		currentTab.content = editor.value;
	}

	// Switch to new tab
	currentTabId = tabId;
	const newTab = tabs.find(t => t.id === tabId);
	if (newTab) {
		editor.value = newTab.content;
		updatePreview();
		updateStats();
		updateNavigation();
	}

	renderTabs();
}

function renderTabs() {
	const container = document.getElementById('tabsContainer');
	container.innerHTML = '';

	tabs.forEach(tab => {
		const tabBtn = document.createElement('button');
		tabBtn.className = 'tab' + (tab.id === currentTabId ? ' active' : '');
		tabBtn.innerHTML = `
			<i class="fas fa-file-alt"></i>
			<span class="tab-name">${tab.name}</span>
			<i class="fas fa-times tab-close"></i>
		`;
		tabBtn.querySelector('.tab-close').onclick = (e) => closeTab(tab.id, e);
		tabBtn.onclick = () => switchTab(tab.id);
		container.appendChild(tabBtn);
	});

	const addBtn = document.createElement('button');
	addBtn.className = 'add-tab-btn';
	addBtn.innerHTML = '<i class="fas fa-plus"></i>';
	addBtn.onclick = addNewTab;
	container.appendChild(addBtn);
}

// Wrap LaTeX blocks with custom styling
function wrapLatexBlocks() {
	const mathBlocks = preview.querySelectorAll('mjx-container[display="true"]');
	
	mathBlocks.forEach(block => {
		// Check if already wrapped
		if (block.parentElement.classList.contains('latex-block-wrapper')) {
			return;
		}
		
		// Create wrapper
		const wrapper = document.createElement('div');
		wrapper.className = 'latex-block-wrapper';
		
		// Create label
		const label = document.createElement('div');
		label.className = 'latex-block-label';
		label.textContent = 'LATEX';
		
		// Wrap the block
		block.parentNode.insertBefore(wrapper, block);
		wrapper.appendChild(block);
		wrapper.appendChild(label);
	});
}

// Update preview and stats
function updatePreview() {
	let markdownText = editor.value;
	
	// Salvar posição do scroll antes de atualizar
	const scrollPos = preview.scrollTop;
	const scrollPercentage = preview.scrollHeight > 0 ? scrollPos / preview.scrollHeight : 0;
	
	// Processar linha por linha para proteger pipes em código inline apenas em linhas de tabela
	const lines = markdownText.split('\n');
	const processedLines = lines.map(line => {
		// Detectar se é uma linha de tabela (contém | fora de backticks)
		// Contar pipes fora de código
		let inCode = false;
		let pipeCount = 0;
		
		for (let i = 0; i < line.length; i++) {
			if (line[i] === '`') {
				inCode = !inCode;
			} else if (line[i] === '|' && !inCode) {
				pipeCount++;
			}
		}
		
		// Se tem pelo menos 1 pipe fora de código, é provável que seja tabela
		if (pipeCount > 0) {
			// Proteger pipes dentro de código usando barra invertida
			let result = '';
			let inBacktick = false;
			
			for (let i = 0; i < line.length; i++) {
				if (line[i] === '`') {
					inBacktick = !inBacktick;
					result += line[i];
				} else if (line[i] === '|' && inBacktick) {
					// Usar barra invertida para escapar pipe dentro de código
					result += '\\|';
				} else {
					result += line[i];
				}
			}
			
			return result;
		}
		
		return line;
	});
	
	markdownText = processedLines.join('\n');
	
	// Configurar marked.js
	marked.setOptions({
		breaks: true,
		gfm: true
	});
	
	// Parse do markdown
	let html = marked.parse(markdownText);
	
	preview.innerHTML = html;
	
	updateStats();
	updateNavigation();

	if (window.MathJax) {
		setTimeout(() => {
			MathJax.typesetPromise([preview]).then(() => {
				wrapLatexBlocks();
				// Restaurar posição do scroll após renderização
				preview.scrollTop = preview.scrollHeight * scrollPercentage;
			}).catch((err) => console.error(err.message));
		}, 0);
	} else {
		// Restaurar posição do scroll se não houver MathJax
		setTimeout(() => {
			preview.scrollTop = preview.scrollHeight * scrollPercentage;
		}, 50);
	}

	preview.querySelectorAll('pre code').forEach((block) => {
		hljs.highlightBlock(block);
	});
}

function updateStats() {
	const text = editor.value;
	const words = text.trim() ? text.trim().split(/\s+/).length : 0;
	const lines = text.split('\n').length;
	
	charCount.textContent = `${text.length} caracteres`;
	wordCount.textContent = `${words} palavras`;
	lineCount.textContent = `${lines} linhas`;
}

function updateNavigation() {
	const headings = preview.querySelectorAll('h1, h2, h3, h4, h5, h6');
	navSidebarContent.innerHTML = '';

	if (headings.length === 0) {
		navSidebarContent.innerHTML = '<div class="nav-empty">Nenhum título encontrado</div>';
		return;
	}

	headings.forEach((heading, index) => {
		const level = heading.tagName.toLowerCase();
		const text = heading.textContent;
		const navItem = document.createElement('button');
		navItem.className = `nav-heading level-${level.charAt(1)}`;
		navItem.textContent = text;
		navItem.onclick = () => scrollToHeading(heading);
		navSidebarContent.appendChild(navItem);
	});
}

function scrollToHeading(heading) {
	// Scroll preview
	heading.scrollIntoView({ behavior: 'smooth', block: 'start' });

	// Try to scroll editor to corresponding line
	const headingText = heading.textContent;
	const editorContent = editor.value;
	const lines = editorContent.split('\n');
	
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].includes(headingText)) {
			const lineHeight = parseInt(window.getComputedStyle(editor).lineHeight);
			editor.scrollTop = i * lineHeight;
			break;
		}
	}
}

editor.addEventListener('input', updatePreview);

// Toggle Navigation Sidebar
function toggleNavSidebar() {
	const navSidebar = document.querySelector('.nav-sidebar');
	navSidebar.classList.toggle('collapsed');
}

// Tab handling
function handleTabKey(e) {
	if (e.key === 'Tab') {
		e.preventDefault();
		
		const start = editor.selectionStart;
		const end = editor.selectionEnd;
		const text = editor.value;
		
		if (start !== end) {
			const before = text.substring(0, start);
			const selected = text.substring(start, end);
			const after = text.substring(end);
			
			if (e.shiftKey) {
				const dedented = selected.replace(/^( {2}|\t)/gm, '');
				editor.value = before + dedented + after;
				editor.setSelectionRange(start, start + dedented.length);
			} else {
				const indented = selected.replace(/^/gm, '  ');
				editor.value = before + indented + after;
				editor.setSelectionRange(start, start + indented.length);
			}
		} else {
			const spaces = '  ';
			editor.value = text.substring(0, start) + spaces + text.substring(end);
			editor.setSelectionRange(start + spaces.length, start + spaces.length);
		}
		
		updatePreview();
	}
}

editor.addEventListener('keydown', handleTabKey);

// Text insertion functions
function insertText(prefix, suffix) {
	const start = editor.selectionStart;
	const end = editor.selectionEnd;
	const text = editor.value;

	const before = text.substring(0, start);
	const selected = text.substring(start, end);
	const after = text.substring(end);

	let newText;
	if (selected.length > 0) {
		newText = before + prefix + selected + suffix + after;
	} else {
		newText = before + prefix + suffix + after;
	}

	editor.value = newText;
	const cursorPos = selected.length > 0 ? end + prefix.length + suffix.length : start + prefix.length;
	editor.setSelectionRange(cursorPos, cursorPos);
	editor.focus();
	updatePreview();
}

function insertTable() {
	const tableTemplate = `| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Célula 1 | Célula 2 | Célula 3 |
| Célula 4 | Célula 5 | Célula 6 |

`;
	insertText(tableTemplate, '');
}

function insertLink() {
	const start = editor.selectionStart;
	const end = editor.selectionEnd;
	const text = editor.value;
	const selected = text.substring(start, end);
	
	if (selected.length > 0) {
		insertText('[', '](url)');
	} else {
		insertText('[texto do link](', ')');
	}
}

function insertImage() {
	const start = editor.selectionStart;
	const end = editor.selectionEnd;
	const text = editor.value;
	const selected = text.substring(start, end);
	
	if (selected.length > 0) {
		insertText('![', '](url-da-imagem)');
	} else {
		insertText('![texto alternativo](', ')');
	}
}

function insertDefinitionList() {
	const defListTemplate = `Termo 1\n: Definição do termo 1\n\nTermo 2\n: Definição do termo 2\n\n`;
	insertText(defListTemplate, '');
}

function newDocument() {
	addNewTab();
}

function saveMarkdown() {
	const currentTab = tabs.find(t => t.id === currentTabId);
	const text = editor.value;
	const blob = new Blob([text], {type: 'text/markdown'});
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${currentTab.name}.md`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function loadMarkdownFile() {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = '.md,.markdown,.txt';
	
	input.onchange = e => {
		const file = e.target.files[0];
		if (!file) return;
		
		const reader = new FileReader();
		reader.onload = function(e) {
			editor.value = e.target.result;
			updatePreview();
		};
		reader.readAsText(file);
	};
	
	input.click();
}

function printDocument() {
	window.print();
}

function exportDocument() {
	saveMarkdown();
}

// Settings Functions
function openSettings() {
	settingsOverlay.classList.add('active');
}

function closeSettings() {
	settingsOverlay.classList.remove('active');
}

function setTheme(theme) {
	document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
	event.target.classList.add('active');
	
	if (theme === 'light') {
		document.body.classList.add('light-theme');
	} else {
		document.body.classList.remove('light-theme');
	}
	
	saveSettings();
}

function applySettings() {
	const root = document.documentElement;

	// Heading colors
	for (let i = 1; i <= 6; i++) {
		root.style.setProperty(`--h${i}-color`, document.getElementById(`h${i}Color`).value);
		const bgTransparent = document.getElementById(`h${i}BgTransparent`).checked;
		root.style.setProperty(`--h${i}-bg`, bgTransparent ? 'transparent' : document.getElementById(`h${i}Bg`).value);
	}

	// Code inline
	root.style.setProperty('--code-inline-color', document.getElementById('codeInlineColor').value);
	root.style.setProperty('--code-inline-bg', document.getElementById('codeInlineBg').value);

	// LaTeX inline
	root.style.setProperty('--latex-inline-color', document.getElementById('latexInlineColor').value);
	const latexInlineBgTransparent = document.getElementById('latexInlineBgTransparent').checked;
	root.style.setProperty('--latex-inline-bg', latexInlineBgTransparent ? 'transparent' : document.getElementById('latexInlineBg').value);

	// Quote
	root.style.setProperty('--quote-color', document.getElementById('quoteColor').value);
	root.style.setProperty('--quote-bg', document.getElementById('quoteBg').value);
	root.style.setProperty('--quote-border', document.getElementById('quoteBorder').value);

	// LaTeX block
	root.style.setProperty('--latex-block-color', document.getElementById('latexBlockColor').value);
	root.style.setProperty('--latex-block-bg', document.getElementById('latexBlockBg').value);
	root.style.setProperty('--latex-block-border', document.getElementById('latexBlockBorder').value);

	// Code block
	root.style.setProperty('--code-block-bg', document.getElementById('codeBlockBg').value);
	root.style.setProperty('--code-block-border', document.getElementById('codeBlockBorder').value);

	// Table header
	root.style.setProperty('--table-header-bg', document.getElementById('tableHeaderBg').value);

	// HR
	root.style.setProperty('--hr-color', document.getElementById('hrColor').value);
	root.style.setProperty('--hr-thickness', document.getElementById('hrThickness').value + 'px');
	root.style.setProperty('--hr-style', document.getElementById('hrStyle').value);

	// Spacing
	root.style.setProperty('--spacing-horizontal', document.getElementById('spacingHorizontal').value);
	root.style.setProperty('--spacing-vertical', document.getElementById('spacingVertical').value);
	root.style.setProperty('--word-spacing', document.getElementById('wordSpacing').value);
	root.style.setProperty('--margins', document.getElementById('margins').value + 'px');

	// Alignment
	root.style.setProperty('--text-align', document.getElementById('textAlign').value);

	// Font
	root.style.setProperty('--font-family', document.getElementById('fontFamily').value);

	// Font sizes
	root.style.setProperty('--h1-size', document.getElementById('h1Size').value);
	root.style.setProperty('--h2-size', document.getElementById('h2Size').value);
	root.style.setProperty('--h3-size', document.getElementById('h3Size').value);
	root.style.setProperty('--h4-size', document.getElementById('h4Size').value);
	root.style.setProperty('--h5-size', document.getElementById('h5Size').value);
	root.style.setProperty('--h6-size', document.getElementById('h6Size').value);
	root.style.setProperty('--p-size', document.getElementById('pSize').value);
	root.style.setProperty('--quote-size', document.getElementById('quoteSize').value);

	saveSettings();
	closeSettings();
	updatePreview();
}

function saveSettings() {
	const settings = {
		theme: document.body.classList.contains('light-theme') ? 'light' : 'dark',
		h1Color: document.getElementById('h1Color').value,
		h1Bg: document.getElementById('h1Bg').value,
		h1BgTransparent: document.getElementById('h1BgTransparent').checked,
		h2Color: document.getElementById('h2Color').value,
		h2Bg: document.getElementById('h2Bg').value,
		h2BgTransparent: document.getElementById('h2BgTransparent').checked,
		h3Color: document.getElementById('h3Color').value,
		h3Bg: document.getElementById('h3Bg').value,
		h3BgTransparent: document.getElementById('h3BgTransparent').checked,
		h4Color: document.getElementById('h4Color').value,
		h4Bg: document.getElementById('h4Bg').value,
		h4BgTransparent: document.getElementById('h4BgTransparent').checked,
		h5Color: document.getElementById('h5Color').value,
		h5Bg: document.getElementById('h5Bg').value,
		h5BgTransparent: document.getElementById('h5BgTransparent').checked,
		h6Color: document.getElementById('h6Color').value,
		h6Bg: document.getElementById('h6Bg').value,
		h6BgTransparent: document.getElementById('h6BgTransparent').checked,
		codeInlineColor: document.getElementById('codeInlineColor').value,
		codeInlineBg: document.getElementById('codeInlineBg').value,
		latexInlineColor: document.getElementById('latexInlineColor').value,
		latexInlineBg: document.getElementById('latexInlineBg').value,
		latexInlineBgTransparent: document.getElementById('latexInlineBgTransparent').checked,
		quoteColor: document.getElementById('quoteColor').value,
		quoteBg: document.getElementById('quoteBg').value,
		quoteBorder: document.getElementById('quoteBorder').value,
		latexBlockColor: document.getElementById('latexBlockColor').value,
		latexBlockBg: document.getElementById('latexBlockBg').value,
		latexBlockBorder: document.getElementById('latexBlockBorder').value,
		codeBlockBg: document.getElementById('codeBlockBg').value,
		codeBlockBorder: document.getElementById('codeBlockBorder').value,
		tableHeaderBg: document.getElementById('tableHeaderBg').value,
		hrColor: document.getElementById('hrColor').value,
		hrThickness: document.getElementById('hrThickness').value,
		hrStyle: document.getElementById('hrStyle').value,
		spacingHorizontal: document.getElementById('spacingHorizontal').value,
		spacingVertical: document.getElementById('spacingVertical').value,
		wordSpacing: document.getElementById('wordSpacing').value,
		margins: document.getElementById('margins').value,
		textAlign: document.getElementById('textAlign').value,
		fontFamily: document.getElementById('fontFamily').value,
		h1Size: document.getElementById('h1Size').value,
		h2Size: document.getElementById('h2Size').value,
		h3Size: document.getElementById('h3Size').value,
		h4Size: document.getElementById('h4Size').value,
		h5Size: document.getElementById('h5Size').value,
		h6Size: document.getElementById('h6Size').value,
		pSize: document.getElementById('pSize').value,
		quoteSize: document.getElementById('quoteSize').value
	};

	localStorage.setItem('markdownEditorSettings', JSON.stringify(settings));
}

function loadSettings() {
	const savedSettings = localStorage.getItem('markdownEditorSettings');
	if (!savedSettings) return;

	const settings = JSON.parse(savedSettings);

	// Apply theme
	if (settings.theme === 'light') {
		document.body.classList.add('light-theme');
		document.querySelectorAll('.theme-btn')[1].classList.add('active');
		document.querySelectorAll('.theme-btn')[0].classList.remove('active');
	}

	// Load all settings
	Object.keys(settings).forEach(key => {
		const element = document.getElementById(key);
		if (element) {
			if (element.type === 'checkbox') {
				element.checked = settings[key];
			} else {
				element.value = settings[key];
			}
		}
	});

	applySettings();
}

function resetSettings() {
	if (confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
		localStorage.removeItem('markdownEditorSettings');
		location.reload();
	}
}

document.getElementById('toGoBackBtn').addEventListener('click', toGoBack);

function toGoBack() {
	const base = window.location.origin;
	window.location.href = "../index.html";
}

// Close settings on overlay click
settingsOverlay.addEventListener('click', (e) => {
	if (e.target === settingsOverlay) {
		closeSettings();
	}
});
