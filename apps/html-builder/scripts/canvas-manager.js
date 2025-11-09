/**
 * Canvas Manager - Gerencia operações do canvas de construção
 * Responsável por elementos, posicionamento, seleção e manipulação visual
 */

class CanvasManager {
    constructor(app) {
        this.app = app;
        this.canvas = document.getElementById('canvas');
        this.canvasWrapper = document.getElementById('canvasWrapper');
        this.selectedElements = new Set();
        this.isSelecting = false;
        this.selectionStart = null;
        this.zoomLevel = 1;
        this.gridEnabled = true;
        this.gridSize = 20;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupZoomControls();
        this.setupKeyboardNavigation();
        this.setupGridSystem();
    }

    setupEventListeners() {
        // Canvas interactions
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('dblclick', (e) => this.handleCanvasDoubleClick(e));
        this.canvas.addEventListener('contextmenu', (e) => this.handleContextMenu(e));
        
        // Drag and drop
        this.canvas.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.canvas.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.canvas.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Mouse events for selection
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Resize observer
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(() => this.handleCanvasResize());
            resizeObserver.observe(this.canvasWrapper);
        }
    }

    setupZoomControls() {
        const zoomInBtn = document.getElementById('zoomIn');
        const zoomOutBtn = document.getElementById('zoomOut');
        const resetZoomBtn = document.getElementById('resetZoom');
        const fitToWidthBtn = document.getElementById('fitToWidth');

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => this.zoomIn());
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => this.zoomOut());
        }

        if (resetZoomBtn) {
            resetZoomBtn.addEventListener('click', () => this.resetZoom());
        }

        if (fitToWidthBtn) {
            fitToWidthBtn.addEventListener('click', () => this.fitToWidth());
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    setupGridSystem() {
        this.updateGridBackground();
    }

    updateGridBackground() {
        if (this.gridEnabled) {
            this.canvasWrapper.style.backgroundImage = `
                linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)
            `;
            this.canvasWrapper.style.backgroundSize = `${this.gridSize}px ${this.gridSize}px`;
        } else {
            this.canvasWrapper.style.backgroundImage = 'none';
        }
    }

    // Element Management
    addElement(elementData, position = { x: 0, y: 0 }) {
        const element = this.createElement(elementData, position);
        
        // Add to project
        window.HTMLBuilder.currentProject.elements.push(element);
        
        // Create DOM element
        const domElement = this.renderElement(element);
        
        // Add to canvas
        this.canvas.appendChild(domElement);
        
        // Select the new element
        this.selectElement(domElement);
        
        // Animate entry
        this.animateElementEntry(domElement);
        
        return domElement;
    }

    createElement(elementData, position) {
        const element = {
            id: this.generateElementId(),
            type: elementData.type,
            properties: { ...this.getDefaultProperties(elementData.type), ...elementData.properties },
            position: position,
            classes: elementData.classes || [],
            data: elementData.data || {}
        };

        return element;
    }

    renderElement(element) {
        const domElement = this.createDOMElement(element);
        
        // Apply properties
        this.applyElementProperties(domElement, element);
        
        // Apply position
        this.positionElement(domElement, element.position);
        
        // Add event listeners
        this.attachElementEvents(domElement, element);
        
        // Add selection handles
        this.addSelectionHandles(domElement);
        
        return domElement;
    }

    createDOMElement(element) {
        const { type, properties } = element;
        
        const elementFactories = {
            text: () => this.createTextElement(properties),
            heading: () => this.createHeadingElement(properties),
            span: () => this.createSpanElement(properties),
            button: () => this.createButtonElement(properties),
            link: () => this.createLinkElement(properties),
            image: () => this.createImageElement(properties),
            container: () => this.createContainerElement(properties),
            section: () => this.createSectionElement(properties),
            div: () => this.createDivElement(properties),
            card: () => this.createCardElement(properties),
            input: () => this.createInputElement(properties),
            textarea: () => this.createTextareaElement(properties),
            form: () => this.createFormElement(properties),
            ul: () => this.createListElement(properties, 'ul'),
            ol: () => this.createListElement(properties, 'ol')
        };

        const factory = elementFactories[type];
        const elementNode = factory ? factory() : this.createDefaultElement();

        // Add base classes
        elementNode.classList.add('canvas-element');
        elementNode.dataset.elementId = element.id;
        elementNode.dataset.elementType = type;

        return elementNode;
    }

    // Element Factory Methods
    createTextElement(properties) {
        const el = document.createElement('p');
        el.textContent = properties.content || 'Texto de exemplo';
        return el;
    }

    createHeadingElement(properties) {
        const level = properties.level || 1;
        const el = document.createElement(`h${level}`);
        el.textContent = properties.content || `Título ${level}`;
        return el;
    }

    createSpanElement(properties) {
        const el = document.createElement('span');
        el.textContent = properties.content || 'Texto em linha';
        return el;
    }

    createButtonElement(properties) {
        const el = document.createElement('button');
        el.textContent = properties.content || 'Clique aqui';
        el.classList.add('btn', 'btn-primary');
        return el;
    }

    createLinkElement(properties) {
        const el = document.createElement('a');
        el.textContent = properties.content || 'Link de exemplo';
        el.href = properties.href || '#';
        return el;
    }

    createImageElement(properties) {
        const el = document.createElement('div');
        const img = document.createElement('img');
        img.src = properties.src || 'https://via.placeholder.com/300x200';
        img.alt = properties.alt || 'Imagem';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        el.appendChild(img);
        return el;
    }

    createContainerElement(properties) {
        const el = document.createElement('div');
        el.classList.add('container');
        el.textContent = 'Container';
        return el;
    }

    createSectionElement(properties) {
        const el = document.createElement('section');
        el.classList.add('section');
        el.textContent = 'Seção de conteúdo';
        return el;
    }

    createDivElement(properties) {
        const el = document.createElement('div');
        el.classList.add('custom-div');
        el.textContent = 'Div personalizado';
        return el;
    }

    createCardElement(properties) {
        const el = document.createElement('div');
        el.classList.add('card');
        el.innerHTML = `
            <h3>Título do Card</h3>
            <p>Conteúdo do card...</p>
        `;
        return el;
    }

    createInputElement(properties) {
        const el = document.createElement('input');
        el.type = 'text';
        el.placeholder = properties.placeholder || 'Digite aqui...';
        el.classList.add('form-input');
        return el;
    }

    createTextareaElement(properties) {
        const el = document.createElement('textarea');
        el.placeholder = properties.placeholder || 'Mensagem...';
        el.classList.add('form-textarea');
        return el;
    }

    createFormElement(properties) {
        const el = document.createElement('form');
        el.classList.add('custom-form');
        el.innerHTML = `
            <div style="margin-bottom: 12px;">
                <input type="text" placeholder="Nome" style="width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 12px;">
                <input type="email" placeholder="Email" style="width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px;">
            </div>
            <button type="submit" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Enviar
            </button>
        `;
        return el;
    }

    createListElement(properties, type) {
        const el = document.createElement(type);
        const items = (properties.content || 'Item 1\nItem 2\nItem 3').split('\n');
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.trim();
            el.appendChild(li);
        });
        return el;
    }

    createDefaultElement() {
        const el = document.createElement('div');
        el.textContent = 'Elemento desconhecido';
        el.classList.add('unknown-element');
        return el;
    }

    getDefaultProperties(type) {
        const defaults = {
            text: { color: '#000000', fontSize: '16px', fontWeight: 'normal', margin: '8px 0' },
            heading: { color: '#000000', fontWeight: 'bold', margin: '16px 0' },
            span: { color: '#000000', fontSize: '16px' },
            button: { 
                backgroundColor: '#2563eb', 
                color: '#ffffff', 
                fontSize: '16px', 
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
            },
            link: { color: '#3b82f6', textDecoration: 'underline' },
            image: { width: '300px', height: '200px', display: 'block', margin: '16px 0' },
            container: { 
                maxWidth: '1200px', 
                margin: '0 auto', 
                padding: '20px',
                backgroundColor: 'transparent'
            },
            section: { 
                padding: '40px 20px', 
                backgroundColor: '#f8fafc',
                margin: '20px 0'
            },
            div: { 
                padding: '16px', 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                margin: '8px 0'
            },
            card: { 
                padding: '24px', 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                margin: '16px 0'
            },
            input: { 
                padding: '12px', 
                border: '1px solid #e2e8f0', 
                fontSize: '14px',
                borderRadius: '6px',
                width: '100%'
            },
            textarea: { 
                padding: '12px', 
                border: '1px solid #e2e8f0', 
                fontSize: '14px',
                borderRadius: '6px',
                width: '100%',
                minHeight: '100px',
                resize: 'vertical'
            },
            form: { 
                padding: '24px', 
                backgroundColor: '#f8fafc', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
            },
            ul: { margin: '16px 0', paddingLeft: '24px' },
            ol: { margin: '16px 0', paddingLeft: '24px' }
        };

        return defaults[type] || {};
    }

    applyElementProperties(element, elementData) {
        const { properties } = elementData;
        
        Object.keys(properties).forEach(key => {
            const value = properties[key];
            
            if (key === 'content') {
                this.setElementContent(element, value);
            } else if (key === 'level') {
                // Handle heading level changes
                if (elementData.type === 'heading') {
                    this.changeHeadingLevel(element, value);
                }
            } else {
                this.setElementStyle(element, key, value);
            }
        });
    }

    setElementContent(element, content) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = content;
        } else if (element.tagName === 'UL' || element.tagName === 'OL') {
            element.innerHTML = '';
            const items = content.split('\n');
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.trim();
                element.appendChild(li);
            });
        } else {
            element.textContent = content;
        }
    }

    changeHeadingLevel(element, level) {
        const currentText = element.textContent;
        const newElement = document.createElement(`h${level}`);
        newElement.textContent = currentText;
        newElement.className = element.className;
        newElement.dataset.elementId = element.dataset.elementId;
        newElement.dataset.elementType = element.dataset.elementType;
        element.parentNode.replaceChild(newElement, element);
    }

    setElementStyle(element, property, value) {
        const styleProperty = this.camelToKebab(property);
        
        if (styleProperty === 'backgroundColor') {
            element.style.backgroundColor = value;
        } else if (styleProperty === 'fontSize' || styleProperty === 'fontWeight') {
            element.style[styleProperty] = value;
        } else {
            element.style[styleProperty] = value;
        }
    }

    camelToKebab(str) {
        return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    }

    positionElement(element, position) {
        element.style.position = 'relative';
        element.style.left = (position?.x || 0) + 'px';
        element.style.top = (position?.y || 0) + 'px';
    }

    attachElementEvents(element, elementData) {
        // Click to select
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.ctrlKey || e.metaKey) {
                this.toggleElementSelection(element);
            } else {
                this.selectElement(element);
            }
        });

        // Double click to edit content
        element.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            this.startContentEditing(element);
        });

        // Context menu
        element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showElementContextMenu(e, element);
        });

        // Make draggable
        this.makeElementDraggable(element);

        // Make resizable
        this.makeElementResizable(element);
    }

    makeElementDraggable(element) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        const handle = element.querySelector('.element-handle') || element;

        handle.addEventListener('mousedown', (e) => {
            if (e.target.closest('.resize-handle')) return;
            
            isDragging = true;
            const rect = element.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            initialX = parseInt(element.style.left) || 0;
            initialY = parseInt(element.style.top) || 0;
            
            element.classList.add('dragging');
            this.canvas.classList.add('dragging-elements');
            
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            let newX = initialX + (deltaX / this.zoomLevel);
            let newY = initialY + (deltaY / this.zoomLevel);
            
            // Snap to grid if enabled
            if (this.gridEnabled) {
                newX = Math.round(newX / this.gridSize) * this.gridSize;
                newY = Math.round(newY / this.gridSize) * this.gridSize;
            }
            
            element.style.left = newX + 'px';
            element.style.top = newY + 'px';
            
            this.updateElementPosition(element, { x: newX, y: newY });
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.classList.remove('dragging');
                this.canvas.classList.remove('dragging-elements');
                
                // Save to history
                this.app.saveToHistory();
            }
        });
    }

    makeElementResizable(element) {
        const directions = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
        
        directions.forEach(direction => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${direction}`;
            handle.dataset.direction = direction;
            element.appendChild(handle);
            
            this.attachResizeHandle(handle, element, direction);
        });
    }

    attachResizeHandle(handle, element, direction) {
        let isResizing = false;
        let startX, startY, initialWidth, initialHeight, initialLeft, initialTop;

        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = element.getBoundingClientRect();
            const canvasRect = this.canvas.getBoundingClientRect();
            
            initialWidth = rect.width;
            initialHeight = rect.height;
            initialLeft = parseInt(element.style.left) || 0;
            initialTop = parseInt(element.style.top) || 0;
            
            element.classList.add('resizing');
            
            e.preventDefault();
            e.stopPropagation();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            let newWidth = initialWidth;
            let newHeight = initialHeight;
            let newLeft = initialLeft;
            let newTop = initialTop;
            
            // Calculate new dimensions based on direction
            if (direction.includes('e')) {
                newWidth = Math.max(20, initialWidth + (deltaX / this.zoomLevel));
            }
            if (direction.includes('s')) {
                newHeight = Math.max(20, initialHeight + (deltaY / this.zoomLevel));
            }
            if (direction.includes('w')) {
                newWidth = Math.max(20, initialWidth - (deltaX / this.zoomLevel));
                newLeft = initialLeft + (deltaX / this.zoomLevel);
            }
            if (direction.includes('n')) {
                newHeight = Math.max(20, initialHeight - (deltaY / this.zoomLevel));
                newTop = initialTop + (deltaY / this.zoomLevel);
            }
            
            element.style.width = newWidth + 'px';
            element.style.height = newHeight + 'px';
            element.style.left = newLeft + 'px';
            element.style.top = newTop + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                element.classList.remove('resizing');
                
                // Update element data
                this.updateElementPosition(element, { 
                    x: parseInt(element.style.left) || 0, 
                    y: parseInt(element.style.top) || 0 
                });
                
                this.updateElementDimensions(element, {
                    width: element.style.width,
                    height: element.style.height
                });
                
                // Save to history
                this.app.saveToHistory();
            }
        });
    }

    addSelectionHandles(element) {
        const handle = document.createElement('div');
        handle.className = 'element-handle';
        handle.innerHTML = '⋮';
        element.appendChild(handle);
    }

    animateElementEntry(element) {
        element.classList.add('new');
        setTimeout(() => {
            element.classList.remove('new');
        }, 300);
    }

    // Selection Management
    selectElement(element, multiSelect = false) {
        if (!multiSelect) {
            this.clearSelection();
        }
        
        this.selectedElements.add(element);
        element.classList.add('selected');
        
        this.updatePropertiesPanel();
    }

    toggleElementSelection(element) {
        if (this.selectedElements.has(element)) {
            this.selectedElements.delete(element);
            element.classList.remove('selected');
        } else {
            this.selectedElements.add(element);
            element.classList.add('selected');
        }
        
        this.updatePropertiesPanel();
    }

    clearSelection() {
        this.selectedElements.forEach(element => {
            element.classList.remove('selected');
        });
        this.selectedElements.clear();
        
        this.app.selectedElement = null;
        this.updatePropertiesPanel();
    }

    getSelectedElements() {
        return Array.from(this.selectedElements);
    }

    getFirstSelectedElement() {
        return this.selectedElements.values().next().value || null;
    }

    // Properties Panel
    updatePropertiesPanel() {
        if (window.PropertyPanel) {
            const element = this.getFirstSelectedElement();
            if (element) {
                window.PropertyPanel.updateForElement(element);
            } else {
                window.PropertyPanel.clear();
            }
        }
    }

    // Content Editing
    startContentEditing(element) {
        const elementId = element.dataset.elementId;
        const projectElement = window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
        
        if (!projectElement) return;
        
        const contentEditable = element.contentEditable === 'true';
        
        if (contentEditable) {
            // Stop editing
            element.contentEditable = 'false';
            element.classList.remove('content-editing');
            
            // Update project data
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                projectElement.properties.content = element.placeholder;
            } else {
                projectElement.properties.content = element.textContent;
            }
            
            this.app.saveToHistory();
        } else {
            // Start editing
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

    // Event Handlers
    handleCanvasClick(e) {
        if (e.target === this.canvas) {
            this.clearSelection();
        }
    }

    handleCanvasDoubleClick(e) {
        if (e.target === this.canvas) {
            // Add new element at cursor position
            const rect = this.canvas.getBoundingClientRect();
            const position = {
                x: (e.clientX - rect.left) / this.zoomLevel,
                y: (e.clientY - rect.top) / this.zoomLevel
            };
            
            // This could open a quick add menu
            this.showQuickAddMenu(e.clientX, e.clientY, position);
        }
    }

    handleContextMenu(e) {
        e.preventDefault();
        
        if (e.target === this.canvas) {
            this.showCanvasContextMenu(e.clientX, e.clientY);
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        this.canvas.classList.add('drop-active');
    }

    handleDragLeave(e) {
        if (!this.canvas.contains(e.relatedTarget)) {
            this.canvas.classList.remove('drop-active');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        this.canvas.classList.remove('drop-active');
        
        const data = e.dataTransfer.getData('text/html-builder');
        if (!data) return;

        try {
            const componentData = JSON.parse(data);
            const rect = this.canvas.getBoundingClientRect();
            const position = {
                x: (e.clientX - rect.left) / this.zoomLevel,
                y: (e.clientY - rect.top) / this.zoomLevel
            };
            
            this.addElement(componentData, position);
        } catch (error) {
            console.error('Error parsing dropped data:', error);
        }
    }

    handleMouseDown(e) {
        if (e.target === this.canvas) {
            this.isSelecting = true;
            this.selectionStart = { x: e.clientX, y: e.clientY };
        }
    }

    handleMouseMove(e) {
        if (this.isSelecting && this.selectionStart) {
            this.updateSelectionBox(e);
        }
    }

    handleMouseUp(e) {
        if (this.isSelecting) {
            this.isSelecting = false;
            this.removeSelectionBox();
        }
    }

    handleCanvasResize() {
        this.updateCanvasDimensions();
    }

    handleKeyboardNavigation(e) {
        const selectedElement = this.getFirstSelectedElement();
        if (!selectedElement) return;

        const step = e.shiftKey ? 10 : 1;

        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.moveElement(selectedElement, 0, -step);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.moveElement(selectedElement, 0, step);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.moveElement(selectedElement, -step, 0);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.moveElement(selectedElement, step, 0);
                break;
            case 'Delete':
            case 'Backspace':
                e.preventDefault();
                this.deleteElement(selectedElement);
                break;
        }
    }

    // Element Movement
    moveElement(element, deltaX, deltaY) {
        const currentLeft = parseInt(element.style.left) || 0;
        const currentTop = parseInt(element.style.top) || 0;
        
        const newLeft = currentLeft + deltaX;
        const newTop = currentTop + deltaY;
        
        element.style.left = newLeft + 'px';
        element.style.top = newTop + 'px';
        
        this.updateElementPosition(element, { x: newLeft, y: newTop });
        this.app.saveToHistory();
    }

    updateElementPosition(element, position) {
        const elementId = element.dataset.elementId;
        const projectElement = window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
        if (projectElement) {
            projectElement.position = position;
        }
    }

    updateElementDimensions(element, dimensions) {
        const elementId = element.dataset.elementId;
        const projectElement = window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
        if (projectElement) {
            projectElement.properties = { ...projectElement.properties, ...dimensions };
        }
    }

    // Element Deletion
    deleteElement(element) {
        const elementId = element.dataset.elementId;
        
        // Remove from project
        window.HTMLBuilder.currentProject.elements = window.HTMLBuilder.currentProject.elements.filter(
            el => el.id !== elementId
        );
        
        // Remove from DOM
        element.remove();
        this.selectedElements.delete(element);
        
        this.app.saveToHistory();
        this.updatePropertiesPanel();
    }

    // Zoom Management
    zoomIn() {
        this.setZoom(this.zoomLevel + 0.1);
    }

    zoomOut() {
        this.setZoom(this.zoomLevel - 0.1);
    }

    resetZoom() {
        this.setZoom(1);
    }

    fitToWidth() {
        const canvasWidth = this.canvasWrapper.clientWidth;
        const contentWidth = this.canvas.scrollWidth;
        const zoomLevel = Math.min((canvasWidth - 40) / contentWidth, 1);
        this.setZoom(zoomLevel);
    }

    setZoom(level) {
        this.zoomLevel = Math.max(0.1, Math.min(3, level));
        this.canvas.style.transform = `scale(${this.zoomLevel})`;
        this.canvas.style.transformOrigin = 'top left';
        
        this.updateZoomDisplay();
    }

    updateZoomDisplay() {
        const zoomDisplay = document.getElementById('zoomLevel');
        if (zoomDisplay) {
            zoomDisplay.textContent = Math.round(this.zoomLevel * 100) + '%';
        }
    }

    updateCanvasDimensions() {
        const contentWidth = this.canvas.scrollWidth;
        const contentHeight = this.canvas.scrollHeight;
        
        this.canvas.style.width = Math.max(contentWidth, 800) + 'px';
        this.canvas.style.minHeight = contentHeight + 'px';
    }

    // Selection Box
    updateSelectionBox(e) {
        if (!this.selectionBox) {
            this.createSelectionBox();
        }
        
        const startX = this.selectionStart.x;
        const startY = this.selectionStart.y;
        const currentX = e.clientX;
        const currentY = e.clientY;
        
        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        
        this.selectionBox.style.left = left + 'px';
        this.selectionBox.style.top = top + 'px';
        this.selectionBox.style.width = width + 'px';
        this.selectionBox.style.height = height + 'px';
    }

    createSelectionBox() {
        this.selectionBox = document.createElement('div');
        this.selectionBox.className = 'selection-box';
        this.selectionBox.style.position = 'fixed';
        this.selectionBox.style.border = '1px dashed #2563eb';
        this.selectionBox.style.background = 'rgba(37, 99, 235, 0.1)';
        this.selectionBox.style.pointerEvents = 'none';
        this.selectionBox.style.zIndex = '1000';
        document.body.appendChild(this.selectionBox);
    }

    removeSelectionBox() {
        if (this.selectionBox) {
            this.selectionBox.remove();
            this.selectionBox = null;
        }
        this.selectionStart = null;
    }

    // Context Menus
    showElementContextMenu(x, y, element) {
        // Implement context menu for elements
        console.log('Show context menu for element:', element);
    }

    showCanvasContextMenu(x, y) {
        // Implement context menu for canvas
        console.log('Show context menu for canvas at:', x, y);
    }

    showQuickAddMenu(x, y, position) {
        // Implement quick add menu
        console.log('Show quick add menu at:', x, y, position);
    }

    // Utility Methods
    generateElementId() {
        return 'element_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }

    getElementData(element) {
        const elementId = element.dataset.elementId;
        return window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
    }

    refreshCanvas() {
        // Re-render all elements
        this.canvas.innerHTML = '';
        
        window.HTMLBuilder.currentProject.elements.forEach(element => {
            this.renderElement(element);
        });
    }

    exportCanvasState() {
        return {
            elements: window.HTMLBuilder.currentProject.elements,
            zoomLevel: this.zoomLevel,
            gridEnabled: this.gridEnabled,
            gridSize: this.gridSize
        };
    }

    importCanvasState(state) {
        this.zoomLevel = state.zoomLevel || 1;
        this.gridEnabled = state.gridEnabled !== false;
        this.gridSize = state.gridSize || 20;
        
        this.setZoom(this.zoomLevel);
        this.updateGridBackground();
        
        window.HTMLBuilder.currentProject.elements = state.elements || [];
        this.refreshCanvas();
    }
}

// Export for global access
window.CanvasManager = CanvasManager;