# ⚙️ Configurações - Mini IDE
## Settings e Preferências

### 🎯 **Configurações Principais**

#### **Editor Settings**
```json
{
  "editor": {
    "fontSize": 14,
    "fontFamily": "JetBrains Mono, Monaco, 'Courier New', monospace",
    "tabSize": 2,
    "insertSpaces": true,
    "wordWrap": "on",
    "lineNumbers": "on",
    "minimap": {
      "enabled": true,
      "side": "right"
    },
    "formatOnSave": true,
    "formatOnPaste": true,
    "autoSave": {
      "enabled": true,
      "delay": 1000
    },
    "theme": "vs-dark"
  }
}
```

#### **Execution Settings**
```json
{
  "execution": {
    "timeout": 30000,
    "maxOutput": 10000,
    "clearOutputOnRun": true,
    "showExecutionTime": true,
    "defaultLanguage": "javascript"
  }
}
```

#### **File Manager Settings**
```json
{
  "fileManager": {
    "autoSave": true,
    "backupFiles": true,
    "maxRecentFiles": 10,
    "defaultFileName": "script",
    "extensions": {
      "javascript": "js",
      "python": "py",
      "shell": "sh"
    }
  }
}
```

#### **UI Settings**
```json
{
  "ui": {
    "theme": "dark",
    "sidebarWidth": 240,
    "outputPanelHeight": 200,
    "showConsole": true,
    "autoHideConsole": false,
    "compactMode": false
  }
}
```

#### **Shortcuts Settings**
```json
{
  "shortcuts": {
    "execute": "Ctrl+Enter",
    "save": "Ctrl+S",
    "newFile": "Ctrl+N",
    "openFile": "Ctrl+O",
    "toggleSidebar": "Ctrl+B",
    "toggleConsole": "Ctrl+`",
    "find": "Ctrl+F",
    "replace": "Ctrl+H",
    "formatCode": "Shift+Alt+F"
  }
}
```

### 🔧 **Configurações Avançadas**

#### **Syntax Highlighting**
```json
{
  "syntax": {
    "highlightLine": true,
    "highlightSelection": true,
    "showInvisibles": false,
    "bracketMatching": true,
    "autoIndent": true
  }
}
```

#### **Code Completion**
```json
{
  "completion": {
    "enabled": true,
    "triggerOnTyping": true,
    "showSuggestionPreview": true,
    "quickSuggestions": {
      "other": true,
      "comments": false,
      "strings": true
    }
  }
}
```

#### **Linting & Validation**
```json
{
  "linting": {
    "enabled": false,
    "javascript": {
      "eslint": {
        "enabled": false,
        "configFile": ".eslintrc.json"
      }
    },
    "python": {
      "enabled": false,
      "pyflakes": false
    }
  }
}
```

#### **Performance Settings**
```json
{
  "performance": {
    "maxFileSize": 1048576,
    "maxFilesInMemory": 100,
    "lazyLoading": true,
    "workerThreads": true,
    "memoryLimit": 134217728
  }
}
```

### 🎨 **Temas Disponíveis**

#### **Dark Theme (Default)**
```css
[data-theme="dark"] {
  --editor-bg: #1e1e1e;
  --editor-fg: #d4d4d4;
  --editor-selection: #264f78;
  --editor-line-number: #858585;
  --editor-cursor: #aeafad;
}
```

#### **Light Theme**
```css
[data-theme="light"] {
  --editor-bg: #ffffff;
  --editor-fg: #000000;
  --editor-selection: #add6ff;
  --editor-line-number: #237893;
  --editor-cursor: #000000;
}
```

#### **High Contrast Theme**
```css
[data-theme="hc"] {
  --editor-bg: #000000;
  --editor-fg: #ffffff;
  --editor-selection: #ffffff;
  --editor-line-number: #ffffff;
  --editor-cursor: #ffffff;
}
```

### 🔌 **Extensões e Plugins**

#### **Planned Extensions**
- **Git Integration** - Version control
- **Live Server** - Local development server
- **Code Formatter** - Prettier, Black, etc.
- **Package Manager** - npm, pip integration
- **Terminal Emulator** - Embedded terminal
- **Collaboration** - Real-time editing
- **Cloud Sync** - File synchronization
- **AI Assistant** - Code completion and suggestions

#### **Plugin System**
```javascript
// Example plugin structure
const plugin = {
  name: "Example Plugin",
  version: "1.0.0",
  activate: (context) => {
    // Plugin activation code
  },
  deactivate: () => {
    // Plugin cleanup
  }
};
```

### 💾 **Persistência de Configurações**

#### **Local Storage Schema**
```json
{
  "settings": {
    "version": "1.0.0",
    "lastModified": "2025-11-07T08:22:11Z",
    "editor": { /* editor settings */ },
    "execution": { /* execution settings */ },
    "fileManager": { /* file manager settings */ },
    "ui": { /* UI settings */ },
    "shortcuts": { /* shortcuts settings */ }
  },
  "files": {
    "currentFile": "main.js",
    "openFiles": ["main.js", "test.js"],
    "recentFiles": ["script.js", "utils.js"]
  },
  "templates": {
    "favorites": ["hello-world", "async-function"],
    "customTemplates": []
  }
}
```

#### **Settings Import/Export**
```javascript
// Export settings
function exportSettings() {
  const settings = {
    version: "1.0.0",
    exportDate: new Date().toISOString(),
    settings: window.settingsManager.getAllSettings(),
    customTemplates: window.templateManager.getCustomTemplates()
  };
  
  const blob = new Blob([JSON.stringify(settings, null, 2)], {
    type: 'application/json'
  });
  
  downloadFile(blob, 'mini-ide-settings.json');
}

