/* ========================================
   GERENCIADOR DA INTERFACE DE USUÁRIO
   ======================================== */

class UIManager {
    static currentCategory = 'algebra';
    static currentFormulas = [];
    static searchQuery = '';
    static sortBy = 'name';
    static isSidebarCollapsed = false;
    static showFavoritesOnly = false;

    /* ========================================
       INICIALIZAÇÃO
       ======================================== */
    static init() {
        this.setupEventListeners();
        this.initializeUI();
        this.loadInitialData();
    }

    static setupEventListeners() {
        // Busca
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', 
                CalculatorUtils.DOMUtils.debounce((e) => {
                    this.handleSearch(e.target.value);
                }, 300)
            );
        }

        // Ordenação
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.handleSort(e.target.value);
            });
        }

        // Filtros
        const resetFiltersBtn = document.getElementById('resetFilters');
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }

        // Tema
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Sidebar
        const collapseSidebar = document.getElementById('collapseSidebar');
        if (collapseSidebar) {
            collapseSidebar.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Favoritas
        const favoritesBtn = document.getElementById('favoritesBtn');
        if (favoritesBtn) {
            favoritesBtn.addEventListener('click', () => {
                this.toggleFavoritesFilter();
            });
        }

        // Histórico
        const historyBtn = document.getElementById('historyBtn');
        if (historyBtn) {
            historyBtn.addEventListener('click', () => {
                this.showHistory();
            });
        }

        // Modais
        this.setupModalListeners();

        // Redimensionamento
        window.addEventListener('resize', 
            CalculatorUtils.DOMUtils.throttle(() => {
                this.handleResize();
            }, 250)
        );

        // Teclado
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    static setupModalListeners() {
        // Modal de Variáveis
        const variablesModal = document.getElementById('variablesModal');
        const closeModal = document.getElementById('closeModal');
        const cancelCalculation = document.getElementById('cancelCalculation');
        const executeCalculation = document.getElementById('executeCalculation');

        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeVariablesModal());
        }

        if (cancelCalculation) {
            cancelCalculation.addEventListener('click', () => this.closeVariablesModal());
        }

        if (executeCalculation) {
            executeCalculation.addEventListener('click', () => {
                this.executeCalculation();
            });
        }

        // Modal de Resultado
        const resultModal = document.getElementById('resultModal');
        const closeResultModal = document.getElementById('closeResultModal');
        const closeResult = document.getElementById('closeResult');
        const newCalculation = document.getElementById('newCalculation');
        const exportResult = document.getElementById('exportResult');

        if (closeResultModal) {
            closeResultModal.addEventListener('click', () => this.closeResultModal());
        }

        if (closeResult) {
            closeResult.addEventListener('click', () => this.closeResultModal());
        }

        if (newCalculation) {
            newCalculation.addEventListener('click', () => {
                this.closeResultModal();
                this.openVariablesModal(this.currentFormula);
            });
        }

        if (exportResult) {
            exportResult.addEventListener('click', () => {
                this.exportResult();
            });
        }

        // Fechar modais com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isModalOpen('variablesModal')) {
                    this.closeVariablesModal();
                } else if (this.isModalOpen('resultModal')) {
                    this.closeResultModal();
                }
            }
        });

        // Fechar modais clicando fora
        [variablesModal, resultModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('open');
                    }
                });
            }
        });
    }

    static initializeUI() {
        // Inicializa tema
        CalculatorUtils.ThemeManager.init();
        
        // Inicializa toast
        CalculatorUtils.ToastManager.init();
        
        // Cria categorias na sidebar
        this.createCategories();
        
        // Atualiza contadores
        this.updateCounters();
        
        // Configura responsividade
        this.setupResponsive();
    }

    static loadInitialData() {
        this.currentFormulas = FormulasDatabase.getFormulasByCategory(this.currentCategory);
        this.renderFormulas();
        this.updateCategoryHeader();
    }

    /* ========================================
       RENDERIZAÇÃO DE CATEGORIAS
       ======================================== */
    static createCategories() {
        const categoryNav = document.getElementById('categoryNav');
        if (!categoryNav) return;

        CalculatorUtils.DOMUtils.clearElement(categoryNav);
        const categories = FormulasDatabase.getCategories();

        Object.entries(categories).forEach(([key, category]) => {
            const categoryItem = CalculatorUtils.DOMUtils.createElement('div', 'category-item');
            if (key === this.currentCategory) {
                categoryItem.classList.add('active');
            }

            categoryItem.innerHTML = `
                <i class="fas ${category.icon}"></i>
                <span>${category.name}</span>
                <span class="category-count" id="count-${key}">0</span>
            `;

            categoryItem.addEventListener('click', () => {
                this.selectCategory(key);
            });

            categoryNav.appendChild(categoryItem);
        });

        this.updateCategoryCounts();
    }

    static updateCategoryCounts() {
        const counts = FormulasDatabase.getCountByCategory();
        Object.entries(counts).forEach(([category, count]) => {
            const countElement = document.getElementById(`count-${category}`);
            if (countElement) {
                countElement.textContent = count;
            }
        });
    }

    static selectCategory(category) {
        // Atualiza categoria ativa
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelector(`#count-${category}`)?.parentElement?.classList.add('active');
        
        // Atualiza dados
        this.currentCategory = category;
        this.currentFormulas = FormulasDatabase.getFormulasByCategory(category);
        
        // Aplica filtros
        this.applyFilters();
        
        // Atualiza interface
        this.updateCategoryHeader();
        this.renderFormulas();
    }

    static updateCategoryHeader() {
        const categories = FormulasDatabase.getCategories();
        const currentCat = categories[this.currentCategory];
        
        const header = document.getElementById('currentCategory');
        if (header && currentCat) {
            header.innerHTML = `
                <i class="fas ${currentCat.icon}" style="color: ${currentCat.color}"></i>
                ${currentCat.name}
            `;
        }
    }

    /* ========================================
       RENDERIZAÇÃO DE FÓRMULAS
       ======================================== */
    static renderFormulas() {
        const grid = document.getElementById('formulasGrid');
        const loadingState = document.getElementById('loadingState');
        
        if (!grid) return;

        // Mostra loading
        if (loadingState) {
            CalculatorUtils.DOMUtils.show(loadingState);
        }
        CalculatorUtils.DOMUtils.hide(grid);

        // Simula carregamento
        setTimeout(() => {
            CalculatorUtils.DOMUtils.clearElement(grid);

            if (this.currentFormulas.length === 0) {
                this.showEmptyState();
                return;
            }

            // Renderiza cards
            this.currentFormulas.forEach(formula => {
                const card = this.createFormulaCard(formula);
                grid.appendChild(card);
            });

            // Esconde loading e mostra grid
            if (loadingState) {
                CalculatorUtils.DOMUtils.hide(loadingState);
            }
            CalculatorUtils.DOMUtils.show(grid);
        }, 300);
    }

    static createFormulaCard(formula) {
        const card = CalculatorUtils.DOMUtils.createElement('div', 'formula-card');
        card.dataset.formulaId = formula.id;

        // Verifica se é favorita
        const isFavorite = CalculatorUtils.FavoritesManager.isFavorite(formula.id);

        // Variáveis em preview
        const variablesPreview = formula.variables
            .slice(0, 3) // Mostra apenas as primeiras 3
            .map(v => v.name)
            .join(', ');

        card.innerHTML = `
            <div class="card-header">
                <div class="card-title">${formula.name}</div>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-formula-id="${formula.id}">
                    <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            
            <div class="card-category">${formula.category}</div>
            
            <div class="formula-display">
                <div class="latex-content" data-latex="${this.escapeHtml(formula.latex)}"></div>
            </div>
            
            <div class="formula-description">${formula.description}</div>
            
            <div class="variables-preview">
                ${formula.variables.map(v => 
                    `<span class="variable-tag">${v.name}</span>`
                ).join('')}
            </div>
            
            <div class="card-footer">
                <div class="card-usage">${formula.variables.length} variáveis</div>
                <button class="use-formula-btn" data-formula-id="${formula.id}">
                    <i class="fas fa-play"></i> Usar
                </button>
            </div>
        `;

        // Adiciona eventos
        this.setupCardEvents(card, formula);

        // Renderiza LaTeX
        setTimeout(() => {
            const latexElement = card.querySelector('.latex-content');
            if (latexElement && window.LatexRenderer) {
                const latex = latexElement.dataset.latex;
                window.LatexRenderer.render(latexElement, latex);
            }
        }, 50);

        return card;
    }

    static setupCardEvents(card, formula) {
        // Clique no card
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.favorite-btn') && !e.target.closest('.use-formula-btn')) {
                this.openVariablesModal(formula);
            }
        });

        // Botão de favorito
        const favoriteBtn = card.querySelector('.favorite-btn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(formula.id, favoriteBtn);
            });
        }

        // Botão de usar
        const useBtn = card.querySelector('.use-formula-btn');
        if (useBtn) {
            useBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openVariablesModal(formula);
            });
        }
    }

    static showEmptyState() {
        const grid = document.getElementById('formulasGrid');
        if (!grid) return;

        CalculatorUtils.DOMUtils.clearElement(grid);
        
        const emptyState = CalculatorUtils.DomUtils.createElement('div', 'empty-state');
        emptyState.innerHTML = `
            <div class="empty-icon">
                <i class="fas fa-search"></i>
            </div>
            <h3>Nenhuma fórmula encontrada</h3>
            <p>Tente ajustar os filtros de busca ou selecione uma categoria diferente.</p>
            <button class="btn-primary" onclick="UIManager.resetFilters()">
                <i class="fas fa-refresh"></i> Limpar Filtros
            </button>
        `;
        
        grid.appendChild(emptyState);
    }

    /* ========================================
       MODAL DE VARIÁVEIS
       ======================================== */
    static currentFormula = null;
    static currentVariables = {};

    static openVariablesModal(formula) {
        this.currentFormula = formula;
        
        const modal = document.getElementById('variablesModal');
        const formulaName = document.getElementById('modalFormulaName');
        const formulaLatex = document.getElementById('modalFormulaLatex');
        const description = document.getElementById('modalDescription');
        const variablesForm = document.getElementById('variablesForm');

        if (!modal) return;

        // Preenche cabeçalho
        if (formulaName) formulaName.textContent = formula.name;
        if (description) description.textContent = formula.description;

        // Renderiza fórmula LaTeX
        if (formulaLatex && window.LatexRenderer) {
            window.LatexRenderer.render(formulaLatex, formula.latex);
        }

        // Cria formulário de variáveis
        this.createVariablesForm(formula, variablesForm);

        // Mostra modal
        modal.classList.add('open');
        
        // Focus no primeiro input
        setTimeout(() => {
            const firstInput = modal.querySelector('.form-input');
            if (firstInput) firstInput.focus();
        }, 300);
    }

    static closeVariablesModal() {
        const modal = document.getElementById('variablesModal');
        if (modal) {
            modal.classList.remove('open');
        }
        
        this.currentFormula = null;
        this.currentVariables = {};
    }

    static createVariablesForm(formula, container) {
        if (!container) return;

        CalculatorUtils.DOMUtils.clearElement(container);
        this.currentVariables = {};

        formula.variables.forEach(variable => {
            const formGroup = CalculatorUtils.DOMUtils.createElement('div', 'form-group');
            
            // Cria label
            const label = CalculatorUtils.DOMUtils.createElement('label', 'form-label', variable.label);
            label.setAttribute('for', `var-${variable.name}`);
            
            // Cria input
            const input = CalculatorUtils.DOMUtils.createElement('input', 'form-input');
            input.id = `var-${variable.name}`;
            input.name = variable.name;
            input.type = variable.type || 'number';
            input.placeholder = `Digite ${variable.label.toLowerCase()}`;
            
            if (variable.required) {
                input.required = true;
            }
            
            if (variable.min !== undefined) {
                input.min = variable.min;
            }
            
            if (variable.max !== undefined) {
                input.max = variable.max;
            }
            
            if (variable.defaultValue !== undefined) {
                input.value = variable.defaultValue;
            }
            
            // Adiciona eventos
            input.addEventListener('input', (e) => {
                this.validateVariableInput(e.target, variable);
            });
            
            formGroup.appendChild(label);
            formGroup.appendChild(input);
            container.appendChild(formGroup);
        });
    }

    static validateVariableInput(input, variable) {
        const value = input.value;
        let isValid = true;
        let errorMessage = '';

        // Validação de tipo
        if (variable.type === 'number' && value !== '') {
            const num = CalculatorUtils.MathUtils.parseNumber(value);
            if (num === null) {
                isValid = false;
                errorMessage = 'Valor deve ser um número';
            } else {
                // Validação de intervalo
                if (variable.min !== undefined && num < variable.min) {
                    isValid = false;
                    errorMessage = `Valor deve ser maior ou igual a ${variable.min}`;
                }
                
                if (variable.max !== undefined && num > variable.max) {
                    isValid = false;
                    errorMessage = `Valor deve ser menor ou igual a ${variable.max}`;
                }
            }
        }

        // Atualiza estado visual
        if (isValid) {
            input.classList.remove('error');
            this.removeErrorMessage(input);
        } else {
            input.classList.add('error');
            this.showErrorMessage(input, errorMessage);
        }

        // Atualiza botão de executar
        this.updateExecuteButton();
    }

    static showErrorMessage(input, message) {
        this.removeErrorMessage(input);
        
        const errorDiv = CalculatorUtils.DOMUtils.createElement('div', 'error-message');
        errorDiv.textContent = message;
        errorDiv.id = `error-${input.id}`;
        
        input.parentNode.appendChild(errorDiv);
    }

    static removeErrorMessage(input) {
        const errorDiv = document.getElementById(`error-${input.id}`);
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    static updateExecuteButton() {
        const executeBtn = document.getElementById('executeCalculation');
        if (!executeBtn) return;

        const inputs = document.querySelectorAll('#variablesForm .form-input');
        const hasErrors = Array.from(inputs).some(input => input.classList.contains('error'));
        const hasRequired = Array.from(inputs).some(input => input.required && !input.value);

        executeBtn.disabled = hasErrors || hasRequired;
    }

    /* ========================================
       EXECUÇÃO DE CÁLCULOS
       ======================================== */
    static executeCalculation() {
        if (!this.currentFormula) return;

        const variables = this.collectVariables();
        if (!variables) return;

        // Mostra loading no botão
        const executeBtn = document.getElementById('executeCalculation');
        const originalText = executeBtn.innerHTML;
        executeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculando...';
        executeBtn.disabled = true;

        // Executa cálculo
        setTimeout(() => {
            const result = CalculationEngine.execute(this.currentFormula, variables);
            
            // Restaura botão
            executeBtn.innerHTML = originalText;
            executeBtn.disabled = false;

            if (result.success) {
                this.showResult(result);
                CalculatorUtils.ToastManager.success('Cálculo realizado com sucesso!');
            } else {
                CalculatorUtils.ToastManager.error(result.error, 'Erro no Cálculo');
            }
        }, 500);
    }

    static collectVariables() {
        const variables = {};
        const inputs = document.querySelectorAll('#variablesForm .form-input');
        
        for (let input of inputs) {
            const name = input.name;
            let value = input.value;
            
            // Converte para número se necessário
            if (input.type === 'number' && value !== '') {
                value = CalculatorUtils.MathUtils.parseNumber(value);
            }
            
            variables[name] = value;
        }

        return variables;
    }

    static showResult(result) {
        const modal = document.getElementById('resultModal');
        const resultFinal = document.getElementById('resultFinal');
        const calculationSteps = document.getElementById('calculationSteps');

        if (!modal) return;

        // Preenche resultado final
        if (resultFinal && window.LatexRenderer) {
            window.LatexRenderer.render(resultFinal, result.latexResult);
        }

        // Preenche passos
        if (calculationSteps) {
            CalculatorUtils.DOMUtils.clearElement(calculationSteps);
            
            result.steps.forEach(step => {
                const stepElement = CalculatorUtils.DOMUtils.createElement('div', 'step-item');
                stepElement.innerHTML = `
                    <div class="step-header">
                        <span class="step-number">${step.number}</span>
                        <strong>${step.title}</strong>
                    </div>
                    <div class="step-content">${step.content}</div>
                    <div class="step-latex" data-latex="${this.escapeHtml(step.latex)}"></div>
                `;
                
                calculationSteps.appendChild(stepElement);
            });

            // Renderiza LaTeX dos passos
            setTimeout(() => {
                const stepLatexElements = calculationSteps.querySelectorAll('.step-latex');
                stepLatexElements.forEach(element => {
                    const latex = element.dataset.latex;
                    window.LatexRenderer.render(element, latex);
                });
            }, 50);
        }

        // Fecha modal de variáveis e abre resultado
        this.closeVariablesModal();
        modal.classList.add('open');
    }

    static closeResultModal() {
        const modal = document.getElementById('resultModal');
        if (modal) {
            modal.classList.remove('open');
        }
    }

    /* ========================================
       BUSCA E FILTROS
       ======================================== */
    static handleSearch(query) {
        this.searchQuery = query;
        this.applyFilters();
    }

    static handleSort(sortBy) {
        this.sortBy = sortBy;
        this.applyFilters();
    }

    static applyFilters() {
        let formulas = FormulasDatabase.getFormulasByCategory(this.currentCategory);

        // Aplica busca
        if (this.searchQuery.trim()) {
            formulas = FormulasDatabase.searchFormulas(this.searchQuery)
                .filter(f => f.categoryKey === this.currentCategory);
        }

        // Aplica filtro de favoritas
        if (this.showFavoritesOnly) {
            const favorites = CalculatorUtils.FavoritesManager.getAll();
            formulas = formulas.filter(f => favorites.includes(f.id));
        }

        // Aplica ordenação
        formulas = this.sortFormulas(formulas, this.sortBy);

        this.currentFormulas = formulas;
        this.renderFormulas();
    }

    static sortFormulas(formulas, sortBy) {
        return [...formulas].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });
    }

    static resetFilters() {
        // Limpa busca
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Reseta filtros
        this.searchQuery = '';
        this.showFavoritesOnly = false;
        
        // Atualiza UI
        this.applyFilters();
        CalculatorUtils.ToastManager.info('Filtros resetados');
    }

    /* ========================================
       FAVORITAS
       ======================================== */
    static toggleFavorite(formulaId, buttonElement) {
        const isFavorite = CalculatorUtils.FavoritesManager.toggle(formulaId);
        
        // Atualiza botão
        const icon = buttonElement.querySelector('i');
        if (isFavorite) {
            icon.className = 'fas fa-heart';
            buttonElement.classList.add('active');
        } else {
            icon.className = 'far fa-heart';
            buttonElement.classList.remove('active');
        }

        // Atualiza contadores
        this.updateCounters();
        
        // Aplica filtro se estiver ativo
        if (this.showFavoritesOnly) {
            this.applyFilters();
        }

        // Feedback
        const action = isFavorite ? 'adicionada às' : 'removida das';
        CalculatorUtils.ToastManager.success(`Fórmula ${action} favoritas`);
    }

    static toggleFavoritesFilter() {
        this.showFavoritesOnly = !this.showFavoritesOnly;
        
        const favoritesBtn = document.getElementById('favoritesBtn');
        if (favoritesBtn) {
            if (this.showFavoritesOnly) {
                favoritesBtn.classList.add('active');
            } else {
                favoritesBtn.classList.remove('active');
            }
        }

        this.applyFilters();
    }

    static showHistory() {
        // Implementação futura: Modal com histórico
        CalculatorUtils.ToastManager.info('Histórico em desenvolvimento');
    }

    /* ========================================
       CONTROLES GERAIS
       ======================================== */
    static toggleTheme() {
        const newTheme = CalculatorUtils.ThemeManager.toggle();
        CalculatorUtils.ToastManager.success(`Tema alterado para: ${newTheme}`);
    }

    static toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
            sidebar.classList.toggle('collapsed', this.isSidebarCollapsed);
        }
    }

    static updateCounters() {
        const totalFormulas = document.getElementById('totalFormulas');
        const favoritesCount = document.getElementById('favoritesCount');
        
        if (totalFormulas) {
            totalFormulas.textContent = FormulasDatabase.getTotalCount();
        }
        
        if (favoritesCount) {
            favoritesCount.textContent = CalculatorUtils.FavoritesManager.getAll().length;
        }
    }

    static isModalOpen(modalId) {
        const modal = document.getElementById(modalId);
        return modal && modal.classList.contains('open');
    }

    static setupResponsive() {
        // Adiciona classe para mobile
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile');
        }
    }

    static handleResize() {
        this.setupResponsive();
    }

    static handleKeyboard(e) {
        // Ctrl/Cmd + F para foco na busca
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }

    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    static exportResult() {
        // Implementação futura
        CalculatorUtils.ToastManager.info('Exportação em desenvolvimento');
    }
}

// Disponibiliza globalmente
window.UIManager = UIManager;