/**
 * Component Library Manager - Gerencia a biblioteca de componentes
 * Responsável por organizar, filtrar e gerenciar os componentes disponíveis
 */

class ComponentLibrary {
    constructor(app) {
        this.app = app;
        this.components = new Map();
        this.categories = new Map();
        this.filteredComponents = [];
        this.searchQuery = '';
        this.activeCategory = null;
        
        this.init();
    }

    init() {
        this.setupComponents();
        this.setupCategories();
        this.setupEventListeners();
        this.renderComponents();
    }

    setupComponents() {
        // Text Components
        this.addComponent('text-heading-h1', {
            type: 'heading',
            level: 1,
            content: 'Título Principal',
            category: 'text',
            icon: 'H1',
            name: 'Título H1',
            description: 'Título principal da página',
            tags: ['texto', 'título', 'h1', 'principal']
        });

        this.addComponent('text-heading-h2', {
            type: 'heading',
            level: 2,
            content: 'Subtítulo',
            category: 'text',
            icon: 'H2',
            name: 'Título H2',
            description: 'Subtítulo ou seção',
            tags: ['texto', 'título', 'h2', 'subtítulo']
        });

        this.addComponent('text-heading-h3', {
            type: 'heading',
            level: 3,
            content: 'Título Terciário',
            category: 'text',
            icon: 'H3',
            name: 'Título H3',
            description: 'Título de nível 3',
            tags: ['texto', 'título', 'h3', 'subseção']
        });

        this.addComponent('text-paragraph', {
            type: 'text',
            content: 'Clique para editar o texto',
            category: 'text',
            icon: 'P',
            name: 'Parágrafo',
            description: 'Texto de parágrafo',
            tags: ['texto', 'parágrafo', 'p']
        });

        this.addComponent('text-span', {
            type: 'span',
            content: 'Texto em linha',
            category: 'text',
            icon: 'S',
            name: 'Texto em linha',
            description: 'Texto inline pequeno',
            tags: ['texto', 'span', 'inline']
        });

        // Interactive Components
        this.addComponent('interactive-button', {
            type: 'button',
            content: 'Clique aqui',
            category: 'interactive',
            icon: 'Btn',
            name: 'Botão',
            description: 'Botão clicável',
            tags: ['botão', 'click', 'ação', 'cta']
        });

        this.addComponent('interactive-link', {
            type: 'link',
            content: 'Link de exemplo',
            href: '#',
            category: 'interactive',
            icon: '🔗',
            name: 'Link',
            description: 'Hiperlink de navegação',
            tags: ['link', 'href', 'navegação', 'âncora']
        });

        // Media Components
        this.addComponent('media-image', {
            type: 'image',
            src: 'https://via.placeholder.com/300x200',
            alt: 'Imagem de exemplo',
            category: 'media',
            icon: '🖼️',
            name: 'Imagem',
            description: 'Imagem com legenda',
            tags: ['imagem', 'img', 'foto', 'visual']
        });

        // Layout Components
        this.addComponent('layout-container', {
            type: 'container',
            category: 'layout',
            icon: '📦',
            name: 'Container',
            description: 'Container responsivo',
            tags: ['container', 'layout', 'responsivo', 'wrapper']
        });

        this.addComponent('layout-section', {
            type: 'section',
            category: 'layout',
            icon: '📄',
            name: 'Seção',
            description: 'Seção de conteúdo',
            tags: ['seção', 'section', 'área', 'bloco']
        });

        this.addComponent('layout-div', {
            type: 'div',
            category: 'layout',
            icon: '▫️',
            name: 'Div',
            description: 'Div genérico',
            tags: ['div', 'genérico', 'bloco']
        });

        this.addComponent('layout-card', {
            type: 'card',
            category: 'layout',
            icon: '🎴',
            name: 'Card',
            description: 'Card com bordas',
            tags: ['card', 'cartão', 'bloco', 'container']
        });

        // Form Components
        this.addComponent('form-input', {
            type: 'input',
            placeholder: 'Digite aqui...',
            category: 'forms',
            icon: '📝',
            name: 'Input de Texto',
            description: 'Campo de entrada de texto',
            tags: ['input', 'formulário', 'texto', 'campo']
        });

        this.addComponent('form-textarea', {
            type: 'textarea',
            placeholder: 'Mensagem...',
            category: 'forms',
            icon: '📄',
            name: 'Área de Texto',
            description: 'Campo de texto longo',
            tags: ['textarea', 'formulário', 'longo', 'mensagem']
        });

        this.addComponent('form-form', {
            type: 'form',
            category: 'forms',
            icon: '📋',
            name: 'Formulário',
            description: 'Formulário completo',
            tags: ['form', 'formulário', 'submit', 'envio']
        });

        // List Components
        this.addComponent('list-ul', {
            type: 'ul',
            content: 'Item 1\nItem 2\nItem 3',
            category: 'lists',
            icon: '•',
            name: 'Lista com Bullets',
            description: 'Lista não ordenada',
            tags: ['lista', 'ul', 'bullets', 'não ordenada']
        });

        this.addComponent('list-ol', {
            type: 'ol',
            content: 'Primeiro\nSegundo\nTerceiro',
            category: 'lists',
            icon: '1.',
            name: 'Lista Numerada',
            description: 'Lista ordenada',
            tags: ['lista', 'ol', 'numerada', 'ordenada']
        });
    }

