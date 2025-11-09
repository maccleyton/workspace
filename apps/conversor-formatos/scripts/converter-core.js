/**
 * CONVERSOR DE FORMATOS - CONVERTER CORE
 * Lógica principal para conversões entre diferentes bases numéricas e formatos
 */

class ConverterCore {
    constructor() {
        this.init();
    }

    /**
     * Inicializa o conversor
     */
    init() {
        this.setupEventListeners();
        this.loadSavedTheme();
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Auto-conversão em tempo real para texto
        const textInput = document.getElementById('text-input');
        const textFromBase = document.getElementById('text-from-base');
        const textToBase = document.getElementById('text-to-base');
        const textConvertBtn = document.getElementById('text-convert-btn');

        if (textInput && textFromBase && textToBase) {
            // Auto-conversão ao digitar
            let textConversionTimeout;
            textInput.addEventListener('input', () => {
                clearTimeout(textConversionTimeout);
                textConversionTimeout = setTimeout(() => {
                    this.convertText();
                }, 300);
            });

            // Auto-conversão ao mudar base
            textFromBase.addEventListener('change', () => this.convertText());
            textToBase.addEventListener('change', () => this.convertText());

            // Conversão manual ao clicar no botão
            if (textConvertBtn) {
                textConvertBtn.addEventListener('click', () => this.convertText());
            }
        }

        // Auto-conversão em tempo real para números
        const numberInput = document.getElementById('number-input');
        const numberFromBase = document.getElementById('number-from-base');
        const numberToBase = document.getElementById('number-to-base');
        const numberConvertBtn = document.getElementById('number-convert-btn');

        if (numberInput && numberFromBase && numberToBase) {
            // Auto-conversão ao digitar
            let numberConversionTimeout;
            numberInput.addEventListener('input', () => {
                clearTimeout(numberConversionTimeout);
                numberConversionTimeout = setTimeout(() => {
                    this.convertNumber();
                }, 300);
            });

            // Auto-conversão ao mudar base
            numberFromBase.addEventListener('change', () => this.convertNumber());
            numberToBase.addEventListener('change', () => this.convertNumber());

            // Conversão manual ao clicar no botão
            if (numberConvertBtn) {
                numberConvertBtn.addEventListener('click', () => this.convertNumber());
            }
        }

        // Botões de copiar
        const textCopyBtn = document.getElementById('text-copy-btn');
        const numberCopyBtn = document.getElementById('number-copy-btn');

        if (textCopyBtn) {
            textCopyBtn.addEventListener('click', () => this.copyToClipboard('text'));
        }

        if (numberCopyBtn) {
            numberCopyBtn.addEventListener('click', () => this.copyToClipboard('number'));
        }

        // Ações rápidas
        this.setupQuickActions();
    }

