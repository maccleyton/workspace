/**
 * CONVERSOR DE FORMATOS - THEME MANAGER
 * Gerenciador de temas para o conversor de formatos
 */

class ThemeManager {
    constructor() {
        this.currentTheme = this.getSavedTheme() || 'dark';
        this.themes = {
            dark: {
                name: 'Escuro',
                icon: '🌙',
                preview: 'dark'
            },
            light: {
                name: 'Claro',
                icon: '☀️',
                preview: 'light'
            },
            blue: {
                name: 'Azul',
                icon: '🔵',
                preview: 'blue'
            },
            green: {
                name: 'Verde',
                icon: '🟢',
                preview: 'green'
            },
            purple: {
                name: 'Roxo',
                icon: '🟣',
                preview: 'purple'
            },
            orange: {
                name: 'Laranja',
                icon: '🟠',
                preview: 'orange'
            }
        };
        
        this.init();
    }

    /**
     * Inicializa o gerenciador de temas
     */
    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
        this.setupSystemThemeListener();
        this.createThemeSelector();
    }

    /**
     * Aplica tema
     */
    applyTheme(themeName) {
        if (!this.themes[themeName]) {
            console.warn(`Tema "${themeName}" não encontrado. Usando tema padrão.`);
            themeName = 'dark';
        }

        // Remove tema anterior
        document.documentElement.removeAttribute('data-theme');
        
        // Aplica novo tema
        document.documentElement.setAttribute('data-theme', themeName);
        
        // Atualiza tema atual
        this.currentTheme = themeName;
        
        // Salva preferência
        this.saveTheme(themeName);
        
        // Dispara evento de mudança de tema
        this.dispatchThemeChangeEvent(themeName);
        
        // Atualiza ícones se necessário
        this.updateThemeIcons(themeName);
        
        console.log(`Tema aplicado: ${this.themes[themeName].name}`);
    }

    /**
     * Configura toggle de tema
     */
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Atualiza ícone do toggle
        this.updateToggleIcon(themeToggle);

        // Event listener para alternar tema
        themeToggle.addEventListener('click', () => {
            this.cycleTheme();
        });

        // Suporte a teclado
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.cycleTheme();
            }
        });
    }

    /**
     * Alterna para próximo tema
     */
    cycleTheme() {
        const themeKeys = Object.keys(this.themes);
        const currentIndex = themeKeys.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        const nextTheme = themeKeys[nextIndex];
        
        this.applyTheme(nextTheme);
        
        // Feedback visual
        this.showThemeChangeFeedback(nextTheme);
    }

    /**
     * Configura listener para tema do sistema
     */
    setupSystemThemeListener() {
        // Detecta mudanças no tema do sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleSystemThemeChange = (e) => {
            // Só muda se o usuário não definiu um tema manualmente
            if (!this.hasUserThemePreference()) {
                const systemTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(systemTheme);
            }
        };

        mediaQuery.addListener(handleSystemThemeChange);
        
        // Aplica tema do sistema na inicialização se não houver preferência
        if (!this.hasUserThemePreference()) {
            const systemTheme = mediaQuery.matches ? 'dark' : 'light';
            this.applyTheme(systemTheme);
        }
    }

    /**
     * Cria seletor de tema
     */
    createThemeSelector() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Transforma o toggle em um dropdown
        const selector = document.createElement('div');
        selector.className = 'theme-selector';
        selector.style.position = 'relative';
        selector.style.display = 'inline-block';

        // Move o toggle para dentro do selector
        themeToggle.parentNode.insertBefore(selector, themeToggle);
        selector.appendChild(themeToggle);

        // Cria menu de temas
        const menu = this.createThemeMenu();
        selector.appendChild(menu);

        // Toggle do menu
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            selector.classList.toggle('open');
        });

        // Fecha menu ao clicar fora
        document.addEventListener('click', () => {
            selector.classList.remove('open');
        });
    }

    /**
     * Cria menu de temas
     */
    createThemeMenu() {
        const menu = document.createElement('div');
        menu.className = 'theme-selector-menu';
        menu.style.display = 'none';

        // Cria opções de tema
        Object.entries(this.themes).forEach(([key, theme]) => {
            const option = document.createElement('div');
            option.className = `theme-option ${key === this.currentTheme ? 'selected' : ''}`;
            option.innerHTML = `
                <div class="theme-preview ${theme.preview}"></div>
                <span class="theme-name">${theme.name}</span>
                <span class="theme-icon">${theme.icon}</span>
            `;

            option.addEventListener('click', () => {
                this.applyTheme(key);
                // Remove seleção de todas as opções
                menu.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                // Adiciona seleção à opção clicada
                option.classList.add('selected');
            });

            menu.appendChild(option);
        });

        return menu;
    }

    /**
     * Atualiza ícone do toggle
     */
    updateToggleIcon(toggle) {
        const icon = toggle.querySelector('.theme-icon');
        if (icon) {
            // Mapeamento de temas para ícones
            const themeIcons = {
                dark: '🌙',
                light: '☀️',
                blue: '🔵',
                green: '🟢',
                purple: '🟣',
                orange: '🟠'
            };
            
            icon.textContent = themeIcons[this.currentTheme] || '🎨';
        }
    }

    /**
     * Atualiza ícones de tema
     */
    updateThemeIcons(themeName) {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            this.updateToggleIcon(themeToggle);
        }

        // Atualiza seletor de tema se existir
        const selector = document.querySelector('.theme-selector');
        if (selector) {
            const menu = selector.querySelector('.theme-selector-menu');
            if (menu) {
                const selectedOption = menu.querySelector('.theme-option.selected');
                if (selectedOption) {
                    selectedOption.classList.remove('selected');
                }
                
                const newSelected = menu.querySelector(`.theme-option:nth-child(${Object.keys(this.themes).indexOf(themeName) + 1})`);
                if (newSelected) {
                    newSelected.classList.add('selected');
                }
            }
        }
    }

    /**
     * Mostra feedback de mudança de tema
     */
    showThemeChangeFeedback(themeName) {
        const theme = this.themes[themeName];
        const message = `Tema alterado para: ${theme.name} ${theme.icon}`;
        
        this.showNotification(message, 'info');
        
        // Adiciona animação ao toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.transform = 'scale(1.1)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 200);
        }
    }

    /**
     * Mostra notificação
     */
    showNotification(message, type = 'info') {
        // Remove notificação anterior
        const existingNotification = document.querySelector('.theme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = `theme-notification theme-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Adiciona estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-surface);
            color: var(--color-text-primary);
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid var(--color-border-primary);
            box-shadow: var(--shadow-lg);
            z-index: 10001;
            font-size: 14px;
            font-weight: 500;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        // Adiciona ao DOM
        document.body.appendChild(notification);

        // Remove após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    /**
     * Retorna ícone para tipo de notificação
     */
    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    /**
     * Dispara evento de mudança de tema
     */
    dispatchThemeChangeEvent(themeName) {
        const event = new CustomEvent('themeChange', {
            detail: {
                theme: themeName,
                themeData: this.themes[themeName]
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Salva tema no localStorage
     */
    saveTheme(themeName) {
        try {
            localStorage.setItem('converter-theme', themeName);
        } catch (error) {
            console.warn('Erro ao salvar tema:', error);
        }
    }

    /**
     * Recupera tema salvo
     */
    getSavedTheme() {
        try {
            return localStorage.getItem('converter-theme');
        } catch (error) {
            console.warn('Erro ao recuperar tema:', error);
            return null;
        }
    }

    /**
     * Verifica se usuário tem preferência de tema
     */
    hasUserThemePreference() {
        return localStorage.getItem('converter-theme') !== null;
    }

    /**
     * Obtém tema atual
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Obtém dados de todos os temas
     */
    getThemes() {
        return { ...this.themes };
    }

    /**
     * Verifica se um tema é escuro
     */
    isDarkTheme(themeName = this.currentTheme) {
        return ['dark', 'blue', 'purple'].includes(themeName);
    }

    /**
     * Obtém cor primária do tema
     */
    getPrimaryColor(themeName = this.currentTheme) {
        const colorMap = {
            dark: '#3B82F6',
            light: '#3B82F6',
            blue: '#1E40AF',
            green: '#059669',
            purple: '#7C3AED',
            orange: '#EA580C'
        };
        return colorMap[themeName] || colorMap.dark;
    }

    /**
     * Alterna entre claro e escuro
     */
    toggleDarkLight() {
        const currentTheme = this.currentTheme;
        let newTheme;
        
        if (currentTheme === 'dark') {
            newTheme = 'light';
        } else if (currentTheme === 'light') {
            newTheme = 'dark';
        } else {
            // Se estiver em outro tema, alterna entre seu equivalente claro/escuro
            const equivalents = {
                blue: 'light',
                green: 'light',
                purple: 'light',
                orange: 'light'
            };
            newTheme = equivalents[currentTheme] || 'dark';
        }
        
        this.applyTheme(newTheme);
    }

    /**
     * Define tema aleatório
     */
    setRandomTheme() {
        const themeKeys = Object.keys(this.themes);
        const randomIndex = Math.floor(Math.random() * themeKeys.length);
        const randomTheme = themeKeys[randomIndex];
        
        this.applyTheme(randomTheme);
        this.showNotification(`Tema aleatório: ${this.themes[randomTheme].name}`, 'success');
    }

    /**
     * Exporta configurações de tema
     */
    exportThemeSettings() {
        const settings = {
            currentTheme: this.currentTheme,
            themes: this.themes,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'theme-settings.json';
        link.click();
        
        this.showNotification('Configurações de tema exportadas', 'success');
    }

    /**
     * Importa configurações de tema
     */
    importThemeSettings(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const settings = JSON.parse(e.target.result);
                    
                    if (settings.currentTheme && this.themes[settings.currentTheme]) {
                        this.applyTheme(settings.currentTheme);
                        this.showNotification(`Tema importado: ${this.themes[settings.currentTheme].name}`, 'success');
                        resolve(settings);
                    } else {
                        throw new Error('Tema inválido no arquivo');
                    }
                } catch (error) {
                    this.showNotification('Erro ao importar configurações: ' + error.message, 'error');
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                const error = new Error('Erro ao ler arquivo');
                this.showNotification('Erro ao ler arquivo', 'error');
                reject(error);
            };
            
            reader.readAsText(file);
        });
    }

    /**
     * Reseta para tema padrão
     */
    resetToDefault() {
        this.applyTheme('dark');
        this.showNotification('Tema resetado para padrão', 'info');
    }

    /**
     * Detecta preferência do sistema
     */
    detectSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    }

    /**
     * Aplica tema com animação
     */
    applyThemeWithAnimation(themeName) {
        // Adiciona classe de transição
        document.body.classList.add('theme-transitioning');
        
        this.applyTheme(themeName);
        
        // Remove classe após transição
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 500);
    }
}

// Inicializa gerenciador de temas quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    
    // Adiciona atalho de teclado Ctrl+T para alternar tema
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            if (window.themeManager) {
                window.themeManager.cycleTheme();
            }
        }
    });
    
    // Adiciona atalho Ctrl+Shift+T para tema aleatório
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            if (window.themeManager) {
                window.themeManager.setRandomTheme();
            }
        }
    });
});

