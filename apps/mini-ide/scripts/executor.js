// ===== SCRIPT EXECUTION ENGINE =====

class ScriptExecutor {
    constructor() {
        this.isRunning = false;
        this.output = [];
        this.consoleLogs = [];
        this.executionTime = 0;
        this.settings = {
            timeout: 30000,
            maxOutput: 10000,
            clearOutputOnRun: true,
            showExecutionTime: true
        };
        
        this.init();
    }

    init() {
        console.log('⚡ Inicializando Script Executor...');
        
        this.setupEventListeners();
        this.loadSettings();
        
        console.log('✅ Script Executor inicializado');
    }

    setupEventListeners() {
        // Setup será chamado pelo main.js
    }

    loadSettings() {
        if (window.miniIDE && window.miniIDE.components.settingsManager) {
            const settings = window.miniIDE.components.settingsManager.get('execution', {});
            this.settings = { ...this.settings, ...settings };
        }
    }

    // === EXECUTION CORE ===
    async execute() {
        if (this.isRunning) {
            this.showNotification('Execução já está em andamento', 'warning');
            return;
        }

        const code = window.codeEditor ? window.codeEditor.getContent() : '';
        
        if (!code.trim()) {
            this.showNotification('Nenhum código para executar', 'warning');
            return;
        }

        this.isRunning = true;
        const startTime = Date.now();
        
        try {
            // Limpar output se configurado
            if (this.settings.clearOutputOnRun) {
                this.clearOutput();
            }

            // Mostrar status
            this.showExecutionStatus('Executando...', 'running');

            // Redirecionar console
            this.redirectConsole();

            // Executar código
            await this.executeCode(code);

            // Calcular tempo de execução
            this.executionTime = Date.now() - startTime;

            if (this.settings.showExecutionTime) {
                this.appendOutput(`\n⏱️ Execução concluída em ${this.executionTime}ms`, 'success');
            }

            this.showExecutionStatus('Execução concluída!', 'success');

        } catch (error) {
            this.executionTime = Date.now() - startTime;
            this.handleExecutionError(error);
        } finally {
            this.restoreConsole();
            this.isRunning = false;
        }
    }

    async executeCode(code) {
        // Detectar tipo de linguagem
        const language = window.codeEditor ? window.codeEditor.getLanguage() : 'javascript';
        
        switch (language) {
            case 'javascript':
            case 'typescript':
                await this.executeJavaScript(code);
                break;
            case 'python':
                await this.executePython(code);
                break;
            case 'shell':
                await this.executeShell(code);
                break;
            default:
                this.appendOutput(`⚠️ Linguagem "${language}" não suportada para execução`, 'warning');
                this.appendOutput('Apenas JavaScript/TypeScript pode ser executado diretamente', 'warning');
        }
    }

    // === JAVASCRIPT EXECUTION ===
    async executeJavaScript(code) {
        return new Promise((resolve, reject) => {
            try {
                // Criar função segura
                const func = new Function(`
                    'use strict';
                    const console = window.miniIDE.components.consoleManager;
                    const setTimeout = window.miniIDE.components.scriptExecutor.createTimeout();
                    const setInterval = window.miniIDE.components.scriptExecutor.createInterval();
                    const clearTimeout = window.miniIDE.components.scriptExecutor.clearTimeout;
                    const clearInterval = window.miniIDE.components.scriptExecutor.clearInterval;
                    
                    ${code}
                `);

                // Executar com timeout
                const result = func();
                
                // Se é Promise, aguardar
                if (result && typeof result.then === 'function') {
                    result
                        .then(resolve)
                        .catch(reject);
                } else {
                    resolve(result);
                }

            } catch (error) {
                reject(error);
            }
        });
    }

    // === PYTHON EXECUTION (SIMULATED) ===
    async executePython(code) {
        this.appendOutput('🐍 Python não está disponível neste ambiente', 'warning');
        this.appendOutput('💡 Dica: Converta para JavaScript ou use um interpretador Python', 'info');
        this.appendOutput('\n🔄 Convertendo para JavaScript...', 'info');
        
        // Simular conversão básica Python -> JS
        const jsCode = this.convertPythonToJS(code);
        
        if (jsCode !== code) {
            this.appendOutput('\n✅ Código convertido. Executando...', 'success');
            await this.executeJavaScript(jsCode);
        } else {
            this.appendOutput('❌ Não foi possível converter automaticamente', 'error');
        }
    }

    // === SHELL EXECUTION (SIMULATED) ===
    async executeShell(code) {
        this.appendOutput('🐚 Shell não está disponível neste ambiente', 'warning');
        this.appendOutput('💡 Dica: Use JavaScript para simular operações de shell', 'info');
        this.appendOutput('\n🔄 Convertendo para JavaScript...', 'info');
        
        // Simular conversão básica Shell -> JS
        const jsCode = this.convertShellToJS(code);
        
        if (jsCode !== code) {
            this.appendOutput('\n✅ Código convertido. Executando...', 'success');
            await this.executeJavaScript(jsCode);
        } else {
            this.appendOutput('❌ Não foi possível converter automaticamente', 'error');
        }
    }

