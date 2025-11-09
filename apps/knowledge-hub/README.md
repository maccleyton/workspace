# 📚 Knowledge Hub

Um hub moderno e elegante para gerenciar seus documentos Markdown e PDF com renderização avançada, busca inteligente e múltiplos temas.

![Knowledge Hub](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ Características

### 🎯 **Funcionalidades Principais**
- 📝 **Gerenciamento de Documentos** - Armazene e organize documentos Markdown e PDF
- 🔍 **Busca Inteligente** - Encontre rapidamente qualquer conteúdo
- 🎨 **6 Temas Visuais** - Dark, Light, Blue, Green, Purple, Orange
- 💾 **Armazenamento Local** - Dados salvos com IndexedDB
- 📄 **Preview em Tempo Real** - Renderização instantânea com KaTeX e syntax highlighting
- 📱 **Design Responsivo** - Funciona perfeitamente em desktop, tablet e mobile

### 🔧 **Tecnologias Utilizadas**
- **HTML5** + **CSS3** - Estrutura semântica e estilos modernos
- **JavaScript ES6+** - Lógica de aplicação modular
- **IndexedDB** - Armazenamento local persistente
- **KaTeX** - Renderização de fórmulas LaTeX
- **Prism.js** - Syntax highlighting para código
- **Marked.js** - Conversão Markdown para HTML
- **CSS Grid + Flexbox** - Layout responsivo

### 📊 **Recursos Avançados**
- **Math Rendering** - Suporte completo para LaTeX
- **Code Highlighting** - Múltiplas linguagens de programação
- **Tabela de Conteúdos** - Navegação automática por headings
- **Busca em Tempo Real** - Filtragem instantânea
- **Context Menu** - Menu de contexto para ações rápidas
- **Drag & Drop** - Upload de arquivos por arrastar
- **Lightbox** - Visualização ampliada de imagens
- **Zoom de PDF** - Controles de zoom integrados
- **Backup/Restore** - Export/Import de dados

## 🚀 Como Usar

### 1. **Execução Local**
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta
cd knowledge-hub

# Inicie o servidor
python -m http.server 3000

# Acesse no navegador
# http://localhost:3000
```

### 2. **Deploy no Vercel**
```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel

# Ou conecte no GitHub para deploy automático
```

### 3. **Deploy no Netlify**
```bash
# Arrasta e solta a pasta no Netlify
# Ou configure build automático do GitHub
```

## 📁 Estrutura do Projeto

```
knowledge-hub/
├── index.html              # Arquivo principal
├── styles/                 # Estilos CSS
│   ├── main.css           # Layout base e tipografia
│   ├── components.css     # Componentes e elementos
│   └── themes.css         # Sistema de temas
├── scripts/               # Scripts JavaScript
│   ├── main.js            # Aplicação principal
│   ├── storage-manager.js # Gerenciamento de dados
│   ├── document-renderer.js # Renderização de documentos
│   └── ui-manager.js      # Interface do usuário
├── package.json           # Configuração do projeto
├── vercel.json           # Configuração do Vercel
└── README.md             # Documentação
```

## 🎨 Sistema de Temas

### **6 Temas Disponíveis:**

1. 🌙 **Dark** (Padrão) - Ideal para uso noturno
2. ☀️ **Light** - Claro e limpo
3. 🌊 **Blue** - Tons azuis relaxantes
4. 🌿 **Green** - Verde natureza
5. ✨ **Purple** - Roxo elegante
6. 🔥 **Orange** - Laranja energético

### **Como Alternar:**
- Clique no botão de tema no header
- Atalho: `Ctrl/Cmd + T`
- Tema é salvo automaticamente

## 📝 Tipos de Documentos Suportados

### **Markdown (.md)**
- **Sintaxe Completa** - Headers, listas, links, imagens
- **Code Blocks** - Syntax highlighting automático
- **Tabelas** - Renderização responsiva
- **Fórmulas LaTeX** - $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
- **Citações** - Blockquotes estilizados
- **Links Internos** - Âncoras para headings

### **PDF (.pdf)**
- **Visualização Integrada** - Renderização direta no navegador
- **Controles de Zoom** - Aumentar, diminuir, ajustar à tela
- **Tamanho Otimizado** - Suporte até 10MB
- **Drag & Drop** - Upload por arrastar arquivos

## 🔍 Sistema de Busca

### **Funcionalidades:**
- **Busca em Tempo Real** - Resultados instantâneos
- **Busca Multi-campo** - Nome e conteúdo
- **Destaque de Termos** - Matches destacados nos resultados
- **Contador de Resultados** - Mostra quantos documentos encontrados

### **Como Usar:**
1. Digite na barra de busca no header
2. Resultados filtrados automaticamente
3. Limpe a busca para ver todos os documentos

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl/Cmd + N` | Novo documento |
| `Ctrl/Cmd + F` | Focar busca |
| `Ctrl/Cmd + T` | Alternar tema |
| `Escape` | Fechar modais |
| `Enter` | Confirmar ações |

## 💾 Armazenamento de Dados

### **IndexedDB**
- **Persistência Local** - Dados salvos no navegador
- **Estrutura Organizada** - Object stores otimizados
- **Índices Eficientes** - Busca rápida por campos
- **Backup Automático** - Salvamento periódico

### **Estrutura de Dados**
```javascript
{
  id: number,           // ID único
  name: string,         // Nome do documento
  type: string,         // 'markdown' ou 'pdf'
  content: string,      // Conteúdo (Markdown ou Blob PDF)
  contentPreview: string, // Preview para busca
  createdAt: string,    // Data de criação
  updatedAt: string,    // Data de atualização
  size: number          // Tamanho em bytes
}
```

## 🔧 Configuração Avançada

### **Variáveis de Ambiente**
```javascript
// No console do navegador
window.KnowledgeHub.debug()  // Info de debug
window.KnowledgeHub.reset()  // Reset completo
window.KnowledgeHub.export() // Exportar backup
```

### **Personalização de Temas**
Edite `styles/themes.css` para criar novos temas:
```css
[data-theme="custom"] {
  --primary-accent: #your-color;
  --page-background: #your-bg;
  /* ... */
}
```

## 🌟 Recursos Especiais

### **LaTeX Math**
```latex
Inline: $E = mc^2$

Display: 
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$
```

### **Code Highlighting**
```javascript
// JavaScript
function hello() {
    console.log("Hello, World!");
}
```

```python
# Python
def hello():
    print("Hello, World!")
```

### **Tabelas Responsivas**
| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Valor 1  | Valor 2  | Valor 3  |
| Valor 4  | Valor 5  | Valor 6  |

## 🔒 Segurança

- **Sanitização de Input** - HTML limpo
- **Validação de Arquivos** - Verificação de tipos
- **XSS Protection** - Prevenção de scripts maliciosos
- **Local Storage Seguro** - Dados apenas localmente

## 📱 Compatibilidade

### **Navegadores Suportados:**
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### **Recursos Necessários:**
- IndexedDB
- ES6 Modules
- Local Storage
- CSS Grid
- Fetch API

## 🐛 Solução de Problemas

### **Documento não carrega:**
1. Verifique se o arquivo não está corrompido
2. PDF deve ter menos de 10MB
3. Markdown deve ter sintaxe válida

### **Busca não funciona:**
1. Digite pelo menos 2 caracteres
2. Verifique se há documentos salvos
3. Tente recarregar a página

### **Tema não muda:**
1. Verifique se JavaScript está habilitado
2. Limpe cache do navegador
3. Teste em modo anônimo

### **Performance lenta:**
1. Few documents (< 100) shouldn't cause issues
2. PDFs grandes podem demorar para carregar
3. Considere limpar documentos antigos

## 🤝 Contribuição

### **Como Contribuir:**
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### **Áreas de Contribuição:**
- 🎨 Novos temas
- 🌍 Traduções
- 🔧 Melhorias de performance
- 📱 Otimizações mobile
- 🐛 Correção de bugs

## 📄 Licença

Este projeto está sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Créditos

Desenvolvido com ❤️ por **MiniMax Agent**

### **Tecnologias Externas:**
- [KaTeX](https://katex.org/) - Renderização de LaTeX
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [Marked.js](https://marked.js.org/) - Markdown parser
- [Font Awesome](https://fontawesome.com/) - Ícones
- [Inter Font](https://fonts.google.com/specimen/Inter) - Tipografia
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) - Fonte de código

## 📈 Estatísticas do Projeto

- **Linhas de Código:** ~2,700+
- **Arquivos:** 10 arquivos principais
- **Componentes CSS:** 3 estilos modulares
- **Módulos JS:** 4 classes especializadas
- **Tecnologias:** 8+ bibliotecas e frameworks
- **Tamanhos:** Responsive design completo

## 🎯 Roadmap

### **Versão 1.1 (Planejada)**
- [ ] Editor inline para Markdown
- [ ] Colaboração em tempo real
- [ ] Export para outros formatos
- [ ] Tags e categorias
- [ ] Modo apresentação

### **Versão 1.2 (Futuro)**
- [ ] Sincronização na nuvem
- [ ] API para integrações
- [ ] Plugin system
- [ ] Mobile app
- [ ] Workspace multi-documento

---

**Knowledge Hub** - Organizando seu conhecimento de forma elegante e eficiente! 📚✨

> *"O conhecimento é poder, mas o conhecimento organizado é super poder."*