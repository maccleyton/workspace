/**
 * Construtor de Páginas HTML - Main Script
 * Aplicação completa de criação visual de páginas web
 */

// Global application state
window.HTMLBuilder = {
    currentProject: {
        id: generateId(),
        name: 'Minha Página HTML',
        elements: [],
        styles: {},
        settings: {}
    },
    selectedElement: null,
    isInitialized: false,
    history: [],
    historyIndex: -1,
    clipboard: null
};

/**
 * Main Application Initialization
 */
class HTMLBuilderApp {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvasWrapper = document.getElementById('canvasWrapper');
        this.projectTitle = document.getElementById('projectTitle');
        this.selectedElement = null;
        this.isDragging = false;
        this.isZoomed = false;
        this.zoomLevel = 1;
        
        this.init();
    }

    async init() {
        try {
            // Show loading
            this.showLoading('Inicializando Construtor de Páginas...');
            
            // Initialize modules
            await this.initializeModules();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();
            
            // Initialize drag and drop
            this.initializeDragDrop();
            
            // Setup modal managers
            this.initializeModals();
            
            // Check hub integration
            await this.checkHubIntegration();
            
            // Load or create new project
            this.createNewProject();
            
            this.isInitialized = true;
            this.hideLoading();
            
            // Show success notification
            this.showNotification('Construtor de Páginas inicializado com sucesso!', 'success');
            
            console.log('🎨 HTML Builder initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize HTML Builder:', error);
            this.hideLoading();
            this.showNotification('Erro ao inicializar o construtor: ' + error.message, 'error');
        }
    }

    async initializeModules() {
        // Initialize modules in order
        try {
            // Canvas Manager
            if (window.CanvasManager) {
                this.canvasManager = new window.CanvasManager(this);
                window.CanvasManagerInstance = this.canvasManager;
            }
            
            // Component Library
            if (window.ComponentLibrary) {
                this.componentLibrary = new window.ComponentLibrary(this);
                window.ComponentLibraryInstance = this.componentLibrary;
            }
            
            // Drag and Drop Manager
            if (window.DragDropManager) {
                this.dragDropManager = new window.DragDropManager(this);
                window.DragDropManagerInstance = this.dragDropManager;
            }
            
            // Property Panel
            if (window.PropertyPanel) {
                this.propertyPanel = new window.PropertyPanel(this);
                window.PropertyPanelInstance = this.propertyPanel;
            }
            
            // Export Manager
            if (window.ExportManager) {
                this.exportManager = new window.ExportManager(this);
                window.ExportManagerInstance = this.exportManager;
            }
            
            // Modal Manager
            if (window.ModalManager) {
                this.modalManager = new window.ModalManager(this);
                window.ModalManagerInstance = this.modalManager;
            }
            
            console.log('✅ All modules initialized successfully');
        } catch (error) {
            console.error('Error initializing modules:', error);
            throw error;
        }
    }

    setupEventListeners() {
        // Canvas interactions
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('contextmenu', (e) => this.handleCanvasContextMenu(e));
        
        // Project title changes
        this.projectTitle.addEventListener('input', (e) => {
            window.HTMLBuilder.currentProject.name = e.target.value;
            this.saveToHistory();
        });
        
        // Window resize
        window.addEventListener('resize', () => this.handleWindowResize());
        
        // Global shortcuts
        document.addEventListener('keydown', (e) => this.handleGlobalKeydown(e));
    }

    setupKeyboardShortcuts() {
        const shortcuts = {
            'Ctrl+S': () => this.saveProject(),
            'Ctrl+N': () => this.createNewProject(),
            'Ctrl+Z': () => this.undo(),
            'Ctrl+Y': () => this.redo(),
            'Ctrl+C': () => this.copyElement(),
            'Ctrl+V': () => this.pasteElement(),
            'Delete': () => this.deleteSelectedElement(),
            'Escape': () => this.clearSelection(),
            'Ctrl+D': () => this.duplicateSelectedElement(),
            'Ctrl+E': () => this.exportProject(),
            'F11': (e) => {
                e.preventDefault();
                this.toggleFullscreen();
            }
        };

        // Store shortcuts for access by other modules
        window.HTMLBuilder.shortcuts = shortcuts;
    }

    initializeDragDrop() {
        // Canvas drop zone
        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.highlightDropZone();
        });
        
        this.canvas.addEventListener('dragleave', () => {
            this.removeDropZoneHighlight();
        });
        
        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            this.removeDropZoneHighlight();
            this.handleCanvasDrop(e);
        });
    }

    initializeModals() {
        // Export modal
        const exportBtn = document.getElementById('exportHtml');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.openExportModal());
        }

        // Preview modal  
        const previewBtn = document.getElementById('previewBtn');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => this.openPreviewModal());
        }

        // Save to hub modal
        const saveToHubBtn = document.getElementById('saveToHub');
        if (saveToHubBtn) {
            saveToHubBtn.addEventListener('click', () => this.openSaveToHubModal());
        }

        // New project
        const newProjectBtn = document.getElementById('newProject');
        if (newProjectBtn) {
            newProjectBtn.addEventListener('click', () => this.createNewProject());
        }
    }

    async checkHubIntegration() {
        // Check if hub integration is available
        if (window.hubIntegration) {
            this.hasHubIntegration = true;
            console.log('✅ Hub integration available');
        } else {
            this.hasHubIntegration = false;
            console.warn('⚠️ Hub integration not available');
        }
    }

    createNewProject() {
        if (window.HTMLBuilder.currentProject.elements.length > 0) {
            if (!confirm('Criar um novo projeto? As alterações não salvas serão perdidas.')) {
                return;
            }
        }

        // Reset project
        window.HTMLBuilder.currentProject = {
            id: generateId(),
            name: 'Minha Página HTML',
            elements: [],
            styles: {},
            settings: {}
        };

        // Clear canvas
        this.canvas.innerHTML = `
            <div class="canvas-placeholder" id="canvasPlaceholder">
                <div class="placeholder-content">
                    <h3>🎨 Arraste componentes aqui</h3>
                    <p>Selecione componentes na lateral esquerda e arraste para o canvas para começar a construir sua página</p>
                </div>
            </div>
        `;

        // Reset UI
        this.projectTitle.value = window.HTMLBuilder.currentProject.name;
        this.selectedElement = null;
        this.zoomLevel = 1;
        this.updateZoomDisplay();
        this.clearHistory();
        this.saveToHistory();

        // Clear properties panel
        this.clearPropertiesPanel();

        this.showNotification('Novo projeto criado!', 'info');
    }

    // Canvas interaction methods
    handleCanvasClick(e) {
        // Clear selection if clicking on canvas
        if (e.target === this.canvas) {
            this.clearSelection();
            return;
        }

        // Find closest canvas element
        const element = e.target.closest('.canvas-element');
        if (element) {
            this.selectElement(element);
        }
    }

    handleCanvasContextMenu(e) {
        e.preventDefault();
        
        if (this.selectedElement) {
            this.showContextMenu(e.pageX, e.pageY);
        }
    }

    handleCanvasDrop(e) {
        const data = e.dataTransfer.getData('application/html-builder');
        if (!data) return;

        try {
            const componentData = JSON.parse(data);
            this.createElementFromComponent(componentData, e.clientX, e.clientY);
        } catch (error) {
            console.error('Error parsing dropped data:', error);
        }
    }

    createElementFromComponent(componentData, x, y) {
        // Generate unique ID for the element
        const elementId = generateId();
        
        // Create element object
        const element = {
            id: elementId,
            type: componentData.type,
            properties: this.getDefaultProperties(componentData.type),
            position: this.calculateDropPosition(x, y),
            ...componentData
        };

        // Add to project
        window.HTMLBuilder.currentProject.elements.push(element);
        
        // Create DOM element
        this.createDOMElement(element);
        
        // Select the new element
        this.selectElementById(elementId);
        
        // Save to history
        this.saveToHistory();
        
        this.showNotification('Componente adicionado!', 'success');
    }

    getDefaultProperties(type) {
        const defaults = {
            text: { color: '#000000', fontSize: '16px', fontWeight: 'normal' },
            heading: { color: '#000000', fontSize: '24px', fontWeight: 'bold' },
            button: { backgroundColor: '#2563eb', color: '#ffffff', fontSize: '16px' },
            link: { color: '#3b82f6', fontSize: '16px' },
            image: { width: '300px', height: '200px' },
            container: { padding: '20px', backgroundColor: '#ffffff' },
            section: { padding: '40px 20px', backgroundColor: '#f8fafc' },
            div: { padding: '16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' },
            card: { padding: '24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' },
            input: { padding: '12px', border: '1px solid #e2e8f0', fontSize: '14px' },
            textarea: { padding: '12px', border: '1px solid #e2e8f0', fontSize: '14px' },
            form: { padding: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' },
            ul: { margin: '16px 0', paddingLeft: '24px' },
            ol: { margin: '16px 0', paddingLeft: '24px' }
        };

        return defaults[type] || {};
    }

    calculateDropPosition(clientX, clientY) {
        const canvasRect = this.canvas.getBoundingClientRect();
        const zoom = this.zoomLevel;
        
        return {
            x: (clientX - canvasRect.left) / zoom,
            y: (clientY - canvasRect.top) / zoom
        };
    }

    createDOMElement(element) {
        const domElement = this.createElementByType(element);
        domElement.dataset.elementId = element.id;
        domElement.classList.add('canvas-element', 'new');
        
        // Position the element
        if (element.position) {
            domElement.style.position = 'relative';
            domElement.style.left = element.position.x + 'px';
            domElement.style.top = element.position.y + 'px';
        }
        
        // Apply properties
        this.applyPropertiesToElement(domElement, element.properties);
        
        // Add event listeners
        this.attachElementEventListeners(domElement);
        
        // Remove placeholder if exists
        const placeholder = document.getElementById('canvasPlaceholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        // Add to canvas
        this.canvas.appendChild(domElement);
        
        // Remove animation class after animation completes
        setTimeout(() => {
            domElement.classList.remove('new');
        }, 300);
    }

    createElementByType(element) {
        const { type, properties = {} } = element;
        
        const elementMap = {
            text: () => {
                const el = document.createElement('p');
                el.textContent = properties.content || 'Texto de exemplo';
                return el;
            },
            heading: () => {
                const level = properties.level || 1;
                const el = document.createElement(`h${level}`);
                el.textContent = properties.content || `Título ${level}`;
                return el;
            },
            span: () => {
                const el = document.createElement('span');
                el.textContent = properties.content || 'Texto em linha';
                return el;
            },
            button: () => {
                const el = document.createElement('button');
                el.textContent = properties.content || 'Clique aqui';
                el.className = 'btn btn-primary';
                return el;
            },
            link: () => {
                const el = document.createElement('a');
                el.textContent = properties.content || 'Link de exemplo';
                el.href = properties.href || '#';
                el.className = 'link';
                return el;
            },
            image: () => {
                const el = document.createElement('div');
                el.innerHTML = `<img src="${properties.src || 'https://via.placeholder.com/300x200'}" alt="${properties.alt || 'Imagem'}" style="max-width: 100%; height: auto;">`;
                return el;
            },
            container: () => {
                const el = document.createElement('div');
                el.className = 'container';
                el.textContent = 'Container';
                return el;
            },
            section: () => {
                const el = document.createElement('section');
                el.className = 'section';
                el.textContent = 'Seção de conteúdo';
                return el;
            },
            div: () => {
                const el = document.createElement('div');
                el.className = 'custom-div';
                el.textContent = 'Div personalizado';
                return el;
            },
            card: () => {
                const el = document.createElement('div');
                el.className = 'card';
                el.innerHTML = '<h3>Título do Card</h3><p>Conteúdo do card...</p>';
                return el;
            },
            input: () => {
                const el = document.createElement('input');
                el.type = 'text';
                el.placeholder = properties.placeholder || 'Digite aqui...';
                el.className = 'form-input';
                return el;
            },
            textarea: () => {
                const el = document.createElement('textarea');
                el.placeholder = properties.placeholder || 'Mensagem...';
                el.className = 'form-textarea';
                return el;
            },
            form: () => {
                const el = document.createElement('form');
                el.className = 'custom-form';
                el.innerHTML = `
                    <input type="text" placeholder="Nome" style="margin-bottom: 12px; width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px;">
                    <input type="email" placeholder="Email" style="margin-bottom: 12px; width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px;">
                    <button type="submit" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">Enviar</button>
                `;
                return el;
            },
            ul: () => {
                const el = document.createElement('ul');
                const items = (properties.content || 'Item 1\nItem 2\nItem 3').split('\n');
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.trim();
                    el.appendChild(li);
                });
                return el;
            },
            ol: () => {
                const el = document.createElement('ol');
                const items = (properties.content || 'Primeiro\nSegundo\nTerceiro').split('\n');
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.trim();
                    el.appendChild(li);
                });
                return el;
            }
        };
        
        return elementMap[type] ? elementMap[type]() : this.createDefaultElement();
    }

    createDefaultElement() {
        const el = document.createElement('div');
        el.textContent = 'Elemento desconhecido';
        el.className = 'unknown-element';
        return el;
    }

    applyPropertiesToElement(element, properties) {
        Object.keys(properties).forEach(key => {
            const value = properties[key];
            const property = this.convertToCSSProperty(key);
            
            if (property === 'content') {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = value;
                } else {
                    element.textContent = value;
                }
            } else if (this.isValidCSSProperty(property)) {
                element.style[property] = value;
            }
        });
    }

    convertToCSSProperty(key) {
        const conversionMap = {
            'fontSize': 'fontSize',
            'fontWeight': 'fontWeight',
            'textAlign': 'textAlign',
            'backgroundColor': 'backgroundColor',
            'color': 'color',
            'width': 'width',
            'height': 'height',
            'padding': 'padding',
            'margin': 'margin',
            'border': 'border',
            'borderRadius': 'borderRadius',
            'content': 'content'
        };
        
        return conversionMap[key] || key;
    }

    isValidCSSProperty(property) {
        const element = document.createElement('div');
        return property in element.style;
    }

    attachElementEventListeners(element) {
        // Click to select
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectElement(element);
        });

        // Double click to edit content
        element.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            this.startContentEditing(element);
        });

        // Drag to move
        this.makeElementDraggable(element);
    }

    makeElementDraggable(element) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        element.addEventListener('mousedown', (e) => {
            if (e.target.closest('.resize-handle')) return; // Don't drag when resizing
            
            isDragging = true;
            const rect = element.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            initialX = rect.left - this.canvas.getBoundingClientRect().left;
            initialY = rect.top - this.canvas.getBoundingClientRect().top;
            
            element.classList.add('dragging');
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newX = initialX + (deltaX / this.zoomLevel);
            const newY = initialY + (deltaY / this.zoomLevel);
            
            element.style.left = newX + 'px';
            element.style.top = newY + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.classList.remove('dragging');
                
                // Update element position in project
                const elementId = element.dataset.elementId;
                const projectElement = window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
                if (projectElement) {
                    projectElement.position = {
                        x: parseInt(element.style.left) || 0,
                        y: parseInt(element.style.top) || 0
                    };
                    this.saveToHistory();
                }
            }
        });
    }

    selectElement(element) {
        // Clear previous selection
        this.clearSelection();
        
        // Select new element
        this.selectedElement = element;
        element.classList.add('selected');
        
        // Update properties panel
        this.updatePropertiesPanel(element);
    }

    selectElementById(elementId) {
        const element = this.canvas.querySelector(`[data-element-id="${elementId}"]`);
        if (element) {
            this.selectElement(element);
        }
    }

    clearSelection() {
        if (this.selectedElement) {
            this.selectedElement.classList.remove('selected');
        }
        this.selectedElement = null;
        this.clearPropertiesPanel();
    }

    updatePropertiesPanel(element) {
        // This will be implemented by PropertyPanel module
        if (window.PropertyPanel) {
            window.PropertyPanel.updateForElement(element);
        }
    }

    clearPropertiesPanel() {
        // This will be implemented by PropertyPanel module
        if (window.PropertyPanel) {
            window.PropertyPanel.clear();
        }
    }

    startContentEditing(element) {
        const elementId = element.dataset.elementId;
        const projectElement = window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
        
        if (!projectElement) return;
        
        const contentEditable = element.contentEditable === 'true';
        
        if (contentEditable) {
            element.contentEditable = 'false';
            element.classList.remove('content-editing');
            
            // Update project data
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                projectElement.properties.content = element.placeholder;
            } else {
                projectElement.properties.content = element.textContent;
            }
            
            this.saveToHistory();
        } else {
            element.contentEditable = 'true';
            element.classList.add('content-editing');
            element.focus();
            
            // Select all text
            if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA') {
                const range = document.createRange();
                range.selectNodeContents(element);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    // History management
    saveToHistory() {
        const currentState = JSON.stringify(window.HTMLBuilder.currentProject);
        
        // Remove any future history
        window.HTMLBuilder.history = window.HTMLBuilder.history.slice(0, window.HTMLBuilder.historyIndex + 1);
        
        // Add current state
        window.HTMLBuilder.history.push(currentState);
        window.HTMLBuilder.historyIndex++;
        
        // Limit history size
        if (window.HTMLBuilder.history.length > 50) {
            window.HTMLBuilder.history.shift();
            window.HTMLBuilder.historyIndex--;
        }
    }

    clearHistory() {
        window.HTMLBuilder.history = [];
        window.HTMLBuilder.historyIndex = -1;
    }

    undo() {
        if (window.HTMLBuilder.historyIndex > 0) {
            window.HTMLBuilder.historyIndex--;
            const state = window.HTMLBuilder.history[window.HTMLBuilder.historyIndex];
            window.HTMLBuilder.currentProject = JSON.parse(state);
            this.renderProject();
            this.showNotification('Desfeito', 'info');
        }
    }

    redo() {
        if (window.HTMLBuilder.historyIndex < window.HTMLBuilder.history.length - 1) {
            window.HTMLBuilder.historyIndex++;
            const state = window.HTMLBuilder.history[window.HTMLBuilder.historyIndex];
            window.HTMLBuilder.currentProject = JSON.parse(state);
            this.renderProject();
            this.showNotification('Refeito', 'info');
        }
    }

    renderProject() {
        // Clear canvas
        this.canvas.innerHTML = '';
        
        // Render all elements
        window.HTMLBuilder.currentProject.elements.forEach(element => {
            this.createDOMElement(element);
        });
        
        // Show placeholder if no elements
        if (window.HTMLBuilder.currentProject.elements.length === 0) {
            this.canvas.innerHTML = `
                <div class="canvas-placeholder" id="canvasPlaceholder">
                    <div class="placeholder-content">
                        <h3>🎨 Arraste componentes aqui</h3>
                        <p>Selecione componentes na lateral esquerda e arraste para o canvas para começar a construir sua página</p>
                    </div>
                </div>
            `;
        }
        
        // Update project title
        this.projectTitle.value = window.HTMLBuilder.currentProject.name;
    }

    // Element management
    copyElement() {
        if (!this.selectedElement) return;
        
        const elementId = this.selectedElement.dataset.elementId;
        const projectElement = window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
        
        if (projectElement) {
            window.HTMLBuilder.clipboard = JSON.parse(JSON.stringify(projectElement));
            this.showNotification('Elemento copiado!', 'info');
        }
    }

    pasteElement() {
        if (!window.HTMLBuilder.clipboard) return;
        
        const clipboardElement = window.HTMLBuilder.clipboard;
        const newElement = {
            ...clipboardElement,
            id: generateId(),
            position: {
                x: (clipboardElement.position?.x || 0) + 20,
                y: (clipboardElement.position?.y || 0) + 20
            }
        };
        
        window.HTMLBuilder.currentProject.elements.push(newElement);
        this.createDOMElement(newElement);
        this.selectElementById(newElement.id);
        this.saveToHistory();
        
        this.showNotification('Elemento colado!', 'success');
    }

    duplicateSelectedElement() {
        if (!this.selectedElement) return;
        
        this.copyElement();
        this.pasteElement();
    }

    deleteSelectedElement() {
        if (!this.selectedElement) return;
        
        const elementId = this.selectedElement.dataset.elementId;
        
        // Remove from project
        window.HTMLBuilder.currentProject.elements = window.HTMLBuilder.currentProject.elements.filter(
            el => el.id !== elementId
        );
        
        // Remove from DOM
        this.selectedElement.remove();
        this.selectedElement = null;
        
        this.saveToHistory();
        this.clearPropertiesPanel();
        
        this.showNotification('Elemento removido!', 'info');
    }

    // Export methods
    openExportModal() {
        if (this.modalManager) {
            this.modalManager.openModal('export');
        }
    }

    openPreviewModal() {
        if (this.modalManager) {
            this.modalManager.openModal('preview');
        }
    }

    openSaveToHubModal() {
        if (this.modalManager) {
            this.modalManager.openModal('saveToHub');
        }
    }

    exportProject() {
        this.openExportModal();
    }

    saveProject() {
        // Auto-save to localStorage
        const projectData = JSON.stringify(window.HTMLBuilder.currentProject);
        localStorage.setItem('html-builder-project', projectData);
        this.showNotification('Projeto salvo automaticamente!', 'success');
    }

    // Hub integration
    async saveToHub(projectName, description, tags) {
        if (!this.hasHubIntegration) {
            this.showNotification('Integração com Hub não disponível', 'error');
            return;
        }
        
        try {
            const documentData = {
                title: projectName || window.HTMLBuilder.currentProject.name,
                content: this.generateHTML(),
                metadata: {
                    type: 'html-page',
                    description: description || '',
                    tags: tags || [],
                    created: new Date().toISOString(),
                    projectData: window.HTMLBuilder.currentProject
                }
            };
            
            await window.hubIntegration.saveToHub(documentData);
            this.showNotification('Projeto salvo no Hub com sucesso!', 'success');
            
        } catch (error) {
            console.error('Error saving to hub:', error);
            this.showNotification('Erro ao salvar no Hub: ' + error.message, 'error');
        }
    }

    generateHTML() {
        if (this.exportManager) {
            return this.exportManager.generateHTML(window.HTMLBuilder.currentProject);
        }
        
        // Fallback HTML generation
        return '<!DOCTYPE html><html><head><title>Generated Page</title></head><body><h1>Página gerada pelo Construtor HTML</h1></body></html>';
    }

    // UI utilities
    updateZoomDisplay() {
        const zoomDisplay = document.getElementById('zoomLevel');
        if (zoomDisplay) {
            zoomDisplay.textContent = Math.round(this.zoomLevel * 100) + '%';
        }
    }

    handleWindowResize() {
        // Adjust canvas if needed
        this.updateCanvasSize();
    }

    updateCanvasSize() {
        // Canvas sizing logic
        const wrapperWidth = this.canvasWrapper.clientWidth;
        this.canvas.style.width = Math.max(wrapperWidth - 40, 800) + 'px';
    }

    // Utility methods
    highlightDropZone() {
        this.canvas.classList.add('drop-active');
    }

    removeDropZoneHighlight() {
        this.canvas.classList.remove('drop-active');
    }

    showContextMenu(x, y) {
        // Context menu will be implemented
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    handleGlobalKeydown(e) {
        const shortcuts = window.HTMLBuilder.shortcuts;
        const key = this.getShortcutKey(e);
        
        if (shortcuts[key]) {
            e.preventDefault();
            shortcuts[key]();
        }
    }

    getShortcutKey(e) {
        const parts = [];
        if (e.ctrlKey) parts.push('Ctrl');
        if (e.altKey) parts.push('Alt');
        if (e.shiftKey) parts.push('Shift');
        parts.push(e.key);
        return parts.join('+');
    }

    showNotification(message, type = 'info') {
        // Notification system
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${this.getNotificationIcon(type)}</div>
                <div class="notification-message">${message}</div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    showLoading(message = 'Carregando...') {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('show');
            const messageEl = overlay.querySelector('p');
            if (messageEl) {
                messageEl.textContent = message;
            }
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }
}

// Utility function to generate unique IDs
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.htmlBuilderApp = new HTMLBuilderApp();
});