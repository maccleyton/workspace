/**
 * EDITOR MARKDOWN - MAIN SCRIPT
 * Funcionalidades principais do editor markdown
 */

class MarkdownEditor {
    constructor() {
        this.tabs = new Map();
        this.currentTabId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        // Removido createNewTab() automático para evitar duplicação
        // As abas serão criadas conforme necessário pelo sistema principal
    }

    setupEventListeners() {
        // Carregar arquivo
        const loadFileBtn = document.getElementById('loadFileBtn');
        const fileInput = document.getElementById('fileInput');
        
        if (loadFileBtn && fileInput) {
            loadFileBtn.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                this.handleFileLoad(e);
            });
        }

        // Salvar arquivo
        const saveLocalBtn = document.getElementById('saveLocalBtn');
        if (saveLocalBtn) {
            saveLocalBtn.addEventListener('click', () => {
                this.saveToLocal();
            });
        }

        // Imprimir
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                this.printDocument();
            });
        }

        // Foco no editor
        const editorFocusBtn = document.getElementById('editorFocusBtn');
        if (editorFocusBtn) {
            editorFocusBtn.addEventListener('click', () => {
                this.focusEditor();
            });
        }

        // Foco no preview
        const previewFocusBtn = document.getElementById('previewFocusBtn');
        if (previewFocusBtn) {
            previewFocusBtn.addEventListener('click', () => {
                this.focusPreview();
            });
        }

        // Navigation tree - conectar com preview
        const navigationTree = document.getElementById('navigationTree');
        if (navigationTree) {
            navigationTree.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-item') || e.target.closest('.nav-item')) {
                    const navItem = e.target.classList.contains('nav-item') ? e.target : e.target.closest('.nav-item');
                    const targetId = navItem.dataset.target;
                    this.scrollToElementInPreview(targetId);
                }
            });
        }

        // Outros event listeners...
        this.setupToolbar();
        this.setupKeyboardShortcuts();
        
        // Preview ao vivo - conectar editor com preview
        this.setupLivePreview();
    }

    setupToolbar() {
        const toolbarButtons = document.querySelectorAll('.toolbar-btn');
        toolbarButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.dataset.action;
                this.handleToolbarAction(action);
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+O para abrir arquivo
            if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
                e.preventDefault();
                this.openFileDialog();
            }
            
            // Ctrl+S para salvar
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveToLocal();
            }

            // Ctrl+P para imprimir
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                this.printDocument();
            }

            // F5 para refresh do preview
            if (e.key === 'F5') {
                e.preventDefault();
                this.updatePreview();
            }
        });
    }

    setupLivePreview() {
        // Conectar editor com preview em tempo real
        const editor = this.getCurrentEditor();
        if (editor) {
            editor.addEventListener('input', debounce(() => {
                this.updatePreview();
                this.updateWordCount();
                this.updateCharCount();
                this.updateNavigationTree();
            }, 300));
        }
    }

    updatePreview() {
        const editor = this.getCurrentEditor();
        const previewContent = document.getElementById('previewContent');
        
        if (!editor || !previewContent) return;

        const content = editor.value;
        if (typeof marked !== 'undefined') {
            try {
                // Converter markdown para HTML
                const htmlContent = marked.parse(content);
                previewContent.innerHTML = htmlContent;
                
                // Aplicar syntax highlighting
                previewContent.querySelectorAll('pre code').forEach(block => {
                    if (typeof hljs !== 'undefined') {
                        hljs.highlightElement(block);
                    }
                });

                // Atualizar navegação
                this.updateNavigationTree();
            } catch (error) {
                console.error('Erro ao renderizar preview:', error);
                previewContent.innerHTML = '<div class="error">Erro ao renderizar preview: ' + error.message + '</div>';
            }
        }
    }

    updateNavigationTree() {
        const editor = this.getCurrentEditor();
        const navigationTree = document.getElementById('navigationTree');
        
        if (!editor || !navigationTree) return;

        const content = editor.value;
        const headings = this.extractHeadings(content);
        
        let navigationHtml = '';
        headings.forEach((heading, index) => {
            const level = heading.level;
            const text = heading.text;
            const id = heading.id;
            const indent = ' '.repeat((level - 1) * 20);
            
            navigationHtml += `
                <div class="nav-item" data-target="${id}" style="margin-left: ${indent}px; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background 0.2s;">
                    <i class="fas fa-chevron-right" style="margin-right: 8px; font-size: 12px;"></i>
                    <span class="nav-text">${text}</span>
                </div>
            `;
        });

        navigationTree.innerHTML = navigationHtml;

        // Adicionar event listeners para os itens de navegação
        navigationTree.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(59, 130, 246, 0.1)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
        });
    }

    extractHeadings(content) {
        const headings = [];
        const lines = content.split('\n');
        
        lines.forEach((line, index) => {
            const match = line.match(/^(#{1,6})\s+(.+)/);
            if (match) {
                const level = match[1].length;
                const text = match[2].trim();
                const id = text.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .trim();
                
                headings.push({ level, text, id, line: index });
            }
        });
        
        return headings;
    }

    scrollToElementInPreview(targetId) {
        const previewContent = document.getElementById('previewContent');
        if (!previewContent) return;

        const targetElement = previewContent.querySelector(`#${targetId}`);
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Destacar o elemento temporariamente
            targetElement.style.transition = 'background 0.5s';
            targetElement.style.background = 'rgba(59, 130, 246, 0.2)';
            setTimeout(() => {
                targetElement.style.background = '';
            }, 1000);
        }
    }

    focusEditor() {
        const editor = this.getCurrentEditor();
        if (editor) {
            editor.focus();
            // Destacar o editor visualmente
            const editorContainer = editor.closest('.editor-pane');
            if (editorContainer) {
                editorContainer.style.boxShadow = '0 0 0 2px #3B82F6';
                setTimeout(() => {
                    editorContainer.style.boxShadow = '';
                }, 2000);
            }
        }
    }

    focusPreview() {
        const previewContent = document.getElementById('previewContent');
        if (previewContent) {
            previewContent.scrollTo({ top: 0, behavior: 'smooth' });
            // Destacar o preview visualmente
            const previewPane = previewContent.closest('.preview-pane');
            if (previewPane) {
                previewPane.style.boxShadow = '0 0 0 2px #3B82F6';
                setTimeout(() => {
                    previewPane.style.boxShadow = '';
                }, 2000);
            }
        }
    }

    printDocument() {
        const editor = this.getCurrentEditor();
        if (!editor) return;

        // Criar uma nova janela para impressão
        const printWindow = window.open('', '_blank');
        const content = editor.value;
        
        // Gerar HTML para impressão
        let htmlContent = '';
        if (typeof marked !== 'undefined') {
            htmlContent = marked.parse(content);
        } else {
            htmlContent = `<pre>${content}</pre>`;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Impressão - ${this.getCurrentTabName()}</title>
                <style>
                    body { 
                        font-family: 'Times New Roman', serif; 
                        line-height: 1.6; 
                        margin: 40px;
                        color: #000;
                    }
                    h1, h2, h3, h4, h5, h6 { 
                        margin-top: 30px; 
                        margin-bottom: 15px; 
                    }
                    p { margin-bottom: 15px; }
                    code { 
                        background: #f5f5f5; 
                        padding: 2px 4px; 
                        border-radius: 3px; 
                    }
                    pre { 
                        background: #f5f5f5; 
                        padding: 15px; 
                        border-radius: 5px; 
                        overflow-x: auto; 
                    }
                    blockquote { 
                        border-left: 4px solid #ccc; 
                        margin: 0; 
                        padding-left: 20px; 
                        font-style: italic; 
                    }
                    table { 
                        border-collapse: collapse; 
                        width: 100%; 
                        margin: 20px 0; 
                    }
                    th, td { 
                        border: 1px solid #ddd; 
                        padding: 8px; 
                        text-align: left; 
                    }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Aguardar o conteúdo carregar antes de imprimir
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    }

    getCurrentTabName() {
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            return activeTab.querySelector('.tab-name')?.textContent || 'Documento';
        }
        return 'Documento';
    }

    handleFileLoad(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validar tipo de arquivo
        const validExtensions = ['.md', '.txt', '.markdown'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!validExtensions.includes(fileExtension)) {
            alert('Tipo de arquivo não suportado. Use arquivos .md, .txt ou .markdown');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const fileName = file.name;
            
            // Dispara evento personalizado para o sistema de abas principal
            const fileLoadEvent = new CustomEvent('fileLoaded', {
                detail: { 
                    fileName: fileName, 
                    content: content,
                    fileType: fileExtension
                }
            });
            document.dispatchEvent(fileLoadEvent);
            
            // Feedback visual
            this.showFileLoadedNotification(fileName);
        };
        
        reader.onerror = () => {
            alert('Erro ao carregar o arquivo');
        };
        
        reader.readAsText(file, 'UTF-8');
        
        // Limpa o input para permitir carregar o mesmo arquivo novamente
        event.target.value = '';
    }

    showFileLoadedNotification(fileName) {
        if (typeof EditorUtils !== 'undefined' && EditorUtils.showNotification) {
            EditorUtils.showNotification(`Arquivo "${fileName}" carregado com sucesso!`, 'success', 3000);
        } else {
            console.log(`Arquivo "${fileName}" carregado com sucesso!`);
        }
    }

    showSaveNotification(fileName) {
        if (typeof EditorUtils !== 'undefined' && EditorUtils.showNotification) {
            EditorUtils.showNotification(`Documento salvo como "${fileName}"`, 'success', 2000);
        } else {
            console.log(`Documento salvo como "${fileName}"`);
        }
    }

    openFileDialog() {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    }

    createNewTab(name = 'Novo Documento', content = '') {
        const tabId = 'tab-' + Date.now();
        const tabElement = this.createTabElement(tabId, name);
        
        // Adiciona tab à lista
        this.tabs.set(tabId, {
            id: tabId,
            name: name,
            content: content,
            element: tabElement,
            modified: false
        });

        // Adiciona à interface
        this.addTabToInterface(tabId);
        
        // Seleciona a nova aba
        this.selectTab(tabId);
        
        return tabId;
    }

    createTabElement(tabId, name) {
        const tab = document.createElement('div');
        tab.className = 'tab active';
        tab.dataset.tabId = tabId;
        tab.innerHTML = `
            <span class="tab-name">${name}</span>
            <button class="tab-close" title="Fechar aba">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Event listeners da aba
        tab.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-close') || e.target.closest('.tab-close')) {
                e.stopPropagation();
                this.closeTab(tabId);
            } else {
                this.selectTab(tabId);
            }
        });
        
        return tab;
    }

    addTabToInterface(tabId) {
        const tabData = this.tabs.get(tabId);
        if (!tabData) return;

        const tabsList = document.getElementById('tabsList');
        if (tabsList) {
            tabsList.appendChild(tabData.element);
        }
    }

    selectTab(tabId) {
        // Remove seleção de outras abas
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove classe active de conteúdos
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Seleciona aba atual
        const tabData = this.tabs.get(tabId);
        if (tabData) {
            tabData.element.classList.add('active');
            this.currentTabId = tabId;
        }
    }

    closeTab(tabId) {
        const tabData = this.tabs.get(tabId);
        if (!tabData) return;

        // Remove da interface
        tabData.element.remove();
        
        // Remove do mapa
        this.tabs.delete(tabId);
        
        // Se era a aba atual, seleciona outra
        if (this.currentTabId === tabId) {
            const remainingTabs = Array.from(this.tabs.keys());
            if (remainingTabs.length > 0) {
                this.selectTab(remainingTabs[0]);
            } else {
                this.createNewTab();
            }
        }
    }

    handleToolbarAction(action) {
        const currentEditor = this.getCurrentEditor();
        if (!currentEditor) return;

        const cursorStart = currentEditor.selectionStart;
        const cursorEnd = currentEditor.selectionEnd;
        const text = currentEditor.value;

        let newText = '';
        let newSelectionStart = cursorStart;
        let newSelectionEnd = cursorEnd;

        switch (action) {
            case 'bold':
                newText = text.substring(0, cursorStart) + '**' + 
                         text.substring(cursorStart, cursorEnd) + '**' + 
                         text.substring(cursorEnd);
                newSelectionStart = cursorStart + 2;
                newSelectionEnd = cursorEnd + 2;
                break;

            case 'italic':
                newText = text.substring(0, cursorStart) + '*' + 
                         text.substring(cursorStart, cursorEnd) + '*' + 
                         text.substring(cursorEnd);
                newSelectionStart = cursorStart + 1;
                newSelectionEnd = cursorEnd + 1;
                break;

            case 'code':
                if (cursorStart === cursorEnd) {
                    // Adiciona código inline vazio
                    newText = text.substring(0, cursorStart) + '`code`' + text.substring(cursorEnd);
                    newSelectionStart = cursorStart + 1;
                    newSelectionEnd = cursorStart + 5;
                } else {
                    // Envolve seleção em código
                    newText = text.substring(0, cursorStart) + '`' + 
                             text.substring(cursorStart, cursorEnd) + '`' + 
                             text.substring(cursorEnd);
                    newSelectionStart = cursorStart + 1;
                    newSelectionEnd = cursorEnd + 1;
                }
                break;

            case 'latex-inline':
                if (cursorStart === cursorEnd) {
                    newText = text.substring(0, cursorStart) + '$formula$' + text.substring(cursorEnd);
                    newSelectionStart = cursorStart + 1;
                    newSelectionEnd = cursorStart + 7;
                } else {
                    newText = text.substring(0, cursorStart) + '$' + 
                             text.substring(cursorStart, cursorEnd) + '$' + 
                             text.substring(cursorEnd);
                    newSelectionStart = cursorStart + 1;
                    newSelectionEnd = cursorEnd + 1;
                }
                break;

            case 'latex-block':
                if (cursorStart === cursorEnd) {
                    newText = text.substring(0, cursorStart) + '$$\nformula\n$$' + text.substring(cursorEnd);
                    newSelectionStart = cursorStart + 3;
                    newSelectionEnd = cursorStart + 10;
                } else {
                    newText = text.substring(0, cursorStart) + '$$\n' + 
                             text.substring(cursorStart, cursorEnd) + '\n$$' + 
                             text.substring(cursorEnd);
                    newSelectionStart = cursorStart + 3;
                    newSelectionEnd = cursorEnd + 3;
                }
                break;

            default:
                return;
        }

        currentEditor.value = newText;
        currentEditor.focus();
        currentEditor.setSelectionRange(newSelectionStart, newSelectionEnd);

        // Atualiza estatísticas
        this.updateWordCount();
        this.updateCharCount();
    }

    getCurrentEditor() {
        // Tentar usar o editor do sistema principal primeiro
        if (window.editorManager && window.editorManager.textarea) {
            return window.editorManager.textarea;
        }
        
        // Fallback para o textarea atual
        return document.querySelector('#editor') || 
               document.querySelector('.editor-textarea') ||
               document.querySelector('textarea[placeholder*="markdown"]');
    }

    updateWordCount() {
        const currentEditor = this.getCurrentEditor();
        if (!currentEditor) return;

        const text = currentEditor.value.trim();
        const words = text.length > 0 ? text.split(/\s+/).length : 0;
        
        const wordCountElement = document.getElementById('wordCount');
        if (wordCountElement) {
            wordCountElement.textContent = `${words} palavras`;
        }
    }

    updateCharCount() {
        const currentEditor = this.getCurrentEditor();
        if (!currentEditor) return;

        const text = currentEditor.value;
        const chars = text.length;
        
        const charCountElement = document.getElementById('charCount');
        if (charCountElement) {
            charCountElement.textContent = `${chars} caracteres`;
        }
    }

    saveToLocal() {
        const currentEditor = this.getCurrentEditor();
        if (!currentEditor) return;

        const content = currentEditor.value;
        const fileName = this.getCurrentTabName();
        const safeFileName = this.generateFileName(fileName);
        
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = safeFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSaveNotification(safeFileName);
    }

    generateFileName(defaultName) {
        // Remover extensão se existir e adicionar .md
        let name = defaultName;
        if (name.toLowerCase().endsWith('.md') || 
            name.toLowerCase().endsWith('.txt') || 
            name.toLowerCase().endsWith('.markdown')) {
            name = name.replace(/\.[^/.]+$/, '');
        }
        
        // Limpar nome e adicionar extensão
        name = name.replace(/[<>:"/\\|?*]/g, '_')
                   .trim() 
                   || 'documento';
        
        return name + '.md';
    }
}

// Inicializa o editor quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.markdownEditor = new MarkdownEditor();
});

// Adiciona estilos CSS para as funcionalidades de arquivo
const fileStyles = document.createElement('style');
fileStyles.textContent = `
    .tab {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        background: rgba(51, 65, 85, 0.8);
        border-radius: 8px 8px 0 0;
        color: #F8FAFC;
        cursor: pointer;
        border: 1px solid transparent;
        margin-right: 2px;
        min-width: 120px;
        position: relative;
    }
    
    .tab.active {
        background: rgba(59, 130, 246, 0.2);
        border-color: #3B82F6;
    }
    
    .tab:hover {
        background: rgba(71, 85, 105, 0.8);
    }
    
    .tab.active:hover {
        background: rgba(59, 130, 246, 0.3);
    }
    
    .tab-name {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .tab-close {
        background: none;
        border: none;
        color: #94A3B8;
        cursor: pointer;
        padding: 2px 4px;
        border-radius: 4px;
        margin-left: 8px;
        opacity: 0.7;
        transition: all 0.2s ease;
    }
    
    .tab-close:hover {
        background: rgba(239, 68, 68, 0.2);
        color: #EF4444;
        opacity: 1;
    }
    
    #loadFileBtn {
        transition: transform 0.2s ease;
    }
    
    #loadFileBtn:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(fileStyles);