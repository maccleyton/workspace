/**
 * Property Panel Manager - Gerencia o painel de propriedades dos elementos
 * Responsável por editar propriedades visuais e de estilo dos elementos
 */

class PropertyPanel {
    constructor(app) {
        this.app = app;
        this.currentElement = null;
        this.propertyInputs = new Map();
        this.init();
    }

    init() {
        this.setupPropertyInputs();
        this.setupEventListeners();
    }

    setupPropertyInputs() {
        // Content properties
        this.propertyInputs.set('content', document.getElementById('contentInput'));
        
        // Style properties
        this.propertyInputs.set('color', document.getElementById('colorInput'));
        this.propertyInputs.set('backgroundColor', document.getElementById('backgroundColorInput'));
        this.propertyInputs.set('fontSize', document.getElementById('fontSizeInput'));
        this.propertyInputs.set('fontSizeUnit', document.getElementById('fontSizeUnit'));
        this.propertyInputs.set('fontWeight', document.getElementById('fontWeightInput'));
        this.propertyInputs.set('textAlign', document.getElementById('textAlignInput'));
        
        // Dimension properties
        this.propertyInputs.set('width', document.getElementById('widthInput'));
        this.propertyInputs.set('widthUnit', document.getElementById('widthUnit'));
        this.propertyInputs.set('height', document.getElementById('heightInput'));
        this.propertyInputs.set('heightUnit', document.getElementById('heightUnit'));
        
        // Spacing properties
        this.propertyInputs.set('marginTop', document.getElementById('marginTop'));
        this.propertyInputs.set('marginRight', document.getElementById('marginRight'));
        this.propertyInputs.set('marginBottom', document.getElementById('marginBottom'));
        this.propertyInputs.set('marginLeft', document.getElementById('marginLeft'));
        this.propertyInputs.set('paddingTop', document.getElementById('paddingTop'));
        this.propertyInputs.set('paddingRight', document.getElementById('paddingRight'));
        this.propertyInputs.set('paddingBottom', document.getElementById('paddingBottom'));
        this.propertyInputs.set('paddingLeft', document.getElementById('paddingLeft'));
        
        // Border properties
        this.propertyInputs.set('borderColor', document.getElementById('borderColorInput'));
        this.propertyInputs.set('borderWidth', document.getElementById('borderWidthInput'));
        this.propertyInputs.set('borderStyle', document.getElementById('borderStyleInput'));
        this.propertyInputs.set('borderRadius', document.getElementById('borderRadiusInput'));
        
        // Position properties
        this.propertyInputs.set('position', document.getElementById('positionInput'));
        this.propertyInputs.set('top', document.getElementById('topInput'));
        this.propertyInputs.set('right', document.getElementById('rightInput'));
        this.propertyInputs.set('bottom', document.getElementById('bottomInput'));
        this.propertyInputs.set('left', document.getElementById('leftInput'));
        this.propertyInputs.set('zIndex', document.getElementById('zIndexInput'));
    }

    setupEventListeners() {
        // Content input
        const contentInput = this.propertyInputs.get('content');
        if (contentInput) {
            contentInput.addEventListener('input', (e) => this.updateContent(e.target.value));
        }
        
        // Style inputs
        this.setupStyleInputListeners();
        
        // Dimension inputs
        this.setupDimensionInputListeners();
        
        // Spacing inputs
        this.setupSpacingInputListeners();
        
        // Border inputs
        this.setupBorderInputListeners();
        
        // Position inputs
        this.setupPositionInputListeners();
        
        // Element actions
        this.setupElementActionListeners();
    }

    setupStyleInputListeners() {
        const colorInput = this.propertyInputs.get('color');
        if (colorInput) {
            colorInput.addEventListener('input', (e) => this.updateProperty('color', e.target.value));
        }
        
        const bgColorInput = this.propertyInputs.get('backgroundColor');
        if (bgColorInput) {
            bgColorInput.addEventListener('input', (e) => this.updateProperty('backgroundColor', e.target.value));
        }
        
        const fontSizeInput = this.propertyInputs.get('fontSize');
        const fontSizeUnit = this.propertyInputs.get('fontSizeUnit');
        if (fontSizeInput && fontSizeUnit) {
            const updateFontSize = () => {
                const value = fontSizeInput.value;
                const unit = fontSizeUnit.value;
                if (value) {
                    this.updateProperty('fontSize', value + unit);
                }
            };
            fontSizeInput.addEventListener('input', updateFontSize);
            fontSizeUnit.addEventListener('change', updateFontSize);
        }
        
        const fontWeightInput = this.propertyInputs.get('fontWeight');
        if (fontWeightInput) {
            fontWeightInput.addEventListener('change', (e) => this.updateProperty('fontWeight', e.target.value));
        }
        
        const textAlignInput = this.propertyInputs.get('textAlign');
        if (textAlignInput) {
            textAlignInput.addEventListener('change', (e) => this.updateProperty('textAlign', e.target.value));
        }
    }

