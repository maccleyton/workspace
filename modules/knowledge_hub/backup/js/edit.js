window.addEventListener('load', function() {
	if (!marked) { 
		console.error('Biblioteca marked não carregada');
		alert('Erro ao carregar biblioteca marked. Recarregue a página.');
		return; 
	}

	const editor = document.getElementById('editor');
	const preview = document.getElementById('preview');
	const tocContent = document.getElementById('tocContent');
	


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

	// ✅ FUNÇÃO DE RENDERIZAÇÃO CORRIGIDA - VERSÃO 1
	function renderMarkdown() {
		let markdownText = editor.value;
		
		// Salvar posição do scroll antes de atualizar
		const scrollPos = preview.scrollTop;
		const scrollPercentage = preview.scrollHeight > 0 ? scrollPos / preview.scrollHeight : 0;
		
		if (!markdownText.trim()) {
			preview.innerHTML = '<div style="color:#6b7280;text-align:center;padding:40px;">Digite algo...</div>';
			updateTOC();
			updateStats();
			return;
		}
		
		try {
			// ✅ PROCESSAR LINHA POR LINHA PARA PROTEGER PIPES EM CÓDIGO INLINE
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
			
			// Configurar marked
			marked.setOptions({
				breaks: true,
				gfm: true
			});
			
			preview.innerHTML = marked.parse(markdownText);
			updateTOC();
			updateStats();
			
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
		} catch (e) {
			console.error('Erro na renderização:', e);
			preview.innerHTML = `<div style="color:#dc2626">Erro de renderização: ${e.message}</div>`;
		}
	}

	function updateTOC() {
		try {
			const headings = preview.querySelectorAll('h1,h2,h3,h4,h5,h6');
			if (!headings.length) {
				tocContent.innerHTML = '<div style="color:#6b7280;text-align:center;padding:20px;font-size:12px;">Nenhum título</div>';
				return;
			}
			tocContent.innerHTML = '';
			headings.forEach((h, i) => {
				h.id = `h${i}`;
				const item = document.createElement('div');
				item.className = `toc-item toc-${h.tagName.toLowerCase()}`;
				item.textContent = h.textContent;
				item.onclick = () => {
					h.scrollIntoView({ behavior: 'smooth', block: 'center' });
					document.querySelectorAll('.toc-item').forEach(el => el.classList.remove('active'));
					item.classList.add('active');
				};
				tocContent.appendChild(item);
			});
		} catch (e) {
			console.error('Erro ao atualizar TOC:', e);
			tocContent.innerHTML = '<div style="color:#dc2626;text-align:center;padding:20px;font-size:12px;">Erro no TOC</div>';
		}
	}

	function updateStats() {
		const text = editor.value;
		document.getElementById('charCount').textContent = `${text.length} caracteres`;
		document.getElementById('wordCount').textContent = `${text.trim() ? text.trim().split(/\s+/).length : 0} palavras`;
	}

	editor.addEventListener('input', renderMarkdown);

	let syncing = false;
	editor.addEventListener('scroll', () => {
		if (syncing) return;
		syncing = true;
		const pct = editor.scrollTop / (editor.scrollHeight - editor.clientHeight || 1);
		preview.scrollTop = pct * (preview.scrollHeight - preview.clientHeight);
		setTimeout(() => syncing = false, 10);
	});

	window.saveDocument = () => {
		const title = document.getElementById('docTitle').value.trim();
		const content = editor.value;
		
		if (!title) {
			alert('Por favor, digite um título para o documento.');
			return;
		}
		
		// Obter ID do documento da URL ou criar novo
		const urlParams = new URLSearchParams(window.location.search);
		let docId = urlParams.get('id');
		
		// Obter documentos existentes
		let documents = [];
		try {
			documents = JSON.parse(localStorage.getItem('hubDocuments') || '[]');
		} catch (e) {
			documents = [];
		}
		
		if (docId) {
			// Atualizar documento existente
			const docIndex = documents.findIndex(d => d.id === docId);
			if (docIndex !== -1) {
				documents[docIndex] = {
					...documents[docIndex],
					title: title,
					content: content,
					timestamp: new Date().toISOString()
				};
			}
		} else {
			// Criar novo documento
			docId = Date.now().toString();
			const newDoc = {
				id: docId,
				title: title,
				content: content,
				timestamp: new Date().toISOString(),
				children: []
			};
			documents.push(newDoc);
		}
		
		// Salvar documentos
		localStorage.setItem('hubDocuments', JSON.stringify(documents));
		
		document.getElementById('saveStatus').textContent = '✓ Salvo no Hub';
		setTimeout(() => document.getElementById('saveStatus').textContent = '', 2000);
	};

	window.exportMarkdown = () => {
		const blob = new Blob([editor.value], { type: 'text/markdown' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = `${document.getElementById('docTitle').value || 'documento'}.md`;
		a.click();
	};

	window.goBackToHub = () => {
		if (confirm('Voltar ao Hub Central? Documentos não salvos podem ser perdidos.')) {
			window.location.href = 'index.html';
		}
	};
	
	window.goToAssistant = () => location.href = 'assistant.html';
	window.openSettings = () => document.getElementById('settingsModal').classList.add('active');
	window.closeSettings = () => document.getElementById('settingsModal').classList.remove('active');

	window.applySettings = () => {
		const root = document.documentElement.style;
		root.setProperty('--h1-color', document.getElementById('h1Color').value);
		root.setProperty('--h2-color', document.getElementById('h2Color').value);
		root.setProperty('--h3-color', document.getElementById('h3Color').value);
		root.setProperty('--h4-color', document.getElementById('h4Color').value);
		root.setProperty('--h5-color', document.getElementById('h5Color').value);
		root.setProperty('--h6-color', document.getElementById('h6Color').value);
		root.setProperty('--code-block-text', document.getElementById('codeText').value);
		root.setProperty('--code-block-bg', document.getElementById('codeBg').value);
		root.setProperty('--code-block-border', document.getElementById('codeBorder').value);
		root.setProperty('--code-block-border-width', document.getElementById('codeBorderWidth').value + 'px');
		root.setProperty('--latex-block-text', document.getElementById('latexText').value);
		root.setProperty('--latex-block-bg', document.getElementById('latexBg').value);
		root.setProperty('--latex-block-border', document.getElementById('latexBorder').value);
		root.setProperty('--latex-block-border-width', document.getElementById('latexBorderWidth').value + 'px');
		root.setProperty('--quote-text', document.getElementById('quoteText').value);
		root.setProperty('--quote-bg', document.getElementById('quoteBg').value);
		root.setProperty('--quote-border', document.getElementById('quoteBorder').value);
		root.setProperty('--quote-border-width', document.getElementById('quoteBorderWidth').value + 'px');
		root.setProperty('--code-inline-text', document.getElementById('codeInlineText').value);
		root.setProperty('--code-inline-bg', document.getElementById('codeInlineBg').value);
		root.setProperty('--code-inline-border', document.getElementById('codeInlineBorder').value);
		root.setProperty('--code-inline-border-width', document.getElementById('codeInlineBorderWidth').value + 'px');
		root.setProperty('--latex-inline-text', document.getElementById('latexInlineText').value);
		root.setProperty('--line-height', document.getElementById('lineHeight').value);
		root.setProperty('--word-spacing', document.getElementById('wordSpacing').value + 'px');
		root.setProperty('--letter-spacing', document.getElementById('letterSpacing').value + 'px');
		root.setProperty('--margin', document.getElementById('margin').value + 'px');
		root.setProperty('--font-family', document.getElementById('fontFamily').value);
		closeSettings();
	};

	window.resetSettings = () => {
		if (confirm('Restaurar configurações padrão?')) location.reload();
	};

	window.toggleTOC = () => {
		const sidebar = document.getElementById('tocSidebar');
		const button = sidebar.querySelector('.toggle-toc-btn');
		
		if (sidebar.classList.contains('collapsed')) {
			sidebar.classList.remove('collapsed');
			button.textContent = '◀';
			button.title = 'Ocultar navegação';
			button.style.display = 'block';
		} else {
			sidebar.classList.add('collapsed');
			button.textContent = '▶';
			button.title = 'Mostrar navegação';
		}
	};

	// Garantir que o botão toggle esteja sempre visível
	const ensureToggleButton = () => {
		const sidebar = document.getElementById('tocSidebar');
		const button = sidebar.querySelector('.toggle-toc-btn');
		if (sidebar.classList.contains('collapsed')) {
			button.style.position = 'fixed';
			button.style.top = '50%';
			button.style.left = '10px';
			button.style.transform = 'translateY(-50%)';
			button.style.zIndex = '1000';
			button.style.display = 'block';
		} else {
			button.style.position = 'static';
			button.style.top = '';
			button.style.left = '';
			button.style.transform = '';
			button.style.zIndex = '';
		}
	};

	// Executar após cada mudança no DOM
	const observer = new MutationObserver(() => {
		setTimeout(ensureToggleButton, 100);
	});

	document.addEventListener('DOMContentLoaded', () => {
		observer.observe(document.getElementById('tocSidebar'), {
			attributes: true,
			attributeFilter: ['class']
		});
	});

	// Carregar documento pelo ID da URL
	const urlParams = new URLSearchParams(window.location.search);
	const docId = urlParams.get('id');
	
	if (docId) {
		try {
			const documents = JSON.parse(localStorage.getItem('hubDocuments') || '[]');
			const doc = documents.find(d => d.id === docId);
			if (doc) {
				document.getElementById('docTitle').value = doc.title;
				editor.value = doc.content;
			} else {
				document.getElementById('docTitle').value = 'Documento não encontrado';
				editor.value = '';
			}
		} catch (e) {
			console.error('Erro ao carregar documento:', e);
		}
	}

	renderMarkdown();
	
	let autoSaveTimeout;
	const autoSave = () => {
		clearTimeout(autoSaveTimeout);
		autoSaveTimeout = setTimeout(() => {
			if (editor.value.trim() && document.getElementById('docTitle').value.trim()) {
				saveDocument();
			}
		}, 30000);
	};
	
	editor.addEventListener('input', autoSave);
	document.getElementById('docTitle').addEventListener('input', autoSave);
	
	editor.addEventListener('keydown', e => {
		if (e.ctrlKey && e.key === 's') {
			e.preventDefault();
			saveDocument();
		}
	});
});
