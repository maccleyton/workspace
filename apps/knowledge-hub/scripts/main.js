/**
 * Knowledge Hub - Main Application
 * Ponto de entrada principal da aplicação
 */

class KnowledgeHubApp {
    constructor() {
        this.version = '1.0.0';
        this.initialized = false;
        this.startupTime = null;
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        if (this.initialized) {
            console.log('Aplicação já inicializada');
            return;
        }

        this.startupTime = Date.now();
        console.log(`🚀 Iniciando Knowledge Hub v${this.version}...`);

        try {
            // Mostrar loading
            this.showLoading(true);

            // Verificar suporte do navegador
            this.checkBrowserSupport();

            // Inicializar módulos em ordem
            await this.initializeModules();

            // Configurar dados de exemplo se primeiro uso
            await this.handleFirstTimeSetup();

            // Inicializar interface
            await uiManager.init();

            // Carregar documentos
            await this.loadDocuments();

            // Configurar monitoramento
            this.setupMonitoring();

            this.initialized = true;
            this.showSuccessMessage();
            
            console.log(`✅ Knowledge Hub inicializado com sucesso em ${Date.now() - this.startupTime}ms`);
        } catch (error) {
            console.error('❌ Erro ao inicializar Knowledge Hub:', error);
            this.showErrorMessage(error);
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Verifica suporte do navegador
     */
    checkBrowserSupport() {
        const requirements = {
            'IndexedDB': () => window.indexedDB,
            'ES6 Modules': () => typeof Symbol !== 'undefined',
            'Local Storage': () => window.localStorage,
            'Fetch API': () => window.fetch,
            'Promise': () => window.Promise
        };

        const unsupported = Object.entries(requirements)
            .filter(([name, check]) => !check())
            .map(([name]) => name);

        if (unsupported.length > 0) {
            throw new Error(`Navegador não suporta: ${unsupported.join(', ')}`);
        }
    }

    /**
     * Inicializa módulos em ordem
     */
    async initializeModules() {
        console.log('📦 Inicializando módulos...');

        // 1. Storage Manager (base)
        await storageManager.init();
        console.log('✅ Storage Manager inicializado');

        // 2. Document Renderer
        await documentRenderer.init();
        console.log('✅ Document Renderer inicializado');

        // UI Manager será inicializado em init() separado
    }

    /**
     * Configura dados de exemplo para primeiro uso
     */
    async handleFirstTimeSetup() {
        const isFirstTime = !localStorage.getItem('knowledgeHubInitialized');
        
        if (isFirstTime) {
            console.log('🎯 Primeiro uso detectado, criando dados de exemplo...');
            
            try {
                // Criar documentos de exemplo
                const exampleDocs = this.getExampleDocuments();
                
                for (const doc of exampleDocs) {
                    await storageManager.addDocument(doc);
                }

                localStorage.setItem('knowledgeHubInitialized', 'true');
                console.log('✅ Dados de exemplo criados com sucesso');
            } catch (error) {
                console.error('⚠️ Erro ao criar dados de exemplo:', error);
            }
        }
    }

    /**
     * Documentos de exemplo
     */
    getExampleDocuments() {
        return [
            {
                name: 'Boas-vindas ao Knowledge Hub',
                type: 'markdown',
                content: `# 🎉 Bem-vindo ao Knowledge Hub!

O **Knowledge Hub** é seu centro de organização de documentos. Aqui você pode:

## ✨ Funcionalidades

- 📝 **Armazenar documentos Markdown** com renderização completa
- 📄 **Visualizar PDFs** diretamente no navegador
- 🔍 **Buscar rapidamente** em todo o conteúdo
- 🎨 **Múltiplos temas** para personalizar a experiência
- 💾 **Armazenamento local** com IndexedDB

## 🚀 Como usar

1. **Adicione documentos** usando o botão "Adicionar Arquivo"
2. **Navegue pelos cards** para visualizar rapidamente
3. **Clique em um card** para abrir e ler o documento
4. **Use a busca** para encontrar conteúdo específico

## 📚 Exemplo de Markdown

\`\`\`javascript
// Código com syntax highlighting
function hello() {
    console.log("Hello, Knowledge Hub!");
}
\`\`\`

> **Dica:** Use fórmulas LaTeX com $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ para matemática!

---
*Documento criado automaticamente para demonstração.*`
            },
            {
                name: 'Guia de Sintaxe Markdown',
                type: 'markdown',
                content: `# 📝 Guia de Sintaxe Markdown

## Headers

\`\`\`markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
\`\`\`

## Texto

**Negrito** e *itálico* e ~~riscado~~

\`Código inline\`

## Listas

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

1. Primeiro
2. Segundo
3. Terceiro

## Links e Imagens

[Link](https://example.com)
![Imagem](https://example.com/image.jpg)

## Código

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## Tabelas

| Nome | Idade | Cidade |
|------|-------|--------|
| João | 25 | SP |
| Maria | 30 | RJ |

## Citações

> Esta é uma citação
> 
> Com múltiplas linhas

## Fórmulas LaTeX

Inline: $E = mc^2$

Block:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

---
*Referência rápida para Markdown*`
            },
            {
                name: 'Atalhos de Teclado',
                type: 'markdown',
                content: `# ⌨️ Atalhos de Teclado

## Navegação

| Atalho | Ação |
|--------|------|
| \`Ctrl/Cmd + N\` | Novo documento |
| \`Ctrl/Cmd + F\` | Focar busca |
| \`Ctrl/Cmd + T\` | Alternar tema |
| \`Escape\` | Fechar modais |

## Busca

- Digite para buscar em tempo real
- Busca em nomes e conteúdo
- Resultados atualizados automaticamente

## Temas Disponíveis

1. 🌙 **Dark** - Padrão, ideal para uso noturno
2. ☀️ **Light** - Claro e limpo
3. 🌊 **Blue** - Tons de azul relaxantes
4. 🌿 **Green** - Verde natura
5. ✨ **Purple** - Roxo elegante
6. 🔥 **Orange** - Laranja energético

## Dicas

- Clique com botão direito nos cards para menu de contexto
- Use \`Ctrl/Cmd + F\` para buscar rapidamente
- Os documentos são salvos automaticamente
- PDFs têm controles de zoom integrados

---
*Knowledge Hub v1.0.0*`
            }
        ];
    }

    /**
     * Carrega documentos iniciais
     */
    async loadDocuments() {
        try {
            console.log('📂 Carregando documentos...');
            await uiManager.renderDocumentsList();
            console.log(`✅ ${await this.getDocumentCount()} documento(s) carregado(s)`);
        } catch (error) {
            console.error('❌ Erro ao carregar documentos:', error);
            uiManager.showNotification('error', 'Erro ao carregar', 'Não foi possível carregar os documentos');
        }
    }

    /**
     * Configura monitoramento
     */
    setupMonitoring() {
        // Monitor de performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`⚡ Performance: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            });
        }

        // Configurar comunicação com outros aplicativos
        this.setupInterAppCommunication();

        // Monitor de storage
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(estimate => {
                const usedMB = Math.round(estimate.usage / 1024 / 1024);
                const quotaMB = Math.round(estimate.quota / 1024 / 1024);
                console.log(`💾 Storage: ${usedMB}MB / ${quotaMB}MB usado`);
            });
        }

        // Erros não capturados
        window.addEventListener('error', (e) => {
            console.error('💥 Erro não capturado:', e.error);
            uiManager.showNotification('error', 'Erro inesperado', 'Algo deu errado. Recarregue a página se o problema persistir.');
        });

        // Service Worker para PWA (futuro)
        if ('serviceWorker' in navigator) {
            // navigator.serviceWorker.register('/sw.js');
        }
    }

