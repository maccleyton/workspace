/* ========================================
   ARQUIVO PRINCIPAL - INICIALIZAÇÃO
   ======================================== */

class CalculadoraApp {
    static version = '1.0.0';
    static isInitialized = false;
    static components = {};
    static startTime = 0;

    /* ========================================
       INICIALIZAÇÃO PRINCIPAL
       ======================================== */
    static async init() {
        if (this.isInitialized) {
            console.warn('CalculadoraApp já foi inicializada');
            return;
        }

        this.startTime = performance.now();
        console.log(`🚀 Iniciando Calculadora de Fórmulas v${this.version}`);

        try {
            // Aguarda DOM estar pronto
            if (document.readyState === 'loading') {
                await this.waitForDOMReady();
            }

            // Verifica dependências
            await this.checkDependencies();

            // Inicializa componentes em ordem
            await this.initializeComponents();

            // Configura eventos globais
            this.setupGlobalEvents();

            // Finaliza inicialização
            this.finalizeInitialization();

        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.showInitializationError(error);
        }
    }

    static async waitForDOMReady() {
        return new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                document.addEventListener('DOMContentLoaded', resolve);
            }
        });
    }

    static async checkDependencies() {
        console.log('🔍 Verificando dependências...');

        const dependencies = [
            { name: 'KaTeX', check: () => typeof katex !== 'undefined' },
            { name: 'Utils', check: () => typeof CalculatorUtils !== 'undefined' },
            { name: 'LatexRenderer', check: () => typeof LatexRenderer !== 'undefined' },
            { name: 'FormulasDatabase', check: () => typeof FormulasDatabase !== 'undefined' },
            { name: 'CalculationEngine', check: () => typeof CalculationEngine !== 'undefined' },
            { name: 'UIManager', check: () => typeof UIManager !== 'undefined' }
        ];

        for (const dep of dependencies) {
            if (!dep.check()) {
                throw new Error(`Dependência não encontrada: ${dep.name}`);
            }
        }

        console.log('✅ Todas as dependências estão disponíveis');
    }

    static async initializeComponents() {
        console.log('🔧 Inicializando componentes...');

        // 1. Inicializa LatexRenderer
        if (typeof LatexRenderer !== 'undefined') {
            LatexRenderer.init();
            this.components.latexRenderer = LatexRenderer;
            console.log('✅ LaTeX Renderer inicializado');
        }

        // 2. Inicializa Toast Manager
        if (typeof CalculatorUtils !== 'undefined' && CalculatorUtils.ToastManager) {
            CalculatorUtils.ToastManager.init();
            this.components.toastManager = CalculatorUtils.ToastManager;
            console.log('✅ Toast Manager inicializado');
        }

        // 3. Inicializa UI Manager (que vai inicializar os outros)
        if (typeof UIManager !== 'undefined') {
            UIManager.init();
            this.components.uiManager = UIManager;
            console.log('✅ UI Manager inicializado');
        }

        // 4. Carrega dados da base de fórmulas
        if (typeof FormulasDatabase !== 'undefined') {
            const totalFormulas = FormulasDatabase.getTotalCount();
            console.log(`📊 Base de dados carregada: ${totalFormulas} fórmulas`);
            this.components.formulasDatabase = FormulasDatabase;
        }

        // 5. Configura CalculationEngine
        if (typeof CalculationEngine !== 'undefined') {
            this.components.calculationEngine = CalculationEngine;
            console.log('✅ Calculation Engine configurado');
        }
    }

    static setupGlobalEvents() {
        console.log('🎯 Configurando eventos globais...');

        // Erros globais
        window.addEventListener('error', (event) => {
            this.handleGlobalError(event.error, 'JavaScript Error');
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.handleGlobalError(event.reason, 'Unhandled Promise Rejection');
        });

        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.logPerformanceMetrics();
                }, 100);
            });
        }

        // Service Worker (futuro)
        this.registerServiceWorker();

        // PWA install prompt (futuro)
        this.setupPWA();

        console.log('✅ Eventos globais configurados');
    }

    static finalizeInitialization() {
        const initTime = performance.now() - this.startTime;
        
        this.isInitialized = true;
        
        console.log(`🎉 Calculadora inicializada com sucesso em ${initTime.toFixed(2)}ms`);
        
        // Mostra notificação de boas-vindas na primeira vez
        this.showWelcomeMessage();

        // Marca a aplicação como pronta
        document.body.classList.add('app-ready');

        // Dispatch evento customizado
        this.dispatchAppReadyEvent();
    }

    /* ========================================
       EVENTOS E FEEDBACK
       ======================================== */
    static showWelcomeMessage() {
        // Só mostra na primeira vez
        const hasSeenWelcome = localStorage.getItem('calculadora_welcome_seen');
        if (!hasSeenWelcome) {
            setTimeout(() => {
                if (this.components.toastManager) {
                    this.components.toastManager.success(
                        'Bem-vindo à Calculadora de Fórmulas! Selecione uma categoria para começar.',
                        '🎉 Olá!'
                    );
                }
                localStorage.setItem('calculadora_welcome_seen', 'true');
            }, 1000);
        }
    }

    static showInitializationError(error) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #ff4444;
                color: white;
                padding: 2rem;
                border-radius: 8px;
                text-align: center;
                z-index: 9999;
                max-width: 500px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <h2>❌ Erro na Inicialização</h2>
                <p>Não foi possível inicializar a calculadora.</p>
                <p><strong>Erro:</strong> ${error.message}</p>
                <button onclick="location.reload()" style="
                    background: white;
                    color: #ff4444;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 1rem;
                ">Recarregar Página</button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    static handleGlobalError(error, type) {
        console.error(`${type}:`, error);
        
        // Não mostra toast para erros de rede/CDN
        if (error.message && (
            error.message.includes('CDN') || 
            error.message.includes('network') ||
            error.message.includes('Failed to fetch')
        )) {
            return;
        }

        if (this.components.toastManager) {
            this.components.toastManager.error(
                'Ocorreu um erro inesperado. Tente recarregar a página.',
                'Erro'
            );
        }
    }

    static dispatchAppReadyEvent() {
        const event = new CustomEvent('calculadoraAppReady', {
            detail: {
                version: this.version,
                components: this.components,
                initTime: performance.now() - this.startTime
            }
        });
        document.dispatchEvent(event);
    }

    /* ========================================
       PERFORMANCE E MONITORAMENTO
       ======================================== */
    static logPerformanceMetrics() {
        if (!('performance' in window)) return;

        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        const metrics = {
            'DOM Ready': navigation.domContentLoadedEventEnd - navigation.navigationStart,
            'Load Complete': navigation.loadEventEnd - navigation.navigationStart,
            'First Paint': paint.find(p => p.name === 'first-paint')?.startTime || 0,
            'First Contentful Paint': paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
        };

        console.log('📊 Métricas de Performance:', metrics);
        
        // Envia para analytics (futuro)
        if (this.isProduction()) {
            this.sendAnalytics(metrics);
        }
    }

    static isProduction() {
        return window.location.hostname !== 'localhost' && 
               !window.location.hostname.includes('127.0.0.1');
    }

    static sendAnalytics(metrics) {
        // Implementação futura para Google Analytics, etc.
        console.log('📈 Analytics:', metrics);
    }

    /* ========================================
       SERVICE WORKER E PWA
       ======================================== */
    static async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('✅ Service Worker registrado:', registration);
            } catch (error) {
                console.log('ℹ️ Service Worker não disponível:', error.message);
            }
        }
    }

    static setupPWA() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Mostra botão de instalação (futuro)
            this.showInstallButton(deferredPrompt);
        });
    }

    static showInstallButton(deferredPrompt) {
        // Implementação futura: botão de instalação PWA
        console.log('📱 PWA disponível para instalação');
    }

    /* ========================================
       MÉTODOS PÚBLICOS
       ======================================== */
    static getComponent(name) {
        return this.components[name];
    }

    static isReady() {
        return this.isInitialized;
    }

    static getVersion() {
        return this.version;
    }

    static reload() {
        window.location.reload();
    }

    static reset() {
        // Limpa storages
        if (typeof CalculatorUtils !== 'undefined' && CalculatorUtils.StorageManager) {
            CalculatorUtils.StorageManager.clear();
        }
        
        // Recarrega
        this.reload();
    }

    /* ========================================
       UTILITÁRIOS
       ======================================== */
    static formatTime(milliseconds) {
        if (milliseconds < 1000) {
            return `${milliseconds.toFixed(0)}ms`;
        } else {
            return `${(milliseconds / 1000).toFixed(2)}s`;
        }
    }

    static getMemoryUsage() {
        if ('memory' in performance) {
            return performance.memory;
        }
        return null;
    }

    static logSystemInfo() {
        const info = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            memory: this.getMemoryUsage()
        };
        
        console.log('💻 Informações do Sistema:', info);
        return info;
    }
}

/* ========================================
   INICIALIZAÇÃO AUTOMÁTICA
   ======================================== */

// Inicializa quando possível
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        CalculadoraApp.init();
    });
} else {
    // DOM já está pronto
    CalculadoraApp.init();
}

// Disponibiliza globalmente
window.CalculadoraApp = CalculadoraApp;

// Debug info
console.log('📦 Calculadora de Fórmulas carregada');
console.log('🔧 Para debug, use: window.CalculadoraApp');

// Export para testing (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalculadoraApp;
}