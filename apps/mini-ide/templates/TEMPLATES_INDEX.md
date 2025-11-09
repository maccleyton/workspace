# 📚 Template Library - Mini IDE
## Index de Templates Disponíveis

### 🎯 **JavaScript Templates**
- **Hello World** - Script básico para testar output
- **Async Function** - Exemplo de função assíncrona com await
- **Array Methods** - Exemplos de map, filter, reduce
- **Fetch API** - Exemplo de requisição HTTP com fetch
- **Timer Example** - Exemplo de setTimeout e setInterval

### 🐍 **Python Templates**
- **Hello World** - Script básico Python
- **File Operations** - Ler e escrever arquivos
- **List Comprehension** - Exemplos de list comprehension
- **API Request** - Fazer requisição HTTP (simulada)
- **Error Handling** - Try-catch em Python
- **Web Scraping** - Simulação de web scraping

### 🐚 **Shell/Bash Templates**
- **Hello World** - Script básico Bash
- **File Operations** - Criar, listar e processar arquivos
- **Loops** - Exemplos de loops for e while
- **Functions** - Definir e usar funções
- **Network Tools** - Usar curl, ping e outras ferramentas
- **System Info** - Obter informações do sistema operacional
- **Date/Time** - Trabalhar com data e hora
- **Text Processing** - Usar grep, sed, awk e outras ferramentas
- **Error Handling** - Gerenciar erros e códigos de saída
- **Variables/Environment** - Trabalhar com variáveis e ambiente

### 📋 **Como Usar os Templates:**

1. **Abrir Mini IDE**
2. **Criar novo arquivo** ou **abrir arquivo existente**
3. **Selecionar linguagem** no editor
4. **Acessar templates** (menu ou atalho)
5. **Escolher template** da lista
6. **Template será inserido** no editor automaticamente

### 🔧 **Estrutura dos Templates:**
Cada template tem:
- **name** - Nome exibido na interface
- **description** - Descrição do que o template faz
- **code** - Código do template

### 💡 **Como Adicionar Novos Templates:**

1. **Editar arquivo JSON** da linguagem correspondente:
   - `javascript/templates.json`
   - `python/templates.json`
   - `shell/templates.json`

2. **Adicionar novo template** seguindo o padrão:
```json
"novo-template": {
    "name": "Nome do Template",
    "description": "Descrição do que faz",
    "code": "console.log('Seu código aqui');"
}
```

3. **Recarregar Mini IDE** para ver o novo template

### 🚀 **Templates Futuros Planejados:**
- **TypeScript** templates
- **PowerShell** templates
- **Node.js** modules
- **Pandas** (Python data analysis)
- **React** components
- **Docker** scripts
- **SQL** queries
- **CSS** snippets
- **HTML** templates
- **Regex** patterns

---

**📊 Total de Templates Disponíveis:**
- JavaScript: 5 templates
- Python: 6 templates  
- Shell: 10 templates
- **Total: 21 templates**

**🎯 Status**: Templates básicos implementados e prontos para uso na Mini IDE!