    setupDimensionInputListeners() {
        const widthInput = this.propertyInputs.get('width');
        const widthUnit = this.propertyInputs.get('widthUnit');
        if (widthInput && widthUnit) {
            const updateWidth = () => {
                const value = widthInput.value;
                const unit = widthUnit.value;
                if (value) {
                    this.updateProperty('width', value + unit);
                } else {
                    this.updateProperty('width', 'auto');
                }
            };
            widthInput.addEventListener('input', updateWidth);
            widthUnit.addEventListener('change', updateWidth);
        }
        
        const heightInput = this.propertyInputs.get('height');
        const heightUnit = this.propertyInputs.get('heightUnit');
        if (heightInput && heightUnit) {
            const updateHeight = () => {
                const value = heightInput.value;
                const unit = heightUnit.value;
                if (value) {
                    this.updateProperty('height', value + unit);
                } else {
                    this.updateProperty('height', 'auto');
                }
            };
            heightInput.addEventListener('input', updateHeight);
            heightUnit.addEventListener('change', updateHeight);
        }
    }

    setupSpacingInputListeners() {
        // Margin inputs
        ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach(marginProp => {
            const input = this.propertyInputs.get(marginProp);
            if (input) {
                input.addEventListener('input', () => this.updateSpacing('margin'));
            }
        });
        
        // Padding inputs
        ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].forEach(paddingProp => {
            const input = this.propertyInputs.get(paddingProp);
            if (input) {
                input.addEventListener('input', () => this.updateSpacing('padding'));
            }
        });
    }

    setupBorderInputListeners() {
        const borderColorInput = this.propertyInputs.get('borderColor');
        if (borderColorInput) {
            borderColorInput.addEventListener('input', (e) => this.updateBorder());
        }
        
        const borderWidthInput = this.propertyInputs.get('borderWidth');
        if (borderWidthInput) {
            borderWidthInput.addEventListener('input', () => this.updateBorder());
        }
        
        const borderStyleInput = this.propertyInputs.get('borderStyle');
        if (borderStyleInput) {
            borderStyleInput.addEventListener('change', () => this.updateBorder());
        }
        
        const borderRadiusInput = this.propertyInputs.get('borderRadius');
        if (borderRadiusInput) {
            borderRadiusInput.addEventListener('input', (e) => this.updateProperty('borderRadius', e.target.value + 'px'));
        }
    }

    setupPositionInputListeners() {
        const positionInput = this.propertyInputs.get('position');
        if (positionInput) {
            positionInput.addEventListener('change', (e) => {
                this.updateProperty('position', e.target.value);
                this.togglePositionInputs(e.target.value);
            });
        }
        
        // Position coordinates
        ['top', 'right', 'bottom', 'left'].forEach(posProp => {
            const input = this.propertyInputs.get(posProp);
            if (input) {
                input.addEventListener('input', () => this.updatePosition());
            }
        });
        
        const zIndexInput = this.propertyInputs.get('zIndex');
        if (zIndexInput) {
            zIndexInput.addEventListener('input', (e) => this.updateProperty('zIndex', e.target.value));
        }
    }

    setupElementActionListeners() {
        // Duplicate button
        const duplicateBtn = document.getElementById('duplicateElement');
        if (duplicateBtn) {
            duplicateBtn.addEventListener('click', () => this.duplicateElement());
        }
        
        // Delete button
        const deleteBtn = document.getElementById('deleteElement');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.deleteElement());
        }
    }

    updateForElement(element) {
        this.currentElement = element;
        
        // Show element actions
        this.showElementActions();
        
        // Update content section
        this.updateContentSection(element);
        
        // Update style properties
        this.updateStyleProperties(element);
        
        // Update dimension properties
        this.updateDimensionProperties(element);
        
        // Update spacing properties
        this.updateSpacingProperties(element);
        
        // Update border properties
        this.updateBorderProperties(element);
        
        // Update position properties
        this.updatePositionProperties(element);
        
        // Show properties panel
        this.showPropertiesPanel();
    }

    clear() {
        this.currentElement = null;
        
        // Hide element actions
        this.hideElementActions();
        
        // Show no selection message
        this.showNoSelection();
    }

    showElementActions() {
        const elementActions = document.getElementById('elementActions');
        if (elementActions) {
            elementActions.style.display = 'flex';
        }
    }

    hideElementActions() {
        const elementActions = document.getElementById('elementActions');
        if (elementActions) {
            elementActions.style.display = 'none';
        }
    }

    showPropertiesPanel() {
        const propertiesPanel = document.getElementById('propertiesPanel');
        const noSelection = document.getElementById('noSelection');
        
        if (propertiesPanel && noSelection) {
            propertiesPanel.style.display = 'block';
            noSelection.style.display = 'none';
        }
    }

    showNoSelection() {
        const propertiesPanel = document.getElementById('propertiesPanel');
        const noSelection = document.getElementById('noSelection');
        
        if (propertiesPanel && noSelection) {
            propertiesPanel.style.display = 'none';
            noSelection.style.display = 'block';
        }
    }

    updateContentSection(element) {
        const contentInput = this.propertyInputs.get('content');
        if (contentInput) {
            let content = '';
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                content = element.placeholder || '';
            } else if (element.tagName === 'UL' || element.tagName === 'OL') {
                content = Array.from(element.children)
                    .map(li => li.textContent)
                    .join('\n');
            } else {
                content = element.textContent || '';
            }
            
            contentInput.value = content;
        }
    }

    updateStyleProperties(element) {
        const computedStyle = window.getComputedStyle(element);
        
        // Color
        const colorInput = this.propertyInputs.get('color');
        if (colorInput) {
            colorInput.value = this.rgbToHex(computedStyle.color);
        }
        
        // Background color
        const bgColorInput = this.propertyInputs.get('backgroundColor');
        if (bgColorInput) {
            bgColorInput.value = this.rgbToHex(computedStyle.backgroundColor);
        }
        
        // Font size
        const fontSizeInput = this.propertyInputs.get('fontSize');
        const fontSizeUnit = this.propertyInputs.get('fontSizeUnit');
        if (fontSizeInput && fontSizeUnit) {
            const fontSize = computedStyle.fontSize;
            const value = parseFloat(fontSize);
            const unit = fontSize.replace(value.toString(), '');
            
            fontSizeInput.value = value;
            fontSizeUnit.value = unit || 'px';
        }
        
        // Font weight
        const fontWeightInput = this.propertyInputs.get('fontWeight');
        if (fontWeightInput) {
            fontWeightInput.value = computedStyle.fontWeight;
        }
        
        // Text align
        const textAlignInput = this.propertyInputs.get('textAlign');
        if (textAlignInput) {
            textAlignInput.value = computedStyle.textAlign;
        }
    }

    updateDimensionProperties(element) {
        const computedStyle = window.getComputedStyle(element);
        
        // Width
        const widthInput = this.propertyInputs.get('width');
        const widthUnit = this.propertyInputs.get('widthUnit');
        if (widthInput && widthUnit) {
            const width = computedStyle.width;
            if (width === 'auto' || width === '0px') {
                widthInput.value = '';
                widthUnit.value = 'auto';
            } else {
                const value = parseFloat(width);
                const unit = width.replace(value.toString(), '');
                widthInput.value = value;
                widthUnit.value = unit || 'px';
            }
        }
        
        // Height
        const heightInput = this.propertyInputs.get('height');
        const heightUnit = this.propertyInputs.get('heightUnit');
        if (heightInput && heightUnit) {
            const height = computedStyle.height;
            if (height === 'auto' || height === '0px') {
                heightInput.value = '';
                heightUnit.value = 'auto';
            } else {
                const value = parseFloat(height);
                const unit = height.replace(value.toString(), '');
                heightInput.value = value;
                heightUnit.value = unit || 'px';
            }
        }
    }

    updateSpacingProperties(element) {
        const computedStyle = window.getComputedStyle(element);
        
        // Margin
        const marginTop = this.propertyInputs.get('marginTop');
        const marginRight = this.propertyInputs.get('marginRight');
        const marginBottom = this.propertyInputs.get('marginBottom');
        const marginLeft = this.propertyInputs.get('marginLeft');
        
        if (marginTop) marginTop.value = parseFloat(computedStyle.marginTop) || 0;
        if (marginRight) marginRight.value = parseFloat(computedStyle.marginRight) || 0;
        if (marginBottom) marginBottom.value = parseFloat(computedStyle.marginBottom) || 0;
        if (marginLeft) marginLeft.value = parseFloat(computedStyle.marginLeft) || 0;
        
        // Padding
        const paddingTop = this.propertyInputs.get('paddingTop');
        const paddingRight = this.propertyInputs.get('paddingRight');
        const paddingBottom = this.propertyInputs.get('paddingBottom');
        const paddingLeft = this.propertyInputs.get('paddingLeft');
        
        if (paddingTop) paddingTop.value = parseFloat(computedStyle.paddingTop) || 0;
        if (paddingRight) paddingRight.value = parseFloat(computedStyle.paddingRight) || 0;
        if (paddingBottom) paddingBottom.value = parseFloat(computedStyle.paddingBottom) || 0;
        if (paddingLeft) paddingLeft.value = parseFloat(computedStyle.paddingLeft) || 0;
    }

    updateBorderProperties(element) {
        const computedStyle = window.getComputedStyle(element);
        
        // Border color
        const borderColorInput = this.propertyInputs.get('borderColor');
        if (borderColorInput) {
            borderColorInput.value = this.rgbToHex(computedStyle.borderColor);
        }
        
        // Border width
        const borderWidthInput = this.propertyInputs.get('borderWidth');
        if (borderWidthInput) {
            borderWidthInput.value = parseFloat(computedStyle.borderWidth) || 0;
        }
        
        // Border style
        const borderStyleInput = this.propertyInputs.get('borderStyle');
        if (borderStyleInput) {
            borderStyleInput.value = computedStyle.borderStyle;
        }
        
        // Border radius
        const borderRadiusInput = this.propertyInputs.get('borderRadius');
        if (borderRadiusInput) {
            borderRadiusInput.value = parseFloat(computedStyle.borderRadius) || 0;
        }
    }

    updatePositionProperties(element) {
        const computedStyle = window.getComputedStyle(element);
        
        // Position
        const positionInput = this.propertyInputs.get('position');
        if (positionInput) {
            positionInput.value = computedStyle.position;
            this.togglePositionInputs(computedStyle.position);
        }
        
        // Position coordinates
        const topInput = this.propertyInputs.get('top');
        const rightInput = this.propertyInputs.get('right');
        const bottomInput = this.propertyInputs.get('bottom');
        const leftInput = this.propertyInputs.get('left');
        
        if (topInput) topInput.value = parseFloat(computedStyle.top) || '';
        if (rightInput) rightInput.value = parseFloat(computedStyle.right) || '';
        if (bottomInput) bottomInput.value = parseFloat(computedStyle.bottom) || '';
        if (leftInput) leftInput.value = parseFloat(computedStyle.left) || '';
        
        // Z-index
        const zIndexInput = this.propertyInputs.get('zIndex');
        if (zIndexInput) {
            zIndexInput.value = computedStyle.zIndex === 'auto' ? '' : computedStyle.zIndex;
        }
    }

    updateContent(content) {
        if (!this.currentElement) return;
        
        if (this.currentElement.tagName === 'INPUT' || this.currentElement.tagName === 'TEXTAREA') {
            this.currentElement.placeholder = content;
        } else if (this.currentElement.tagName === 'UL' || this.currentElement.tagName === 'OL') {
            this.currentElement.innerHTML = '';
            content.split('\n').forEach(item => {
                if (item.trim()) {
                    const li = document.createElement('li');
                    li.textContent = item.trim();
                    this.currentElement.appendChild(li);
                }
            });
        } else {
            this.currentElement.textContent = content;
        }
        
        this.updateElementData('content', content);
    }

    updateProperty(property, value) {
        if (!this.currentElement) return;
        
        // Apply to element
        this.currentElement.style[property] = value;
        
        // Update element data
        this.updateElementData(property, value);
        
        // Save to history
        this.app.saveToHistory();
    }

    updateSpacing(type) {
        if (!this.currentElement) return;
        
        const spacing = {};
        
        if (type === 'margin') {
            const top = this.propertyInputs.get('marginTop')?.value || 0;
            const right = this.propertyInputs.get('marginRight')?.value || 0;
            const bottom = this.propertyInputs.get('marginBottom')?.value || 0;
            const left = this.propertyInputs.get('marginLeft')?.value || 0;
            
            spacing.margin = `${top}px ${right}px ${bottom}px ${left}px`;
        } else if (type === 'padding') {
            const top = this.propertyInputs.get('paddingTop')?.value || 0;
            const right = this.propertyInputs.get('paddingRight')?.value || 0;
            const bottom = this.propertyInputs.get('paddingBottom')?.value || 0;
            const left = this.propertyInputs.get('paddingLeft')?.value || 0;
            
            spacing.padding = `${top}px ${right}px ${bottom}px ${left}px`;
        }
        
        Object.keys(spacing).forEach(prop => {
            this.currentElement.style[prop] = spacing[prop];
            this.updateElementData(prop, spacing[prop]);
        });
        
        this.app.saveToHistory();
    }

    updateBorder() {
        if (!this.currentElement) return;
        
        const color = this.propertyInputs.get('borderColor')?.value || '#e0e0e0';
        const width = this.propertyInputs.get('borderWidth')?.value || 0;
        const style = this.propertyInputs.get('borderStyle')?.value || 'solid';
        
        const borderValue = style === 'none' ? 'none' : `${width}px ${style} ${color}`;
        
        this.currentElement.style.border = borderValue;
        this.updateElementData('border', borderValue);
        this.app.saveToHistory();
    }

    updatePosition() {
        if (!this.currentElement) return;
        
        const position = this.propertyInputs.get('position')?.value || 'static';
        const top = this.propertyInputs.get('top')?.value || '';
        const right = this.propertyInputs.get('right')?.value || '';
        const bottom = this.propertyInputs.get('bottom')?.value || '';
        const left = this.propertyInputs.get('left')?.value || '';
        
        // Apply position
        this.currentElement.style.position = position;
        
        // Apply coordinates if position is not static
        if (position !== 'static') {
            if (top) this.currentElement.style.top = top + 'px';
            if (right) this.currentElement.style.right = right + 'px';
            if (bottom) this.currentElement.style.bottom = bottom + 'px';
            if (left) this.currentElement.style.left = left + 'px';
        }
        
        // Update element data
        this.updateElementData('position', position);
        if (top) this.updateElementData('top', top + 'px');
        if (right) this.updateElementData('right', right + 'px');
        if (bottom) this.updateElementData('bottom', bottom + 'px');
        if (left) this.updateElementData('left', left + 'px');
        
        this.app.saveToHistory();
    }

    togglePositionInputs(position) {
        const positionInputs = document.getElementById('positionInputs');
        if (positionInputs) {
            positionInputs.style.display = position === 'static' ? 'none' : 'block';
        }
    }

    updateElementData(property, value) {
        const elementId = this.currentElement.dataset.elementId;
        const projectElement = window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
        
        if (projectElement) {
            // Handle special properties
            if (property === 'fontSize') {
                projectElement.properties.fontSize = value;
            } else if (property === 'backgroundColor') {
                projectElement.properties.backgroundColor = value;
            } else {
                projectElement.properties[property] = value;
            }
        }
    }

    duplicateElement() {
        if (!this.currentElement) return;
        
        const elementId = this.currentElement.dataset.elementId;
        const projectElement = window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
        
        if (projectElement) {
            const duplicatedElement = {
                ...projectElement,
                id: this.generateElementId(),
                position: {
                    x: (projectElement.position?.x || 0) + 20,
                    y: (projectElement.position?.y || 0) + 20
                }
            };
            
            window.HTMLBuilder.currentProject.elements.push(duplicatedElement);
            this.app.createDOMElement(duplicatedElement);
            this.app.saveToHistory();
        }
    }

    deleteElement() {
        if (!this.currentElement) return;
        
        this.app.deleteSelectedElement();
    }

    // Utility methods
    rgbToHex(rgb) {
        if (rgb.startsWith('#')) return rgb;
        
        const result = rgb.match(/\d+/g);
        if (!result) return '#000000';
        
        return '#' + result.slice(0, 3).map(x => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    generateElementId() {
        return 'element_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
    }

    // Public methods for external use
    getCurrentElement() {
        return this.currentElement;
    }

    getElementProperties() {
        if (!this.currentElement) return {};
        
        const elementId = this.currentElement.dataset.elementId;
        const projectElement = window.HTMLBuilder.currentProject.elements.find(el => el.id === elementId);
        
        return projectElement ? projectElement.properties : {};
    }

    setElementProperties(properties) {
        if (!this.currentElement) return;
        
        Object.keys(properties).forEach(key => {
            const value = properties[key];
            this.updateProperty(key, value);
        });
    }
}

// Export for global access
window.PropertyPanel = PropertyPanel;