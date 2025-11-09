/**
 * CONVERSOR DE FORMATOS - TEXT CONVERTER
 * Funcionalidades específicas para conversão de texto
 */

class TextConverter {
    constructor() {
        this.init();
    }

    /**
     * Inicializa o conversor de texto
     */
    init() {
        this.setupTextEventListeners();
        this.setupTextValidation();
        this.loadTextPreferences();
    }

    /**
     * Configura event listeners específicos do texto
     */
    setupTextEventListeners() {
        const textInput = document.getElementById('text-input');
        const textFromBase = document.getElementById('text-from-base');
        const textToBase = document.getElementById('text-to-base');

        if (textInput) {
            // Auto-resize do textarea
            textInput.addEventListener('input', () => {
                this.autoResizeTextarea(textInput);
                this.updateCharCount(textInput);
            });

            // Suporte a colar com transformação
            textInput.addEventListener('paste', (e) => {
                setTimeout(() => {
                    this.sanitizeTextInput(textInput);
                }, 10);
            });

            // Detecta mudanças significativas
            let lastValue = '';
            textInput.addEventListener('input', () => {
                const currentValue = textInput.value;
                if (currentValue.length !== lastValue.length) {
                    this.analyzeTextComplexity(currentValue);
                }
                lastValue = currentValue;
            });
        }

        if (textFromBase && textToBase) {
            // Troca automática de base
            textFromBase.addEventListener('change', () => {
                this.handleBaseChange('from', textFromBase.value, textToBase.value);
            });

            textToBase.addEventListener('change', () => {
                this.handleBaseChange('to', textFromBase.value, textToBase.value);
            });
        }
    }

    /**
     * Configura validação de texto
     */
    setupTextValidation() {
        const textInput = document.getElementById('text-input');
        if (!textInput) return;

        // Validação em tempo real
        textInput.addEventListener('blur', () => {
            this.validateTextInput(textInput);
        });

        // Dicas contextuais
        textInput.addEventListener('focus', () => {
            this.showTextTips(textInput);
        });
    }