    /**
     * Configura ações rápidas
     */
    setupQuickActions() {
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleQuickAction(btn);
            });
        });
    }

    /**
     * Processa ações rápidas
     */
    handleQuickAction(btn) {
        const textData = btn.getAttribute('data-text');
        const numberData = btn.getAttribute('data-number');
        const fromBase = btn.getAttribute('data-from') || 'text';
        const toBase = btn.getAttribute('data-to') || 'binary';
        const clearAll = btn.getAttribute('data-clear');

        if (clearAll) {
            this.clearAll();
            return;
        }

        // Ativa a aba correta
        if (textData) {
            this.switchTab('text');
            const textInput = document.getElementById('text-input');
            const textFromBase = document.getElementById('text-from-base');
            const textToBase = document.getElementById('text-to-base');

            if (textInput && textFromBase && textToBase) {
                textInput.value = textData;
                textFromBase.value = fromBase;
                textToBase.value = toBase;
                setTimeout(() => this.convertText(), 100);
            }
        } else if (numberData) {
            this.switchTab('number');
            const numberInput = document.getElementById('number-input');
            const numberFromBase = document.getElementById('number-from-base');
            const numberToBase = document.getElementById('number-to-base');

            if (numberInput && numberFromBase && numberToBase) {
                numberInput.value = numberData;
                numberFromBase.value = fromBase;
                numberToBase.value = toBase;
                setTimeout(() => this.convertNumber(), 100);
            }
        }
    }

    /**
     * Alterna entre abas
     */
    switchTab(tabName) {
        // Remove classe active de todas as abas
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Remove classe active de todos os conteúdos
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Ativa a aba correta
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}-converter`);

        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
    }

    /**
     * Converte texto entre diferentes formatos
     */
    convertText() {
        const input = document.getElementById('text-input');
        const output = document.getElementById('text-output');
        const fromBase = document.getElementById('text-from-base').value;
        const toBase = document.getElementById('text-to-base').value;

        if (!input || !output) return;

        const inputValue = input.value.trim();

        if (!inputValue) {
            output.value = '';
            this.clearValidationStyles(input);
            return;
        }

        try {
            this.showLoading(true);
            
            let result = '';
            
            // Converte da base de origem para texto primeiro
            let text = inputValue;
            if (fromBase !== 'text') {
                text = this.decodeFromBase(inputValue, fromBase);
            }

            // Converte do texto para a base de destino
            if (toBase === 'text') {
                result = text;
            } else {
                result = this.encodeToBase(text, toBase);
            }

            output.value = result;
            this.setValidStyle(input);
            
        } catch (error) {
            console.error('Erro na conversão de texto:', error);
            output.value = `Erro: ${error.message}`;
            this.setInvalidStyle(input);
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Converte números entre diferentes bases
     */
    convertNumber() {
        const input = document.getElementById('number-input');
        const output = document.getElementById('number-output');
        const fromBase = document.getElementById('number-from-base').value;
        const toBase = document.getElementById('number-to-base').value;

        if (!input || !output) {
            console.error('Elementos de entrada/saída não encontrados');
            return;
        }

        const inputValue = input.value.trim();

        if (!inputValue) {
            output.value = '';
            this.clearValidationStyles(input);
            return;
        }

        try {
            console.log('Convertendo número:', inputValue, 'de', fromBase, 'para', toBase);
            this.showLoading(true);
            
            // Valida entrada
            if (!this.validateNumberInput(inputValue, fromBase)) {
                throw new Error(`Número inválido para base ${fromBase.toUpperCase()}`);
            }

            // Converte para decimal primeiro
            const decimalValue = this.parseNumber(inputValue, fromBase);
            console.log('Valor decimal:', decimalValue);

            // Converte de decimal para base de destino
            let result = '';
            switch (toBase) {
                case 'decimal':
                    result = decimalValue.toString();
                    break;
                case 'binary':
                    result = decimalValue.toString(2);
                    break;
                case 'hex':
                    result = decimalValue.toString(16).toUpperCase();
                    break;
                case 'octal':
                    result = decimalValue.toString(8);
                    break;
                default:
                    throw new Error(`Base não suportada: ${toBase}`);
            }

            console.log('Resultado:', result);
            output.value = result;
            this.setValidStyle(input);
            
        } catch (error) {
            console.error('Erro na conversão de número:', error);
            output.value = `Erro: ${error.message}`;
            this.setInvalidStyle(input);
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * Decodifica string da base especificada para texto
     */
    decodeFromBase(str, fromBase) {
        switch (fromBase) {
            case 'binary':
                return this.binaryToText(str);
            case 'hex':
                return this.hexToText(str);
            case 'octal':
                return this.octalToText(str);
            case 'text':
                return str;
            default:
                throw new Error(`Base não suportada: ${fromBase}`);
        }
    }

    /**
     * Codifica texto para a base especificada
     */
    encodeToBase(text, toBase) {
        switch (toBase) {
            case 'binary':
                return this.textToBinary(text);
            case 'hex':
                return this.textToHex(text);
            case 'octal':
                return this.textToOctal(text);
            case 'text':
                return text;
            default:
                throw new Error(`Base não suportada: ${toBase}`);
        }
    }

    /**
     * Converte texto para binário
     */
    textToBinary(text) {
        return Array.from(text)
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join(' ');
    }

    /**
     * Converte binário para texto
     */
    binaryToText(binary) {
        const binaryArray = binary.trim().split(/\s+/);
        return binaryArray
            .map(bin => String.fromCharCode(parseInt(bin, 2)))
            .join('');
    }

    /**
     * Converte texto para hexadecimal
     */
    textToHex(text) {
        return Array.from(text)
            .map(char => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'))
            .join(' ');
    }

    /**
     * Converte hexadecimal para texto
     */
    hexToText(hex) {
        const hexArray = hex.trim().split(/\s+/);
        return hexArray
            .map(hex => String.fromCharCode(parseInt(hex, 16)))
            .join('');
    }

    /**
     * Converte texto para octal
     */
    textToOctal(text) {
        return Array.from(text)
            .map(char => char.charCodeAt(0).toString(8).padStart(3, '0'))
            .join(' ');
    }

    /**
     * Converte octal para texto
     */
    octalToText(octal) {
        const octalArray = octal.trim().split(/\s+/);
        return octalArray
            .map(oct => String.fromCharCode(parseInt(oct, 8)))
            .join('');
    }

    /**
     * Valida entrada de número
     */
    validateNumberInput(value, base) {
        const patterns = {
            decimal: /^-?\d+$/,
            binary: /^[01]+$/,
            hex: /^[0-9A-Fa-f]+$/,
            octal: /^[0-7]+$/
        };

        const pattern = patterns[base];
        if (!pattern) return false;

        const isValid = pattern.test(value);
        console.log('Validating', value, 'for base', base, ':', isValid);
        return isValid;
    }

    /**
     * Parsea número da base especificada para decimal
     */
    parseNumber(value, fromBase) {
        console.log('Parsing number:', value, 'from base:', fromBase);
        const decimalValue = parseInt(value, fromBase);
        
        if (isNaN(decimalValue)) {
            const error = `Não foi possível converter "${value}" da base ${fromBase.toUpperCase()}`;
            console.error(error);
            throw new Error(error);
        }

        console.log('Parsed decimal value:', decimalValue);
        return decimalValue;
    }

    /**
     * Define estilo válido
     */
    setValidStyle(element) {
        this.clearValidationStyles(element);
        element.classList.add('input-valid');
    }

    /**
     * Define estilo inválido
     */
    setInvalidStyle(element) {
        this.clearValidationStyles(element);
        element.classList.add('input-invalid');
    }

    /**
     * Remove estilos de validação
     */
    clearValidationStyles(element) {
        element.classList.remove('input-valid', 'input-invalid', 'input-warning');
    }

    /**
     * Mostra/oculta loading
     */
    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            if (show) {
                overlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }
        }
    }

    /**
     * Copia conteúdo para clipboard
     */
    async copyToClipboard(type) {
        const output = document.getElementById(`${type}-output`);
        if (!output || !output.value) return;

        try {
            await navigator.clipboard.writeText(output.value);
            this.showToast('Copiado para a área de transferência!', 'success');
        } catch (error) {
            // Fallback para browsers mais antigos
            output.select();
            document.execCommand('copy');
            this.showToast('Copiado para a área de transferência!', 'success');
        }
    }

    /**
     * Mostra toast de notificação
     */
    showToast(message, type = 'info') {
        // Remove toast existente
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Cria novo toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">${message}</span>
            </div>
        `;

        // Adiciona estilos inline
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-surface);
            color: var(--color-text-primary);
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid var(--color-border-primary);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        // Adiciona ao DOM
        document.body.appendChild(toast);

        // Remove após 3 segundos
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    /**
     * Limpa todos os campos
     */
    clearAll() {
        const textInput = document.getElementById('text-input');
        const textOutput = document.getElementById('text-output');
        const numberInput = document.getElementById('number-input');
        const numberOutput = document.getElementById('number-output');

        if (textInput) textInput.value = '';
        if (textOutput) textOutput.value = '';
        if (numberInput) numberInput.value = '';
        if (numberOutput) numberOutput.value = '';

        // Remove estilos de validação
        [textInput, textOutput, numberInput, numberOutput].forEach(element => {
            if (element) this.clearValidationStyles(element);
        });

        this.showToast('Todos os campos foram limpos', 'info');
    }

    /**
     * Carrega tema salvo
     */
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('converter-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }
}

// Inicializa o conversor quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.converterCore = new ConverterCore();
});

// Adiciona animações CSS para toasts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);