/**
 * INTEGRAÇÃO DO EDITOR MARKDOWN
 * Conecta o sistema de abas principal com o editor customizado
 */

class MarkdownEditorIntegration {
    constructor() {
        this.editor = null;
        this.tabsManager = null;
        this.contentChangeTimeout = null;
        this.init();
    }

    init() {
        // Aguardar carregamento do DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    async initialize() {
        try {
            console.log('🔗 Inicializando integração do editor...');
            
            // Aguardar módulos principais carregarem
            await this.waitForModules();
            
            // Inicializar editor customizado
            this.initCustomEditor();
            
            // Configurar integração com sistema de abas
            this.setupTabsIntegration();
            
            // Configurar eventos
            this.setupEventListeners();
            
            // Inicializar primeira aba se não existir
            this.initializeFirstTab();
            
            console.log('✅ Integração do editor concluída!');
            
        } catch (error) {
            console.error('❌ Erro na integração do editor:', error);
        }
    }

    initializeFirstTab() {
        // Se não há abas existentes, criar uma nova
        setTimeout(() => {
            if (this.tabsManager && this.tabsManager.tabs.length === 0) {
                console.log('📄 Criando primeira aba vazia...');
                this.tabsManager.createNewTab('', 'Novo Documento');
            }
        }, 1000);
    }

