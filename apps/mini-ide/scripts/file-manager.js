// ===== FILE MANAGER =====

class FileManager {
    constructor() {
        this.files = {};
        this.currentFile = null;
        this.openFiles = [];
        this.recentFiles = [];
        this.autoSaveEnabled = true;
        this.settings = {};
        
        this.init();
    }

    init() {
        console.log('📁 Inicializando File Manager...');
        
        this.loadSettings();
        this.loadFiles();
        this.setupEventListeners();
        this.renderFileList();
        
        console.log('✅ File Manager inicializado');
    }

    loadSettings() {
        if (window.miniIDE && window.miniIDE.components.settingsManager) {
            const fileSettings = window.miniIDE.components.settingsManager.get('fileManager', {});
            this.settings = {
                autoSave: true,
                maxRecentFiles: 10,
                defaultFileName: 'script',
                ...fileSettings
            };
            this.autoSaveEnabled = this.settings.autoSave;
        }
    }

    setupEventListeners() {
        // Modal new file
        const newFileModal = document.getElementById('newFileModal');
        const createFileBtn = document.getElementById('createFileBtn');
        const cancelNewFileBtn = document.getElementById('cancelNewFileBtn');
        const closeNewFileModal = document.getElementById('closeNewFileModal');
        
        if (createFileBtn) {
            createFileBtn.onclick = () => this.createNewFile();
        }
        
        if (cancelNewFileBtn) {
            cancelNewFileBtn.onclick = () => this.hideNewFileModal();
        }
        
        if (closeNewFileModal) {
            closeNewFileModal.onclick = () => this.hideNewFileModal();
        }
        
        // Fechar modal clicando fora
        if (newFileModal) {
            newFileModal.onclick = (e) => {
                if (e.target === newFileModal) {
                    this.hideNewFileModal();
                }
            };
        }
    }

    // === FILE OPERATIONS ===
    createFile(name, content = '', language = 'javascript') {
        try {
            // Validar nome do arquivo
            if (!name || typeof name !== 'string') {
                throw new Error('Nome do arquivo é obrigatório');
            }

            // Adicionar extensão se não tiver
            name = this.addExtensionIfNeeded(name, language);
            
            // Verificar se já existe
            if (this.files[name]) {
                this.showNotification(`Arquivo "${name}" já existe`, 'warning');
                this.openFile(name);
                return;
            }

            // Criar arquivo
            this.files[name] = {
                name: name,
                content: content || this.getDefaultContent(language),
                language: language,
                created: Date.now(),
                modified: Date.now(),
                isNew: true,
                hasUnsavedChanges: false
            };

            // Adicionar à lista de abertos
            this.addToOpenFiles(name);
            
            // Salvar no localStorage
            this.saveFiles();
            
            // Renderizar lista
            this.renderFileList();
            
            // Abrir arquivo
            this.openFile(name);
            
            this.showNotification(`Arquivo "${name}" criado com sucesso!`, 'success');
            
        } catch (error) {
            this.showNotification(`Erro ao criar arquivo: ${error.message}`, 'error');
        }
    }

    openFile(name) {
        try {
            if (!this.files[name]) {
                throw new Error(`Arquivo "${name}" não encontrado`);
            }

            // Salvar arquivo atual se houver
            if (this.currentFile && this.currentFile !== name) {
                this.saveCurrentFile();
            }

            // Abrir novo arquivo
            this.currentFile = name;
            this.addToOpenFiles(name);
            
            // Carregar conteúdo no editor
            if (window.codeEditor) {
                window.codeEditor.setContent(this.files[name].content);
                window.codeEditor.setLanguage(this.files[name].language);
            }
            
            // Atualizar UI
            this.updateFileStatus();
            this.renderFileList();
            this.renderOpenFiles();
            
            this.showNotification(`Arquivo "${name}" aberto`, 'info');
            
        } catch (error) {
            this.showNotification(`Erro ao abrir arquivo: ${error.message}`, 'error');
        }
    }

    saveCurrentFile() {
        if (!this.currentFile || !this.files[this.currentFile]) {
            return;
        }

        try {
            const file = this.files[this.currentFile];
            
            // Obter conteúdo do editor
            if (window.codeEditor) {
                file.content = window.codeEditor.getContent();
            }
            
            file.modified = Date.now();
            file.hasUnsavedChanges = false;
            file.isNew = false;
            
            // Salvar no localStorage
            this.saveFiles();
            
            // Atualizar UI
            this.updateFileStatus();
            this.renderFileList();
            
            this.showNotification(`Arquivo "${this.currentFile}" salvo`, 'success');
            
        } catch (error) {
            this.showNotification(`Erro ao salvar arquivo: ${error.message}`, 'error');
        }
    }

