/* ========================================
   RENDERIZADOR LATEX (KATEX)
   ======================================== */

class LatexRenderer {
    static isInitialized = false;
    static renderQueue = new Set();
    static observers = new Map();

    // Configuração do KaTeX
    static config = {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false},
            {left: '$', right: '$', display: false}
        ],
        throwOnError: false,
        errorColor: '#cc0000',
        strict: false,
        macros: {
            "\\f": "#1f(#2)"
        }
    };

    /* ========================================
       INICIALIZAÇÃO
       ======================================== */
    static init() {
        if (this.isInitialized) return;

        // Aguarda o KaTeX carregar
        if (typeof katex === 'undefined') {
            console.error('KaTeX não está carregado!');
            return;
        }

        try {
            // Configura o auto-render
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(document.body, this.config);
            }

            this.setupMutationObserver();
            this.isInitialized = true;
            
            console.log('✅ LatexRenderer inicializado com sucesso');
        } catch (error) {
            console.error('❌ Erro ao inicializar LatexRenderer:', error);
        }
    }

    static setupMutationObserver() {
        // Observer para detectar novos elementos que precisam ser renderizados
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.processNode(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.observers.set('main', observer);
    }

    /* ========================================
       RENDERIZAÇÃO PRINCIPAL
       ======================================== */
    static render(element, latex, options = {}) {
        if (!element || !latex) return false;

        try {
            // Valida a fórmula LaTeX
            if (!this.validateLatex(latex)) {
                console.warn('LaTeX inválido:', latex);
                element.textContent = latex; // Fallback para texto simples
                return false;
            }

            // Limpa o elemento
            element.innerHTML = '';

            // Renderiza com KaTeX
            katex.render(latex, element, {
                ...options,
                throwOnError: false,
                errorColor: '#cc0000',
                displayMode: options.displayMode || false
            });

            this.renderQueue.add(element);
            return true;
        } catch (error) {
            console.error('Erro ao renderizar LaTeX:', error);
            element.textContent = latex; // Fallback
            return false;
        }
    }

    static renderInContainer(container, latex, options = {}) {
        if (!container || !latex) return null;

        const wrapper = document.createElement('div');
        wrapper.className = 'latex-container';
        
        this.render(wrapper, latex, options);
        container.appendChild(wrapper);
        
        return wrapper;
    }

    static renderBatch(elements) {
        elements.forEach(({ element, latex, options }) => {
            this.render(element, latex, options);
        });
    }

    /* ========================================
       EXTRAÇÃO DE VARIÁVEIS
       ======================================== */
    static extractVariables(latex) {
        if (!latex) return [];

        const variables = new Set();
        
        try {
            // Padrões para encontrar variáveis
            const patterns = [
                /\\([a-zA-Z]+)/g, // Comandos LaTeX como \alpha, \beta
                /([a-zA-Z])(?=\s*[+\-*/=])/g, // Variáveis antes de operadores
                /([xyz]|\\[a-zA-Z]+)(?=\s*[+\-*/=])/g, // Variáveis comuns
                /([0-9]+(?:\.[0-9]+)?)(?=\s*\\[a-zA-Z]+)/g, // Números antes de comandos
            ];

            patterns.forEach(pattern => {
                const matches = latex.match(pattern);
                if (matches) {
                    matches.forEach(match => {
                        // Limpa o match
                        const cleaned = match.replace(/[+\-*/=]/g, '').trim();
                        
                        // Filtra comandos LaTeX comuns que não são variáveis
                        const nonVariables = [
                            'frac', 'sqrt', 'sum', 'int', 'lim', 'log', 'ln', 
                            'sin', 'cos', 'tan', 'abs', 'max', 'min', 'pm', 'mp',
                            'cdot', 'times', 'div', 'pm', 'approx', 'equiv'
                        ];
                        
                        if (!nonVariables.includes(cleaned) && cleaned.length > 0) {
                            variables.add(cleaned);
                        }
                    });
                }
            });

            return Array.from(variables);
        } catch (error) {
            console.error('Erro ao extrair variáveis:', error);
            return [];
        }
    }

    static extractVariableList(latex) {
        const variables = this.extractVariables(latex);
        
        // Mapeia variáveis para informações mais detalhadas
        return variables.map(var => {
            const info = this.getVariableInfo(var);
            return {
                name: var,
                displayName: info.displayName,
                type: info.type,
                defaultValue: info.defaultValue,
                unit: info.unit,
                description: info.description
            };
        });
    }

    static getVariableInfo(variable) {
        const variableMap = {
            // Geometria
            'r': { displayName: 'r', type: 'number', defaultValue: 1, unit: 'cm', description: 'Raio' },
            'a': { displayName: 'a', type: 'number', defaultValue: 1, unit: 'cm', description: 'Lado a' },
            'b': { displayName: 'b', type: 'number', defaultValue: 1, unit: 'cm', description: 'Lado b' },
            'c': { displayName: 'c', type: 'number', defaultValue: 1, unit: 'cm', description: 'Lado c' },
            'h': { displayName: 'h', type: 'number', defaultValue: 1, unit: 'cm', description: 'Altura' },
            'base': { displayName: 'base', type: 'number', defaultValue: 1, unit: 'cm', description: 'Base' },
            'area': { displayName: 'área', type: 'number', defaultValue: 1, unit: 'cm²', description: 'Área' },
            'perimetro': { displayName: 'perímetro', type: 'number', defaultValue: 1, unit: 'cm', description: 'Perímetro' },
            
            // Física
            'v': { displayName: 'v', type: 'number', defaultValue: 0, unit: 'm/s', description: 'Velocidade' },
            't': { displayName: 't', type: 'number', defaultValue: 0, unit: 's', description: 'Tempo' },
            'm': { displayName: 'm', type: 'number', defaultValue: 1, unit: 'kg', description: 'Massa' },
            'F': { displayName: 'F', type: 'number', defaultValue: 0, unit: 'N', description: 'Força' },
            'P': { displayName: 'P', type: 'number', defaultValue: 0, unit: 'W', description: 'Potência' },
            'E': { displayName: 'E', type: 'number', defaultValue: 0, unit: 'J', description: 'Energia' },
            
            // Álgebra
            'x': { displayName: 'x', type: 'number', defaultValue: 0, unit: '', description: 'Variável x' },
            'y': { displayName: 'y', type: 'number', defaultValue: 0, unit: '', description: 'Variável y' },
            'z': { displayName: 'z', type: 'number', defaultValue: 0, unit: '', description: 'Variável z' },
            
            // Matemática geral
            'n': { displayName: 'n', type: 'number', defaultValue: 1, unit: '', description: 'Número' },
            'k': { displayName: 'k', type: 'number', defaultValue: 1, unit: '', description: 'Constante' },
            'θ': { displayName: 'θ', type: 'number', defaultValue: 0, unit: '°', description: 'Ângulo' },
            'π': { displayName: 'π', type: 'number', defaultValue: 3.14159, unit: '', description: 'Pi' },
            'e': { displayName: 'e', type: 'number', defaultValue: 2.71828, unit: '', description: 'Número de Euler' }
        };

        return variableMap[variable] || {
            displayName: variable,
            type: 'number',
            defaultValue: 0,
            unit: '',
            description: `Variável ${variable}`
        };
    }

    /* ========================================
       VALIDAÇÃO
       ======================================== */
    static validateLatex(latex) {
        if (!latex || typeof latex !== 'string') return false;

        try {
            // Testa a renderização em um elemento temporário
            const temp = document.createElement('div');
            katex.render(latex, temp, { throwOnError: true });
            return true;
        } catch (error) {
            console.warn('LaTeX inválido:', latex, error);
            return false;
        }
    }

    static escapeLatex(latex) {
        return latex
            .replace(/\\/g, '\\\\')
            .replace(/{/g, '\\{')
            .replace(/}/g, '\\}')
            .replace(/\$/g, '\\$')
            .replace(/%/g, '\\%')
            .replace(/&/g, '\\&')
            .replace(/#/g, '\\#')
            .replace(/_/g, '\\_')
            .replace(/\^/g, '\\^')
            .replace(/~/g, '\\~');
    }

    /* ========================================
       UTILITÁRIOS
       ======================================== */
    static processNode(node) {
        if (node.classList && node.classList.contains('latex-auto-render')) {
            this.render(node, node.textContent);
        }
    }

    static convertLatexToText(latex) {
        // Converte comandos LaTeX comuns para texto
        return latex
            .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
            .replace(/\\sqrt\{([^}]*)\}/g, '√$1')
            .replace(/\\sum/g, 'Σ')
            .replace(/\\int/g, '∫')
            .replace(/\\alpha/g, 'α')
            .replace(/\\beta/g, 'β')
            .replace(/\\gamma/g, 'γ')
            .replace(/\\delta/g, 'δ')
            .replace(/\\epsilon/g, 'ε')
            .replace(/\\pi/g, 'π')
            .replace(/\\theta/g, 'θ')
            .replace(/\\lambda/g, 'λ')
            .replace(/\\mu/g, 'μ')
            .replace(/\\sigma/g, 'σ')
            .replace(/\\Omega/g, 'Ω')
            .replace(/\\pm/g, '±')
            .replace(/\\cdot/g, '·')
            .replace(/\\times/g, '×')
            .replace(/\\div/g, '÷')
            .replace(/\\infty/g, '∞')
            .replace(/\\leq/g, '≤')
            .replace(/\\geq/g, '≥')
            .replace(/\\neq/g, '≠')
            .replace(/\\approx/g, '≈')
            .replace(/\\equiv/g, '≡')
            .replace(/\s+/g, ' ')
            .trim();
    }

    static formatLatexForDisplay(latex) {
        // Adiciona delimitadores para exibição
        if (latex.includes('\\') || latex.includes('{') || latex.includes('}')) {
            return `$$${latex}$$`;
        }
        return `$${latex}$`;
    }

    static parseFormula(latex) {
        return {
            original: latex,
            variables: this.extractVariables(latex),
            isValid: this.validateLatex(latex),
            text: this.convertLatexToText(latex)
        };
    }

    /* ========================================
       LIMPEZA
       ======================================== */
    static destroy() {
        // Remove observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        
        this.renderQueue.clear();
        this.isInitialized = false;
    }
}

// Inicializa automaticamente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    LatexRenderer.init();
});

// Disponibiliza globalmente
window.LatexRenderer = LatexRenderer;