    /**
     * Obtém número de documentos
     */
    async getDocumentCount() {
        try {
            const documents = await storageManager.getAllDocuments();
            return documents.length;
        } catch (error) {
            console.error('Erro ao contar documentos:', error);
            return 0;
        }
    }

    /**
     * Mostra mensagem de carregamento
     */
    showLoading(show) {
        const loading = document.getElementById('loadingOverlay');
        if (loading) {
            loading.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Mostra mensagem de sucesso
     */
    showSuccessMessage() {
        if (this.startupTime) {
            const startupTime = Date.now() - this.startupTime;
            console.log(`🎊 Knowledge Hub pronto! Inicializado em ${startupTime}ms`);
        }
    }

    /**
     * Mostra mensagem de erro
     */
    showErrorMessage(error) {
        const errorHTML = `
            <div style="padding: 2rem; text-align: center; color: var(--error);">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h2>Erro ao inicializar Knowledge Hub</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--error); color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Recarregar Página
                </button>
            </div>
        `;
        
        document.querySelector('.app-container').innerHTML = errorHTML;
    }

    /**
     * Reinicializa aplicação
     */
    async reset() {
        console.log('🔄 Reinicializando Knowledge Hub...');
        
        try {
            this.initialized = false;
            await storageManager.clearAll();
            localStorage.clear();
            sessionStorage.clear();
            
            location.reload();
        } catch (error) {
            console.error('Erro ao reinicializar:', error);
        }
    }

    /**
     * Exporta todos os dados
     */
    async exportData() {
        try {
            const data = await storageManager.exportAllDocuments();
            const blob = new Blob([JSON.stringify(data, null, 2)], { 
                type: 'application/json' 
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `knowledge-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            uiManager.showNotification('success', 'Backup exportado', 'Seus dados foram salvos em arquivo JSON');
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            uiManager.showNotification('error', 'Erro no backup', error.message);
        }
    }

    /**
     * Importa dados de backup
     */
    async importData(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (data.version && data.documents) {
                const result = await storageManager.importDocuments(data);
                uiManager.showNotification('success', 'Backup importado', 
                    `${result.imported} documento(s) importados com sucesso`);
                
                await uiManager.refreshDocumentsList();
            } else {
                throw new Error('Formato de backup inválido');
            }
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            uiManager.showNotification('error', 'Erro na importação', error.message);
        }
    }

    /**
     * Configura comunicação com outros aplicativos
     */
    setupInterAppCommunication() {
        console.log('🔗 Configurando comunicação inter-aplicativos...');

        // Escutar eventos de documentos adicionados pelo editor
        window.addEventListener('hubDocumentAdded', async (event) => {
            try {
                console.log('📄 Documento adicionado pelo editor:', event.detail);
                uiManager.showNotification('success', 'Novo documento', 
                    `Documento "${event.detail.name}" adicionado pelo editor`);
                
                // Recarregar lista de documentos
                await uiManager.refreshDocumentsList();
            } catch (error) {
                console.error('Erro ao processar documento adicionado:', error);
            }
        });

        // Escutar eventos de documentos atualizados pelo editor
        window.addEventListener('hubDocumentUpdated', async (event) => {
            try {
                console.log('📝 Documento atualizado pelo editor:', event.detail);
                uiManager.showNotification('info', 'Documento atualizado', 
                    `Documento "${event.detail.name}" foi atualizado pelo editor`);
                
                // Recarregar lista de documentos
                await uiManager.refreshDocumentsList();
            } catch (error) {
                console.error('Erro ao processar documento atualizado:', error);
            }
        });

        // Configurar BroadcastChannel para comunicação entre abas
        this.setupBroadcastChannel();

        console.log('✅ Comunicação inter-aplicativos configurada');
    }

    /**
     * Configura BroadcastChannel para comunicação entre abas
     */
    setupBroadcastChannel() {
        try {
            const channel = new BroadcastChannel('knowledge-hub');
            
            channel.onmessage = (event) => {
                const { type, data } = event.data;
                
                switch (type) {
                    case 'app-ping':
                        // Responder com hub-ping
                        channel.postMessage({ type: 'hub-ping' });
                        break;
                        
                    case 'document-added':
                        // Notificar que um documento foi adicionado
                        console.log('📄 Documento adicionado via broadcast:', data);
                        uiManager.refreshDocumentsList();
                        break;
                        
                    case 'document-updated':
                        // Notificar que um documento foi atualizado
                        console.log('📝 Documento atualizado via broadcast:', data);
                        uiManager.refreshDocumentsList();
                        break;
                }
            };

            // Notificar que o hub está ativo
            console.log('📡 Knowledge Hub ativo e escutando');
            
        } catch (error) {
            console.warn('BroadcastChannel não disponível:', error);
        }
    }

    /**
     * Debug info
     */
    getDebugInfo() {
        return {
            version: this.version,
            initialized: this.initialized,
            startupTime: this.startupTime,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookiesEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
            localStorage: !!window.localStorage,
            indexedDB: !!window.indexedDB
        };
    }
}

// Instância global da aplicação
const knowledgeHub = new KnowledgeHubApp();

// Inicialização automática quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => knowledgeHub.init());
} else {
    knowledgeHub.init();
}

// Global functions para debug
window.KnowledgeHub = {
    app: knowledgeHub,
    storage: storageManager,
    renderer: documentRenderer,
    ui: uiManager,
    reset: () => knowledgeHub.reset(),
    export: () => knowledgeHub.exportData(),
    debug: () => console.table(knowledgeHub.getDebugInfo())
};

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KnowledgeHubApp;
}