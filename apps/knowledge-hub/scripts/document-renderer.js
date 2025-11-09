/**
 * Knowledge Hub - Document Renderer
 * Renderiza documentos Markdown e PDF com syntax highlighting e KaTeX
 */

class DocumentRenderer {
    constructor() {
        this.marked = null;
        this.initialized = false;
    }

    /**
     * Inicializa o renderizador
     */
    async init() {
        if (this.initialized) return;

        try {
            // Carregar Marked.js via CDN
            if (!window.marked) {
                await this.loadScript('https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js');
            }

            // Configurar Marked
            this.setupMarked();
            this.initialized = true;
            console.log('DocumentRenderer inicializado');
        } catch (error) {
            console.error('Erro ao inicializar DocumentRenderer:', error);
            throw error;
        }
    }

    /**
     * Carrega um script dinamicamente
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Erro ao carregar ${src}`));
            document.head.appendChild(script);
        });
    }

    /**
     * Configura o Marked.js
     */
    setupMarked() {
        if (!window.marked) return;

        // Configurações do Marked
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false,
            langPrefix: 'language-'
        });

        // Custom renderer para elementos especiais
        const renderer = new marked.Renderer();

        // Custom heading renderer
        renderer.heading = (text, level) => {
            const slug = text.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
            return `<h${level} id="${slug}">${text}</h${level}>`;
        };

        // Custom code renderer
        renderer.code = (code, language) => {
            if (language && language.toLowerCase() === 'math') {
                // Renderizar KaTeX para matemática
                try {
                    return `<div class="math-block">${katex.renderToString(code, { displayMode: true })}</div>`;
                } catch (e) {
                    return `<pre><code class="language-text">${this.escapeHtml(code)}</code></pre>`;
                }
            }
            
            return `<pre><code class="language-${language || 'text'}">${this.escapeHtml(code)}</code></pre>`;
        };

        // Custom inline code renderer
        renderer.codespan = (code) => {
            if (code.match(/^[\$\\[].*[\$\\]]$/)) {
                // É uma fórmula matemática
                try {
                    return katex.renderToString(code, { displayMode: false });
                } catch (e) {
                    return `<code>${this.escapeHtml(code)}</code>`;
                }
            }
            return `<code>${this.escapeHtml(code)}</code>`;
        };

        // Custom table renderer
        renderer.table = (header, body) => {
            return `<div class="table-wrapper"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
        };

        // Custom blockquote renderer
        renderer.blockquote = (quote) => {
            return `<blockquote>${quote}</blockquote>`;
        };

        marked.use({ renderer });
    }

    /**
     * Renderiza um documento Markdown
     */
    async renderMarkdown(markdownContent, container) {
        if (!this.initialized) {
            await this.init();
        }

        try {
            // Converter Markdown para HTML
            const html = marked.parse(markdownContent);
            
            // Inserir no container
            container.innerHTML = html;
            
            // Processar KaTeX
            this.processKaTeX(container);
            
            // Processar syntax highlighting
            this.processSyntaxHighlighting(container);
            
            // Adicionar funcionalidades interativas
            this.addInteractivity(container);
            
            console.log('Documento Markdown renderizado com sucesso');
        } catch (error) {
            console.error('Erro ao renderizar Markdown:', error);
            container.innerHTML = `<div class="error-message">Erro ao renderizar documento: ${error.message}</div>`;
        }
    }

    /**
     * Renderiza um PDF
     */
    renderPDF(pdfBlob, container) {
        try {
            const url = URL.createObjectURL(pdfBlob);
            
            container.innerHTML = `
                <div class="pdf-container">
                    <div class="pdf-header">
                        <div class="pdf-controls">
                            <button class="pdf-zoom-in" title="Aumentar zoom">
                                <i class="fas fa-search-plus"></i>
                            </button>
                            <button class="pdf-zoom-out" title="Diminuir zoom">
                                <i class="fas fa-search-minus"></i>
                            </button>
                            <button class="pdf-zoom-fit" title="Ajustar à tela">
                                <i class="fas fa-expand-arrows-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div class="pdf-viewer">
                        <embed src="${url}" type="application/pdf" class="pdf-embed">
                    </div>
                </div>
            `;

            // Adicionar controles de zoom
            this.addPDFControls(container);
            
            console.log('PDF renderizado com sucesso');
        } catch (error) {
            console.error('Erro ao renderizar PDF:', error);
            container.innerHTML = `
                <div class="pdf-error">
                    <i class="fas fa-file-pdf"></i>
                    <h3>Erro ao carregar PDF</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }

    /**
     * Processa fórmulas LaTeX com KaTeX
     */
    processKaTeX(container) {
        if (typeof katex === 'undefined') {
            console.warn('KaTeX não está disponível');
            return;
        }

        // Processar elementos com classe math
        const mathElements = container.querySelectorAll('.math, .katex, .math-block');
        mathElements.forEach(element => {
            if (element.textContent.trim()) {
                try {
                    katex.render(element.textContent, element, {
                        displayMode: element.classList.contains('math-block'),
                        throwOnError: false
                    });
                } catch (e) {
                    console.warn('Erro ao renderizar KaTeX:', e);
                }
            }
        });

        // Processar elementos com data-math
        const dataMathElements = container.querySelectorAll('[data-math]');
        dataMathElements.forEach(element => {
            try {
                katex.render(element.getAttribute('data-math'), element, {
                    displayMode: element.tagName === 'DIV',
                    throwOnError: false
                });
            } catch (e) {
                console.warn('Erro ao renderizar KaTeX (data-math):', e);
            }
        });

        // Processar automaticamente com auto-render
        if (window.renderMathInElement) {
            renderMathInElement(container, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false },
                    { left: '\\[', right: '\\]', display: true },
                    { left: '\\(', right: '\\)', display: false }
                ],
                throwOnError: false
            });
        }
    }

    /**
     * Processa syntax highlighting com Prism
     */
    processSyntaxHighlighting(container) {
        if (typeof Prism === 'undefined') {
            console.warn('Prism.js não está disponível');
            return;
        }

        // Aplicar highlighting aos elementos de código
        Prism.highlightAllUnder(container);

        // Adicionar numeração de linhas para blocos de código
        const codeBlocks = container.querySelectorAll('pre > code');
        codeBlocks.forEach(codeBlock => {
            const pre = codeBlock.parentElement;
            if (!pre.classList.contains('line-numbers')) {
                pre.classList.add('line-numbers');
            }
        });
    }

    /**
     * Adiciona funcionalidades interativas
     */
    addInteractivity(container) {
        // Links com âncoras
        const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            if (heading.id) {
                heading.style.cursor = 'pointer';
                heading.addEventListener('click', () => {
                    window.location.hash = `#${heading.id}`;
                });
            }
        });

        // Tabelas responsivas
        const tables = container.querySelectorAll('table');
        tables.forEach(table => {
            if (!table.parentElement.classList.contains('table-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-wrapper';
                table.parentElement.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });

        // Imagens com lightbox
        const images = container.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('click', () => this.openImageLightbox(img.src, img.alt));
        });

        // Expandir/contrair código
        const preBlocks = container.querySelectorAll('pre');
        preBlocks.forEach(pre => {
            if (pre.textContent.length > 500) {
                pre.style.maxHeight = '200px';
                pre.style.overflow = 'hidden';
                pre.style.position = 'relative';
                
                const expandBtn = document.createElement('button');
                expandBtn.className = 'code-expand-btn';
                expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Expandir';
                expandBtn.addEventListener('click', () => {
                    if (pre.style.maxHeight === '200px') {
                        pre.style.maxHeight = 'none';
                        expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Contrair';
                    } else {
                        pre.style.maxHeight = '200px';
                        expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Expandir';
                    }
                });
                
                pre.appendChild(expandBtn);
            }
        });
    }

    /**
     * Adiciona controles PDF
     */
    addPDFControls(container) {
        const embed = container.querySelector('.pdf-embed');
        const zoomIn = container.querySelector('.pdf-zoom-in');
        const zoomOut = container.querySelector('.pdf-zoom-out');
        const zoomFit = container.querySelector('.pdf-zoom-fit');
        
        let currentZoom = 1;

        if (zoomIn) {
            zoomIn.addEventListener('click', () => {
                currentZoom = Math.min(currentZoom + 0.25, 3);
                embed.style.transform = `scale(${currentZoom})`;
            });
        }

        if (zoomOut) {
            zoomOut.addEventListener('click', () => {
                currentZoom = Math.max(currentZoom - 0.25, 0.5);
                embed.style.transform = `scale(${currentZoom})`;
            });
        }

        if (zoomFit) {
            zoomFit.addEventListener('click', () => {
                currentZoom = 1;
                embed.style.transform = 'scale(1)';
            });
        }
    }

    /**
     * Abre lightbox para imagens
     */
    openImageLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay">
                <div class="lightbox-content">
                    <img src="${src}" alt="${alt || 'Imagem'}">
                    <button class="lightbox-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);

        // Fechar lightbox
        const close = () => lightbox.remove();
        lightbox.querySelector('.lightbox-close').addEventListener('click', close);
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) close();
        });

        // Fechar com ESC
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                close();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    }

    /**
     * Escape HTML para segurança
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Extrai texto plano de HTML
     */
    extractText(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    /**
     * Gera Table of Contents
     */
    generateTableOfContents(container) {
        const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const toc = [];

        headings.forEach(heading => {
            if (heading.id) {
                toc.push({
                    level: parseInt(heading.tagName.charAt(1)),
                    text: heading.textContent,
                    id: heading.id
                });
            }
        });

        return toc;
    }

    /**
     * Valida e sanitiza conteúdo Markdown
     */
    sanitizeMarkdown(content) {
        // Remover scripts e elementos perigosos
        return content
            .replace(/<script[^>]*>.*?<\/script>/gi, '')
            .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+="[^"]*"/gi, '')
            .replace(/on\w+='[^']*'/gi, '');
    }

    /**
     * Obtém informações de leitura
     */
    getReadingInfo(container) {
        const text = this.extractText(container.innerHTML);
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        const estimatedMinutes = Math.ceil(wordCount / 200); // 200 palavras por minuto

        return {
            wordCount,
            characterCount: text.length,
            estimatedReadingTime: estimatedMinutes,
            paragraphCount: container.querySelectorAll('p').length,
            headingCount: container.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
            linkCount: container.querySelectorAll('a').length,
            imageCount: container.querySelectorAll('img').length
        };
    }
}

// Instância global
const documentRenderer = new DocumentRenderer();

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DocumentRenderer;
}