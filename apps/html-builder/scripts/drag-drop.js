/**
 * Drag and Drop Manager - Gerencia arrastar e soltar de componentes
 * Responsável por drag de componentes do painel para o canvas
 */

class DragDropManager {
    constructor(app) {
        this.app = app;
        this.canvas = app.canvas;
        this.isDragging = false;
        this.draggedElement = null;
        this.dragPreview = null;
        this.dropZones = new Set();
        this.dragOffset = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.setupComponentDrag();
        this.setupCanvasDropZones();
        this.setupDragPreview();
    }

    setupComponentDrag() {
        const componentItems = document.querySelectorAll('.component-item');
        
        componentItems.forEach(item => {
            item.addEventListener('dragstart', (e) => this.handleDragStart(e, item));
            item.addEventListener('dragend', (e) => this.handleDragEnd(e, item));
        });
    }

    setupCanvasDropZones() {
        // Make canvas a drop zone
        this.canvas.addEventListener('dragover', (e) => this.handleCanvasDragOver(e));
        this.canvas.addEventListener('dragleave', (e) => this.handleCanvasDragLeave(e));
        this.canvas.addEventListener('drop', (e) => this.handleCanvasDrop(e));
        
        // Setup drop zones for existing elements
        this.updateDropZones();
    }

    setupDragPreview() {
        // Create drag preview element
        this.dragPreview = document.createElement('div');
        this.dragPreview.className = 'drag-preview';
        this.dragPreview.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.8;
            transform: rotate(5deg);
            transition: all 0.2s ease;
        `;
        document.body.appendChild(this.dragPreview);
    }

    handleDragStart(e, componentItem) {
        this.isDragging = true;
        this.draggedElement = componentItem;
        
        const componentData = this.extractComponentData(componentItem);
        
        // Set drag data
        e.dataTransfer.setData('application/html-builder', JSON.stringify(componentData));
        e.dataTransfer.setData('text/plain', 'html-builder-component');
        
        // Create drag image
        this.createDragImage(componentData, e);
        
        // Add dragging class
        componentItem.classList.add('dragging');
        
        // Show canvas highlight
        this.canvas.classList.add('drag-active');
        
        // Create drop zones
        this.createDropZones(componentData);
    }

    handleDragEnd(e, componentItem) {
        this.isDragging = false;
        this.draggedElement = null;
        
        // Remove dragging class
        componentItem.classList.remove('dragging');
        
        // Hide canvas highlight
        this.canvas.classList.remove('drag-active');
        
        // Remove drag preview
        this.hideDragPreview();
        
        // Remove drop zones
        this.removeDropZones();
    }

    handleCanvasDragOver(e) {
        e.preventDefault();
        
        // Add visual feedback
        this.canvas.classList.add('drag-over');
        
        // Update drop zone highlight
        this.updateDropZoneHighlight(e);
    }

    handleCanvasDragLeave(e) {
        if (!this.canvas.contains(e.relatedTarget)) {
            this.canvas.classList.remove('drag-over');
            this.removeDropZoneHighlight();
        }
    }

    handleCanvasDrop(e) {
        e.preventDefault();
        
        this.canvas.classList.remove('drag-over');
        this.removeDropZoneHighlight();
        
        const data = e.dataTransfer.getData('application/html-builder');
        if (!data) return;

        try {
            const componentData = JSON.parse(data);
            const dropPosition = this.calculateDropPosition(e);
            
            // Check if dropped on a valid drop zone
            const dropZone = this.getDropZoneAtPosition(e.clientX, e.clientY);
            
            if (dropZone) {
                this.dropOnElement(dropZone, componentData, e);
            } else {
                this.dropOnCanvas(componentData, dropPosition);
            }
            
        } catch (error) {
            console.error('Error parsing dropped data:', error);
        }
    }

    extractComponentData(componentItem) {
        const data = {
            type: componentItem.dataset.type,
            content: componentItem.dataset.content || '',
            level: parseInt(componentItem.dataset.level) || undefined,
            src: componentItem.dataset.src || '',
            alt: componentItem.dataset.alt || '',
            href: componentItem.dataset.href || '',
            placeholder: componentItem.dataset.placeholder || '',
            class: componentItem.dataset.class || '',
            properties: this.getComponentProperties(componentItem)
        };
        
        return data;
    }

    getComponentProperties(componentItem) {
        const type = componentItem.dataset.type;
        
        const propertyMap = {
            heading: () => ({
                level: parseInt(componentItem.dataset.level) || 1,
                content: componentItem.dataset.content || 'Título'
            }),
            text: () => ({
                content: componentItem.dataset.content || 'Texto de exemplo'
            }),
            span: () => ({
                content: componentItem.dataset.content || 'Texto em linha'
            }),
            button: () => ({
                content: componentItem.dataset.content || 'Clique aqui',
                backgroundColor: '#2563eb',
                color: '#ffffff'
            }),
            link: () => ({
                content: componentItem.dataset.content || 'Link de exemplo',
                href: componentItem.dataset.href || '#',
                color: '#3b82f6'
            }),
            image: () => ({
                src: componentItem.dataset.src || 'https://via.placeholder.com/300x200',
                alt: componentItem.dataset.alt || 'Imagem',
                width: '300px',
                height: '200px'
            }),
            container: () => ({
                class: 'container',
                padding: '20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }),
            section: () => ({
                class: 'section',
                padding: '40px 20px',
                backgroundColor: '#f8fafc'
            }),
            div: () => ({
                class: 'custom-div',
                padding: '16px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0'
            }),
            card: () => ({
                class: 'card',
                padding: '24px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
            }),
            input: () => ({
                placeholder: componentItem.dataset.placeholder || 'Digite aqui...',
                padding: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
            }),
            textarea: () => ({
                placeholder: componentItem.dataset.placeholder || 'Mensagem...',
                padding: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '14px',
                minHeight: '100px'
            }),
            form: () => ({
                class: 'form',
                padding: '24px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0'
            }),
            ul: () => ({
                content: componentItem.dataset.content || 'Item 1\nItem 2\nItem 3',
                margin: '16px 0',
                paddingLeft: '24px'
            }),
            ol: () => ({
                content: componentItem.dataset.content || 'Primeiro\nSegundo\nTerceiro',
                margin: '16px 0',
                paddingLeft: '24px'
            })
        };
        
        return propertyMap[type] ? propertyMap[type]() : {};
    }

    createDragImage(componentData, e) {
        const preview = this.createComponentPreview(componentData);
        this.dragPreview.innerHTML = '';
        this.dragPreview.appendChild(preview);
        
        // Position the preview
        this.updateDragPreviewPosition(e);
    }

    createComponentPreview(componentData) {
        const preview = document.createElement('div');
        preview.className = 'component-preview';
        preview.style.cssText = `
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            min-width: 200px;
            max-width: 300px;
        `;
        
        const icon = this.getComponentIcon(componentData.type);
        const title = this.getComponentTitle(componentData.type);
        
        preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="font-size: 16px;">${icon}</span>
                <strong style="font-size: 14px;">${title}</strong>
            </div>
            <div style="font-size: 12px; color: #64748b;">
                ${this.getComponentDescription(componentData.type)}
            </div>
        `;
        
        return preview;
    }

