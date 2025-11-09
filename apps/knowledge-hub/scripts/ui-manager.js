/**
 * Knowledge Hub - UI Manager
 * Gerencia toda a interface do usuário e interações
 */

class UIManager {
    constructor() {
        this.currentTheme = localStorage.getItem('knowledgeHubTheme') || 'dark';
        this.searchTimeout = null;
        this.contextMenu = null;
        this.notifications = [];
        this.initialized = false;
    }

    /**
     * Inicializa a interface
     */
    async init() {
        if (this.initialized) return;

        this.setupTheme();
        this.bindEvents();
        this.setupKeyboardShortcuts();
        this.initializeModals();
        this.showWelcomeMessage();
        this.initialized = true;
        
        console.log('UIManager inicializado');
    }

    /**
     * Configura o tema inicial
     */
    setupTheme() {
        document.body.setAttribute('data-theme', this.currentTheme);
        document.body.setAttribute('data-theme-loaded', 'true');
        this.updateThemeIcon();
    }

    /**
     * Alterna o tema
     */
    toggleTheme() {
        const themes = ['dark', 'light', 'blue', 'green', 'purple', 'orange'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        
        this.currentTheme = themes[nextIndex];
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('knowledgeHubTheme', this.currentTheme);
        this.updateThemeIcon();
        
        this.showNotification('success', 'Tema alterado', `Tema "${this.currentTheme}" aplicado`);
    }

    /**
     * Atualiza o ícone do tema
     */
    updateThemeIcon() {
        const icon = document.querySelector('#themeToggle i');
        if (!icon) return;

        const themeIcons = {
            dark: 'fas fa-moon',
            light: 'fas fa-sun',
            blue: 'fas fa-water',
            green: 'fas fa-leaf',
            purple: 'fas fa-magic',
            orange: 'fas fa-fire'
        };

        icon.className = themeIcons[this.currentTheme] || 'fas fa-palette';
    }

    /**
     * Configura event listeners
     */
    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Add file button
        const addFileBtn = document.getElementById('addFileBtn');
        if (addFileBtn) {
            addFileBtn.addEventListener('click', () => this.showAddFileModal());
        }

        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('focus', () => this.showSearchSuggestions());
        }

        // Close viewer
        const closeViewerBtn = document.getElementById('closeViewerBtn');
        if (closeViewerBtn) {
            closeViewerBtn.addEventListener('click', () => this.closeDocumentViewer());
        }

        // Edit document
        const editDocumentBtn = document.getElementById('editDocumentBtn');
        if (editDocumentBtn) {
            editDocumentBtn.addEventListener('click', () => this.editCurrentDocument());
        }

        // Delete document
        const deleteDocumentBtn = document.getElementById('deleteDocumentBtn');
        if (deleteDocumentBtn) {
            deleteDocumentBtn.addEventListener('click', () => this.deleteCurrentDocument());
        }