    async waitForModules() {
        const maxAttempts = 50;
        let attempts = 0;
        
        while (attempts < maxAttempts) {
            // Aguardar EditorUtils estar disponível
            if (window.EditorUtils) break;
            
            // Aguardar módulos dos scripts
            if (window.markdownEditor || window.tabsManager || window.previewManager) break;
            
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (attempts >= maxAttempts) {
            console.warn('⚠️ Alguns módulos não carregaram completamente');
        }
    }

    initCustomEditor() {
        // Inicializar editor customizado se ainda não foi inicializado
        if (!window.markdownEditor) {
            window.markdownEditor = new MarkdownEditor();
        }
        
        this.editor = window.markdownEditor;
    }

    setupTabsIntegration() {
        // Aguardar sistema de abas estar disponível
        const checkTabs = () => {
            if (window.tabsManager) {
                this.tabsManager = window.tabsManager;
                this.integrateWithTabs();
            } else if (window.tabs) {
                this.tabsManager = window.tabs;
                this.integrateWithTabs();
            } else {
                setTimeout(checkTabs, 100);
            }
        };
        
        checkTabs();
    }

    integrateWithTabs() {
        if (!this.tabsManager) return;
        
        console.log('🔗 Integrando com sistema de abas...');
        
        // Evento de criação de nova aba
        this.tabsManager.addEventListener('tabCreated', (event) => {
            this.onTabCreated(event.detail);
        });
        
        // Evento de ativação de aba
        this.tabsManager.addEventListener('tabActivated', (event) => {
            this.onTabActivated(event.detail);
        });
        
        // Evento de mudança de conteúdo
        this.tabsManager.addEventListener('contentChanged', (event) => {
            this.onContentChanged(event.detail);
        });
    }

    onTabCreated(tabData) {
        if (this.editor) {
            // Garantir que o editor seja inicializado para a nova aba
            setTimeout(() => {
                this.editor.updatePreview();
                this.editor.updateNavigationTree();
            }, 100);
        }
    }

    onTabActivated(tabData) {
        console.log('🔄 Aba ativada:', tabData.id);
        if (this.editor) {
            setTimeout(() => {
                this.editor.updatePreview();
                this.editor.updateNavigationTree();
                this.editor.updateWordCount();
                this.editor.updateCharCount();
                console.log('✅ UI atualizada após ativação da aba');
            }, 200);
        }
    }

    onContentChanged(contentData) {
        console.log('📝 Conteúdo alterado, atualizando preview...');
        if (this.editor) {
            // Debounce para evitar atualizações muito frequentes
            clearTimeout(this.contentChangeTimeout);
            this.contentChangeTimeout = setTimeout(() => {
                this.editor.updatePreview();
                this.editor.updateNavigationTree();
                this.editor.updateWordCount();
                this.editor.updateCharCount();
            }, 300);
        }
    }

    setupEventListeners() {
        // Evento de arquivo carregado
        document.addEventListener('fileLoaded', (event) => {
            this.handleFileLoaded(event.detail);
        });

        // Evento de salvamento solicitado
        document.addEventListener('saveRequested', (event) => {
            if (this.editor) {
                this.editor.saveToLocal();
            }
        });

        // Evento de impressão solicitada
        document.addEventListener('printRequested', (event) => {
            if (this.editor) {
                this.editor.printDocument();
            }
        });

        // Evento de atualização do preview
        document.addEventListener('updatePreview', (event) => {
            if (this.editor) {
                this.editor.updatePreview();
            }
        });
    }

    handleFileLoaded(fileData) {
        console.log('📁 Arquivo carregado:', fileData.fileName, 'Tamanho:', fileData.content.length, 'caracteres');
        
        if (this.tabsManager) {
            // Criar nova aba com o arquivo carregado
            const tabId = this.tabsManager.createNewTab(fileData.content, fileData.fileName);
            console.log('✅ Nova aba criada com ID:', tabId);
            
            // Aguardar um pouco e então forçar atualização do preview e navegação
            setTimeout(() => {
                this.forceUpdatePreview();
                this.forceUpdateNavigation();
                this.updateEditorStats();
            }, 500);
            
        } else if (this.editor) {
            // Fallback para o editor customizado
            this.editor.createNewTab(fileData.fileName, fileData.content);
        }
    }

    updateEditorStats() {
        if (this.editor) {
            this.editor.updateWordCount();
            this.editor.updateCharCount();
        }
    }

    // Métodos públicos para acesso externo
    getEditor() {
        return this.editor;
    }

    getTabsManager() {
        return this.tabsManager;
    }

    forceUpdatePreview() {
        if (this.editor) {
            this.editor.updatePreview();
        }
    }

    forceUpdateNavigation() {
        if (this.editor) {
            this.editor.updateNavigationTree();
        }
    }

    // Novo método para forçar sincronização completa
    forceFullSync() {
        console.log('🔄 Forçando sincronização completa...');
        setTimeout(() => {
            this.forceUpdatePreview();
            this.forceUpdateNavigation();
            this.updateEditorStats();
            console.log('✅ Sincronização completa concluída');
        }, 300);
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

    // Método para debug do sistema
    debug() {
        return {
            hasEditor: !!this.editor,
            hasTabsManager: !!this.tabsManager,
            windowEditorManager: !!window.editorManager,
            windowTabsManager: !!window.tabsManager,
            currentEditor: this.getCurrentEditor(),
            tabsCount: this.tabsManager?.tabs?.length || 0,
            activeTab: this.tabsManager?.activeTab || null
        };
    }

    getStatus() {
        return {
            editor: !!this.editor,
            tabsManager: !!this.tabsManager,
            integrated: !!(this.editor && this.tabsManager)
        };
    }
}

// Adicionar globalmente
window.MarkdownEditorIntegration = MarkdownEditorIntegration;

// Inicializar automaticamente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.editorIntegration = new MarkdownEditorIntegration();
    });
} else {
    window.editorIntegration = new MarkdownEditorIntegration();
}

// Exportar para console de debug
window.debugEditor = () => {
    const integration = window.editorIntegration;
    if (integration) {
        return {
            integration: integration,
            editor: window.markdownEditor,
            status: integration.getStatus(),
            debug: integration.debug(),
            editorManager: window.editorManager,
            tabsManager: window.tabsManager
        };
    }
    return {
        integration: null,
        editor: window.markdownEditor,
        status: null
    };
};

// Método para forçar sincronização manual
window.forceEditorSync = () => {
    if (window.editorIntegration) {
        console.log('🔄 Forçando sincronização manual...');
        window.editorIntegration.forceFullSync();
    } else {
        console.log('❌ Integração não disponível');
    }
};