    autoSaveCurrentFile() {
        if (this.autoSaveEnabled && this.currentFile && this.files[this.currentFile]) {
            const file = this.files[this.currentFile];
            const currentContent = window.codeEditor ? window.codeEditor.getContent() : '';
            
            if (currentContent !== file.content) {
                file.content = currentContent;
                file.modified = Date.now();
                file.hasUnsavedChanges = true;
                
                // Salvar automaticamente
                this.saveFiles();
                this.updateFileStatus();
            }
        }
    }

    deleteFile(name) {
        try {
            if (!this.files[name]) {
                throw new Error(`Arquivo "${name}" não encontrado`);
            }

            if (!confirm(`Tem certeza que deseja excluir o arquivo "${name}"?`)) {
                return;
            }

            // Se é o arquivo atual, fechar
            if (this.currentFile === name) {
                this.closeFile(name);
            }

            // Remover da lista de arquivos
            delete this.files[name];
            
            // Remover da lista de abertos
            this.removeFromOpenFiles(name);
            
            // Remover dos recentes
            this.removeFromRecentFiles(name);
            
            // Salvar alterações
            this.saveFiles();
            this.renderFileList();
            this.renderOpenFiles();
            
            this.showNotification(`Arquivo "${name}" excluído`, 'success');
            
        } catch (error) {
            this.showNotification(`Erro ao excluir arquivo: ${error.message}`, 'error');
        }
    }

    closeFile(name) {
        try {
            if (!this.files[name]) return;

            // Se há mudanças não salvas, perguntar
            if (this.files[name].hasUnsavedChanges) {
                const shouldSave = confirm(`O arquivo "${name}" tem alterações não salvas. Deseja salvar?`);
                if (shouldSave) {
                    this.saveCurrentFile();
                } else {
                    // Descartar mudanças
                    this.files[name].hasUnsavedChanges = false;
                }
            }

            // Se é o arquivo atual, fechar
            if (this.currentFile === name) {
                this.currentFile = null;
                this.renderOpenFiles();
            }

            // Remover da lista de abertos
            this.removeFromOpenFiles(name);
            
            this.showNotification(`Arquivo "${name}" fechado`, 'info');
            
        } catch (error) {
            this.showNotification(`Erro ao fechar arquivo: ${error.message}`, 'error');
        }
    }

    renameFile(oldName, newName) {
        try {
            if (!this.files[oldName]) {
                throw new Error(`Arquivo "${oldName}" não encontrado`);
            }

            if (this.files[newName]) {
                throw new Error(`Já existe um arquivo com o nome "${newName}"`);
            }

            // Renomear
            this.files[newName] = { ...this.files[oldName] };
            this.files[newName].name = newName;
            this.files[newName].modified = Date.now();
            
            delete this.files[oldName];

            // Atualizar listas
            this.updateFileInLists(oldName, newName);
            
            // Se era o arquivo atual, atualizar
            if (this.currentFile === oldName) {
                this.currentFile = newName;
            }
            
            // Salvar alterações
            this.saveFiles();
            this.renderFileList();
            this.renderOpenFiles();
            
            this.showNotification(`Arquivo renomeado para "${newName}"`, 'success');
            
        } catch (error) {
            this.showNotification(`Erro ao renomear arquivo: ${error.message}`, 'error');
        }
    }

    // === HELPER METHODS ===
    addExtensionIfNeeded(name, language) {
        const extensions = {
            javascript: 'js',
            typescript: 'ts',
            python: 'py',
            shell: 'sh',
            powershell: 'ps1',
            html: 'html',
            css: 'css',
            json: 'json',
            plaintext: 'txt'
        };

        const extension = extensions[language] || 'txt';
        const hasExtension = name.includes('.');
        
        return hasExtension ? name : `${name}.${extension}`;
    }

