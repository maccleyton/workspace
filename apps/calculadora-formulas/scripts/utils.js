/* ========================================
   FUNÇÕES UTILITÁRIAS
   ======================================== */

// Configurações globais
const CONFIG = {
    STORAGE_KEYS: {
        FAVORITES: 'calculator_favorites',
        HISTORY: 'calculator_history',
        THEME: 'calculator_theme',
        SETTINGS: 'calculator_settings'
    },
    LIMITS: {
        HISTORY_ITEMS: 50,
        FAVORITES_ITEMS: 100
    },
    DEBOUNCE_DELAY: 300,
    TOAST_DURATION: 4000
};

/* ========================================
   GERENCIAMENTO DE ARMAZENAMENTO
   ======================================== */
class StorageManager {
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn('Erro ao ler do localStorage:', error);
            return defaultValue;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn('Erro ao salvar no localStorage:', error);
            return false;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.warn('Erro ao remover do localStorage:', error);
            return false;
        }
    }

    static clear() {
        try {
            Object.values(CONFIG.STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.warn('Erro ao limpar localStorage:', error);
            return false;
        }
    }
}

/* ========================================
   GERENCIAMENTO DE FAVORITAS
   ======================================== */
class FavoritesManager {
    static getAll() {
        return StorageManager.get(CONFIG.STORAGE_KEYS.FAVORITES, []);
    }

    static add(formulaId) {
        const favorites = this.getAll();
        if (!favorites.includes(formulaId)) {
            favorites.unshift(formulaId); // Adiciona no início
            
            // Limita o número de favoritas
            if (favorites.length > CONFIG.LIMITS.FAVORITES_ITEMS) {
                favorites.pop();
            }
            
            StorageManager.set(CONFIG.STORAGE_KEYS.FAVORITES, favorites);
            return true;
        }
        return false;
    }

    static remove(formulaId) {
        const favorites = this.getAll();
        const index = favorites.indexOf(formulaId);
        if (index > -1) {
            favorites.splice(index, 1);
            StorageManager.set(CONFIG.STORAGE_KEYS.FAVORITES, favorites);
            return true;
        }
        return false;
    }

    static toggle(formulaId) {
        const favorites = this.getAll();
        if (favorites.includes(formulaId)) {
            this.remove(formulaId);
            return false;
        } else {
            this.add(formulaId);
            return true;
        }
    }

    static isFavorite(formulaId) {
        return this.getAll().includes(formulaId);
    }
}

/* ========================================
   GERENCIAMENTO DE HISTÓRICO
   ======================================== */
class HistoryManager {
    static getAll() {
        return StorageManager.get(CONFIG.STORAGE_KEYS.HISTORY, []);
    }

    static add(entry) {
        const history = this.getAll();
        const newEntry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...entry
        };
        
        history.unshift(newEntry);
        
        // Limita o número de itens no histórico
        if (history.length > CONFIG.LIMITS.HISTORY_ITEMS) {
            history.pop();
        }
        
        StorageManager.set(CONFIG.STORAGE_KEYS.HISTORY, history);
        return newEntry;
    }

    static clear() {
        StorageManager.set(CONFIG.STORAGE_KEYS.HISTORY, []);
    }

    static getByFormula(formulaId) {
        return this.getAll().filter(entry => entry.formulaId === formulaId);
    }
}

/* ========================================
   GERENCIAMENTO DE TEMAS
   ======================================== */
class ThemeManager {
    static getCurrent() {
        return StorageManager.get(CONFIG.STORAGE_KEYS.THEME, 'dark');
    }

    static set(theme) {
        document.body.setAttribute('data-theme', theme);
        StorageManager.set(CONFIG.STORAGE_KEYS.THEME, theme);
        
        // Atualiza o ícone do botão
        this.updateToggleButton(theme);
    }

    static toggle() {
        const current = this.getCurrent();
        const themes = ['dark', 'light', 'blue', 'green', 'purple', 'orange'];
        const currentIndex = themes.indexOf(current);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        this.set(nextTheme);
        return nextTheme;
    }

    static updateToggleButton(theme) {
        const toggleBtn = document.getElementById('themeToggle');
        if (!toggleBtn) return;
        
        const icon = toggleBtn.querySelector('i');
        const themes = {
            'dark': 'fa-moon',
            'light': 'fa-sun',
            'blue': 'fa-palette',
            'green': 'fa-leaf',
            'purple': 'fa-magic',
            'orange': 'fa-fire'
        };
        
        icon.className = `fas ${themes[theme] || 'fa-palette'}`;
    }

    static init() {
        const theme = this.getCurrent();
        this.set(theme);
        
        // Detecta preferência do sistema
        if (!StorageManager.get(CONFIG.STORAGE_KEYS.THEME)) {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            this.set(prefersLight ? 'light' : 'dark');
        }
    }
}

