// ===== CONSOLE MANAGER =====

class ConsoleManager {
    constructor() {
        this.isRedirected = false;
        this.consoleLogs = [];
        this.maxLogs = 1000;
        this.settings = {
            maxLogs: 1000,
            showTimestamp: true,
            showIcons: true,
            autoScroll: true
        };
        
        this.originalConsole = {};
        this.initialized = false;
        
        this.init();
    }

    init() {
        console.log('💬 Inicializando Console Manager...');
        
        this.setupEventListeners();
        this.loadSettings();
        this.renderConsole();
        
        this.initialized = true;
        console.log('✅ Console Manager inicializado');
    }

    setupEventListeners() {
        // Console input
        const consoleInput = document.getElementById('consoleInput');
        const runConsoleBtn = document.getElementById('runConsoleBtn');
        
        if (consoleInput) {
            consoleInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.executeCommand();
                }
            });
        }
        
        if (runConsoleBtn) {
            runConsoleBtn.addEventListener('click', () => {
                this.executeCommand();
            });
        }
    }

    loadSettings() {
        if (window.miniIDE && window.miniIDE.components.settingsManager) {
            const consoleSettings = window.miniIDE.components.settingsManager.get('console', {});
            this.settings = { ...this.settings, ...consoleSettings };
        }
    }

    // === CONSOLE REDIRECTION ===
    enableRedirection() {
        if (this.isRedirected) return;
        
        // Salvar console original
        this.originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info,
            debug: console.debug
        };
        
        // Redirecionar para nossa implementação
        console.log = (...args) => this.log(args.join(' '), 'log');
        console.error = (...args) => this.log(args.join(' '), 'error');
        console.warn = (...args) => this.log(args.join(' '), 'warning');
        console.info = (...args) => this.log(args.join(' '), 'info');
        console.debug = (...args) => this.log(args.join(' '), 'debug');
        
        this.isRedirected = true;
    }

    disableRedirection() {
        if (!this.isRedirected) return;
        
        // Restaurar console original
        console.log = this.originalConsole.log;
        console.error = this.originalConsole.error;
        console.warn = this.originalConsole.warn;
        console.info = this.originalConsole.info;
        console.debug = this.originalConsole.debug;
        
        this.isRedirected = false;
    }

    // === CONSOLE OPERATIONS ===
    log(message, type = 'log') {
        const logEntry = {
            message: this.formatMessage(message),
            type: type,
            timestamp: Date.now(),
            formatted: this.formatLogEntry(message, type)
        };
        
        this.addLogEntry(logEntry);
    }

    logObject(obj, type = 'log') {
        const message = this.objectToString(obj);
        this.log(message, type);
    }

    error(message, error = null) {
        const formattedMessage = error ? 
            `${message}\n${error.stack || error.message}` : 
            message;
        this.log(formattedMessage, 'error');
    }

    warn(message) {
        this.log(message, 'warning');
    }

    info(message) {
        this.log(message, 'info');
    }

    debug(message) {
        this.log(message, 'debug');
    }

    clear() {
        this.consoleLogs = [];
        this.renderConsole();
    }

    // === COMMAND EXECUTION ===
    executeCommand() {
        const input = document.getElementById('consoleInput');
        if (!input) return;
        
        const command = input.value.trim();
        if (!command) return;
        
        // Mostrar comando digitado
        this.log(`> ${command}`, 'input');
        
        // Executar comando
        try {
            // Eval seguro
            const result = this.safeEval(command);
            
            if (result !== undefined) {
                this.log(result, 'result');
            }
        } catch (error) {
            this.error('Comando falhou', error);
        }
        
        // Limpar input
        input.value = '';
        input.focus();
    }

    safeEval(expression) {
        // Criar função segura para eval
        const func = new Function(`
            'use strict';
            try {
                const result = eval(${JSON.stringify(expression)});
                return result;
            } catch (error) {
                throw new Error('Erro na expressão: ' + error.message);
            }
        `);
        
        return func();
    }

    // === LOG ENTRY MANAGEMENT ===
    addLogEntry(entry) {
        // Adicionar ao array
        this.consoleLogs.push(entry);
        
        // Manter apenas os últimos N logs
        if (this.consoleLogs.length > this.maxLogs) {
            this.consoleLogs = this.consoleLogs.slice(-this.maxLogs);
        }
        
        // Renderizar
        this.appendLogToDisplay(entry);
    }

    appendLogToDisplay(entry) {
        const consoleOutput = document.getElementById('consoleOutput');
        if (!consoleOutput) return;
        
        const line = document.createElement('div');
        line.className = `console-line console-${entry.type}`;
        line.innerHTML = this.formatLogForDisplay(entry);
        
        consoleOutput.appendChild(line);
        
        // Auto-scroll se ativado
        if (this.settings.autoScroll) {
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
    }

    formatLogForDisplay(entry) {
        let content = '';
        
        // Ícone se ativado
        if (this.settings.showIcons) {
            const icon = this.getIconForType(entry.type);
            content += `<i class="fas ${icon}"></i> `;
        }
        
        // Timestamp se ativado
        if (this.settings.showTimestamp) {
            const time = new Date(entry.timestamp).toLocaleTimeString();
            content += `<span class="console-time">[${time}]</span> `;
        }
        
        // Mensagem
        content += `<span class="console-message">${this.escapeHtml(entry.message)}</span>`;
        
        return content;
    }

    getIconForType(type) {
        const icons = {
            log: 'fa-terminal',
            error: 'fa-exclamation-triangle',
            warning: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            debug: 'fa-bug',
            input: 'fa-chevron-right',
            result: 'fa-check'
        };
        
        return icons[type] || 'fa-terminal';
    }

    // === FORMATTING ===
    formatMessage(message) {
        if (typeof message === 'object') {
            return this.objectToString(message);
        }
        return String(message);
    }

    formatLogEntry(message, type) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] ${type.toUpperCase()}: ${message}`;
    }

    objectToString(obj) {
        try {
            if (obj === null) return 'null';
            if (obj === undefined) return 'undefined';
            
            if (typeof obj === 'object') {
                if (Array.isArray(obj)) {
                    return '[' + obj.map(item => this.objectToString(item)).join(', ') + ']';
                }
                
                if (obj instanceof Error) {
                    return `${obj.name}: ${obj.message}\n${obj.stack}`;
                }
                
                return JSON.stringify(obj, null, 2);
            }
            
            return String(obj);
        } catch (error) {
            return '[Objeto não serializável]';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // === CONSOLE RENDERING ===
    renderConsole() {
        const consoleOutput = document.getElementById('consoleOutput');
        if (!consoleOutput) return;
        
        consoleOutput.innerHTML = '';
        
        // Renderizar todos os logs
        this.consoleLogs.forEach(entry => {
            const line = document.createElement('div');
            line.className = `console-line console-${entry.type}`;
            line.innerHTML = this.formatLogForDisplay(entry);
            consoleOutput.appendChild(line);
        });
        
        // Auto-scroll para o final
        if (this.settings.autoScroll) {
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
    }

    // === SEARCH ===
    searchLogs(query) {
        if (!query.trim()) {
            this.showAllLogs();
            return;
        }
        
        const searchTerm = query.toLowerCase();
        const consoleOutput = document.getElementById('consoleOutput');
        if (!consoleOutput) return;
        
        const lines = consoleOutput.querySelectorAll('.console-line');
        lines.forEach(line => {
            const text = line.textContent.toLowerCase();
            line.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    }

    showAllLogs() {
        const consoleOutput = document.getElementById('consoleOutput');
        if (!consoleOutput) return;
        
        const lines = consoleOutput.querySelectorAll('.console-line');
        lines.forEach(line => {
            line.style.display = 'block';
        });
    }

    // === FILTERING ===
    filterByType(type) {
        const consoleOutput = document.getElementById('consoleOutput');
        if (!consoleOutput) return;
        
        const lines = consoleOutput.querySelectorAll('.console-line');
        lines.forEach(line => {
            if (type === 'all' || line.classList.contains(`console-${type}`)) {
                line.style.display = 'block';
            } else {
                line.style.display = 'none';
            }
        });
    }

    // === EXPORT ===
    exportLogs(format = 'text') {
        const logs = this.consoleLogs.map(entry => {
            if (format === 'json') {
                return JSON.stringify(entry, null, 2);
            }
            return entry.formatted;
        }).join('\n');
        
        const blob = new Blob([logs], { 
            type: format === 'json' ? 'application/json' : 'text/plain' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `console-logs-${new Date().toISOString().split('T')[0]}.${format}`;
        a.click();
        URL.revokeObjectURL(url);
        
        if (window.miniIDE) {
            window.miniIDE.showNotification(`Console exportado como ${format.toUpperCase()}!`, 'success');
        }
    }

    // === HISTORY ===
    getCommandHistory() {
        return this.consoleLogs
            .filter(entry => entry.type === 'input')
            .map(entry => entry.message.replace('> ', ''));
    }

    navigateHistory(direction) {
        // Implementar navegação no histórico de comandos
        console.log('Navigate history:', direction);
    }

    // === SETTINGS ===
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.renderConsole();
    }

    getSettings() {
        return { ...this.settings };
    }

    // === STATISTICS ===
    getStats() {
        const stats = {
            total: this.consoleLogs.length,
            byType: {},
            oldest: null,
            newest: null
        };
        
        this.consoleLogs.forEach(entry => {
            // Contar por tipo
            stats.byType[entry.type] = (stats.byType[entry.type] || 0) + 1;
            
            // Timestamps
            if (!stats.oldest || entry.timestamp < stats.oldest) {
                stats.oldest = entry.timestamp;
            }
            if (!stats.newest || entry.timestamp > stats.newest) {
                stats.newest = entry.timestamp;
            }
        });
        
        return stats;
    }

    // === UTILITIES ===
    isEmpty() {
        return this.consoleLogs.length === 0;
    }

    getLastLog() {
        return this.consoleLogs[this.consoleLogs.length - 1] || null;
    }

    getLogsByType(type) {
        return this.consoleLogs.filter(entry => entry.type === type);
    }

    // === INTEGRATION WITH EXECUTOR ===
    redirectFromExecutor() {
        this.enableRedirection();
    }

    restoreToExecutor() {
        this.disableRedirection();
    }

    // === COPY/PASTE ===
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            if (window.miniIDE) {
                window.miniIDE.showNotification('Texto copiado para a área de transferência!', 'success');
            }
        }).catch(err => {
            console.error('Falha ao copiar:', err);
        });
    }

    copyAllLogs() {
        const allLogs = this.consoleLogs.map(entry => entry.formatted).join('\n');
        this.copyToClipboard(allLogs);
    }

    // === AUTO-COMPLETE ===
    getAutoCompleteSuggestions(input) {
        // Sugestões baseadas no contexto
        const suggestions = [
            'console.log(',
            'console.error(',
            'console.warn(',
            'console.info(',
            'console.debug(',
            'window.',
            'document.',
            'Math.',
            'Date.',
            'Array.',
            'Object.'
        ];
        
        return suggestions.filter(suggestion => 
            suggestion.toLowerCase().startsWith(input.toLowerCase())
        );
    }

    // === PERFORMANCE ===
    clearOldLogs(maxAge = 24 * 60 * 60 * 1000) { // 24 horas
        const cutoff = Date.now() - maxAge;
        this.consoleLogs = this.consoleLogs.filter(entry => entry.timestamp > cutoff);
        this.renderConsole();
    }

    // === CLEANUP ===
    clearAll() {
        this.consoleLogs = [];
        this.renderConsole();
        
        if (window.miniIDE) {
            window.miniIDE.showNotification('Console limpo!', 'success');
        }
    }

    destroy() {
        this.disableRedirection();
        this.consoleLogs = [];
        console.log('🧹 Console Manager destruído');
    }
}

// Criar instância global
window.consoleManager = new ConsoleManager();
