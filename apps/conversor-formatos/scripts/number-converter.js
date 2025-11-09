/**
 * CONVERSOR DE FORMATOS - NUMBER CONVERTER
 * Funcionalidades específicas para conversão de números
 */

class NumberConverter {
    constructor() {
        this.init();
    }

    /**
     * Inicializa o conversor de números
     */
    init() {
        this.setupNumberEventListeners();
        this.setupNumberValidation();
        this.loadNumberPreferences();
        this.setupAdvancedFeatures();
    }

    /**
     * Configura event listeners específicos do número
     */
    setupNumberEventListeners() {
        const numberInput = document.getElementById('number-input');
        const numberFromBase = document.getElementById('number-from-base');
        const numberToBase = document.getElementById('number-to-base');

        if (numberInput) {
            // Formatação automática
            numberInput.addEventListener('input', () => {
                this.formatNumberInput(numberInput);
                this.updateNumberProperties(numberInput);
            });

            // Suporte a colar com formatação
            numberInput.addEventListener('paste', (e) => {
                setTimeout(() => {
                    this.sanitizeNumberInput(numberInput);
                }, 10);
            });

            // Navegação com setas
            numberInput.addEventListener('keydown', (e) => {
                this.handleNumberNavigation(e, numberInput);
            });

            // Eventos de foco
            numberInput.addEventListener('focus', () => {
                this.highlightNumberInput(numberInput);
            });

            numberInput.addEventListener('blur', () => {
                this.unhighlightNumberInput(numberInput);
                this.validateAndFormat(numberInput);
            });
        }

        if (numberFromBase && numberToBase) {
            // Prevenção de conversões circulares
            numberFromBase.addEventListener('change', () => {
                this.handleNumberBaseChange('from', numberFromBase.value, numberToBase.value);
            });

            numberToBase.addEventListener('change', () => {
                this.handleNumberBaseChange('to', numberFromBase.value, numberToBase.value);
            });
        }
    }

    /**
     * Configura validação de números
     */
    setupNumberValidation() {
        const numberInput = document.getElementById('number-input');
        if (!numberInput) return;

        // Validação em tempo real
        numberInput.addEventListener('blur', () => {
            this.validateNumberInput(numberInput);
        });

        // Feedback visual durante digitação
        numberInput.addEventListener('input', () => {
            this.showNumberFeedback(numberInput);
        });
    }

    /**
     * Configura recursos avançados
     */
    setupAdvancedFeatures() {
        this.createNumberKeyboard();
        this.setupCalculationHistory();
        this.createNumberBaseGuide();
    }

    /**
     * Formata entrada de número
     */
    formatNumberInput(input) {
        const fromBase = document.getElementById('number-from-base').value;
        let value = input.value;

        // Remove espaços extras
        value = value.replace(/\s+/g, ' ').trim();

        // Formatação específica por base
        switch (fromBase) {
            case 'binary':
                // Agrupa em grupos de 4 para melhor legibilidade
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                break;
            case 'hex':
                // Agrupa em grupos de 2
                value = value.replace(/([0-9A-Fa-f]{2})(?=[0-9A-Fa-f])/g, '$1 ');
                break;
            case 'octal':
                // Agrupa em grupos de 3
                value = value.replace(/(\d{3})(?=\d)/g, '$1 ');
                break;
        }

        input.value = value;
    }

    /**
     * Sanitiza entrada de número
     */
    sanitizeNumberInput(input) {
        const fromBase = document.getElementById('number-from-base').value;
        let value = input.value;

        switch (fromBase) {
            case 'decimal':
                value = value.replace(/[^\d-]/g, '');
                break;
            case 'binary':
                value = value.replace(/[^01]/g, '');
                break;
            case 'hex':
                value = value.replace(/[^0-9A-Fa-f]/g, '');
                break;
            case 'octal':
                value = value.replace(/[^0-7]/g, '');
                break;
        }

        // Remove espaços
        value = value.replace(/\s/g, '');
        
        input.value = value;
    }

    /**
     * Atualiza propriedades do número
     */
    updateNumberProperties(input) {
        const value = input.value.trim();
        if (!value) {
            this.clearNumberProperties();
            return;
        }

        const fromBase = document.getElementById('number-from-base').value;
        
        try {
            const decimalValue = this.parseToDecimal(value, fromBase);
            this.displayNumberProperties(decimalValue, fromBase);
        } catch (error) {
            this.displayNumberError(error.message);
        }
    }