        // Click fora dos modais para fechar
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        // Escape para fechar modais
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
                this.closeContextMenu();
            }
        });
    }

    /**
     * Configura atalhos de teclado
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N = Novo arquivo
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.showAddFileModal();
            }

            // Ctrl/Cmd + F = Focar busca
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Ctrl/Cmd + T = Alternar tema
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    /**
     * Inicializa modais
     */
    initializeModals() {
        // Modal adicionar arquivo
        const addFileForm = document.getElementById('addFileForm');
        if (addFileForm) {
            addFileForm.addEventListener('submit', (e) => this.handleAddFile(e));
        }

        // Botões de cancelar
        const cancelButtons = document.querySelectorAll('#cancelAddFile, .modal-close');
        cancelButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });

        // Upload PDF
        this.setupPDFUpload();
    }

    /**
     * Configura upload de PDF
     */
    setupPDFUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const pdfFileInput = document.getElementById('pdfFileInput');
        const selectPdfBtn = document.getElementById('selectPdfBtn');
        const savePdfBtn = document.getElementById('savePdfBtn');
        const cancelPdfUpload = document.getElementById('cancelPdfUpload');

        let selectedPDF = null;

        // Drag and drop
        if (uploadArea && pdfFileInput) {
            uploadArea.addEventListener('click', () => pdfFileInput.click());
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file && file.type === 'application/pdf') {
                    this.handlePDFFile(file);
                } else {
                    this.showNotification('error', 'Arquivo inválido', 'Por favor, selecione um arquivo PDF válido');
                }
            });
        }

        // Select file button
        if (selectPdfBtn && pdfFileInput) {
            selectPdfBtn.addEventListener('click', () => pdfFileInput.click());
            pdfFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handlePDFFile(file);
                }
            });
        }

        // Save PDF
        if (savePdfBtn) {
            savePdfBtn.addEventListener('click', () => {
                if (selectedPDF) {
                    this.savePDF(selectedPDF);
                }
            });
        }

        // Cancel upload
        if (cancelPdfUpload) {
            cancelPdfUpload.addEventListener('click', () => this.closeAllModals());
        }
    }

    /**
     * Manipula arquivo PDF selecionado
     */
    handlePDFFile(file) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            this.showNotification('error', 'Arquivo muito grande', 'PDF deve ter no máximo 10MB');
            return;
        }

        selectedPDF = file;
        document.getElementById('pdfName').value = file.name.replace('.pdf', '');
        document.getElementById('savePdfBtn').disabled = false;

        this.showNotification('success', 'PDF selecionado', `${file.name} (${this.formatFileSize(file.size)})`);
    }

    /**
     * Salva PDF
     */
    async savePDF(file) {
        try {
            const name = document.getElementById('pdfName').value.trim();
            if (!name) {
                this.showNotification('error', 'Nome obrigatório', 'Por favor, informe o nome do documento');
                return;
            }

            await storageManager.addDocument({
                name,
                type: 'pdf',
                content: file
            });

            this.closeAllModals();
            this.showNotification('success', 'PDF salvo', `${name} foi salvo com sucesso`);
            
            // Recarregar lista
            await this.refreshDocumentsList();
        } catch (error) {
            console.error('Erro ao salvar PDF:', error);
            this.showNotification('error', 'Erro ao salvar', error.message);
        }
    }

    /**
     * Mostra modal de adicionar arquivo
     */
    showAddFileModal() {
        const modal = document.getElementById('addFileModal');
        const fileType = document.getElementById('fileType');
        const fileContent = document.getElementById('fileContent');
        const fileName = document.getElementById('fileName');

        if (modal) {
            // Reset form
            document.getElementById('addFileForm').reset();
            
            // Show modal
            modal.style.display = 'flex';
            
            // Focus name input
            setTimeout(() => fileName?.focus(), 100);

            // Update content placeholder based on type
            fileType?.addEventListener('change', (e) => {
                const type = e.target.value;
                if (type === 'pdf') {
                    // Show PDF upload modal
                    modal.style.display = 'none';
                    this.showPDFUploadModal();
                } else {
                    fileContent.placeholder = '# Meu Documento\n\nDigite o conteúdo aqui...';
                }
            });
        }
    }

    /**
     * Mostra modal de upload PDF
     */
    showPDFUploadModal() {
        const modal = document.getElementById('uploadPdfModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    /**
     * Processa adição de arquivo
     */
    async handleAddFile(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('fileName').trim();
        const type = formData.get('fileType');
        const content = formData.get('fileContent').trim();

        if (!name) {
            this.showNotification('error', 'Nome obrigatório', 'Por favor, informe o nome do arquivo');
            return;
        }

        if (type === 'markdown' && !content) {
            this.showNotification('error', 'Conteúdo obrigatório', 'Por favor, adicione conteúdo ao documento');
            return;
        }

        try {
            await storageManager.addDocument({
                name,
                type,
                content: type === 'markdown' ? content : null
            });

            this.closeAllModals();
            this.showNotification('success', 'Documento salvo', `${name} foi salvo com sucesso`);
            
            // Recarregar lista
            await this.refreshDocumentsList();
        } catch (error) {
            console.error('Erro ao salvar documento:', error);
            this.showNotification('error', 'Erro ao salvar', error.message);
        }
    }

    /**
     * Fecha todos os modais
     */
    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    /**
     * Mostra/esconde o viewer de documentos
     */
    showDocumentViewer() {
        const filesGrid = document.getElementById('filesGrid');
        const documentViewer = document.getElementById('documentViewer');
        
        if (filesGrid) filesGrid.style.display = 'none';
        if (documentViewer) documentViewer.style.display = 'block';
    }

    /**
     * Fecha o viewer de documentos
     */
    closeDocumentViewer() {
        const filesGrid = document.getElementById('filesGrid');
        const documentViewer = document.getElementById('documentViewer');
        
        if (documentViewer) documentViewer.style.display = 'none';
        if (filesGrid) filesGrid.style.display = 'grid';
    }

    /**
     * Renderiza lista de documentos
     */
    async renderDocumentsList(documents = null) {
        if (!documents) {
            documents = await storageManager.getAllDocuments();
        }

        const grid = document.getElementById('filesGrid');
        if (!grid) return;

        if (documents.length === 0) {
            grid.innerHTML = this.getEmptyStateHTML();
            return;
        }

        grid.innerHTML = documents.map(doc => this.createDocumentCard(doc)).join('');
        
        // Bind events para os cards
        this.bindDocumentCardEvents();
    }

    /**
     * Recarrega a lista de documentos (busca novamente do storage)
     */
    async refreshDocumentsList() {
        console.log('🔄 Recarregando lista de documentos...');
        await this.renderDocumentsList(); // Chama sem parâmetros para buscar do storage
    }

    /**
     * Cria card de documento
     */
    createDocumentCard(document) {
        const createdDate = new Date(document.createdAt).toLocaleDateString('pt-BR');
        const fileTypeClass = document.type === 'markdown' ? 'markdown' : 'pdf';
        const fileTypeIcon = document.type === 'markdown' ? 'fab fa-markdown' : 'fas fa-file-pdf';
        const fileTypeName = document.type === 'markdown' ? 'MD' : 'PDF';

        return `
            <div class="file-card" data-id="${document.id}">
                <div class="file-card-content">
                    <div class="file-icon ${fileTypeClass}">
                        <i class="${fileTypeIcon}"></i>
                    </div>
                    <h3 class="file-card-title">${this.escapeHtml(document.name)}</h3>
                    <div class="file-card-meta">
                        <span class="file-type-badge">${fileTypeName}</span>
                        <span class="file-date">${createdDate}</span>
                    </div>
                </div>
                <div class="file-actions">
                    <button class="file-action-btn" onclick="uiManager.openDocument(${document.id})" title="Abrir">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="file-action-btn" onclick="uiManager.editDocument(${document.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="file-action-btn delete" onclick="uiManager.deleteDocument(${document.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * HTML para estado vazio
     */
    getEmptyStateHTML() {
        return `
            <div class="empty-state">
                <i class="fas fa-archive"></i>
                <h3>Nenhum documento ainda</h3>
                <p>Comece adicionando seu primeiro documento ao Knowledge Hub</p>
                <button class="btn-primary" onclick="uiManager.showAddFileModal()">
                    <i class="fas fa-plus"></i>
                    Adicionar Primeiro Documento
                </button>
            </div>
        `;
    }

    /**
     * Bind events para cards de documentos
     */
    bindDocumentCardEvents() {
        const cards = document.querySelectorAll('.file-card');
        cards.forEach(card => {
            // Click para abrir
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.file-actions')) {
                    const id = parseInt(card.dataset.id);
                    this.openDocument(id);
                }
            });

            // Context menu
            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const id = parseInt(card.dataset.id);
                this.showContextMenu(e, id);
            });
        });
    }

    /**
     * Abre documento
     */
    async openDocument(id) {
        try {
            this.showLoading(true);
            const document = await storageManager.getDocument(id);
            
            if (!document) {
                throw new Error('Documento não encontrado');
            }

            // Atualizar header do viewer
            document.getElementById('documentTitle').textContent = document.name;
            document.getElementById('documentType').textContent = document.type === 'markdown' ? 'MD' : 'PDF';
            document.getElementById('editDocumentBtn').dataset.documentId = id;
            document.getElementById('deleteDocumentBtn').dataset.documentId = id;

            // Mostrar viewer
            this.showDocumentViewer();

            // Renderizar conteúdo
            const markdownContainer = document.getElementById('markdownPreview');
            const pdfContainer = document.getElementById('pdfViewer');
            const pdfEmbed = document.getElementById('pdfEmbed');

            if (document.type === 'markdown') {
                markdownContainer.style.display = 'block';
                pdfContainer.style.display = 'none';
                await documentRenderer.renderMarkdown(document.content, markdownContainer);
            } else {
                markdownContainer.style.display = 'none';
                pdfContainer.style.display = 'block';
                documentRenderer.renderPDF(document.content, pdfContainer);
            }

        } catch (error) {
            console.error('Erro ao abrir documento:', error);
            this.showNotification('error', 'Erro ao abrir', error.message);
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Edita documento
     */
    editDocument(id) {
        // Por enquanto, apenas abrir como visualização
        // TODO: Implementar editor
        this.openDocument(id);
        this.showNotification('info', 'Em desenvolvimento', 'Editor de documentos em breve!');
    }

    /**
     * Exclui documento
     */
    async deleteDocument(id) {
        if (!confirm('Tem certeza que deseja excluir este documento?')) {
            return;
        }

        try {
            await storageManager.deleteDocument(id);
            this.showNotification('success', 'Documento excluído', 'O documento foi removido com sucesso');
            await this.refreshDocumentsList();
            
            // Se estava sendo visualizado, voltar à lista
            const documentViewer = document.getElementById('documentViewer');
            if (documentViewer && documentViewer.style.display !== 'none') {
                this.closeDocumentViewer();
            }
        } catch (error) {
            console.error('Erro ao excluir documento:', error);
            this.showNotification('error', 'Erro ao excluir', error.message);
        }
    }

    /**
     * Edita documento atual
     */
    editCurrentDocument() {
        const documentId = parseInt(document.getElementById('editDocumentBtn').dataset.documentId);
        if (documentId) {
            this.editDocument(documentId);
        }
    }

    /**
     * Exclui documento atual
     */
    deleteCurrentDocument() {
        const documentId = parseInt(document.getElementById('deleteDocumentBtn').dataset.documentId);
        if (documentId) {
            this.deleteDocument(documentId);
        }
    }

    /**
     * Atualiza lista de documentos
     */
    async refreshDocumentsList() {
        const documents = await storageManager.getAllDocuments();
        await this.renderDocumentsList(documents);
    }

    /**
     * Processa busca
     */
    async handleSearch(query) {
        // Debounce
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(async () => {
            if (query.trim() === '') {
                await this.refreshDocumentsList();
                return;
            }

            try {
                const results = await storageManager.searchDocuments(query);
                await this.renderDocumentsList(results);
                
                // Mostrar resultado da busca
                this.showSearchResults(query, results.length);
            } catch (error) {
                console.error('Erro na busca:', error);
                this.showNotification('error', 'Erro na busca', error.message);
            }
        }, 300);
    }

    /**
     * Mostra resultado da busca
     */
    showSearchResults(query, count) {
        const resultsDiv = document.getElementById('searchResults');
        if (resultsDiv) {
            resultsDiv.innerHTML = `Encontrados ${count} resultado(s) para "${query}"`;
        }
    }

    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Formatar tamanho de arquivo
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Mostra/esconde loading
     */
    showLoading(show) {
        const loading = document.getElementById('loadingOverlay');
        if (loading) {
            loading.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Mostra notificação
     */
    showNotification(type, title, message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.remove();
        }, duration);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    /**
     * Ícone para tipo de notificação
     */
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    /**
     * Mensagem de boas-vindas
     */
    showWelcomeMessage() {
        setTimeout(() => {
            this.showNotification('info', 'Bem-vindo ao Knowledge Hub!', 'Comece adicionando seus documentos para organizar seu conhecimento');
        }, 1000);
    }
}

// Instância global
const uiManager = new UIManager();

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}