    getComponentIcon(type) {
        const iconMap = {
            text: '📝',
            heading: 'H',
            span: 'S',
            button: '🔘',
            link: '🔗',
            image: '🖼️',
            container: '📦',
            section: '📄',
            div: '▫️',
            card: '🎴',
            input: '📝',
            textarea: '📄',
            form: '📋',
            ul: '•',
            ol: '1.'
        };
        
        return iconMap[type] || '🔧';
    }

    getComponentTitle(type) {
        const titleMap = {
            text: 'Parágrafo',
            heading: `Título ${componentData.level || 'H1'}`,
            span: 'Texto em linha',
            button: 'Botão',
            link: 'Link',
            image: 'Imagem',
            container: 'Container',
            section: 'Seção',
            div: 'Div',
            card: 'Card',
            input: 'Input de Texto',
            textarea: 'Área de Texto',
            form: 'Formulário',
            ul: 'Lista com Bullets',
            ol: 'Lista Numerada'
        };
        
        return titleMap[type] || 'Componente';
    }

    getComponentDescription(type) {
        const descriptionMap = {
            text: 'Texto simples para conteúdo',
            heading: 'Títulos e subtítulos',
            span: 'Texto inline pequeno',
            button: 'Elemento clicável',
            link: 'Hiperlink para navegação',
            image: 'Imagem com legenda',
            container: 'Container responsivo',
            section: 'Seção de conteúdo',
            div: 'Div genérico',
            card: 'Card com bordas',
            input: 'Campo de entrada',
            textarea: 'Campo de texto longo',
            form: 'Formulário completo',
            ul: 'Lista não ordenada',
            ol: 'Lista ordenada'
        };
        
        return descriptionMap[type] || 'Componente personalizado';
    }

