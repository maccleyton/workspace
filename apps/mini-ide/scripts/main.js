// ===== MINI IDE MAIN APPLICATION =====

class MiniIDE {
    constructor() {
        this.isInitialized = false;
        this.components = {};
        
        // Inicializar quando DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        try {
            console.log('🚀 Inicializando Mini IDE...');
            
            // Verificar se o Monaco Editor está disponível
            if (typeof monaco === 'undefined') {
                throw new Error('Monaco Editor não carregado');
            }
            
            // Aguardar componentes carregarem
            await this.loadComponents();
            
            // Inicializar componentes
            this.initializeComponents();
            
            // Configurar eventos globais
            this.setupGlobalEventListeners();
            
            // Carregar configurações
            this.loadSettings();
            
            // Criar arquivo de exemplo
            this.createWelcomeFile();
            
            this.isInitialized = true;
            console.log('✅ Mini IDE inicializada com sucesso!');
            
            // Notificar que está pronto
            this.showNotification('Mini IDE carregada com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar Mini IDE:', error);
            this.showNotification('Erro ao carregar Mini IDE: ' + error.message, 'error');
        }
    }

    async loadComponents() {
        console.log('📦 Carregando componentes...');
        
        // Aguardar que todos os scripts sejam carregados
        const waitForComponents = () => {
            return new Promise((resolve) => {
                const checkComponents = () => {
                    if (window.codeEditor && window.scriptExecutor && 
                        window.fileManager && window.templateManager && 
                        window.settingsManager && window.consoleManager) {
                        resolve();
                    } else {
                        setTimeout(checkComponents, 100);
                    }
                };
                checkComponents();
            });
        };
        
        // Timeout de 10 segundos
        const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout ao carregar componentes')), 10000)
        );
        
        await Promise.race([waitForComponents(), timeout]);
    }

    initializeComponents() {
        console.log('⚙️ Inicializando componentes...');
        
        // Inicializar componentes na ordem correta
        this.components.settingsManager = window.settingsManager;
        this.components.templateManager = window.templateManager;
        this.components.fileManager = window.fileManager;
        this.components.consoleManager = window.consoleManager;
        this.components.codeEditor = window.codeEditor;
        this.components.scriptExecutor = window.scriptExecutor;
        
        // Configurar referência global
        window.miniIDE = this;
        
        console.log('✅ Componentes inicializados');
    }

    setupGlobalEventListeners() {
        console.log('🎧 Configurando eventos globais...');
        
        // Hotkeys globais
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.components.scriptExecutor.execute();
                        break;
                    case 's':
                        e.preventDefault();
                        this.components.fileManager.saveCurrentFile();
                        break;
                    case 'n':
                        e.preventDefault();
                        this.showNewFileModal();
                        break;
                    case 'o':
                        e.preventDefault();
                        this.openFile();
                        break;
                    case 'b':
                        e.preventDefault();
                        this.toggleFileExplorer();
                        break;
                    case '`':
                        e.preventDefault();
                        this.toggleConsole();
                        break;
                    case 'f':
                        if (!e.shiftKey) {
                            e.preventDefault();
                            this.components.codeEditor.focus();
                        }
                        break;
                }
            }
            
            if (e.key === 'F5') {
                e.preventDefault();
                this.components.scriptExecutor.execute();
            }
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Settings modal
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.showSettingsModal();
        });

        // File actions
        document.getElementById('runBtn').addEventListener('click', () => {
            this.components.scriptExecutor.execute();
        });

        document.getElementById('newFileBtn').addEventListener('click', () => {
            this.showNewFileModal();
        });

        document.getElementById('openFileBtn').addEventListener('click', () => {
            this.openFile();
        });

        document.getElementById('saveFileBtn').addEventListener('click', () => {
            this.components.fileManager.saveCurrentFile();
        });

        // Output panel
        document.getElementById('clearOutputBtn').addEventListener('click', () => {
            this.components.scriptExecutor.clearOutput();
        });

        document.getElementById('exportOutputBtn').addEventListener('click', () => {
            this.exportOutput();
        });

        document.getElementById('toggleOutputBtn').addEventListener('click', () => {
            this.toggleOutputPanel();
        });

        // Console
        document.getElementById('toggleConsoleBtn').addEventListener('click', () => {
            this.toggleConsole();
        });

        document.getElementById('clearConsoleBtn').addEventListener('click', () => {
            this.components.consoleManager.clear();
        });

        document.getElementById('runConsoleBtn').addEventListener('click', () => {
            this.runConsoleCommand();
        });

        // Template actions
        document.getElementById('insertTemplateBtn').addEventListener('click', () => {
            this.insertTemplate();
        });

        document.getElementById('templateSelect').addEventListener('change', () => {
            this.onTemplateSelect();
        });

        // File explorer actions
        document.getElementById('newFileBtn2').addEventListener('click', () => {
            this.showNewFileModal();
        });

        document.getElementById('refreshFilesBtn').addEventListener('click', () => {
            this.components.fileManager.refreshFileList();
        });

        console.log('✅ Eventos globais configurados');
    }

    loadSettings() {
        console.log('⚙️ Carregando configurações...');
        
        // Aplicar configurações salvas
        this.components.settingsManager.loadSettings();
        
        // Aplicar tema
        const theme = this.components.settingsManager.get('ui.theme') || 'dark';
        this.applyTheme(theme);
        
        console.log('✅ Configurações carregadas');
    }

    createWelcomeFile() {
        console.log('📝 Criando arquivo de boas-vindas...');
        
        // Verificar se já existe algum arquivo
        if (this.components.fileManager.getFileCount() === 0) {
            const welcomeContent = `// 🚀 Bem-vindo à Mini IDE!
// 
// Esta é sua área de trabalho para testar scripts.
// 
// Atalhos úteis:
// • Ctrl+Enter: Executar script
// • Ctrl+S: Salvar arquivo
// • Ctrl+N: Novo arquivo
// • Ctrl+O: Abrir arquivo
// • Ctrl+\`: Alternar console
//
// Comece a digitar seu código aqui:

console.log('Hello, Mini IDE! 🎉');

// Teste com um loop:
for (let i = 0; i < 5; i++) {
    console.log(\`Iteração \${i + 1}\`);
}

// Ou experimente funções assíncronas:
async function exemplo() {
    console.log('Processando...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Concluído! ✅');
}

exemplo();`;

            this.components.fileManager.createFile('bem-vindo.js', welcomeContent, 'javascript');
        }
    }

    // === THEME MANAGEMENT ===
    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.applyTheme(newTheme);
        this.components.settingsManager.set('ui.theme', newTheme);
        
        this.showNotification(`Tema alterado para ${newTheme === 'dark' ? 'escuro' : 'claro'}`, 'success');
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        // Atualizar ícone do toggle
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Aplicar tema no Monaco Editor
        if (this.components.codeEditor) {
            this.components.codeEditor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs-light');
        }
    }

    // === FILE OPERATIONS ===
    showNewFileModal() {
        const modal = document.getElementById('newFileModal');
        if (modal) {
            modal.style.display = 'flex';
            
            // Limpar campos
            document.getElementById('newFileName').value = 'script.js';
            document.getElementById('newFileLanguage').value = 'javascript';
            
            // Carregar templates
            this.loadNewFileTemplates();
        }
    }

    loadNewFileTemplates() {
        const templateSelect = document.getElementById('newFileTemplate');
        const templates = this.components.templateManager.getAllTemplates();
        
        // Limpar options existentes (manter "Arquivo em branco")
        while (templateSelect.children.length > 1) {
            templateSelect.removeChild(templateSelect.lastChild);
        }
        
        // Adicionar templates por linguagem
        Object.keys(templates).forEach(lang => {
            const group = document.createElement('optgroup');
            group.label = lang.charAt(0).toUpperCase() + lang.slice(1);
            
            Object.keys(templates[lang]).forEach(templateKey => {
                const template = templates[lang][templateKey];
                const option = document.createElement('option');
                option.value = `${lang}:${templateKey}`;
                option.textContent = template.name;
                option.setAttribute('data-description', template.description);
                group.appendChild(option);
            });
            
            templateSelect.appendChild(group);
        });
    }

    createNewFile() {
        const fileName = document.getElementById('newFileName').value.trim();
        const language = document.getElementById('newFileLanguage').value;
        const templateValue = document.getElementById('newFileTemplate').value;
        
        if (!fileName) {
            this.showNotification('Nome do arquivo é obrigatório', 'error');
            return;
        }
        
        let content = '';
        let finalLanguage = language;
        
        // Se template foi selecionado, carregar conteúdo
        if (templateValue) {
            const [templateLang, templateKey] = templateValue.split(':');
            const template = this.components.templateManager.getTemplate(templateLang, templateKey);
            if (template) {
                content = template.code;
                finalLanguage = templateLang;
            }
        }
        
        // Criar arquivo
        this.components.fileManager.createFile(fileName, content, finalLanguage);
        
        // Fechar modal
        this.hideNewFileModal();
        
        this.showNotification(`Arquivo "${fileName}" criado com sucesso!`, 'success');
    }

    hideNewFileModal() {
        const modal = document.getElementById('newFileModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    openFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.js,.ts,.py,.sh,.ps1,.html,.css,.json,.txt';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target.result;
                    const language = this.detectLanguage(file.name);
                    this.components.fileManager.createFile(file.name, content, language);
                    this.showNotification(`Arquivo "${file.name}" aberto com sucesso!`, 'success');
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    detectLanguage(fileName) {
        const ext = fileName.split('.').pop().toLowerCase();
        const langMap = {
            'js': 'javascript',
            'ts': 'typescript',
            'py': 'python',
            'sh': 'shell',
            'ps1': 'powershell',
            'html': 'html',
            'css': 'css',
            'json': 'json',
            'txt': 'plaintext'
        };
        return langMap[ext] || 'plaintext';
    }

    // === TEMPLATE OPERATIONS ===
    onTemplateSelect() {
        const select = document.getElementById('templateSelect');
        const insertBtn = document.getElementById('insertTemplateBtn');
        
        if (select.value) {
            insertBtn.disabled = false;
            const [lang, key] = select.value.split(':');
            const template = this.components.templateManager.getTemplate(lang, key);
            
            if (template) {
                // Mostrar descrição em tooltip ou similar
                insertBtn.title = template.description;
            }
        } else {
            insertBtn.disabled = true;
            insertBtn.title = '';
        }
    }

    insertTemplate() {
        const select = document.getElementById('templateSelect');
        const value = select.value;
        
        if (!value) return;
        
        const [lang, key] = value.split(':');
        const template = this.components.templateManager.getTemplate(lang, key);
        
        if (template) {
            this.components.codeEditor.insertText(template.code);
            this.showNotification(`Template "${template.name}" inserido!`, 'success');
        }
    }

    // === UI TOGGLES ===
    toggleFileExplorer() {
        const explorer = document.getElementById('fileExplorer');
        if (explorer) {
            explorer.style.display = explorer.style.display === 'none' ? 'block' : 'none';
        }
    }

    toggleOutputPanel() {
        const panel = document.getElementById('outputPanel');
        const btn = document.getElementById('toggleOutputBtn');
        
        if (panel && btn) {
            const isHidden = panel.classList.contains('hidden');
            
            if (isHidden) {
                panel.classList.remove('hidden');
                btn.querySelector('i').className = 'fas fa-chevron-right';
                btn.title = 'Ocultar Painel';
            } else {
                panel.classList.add('hidden');
                btn.querySelector('i').className = 'fas fa-chevron-left';
                btn.title = 'Mostrar Painel';
            }
        }
    }

    toggleConsole() {
        const consoleBar = document.getElementById('consoleBar');
        const btn = document.getElementById('toggleConsoleBtn');
        const content = document.getElementById('consoleContent');
        
        if (consoleBar && btn && content) {
            const isExpanded = consoleBar.classList.contains('expanded');
            
            if (isExpanded) {
                consoleBar.classList.remove('expanded');
                content.style.display = 'none';
                btn.querySelector('i').className = 'fas fa-chevron-up';
                btn.title = 'Mostrar Console';
            } else {
                consoleBar.classList.add('expanded');
                content.style.display = 'flex';
                btn.querySelector('i').className = 'fas fa-chevron-down';
                btn.title = 'Ocultar Console';
            }
        }
    }

    // === CONSOLE OPERATIONS ===
    runConsoleCommand() {
        const input = document.getElementById('consoleInput');
        const command = input.value.trim();
        
        if (command) {
            this.components.consoleManager.log('> ' + command, 'input');
            this.components.scriptExecutor.executeCommand(command);
            input.value = '';
        }
    }

    // === OUTPUT OPERATIONS ===
    exportOutput() {
        const output = this.components.scriptExecutor.getOutput();
        if (output) {
            const blob = new Blob([output], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'output.txt';
            a.click();
            URL.revokeObjectURL(url);
            
            this.showNotification('Saída exportada com sucesso!', 'success');
        } else {
            this.showNotification('Nenhuma saída para exportar', 'warning');
        }
    }

    // === SETTINGS MODAL ===
    showSettingsModal() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.style.display = 'flex';
            this.components.settingsManager.populateSettings();
        }
    }

    hideSettingsModal() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // === NOTIFICATIONS ===
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const messageEl = document.getElementById('notificationMessage');
        const closeBtn = document.getElementById('notificationClose');
        
        if (notification && messageEl && closeBtn) {
            messageEl.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                this.hideNotification();
            }, 5000);
            
            // Manual close
            closeBtn.onclick = () => this.hideNotification();
        }
    }

    hideNotification() {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.style.display = 'none';
        }
    }

    // === CLEANUP ===
    destroy() {
        if (this.components.codeEditor) {
            this.components.codeEditor.destroy();
        }
        
        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeydown);
        
        console.log('🧹 Mini IDE destruída');
    }
}

// Inicializar aplicação
window.miniIDE = new MiniIDE();

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MiniIDE;
}
