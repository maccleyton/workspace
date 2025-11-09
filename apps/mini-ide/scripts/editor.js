// ===== MONACO EDITOR INTEGRATION =====

class CodeEditor {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.editor = null;
        this.currentLanguage = 'javascript';
        this.currentFile = null;
        this.settings = {};
        
        // Aguardar Monaco estar disponível
        this.init();
    }

    async init() {
        try {
            console.log('📝 Inicializando Monaco Editor...');
            
            // Configurar Monaco
            require.config({ 
                paths: { 'vs': 'lib/monaco-editor/min/vs' }
            });
            
            // Aguardar Monaco carregar
            await new Promise((resolve, reject) => {
                require(['vs/editor/editor.main'], () => {
                    resolve();
                });
            });
            
            // Criar editor
            await this.createEditor();
            
            // Configurar eventos
            this.setupEventListeners();
            
            // Configurar auto-save
            this.setupAutoSave();
            
            console.log('✅ Monaco Editor inicializado');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar Monaco Editor:', error);
            throw error;
        }
    }

    async createEditor() {
        if (!this.container) {
            throw new Error('Container do editor não encontrado');
        }

        // Configurações base
        const editorOptions = {
            value: '',
            language: this.currentLanguage,
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Monaco, "Courier New", monospace',
            fontLigatures: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            minimap: { 
                enabled: true,
                side: 'right',
                maxColumn: 120
            },
            scrollBeyondLastLine: false,
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            bracketMatching: 'always',
            autoIndent: 'advanced',
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: {
                other: true,
                comments: false,
                strings: true
            },
            parameterHints: {
                enabled: true
            },
            multiCursorModifier: 'alt',
            accessibilitySupport: 'auto',
            ariaLabel: 'Mini IDE Code Editor'
        };

        // Criar editor
        this.editor = monaco.editor.create(this.container, editorOptions);
        
        // Configurar modelo
        this.setupModel();
    }

    setupModel() {
        if (!this.editor) return;

        // Obter modelo atual
        const model = this.editor.getModel();
        
        if (model) {
            // Configurar event listeners do modelo
            model.onDidChangeContent(() => {
                this.onContentChange();
            });
            
            // Configurar disposers
            this.disposers = [];
            this.disposers.push(model);
        }
    }

    setupEventListeners() {
        if (!this.editor) return;

        // Foco e seleção
        this.editor.onDidFocusEditorWidget(() => {
            console.log('📝 Editor focado');
        });

        // Cursor change
        this.editor.onDidChangeCursorPosition((e) => {
            this.onCursorPositionChange(e);
        });

        // Scroll
        this.editor.onDidScrollChange((e) => {
            this.onScrollChange(e);
        });

        // Key bindings customizados
        this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            if (window.miniIDE) {
                window.miniIDE.components.scriptExecutor.execute();
            }
        });

        this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
            if (window.miniIDE && window.miniIDE.components.fileManager) {
                window.miniIDE.components.fileManager.saveCurrentFile();
            }
        });
    }

    setupAutoSave() {
        if (!this.editor) return;

        // Auto-save após mudança de conteúdo
        this.autoSaveTimer = null;
        
        this.onContentChange = () => {
            if (this.autoSaveTimer) {
                clearTimeout(this.autoSaveTimer);
            }
            
            this.autoSaveTimer = setTimeout(() => {
                this.autoSave();
            }, 1000); // 1 segundo de delay
        };
    }

    autoSave() {
        if (window.miniIDE && window.miniIDE.components.fileManager) {
            window.miniIDE.components.fileManager.autoSaveCurrentFile();
        }
    }

    // === CONTENT OPERATIONS ===
    getContent() {
        return this.editor ? this.editor.getValue() : '';
    }

    setContent(content) {
        if (this.editor) {
            this.editor.setValue(content || '');
        }
    }

    insertText(text, position = null) {
        if (!this.editor) return;
        
        const selection = position || this.editor.getSelection();
        if (selection) {
            this.editor.executeEdits('insertTemplate', [{
                range: selection,
                text: text
            }]);
        }
    }

    getSelectedText() {
        return this.editor ? this.editor.getModel().getValueInRange(this.editor.getSelection()) : '';
    }

    replaceSelectedText(text) {
        if (!this.editor) return;
        
        const selection = this.editor.getSelection();
        if (selection) {
            this.editor.executeEdits('replaceSelection', [{
                range: selection,
                text: text
            }]);
        }
    }

    // === LANGUAGE OPERATIONS ===
    setLanguage(language) {
        if (!this.editor) return;
        
        this.currentLanguage = language;
        const model = this.editor.getModel();
        
        if (model) {
            monaco.editor.setModelLanguage(model, language);
        }
    }

    getLanguage() {
        return this.currentLanguage;
    }

    // === THEME OPERATIONS ===
    setTheme(theme) {
        if (!this.editor) return;
        
        monaco.editor.setTheme(theme);
    }

    // === EDITOR STATE ===
    focus() {
        if (this.editor) {
            this.editor.focus();
        }
    }

    blur() {
        if (this.editor) {
            this.editor.blur();
        }
    }

    layout() {
        if (this.editor) {
            this.editor.layout();
        }
    }

    // === CURSOR AND SELECTION ===
    setPosition(lineNumber, column) {
        if (this.editor) {
            this.editor.setPosition({ lineNumber, column });
        }
    }

    setSelection(startLine, startColumn, endLine, endColumn) {
        if (this.editor) {
            this.editor.setSelection({
                startLineNumber: startLine,
                startColumn: startColumn,
                endLineNumber: endLine,
                endColumn: endColumn
            });
        }
    }

    // === FORMATTING ===
    formatDocument() {
        if (this.editor) {
            this.editor.getAction('editor.action.formatDocument').run();
        }
    }

    // === SEARCH AND REPLACE ===
    find(text) {
        if (this.editor) {
            this.editor.getAction('actions.find').run();
        }
    }

    replace(findText, replaceText) {
        if (this.editor) {
            this.editor.getAction('editor.action.startFindReplaceAction').run();
            // Implementar substituição específica se necessário
        }
    }

    // === ZOOM ===
    setZoomLevel(zoom) {
        if (this.editor) {
            this.editor.updateOptions({ zoomLevel: zoom });
        }
    }

    // === WORD WRAP ===
    setWordWrap(enabled) {
        if (this.editor) {
            this.editor.updateOptions({ 
                wordWrap: enabled ? 'on' : 'off' 
            });
        }
    }

    // === LINE NUMBERS ===
    setLineNumbers(enabled) {
        if (this.editor) {
            this.editor.updateOptions({ 
                lineNumbers: enabled ? 'on' : 'off' 
            });
        }
    }

    // === MINIMAP ===
    setMinimap(enabled) {
        if (this.editor) {
            this.editor.updateOptions({ 
                minimap: { enabled: enabled } 
            });
        }
    }

    // === FONT SIZE ===
    setFontSize(size) {
        if (this.editor) {
            this.editor.updateOptions({ fontSize: size });
        }
    }

    // === EVENT HANDLERS ===
    onCursorPositionChange(event) {
        // Implementar callbacks customizados se necessário
        // console.log('Cursor position:', event.position);
    }

    onScrollChange(event) {
        // Implementar callbacks customizados se necessário
        // console.log('Scroll changed:', event);
    }

    onContentChange() {
        // Implementar callbacks customizados se necessário
        // this.autoSave(); // Já implementado acima
    }

    // === SETTINGS ===
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        
        if (this.editor) {
            const options = {};
            
            if (newSettings.fontSize) options.fontSize = newSettings.fontSize;
            if (newSettings.tabSize !== undefined) options.tabSize = newSettings.tabSize;
            if (newSettings.wordWrap !== undefined) options.wordWrap = newSettings.wordWrap ? 'on' : 'off';
            if (newSettings.lineNumbers !== undefined) options.lineNumbers = newSettings.lineNumbers ? 'on' : 'off';
            if (newSettings.minimap !== undefined) options.minimap = { enabled: newSettings.minimap };
            
            this.editor.updateOptions(options);
        }
    }

    getSettings() {
        return { ...this.settings };
    }

    // === SNIPPETS ===
    insertSnippet(snippet, position = null) {
        if (!this.editor) return;
        
        const selection = position || this.editor.getSelection();
        if (selection) {
            this.editor.executeEdits('insertSnippet', [{
                range: selection,
                text: snippet
            }]);
        }
    }

    // === MARKERS AND ERRORS ===
    setMarkers(markers) {
        if (!this.editor) return;
        
        const model = this.editor.getModel();
        if (model) {
            monaco.editor.setModelMarkers(model, 'mini-ide', markers);
        }
    }

    clearMarkers() {
        if (!this.editor) return;
        
        const model = this.editor.getModel();
        if (model) {
            monaco.editor.setModelMarkers(model, 'mini-ide', []);
        }
    }

    // === KEY BINDINGS ===
    addCommand(keybinding, handler) {
        if (!this.editor) return;
        
        this.editor.addCommand(keybinding, handler);
    }

    // === ACCESSIBILITY ===
    getAriaLabel() {
        return this.editor ? this.editor.getAriaLabel() : '';
    }

    setAriaLabel(label) {
        if (this.editor) {
            this.editor.updateOptions({ ariaLabel: label });
        }
    }

    // === CLEANUP ===
    destroy() {
        if (this.disposers) {
            this.disposers.forEach(disposer => {
                if (typeof disposer.dispose === 'function') {
                    disposer.dispose();
                }
            });
        }
        
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }
        
        if (this.editor) {
            this.editor.dispose();
            this.editor = null;
        }
        
        console.log('🧹 Monaco Editor destruído');
    }

    // === UTILITIES ===
    getLineCount() {
        return this.editor ? this.editor.getModel().getLineCount() : 0;
    }

    getLineContent(lineNumber) {
        return this.editor ? this.editor.getModel().getLineContent(lineNumber) : '';
    }

    getPosition() {
        return this.editor ? this.editor.getPosition() : null;
    }

    getSelection() {
        return this.editor ? this.editor.getSelection() : null;
    }

    // === EXPORT/IMPORT ===
    exportState() {
        return {
            content: this.getContent(),
            language: this.currentLanguage,
            position: this.getPosition(),
            selection: this.getSelection(),
            settings: this.settings
        };
    }

    importState(state) {
        if (state.content !== undefined) this.setContent(state.content);
        if (state.language) this.setLanguage(state.language);
        if (state.settings) this.updateSettings(state.settings);
        
        if (state.position) {
            this.setPosition(state.position.lineNumber, state.position.column);
        }
    }
}

// Criar instância global
window.codeEditor = new CodeEditor('editor');
