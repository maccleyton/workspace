// js/calculator.js

export class Calculator {
    constructor(container) {
        this.container = container;
        this.currentInput = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="calculator-widget">
                <div class="calc-display">${this.currentInput}</div>
                <div class="calc-buttons">
                    <button class="calc-btn calc-btn-clear" data-action="clear">C</button>
                    <button class="calc-btn calc-btn-operator" data-action="operator" data-value="/">/</button>
                    <button class="calc-btn calc-btn-operator" data-action="operator" data-value="*">*</button>
                    <button class="calc-btn calc-btn-operator" data-action="operator" data-value="-">-</button>
                    
                    <button class="calc-btn calc-btn-number" data-action="number" data-value="7">7</button>
                    <button class="calc-btn calc-btn-number" data-action="number" data-value="8">8</button>
                    <button class="calc-btn calc-btn-number" data-action="number" data-value="9">9</button>
                    <button class="calc-btn calc-btn-operator" data-action="operator" data-value="+">+</button>
                    
                    <button class="calc-btn calc-btn-number" data-action="number" data-value="4">4</button>
                    <button class="calc-btn calc-btn-number" data-action="number" data-value="5">5</button>
                    <button class="calc-btn calc-btn-number" data-action="number" data-value="6">6</button>
                    <button class="calc-btn calc-btn-equals" data-action="calculate">=</button>
                    
                    <button class="calc-btn calc-btn-number" data-action="number" data-value="1">1</button>
                    <button class="calc-btn calc-btn-number" data-action="number" data-value="2">2</button>
                    <button class="calc-btn calc-btn-number" data-action="number" data-value="3">3</button>
                    <button class="calc-btn calc-btn-zero" data-action="number" data-value="0" colspan="2">0</button>
                    
                    <button class="calc-btn calc-btn-decimal" data-action="decimal">.</button>
                </div>
            </div>
        `;
        this.displayElement = this.container.querySelector('.calc-display');
    }

    attachEventListeners() {
        this.container.addEventListener('click', (event) => {
            const { target } = event;
            if (!target.matches('.calc-btn')) return;

            const action = target.dataset.action;
            const value = target.dataset.value;

            switch (action) {
                case 'number':
                case 'decimal':
                    this.inputDigit(value);
                    break;
                case 'operator':
                    this.handleOperator(value);
                    break;
                case 'calculate':
                    this.calculate();
                    break;
                case 'clear':
                    this.clear();
                    break;
            }
        });
    }

    inputDigit(digit) {
        if (this.waitingForSecondOperand) {
            this.currentInput = digit;
            this.waitingForSecondOperand = false;
        } else {
            this.currentInput = this.currentInput === '0' ? digit : this.currentInput + digit;
        }
        this.updateDisplay();
    }

    handleOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.firstOperand === null) {
            this.firstOperand = inputValue;
        } else if (this.operator) {
            const result = this.performCalculation();
            this.currentInput = String(result);
            this.firstOperand = result;
        }

        this.waitingForSecondOperand = true;
        this.operator = nextOperator;
        this.updateDisplay();
    }

    calculate() {
        if (this.firstOperand === null || this.operator === null) return;
        const result = this.performCalculation();
        this.currentInput = String(result);
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.updateDisplay();
    }

    performCalculation() {
        const inputValue = parseFloat(this.currentInput);
        let result = 0;
        switch (this.operator) {
            case '+':
                result = this.firstOperand + inputValue;
                break;
            case '-':
                result = this.firstOperand - inputValue;
                break;
            case '*':
                result = this.firstOperand * inputValue;
                break;
            case '/':
                result = this.firstOperand / inputValue;
                break;
        }
        return result;
    }

    clear() {
        this.currentInput = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayElement.textContent = this.currentInput;
    }
}