    getDefaultContent(language) {
        const templates = {
            javascript: `// Arquivo JavaScript
console.log('Hello, World!');

function exemplo() {
    console.log('Esta é uma função de exemplo');
    return 'Sucesso!';
}

exemplo();`,
            typescript: `// Arquivo TypeScript
interface Usuario {
    nome: string;
    idade: number;
}

const usuario: Usuario = {
    nome: 'João',
    idade: 30
};

console.log(usuario);`,
            python: `# Arquivo Python
print('Hello, World!')

def exemplo():
    print('Esta é uma função de exemplo')
    return 'Sucesso!'

exemplo()`,
            shell: `#!/bin/bash
# Arquivo Shell/Bash
echo "Hello, World!"

exemplo() {
    echo "Esta é uma função de exemplo"
    return 0
}

exemplo`,
            html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documento</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
            css: `/* Arquivo CSS */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}`,
            json: `{
    "mensagem": "Hello, World!",
    "status": "sucesso",
    "timestamp": "${new Date().toISOString()}"
}`,
            plaintext: 'Hello, World!'
        };

        return templates[language] || templates.plaintext;
    }

    // === FILE LISTS MANAGEMENT ===
    addToOpenFiles(name) {
        if (!this.openFiles.includes(name)) {
            this.openFiles.push(name);
            this.addToRecentFiles(name);
        }
    }

    removeFromOpenFiles(name) {
        const index = this.openFiles.indexOf(name);
        if (index > -1) {
            this.openFiles.splice(index, 1);
        }
    }

    addToRecentFiles(name) {
        // Remover se já existe
        this.removeFromRecentFiles(name);
        
        // Adicionar no início
        this.recentFiles.unshift(name);
        
        // Manter apenas os últimos N
        if (this.recentFiles.length > this.settings.maxRecentFiles) {
            this.recentFiles = this.recentFiles.slice(0, this.settings.maxRecentFiles);
        }
        
        this.saveFiles();
    }

    removeFromRecentFiles(name) {
        const index = this.recentFiles.indexOf(name);
        if (index > -1) {
            this.recentFiles.splice(index, 1);
        }
    }

    updateFileInLists(oldName, newName) {
        // Atualizar openFiles
        const openIndex = this.openFiles.indexOf(oldName);
        if (openIndex > -1) {
            this.openFiles[openIndex] = newName;
        }
        
        // Atualizar recentFiles
        const recentIndex = this.recentFiles.indexOf(oldName);
        if (recentIndex > -1) {
            this.recentFiles[recentIndex] = newName;
        }
    }

    // === UI RENDERING ===
    renderFileList() {
        const fileList = document.getElementById('fileList');
        if (!fileList) return;

        fileList.innerHTML = '';

        // Ordenar arquivos por nome
        const sortedFiles = Object.keys(this.files).sort();

        sortedFiles.forEach(fileName => {
            const file = this.files[fileName];
            const fileItem = this.createFileItem(file);
            fileList.appendChild(fileItem);
        });
    }

    createFileItem(file) {
        const div = document.createElement('div');
        div.className = `file-item ${file.name === this.currentFile ? 'active' : ''}`;
        div.title = `${file.name}\nLinguagem: ${file.language}\nModificado: ${new Date(file.modified).toLocaleString()}`;

        // Ícone baseado na linguagem
        const icon = this.getFileIcon(file.language);
        
        div.innerHTML = `
            <i class="fas ${icon} file-icon"></i>
            <span class="file-name">${file.name}</span>
            <button class="file-close" onclick="fileManager.deleteFile('${file.name}')">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Event listener para abrir arquivo
        div.onclick = (e) => {
            if (e.target.closest('.file-close')) return;
            this.openFile(file.name);
        };

        return div;
    }

    renderOpenFiles() {
        const tabsContainer = document.getElementById('editorTabs');
        if (!tabsContainer) return;

        tabsContainer.innerHTML = '';

        this.openFiles.forEach(fileName => {
            if (this.files[fileName]) {
                const file = this.files[fileName];
                const tab = this.createFileTab(file);
                tabsContainer.appendChild(tab);
            }
        });
    }

    createFileTab(file) {
        const div = document.createElement('div');
        div.className = `editor-tab ${file.name === this.currentFile ? 'active' : ''}`;
        
        // Ícone baseado na linguagem
        const icon = this.getFileIcon(file.language);
        
        div.innerHTML = `
            <i class="fas ${icon} tab-icon"></i>
            <span>${file.name}</span>
            ${file.hasUnsavedChanges ? '<span class="unsaved-indicator">●</span>' : ''}
            <button class="tab-close" onclick="event.stopPropagation(); fileManager.closeFile('${file.name}')">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Event listener para trocar arquivo
        div.onclick = () => this.openFile(file.name);

        return div;
    }