    /**
     * Exibe propriedades do número
     */
    displayNumberProperties(decimalValue, fromBase) {
        const propertiesContainer = this.getOrCreatePropertiesContainer();
        
        const properties = {
            decimal: decimalValue,
            binary: this.toBase(decimalValue, 2),
            hex: this.toBase(decimalValue, 16).toUpperCase(),
            octal: this.toBase(decimalValue, 8),
            bits: Math.ceil(Math.log2(Math.max(decimalValue, 1))),
            bytes: Math.ceil(Math.ceil(Math.log2(Math.max(decimalValue, 1))) / 8)
        };

        propertiesContainer.innerHTML = `
            <div class="number-properties">
                <h4>Propriedades do Número</h4>
                <div class="properties-grid">
                    ${Object.entries(properties).map(([key, value]) => `
                        <div class="property-item">
                            <span class="property-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <span class="property-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Cria ou retorna container de propriedades
     */
    getOrCreatePropertiesContainer() {
        let container = document.querySelector('.number-properties-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'number-properties-container';
            
            const numberInput = document.getElementById('number-input');
            if (numberInput && numberInput.parentNode) {
                numberInput.parentNode.appendChild(container);
            }
        }
        return container;
    }

    /**
     * Remove propriedades do número
     */
    clearNumberProperties() {
        const container = document.querySelector('.number-properties-container');
        if (container) {
            container.remove();
        }
    }

    /**
     * Exibe erro do número
     */
    displayNumberError(message) {
        const propertiesContainer = this.getOrCreatePropertiesContainer();
        propertiesContainer.innerHTML = `
            <div class="number-error">
                <span class="error-icon">⚠️</span>
                <span class="error-message">${message}</span>
            </div>
        `;
    }

    /**
     * Processa navegação com teclado numérico
     */
    handleNumberNavigation(event, input) {
        const fromBase = document.getElementById('number-from-base').value;
        
        // Teclas numéricas válidas por base
        const validKeys = {
            decimal: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'],
            binary: ['0', '1'],
            hex: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f'],
            octal: ['0', '1', '2', '3', '4', '5', '6', '7']
        };

        const validChars = validKeys[fromBase] || [];
        const key = event.key;

        // Impede teclas inválidas
        if (key.length === 1 && !validChars.includes(key)) {
            event.preventDefault();
            this.showKeyFeedback(input, key, false);
            return;
        }

        // Feedback visual para teclas válidas
        if (key.length === 1 && validChars.includes(key)) {
            this.showKeyFeedback(input, key, true);
        }
    }

    /**
     * Mostra feedback de tecla
     */
    showKeyFeedback(input, key, isValid) {
        const feedback = document.createElement('div');
        feedback.className = `key-feedback ${isValid ? 'valid' : 'invalid'}`;
        feedback.textContent = key;
        feedback.style.cssText = `
            position: absolute;
            top: -30px;
            right: 0;
            background: ${isValid ? 'var(--color-success)' : 'var(--color-error)'};
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            z-index: 1000;
            animation: keyPop 0.5s ease;
        `;

        const container = input.parentNode;
        container.style.position = 'relative';
        container.appendChild(feedback);

        setTimeout(() => feedback.remove(), 500);
    }

    /**
     * Destaca entrada de número
     */
    highlightNumberInput(input) {
        input.classList.add('number-highlighted');
    }

    /**
     * Remove destaque da entrada
     */
    unhighlightNumberInput(input) {
        input.classList.remove('number-highlighted');
    }

    /**
     * Valida e formata número
     */
    validateAndFormat(input) {
        const fromBase = document.getElementById('number-from-base').value;
        const value = input.value.trim();

        if (!value) return;

        try {
            const decimalValue = this.parseToDecimal(value, fromBase);
            const formattedValue = this.toBase(decimalValue, this.getBaseNumber(fromBase));
            
            if (formattedValue !== value) {
                input.value = formattedValue;
            }
            
            this.setValidationState(input, 'valid');
        } catch (error) {
            this.setValidationState(input, 'invalid', error.message);
        }
    }

    /**
     * Valida entrada de número
     */
    validateNumberInput(input) {
        const fromBase = document.getElementById('number-from-base').value;
        const value = input.value.trim();

        if (!value) {
            this.setValidationState(input, 'clear');
            return true;
        }

        try {
            this.parseToDecimal(value, fromBase);
            this.setValidationState(input, 'valid');
            return true;
        } catch (error) {
            this.setValidationState(input, 'invalid', error.message);
            return false;
        }
    }

    /**
     * Converte valor para decimal
     */
    parseToDecimal(value, fromBase) {
        const baseNumber = this.getBaseNumber(fromBase);
        const decimalValue = parseInt(value, baseNumber);
        
        if (isNaN(decimalValue)) {
            throw new Error(`Número inválido para base ${fromBase.toUpperCase()}`);
        }
        
        return decimalValue;
    }

    /**
     * Converte decimal para base especificada
     */
    toBase(decimalValue, base) {
        if (base === 10) return decimalValue.toString();
        return decimalValue.toString(base).toUpperCase();
    }

    /**
     * Retorna número da base
     */
    getBaseNumber(baseName) {
        const baseMap = {
            decimal: 10,
            binary: 2,
            hex: 16,
            octal: 8
        };
        return baseMap[baseName] || 10;
    }

    /**
     * Processa mudança de base numérica
     */
    handleNumberBaseChange(changed, newValue, otherValue) {
        // Previne conversão de decimal para decimal
        if (changed === 'to' && newValue === 'document.getElementById("number-from-base").value') {
            setTimeout(() => {
                this.suggestBaseChange('to', 'binary');
            }, 100);
        }
    }

    /**
     * Sugere mudança de base
     */
    suggestBaseChange(target, suggestedValue) {
        const select = document.getElementById(`number-${target}-base`);
        if (select && select.value !== suggestedValue) {
            select.value = suggestedValue;
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
                this.showNumberValidationMessage(element, message, 'error');
                break;
            case 'warning':
                element.classList.add('input-warning');
                this.showNumberValidationMessage(element, message, 'warning');
                break;
            case 'clear':
                // Remove mensagens e propriedades
                this.clearNumberProperties();
                const existingMessage = element.parentNode.querySelector('.number-validation-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                break;
        }
    }

    /**
     * Mostra mensagem de validação numérica
     */
    showNumberValidationMessage(element, message, type) {
        // Remove mensagem anterior
        const existingMessage = element.parentNode.querySelector('.number-validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Cria nova mensagem
        const messageEl = document.createElement('div');
        messageEl.className = `number-validation-message number-validation-${type}`;
        messageEl.textContent = message;
        
        // Posiciona após o elemento
        element.parentNode.appendChild(messageEl);
    }

    /**
     * Cria teclado numérico virtual
     */
    createNumberKeyboard() {
        const numberInput = document.getElementById('number-input');
        if (!numberInput) return;

        // Adiciona botão do teclado
        const keyboardBtn = document.createElement('button');
        keyboardBtn.className = 'number-keyboard-toggle';
        keyboardBtn.innerHTML = '⌨️';
        keyboardBtn.title = 'Teclado numérico virtual';
        keyboardBtn.style.cssText = `
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--color-surface-elevated);
            border: 1px solid var(--color-border-primary);
            border-radius: 4px;
            padding: 4px 6px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        `;

        numberInput.style.position = 'relative';
        numberInput.parentNode.style.position = 'relative';
        numberInput.parentNode.appendChild(keyboardBtn);

        // Toggle do teclado
        keyboardBtn.addEventListener('click', () => {
            this.toggleNumberKeyboard(numberInput);
        });
    }

    /**
     * Alterna teclado numérico virtual
     */
    toggleNumberKeyboard(input) {
        const existingKeyboard = document.querySelector('.virtual-keyboard');
        
        if (existingKeyboard) {
            existingKeyboard.remove();
            return;
        }

        const fromBase = document.getElementById('number-from-base').value;
        const validChars = this.getValidChars(fromBase);
        
        const keyboard = this.createVirtualKeyboard(validChars, input);
        document.body.appendChild(keyboard);
    }

    /**
     * Cria teclado virtual
     */
    createVirtualKeyboard(chars, input) {
        const keyboard = document.createElement('div');
        keyboard.className = 'virtual-keyboard';
        keyboard.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-surface);
            border: 1px solid var(--color-border-primary);
            border-radius: 12px;
            padding: 20px;
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
            gap: 8px;
            max-width: 400px;
        `;

        chars.forEach(char => {
            const key = document.createElement('button');
            key.textContent = char;
            key.className = 'virtual-key';
            key.style.cssText = `
                padding: 12px 8px;
                background: var(--color-surface-elevated);
                border: 1px solid var(--color-border-primary);
                border-radius: 6px;
                color: var(--color-text-primary);
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            `;

            key.addEventListener('mouseenter', () => {
                key.style.background = 'var(--color-surface-hover)';
                key.style.borderColor = 'var(--color-primary)';
            });

            key.addEventListener('mouseleave', () => {
                key.style.background = 'var(--color-surface-elevated)';
                key.style.borderColor = 'var(--color-border-primary)';
            });

            key.addEventListener('click', () => {
                this.insertCharAtCursor(input, char);
                keyboard.remove();
            });

            keyboard.appendChild(key);
        });

        // Botão fechar
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.className = 'keyboard-close';
        closeBtn.style.cssText = `
            grid-column: 1 / -1;
            padding: 8px;
            background: var(--color-error);
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 8px;
        `;
        closeBtn.addEventListener('click', () => keyboard.remove());
        keyboard.appendChild(closeBtn);

        return keyboard;
    }

    /**
     * Retorna caracteres válidos para base
     */
    getValidChars(base) {
        const charSets = {
            decimal: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '-'],
            binary: ['1', '0'],
            hex: ['A', 'B', 'C', 'D', 'E', 'F', '7', '8', '9', '4', '5', '6', '1', '2', '3', '0'],
            octal: ['7', '6', '5', '4', '3', '2', '1', '0']
        };
        return charSets[base] || charSets.decimal;
    }

    /**
     * Insere caractere na posição do cursor
     */
    insertCharAtCursor(input, char) {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const value = input.value;
        
        input.value = value.substring(0, start) + char + value.substring(end);
        input.setSelectionRange(start + 1, start + 1);
        input.focus();
        
        // Dispara evento de input
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    /**
     * Configura histórico de cálculos
     */
    setupCalculationHistory() {
        this.history = this.loadCalculationHistory();
        this.displayCalculationHistory();
    }

    /**
     * Carrega histórico de cálculos
     */
    loadCalculationHistory() {
        try {
            const stored = localStorage.getItem('number-converter-history');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    /**
     * Salva no histórico
     */
    saveToHistory(inputValue, fromBase, outputValue, toBase) {
        const entry = {
            id: Date.now(),
            input: inputValue,
            fromBase,
            output: outputValue,
            toBase,
            timestamp: new Date().toISOString()
        };

        this.history.unshift(entry);
        
        // Limita histórico a 20 entradas
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }

        this.saveCalculationHistory();
        this.updateHistoryDisplay();
    }

    /**
     * Salva histórico no localStorage
     */
    saveCalculationHistory() {
        try {
            localStorage.setItem('number-converter-history', JSON.stringify(this.history));
        } catch (error) {
            console.warn('Erro ao salvar histórico:', error);
        }
    }

    /**
     * Exibe histórico de cálculos
     */
    displayCalculationHistory() {
        if (this.history.length === 0) return;

        // Adiciona seção de histórico se não existir
        let historySection = document.querySelector('.calculation-history');
        if (!historySection) {
            historySection = document.createElement('div');
            historySection.className = 'calculation-history';
            historySection.innerHTML = `
                <h3>Histórico de Conversões</h3>
                <div class="history-list"></div>
                <button class="clear-history">Limpar Histórico</button>
            `;

            const converterContent = document.querySelector('#number-converter .converter-section');
            if (converterContent) {
                converterContent.appendChild(historySection);
            }
        }

        this.updateHistoryDisplay();
    }

    /**
     * Atualiza display do histórico
     */
    updateHistoryDisplay() {
        const historyList = document.querySelector('.history-list');
        if (!historyList) return;

        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="no-history">Nenhuma conversão ainda</p>';
            return;
        }

        historyList.innerHTML = this.history.map(entry => `
            <div class="history-item">
                <div class="history-conversion">
                    ${entry.input} (${entry.fromBase}) → ${entry.output} (${entry.toBase})
                </div>
                <div class="history-time">${this.formatTime(entry.timestamp)}</div>
            </div>
        `).join('');

        // Event listeners para itens do histórico
        historyList.querySelectorAll('.history-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.loadFromHistory(this.history[index]);
            });
        });

        // Event listener para limpar histórico
        const clearBtn = document.querySelector('.clear-history');
        if (clearBtn) {
            clearBtn.onclick = () => {
                this.history = [];
                this.saveCalculationHistory();
                this.updateHistoryDisplay();
            };
        }
    }

    /**
     * Carrega conversão do histórico
     */
    loadFromHistory(entry) {
        const numberInput = document.getElementById('number-input');
        const numberFromBase = document.getElementById('number-from-base');
        const numberToBase = document.getElementById('number-to-base');

        if (numberInput && numberFromBase && numberToBase) {
            numberInput.value = entry.input;
            numberFromBase.value = entry.fromBase;
            numberToBase.value = entry.toBase;
            
            setTimeout(() => {
                if (window.converterCore) {
                    window.converterCore.convertNumber();
                }
            }, 100);
        }
    }

    /**
     * Formata timestamp
     */
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Agora';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m atrás`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
        return date.toLocaleDateString();
    }

    /**
     * Carrega preferências numéricas
     */
    loadNumberPreferences() {
        try {
            const preferences = localStorage.getItem('number-converter-preferences');
            if (preferences) {
                const prefs = JSON.parse(preferences);
                
                // Aplica preferências
                if (prefs.showHistory) {
                    // Mostrar histórico é padrão
                }
            }
        } catch (error) {
            console.warn('Erro ao carregar preferências numéricas:', error);
        }
    }

    /**
     * Cria guia de bases numéricas
     */
    createNumberBaseGuide() {
        const numberSection = document.querySelector('#number-converter .converter-section');
        if (!numberSection) return;

        const guideBtn = document.createElement('button');
        guideBtn.className = 'base-guide-toggle';
        guideBtn.innerHTML = '?';
        guideBtn.title = 'Guia de bases numéricas';
        guideBtn.style.cssText = `
            position: absolute;
            top: 16px;
            right: 16px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: var(--color-info);
            color: white;
            border: none;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        numberSection.style.position = 'relative';
        numberSection.appendChild(guideBtn);

        guideBtn.addEventListener('click', () => {
            this.showNumberBaseGuide();
        });
    }

    /**
     * Mostra guia de bases numéricas
     */
    showNumberBaseGuide() {
        const guide = document.createElement('div');
        guide.className = 'number-base-guide';
        guide.innerHTML = `
            <div class="guide-content">
                <div class="guide-header">
                    <h3>Guia de Bases Numéricas</h3>
                    <button class="guide-close">&times;</button>
                </div>
                <div class="guide-body">
                    <div class="base-example">
                        <h4>Binário (Base 2)</h4>
                        <p>Dígitos: 0, 1</p>
                        <p>Exemplo: 1010₂ = 10₁₀</p>
                    </div>
                    <div class="base-example">
                        <h4>Octal (Base 8)</h4>
                        <p>Dígitos: 0, 1, 2, 3, 4, 5, 6, 7</p>
                        <p>Exemplo: 12₈ = 10₁₀</p>
                    </div>
                    <div class="base-example">
                        <h4>Decimal (Base 10)</h4>
                        <p>Dígitos: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9</p>
                        <p>Exemplo: 10₁₀ = 10₁₀</p>
                    </div>
                    <div class="base-example">
                        <h4>Hexadecimal (Base 16)</h4>
                        <p>Dígitos: 0-9, A-F</p>
                        <p>Exemplo: A₁₆ = 10₁₀</p>
                    </div>
                </div>
            </div>
        `;

        // Adiciona estilos
        guide.style.cssText = `
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
        `;

        const content = guide.querySelector('.guide-content');
        content.style.cssText = `
            background: var(--color-surface);
            border: 1px solid var(--color-border-primary);
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
        `;

        document.body.appendChild(guide);

        // Event listeners
        guide.querySelector('.guide-close').addEventListener('click', () => {
            guide.remove();
        });

        guide.addEventListener('click', (e) => {
            if (e.target === guide) {
                guide.remove();
            }
        });
    }
}

// Adiciona estilos CSS para componentes numéricos
const numberConverterStyle = document.createElement('style');
numberConverterStyle.textContent = `
    .number-keyboard-toggle:hover {
        opacity: 1 !important;
    }
    
    .number-highlighted {
        box-shadow: 0 0 0 2px var(--color-primary) !important;
    }
    
    .key-feedback {
        pointer-events: none;
    }
    
    @keyframes keyPop {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0.7;
        }
    }
    
    .number-properties-container {
        margin-top: 16px;
        padding: 16px;
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-border-primary);
        border-radius: 8px;
    }
    
    .number-properties h4 {
        margin: 0 0 12px 0;
        color: var(--color-text-primary);
        font-size: 14px;
    }
    
    .properties-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 8px;
    }
    
