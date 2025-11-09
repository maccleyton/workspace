// ===== SETTINGS MANAGER =====

class SettingsManager {
    constructor() {
        this.settings = {};
        this.defaultSettings = this.getDefaultSettings();
        this.listeners = [];
        this.isLoaded = false;
        
        this.init();
    }

    init() {
        console.log('⚙️ Inicializando Settings Manager...');
        
        this.loadSettings();
        this.setupEventListeners();
        this.setupSettingsModal();
        
        this.isLoaded = true;
        console.log('✅ Settings Manager inicializado');
    }

    getDefaultSettings() {
        return {
            editor: {
                fontSize: 14,
                fontFamily: 'JetBrains Mono, Monaco, "Courier New", monospace',
                tabSize: 2,
                insertSpaces: true,
                wordWrap: true,
                lineNumbers: true,
                minimap: true,
                formatOnSave: true,
                formatOnPaste: true,
                autoSave: {
                    enabled: true,
                    delay: 1000
                }
            },
            execution: {
                timeout: 30000,
                maxOutput: 10000,
                clearOutputOnRun: true,
                showExecutionTime: true,
                defaultLanguage: 'javascript'
            },
            fileManager: {
                autoSave: true,
                maxRecentFiles: 10,
                defaultFileName: 'script',
                confirmOnDelete: true,
                autoSaveOnSwitch: true
            },
            ui: {
                theme: 'dark',
                sidebarWidth: 240,
                outputPanelWidth: 300,
                showConsole: true,
                autoHideConsole: false,
                compactMode: false,
                showMinimap: true,
                showLineNumbers: true,
                animations: true
            },
            shortcuts: {
                execute: 'Ctrl+Enter',
                save: 'Ctrl+S',
                newFile: 'Ctrl+N',
                openFile: 'Ctrl+O',
                toggleSidebar: 'Ctrl+B',
                toggleConsole: 'Ctrl+`',
                find: 'Ctrl+F',
                replace: 'Ctrl+H',
                formatCode: 'Shift+Alt+F',
                toggleFullscreen: 'F11'
            },
            syntax: {
                highlightLine: true,
                highlightSelection: true,
                showInvisibles: false,
                bracketMatching: true,
                autoIndent: true,
                bracketPairColorization: true
            },
            completion: {
                enabled: true,
                triggerOnTyping: true,
                showSuggestionPreview: true,
                quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: true
                }
            }
        };
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('mini-ide-settings');
            if (saved) {
                const savedSettings = JSON.parse(saved);
                this.settings = this.mergeSettings(this.defaultSettings, savedSettings);
            } else {
                this.settings = { ...this.defaultSettings };
            }
        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
            this.settings = { ...this.defaultSettings };
        }
    }

    saveSettings() {
        try {
            const data = {
                settings: this.settings,
                version: '1.0.0',
                lastModified: Date.now()
            };
            
            localStorage.setItem('mini-ide-settings', JSON.stringify(data));
            
            // Notificar listeners
            this.notifyListeners();
            
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
        }
    }

    mergeSettings(defaults, saved) {
        const merged = { ...defaults };
        
        for (const [key, value] of Object.entries(saved)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                merged[key] = this.mergeSettings(defaults[key] || {}, value);
            } else {
                merged[key] = value;
            }
        }
        
        return merged;
    }

    setupEventListeners() {
        // Configurações modal
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        const resetSettingsBtn = document.getElementById('resetSettingsBtn');
        const closeSettingsModal = document.getElementById('closeSettingsModal');
        
        if (saveSettingsBtn) {
            saveSettingsBtn.onclick = () => this.saveSettingsFromModal();
        }
        
        if (resetSettingsBtn) {
            resetSettingsBtn.onclick = () => this.resetSettings();
        }
        
        if (closeSettingsModal) {
            closeSettingsModal.onclick = () => this.hideSettingsModal();
        }
        
        // Fechar modal clicando fora
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            settingsModal.onclick = (e) => {
                if (e.target === settingsModal) {
                    this.hideSettingsModal();
                }
            };
        }
    }

    setupSettingsModal() {
        // Configurar navegação das abas
        const navItems = document.querySelectorAll('.settings-nav-item');
        const tabs = document.querySelectorAll('.settings-tab');
        
        navItems.forEach(item => {
            item.onclick = () => {
                const targetTab = item.getAttribute('data-tab');
                
                // Atualizar navegação
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Mostrar aba correspondente
                tabs.forEach(tab => tab.classList.remove('active'));
                const targetTabElement = document.getElementById(`${targetTab}Settings`);
                if (targetTabElement) {
                    targetTabElement.classList.add('active');
                }
            };
        });
        
        // Configurar inputs em tempo real
        this.setupLiveUpdates();
    }

    setupLiveUpdates() {
        // Font size
        const fontSizeInput = document.getElementById('fontSizeInput');
        const fontSizeValue = document.getElementById('fontSizeValue');
        if (fontSizeInput && fontSizeValue) {
            fontSizeInput.oninput = () => {
                const value = fontSizeInput.value;
                fontSizeValue.textContent = value + 'px';
                this.updateEditorSetting('fontSize', parseInt(value));
            };
        }
        
        // Sidebar width
        const sidebarWidthInput = document.getElementById('sidebarWidthInput');
        const sidebarWidthValue = document.getElementById('sidebarWidthValue');
        if (sidebarWidthInput && sidebarWidthValue) {
            sidebarWidthInput.oninput = () => {
                const value = sidebarWidthInput.value;
                sidebarWidthValue.textContent = value + 'px';
                this.updateUISetting('sidebarWidth', parseInt(value));
            };
        }
        
        // Checkboxes para auto-update
        const checkboxes = document.querySelectorAll('#settingsModal input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.onchange = () => this.updateSettingFromInput(checkbox);
        });
        
        // Number inputs
        const numberInputs = document.querySelectorAll('#settingsModal input[type="number"]');
        numberInputs.forEach(input => {
            input.onchange = () => this.updateSettingFromInput(input);
        });
        
        // Range inputs
        const rangeInputs = document.querySelectorAll('#settingsModal input[type="range"]');
        rangeInputs.forEach(input => {
            input.oninput = () => this.updateSettingFromInput(input);
        });
    }

    // === GETTERS ===
    get(path, defaultValue = null) {
        const keys = path.split('.');
        let value = this.settings;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return defaultValue;
            }
        }
        
        return value;
    }

    getAllSettings() {
        return JSON.parse(JSON.stringify(this.settings));
    }

    getEditorSettings() {
        return { ...this.settings.editor };
    }

    getExecutionSettings() {
        return { ...this.settings.execution };
    }

    getUISettings() {
        return { ...this.settings.ui };
    }

    getShortcutSettings() {
        return { ...this.settings.shortcuts };
    }

    // === SETTERS ===
    set(path, value) {
        const keys = path.split('.');
        let current = this.settings;
        
        // Navegar até o penúltimo nível
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        
        // Definir o valor
        current[keys[keys.length - 1]] = value;
        
        // Notificar mudanças
        this.notifyListeners();
    }

    update(path, updates) {
        const current = this.get(path, {});
        const merged = { ...current, ...updates };
        this.set(path, merged);
    }

    // === EDITOR SETTINGS ===
    updateEditorSetting(key, value) {
        this.update('editor', { [key]: value });
        this.applyEditorSetting(key, value);
    }

    applyEditorSetting(key, value) {
        if (window.codeEditor) {
            switch (key) {
                case 'fontSize':
                    window.codeEditor.setFontSize(value);
                    break;
                case 'tabSize':
                    // Atualizar configuração do Monaco
                    break;
                case 'wordWrap':
                    window.codeEditor.setWordWrap(value);
                    break;
                case 'lineNumbers':
                    window.codeEditor.setLineNumbers(value);
                    break;
                case 'minimap':
                    window.codeEditor.setMinimap(value);
                    break;
            }
        }
    }

    // === UI SETTINGS ===
    updateUISetting(key, value) {
        this.update('ui', { [key]: value });
        this.applyUISetting(key, value);
    }

    applyUISetting(key, value) {
        const root = document.documentElement;
        
        switch (key) {
            case 'sidebarWidth':
                const explorer = document.getElementById('fileExplorer');
                if (explorer) {
                    explorer.style.width = value + 'px';
                }
                break;
            case 'theme':
                if (window.miniIDE) {
                    window.miniIDE.applyTheme(value);
                }
                break;
            case 'compactMode':
                document.body.classList.toggle('compact-mode', value);
                break;
        }
    }

    // === EXECUTION SETTINGS ===
    updateExecutionSetting(key, value) {
        this.update('execution', { [key]: value });
        
        if (window.scriptExecutor) {
            const execSettings = this.getExecutionSettings();
            window.scriptExecutor.updateSettings(execSettings);
        }
    }

    // === INPUT HANDLING ===
    updateSettingFromInput(input) {
        const id = input.id;
        const value = input.type === 'checkbox' ? input.checked : 
                     input.type === 'number' ? parseInt(input.value) :
                     input.type === 'range' ? parseInt(input.value) : input.value;
        
        const settingMap = {
            'fontSizeInput': 'editor.fontSize',
            'tabSizeInput': 'editor.tabSize',
            'wordWrapInput': 'editor.wordWrap',
            'lineNumbersInput': 'editor.lineNumbers',
            'minimapInput': 'editor.minimap',
            'timeoutInput': 'execution.timeout',
            'maxOutputInput': 'execution.maxOutput',
            'clearOutputOnRunInput': 'execution.clearOutputOnRun',
            'showExecutionTimeInput': 'execution.showExecutionTime',
            'sidebarWidthInput': 'ui.sidebarWidth',
            'showConsoleInput': 'ui.showConsole',
            'compactModeInput': 'ui.compactMode'
        };
        
        const settingPath = settingMap[id];
        if (settingPath) {
            this.set(settingPath, value);
        }
    }

    // === MODAL POPULATION ===
    populateSettings() {
        // Editor settings
        const fontSizeInput = document.getElementById('fontSizeInput');
        const fontSizeValue = document.getElementById('fontSizeValue');
        if (fontSizeInput && fontSizeValue) {
            const fontSize = this.get('editor.fontSize', 14);
            fontSizeInput.value = fontSize;
            fontSizeValue.textContent = fontSize + 'px';
        }
        
        const tabSizeInput = document.getElementById('tabSizeInput');
        if (tabSizeInput) {
            tabSizeInput.value = this.get('editor.tabSize', 2);
        }
        
        const wordWrapInput = document.getElementById('wordWrapInput');
        if (wordWrapInput) {
            wordWrapInput.checked = this.get('editor.wordWrap', true);
        }
        
        const lineNumbersInput = document.getElementById('lineNumbersInput');
        if (lineNumbersInput) {
            lineNumbersInput.checked = this.get('editor.lineNumbers', true);
        }
        
        const minimapInput = document.getElementById('minimapInput');
        if (minimapInput) {
            minimapInput.checked = this.get('editor.minimap', true);
        }
        
        // Execution settings
        const timeoutInput = document.getElementById('timeoutInput');
        if (timeoutInput) {
            timeoutInput.value = this.get('execution.timeout', 30000);
        }
        
        const maxOutputInput = document.getElementById('maxOutputInput');
        if (maxOutputInput) {
            maxOutputInput.value = this.get('execution.maxOutput', 10000);
        }
        
        const clearOutputOnRunInput = document.getElementById('clearOutputOnRunInput');
        if (clearOutputOnRunInput) {
            clearOutputOnRunInput.checked = this.get('execution.clearOutputOnRun', true);
        }
        
        const showExecutionTimeInput = document.getElementById('showExecutionTimeInput');
        if (showExecutionTimeInput) {
            showExecutionTimeInput.checked = this.get('execution.showExecutionTime', true);
        }
        
        // UI settings
        const sidebarWidthInput = document.getElementById('sidebarWidthInput');
        const sidebarWidthValue = document.getElementById('sidebarWidthValue');
        if (sidebarWidthInput && sidebarWidthValue) {
            const sidebarWidth = this.get('ui.sidebarWidth', 240);
            sidebarWidthInput.value = sidebarWidth;
            sidebarWidthValue.textContent = sidebarWidth + 'px';
        }
        
        const showConsoleInput = document.getElementById('showConsoleInput');
        if (showConsoleInput) {
            showConsoleInput.checked = this.get('ui.showConsole', true);
        }
        
        const compactModeInput = document.getElementById('compactModeInput');
        if (compactModeInput) {
            compactModeInput.checked = this.get('ui.compactMode', false);
        }
        
        // Populate shortcuts
        this.populateShortcuts();
    }

    populateShortcuts() {
        const shortcutsList = document.getElementById('shortcutsList');
        if (!shortcutsList) return;
        
        shortcutsList.innerHTML = '';
        
        const shortcuts = this.get('shortcuts', {});
        const shortcutNames = {
            execute: 'Executar',
            save: 'Salvar',
            newFile: 'Novo Arquivo',
            openFile: 'Abrir Arquivo',
            toggleSidebar: 'Alternar Barra Lateral',
            toggleConsole: 'Alternar Console',
            find: 'Buscar',
            replace: 'Substituir',
            formatCode: 'Formatar Código',
            toggleFullscreen: 'Tela Cheia'
        };
        
        Object.entries(shortcuts).forEach(([key, value]) => {
            const item = document.createElement('div');
            item.className = 'shortcut-item';
            item.innerHTML = `
                <span class="shortcut-name">${shortcutNames[key] || key}</span>
                <code class="shortcut-key">${value}</code>
            `;
            shortcutsList.appendChild(item);
        });
    }

    // === MODAL MANAGEMENT ===
    showSettingsModal() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            this.populateSettings();
            modal.style.display = 'flex';
        }
    }

    hideSettingsModal() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    saveSettingsFromModal() {
        this.saveSettings();
        this.applyAllSettings();
        this.hideSettingsModal();
        
        if (window.miniIDE) {
            window.miniIDE.showNotification('Configurações salvas com sucesso!', 'success');
        }
    }

    resetSettings() {
        if (confirm('Tem certeza que deseja restaurar as configurações padrão? Todas as suas personalizações serão perdidas.')) {
            this.settings = { ...this.defaultSettings };
            this.saveSettings();
            this.applyAllSettings();
            this.populateSettings();
            
            if (window.miniIDE) {
                window.miniIDE.showNotification('Configurações restauradas!', 'success');
            }
        }
    }

    // === SETTINGS APPLICATION ===
    applyAllSettings() {
        // Aplicar configurações do editor
        const editorSettings = this.getEditorSettings();
        if (window.codeEditor) {
            window.codeEditor.updateSettings(editorSettings);
        }
        
        // Aplicar configurações de UI
        const uiSettings = this.getUISettings();
        this.applyUISettings(uiSettings);
        
        // Aplicar configurações de execução
        const execSettings = this.getExecutionSettings();
        if (window.scriptExecutor) {
            window.scriptExecutor.updateSettings(execSettings);
        }
    }

    applyUISettings(uiSettings) {
        for (const [key, value] of Object.entries(uiSettings)) {
            this.applyUISetting(key, value);
        }
    }

    // === IMPORT/EXPORT ===
    exportSettings() {
        const data = {
            settings: this.getAllSettings(),
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mini-ide-settings.json';
        a.click();
        URL.revokeObjectURL(url);
        
        if (window.miniIDE) {
            window.miniIDE.showNotification('Configurações exportadas!', 'success');
        }
    }

    importSettings(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.settings) {
                    this.settings = this.mergeSettings(this.defaultSettings, data.settings);
                    this.saveSettings();
                    this.applyAllSettings();
                    this.populateSettings();
                    
                    if (window.miniIDE) {
                        window.miniIDE.showNotification('Configurações importadas!', 'success');
                    }
                } else {
                    throw new Error('Formato de arquivo inválido');
                }
            } catch (error) {
                if (window.miniIDE) {
                    window.miniIDE.showNotification(`Erro ao importar: ${error.message}`, 'error');
                }
            }
        };
        reader.readAsText(file);
    }

    // === EVENT LISTENERS ===
    onChange(callback) {
        this.listeners.push(callback);
    }

    offChange(callback) {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }

    notifyListeners() {
        this.listeners.forEach(callback => {
            try {
                callback(this.getAllSettings());
            } catch (error) {
                console.error('Erro no listener de configurações:', error);
            }
        });
    }

    // === UTILITIES ===
    getTheme() {
        return this.get('ui.theme', 'dark');
    }

    isDarkTheme() {
        return this.getTheme() === 'dark';
    }

    getFontSize() {
        return this.get('editor.fontSize', 14);
    }

    isAutoSaveEnabled() {
        return this.get('editor.autoSave.enabled', true);
    }

    getAutoSaveDelay() {
        return this.get('editor.autoSave.delay', 1000);
    }

    isCompactMode() {
        return this.get('ui.compactMode', false);
    }

    // === CLEANUP ===
    clearAllSettings() {
        localStorage.removeItem('mini-ide-settings');
        this.settings = { ...this.defaultSettings };
        
        if (window.miniIDE) {
            window.miniIDE.showNotification('Configurações limpas!', 'success');
        }
    }
}

// Criar instância global
window.settingsManager = new SettingsManager();
