# 🎨 Construtor de Páginas HTML

Uma aplicação visual completa para criação de páginas HTML sem necessidade de programar. Interface drag-and-drop intuitiva com editor de propriedades em tempo real.

## ✨ Funcionalidades

### 🎯 **Interface Visual**
- **Drag & Drop**: Arraste componentes do painel para o canvas
- **Editor de Propriedades**: Modifique cores, fontes, dimensões e espaçamentos
- **Preview em Tempo Real**: Veja as mudanças instantaneamente
- **Sistema de Zoom**: Ajuste a visualização do canvas

### 🧩 **Componentes Disponíveis**
- **Textos**: Títulos (H1-H3), parágrafos, texto em linha
- **Interativo**: Botões, links clicáveis
- **Mídia**: Imagens com legendas
- **Layout**: Containers, seções, divs, cards
- **Formulários**: Inputs, textareas, formulários completos
- **Listas**: Listas ordenadas e não ordenadas

### 🛠️ **Ferramentas Avançadas**
- **Sistema de Histórico**: Desfazer/refazer ações
- **Integração com Hub**: Salve projetos no Knowledge Hub
- **Export Profissional**: Gere HTML + CSS ou arquivo único
- **Keyboard Shortcuts**: Atalhos para productivity
- **Grid System**: Alinhamento preciso com snapping

## 🚀 Como Usar

### 1. **Arrastar Componentes**
- Selecione um componente no painel esquerdo
- Arraste para o canvas central
- Solte para adicionar à sua página

### 2. **Editar Propriedades**
- Clique em um elemento no canvas
- Use o painel direito para modificar:
  - Cores (texto e fundo)
  - Fontes (tamanho, peso, alinhamento)
  - Dimensões (largura, altura)
  - Espaçamento (margem, padding)
  - Bordas (cor, estilo, arredondamento)
  - Posicionamento

### 3. **Organizar Elementos**
- **Arrastar**: Mova elementos pelo canvas
- **Duplicar**: Ctrl+D para copiar
- **Excluir**: Delete ou botão de exclusão
- **Selecionar**: Clique para selecionar, Ctrl+click para multi-seleção

### 4. **Salvar e Exportar**
- **Salvar no Hub**: Conecte com Knowledge Hub
- **Export HTML**: Gere código limpo
- **Preview**: Visualize a página final
- **Download**: Baixe arquivos HTML/CSS

## ⌨️ **Atalhos de Teclado**

| Atalho | Ação |
|--------|------|
| `Ctrl+S` | Salvar projeto |
| `Ctrl+N` | Novo projeto |
| `Ctrl+Z` | Desfazer |
| `Ctrl+Y` | Refazer |
| `Ctrl+C` | Copiar elemento |
| `Ctrl+V` | Colar elemento |
| `Ctrl+D` | Duplicar elemento |
| `Delete` | Excluir elemento |
| `Escape` | Cancelar seleção |
| `F11` | Tela cheia |
| `↑↓←→` | Mover elemento (com Shift para 10px) |

## 🎨 **Dicas de Design**

### **Hierarquia Visual**
- Use H1 para título principal
- H2 para seções importantes
- H3 para subseções
- Parágrafos para conteúdo

### **Espaçamento Consistente**
- Use múltiplos de 8px (8, 16, 24, 32)
- Margem: espaço entre elementos
- Padding: espaço interno do elemento

### **Cores e Contraste**
- Textos: #000000 (preto) para máximo contraste
- Links: #3b82f6 (azul) para indicação padrão
- Botões: #2563eb (azul primário) para ações

### **Responsividade**
- Use `%` para larguras relativas
- `max-width` para limitar expansão
- `auto` para dimensionamento natural

## 🔧 **Tecnologias Utilizadas**

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização avançada com Grid e Flexbox
- **JavaScript ES6+**: Lógica da aplicação
- **Drag & Drop API**: Funcionalidade de arrastar
- **Canvas API**: Sistema de construção visual
- **LocalStorage**: Salvamento local de projetos
- **IndexedDB**: Integração com Knowledge Hub

## 📁 **Estrutura do Projeto**

```
html-builder/
├── index.html              # Interface principal
├── styles/
│   ├── main.css           # Estilos gerais
│   ├── components.css     # Componentes UI
│   ├── editor.css         # Canvas e elementos
│   └── dashboard.css      # Layout do dashboard
├── scripts/
│   ├── main.js            # Aplicação principal
│   ├── canvas-manager.js  # Gerenciamento do canvas
│   ├── drag-drop.js       # Drag & drop
│   ├── property-panel.js  # Painel de propriedades
│   ├── export-manager.js  # Exportação
│   ├── modal-manager.js   # Modais
│   └── component-library.js # Biblioteca de componentes
└── package.json           # Configurações
```

## 🌟 **Próximas Funcionalidades**

- [ ] Mais tipos de componentes (tabelas, iframes, vídeos)
- [ ] Sistema de templates predefinidos
- [ ] Importação de projetos
- [ ] Colaboração em tempo real
- [ ] Animações CSS
- [ ] Suporte a Bootstrap/Tailwind
- [ ] Deploy direto para hosting

## 🐛 **Solução de Problemas**

### **Elementos não aparecem no canvas**
- Verifique se o componente foi solto corretamente
- Recarregue a página se necessário

### **Propriedades não funcionam**
- Verifique se o elemento está selecionado
- Algumas propriedades podem não se aplicar a todos os tipos

### **Export não gera código**
- Verifique se há elementos no projeto
- Teste com o modo "HTML único"

### **Hub não responde**
- Verifique se o Knowledge Hub está rodando na porta 8082
- Confirme a integração no navegador

## 📞 **Suporte**

Para reportar bugs ou sugerir funcionalidades, acesse o [Knowledge Hub](http://localhost:8082) e crie um documento com os detalhes.

---

**Desenvolvido com ❤️ pelo MiniMax Agent**