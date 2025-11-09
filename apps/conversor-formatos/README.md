# Conversor de Formatos

Uma aplicação moderna e intuitiva para conversão entre diferentes formatos numéricos e de texto, parte do **Workspace Hub**.

## ✨ Funcionalidades

### 🔄 Conversão de Texto
- **Texto → Binário**: Converte texto para código binário (ASCII)
- **Binário → Texto**: Decodifica código binário para texto legível
- **Texto → Hexadecimal**: Converte texto para formato hexadecimal
- **Hexadecimal → Texto**: Decodifica hexadecimal para texto
- **Texto → Octal**: Converte texto para formato octal
- **Octal → Texto**: Decodifica octal para texto

### 🔢 Conversão de Números
- **Decimal ↔ Binário**: Conversão entre decimal e binário
- **Decimal ↔ Hexadecimal**: Conversão entre decimal e hexadecimal
- **Decimal ↔ Octal**: Conversão entre decimal e octal
- **Binário ↔ Hexadecimal**: Conversão direta entre bases
- **Binário ↔ Octal**: Conversão direta entre bases
- **Hexadecimal ↔ Octal**: Conversão direta entre bases

### 🎨 Interface Moderna
- **6 Temas**: Escuro, Claro, Azul, Verde, Roxo, Laranja
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Transições elegantes e feedback visual
- **Acessibilidade**: Suporte completo a leitores de tela e navegação por teclado

### ⚡ Recursos Avançados
- **Auto-conversão**: Conversão em tempo real conforme você digita
- **Validação Inteligente**: Verificação automática de entrada
- **Histórico de Conversões**: Salva conversões recentes
- **Ações Rápidas**: Exemplos pré-configurados para teste
- **Teclado Virtual**: Suporte a entrada via teclado na tela
- **Atalhos de Teclado**: Navegação rápida via atalhos
- **Copiar/Colar**: Integração com área de transferência
- **Indicadores Visuais**: Feedback de validação em tempo real

## 🚀 Como Usar

### Conversão de Texto
1. Clique na aba **"Texto"**
2. Digite seu texto no campo de entrada
3. Selecione a base de origem e destino
4. A conversão acontece automaticamente
5. Copie o resultado usando o botão "Copiar"

### Conversão de Números
1. Clique na aba **"Números"**
2. Digite seu número no campo de entrada
3. Selecione a base de origem e destino
4. A conversão acontece automaticamente
5. Copie o resultado usando o botão "Copiar"

### Ações Rápidas
- Use os botões em **"Ações Rápidas"** para testar exemplos
- Clique em **"Limpar Tudo"** para resetar todos os campos

## ⌨️ Atalhos de Teclado

- `Ctrl/Cmd + K`: Focar entrada de texto
- `Ctrl/Cmd + Shift + K`: Focar entrada de número
- `Ctrl/Cmd + 1`: Ir para aba de texto
- `Ctrl/Cmd + 2`: Ir para aba de número
- `Ctrl/Cmd + T`: Alternar tema
- `Ctrl/Cmd + R`: Nova conversão
- `Escape`: Limpar campos

## 🛠️ Instalação e Execução

### Execução Local
```bash
# Clone o repositório
git clone [url-do-repositorio]
cd conversor-formatos

# Inicie um servidor local
python3 -m http.server 8080
# ou
npx serve -s . -l 8080
```

### Deployment
A aplicação é otimizada para deployment em:
- **Vercel**: Deploy automático via Git
- **Netlify**: Drag & drop ou Git integration
- **GitHub Pages**: Pages estáticas
- **Qualquer servidor web**: Arquivos estáticos

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Opera 70+

### Dispositivos
- 💻 **Desktop**: Experiência completa
- 📱 **Mobile**: Interface otimizada
- 📱 **Tablet**: Layout adaptativo

## 🎯 Casos de Uso

### Para Desenvolvedores
- **Debugging**: Verificar valores em diferentes bases
- **Codificação**: Converter strings para diferentes formatos
- **Testes**: Validar conversões de dados
- **Educação**: Aprender sobre sistemas numéricos

### Para Estudantes
- **Matemática**: Praticar conversões entre bases
- **Ciência da Computação**: Entender representações numéricas
- **Engenharia**: Trabalhar com diferentes sistemas

### Para Profissionais
- **Análise de Dados**: Processar dados em vários formatos
- **Segurança**: Trabalhar com hashes e codificações
- **Sistemas Embarcados**: Conversões de endereços e valores

## 🔧 Configuração

### Personalização
- **Temas**: Customize cores e aparências
- **Atalhos**: Configure atalhos de teclado
- **Configurações**: Ajuste comportamento da aplicação

### Armazenamento Local
A aplicação salva automaticamente:
- Tema preferido
- Histórico de conversões
- Configurações de interface
- Estado atual (ao sair da página)

## 🏗️ Arquitetura

### Tecnologias
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis
- **JavaScript ES6+**: Lógica da aplicação
- **LocalStorage**: Persistência de dados

### Estrutura de Arquivos
```
conversor-formatos/
├── index.html              # Página principal
├── styles/
│   ├── main.css           # Estilos base
│   ├── components.css     # Componentes
│   └── themes.css         # Sistema de temas
├── scripts/
│   ├── converter-core.js  # Lógica principal
│   ├── text-converter.js  # Conversor de texto
│   ├── number-converter.js # Conversor de números
│   ├── theme-manager.js   # Gerenciador de temas
│   └── app.js            # Aplicação principal
├── package.json           # Configurações do projeto
├── vercel.json           # Configurações de deploy
└── README.md             # Documentação
```

## 🎨 Design System

### Cores
- **Primária**: Azul (#3B82F6)
- **Sucesso**: Verde (#10B981)
- **Aviso**: Laranja (#F59E0B)
- **Erro**: Vermelho (#EF4444)
- **Informação**: Azul (#3B82F6)

### Tipografia
- **Interface**: Inter
- **Código**: JetBrains Mono
- **Tamanhos**: Escala tipográfica responsiva

### Componentes
- **Cards**: Design limpo com hover effects
- **Botões**: Estados visuais claros
- **Inputs**: Feedback de validação
- **Modais**: Sobreposição elegante

## 🔒 Privacidade e Segurança

- ✅ **Sem coleta de dados**: Todas as conversões são locais
- ✅ **Sem cookies**: Não utiliza cookies de rastreamento
- ✅ **Sem scripts externos**: Funciona offline
- ✅ **Armazenamento local**: Dados ficam no seu dispositivo
- ✅ **Código aberto**: Transparência total

## 🤝 Contribuição

### Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Implemente suas mudanças
4. Teste em diferentes navegadores
5. Envie um Pull Request

### Áreas para Contribuição
- 🎨 **UI/UX**: Melhorias de interface
- 🐛 **Bug Fixes**: Correções de bugs
- ✨ **Features**: Novas funcionalidades
- 📚 **Documentação**: Melhorias na documentação
- 🧪 **Testes**: Testes automatizados

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Créditos

Desenvolvido por **MiniMax Agent** como parte do Workspace Hub.

### Inspiração
- Design moderno inspirado em ferramentas como Linear e Notion
- UX focada na produtividade e simplicidade
- Performance otimizada para conversões em tempo real

## 📞 Suporte

- 🐛 **Reportar bugs**: GitHub Issues
- 💡 **Solicitar features**: GitHub Discussions
- 📧 **Contato**: Via GitHub

---

⭐ **Se esta aplicação foi útil, considere dar uma estrela no repositório!**