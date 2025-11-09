// ===== TEMPLATE MANAGER =====

class TemplateManager {
    constructor() {
        this.templates = {};
        this.customTemplates = {};
        this.favorites = [];
        this.categories = ['all', 'javascript', 'python', 'shell', 'html', 'css', 'json'];
        this.isLoaded = false;
        
        this.init();
    }

    async init() {
        console.log('📝 Inicializando Template Manager...');
        
        await this.loadTemplates();
        this.loadSettings();
        this.setupEventListeners();
        
        this.isLoaded = true;
        console.log('✅ Template Manager inicializado');
    }

    async loadTemplates() {
        try {
            // Carregar templates built-in
            const languages = ['javascript', 'python', 'shell'];
            
            for (const lang of languages) {
                try {
                    const response = await fetch(`templates/${lang}/templates.json`);
                    if (response.ok) {
                        const templates = await response.json();
                        this.templates[lang] = templates;
                    }
                } catch (error) {
                    console.warn(`Não foi possível carregar templates de ${lang}:`, error);
                }
            }
            
            // Carregar templates customizados
            this.loadCustomTemplates();
            
        } catch (error) {
            console.error('Erro ao carregar templates:', error);
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('mini-ide-template-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                this.favorites = settings.favorites || [];
                this.customTemplates = settings.customTemplates || {};
            }
        } catch (error) {
            console.error('Erro ao carregar configurações de templates:', error);
        }
    }

    saveSettings() {
        try {
            const settings = {
                favorites: this.favorites,
                customTemplates: this.customTemplates,
                lastModified: Date.now()
            };
            
            localStorage.setItem('mini-ide-template-settings', JSON.stringify(settings));
        } catch (error) {
            console.error('Erro ao salvar configurações de templates:', error);
        }
    }

    setupEventListeners() {
        // Event listeners serão configurados pelo main.js
    }

    // === TEMPLATE GETTERS ===
    getAllTemplates() {
        return { ...this.templates };
    }

    getTemplatesByLanguage(language) {
        return { ...this.templates[language] } || {};
    }

    getTemplate(language, templateKey) {
        // Primeiro tentar templates customizados
        if (this.customTemplates[language] && this.customTemplates[language][templateKey]) {
            return this.customTemplates[language][templateKey];
        }
        
        // Depois templates built-in
        if (this.templates[language] && this.templates[language][templateKey]) {
            return this.templates[language][templateKey];
        }
        
        return null;
    }

    getTemplateByName(name) {
        // Buscar por nome em todas as linguagens
        for (const [lang, templates] of Object.entries(this.templates)) {
            for (const [key, template] of Object.entries(templates)) {
                if (template.name === name) {
                    return { ...template, language: lang, key };
                }
            }
        }
        
        // Buscar também nos customizados
        for (const [lang, templates] of Object.entries(this.customTemplates)) {
            for (const [key, template] of Object.entries(templates)) {
                if (template.name === name) {
                    return { ...template, language: lang, key };
                }
            }
        }
        
        return null;
    }

    searchTemplates(query) {
        const results = [];
        const searchTerm = query.toLowerCase();
        
        // Buscar em built-in templates
        for (const [lang, templates] of Object.entries(this.templates)) {
            for (const [key, template] of Object.entries(templates)) {
                if (this.matchesSearch(template, searchTerm)) {
                    results.push({
                        ...template,
                        language: lang,
                        key: key,
                        type: 'built-in'
                    });
                }
            }
        }
        
        // Buscar em customizados
        for (const [lang, templates] of Object.entries(this.customTemplates)) {
            for (const [key, template] of Object.entries(templates)) {
                if (this.matchesSearch(template, searchTerm)) {
                    results.push({
                        ...template,
                        language: lang,
                        key: key,
                        type: 'custom'
                    });
                }
            }
        }
        
        return results;
    }

    matchesSearch(template, searchTerm) {
        return (
            template.name.toLowerCase().includes(searchTerm) ||
            (template.description && template.description.toLowerCase().includes(searchTerm)) ||
            (template.code && template.code.toLowerCase().includes(searchTerm))
        );
    }

    getTemplatesByCategory(category) {
        if (category === 'all') {
            return this.getAllTemplates();
        }
        
        if (category === 'favorites') {
            return this.getFavoriteTemplates();
        }
        
        if (category === 'custom') {
            return { ...this.customTemplates };
        }
        
        return this.getTemplatesByLanguage(category);
    }