    getFileIcon(language) {
        const icons = {
            javascript: 'fa-js',
            typescript: 'fa-js',
            python: 'fa-python',
            shell: 'fa-terminal',
            powershell: 'fa-terminal',
            html: 'fa-html5',
            css: 'fa-css3',
            json: 'fa-code',
            plaintext: 'fa-file-alt'
        };

        return icons[language] || 'fa-file';
    }

    updateFileStatus() {
        if (!this.currentFile || !window.codeEditor) return;

        const file = this.files[this.currentFile];
        const currentContent = window.codeEditor.getContent();
        const hasChanges = currentContent !== file.content;
        
        file.hasUnsavedChanges = hasChanges;
        
        // Atualizar tabs
        this.renderOpenFiles();
    }

    // === STORAGE ===
    saveFiles() {
        try {
            const data = {
                files: this.files,
                openFiles: this.openFiles,
                recentFiles: this.recentFiles,
                currentFile: this.currentFile,
                lastModified: Date.now()
            };
            
            localStorage.setItem('mini-ide-files', JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao salvar arquivos:', error);
        }
    }

    loadFiles() {
        try {
            const saved = localStorage.getItem('mini-ide-files');
            if (saved) {
                const data = JSON.parse(saved);
                this.files = data.files || {};
                this.openFiles = data.openFiles || [];
                this.recentFiles = data.recentFiles || [];
                this.currentFile = data.currentFile || null;
            }
        } catch (error) {
            console.error('Erro ao carregar arquivos:', error);
            this.files = {};
        }
    }

    // === GETTERS ===
    getCurrentFile() {
        return this.currentFile;
    }

    getCurrentFileContent() {
        if (!this.currentFile || !this.files[this.currentFile]) {
            return '';
        }
        return this.files[this.currentFile].content;
    }

    getFileCount() {
        return Object.keys(this.files).length;
    }

    getAllFiles() {
        return { ...this.files };
    }

    // === CLEANUP ===
    clearAllFiles() {
        if (confirm('Tem certeza que deseja limpar todos os arquivos? Esta ação não pode ser desfeita.')) {
            this.files = {};
            this.openFiles = [];
            this.recentFiles = [];
            this.currentFile = null;
            
            this.saveFiles();
            this.renderFileList();
            this.renderOpenFiles();
            
            if (window.codeEditor) {
                window.codeEditor.setContent('');
            }
            
            this.showNotification('Todos os arquivos foram limpos', 'success');
        }
    }

    exportFiles() {
        const data = {
            files: this.files,
            exportedAt: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mini-ide-files.json';
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Arquivos exportados com sucesso!', 'success');
    }

    importFiles(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.files) {
                    this.files = data.files;
                    this.saveFiles();
                    this.renderFileList();
                    
                    this.showNotification('Arquivos importados com sucesso!', 'success');
                } else {
                    throw new Error('Formato de arquivo inválido');
                }
            } catch (error) {
                this.showNotification(`Erro ao importar: ${error.message}`, 'error');
            }
        };
        reader.readAsText(file);
    }

    // === MODAL MANAGEMENT ===
    showNewFileModal() {
        const modal = document.getElementById('newFileModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideNewFileModal() {
        const modal = document.getElementById('newFileModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    createNewFile() {
        const nameInput = document.getElementById('newFileName');
        const languageSelect = document.getElementById('newFileLanguage');
        const templateSelect = document.getElementById('newFileTemplate');
        
        if (!nameInput || !languageSelect) return;
        
        const name = nameInput.value.trim();
        const language = languageSelect.value;
        const templateValue = templateSelect ? templateSelect.value : '';
        
        if (!name) {
            this.showNotification('Nome do arquivo é obrigatório', 'error');
            return;
        }
        
        let content = '';
        if (templateValue && window.miniIDE && window.miniIDE.components.templateManager) {
            const [lang, templateKey] = templateValue.split(':');
            const template = window.miniIDE.components.templateManager.getTemplate(lang, templateKey);
            if (template) {
                content = template.code;
            }
        }
        
        this.createFile(name, content, language);
        this.hideNewFileModal();
    }

    // === NOTIFICATIONS ===
    showNotification(message, type) {
        if (window.miniIDE) {
            window.miniIDE.showNotification(message, type);
        }
    }
}

// Criar instância global
window.fileManager = new FileManager();