// Event listener para mudanças de tema
document.addEventListener('themeChange', (e) => {
    console.log('Tema alterado:', e.detail);
    
    // Pode ser usado para fazer atualizações específicas baseadas no tema
    if (window.converterCore) {
        // Atualiza cores de componentes se necessário
        window.converterCore.updateThemeColors(e.detail.theme);
    }
});

// Adiciona estilos CSS para notificações de tema
const themeStyle = document.createElement('style');
themeStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .theme-notification {
        animation: slideInRight 0.3s ease;
    }
    
    .theme-notification-success {
        border-left: 4px solid var(--color-success);
    }
    
    .theme-notification-error {
        border-left: 4px solid var(--color-error);
    }
    
    .theme-notification-warning {
        border-left: 4px solid var(--color-warning);
    }
    
    .theme-notification-info {
        border-left: 4px solid var(--color-info);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .notification-icon {
        font-size: 16px;
    }
    
    .theme-selector {
        display: inline-block;
    }
    
    .theme-selector-menu {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: var(--spacing-xs);
        background: var(--color-surface);
        border: 1px solid var(--color-border-primary);
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-lg);
        z-index: var(--z-dropdown);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all var(--transition-fast);
        min-width: 150px;
    }
    
    .theme-selector.open .theme-selector-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        display: block;
    }
    
    .theme-option {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-md);
        color: var(--color-text-primary);
        font-size: var(--text-sm);
        cursor: pointer;
        transition: all var(--transition-fast);
        border-bottom: 1px solid var(--color-border-secondary);
    }
    
    .theme-option:last-child {
        border-bottom: none;
    }
    
    .theme-option:hover {
        background: var(--color-surface-hover);
        color: var(--color-primary);
    }
    
    .theme-option.selected {
        background: var(--color-primary);
        color: white;
    }
    
    .theme-preview {
        width: 20px;
        height: 20px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border-primary);
        flex-shrink: 0;
    }
    
    .theme-preview.dark { 
        background: linear-gradient(135deg, #0A0A0A 0%, #141414 100%); 
    }
    
    .theme-preview.light { 
        background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%); 
    }
    
    .theme-preview.blue { 
        background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); 
    }
    
    .theme-preview.green { 
        background: linear-gradient(135deg, #0F1F1B 0%, #1A2E28 100%); 
    }
    
    .theme-preview.purple { 
        background: linear-gradient(135deg, #1F1625 0%, #2D1B2E 100%); 
    }
    
    .theme-preview.orange { 
        background: linear-gradient(135deg, #1F1610 0%, #2D1F0F 100%); 
    }
    
    .theme-name {
        flex: 1;
    }
    
    .theme-icon {
        font-size: 14px;
    }
    
    .theme-transitioning * {
        transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease !important;
    }
`;
document.head.appendChild(themeStyle);