    getFavoriteTemplates() {
        const favorites = {};
        
        this.favorites.forEach(favorite => {
            const template = this.getTemplate(favorite.language, favorite.key);
            if (template) {
                if (!favorites[favorite.language]) {
                    favorites[favorite.language] = {};
                }
                favorites[favorite.language][favorite.key] = {
                    ...template,
                    isFavorite: true
                };
            }
        });
        
        return favorites;
    }

    // === FAVORITES MANAGEMENT ===
    addToFavorites(language, templateKey) {
        const favorite = { language, key: templateKey };
        
        if (!this.favorites.find(f => f.language === language && f.key === templateKey)) {
            this.favorites.push(favorite);
            this.saveSettings();
            this.showNotification('Template adicionado aos favoritos!', 'success');
        }
    }

    removeFromFavorites(language, templateKey) {
        this.favorites = this.favorites.filter(f => 
            !(f.language === language && f.key === templateKey)
        );
        this.saveSettings();
        this.showNotification('Template removido dos favoritos', 'info');
    }

    isFavorite(language, templateKey) {
        return this.favorites.some(f => f.language === language && f.key === templateKey);
    }

    // === CUSTOM TEMPLATES ===
    addCustomTemplate(name, description, code, language, category = 'custom') {
        try {
            const key = this.generateCustomKey(language, name);
            
            if (!this.customTemplates[language]) {
                this.customTemplates[language] = {};
            }
            
            if (this.customTemplates[language][key]) {
                throw new Error('Já existe um template customizado com esse nome');
            }
            
            this.customTemplates[language][key] = {
                name: name,
                description: description,
                code: code,
                category: category,
                isCustom: true,
                created: Date.now(),
                modified: Date.now()
            };
            
            this.saveSettings();
            this.showNotification('Template customizado criado com sucesso!', 'success');
            
            return key;
            
        } catch (error) {
            this.showNotification(`Erro ao criar template: ${error.message}`, 'error');
            return null;
        }
    }

    updateCustomTemplate(language, templateKey, updates) {
        try {
            if (!this.customTemplates[language] || !this.customTemplates[language][templateKey]) {
                throw new Error('Template customizado não encontrado');
            }
            
            this.customTemplates[language][templateKey] = {
                ...this.customTemplates[language][templateKey],
                ...updates,
                modified: Date.now()
            };
            
            this.saveSettings();
            this.showNotification('Template atualizado com sucesso!', 'success');
            
        } catch (error) {
            this.showNotification(`Erro ao atualizar template: ${error.message}`, 'error');
        }
    }

    deleteCustomTemplate(language, templateKey) {
        try {
            if (!this.customTemplates[language] || !this.customTemplates[language][templateKey]) {
                throw new Error('Template customizado não encontrado');
            }
            
            delete this.customTemplates[language][templateKey];
            
            // Se a categoria ficou vazia, remover
            if (Object.keys(this.customTemplates[language]).length === 0) {
                delete this.customTemplates[language];
            }
            
            // Remover dos favoritos se estava
            this.removeFromFavorites(language, templateKey);
            
            this.saveSettings();
            this.showNotification('Template customizado excluído', 'success');
            
        } catch (error) {
            this.showNotification(`Erro ao excluir template: ${error.message}`, 'error');
        }
    }

    generateCustomKey(language, name) {
        const baseKey = name.toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-');
        
        let key = baseKey;
        let counter = 1;
        
        while (this.customTemplates[language] && this.customTemplates[language][key]) {
            key = `${baseKey}-${counter}`;
            counter++;
        }
        
        return key;
    }

    // === TEMPLATE EXECUTION ===
    insertTemplate(language, templateKey) {
        const template = this.getTemplate(language, templateKey);
        
        if (template) {
            if (window.codeEditor) {
                window.codeEditor.insertText(template.code);
                this.showNotification(`Template "${template.name}" inserido!`, 'success');
            }
        } else {
            this.showNotification('Template não encontrado', 'error');
        }
    }

    applyTemplateToNewFile(language, templateKey) {
        const template = this.getTemplate(language, templateKey);
        
        if (template) {
            if (window.fileManager) {
                const fileName = this.generateFileNameFromTemplate(template.name, language);
                window.fileManager.createFile(fileName, template.code, language);
            }
        } else {
            this.showNotification('Template não encontrado', 'error');
        }
    }

    generateFileNameFromTemplate(templateName, language) {
        const baseName = templateName.toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-');
        
        const extensions = {
            javascript: 'js',
            typescript: 'ts',
            python: 'py',
            shell: 'sh',
            powershell: 'ps1',
            html: 'html',
            css: 'css',
            json: 'json'
        };
        
        const extension = extensions[language] || 'txt';
        return `${baseName}.${extension}`;
    }