    .property-item {
        display: flex;
        justify-content: space-between;
        padding: 4px 8px;
        background: var(--color-surface);
        border-radius: 4px;
        font-size: 12px;
    }
    
    .property-label {
        color: var(--color-text-secondary);
    }
    
    .property-value {
        color: var(--color-text-primary);
        font-family: var(--font-family-mono);
        font-weight: 500;
    }
    
    .number-error {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: var(--color-error-bg);
        border: 1px solid var(--color-error-border);
        border-radius: 6px;
        color: var(--color-error);
        font-size: 12px;
    }
    
    .number-validation-message {
        font-size: 12px;
        margin-top: 4px;
        padding: 4px 8px;
        border-radius: 4px;
    }
    
    .number-validation-error {
        background: var(--color-error-bg);
        color: var(--color-error);
        border: 1px solid var(--color-error-border);
    }
    
    .number-validation-warning {
        background: var(--color-warning-bg);
        color: var(--color-warning);
        border: 1px solid var(--color-warning-border);
    }
    
    .calculation-history {
        margin-top: 24px;
        padding: 16px;
        background: var(--color-surface-elevated);
        border: 1px solid var(--color-border-primary);
        border-radius: 8px;
    }
    
    .calculation-history h3 {
        margin: 0 0 12px 0;
        color: var(--color-text-primary);
        font-size: 16px;
    }
    