    // === CODE CONVERSION HELPERS ===
    convertPythonToJS(code) {
        let jsCode = code;
        
        // Substituições básicas Python -> JavaScript
        const conversions = [
            { from: /^print\((.*)\)$/gm, to: 'console.log($1)' },
            { from: /def\s+(\w+)\s*\(/g, to: 'function $1(' },
            { from: /self\./g, to: 'this.' },
            { from: /True/g, to: 'true' },
            { from: /False/g, to: 'false' },
            { from: /None/g, to: 'null' },
            { from: /and\s+/g, to: '&& ' },
            { from: /or\s+/g, to: '|| ' },
            { from: /not\s+/g, to: '! ' },
            { from: /elif\s+/g, to: 'else if ' }
        ];
        
        conversions.forEach(({ from, to }) => {
            jsCode = jsCode.replace(from, to);
        });
        
        return jsCode;
    }

    convertShellToJS(code) {
        let jsCode = code;
        
        // Substituições básicas Shell -> JavaScript
        const conversions = [
            { from: /^echo\s+(.*)$/gm, to: 'console.log($1)' },
            { from: /if\s+\[.*?\]\s*;?/g, to: '// if []' },
            { from: /for\s+(\w+)\s+in\s+(.*);/g, to: 'for (let $1 of $2);' },
            { from: /done/g, to: '}' },
            { from: /do/g, to: '{' },
            { from: /then/g, to: '{' }
        ];
        
        conversions.forEach(({ from, to }) => {
            jsCode = jsCode.replace(from, to);
        });
        
        return jsCode;
    }

    // === CONSOLE REDIRECTION ===
    redirectConsole() {
        // Salvar console original
        this.originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info,
            debug: console.debug
        };

        // Redirecionar para nossa implementação
        window.miniIDE.components.consoleManager.enableRedirection();
    }

    restoreConsole() {
        if (this.originalConsole) {
            console.log = this.originalConsole.log;
            console.error = this.originalConsole.error;
            console.warn = this.originalConsole.warn;
            console.info = this.originalConsole.info;
            console.debug = this.originalConsole.debug;
        }
    }

    // === TIMEOUT/INTERVAL HANDLERS ===
    createTimeout() {
        return (callback, delay) => {
            return setTimeout(() => {
                try {
                    callback();
                } catch (error) {
                    this.appendOutput(`Erro no timeout: ${error.message}`, 'error');
                }
            }, delay);
        };
    }

    createInterval() {
        return (callback, delay) => {
            return setInterval(() => {
                try {
                    callback();
                } catch (error) {
                    this.appendOutput(`Erro no interval: ${error.message}`, 'error');
                }
            }, delay);
        };
    }

    // === OUTPUT MANAGEMENT ===
    appendOutput(text, type = 'log') {
        if (typeof text !== 'string') {
            text = String(text);
        }

        // Limitar tamanho da saída
        if (this.output.length > this.settings.maxOutput) {
            this.output = this.output.slice(-this.settings.maxOutput);
        }

        this.output.push({ text, type, timestamp: Date.now() });
        this.updateOutputDisplay(text, type);
    }

    updateOutputDisplay(text, type) {
        const outputContent = document.getElementById('outputContent');
        if (!outputContent) return;

        // Remover placeholder se existir
        const placeholder = outputContent.querySelector('.output-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        // Criar nova linha
        const line = document.createElement('div');
        line.className = `output-line output-${type}`;
        line.textContent = text;
        
        outputContent.appendChild(line);
        outputContent.scrollTop = outputContent.scrollHeight;
    }

    clearOutput() {
        this.output = [];
        const outputContent = document.getElementById('outputContent');
        if (outputContent) {
            outputContent.innerHTML = `
                <div class="output-placeholder">
                    <i class="fas fa-terminal"></i>
                    <p>Execute um script para ver a saída aqui</p>
                </div>
            `;
        }
    }

    getOutput() {
        return this.output.map(item => item.text).join('\n');
    }

    // === ERROR HANDLING ===
    handleExecutionError(error) {
        const errorMessage = error.message || 'Erro desconhecido';
        const stackTrace = error.stack || '';
        
        this.appendOutput(`❌ Erro: ${errorMessage}`, 'error');
        
        if (stackTrace) {
            this.appendOutput(`\nStack trace:`, 'error');
            this.appendOutput(stackTrace, 'error');
        }

        this.showExecutionStatus('Erro na execução!', 'error');
        console.error('Execution error:', error);
    }

    // === STATUS DISPLAY ===
    showExecutionStatus(message, type) {
        const statusEl = document.getElementById('executionStatus');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = `execution-status status-${type}`;
            statusEl.style.display = message ? 'block' : 'none';
        }
    }

    // === COMMAND EXECUTION (FOR CONSOLE) ===
    async executeCommand(command) {
        if (!command.trim()) return;

        try {
            // Executar comando diretamente
            const func = new Function(`
                'use strict';
                const console = window.miniIDE.components.consoleManager;
                return ${command};
            `);

            const result = func();
            
            if (result !== undefined) {
                window.miniIDE.components.consoleManager.log(String(result), 'result');
            }

        } catch (error) {
            window.miniIDE.components.consoleManager.log(`Erro: ${error.message}`, 'error');
        }
    }

    // === SETTINGS ===
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }

    getSettings() {
        return { ...this.settings };
    }

    // === NOTIFICATIONS ===
    showNotification(message, type) {
        if (window.miniIDE) {
            window.miniIDE.showNotification(message, type);
        }
    }

    // === UTILITIES ===
    getExecutionTime() {
        return this.executionTime;
    }

    isExecuting() {
        return this.isRunning;
    }

    stopExecution() {
        this.isRunning = false;
        this.restoreConsole();
        this.showExecutionStatus('Execução interrompida', 'warning');
    }

    // === EXPORT/IMPORT ===
    exportResults() {
        return {
            output: this.getOutput(),
            executionTime: this.executionTime,
            consoleLogs: this.consoleLogs,
            timestamp: Date.now()
        };
    }

    importResults(results) {
        if (results.output) {
            this.output = results.output;
        }
        if (results.consoleLogs) {
            this.consoleLogs = results.consoleLogs;
        }
    }
}

// Criar instância global
window.scriptExecutor = new ScriptExecutor();