// Import settings
function importSettings(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const settings = JSON.parse(e.target.result);
      window.settingsManager.importSettings(settings);
      showNotification('Configurações importadas com sucesso!');
    } catch (error) {
      showNotification('Erro ao importar configurações', 'error');
    }
  };
  reader.readAsText(file);
}
```

### 🔄 **Configurações por Linguagem**

#### **JavaScript Settings**
```json
{
  "javascript": {
    "formatter": "prettier",
    "linter": "eslint",
    "autoComplete": true,
    "lintOnSave": false,
    "checkJs": false,
    "nodePath": "/usr/bin/node"
  }
}
```

#### **Python Settings**
```json
{
  "python": {
    "formatter": "black",
    "linter": "pyflakes",
    "autoComplete": true,
    "lintOnSave": false,
    "pythonPath": "/usr/bin/python3",
    "virtualEnv": null
  }
}
```

#### **Shell Settings**
```json
{
  "shell": {
    "formatter": null,
    "linter": null,
    "autoComplete": true,
    "shellPath": "/bin/bash",
    "checkForUpdates": true
  }
}
```

### 🚀 **Configurações Recomendadas**

#### **Para Desenvolvimento**
```json
{
  "editor": {
    "fontSize": 14,
    "tabSize": 2,
    "wordWrap": "on",
    "formatOnSave": true,
    "autoSave": { "enabled": true, "delay": 1000 }
  },
  "execution": {
    "clearOutputOnRun": true,
    "showExecutionTime": true
  },
  "ui": {
    "showConsole": true,
    "autoHideConsole": false
  }
}
```

#### **Para Apresentação**
```json
{
  "editor": {
    "fontSize": 16,
    "minimap": { "enabled": false },
    "autoSave": { "enabled": false }
  },
  "ui": {
    "compactMode": true,
    "showConsole": false
  }
}
```

### 📊 **Performance Tuning**

#### **Para Máquinas Lentas**
```json
{
  "editor": {
    "minimap": { "enabled": false },
    "renderWhitespace": "none"
  },
  "performance": {
    "lazyLoading": true,
    "maxFilesInMemory": 50
  },
  "ui": {
    "compactMode": true
  }
}
```

---

**⚙️ Status**: Sistema de configurações completo e extensível implementado!

**📝 Localização**: Todas as configurações são salvas no localStorage e podem ser exportadas/importadas.