    .history-list {
        max-height: 200px;
        overflow-y: auto;
        margin-bottom: 12px;
    }
    
    .history-item {
        padding: 8px 12px;
        background: var(--color-surface);
        border: 1px solid var(--color-border-secondary);
        border-radius: 6px;
        margin-bottom: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .history-item:hover {
        background: var(--color-surface-hover);
        border-color: var(--color-primary);
    }
    
    .history-conversion {
        font-size: 12px;
        color: var(--color-text-primary);
        font-family: var(--font-family-mono);
        margin-bottom: 2px;
    }
    
    .history-time {
        font-size: 10px;
        color: var(--color-text-tertiary);
    }
    
    .no-history {
        text-align: center;
        color: var(--color-text-tertiary);
        font-style: italic;
        margin: 20px 0;
    }
    
    .clear-history {
        background: var(--color-error);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
        transition: opacity 0.2s ease;
    }
    
    .clear-history:hover {
        opacity: 0.8;
    }
    
    .base-guide-toggle {
        transition: transform 0.2s ease;
    }
    
    .base-guide-toggle:hover {
        transform: scale(1.1);
    }
    
    .base-example {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--color-surface-elevated);
        border-radius: 6px;
    }
    
    .base-example h4 {
        margin: 0 0 8px 0;
        color: var(--color-text-primary);
        font-size: 14px;
    }
    
    .base-example p {
        margin: 4px 0;
        font-size: 12px;
        color: var(--color-text-secondary);
    }
    
    .guide-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid var(--color-border-primary);
    }
    
    .guide-header h3 {
        margin: 0;
        color: var(--color-text-primary);
    }
    
    .guide-close {
        background: none;
        border: none;
        font-size: 20px;
        color: var(--color-text-secondary);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: color 0.2s ease;
    }
    
    .guide-close:hover {
        color: var(--color-text-primary);
        background: var(--color-surface-hover);
    }
    
    .guide-body {
        padding: 20px;
        max-height: 60vh;
        overflow-y: auto;
    }
`;
document.head.appendChild(numberConverterStyle);