    // === CATEGORIES ===
    getCategories() {
        const categories = [...this.categories];
        
        // Adicionar categorias customizadas
        Object.keys(this.customTemplates).forEach(lang => {
            Object.values(this.customTemplates[lang]).forEach(template => {
                if (template.category && !categories.includes(template.category)) {
                    categories.push(template.category);
                }
            });
        });
        
        return categories;
    }

    getTemplatesByCategoryType(category) {
        if (category === 'all') {
            return this.getAllTemplates();
        }
        
        if (category === 'favorites') {
            return this.getFavoriteTemplates();
        }
        
        if (category === 'custom') {
            return { ...this.customTemplates };
        }
        
        // Categoria personalizada
        const results = {};
        
        for (const [lang, templates] of Object.entries(this.customTemplates)) {
            for (const [key, template] of Object.entries(templates)) {
                if (template.category === category) {
                    if (!results[lang]) {
                        results[lang] = {};
                    }
                    results[lang][key] = template;
                }
            }
        }
        
        return results;
    }

    // === STATISTICS ===
    getStats() {
        const stats = {
            total: 0,
            builtIn: 0,
            custom: 0,
            favorites: this.favorites.length,
            byLanguage: {}
        };
        
        // Contar built-in
        for (const [lang, templates] of Object.entries(this.templates)) {
            const count = Object.keys(templates).length;
            stats.builtIn += count;
            stats.byLanguage[lang] = (stats.byLanguage[lang] || 0) + count;
            stats.total += count;
        }
        
        // Contar customizados
        for (const [lang, templates] of Object.entries(this.customTemplates)) {
            const count = Object.keys(templates).length;
            stats.custom += count;
            stats.byLanguage[lang] = (stats.byLanguage[lang] || 0) + count;
            stats.total += count;
        }
        
        return stats;
    }

    // === EXPORT/IMPORT ===
    exportTemplates() {
        const data = {
            customTemplates: this.customTemplates,
            favorites: this.favorites,
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mini-ide-templates.json';
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Templates exportados com sucesso!', 'success');
    }

    importTemplates(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.customTemplates) {
                    // Mesclar com templates existentes
                    this.customTemplates = {
                        ...this.customTemplates,
                        ...data.customTemplates
                    };
                }
                
                if (data.favorites) {
                    this.favorites = data.favorites;
                }
                
                this.saveSettings();
                this.showNotification('Templates importados com sucesso!', 'success');
                
            } catch (error) {
                this.showNotification(`Erro ao importar templates: ${error.message}`, 'error');
            }
        };
        reader.readAsText(file);
    }

    // === UTILITIES ===
    validateTemplate(template) {
        const errors = [];
        
        if (!template.name || typeof template.name !== 'string') {
            errors.push('Nome é obrigatório');
        }
        
        if (!template.code || typeof template.code !== 'string') {
            errors.push('Código é obrigatório');
        }
        
        if (template.name && template.name.length > 100) {
            errors.push('Nome deve ter no máximo 100 caracteres');
        }
        
        if (template.description && template.description.length > 500) {
            errors.push('Descrição deve ter no máximo 500 caracteres');
        }
        
        return errors;
    }

    previewTemplate(language, templateKey) {
        const template = this.getTemplate(language, templateKey);
        
        if (template) {
            // Mostrar preview em modal ou tooltip
            this.showTemplatePreview(template);
        }
    }

    showTemplatePreview(template) {
        // Implementar preview visual do template
        console.log('Preview template:', template);
        
        // Pode implementar modal de preview aqui
        if (window.miniIDE) {
            window.miniIDE.showNotification(`Preview: ${template.name}`, 'info');
        }
    }

    // === NOTIFICATIONS ===
    showNotification(message, type) {
        if (window.miniIDE) {
            window.miniIDE.showNotification(message, type);
        }
    }

    // === CLEANUP ===
    clearCustomTemplates() {
        if (confirm('Tem certeza que deseja excluir todos os templates customizados?')) {
            this.customTemplates = {};
            this.favorites = [];
            this.saveSettings();
            this.showNotification('Templates customizados limpos', 'success');
        }
    }

    resetToDefaults() {
        if (confirm('Tem certeza que deseja restaurar as configurações padrão? (Templates customizados serão perdidos)')) {
            this.customTemplates = {};
            this.favorites = [];
            this.saveSettings();
            this.showNotification('Configurações restauradas', 'success');
        }
    }
}

// Criar instância global
window.templateManager = new TemplateManager();