    /**
     * Auto-resize do textarea
     */
    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(100, textarea.scrollHeight) + 'px';
    }

    /**
     * Atualiza contador de caracteres
     */
    updateCharCount(textarea) {
        const charCount = textarea.value.length;
        const maxLength = textarea.getAttribute('maxlength');
        
        let countText = `${charCount} caracteres`;
        if (maxLength) {
            countText += ` / ${maxLength}`;
        }

        // Atualiza ou cria contador
        let counter = textarea.parentNode.querySelector('.char-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'char-counter';
            textarea.parentNode.appendChild(counter);
        }
        
        counter.textContent = countText;
        counter.className = `char-counter ${charCount > 0 ? 'has-text' : ''}`;
    }

    /**
     * Sanitiza entrada de texto
     */
    sanitizeTextInput(textarea) {
        const fromBase = document.getElementById('text-from-base').value;
        let value = textarea.value;

        switch (fromBase) {
            case 'binary':
                // Remove tudo que não seja 0 ou 1
                value = value.replace(/[^01]/g, ' ').trim();
                // Remove múltiplos espaços
                value = value.replace(/\s+/g, ' ');
                break;
            case 'hex':
                // Remove tudo que não seja hex válido
                value = value.replace(/[^0-9A-Fa-f]/g, ' ').trim();
                // Remove múltiplos espaços
                value = value.replace(/\s+/g, ' ');
                break;
            case 'octal':
                // Remove tudo que não seja octal válido
                value = value.replace(/[^0-7]/g, ' ').trim();
                // Remove múltiplos espaços
                value = value.replace(/\s+/g, ' ');
                break;
        }

        textarea.value = value;
    }

    /**
     * Analisa complexidade do texto
     */
    analyzeTextComplexity(text) {
        if (!text.trim()) return;

        const complexity = this.calculateTextComplexity(text);
        this.updateComplexityIndicator(complexity);
    }

    /**
     * Calcula complexidade do texto
     */
    calculateTextComplexity(text) {
        const length = text.length;
        const uniqueChars = new Set(text).size;
        const hasSpaces = text.includes(' ');
        const hasNumbers = /\d/.test(text);
        const hasSpecial = /[^a-zA-Z0-9\s]/.test(text);
        
        // Pontuação de complexidade
        let score = 0;
        score += Math.min(length / 10, 10); // Comprimento
        score += Math.min(uniqueChars / 5, 5); // Diversidade
        score += hasSpaces ? 2 : 0;
        score += hasNumbers ? 3 : 0;
        score += hasSpecial ? 5 : 0;
        
        return Math.min(score, 20); // Máximo 20
    }

    /**
     * Atualiza indicador de complexidade
     */
    updateComplexityIndicator(score) {
        const textInput = document.getElementById('text-input');
        if (!textInput) return;

        const complexityLevel = score > 15 ? 'high' : score > 8 ? 'medium' : 'low';
        const textInputContainer = textInput.parentNode;
        
        // Remove indicador anterior
        const existingIndicator = textInputContainer.querySelector('.complexity-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        // Cria novo indicador
        const indicator = document.createElement('div');
        indicator.className = `complexity-indicator complexity-${complexityLevel}`;
        indicator.innerHTML = `
            <div class="complexity-bar">
                <div class="complexity-fill" style="width: ${(score / 20) * 100}%"></div>
            </div>
            <span class="complexity-text">${this.getComplexityLabel(complexityLevel)}</span>
        `;

        textInputContainer.appendChild(indicator);
    }

    /**
     * Retorna label de complexidade
     */
    getComplexityLabel(level) {
        const labels = {
            low: 'Simples',
            medium: 'Médio',
            high: 'Complexo'
        };
        return labels[level] || 'Simples';
    }

    /**
     * Valida entrada de texto
     */
    validateTextInput(textarea) {
        const value = textarea.value.trim();
        const fromBase = document.getElementById('text-from-base').value;

        if (!value) {
            this.setValidationState(textarea, 'clear');
            return true;
        }

        try {
            switch (fromBase) {
                case 'binary':
                    this.validateBinary(value);
                    break;
                case 'hex':
                    this.validateHex(value);
                    break;
                case 'octal':
                    this.validateOctal(value);
                    break;
                case 'text':
                    this.validateText(value);
                    break;
            }
            this.setValidationState(textarea, 'valid');
            return true;
        } catch (error) {
            this.setValidationState(textarea, 'invalid', error.message);
            return false;
        }
    }

    /**
     * Valida string binária
     */
    validateBinary(str) {
        const binaryPattern = /^[01]+(\s+[01]+)*$/;
        if (!binaryPattern.test(str.trim())) {
            throw new Error('String binária deve conter apenas 0s e 1s, separados por espaços');
        }
    }

    /**
     * Valida string hexadecimal
     */
    validateHex(str) {
        const hexPattern = /^[0-9A-Fa-f]+(\s+[0-9A-Fa-f]+)*$/;
        if (!hexPattern.test(str.trim())) {
            throw new Error('String hexadecimal deve conter apenas caracteres 0-9, A-F, separados por espaços');
        }
    }

    /**
     * Valida string octal
     */
    validateOctal(str) {
        const octalPattern = /^[0-7]+(\s+[0-7]+)*$/;
        if (!octalPattern.test(str.trim())) {
            throw new Error('String octal deve conter apenas caracteres 0-7, separados por espaços');
        }
    }

    /**
     * Valida texto
     */
    validateText(str) {
        if (str.length > 10000) {
            throw new Error('Texto muito longo. Máximo de 10.000 caracteres permitido');
        }
    }

    /**
     * Define estado de validação
     */
    setValidationState(element, state, message = '') {
        element.classList.remove('input-valid', 'input-invalid', 'input-warning');
        
        switch (state) {
            case 'valid':
                element.classList.add('input-valid');
                break;
            case 'invalid':
                element.classList.add('input-invalid');
                this.showValidationMessage(element, message, 'error');
                break;
            case 'warning':
                element.classList.add('input-warning');
                this.showValidationMessage(element, message, 'warning');
                break;
            case 'clear':
                // Remove mensagens
                const existingMessage = element.parentNode.querySelector('.validation-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                break;
        }
    }

    /**
     * Mostra mensagem de validação
     */
    showValidationMessage(element, message, type) {
        // Remove mensagem anterior
        const existingMessage = element.parentNode.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Cria nova mensagem
        const messageEl = document.createElement('div');
        messageEl.className = `validation-message validation-${type}`;
        messageEl.textContent = message;
        
        // Posiciona após o elemento
        element.parentNode.appendChild(messageEl);
    }

    /**
     * Mostra dicas contextuais
     */
    showTextTips(textarea) {
        const fromBase = document.getElementById('text-from-base').value;
        let tips = [];

        switch (fromBase) {
            case 'binary':
                tips = [
                    'Use espaços para separar bytes',
                    'Exemplo: 01001000 01100101 01101100 01101100 01101111',
                    'Cada grupo de 8 bits = 1 caractere'
                ];
                break;
            case 'hex':
                tips = [
                    'Use espaços para separar bytes',
                    'Exemplo: 48 65 6C 6C 6F',
                    'Case insensitive (a-f ou A-F)'
                ];
                break;
            case 'octal':
                tips = [
                    'Use espaços para separar bytes',
                    'Exemplo: 110 145 154 154 157',
                    'Apenas dígitos 0-7 são válidos'
                ];
                break;
            case 'text':
                tips = [
                    'Digite qualquer texto aqui',
                    'Suporta caracteres especiais',
                    'Suporte a Unicode completo'
                ];
                break;
        }

        this.showTipsModal(tips, fromBase);
    }

    /**
     * Mostra modal de dicas
     */
    showTipsModal(tips, context) {
        // Remove modal anterior
        const existingModal = document.querySelector('.tips-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'tips-modal';
        modal.innerHTML = `
            <div class="tips-content">
                <div class="tips-header">
                    <h3>Dicas - ${context.toUpperCase()}</h3>
                    <button class="tips-close">&times;</button>
                </div>
                <div class="tips-body">
                    <ul class="tips-list">
                        ${tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        // Adiciona estilos
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const content = modal.querySelector('.tips-content');
        content.style.cssText = `
            background: var(--color-surface);
            border: 1px solid var(--color-border-primary);
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(modal);

        // Anima entrada
        setTimeout(() => {
            modal.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 10);

        // Event listeners
        modal.querySelector('.tips-close').addEventListener('click', () => {
            modal.style.opacity = '0';
            content.style.transform = 'scale(0.9)';
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.querySelector('.tips-close').click();
            }
        });

        // Auto-fechar após 10 segundos
        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.querySelector('.tips-close').click();
            }
        }, 10000);
    }

    /**
     * Processa mudança de base
     */
    handleBaseChange(changed, newValue, otherValue) {
        if (changed === 'from' && newValue === 'text') {
            // Se mudou para texto, sugere mudança para formato também
            if (otherValue !== 'text') {
                setTimeout(() => {
                    this.suggestBaseChange('to', newValue);
                }, 100);
            }
        }
    }

    /**
     * Sugere mudança de base
     */
    suggestBaseChange(target, suggestedValue) {
        const select = document.getElementById(`text-${target}-base`);
        if (select && !select.querySelector(`option[value="${suggestedValue}"]`)) {
            select.value = suggestedValue;
        }
    }

    /**
     * Carrega preferências de texto
     */
    loadTextPreferences() {
        const preferences = localStorage.getItem('text-converter-preferences');
        if (preferences) {
            try {
                const prefs = JSON.parse(preferences);
                
                // Aplica preferências de visualização
                if (prefs.autoResize) {
                    const textInput = document.getElementById('text-input');
                    if (textInput) {
                        textInput.style.resize = 'none';
                    }
                }
            } catch (error) {
                console.warn('Erro ao carregar preferências de texto:', error);
            }
        }
    }

    /**
     * Salva preferências de texto
     */
    saveTextPreferences() {
        const preferences = {
            autoResize: true,
            showCharCount: true,
            showComplexity: true,
            lastUsed: new Date().toISOString()
        };

        try {
            localStorage.setItem('text-converter-preferences', JSON.stringify(preferences));
        } catch (error) {
            console.warn('Erro ao salvar preferências de texto:', error);
        }
    }

    /**
     * Exporta conversões de texto
     */
    exportTextConversions() {
        const textInput = document.getElementById('text-input');
        const textOutput = document.getElementById('text-output');
        const fromBase = document.getElementById('text-from-base').value;
        const toBase = document.getElementById('text-to-base').value;

        if (!textInput || !textOutput || !textInput.value) {
            return null;
        }

        const data = {
            timestamp: new Date().toISOString(),
            input: textInput.value,
            output: textOutput.value,
            fromBase: fromBase,
            toBase: toBase,
            type: 'text'
        };

        return data;
    }

    /**
     * Importa conversões de texto
     */
    importTextConversions(data) {
        if (!data || data.type !== 'text') return false;

        const textInput = document.getElementById('text-input');
        const textFromBase = document.getElementById('text-from-base');
        const textToBase = document.getElementById('text-to-base');

        if (textInput && textFromBase && textToBase) {
            textInput.value = data.input || '';
            textFromBase.value = data.fromBase || 'text';
            textToBase.value = data.toBase || 'binary';
            return true;
        }

        return false;
    }
}