    addComponent(id, component) {
        this.components.set(id, {
            id,
            ...component,
            created: new Date()
        });
    }

    setupCategories() {
        this.categories.set('text', {
            id: 'text',
            name: 'Textos',
            icon: '📝',
            expanded: true,
            description: 'Elementos de texto'
        });

        this.categories.set('interactive', {
            id: 'interactive',
            name: 'Interativo',
            icon: '🎯',
            expanded: false,
            description: 'Elementos clicáveis'
        });

        this.categories.set('media', {
            id: 'media',
            name: 'Mídia',
            icon: '🖼️',
            expanded: false,
            description: 'Imagens e mídia'
        });

        this.categories.set('layout', {
            id: 'layout',
            name: 'Layout',
            icon: '📦',
            expanded: false,
            description: 'Elementos de estrutura'
        });

        this.categories.set('forms', {
            id: 'forms',
            name: 'Formulários',
            icon: '📋',
            expanded: false,
            description: 'Campos de formulário'
        });

        this.categories.set('lists', {
            id: 'lists',
            name: 'Listas',
            icon: '📜',
            expanded: false,
            description: 'Listas e coleções'
        });
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('componentSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Category toggles
        document.addEventListener('click', (e) => {
            const categoryHeader = e.target.closest('.category-header');
            if (categoryHeader) {
                const categoryId = categoryHeader.dataset.category;
                this.toggleCategory(categoryId);
            }
        });
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase().trim();
        this.filterComponents();
        this.renderComponents();
    }

    filterComponents() {
        this.filteredComponents = Array.from(this.components.values()).filter(component => {
            // Filter by search query
            if (this.searchQuery) {
                const searchText = [
                    component.name,
                    component.description,
                    ...(component.tags || [])
                ].join(' ').toLowerCase();
                
                if (!searchText.includes(this.searchQuery)) {
                    return false;
                }
            }

            // Filter by active category
            if (this.activeCategory && component.category !== this.activeCategory) {
                return false;
            }

            return true;
        });
    }

    toggleCategory(categoryId) {
        const category = this.categories.get(categoryId);
        if (category) {
            category.expanded = !category.expanded;
            
            // Update DOM
            const header = document.querySelector(`[data-category="${categoryId}"]`);
            if (header) {
                header.setAttribute('aria-expanded', category.expanded);
            }
            
            this.renderCategoryComponents(categoryId);
        }
    }

    setActiveCategory(categoryId) {
        this.activeCategory = categoryId;
        this.filterComponents();
        this.renderComponents();
        
        // Update category buttons
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === categoryId);
        });
    }

    clearFilters() {
        this.searchQuery = '';
        this.activeCategory = null;
        
        // Clear search input
        const searchInput = document.getElementById('componentSearch');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Clear category filters
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        
        this.filterComponents();
        this.renderComponents();
    }

    renderComponents() {
        const componentsList = document.getElementById('componentsList');
        if (!componentsList) return;

        // Group components by category
        const groupedComponents = new Map();
        
        this.filteredComponents.forEach(component => {
            if (!groupedComponents.has(component.category)) {
                groupedComponents.set(component.category, []);
            }
            groupedComponents.get(component.category).push(component);
        });

        // Render categories and components
        componentsList.innerHTML = '';
        
        this.categories.forEach((category, categoryId) => {
            const categoryComponents = groupedComponents.get(categoryId) || [];
            
            if (categoryComponents.length > 0) {
                const categoryElement = this.createCategoryElement(category, categoryComponents);
                componentsList.appendChild(categoryElement);
            }
        });

        // Add drag and drop functionality
        this.setupDragAndDrop();
    }

    renderCategoryComponents(categoryId) {
        const categoryElement = document.querySelector(`[data-category="${categoryId}"]`)?.closest('.component-category');
        if (!categoryElement) return;

        const category = this.categories.get(categoryId);
        const categoryComponents = this.filteredComponents.filter(c => c.category === categoryId);

        const itemsContainer = categoryElement.querySelector('.category-items');
        itemsContainer.innerHTML = '';

        categoryComponents.forEach(component => {
            const componentElement = this.createComponentElement(component);
            itemsContainer.appendChild(componentElement);
        });

        // Re-setup drag and drop
        this.setupDragAndDrop();
    }

    createCategoryElement(category, components) {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'component-category';
        categoryElement.dataset.categoryId = category.id;

        categoryElement.innerHTML = `
            <div class="category-header" data-category="${category.id}" aria-expanded="${category.expanded}">
                <h4>
                    <span class="category-icon">${category.icon}</span>
                    ${category.name}
                </h4>
                <span class="category-toggle">▼</span>
            </div>
            <div class="category-items">
                ${components.map(component => this.createComponentElementHTML(component)).join('')}
            </div>
        `;

        return categoryElement;
    }

    createComponentElement(component) {
        const element = document.createElement('div');
        element.className = 'component-item';
        element.draggable = true;
        element.dataset.componentId = component.id;
        element.dataset.type = component.type;

        // Add additional dataset attributes
        if (component.content) element.dataset.content = component.content;
        if (component.level) element.dataset.level = component.level;
        if (component.src) element.dataset.src = component.src;
        if (component.alt) element.dataset.alt = component.alt;
        if (component.href) element.dataset.href = component.href;
        if (component.placeholder) element.dataset.placeholder = component.placeholder;
        if (component.class) element.dataset.class = component.class;

        element.innerHTML = this.createComponentElementHTML(component);

        return element;
    }

    createComponentElementHTML(component) {
        return `
            <span class="component-icon">${component.icon}</span>
            <div class="component-info">
                <div class="component-name">${component.name}</div>
                <div class="component-description">${component.description}</div>
                ${component.tags ? `
                    <div class="component-tags">
                        ${component.tags.map(tag => `<span class="component-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    setupDragAndDrop() {
        const componentItems = document.querySelectorAll('.component-item');
        
        componentItems.forEach(item => {
            // Remove existing listeners
            item.removeEventListener('dragstart', this.handleDragStart);
            item.removeEventListener('dragend', this.handleDragEnd);
            
            // Add new listeners
            item.addEventListener('dragstart', (e) => this.handleDragStart(e, item));
            item.addEventListener('dragend', (e) => this.handleDragEnd(e, item));
        });
    }

    handleDragStart(e, item) {
        const componentId = item.dataset.componentId;
        const component = this.components.get(componentId);
        
        if (!component) return;

        // Create drag data
        const dragData = {
            type: component.type,
            content: component.content || '',
            level: component.level,
            src: component.src || '',
            alt: component.alt || '',
            href: component.href || '',
            placeholder: component.placeholder || '',
            class: component.class || '',
            properties: this.getComponentProperties(component)
        };

        // Set drag data
        e.dataTransfer.setData('application/html-builder', JSON.stringify(dragData));
        e.dataTransfer.setData('text/plain', 'html-builder-component');
        
        // Add dragging class
        item.classList.add('dragging');
        
        // Set drag effect
        e.dataTransfer.effectAllowed = 'copy';
    }

    handleDragEnd(e, item) {
        item.classList.remove('dragging');
    }

    getComponentProperties(component) {
        const type = component.type;
        
        const propertyMap = {
            heading: () => ({
                level: component.level || 1,
                content: component.content || 'Título',
                color: '#000000',
                fontWeight: 'bold',
                margin: '16px 0'
            }),
            text: () => ({
                content: component.content || 'Texto de exemplo',
                color: '#000000',
                fontSize: '16px',
                lineHeight: '1.6',
                margin: '8px 0'
            }),
            span: () => ({
                content: component.content || 'Texto em linha',
                color: '#000000',
                fontSize: '16px'
            }),
            button: () => ({
                content: component.content || 'Clique aqui',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '16px',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
            }),
            link: () => ({
                content: component.content || 'Link de exemplo',
                href: component.href || '#',
                color: '#3b82f6',
                textDecoration: 'underline'
            }),
            image: () => ({
                src: component.src || 'https://via.placeholder.com/300x200',
                alt: component.alt || 'Imagem',
                width: '300px',
                height: '200px',
                display: 'block',
                margin: '16px 0'
            }),
            container: () => ({
                class: 'container',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px'
            }),
            section: () => ({
                class: 'section',
                padding: '40px 20px',
                backgroundColor: '#f8fafc',
                margin: '20px 0'
            }),
            div: () => ({
                class: 'custom-div',
                padding: '16px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                margin: '8px 0'
            }),
            card: () => ({
                class: 'card',
                padding: '24px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                margin: '16px 0'
            }),
            input: () => ({
                placeholder: component.placeholder || 'Digite aqui...',
                padding: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '14px',
                borderRadius: '6px',
                width: '100%'
            }),
            textarea: () => ({
                placeholder: component.placeholder || 'Mensagem...',
                padding: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '14px',
                borderRadius: '6px',
                width: '100%',
                minHeight: '100px',
                resize: 'vertical'
            }),
            form: () => ({
                class: 'form',
                padding: '24px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
            }),
            ul: () => ({
                content: component.content || 'Item 1\nItem 2\nItem 3',
                margin: '16px 0',
                paddingLeft: '24px'
            }),
            ol: () => ({
                content: component.content || 'Primeiro\nSegundo\nTerceiro',
                margin: '16px 0',
                paddingLeft: '24px'
            })
        };
        
        return propertyMap[type] ? propertyMap[type]() : {};
    }

    // Public API
    getComponent(id) {
        return this.components.get(id);
    }

    getComponentsByCategory(categoryId) {
        return Array.from(this.components.values()).filter(c => c.category === categoryId);
    }

    getAllComponents() {
        return Array.from(this.components.values());
    }

    getCategories() {
        return Array.from(this.categories.values());
    }

    getFilteredComponents() {
        return [...this.filteredComponents];
    }

    addCustomComponent(id, component) {
        this.addComponent(id, component);
        this.filterComponents();
        this.renderComponents();
    }

    removeComponent(id) {
        this.components.delete(id);
        this.filterComponents();
        this.renderComponents();
    }

    searchComponents(query) {
        this.searchQuery = query.toLowerCase().trim();
        this.filterComponents();
        return this.filteredComponents;
    }

    // Utility methods
    getComponentByType(type) {
        return Array.from(this.components.values()).filter(c => c.type === type);
    }

    getComponentsByTag(tag) {
        return Array.from(this.components.values()).filter(c => 
            c.tags && c.tags.includes(tag.toLowerCase())
        );
    }

    getPopularComponents(limit = 5) {
        // This would be based on usage analytics in a real implementation
        const popularIds = ['text-paragraph', 'interactive-button', 'layout-container', 'media-image', 'form-input'];
        return popularIds.map(id => this.components.get(id)).filter(Boolean);
    }

    getRecentlyAdded() {
        return Array.from(this.components.values())
            .sort((a, b) => b.created - a.created)
            .slice(0, 5);
    }
}

// Export for global access
window.ComponentLibrary = ComponentLibrary;