/**
 * CONVERSOR DE FORMATOS - APP MAIN
 * Aplicação principal do conversor de formatos
 */

class FormatConverterApp {
    constructor() {
        this.version = '1.0.0';
        this.isInitialized = false;
        this.modules = {};
        this.settings = {};
        
        this.init();
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        try {
            console.log('🚀 Inicializando Conversor de Formatos...');
            
            // Aguarda DOM estar pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                this.start();
            }
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação:', error);
            this.showCriticalError(error);
        }
    }

    /**
     * Inicia a aplicação
     */
    async start() {
        try {
            // Inicializa módulos
            await this.initializeModules();
            
            // Configura recursos globais
            this.setupGlobalFeatures();
            
            // Carrega configurações
            await this.loadSettings();
            
            // Configura atalhos de teclado
            this.setupKeyboardShortcuts();
            
            // Configura event listeners
            this.setupEventListeners();
            
            // Marca como inicializada
            this.isInitialized = true;
            
            // Dispara evento de inicialização
            this.dispatchAppEvent('appInitialized', {
                version: this.version,
                timestamp: new Date().toISOString()
            });
            
            console.log('✅ Conversor de Formatos inicializado com sucesso!');
            
            // Mostra mensagem de boas-vindas
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('❌ Erro durante inicialização:', error);
            this.showCriticalError(error);
        }
    }

    /**
     * Inicializa módulos da aplicação
     */
    async initializeModules() {
        const modulePromises = [];

        // Inicializa módulos principais
        if (window.ConverterCore) {
            modulePromises.push(this.initModule('converterCore', window.ConverterCore));
        }

        if (window.TextConverter) {
            modulePromises.push(this.initModule('textConverter', window.TextConverter));
        }

        if (window.NumberConverter) {
            modulePromises.push(this.initModule('numberConverter', window.NumberConverter));
        }

        if (window.ThemeManager) {
            modulePromises.push(this.initModule('themeManager', window.ThemeManager));
        }

        // Aguarda todos os módulos serem inicializados
        await Promise.all(modulePromises);
    }

    /**
     * Inicializa um módulo específico
     */
    async initModule(name, ModuleClass) {
        try {
            console.log(`📦 Inicializando módulo: ${name}`);
            
            this.modules[name] = new ModuleClass();
            
            console.log(`✅ Módulo ${name} inicializado`);
            return this.modules[name];
        } catch (error) {
            console.error(`❌ Erro ao inicializar módulo ${name}:`, error);
            throw error;
        }
    }

    /**
     * Configura recursos globais
     */
    setupGlobalFeatures() {
        // Configura Service Worker (se suportado)
        if ('serviceWorker' in navigator) {
            this.setupServiceWorker();
        }

        // Configura notificações
        this.setupNotifications();

        // Configura logging
        this.setupLogging();

        // Configura performance monitoring
        this.setupPerformanceMonitoring();
    }

    /**
     * Configura Service Worker
     */
    setupServiceWorker() {
        // Registro do service worker será implementado em versões futuras
        console.log('🔧 Service Worker configurado (reservado para futura implementação)');
    }

    /**
     * Configura sistema de notificações
     */
    setupNotifications() {
        // Solicita permissão para notificações
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('🔔 Permissão de notificação concedida');
                }
            });
        }
    }

    /**
     * Configura sistema de logging
     */
    setupLogging() {
        // Adiciona interceptador de console para logging avançado
        const originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info
        };

        console.log = (...args) => {
            originalConsole.log.apply(console, args);
            this.logToFile('info', args.join(' '));
        };

        console.warn = (...args) => {
            originalConsole.warn.apply(console, args);
            this.logToFile('warn', args.join(' '));
        };

        console.error = (...args) => {
            originalConsole.error.apply(console, args);
            this.logToFile('error', args.join(' '));
        };
    }

    /**
     * Configura monitoramento de performance
     */
    setupPerformanceMonitoring() {
        // Mede tempo de carregamento
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            console.log(`⏱️ Tempo de carregamento: ${loadTime}ms`);
            
            // Salva métricas de performance
            this.savePerformanceMetrics({
                loadTime,
                domContentLoaded: performance.now(),
                timestamp: new Date().toISOString()
            });
        });
    }

    /**
     * Carrega configurações da aplicação
     */
    async loadSettings() {
        try {
            const saved = localStorage.getItem('converter-app-settings');
            if (saved) {
                this.settings = JSON.parse(saved);
            } else {
                // Configurações padrão
                this.settings = this.getDefaultSettings();
            }
            
            // Aplica configurações
            this.applySettings();
            
        } catch (error) {
            console.warn('⚠️ Erro ao carregar configurações:', error);
            this.settings = this.getDefaultSettings();
        }
    }

    /**
     * Obtém configurações padrão
     */
    getDefaultSettings() {
        return {
            version: this.version,
            autoSave: true,
            showTooltips: true,
            enableAnimations: true,
            compactMode: false,
            defaultTextBase: 'text',
            defaultNumberBase: 'decimal',
            maxHistoryItems: 50,
            enableKeyboardShortcuts: true,
            showWelcomeMessage: true,
            performanceMonitoring: true,
            theme: 'dark',
            created: new Date().toISOString()
        };
    }

    /**
     * Aplica configurações
     */
    applySettings() {
        // Aplica configurações visuais
        if (this.settings.compactMode) {
            document.body.classList.add('compact-mode');
        }
        
        if (!this.settings.enableAnimations) {
            document.body.classList.add('no-animations');
        }

        // Aplica configurações de acessibilidade
        if (this.settings.highContrast) {
            document.body.classList.add('high-contrast');
        }
    }

    /**
     * Configura atalhos de teclado
     */
    setupKeyboardShortcuts() {
        if (!this.settings.enableKeyboardShortcuts) return;

        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K: Focar entrada de texto
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.focusTextInput();
            }

            // Ctrl/Cmd + Shift + K: Focar entrada de número
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
                e.preventDefault();
                this.focusNumberInput();
            }

            // Ctrl/Cmd + 1: Aba de texto
            if ((e.ctrlKey || e.metaKey) && e.key === '1') {
                e.preventDefault();
                this.switchToTab('text');
            }

            // Ctrl/Cmd + 2: Aba de número
            if ((e.ctrlKey || e.metaKey) && e.key === '2') {
                e.preventDefault();
                this.switchToTab('number');
            }

            // Escape: Limpar campos
            if (e.key === 'Escape') {
                this.clearAllInputs();
            }

            // Ctrl/Cmd + R: Nova conversão
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                this.startNewConversion();
            }
        });
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Event listener para visibilidade da página
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.onPageHidden();
            } else {
                this.onPageVisible();
            }
        });

        // Event listener para online/offline
        window.addEventListener('online', () => {
            this.onConnectionRestore();
        });

        window.addEventListener('offline', () => {
            this.onConnectionLost();
        });

        // Event listener para redimensionamento
        window.addEventListener('resize', this.debounce(() => {
            this.onWindowResize();
        }, 250));

        // Event listener para limpeza de recursos
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    /**
     * Foca entrada de texto
     */
    focusTextInput() {
        const textInput = document.getElementById('text-input');
        if (textInput) {
            this.switchToTab('text');
            textInput.focus();
            this.showNotification('Foco na entrada de texto', 'info');
        }
    }

    /**
     * Foca entrada de número
     */
    focusNumberInput() {
        const numberInput = document.getElementById('number-input');
        if (numberInput) {
            this.switchToTab('number');
            numberInput.focus();
            this.showNotification('Foco na entrada de número', 'info');
        }
    }

    /**
     * Alterna para aba específica
     */
    switchToTab(tabName) {
        const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (tabButton) {
            tabButton.click();
            this.showNotification(`Alternado para aba: ${tabName}`, 'info');
        }
    }

    /**
     * Limpa todas as entradas
     */
    clearAllInputs() {
        if (window.converterCore) {
            window.converterCore.clearAll();
        }
    }

    /**
     * Inicia nova conversão
     */
    startNewConversion() {
        this.clearAllInputs();
        this.focusTextInput();
        this.showNotification('Nova conversão iniciada', 'success');
    }

    /**
     * Manipula evento de página oculta
     */
    onPageHidden() {
        console.log('📱 Página oculta - pausando recursos');
        
        // Pausa timers e animações
        if (this.settings.autoSave) {
            this.saveCurrentState();
        }
    }

    /**
     * Manipula evento de página visível
     */
    onPageVisible() {
        console.log('📱 Página visível - retomando recursos');
        
        // Retoma recursos
        this.updateUptime();
    }

    /**
     * Manipula perda de conexão
     */
    onConnectionLost() {
        this.showNotification('Conexão perdida - funcionando offline', 'warning');
    }

    /**
     * Manipula restauração de conexão
     */
    onConnectionRestore() {
        this.showNotification('Conexão restaurada', 'success');
    }

    /**
     * Manipula redimensionamento da janela
     */
    onWindowResize() {
        // Ajusta layout responsivo
        this.adjustLayoutForScreen();
    }

    /**
     * Ajusta layout para tela
     */
    adjustLayoutForScreen() {
        const width = window.innerWidth;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        
        // Aplica classes de layout
        document.body.classList.toggle('mobile-layout', isMobile);
        document.body.classList.toggle('tablet-layout', isTablet);
        document.body.classList.toggle('desktop-layout', !isMobile && !isTablet);
    }

    /**
     * Salva estado atual
     */
    saveCurrentState() {
        try {
            const state = {
                currentTab: document.querySelector('.tab-button.active')?.getAttribute('data-tab'),
                textInput: document.getElementById('text-input')?.value,
                numberInput: document.getElementById('number-input')?.value,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('converter-current-state', JSON.stringify(state));
        } catch (error) {
            console.warn('Erro ao salvar estado:', error);
        }
    }

    /**
     * Carrega estado salvo
     */
    loadSavedState() {
        try {
            const saved = localStorage.getItem('converter-current-state');
            if (saved) {
                const state = JSON.parse(saved);
                const timeDiff = Date.now() - new Date(state.timestamp).getTime();
                
                // Só carrega se foi salvo há menos de 1 hora
                if (timeDiff < 3600000) {
                    if (state.currentTab) {
                        this.switchToTab(state.currentTab);
                    }
                    
                    if (state.textInput) {
                        const textInput = document.getElementById('text-input');
                        if (textInput) textInput.value = state.textInput;
                    }
                    
                    if (state.numberInput) {
                        const numberInput = document.getElementById('number-input');
                        if (numberInput) numberInput.value = state.numberInput;
                    }
                }
            }
        } catch (error) {
            console.warn('Erro ao carregar estado salvo:', error);
        }
    }

    /**
     * Salva métricas de performance
     */
    savePerformanceMetrics(metrics) {
        try {
            const existing = JSON.parse(localStorage.getItem('converter-performance') || '[]');
            existing.push(metrics);
            
            // Mantém apenas as últimas 100 entradas
            if (existing.length > 100) {
                existing.splice(0, existing.length - 100);
            }
            
            localStorage.setItem('converter-performance', JSON.stringify(existing));
        } catch (error) {
            console.warn('Erro ao salvar métricas de performance:', error);
        }
    }

    /**
     * Log para arquivo (simulado)
     */
    logToFile(level, message) {
        // Em uma implementação real, isso enviaria logs para um servidor
        if (this.settings.loggingEnabled) {
            console.log(`[${level.toUpperCase()}] ${new Date().toISOString()}: ${message}`);
        }
    }

    /**
     * Mostra notificação
     */
    showNotification(message, type = 'info') {
        // Usa o método do converterCore se disponível
        if (window.converterCore && window.converterCore.showToast) {
            window.converterCore.showToast(message, type);
        } else {
            // Fallback simples
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    /**
     * Mostra mensagem de boas-vindas
     */
    showWelcomeMessage() {
        if (this.settings.showWelcomeMessage) {
            setTimeout(() => {
                this.showNotification('Bem-vindo ao Conversor de Formatos! Use Ctrl+K para foco rápido', 'info');
            }, 1000);
        }
    }

    /**
     * Mostra erro crítico
     */
    showCriticalError(error) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'critical-error';
        errorContainer.innerHTML = `
            <div class="error-content">
                <h2>❌ Erro Crítico</h2>
                <p>Erro ao inicializar a aplicação:</p>
                <code>${error.message}</code>
                <button onclick="location.reload()" class="reload-btn">Recarregar Página</button>
            </div>
        `;

        // Estilos inline para garantir visibilidade
        errorContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #000;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            font-family: monospace;
        `;

        document.body.appendChild(errorContainer);
    }

    /**
     * Dispara evento da aplicação
     */
    dispatchAppEvent(eventName, data = {}) {
        const event = new CustomEvent(`app:${eventName}`, {
            detail: data
        });
        document.dispatchEvent(event);
    }

    /**
     * Debounce utility
     */
    debounce(func, wait) {
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

    /**
     * Atualiza tempo de atividade
     */
    updateUptime() {
        if (this.startTime) {
            const uptime = Date.now() - this.startTime;
            console.log(`⏱️ Tempo de atividade: ${Math.floor(uptime / 1000)}s`);
        }
    }

    /**
     * Limpa recursos
     */
    cleanup() {
        console.log('🧹 Limpando recursos da aplicação...');
        
        // Salva estado final
        this.saveCurrentState();
        
        // Remove event listeners
        // (Em uma implementação real, manteria uma lista de listeners para remover)
    }

    /**
     * Obtém informações da aplicação
     */
    getAppInfo() {
        return {
            name: 'Conversor de Formatos',
            version: this.version,
            initialized: this.isInitialized,
            modules: Object.keys(this.modules),
            settings: this.settings,
            uptime: this.startTime ? Date.now() - this.startTime : 0
        };
    }

    /**
     * Reinicia a aplicação
     */
    restart() {
        console.log('🔄 Reiniciando aplicação...');
        location.reload();
    }
}

// Inicializa a aplicação
const app = new FormatConverterApp();

// Adiciona app ao escopo global para debug
window.formatConverterApp = app;

// Event listeners globais
document.addEventListener('app:initialized', (e) => {
    console.log('🎉 Aplicação inicializada:', e.detail);
});

document.addEventListener('app:error', (e) => {
    console.error('❌ Erro na aplicação:', e.detail);
});

// Adiciona estilos CSS para componentes da aplicação
const appStyle = document.createElement('style');
appStyle.textContent = `
    .compact-mode .converter-section {
        padding: 16px;
    }
    
    .compact-mode .quick-actions {
        padding: 16px;
    }
    
    .no-animations *,
    .no-animations *::before,
    .no-animations *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .high-contrast {
        filter: contrast(150%);
    }
    
    .critical-error {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .error-content {
        text-align: center;
        max-width: 500px;
        padding: 40px;
    }
    
    .error-content h2 {
        margin: 0 0 20px 0;
        color: #ff6b6b;
    }
    
    .error-content code {
        background: #333;
        padding: 10px;
        border-radius: 4px;
        display: block;
        margin: 10px 0;
        white-space: pre-wrap;
    }
    
    .reload-btn {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 20px;
    }
    
    .reload-btn:hover {
        background: #45a049;
    }
    
    .mobile-layout .options-row {
        flex-direction: column;
    }
    
    .mobile-layout .convert-arrow {
        transform: rotate(90deg);
        margin: 8px 0;
    }
    
    .tablet-layout .quick-actions-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .desktop-layout .quick-actions-grid {
        grid-template-columns: repeat(4, 1fr);
    }
`;
document.head.appendChild(appStyle);