    updateDragPreviewPosition(e) {
        const offsetX = 20;
        const offsetY = 20;
        
        this.dragPreview.style.left = (e.clientX + offsetX) + 'px';
        this.dragPreview.style.top = (e.clientY + offsetY) + 'px';
        
        // Update position during drag
        document.addEventListener('mousemove', this.updateDragPreviewPosition.bind(this));
    }

    hideDragPreview() {
        this.dragPreview.style.opacity = '0';
        setTimeout(() => {
            if (this.dragPreview.parentNode) {
                this.dragPreview.remove();
            }
        }, 200);
    }

    calculateDropPosition(e) {
        const canvasRect = this.canvas.getBoundingClientRect();
        const zoomLevel = this.app.zoomLevel || 1;
        
        return {
            x: (e.clientX - canvasRect.left) / zoomLevel,
            y: (e.clientY - canvasRect.top) / zoomLevel
        };
    }

    createDropZones(componentData) {
        // Create drop zones for compatible containers
        const containers = this.canvas.querySelectorAll('.canvas-element[data-type="container"], .canvas-element[data-type="section"], .canvas-element[data-type="div"], .canvas-element[data-type="card"], .canvas-element[data-type="form"]');
        
        containers.forEach(container => {
            if (this.isValidDropZone(container, componentData)) {
                this.addDropZone(container);
            }
        });
    }

    isValidDropZone(element, componentData) {
        // Define valid drop combinations
        const validCombinations = {
            container: ['text', 'heading', 'span', 'button', 'link', 'image', 'div', 'card', 'form', 'ul', 'ol'],
            section: ['text', 'heading', 'span', 'button', 'link', 'image', 'container', 'div', 'card', 'form', 'ul', 'ol'],
            div: ['text', 'heading', 'span', 'button', 'link', 'image', 'div', 'card', 'input', 'textarea', 'ul', 'ol'],
            card: ['text', 'heading', 'span', 'button', 'link', 'image'],
            form: ['input', 'textarea', 'button']
        };
        
        const elementType = element.dataset.elementType;
        const componentType = componentData.type;
        
        return validCombinations[elementType]?.includes(componentType) || false;
    }

    addDropZone(element) {
        element.classList.add('drop-zone');
        this.dropZones.add(element);
    }

    removeDropZones() {
        this.dropZones.forEach(zone => {
            zone.classList.remove('drop-zone', 'drop-active');
        });
        this.dropZones.clear();
    }

    updateDropZones() {
        this.removeDropZones();
        
        const elements = this.canvas.querySelectorAll('.canvas-element');
        elements.forEach(element => {
            if (this.isValidDropZoneForAny(element)) {
                this.addDropZone(element);
            }
        });
    }

    isValidDropZoneForAny(element) {
        const validTypes = ['container', 'section', 'div', 'card', 'form'];
        return validTypes.includes(element.dataset.elementType);
    }

    updateDropZoneHighlight(e) {
        const dropZone = this.getDropZoneAtPosition(e.clientX, e.clientY);
        
        // Remove previous highlights
        this.dropZones.forEach(zone => {
            zone.classList.remove('drop-active');
        });
        
        // Add highlight to current drop zone
        if (dropZone) {
            dropZone.classList.add('drop-active');
        }
    }

