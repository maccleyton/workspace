/**
 * Export Manager - Gerencia a exportação de projetos HTML
 * Responsável por gerar HTML/CSS limpo a partir dos elementos construídos
 */

class ExportManager {
    constructor(app) {
        this.app = app;
        this.exportOptions = {
            mode: 'single', // 'single' ou 'separated'
            includeMeta: true,
            minifyCSS: false,
            includeComments: true
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Export mode selection
        const exportModeRadios = document.querySelectorAll('input[name="exportMode"]');
        exportModeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.exportOptions.mode = e.target.value;
                this.updateCodePreview();
            });
        });

        // Copy code button
        const copyCodeBtn = document.getElementById('copyCode');
        if (copyCodeBtn) {
            copyCodeBtn.addEventListener('click', () => this.copyCodeToClipboard());
        }

        // Download code button
        const downloadCodeBtn = document.getElementById('downloadCode');
        if (downloadCodeBtn) {
            downloadCodeBtn.addEventListener('click', () => this.downloadCode());
        }
    }

    generateHTML(project) {
        const html = {
            single: () => this.generateSingleFileHTML(project),
            separated: () => this.generateSeparatedFilesHTML(project)
        };

        return html[this.exportOptions.mode]();
    }

    generateSingleFileHTML(project) {
        const html = [];
        
        // DOCTYPE and opening tags
        html.push('<!DOCTYPE html>');
        html.push('<html lang="pt-BR">');
        html.push('<head>');
        html.push('    <meta charset="UTF-8">');
        html.push('    <meta name="viewport" content="width=device-width, initial-scale=1.0">');
        
        if (this.exportOptions.includeMeta) {
            html.push(`    <title>${this.escapeHtml(project.name || 'Página HTML')}</title>`);
            html.push('    <meta name="description" content="Página gerada pelo Construtor HTML">');
            html.push('    <meta name="author" content="Construtor de Páginas HTML">');
        }
        
        // CSS Styles
        const styles = this.generateInlineStyles(project);
        if (styles) {
            html.push('    <style>');
            html.push(...styles.map(line => '        ' + line));
            html.push('    </style>');
        }
        
        html.push('</head>');
        html.push('<body>');
        
        // Body content
        const bodyContent = this.generateBodyContent(project);
        html.push(...bodyContent.map(line => '    ' + line));
        
        html.push('</body>');
        html.push('</html>');
        
        return html.join('\n');
    }

    generateSeparatedFilesHTML(project) {
        const html = [];
        
        // HTML file content
        html.push('<!DOCTYPE html>');
        html.push('<html lang="pt-BR">');
        html.push('<head>');
        html.push('    <meta charset="UTF-8">');
        html.push('    <meta name="viewport" content="width=device-width, initial-scale=1.0">');
        
        if (this.exportOptions.includeMeta) {
            html.push(`    <title>${this.escapeHtml(project.name || 'Página HTML')}</title>`);
            html.push('    <meta name="description" content="Página gerada pelo Construtor HTML">');
            html.push('    <meta name="author" content="Construtor de Páginas HTML">');
        }
        
        html.push('    <link rel="stylesheet" href="styles.css">');
        html.push('</head>');
        html.push('<body>');
        
        // Body content
        const bodyContent = this.generateBodyContent(project);
        html.push(...bodyContent.map(line => '    ' + line));
        
        html.push('</body>');
        html.push('</html>');
        
        return html.join('\n');
    }

    generateBodyContent(project) {
        const content = [];
        
        // Add comments if enabled
        if (this.exportOptions.includeComments) {
            content.push(`<!-- ${project.name || 'Página HTML'} -->`);
            content.push('<!-- Gerado pelo Construtor de Páginas HTML -->');
            content.push('');
        }
        
        // Generate elements
        project.elements.forEach((element, index) => {
            const elementHTML = this.generateElementHTML(element, index);
            if (elementHTML) {
                content.push(...elementHTML);
                content.push(''); // Empty line between elements
            }
        });
        
        return content;
    }

    generateElementHTML(element, index) {
        const html = [];
        
        if (this.exportOptions.includeComments) {
            html.push(`<!-- Elemento ${index + 1}: ${element.type} -->`);
        }
        
        const elementGenerators = {
            text: () => this.generateTextElement(element),
            heading: () => this.generateHeadingElement(element),
            span: () => this.generateSpanElement(element),
            button: () => this.generateButtonElement(element),
            link: () => this.generateLinkElement(element),
            image: () => this.generateImageElement(element),
            container: () => this.generateContainerElement(element),
            section: () => this.generateSectionElement(element),
            div: () => this.generateDivElement(element),
            card: () => this.generateCardElement(element),
            input: () => this.generateInputElement(element),
            textarea: () => this.generateTextareaElement(element),
            form: () => this.generateFormElement(element),
            ul: () => this.generateListElement(element, 'ul'),
            ol: () => this.generateListElement(element, 'ol')
        };
        
        const generator = elementGenerators[element.type];
        if (generator) {
            html.push(...generator());
        } else {
            // Default element
            html.push(`<div${this.generateAttributes(element)}>${this.escapeHtml(element.properties?.content || 'Elemento')}</div>`);
        }
        
        return html;
    }

    generateTextElement(element) {
        const attrs = this.generateAttributes(element);
        const content = this.escapeHtml(element.properties?.content || 'Texto de exemplo');
        return [`<p${attrs}>${content}</p>`];
    }

    generateHeadingElement(element) {
        const level = element.properties?.level || 1;
        const attrs = this.generateAttributes(element);
        const content = this.escapeHtml(element.properties?.content || `Título ${level}`);
        return [`<h${level}${attrs}>${content}</h${level}>`];
    }

    generateSpanElement(element) {
        const attrs = this.generateAttributes(element);
        const content = this.escapeHtml(element.properties?.content || 'Texto em linha');
        return [`<span${attrs}>${content}</span>`];
    }

    generateButtonElement(element) {
        const attrs = this.generateAttributes(element);
        const content = this.escapeHtml(element.properties?.content || 'Clique aqui');
        return [`<button${attrs}>${content}</button>`];
    }

    generateLinkElement(element) {
        const attrs = this.generateAttributes(element);
        const content = this.escapeHtml(element.properties?.content || 'Link de exemplo');
        const href = element.properties?.href || '#';
        return [`<a href="${this.escapeHtml(href)}"${attrs}>${content}</a>`];
    }

    generateImageElement(element) {
        const src = element.properties?.src || 'https://via.placeholder.com/300x200';
        const alt = this.escapeHtml(element.properties?.alt || 'Imagem');
        const attrs = this.generateAttributes(element, ['src', 'alt']);
        return [`<img src="${this.escapeHtml(src)}" alt="${alt}"${attrs}>`];
    }

    generateContainerElement(element) {
        const attrs = this.generateAttributes(element);
        return [`<div${attrs}></div>`];
    }

    generateSectionElement(element) {
        const attrs = this.generateAttributes(element);
        return [`<section${attrs}></section>`];
    }

    generateDivElement(element) {
        const attrs = this.generateAttributes(element);
        return [`<div${attrs}></div>`];
    }

    generateCardElement(element) {
        const attrs = this.generateAttributes(element);
        return [
            `<div${attrs}>`,
            '    <h3>Título do Card</h3>',
            '    <p>Conteúdo do card...</p>',
            '</div>'
        ];
    }

    generateInputElement(element) {
        const placeholder = this.escapeHtml(element.properties?.placeholder || 'Digite aqui...');
        const attrs = this.generateAttributes(element, ['placeholder']);
        return [`<input type="text" placeholder="${placeholder}"${attrs}>`];
    }

    generateTextareaElement(element) {
        const placeholder = this.escapeHtml(element.properties?.placeholder || 'Mensagem...');
        const attrs = this.generateAttributes(element, ['placeholder']);
        return [`<textarea placeholder="${placeholder}"${attrs}></textarea>`];
    }

    generateFormElement(element) {
        const attrs = this.generateAttributes(element);
        return [
            `<form${attrs}>`,
            '    <input type="text" placeholder="Nome" style="margin-bottom: 12px; width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px;">',
            '    <input type="email" placeholder="Email" style="margin-bottom: 12px; width: 100%; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px;">',
            '    <button type="submit" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">Enviar</button>',
            '</form>'
        ];
    }

    generateListElement(element, type) {
        const content = element.properties?.content || 'Item 1\nItem 2\nItem 3';
        const items = content.split('\n').filter(item => item.trim());
        const attrs = this.generateAttributes(element);
        
        const html = [`<${type}${attrs}>`];
        items.forEach(item => {
            html.push(`    <li>${this.escapeHtml(item.trim())}</li>`);
        });
        html.push(`</${type}>`);
        
        return html;
    }

    generateAttributes(element, excludeProps = []) {
        const attrs = [];
        
        // Add classes
        if (element.classes && element.classes.length > 0) {
            attrs.push(` class="${element.classes.join(' ')}"`);
        }
        
        // Add data attributes
        if (element.data) {
            Object.keys(element.data).forEach(key => {
                attrs.push(` data-${key}="${this.escapeHtml(element.data[key])}"`);
            });
        }
        
        // Add style attributes
        const style = this.generateStyleString(element);
        if (style) {
            attrs.push(` style="${style}"`);
        }
        
        return attrs.join('');
    }

    generateStyleString(element) {
        const styles = [];
        const properties = element.properties || {};
        
        // Convert properties to CSS
        Object.keys(properties).forEach(key => {
            const value = properties[key];
            
            // Skip certain properties
            if (excludeProps.includes(key) || key === 'content' || key === 'level' || key === 'src' || key === 'alt' || key === 'href' || key === 'placeholder') {
                return;
            }
            
            // Convert camelCase to kebab-case
            const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            styles.push(`${cssProperty}: ${value}`);
        });
        
        return styles.join('; ');
    }

    generateInlineStyles(project) {
        const styles = [];
        
        // Base styles
        styles.push('* {');
        styles.push('    box-sizing: border-box;');
        styles.push('}');
        styles.push('');
        
        styles.push('body {');
        styles.push('    margin: 0;');
        styles.push('    padding: 0;');
        styles.push('    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;');
        styles.push('    line-height: 1.6;');
        styles.push('    color: #333;');
        styles.push('}');
        styles.push('');
        
        // Element-specific styles
        project.elements.forEach((element, index) => {
            const style = this.generateElementStyle(element, index);
            if (style) {
                styles.push(...style);
                styles.push(''); // Empty line
            }
        });
        
        return styles;
    }

    generateElementStyle(element, index) {
        const styles = [];
        const selector = `.element-${index}`;
        const properties = element.properties || {};
        
        // Only add styles if there are properties to style
        const hasStyles = Object.keys(properties).some(key => 
            !['content', 'level', 'src', 'alt', 'href', 'placeholder'].includes(key)
        );
        
        if (!hasStyles) {
            return [];
        }
        
        styles.push(`${selector} {`);
        
        Object.keys(properties).forEach(key => {
            const value = properties[key];
            
            // Skip certain properties
            if (['content', 'level', 'src', 'alt', 'href', 'placeholder'].includes(key)) {
                return;
            }
            
            // Convert camelCase to kebab-case
            const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            styles.push(`    ${cssProperty}: ${value};`);
        });
        
        styles.push('}');
        
        return styles;
    }

    generateSeparatedCSS(project) {
        const css = [];
        
        // Import Google Fonts if needed
        const usesCustomFonts = project.elements.some(element => {
            const fontFamily = element.properties?.fontFamily;
            return fontFamily && !fontFamily.includes('system-ui') && !fontFamily.includes('Arial');
        });
        
        if (usesCustomFonts) {
            css.push('@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");');
            css.push('');
        }
        
        // Base styles
        css.push('/* Reset and base styles */');
        css.push('* {');
        css.push('    box-sizing: border-box;');
        css.push('}');
        css.push('');
        
        css.push('body {');
        css.push('    margin: 0;');
        css.push('    padding: 0;');
        css.push('    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;');
        css.push('    line-height: 1.6;');
        css.push('    color: #333;');
        css.push('}');
        css.push('');
        
        // Element styles
        css.push('/* Element styles */');
        project.elements.forEach((element, index) => {
            const style = this.generateElementStyle(element, index);
            if (style) {
                css.push(...style);
                css.push(''); // Empty line
            }
        });
        
        return css.join('\n');
    }

    updateCodePreview() {
        const codeOutput = document.getElementById('codeOutput');
        if (!codeOutput) return;
        
        const html = this.generateHTML(window.HTMLBuilder.currentProject);
        codeOutput.value = html;
    }

    copyCodeToClipboard() {
        const codeOutput = document.getElementById('codeOutput');
        if (!codeOutput) return;
        
        codeOutput.select();
        codeOutput.setSelectionRange(0, 99999); // For mobile devices
        
        navigator.clipboard.writeText(codeOutput.value).then(() => {
            this.showNotification('Código copiado para a área de transferência!', 'success');
        }).catch(err => {
            // Fallback for older browsers
            document.execCommand('copy');
            this.showNotification('Código copiado!', 'success');
        });
    }

    downloadCode() {
        const project = window.HTMLBuilder.currentProject;
        
        if (this.exportOptions.mode === 'single') {
            this.downloadSingleFile(project);
        } else {
            this.downloadSeparatedFiles(project);
        }
    }

    downloadSingleFile(project) {
        const html = this.generateHTML(project);
        this.downloadFile(`${this.sanitizeFilename(project.name || 'pagina')}.html`, html, 'text/html');
    }

    downloadSeparatedFiles(project) {
        const projectName = this.sanitizeFilename(project.name || 'pagina');
        
        // Download HTML file
        const html = this.generateHTML(project);
        this.downloadFile(`${projectName}.html`, html, 'text/html');
        
        // Download CSS file
        const css = this.generateSeparatedCSS(project);
        setTimeout(() => {
            this.downloadFile('styles.css', css, 'text/css');
        }, 500);
    }

    downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        
        this.showNotification(`Arquivo "${filename}" baixado!`, 'success');
    }

    // Utility methods
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    sanitizeFilename(filename) {
        return filename
            .replace(/[<>:"/\\|?*]/g, '_')
            .replace(/\s+/g, '-')
            .toLowerCase();
    }

    showNotification(message, type) {
        if (window.htmlBuilderApp && window.htmlBuilderApp.showNotification) {
            window.htmlBuilderApp.showNotification(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    // Public methods for external use
    setExportOptions(options) {
        this.exportOptions = { ...this.exportOptions, ...options };
    }

    getExportOptions() {
        return { ...this.exportOptions };
    }

    generatePreviewHTML(project) {
        // Generate a simplified version for preview
        const previewProject = { ...project };
        previewProject.elements = project.elements.map(element => ({
            ...element,
            properties: { ...element.properties }
        }));
        
        return this.generateHTML(previewProject);
    }
}

// Export for global access
window.ExportManager = ExportManager;