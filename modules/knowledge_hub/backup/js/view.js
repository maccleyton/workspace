window.addEventListener('load', function() {
	// ✅ CONFIGURAÇÃO IDÊNTICA AO EDITOR AVANÇADO
	marked.setOptions({
		breaks: true,
		gfm: true
	});

	// Carregar documento
	const urlParams = new URLSearchParams(window.location.search);
	const docId = urlParams.get('id') || 'current';
	loadDocument(docId);

	function loadDocument(id) {
		let doc;
		
		if (id === 'current') {
			const savedDoc = localStorage.getItem('doc');
			if (savedDoc) {
				doc = JSON.parse(savedDoc);
			}
		} else {
			const hubDocs = localStorage.getItem('hubDocuments');
			if (hubDocs) {
				const docs = JSON.parse(hubDocs);
				doc = docs.find(d => d.id === id);
			}
		}

		if (!doc || !doc.content) {
			document.getElementById('content').innerHTML = '<div class="error">❌ Documento não encontrado</div>';
			document.getElementById('docTitle').textContent = 'Erro';
			return;
		}

		document.getElementById('docTitle').innerHTML = marked.parse(doc.title || 'Sem Título');
		document.title = `${doc.title || 'Documento'} - Knowledge Hub`;

		if (doc.timestamp) {
			const date = new Date(doc.timestamp);
			document.getElementById('docInfo').textContent = `Atualizado: ${date.toLocaleDateString('pt-BR')}`;
		}

		renderMarkdown(doc.content);
	}

	// ✅ FUNÇÃO WRAPLATEXBLOCKS - IDÊNTICA AO EDITOR
	function wrapLatexBlocks() {
		const mathBlocks = document.querySelectorAll('mjx-container[display="true"]');
		
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

	// ✅ FUNÇÃO DE RENDERIZAÇÃO AVANÇADA - COM CORREÇÃO DE PIPES
	function renderMarkdown(markdownText) {
		try {
			// Salvar posição do scroll antes de atualizar
			const contentWrapper = document.querySelector('.content-wrapper');
			const scrollPos = contentWrapper ? contentWrapper.scrollTop : 0;
			const scrollPercentage = contentWrapper && contentWrapper.scrollHeight > 0 ? scrollPos / contentWrapper.scrollHeight : 0;
			
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
			
			// Configurar marked.js
			marked.setOptions({
				breaks: true,
				gfm: true
			});
			
			// ✅ RENDERIZAR COM MARKED
			let htmlContent = marked.parse(markdownText);
			
			// ✅ INSERIR NO DOM ANTES DO MATHJAX
			document.getElementById('content').innerHTML = htmlContent;

			// ✅ PROCESSAR HIGHLIGHT.JS
			document.querySelectorAll('pre code').forEach((block) => {
				if (typeof hljs !== 'undefined') {
					hljs.highlightBlock(block);
				}
			});

			// ✅ RENDERIZAR LATEX COM MATHJAX
			if (window.MathJax) {
				setTimeout(() => {
					MathJax.typesetPromise([document.getElementById('content')]).then(() => {
						// ✅ WRAP LATEX BLOCKS COM ESTILO VISUAL
						wrapLatexBlocks();
						
						// ✅ RESTAURAR POSIÇÃO DO SCROLL
						if (contentWrapper) {
							setTimeout(() => {
								contentWrapper.scrollTop = contentWrapper.scrollHeight * scrollPercentage;
							}, 50);
						}
						
						// ✅ ATUALIZAR TOC
						updateTOC();
						
					}).catch((err) => {
						console.error('Erro MathJax:', err);
						updateTOC();
					});
				}, 0);
			} else {
				// Se não houver MathJax, apenas atualizar TOC
				setTimeout(() => {
					if (contentWrapper) {
						contentWrapper.scrollTop = contentWrapper.scrollHeight * scrollPercentage;
					}
					updateTOC();
				}, 50);
			}

		} catch (e) {
			console.error('Erro ao renderizar:', e);
			document.getElementById('content').innerHTML = 
				`<div class="error">❌ Erro ao renderizar: ${e.message}</div>`;
		}
	}
	
	// ✅ FUNÇÃO TOC - APRIMORADA COM SCROLL SYNC
	function updateTOC() {
		const content = document.getElementById('content');
		const tocContent = document.getElementById('tocContent');
		
		if (!content) return;
		
		const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
		
		if (!headings.length) {
			tocContent.innerHTML = '<div style="color:#6b7280;text-align:center;padding:20px;font-size:12px;">Nenhum título encontrado</div>';
			return;
		}
		
		tocContent.innerHTML = '';
		
		headings.forEach((heading, i) => {
			if (!heading.id) {
				heading.id = `heading-${i}-${Date.now()}`;
			}
			
			const level = heading.tagName.toLowerCase();
			const textContent = heading.textContent || `Título ${i + 1}`;
			
			const item = document.createElement('div');
			item.className = `toc-item toc-${level}`;
			item.textContent = textContent;
			item.onclick = () => {
				heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
				document.querySelectorAll('.toc-item').forEach(el => el.classList.remove('active'));
				item.classList.add('active');
			};
			
			tocContent.appendChild(item);
		});

		// Ativar primeiro item
		const firstItem = tocContent.querySelector('.toc-item');
		if (firstItem) firstItem.classList.add('active');
	}

	// ✅ SCROLL HANDLER APRIMORADO
	const contentWrapper = document.querySelector('.content-wrapper');
	if (contentWrapper) {
		contentWrapper.addEventListener('scroll', () => {
			const headings = document.querySelectorAll('#content h1, #content h2, #content h3, #content h4, #content h5, #content h6');
			const tocItems = document.querySelectorAll('.toc-item');
			
			let current = null;
			headings.forEach((heading, i) => {
				const rect = heading.getBoundingClientRect();
				if (rect.top <= 100 && rect.bottom >= 0) {
					current = i;
				}
			});
			
			if (current !== null && tocItems[current]) {
				tocItems.forEach(item => item.classList.remove('active'));
				tocItems[current].classList.add('active');
			}
		});
	}

	window.exportPDF = window.printDoc = () => window.print();
});