    removeDropZoneHighlight() {
        this.dropZones.forEach(zone => {
            zone.classList.remove('drop-active');
        });
    }

    getDropZoneAtPosition(clientX, clientY) {
        for (const zone of this.dropZones) {
            const rect = zone.getBoundingClientRect();
            if (clientX >= rect.left && clientX <= rect.right &&
                clientY >= rect.top && clientY <= rect.bottom) {
                return zone;
            }
        }
        return null;
    }

    dropOnElement(dropZone, componentData, e) {
        const targetRect = dropZone.getBoundingClientRect();
        const position = {
            x: (e.clientX - targetRect.left) / (this.app.zoomLevel || 1),
            y: (e.clientY - targetRect.top) / (this.app.zoomLevel || 1)
        };
        
        // Add element to the drop zone
        this.app.addElement(componentData, position);
        
        // Show success feedback
        this.showDropFeedback(dropZone, 'Elemento adicionado!', 'success');
    }

    dropOnCanvas(componentData, position) {
        // Add element to canvas
        this.app.addElement(componentData, position);
        
        // Show success feedback
        this.showCanvasFeedback('Elemento adicionado ao canvas!', 'success');
    }

    showDropFeedback(element, message, type) {
        // Create feedback overlay
        const feedback = document.createElement('div');
        feedback.className = 'drop-feedback';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            z-index: 1000;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        element.style.position = 'relative';
        element.appendChild(feedback);
        
        // Remove feedback after animation
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 2000);
    }

    showCanvasFeedback(message, type) {
        // Show canvas-wide feedback
        const feedback = document.createElement('div');
        feedback.className = 'canvas-feedback';
        feedback.innerHTML = `
            <div class="feedback-content">
                <span class="feedback-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="feedback-message">${message}</span>
            </div>
        `;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: slideInDown 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        // Remove feedback
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.style.animation = 'slideOutUp 0.3s ease-in';
                setTimeout(() => feedback.remove(), 300);
            }
        }, 2000);
    }

    // Utility methods
    isDragging() {
        return this.isDragging;
    }

    getDraggedComponent() {
        return this.draggedElement;
    }

    // Cleanup
    destroy() {
        this.removeDropZones();
        if (this.dragPreview && this.dragPreview.parentNode) {
            this.dragPreview.remove();
        }
    }
}

// Add CSS animations
const dragDropStyles = `
<style>
@keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
}

@keyframes slideInDown {
    from { opacity: 0; transform: translate(-50%, -100%); }
    to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes slideOutUp {
    from { opacity: 1; transform: translate(-50%, 0); }
    to { opacity: 0; transform: translate(-50%, -100%); }
}

.drag-preview {
    pointer-events: none;
    z-index: 9999;
    opacity: 0.9;
    transform: rotate(3deg);
    transition: all 0.2s ease;
}

.drag-preview .component-preview {
    background: white;
    border: 2px solid #2563eb;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    min-width: 200px;
    max-width: 300px;
}

.drag-preview .component-preview:hover {
    transform: scale(1.02);
}

.canvas-element.drop-zone {
    border: 2px dashed #2563eb;
    background: rgba(37, 99, 235, 0.05);
    position: relative;
}

.canvas-element.drop-zone::before {
    content: 'Solte aqui';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #2563eb;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    z-index: 10;
}

.canvas-element.drop-zone.drop-active::before,
.canvas-element.drop-zone:hover::before {
    opacity: 1;
}

.canvas-element.drop-zone.drop-active {
    background: rgba(37, 99, 235, 0.15);
    border-color: #1d4ed8;
    transform: scale(1.02);
}

.component-item.dragging {
    opacity: 0.5;
    transform: scale(0.95);
    cursor: grabbing !important;
}

.canvas.drag-active {
    background: rgba(37, 99, 235, 0.05);
    transition: background 0.2s ease;
}

.canvas.drag-over {
    background: rgba(37, 99, 235, 0.1);
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', dragDropStyles);

// Export for global access
window.DragDropManager = DragDropManager;