/* ========================================
   GERENCIAMENTO DE TOASTS
   ======================================== */
class ToastManager {
    static container = null;
    
    static init() {
        this.container = document.getElementById('toastContainer');
    }

    static show(message, type = 'info', title = null, duration = CONFIG.TOAST_DURATION) {
        if (!this.container) {
            console.warn('Toast container não encontrado');
            return;
        }

        const toast = this.createToast(message, type, title);
        this.container.appendChild(toast);

        // Animação de entrada
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto-remove
        setTimeout(() => {
            this.remove(toast);
        }, duration);

        return toast;
    }

    static createToast(message, type, title) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Event listener para fechar manualmente
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.remove(toast));

        return toast;
    }

    static remove(toast) {
        if (toast && toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }

    static success(message, title = null) {
        return this.show(message, 'success', title);
    }

    static error(message, title = null) {
        return this.show(message, 'error', title);
    }

    static warning(message, title = null) {
        return this.show(message, 'warning', title);
    }

    static info(message, title = null) {
        return this.show(message, 'info', title);
    }
}

/* ========================================
   UTILITÁRIOS DOM
   ======================================== */
class DOMUtils {
    static createElement(tag, className = null, textContent = null) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    static clearElement(element) {
        if (element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    }

    static show(element) {
        if (element) element.classList.remove('hidden');
    }

    static hide(element) {
        if (element) element.classList.add('hidden');
    }

    static toggle(element) {
        if (element) element.classList.toggle('hidden');
    }

    static isVisible(element) {
        return element && !element.classList.contains('hidden');
    }

    static debounce(func, delay = CONFIG.DEBOUNCE_DELAY) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    static throttle(func, limit = 100) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

/* ========================================
   UTILITÁRIOS MATEMÁTICOS
   ======================================== */
class MathUtils {
    static formatNumber(number, decimals = 4) {
        if (isNaN(number) || !isFinite(number)) {
            return 'N/A';
        }
        
        // Se for um número muito pequeno ou muito grande, usa notação científica
        if (Math.abs(number) < 0.0001 || Math.abs(number) >= 10000) {
            return number.toExponential(2);
        }
        
        // Arredonda para o número especificado de decimais
        const rounded = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
        
        // Remove zeros desnecessários
        return parseFloat(rounded.toFixed(decimals)).toString();
    }

    static isValidNumber(value) {
        return !isNaN(value) && isFinite(value) && value !== '';
    }

    static parseNumber(value) {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            // Remove espaços e converte vírgula para ponto
            const clean = value.trim().replace(',', '.');
            const number = parseFloat(clean);
            return this.isValidNumber(number) ? number : null;
        }
        return null;
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static round(value, decimals = 2) {
        return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }
}

/* ========================================
   VALIDAÇÃO
   ======================================== */
class Validator {
    static isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isEmpty(value) {
        return !value || value.trim() === '';
    }

    static isNumber(value) {
        return MathUtils.isValidNumber(value);
    }

    static isPositiveNumber(value) {
        const num = MathUtils.parseNumber(value);
        return num !== null && num > 0;
    }

    static isNonNegativeNumber(value) {
        const num = MathUtils.parseNumber(value);
        return num !== null && num >= 0;
    }

    static validateVariable(name, value, constraints = {}) {
        const errors = [];
        
        if (constraints.required && MathUtils.isValidNumber(value) === false) {
            errors.push(`${name} é obrigatório`);
        }
        
        if (constraints.min !== undefined && MathUtils.isValidNumber(value)) {
            const num = MathUtils.parseNumber(value);
            if (num < constraints.min) {
                errors.push(`${name} deve ser maior ou igual a ${constraints.min}`);
            }
        }
        
        if (constraints.max !== undefined && MathUtils.isValidNumber(value)) {
            const num = MathUtils.parseNumber(value);
            if (num > constraints.max) {
                errors.push(`${name} deve ser menor ou igual a ${constraints.max}`);
            }
        }
        
        return errors;
    }
}

/* ========================================
   EXPORTAÇÃO DE DADOS
   ======================================== */
class ExportManager {
    static toJSON(data, filename = 'dados.json') {
        const json = JSON.stringify(data, null, 2);
        this.downloadFile(json, filename, 'application/json');
    }

    static toCSV(data, filename = 'dados.csv') {
        if (!data || data.length === 0) return;
        
        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row => headers.map(header => row[header]).join(','))
        ].join('\n');
        
        this.downloadFile(csv, filename, 'text/csv');
    }

    static toText(text, filename = 'resultado.txt') {
        this.downloadFile(text, filename, 'text/plain');
    }

    static downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Disponibiliza globalmente
window.CalculatorUtils = {
    CONFIG,
    StorageManager,
    FavoritesManager,
    HistoryManager,
    ThemeManager,
    ToastManager,
    DOMUtils,
    MathUtils,
    Validator,
    ExportManager
};