// Adiciona estilos CSS para componentes de texto
const textConverterStyle = document.createElement('style');
textConverterStyle.textContent = `
    .char-counter {
        font-size: 12px;
        color: var(--color-text-tertiary);
        text-align: right;
        margin-top: 4px;
        transition: color 0.3s ease;
    }
    
    .char-counter.has-text {
        color: var(--color-text-secondary);
    }
    
    .complexity-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
        padding: 8px;
        background: var(--color-surface-elevated);
        border-radius: 6px;
        font-size: 12px;
    }
    
    .complexity-bar {
        flex: 1;
        height: 4px;
        background: var(--color-border-primary);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .complexity-fill {
        height: 100%;
        transition: width 0.3s ease, background 0.3s ease;
    }
    
    .complexity-low .complexity-fill { background: var(--color-success); }
    .complexity-medium .complexity-fill { background: var(--color-warning); }
    .complexity-high .complexity-fill { background: var(--color-error); }
    
    .complexity-text {
        font-weight: 500;
        min-width: 60px;
        text-align: right;
    }
    
    .validation-message {
        font-size: 12px;
        margin-top: 4px;
        padding: 4px 8px;
        border-radius: 4px;
    }
    
    .validation-error {
        background: var(--color-error-bg);
        color: var(--color-error);
        border: 1px solid var(--color-error-border);
    }
    
    .validation-warning {
        background: var(--color-warning-bg);
        color: var(--color-warning);
        border: 1px solid var(--color-warning-border);
    }
    
    .tips-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .tips-list li {
        padding: 8px 0;
        border-bottom: 1px solid var(--color-border-secondary);
        position: relative;
        padding-left: 20px;
    }
    
    .tips-list li:last-child {
        border-bottom: none;
    }
    
    .tips-list li::before {
        content: "→";
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: bold;
    }
    
    .tips-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid var(--color-border-primary);
    }
    
    .tips-header h3 {
        margin: 0;
        font-size: 16px;
        color: var(--color-text-primary);
    }
    
    .tips-close {
        background: none;
        border: none;
        font-size: 20px;
        color: var(--color-text-secondary);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: color 0.2s ease;
    }
    
    .tips-close:hover {
        color: var(--color-text-primary);
        background: var(--color-surface-hover);
    }
    
    .tips-body {
        padding: 16px 20px;
    }
`;
document.head.appendChild(textConverterStyle);