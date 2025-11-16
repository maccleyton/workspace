class CommandManager {
    constructor(assistant, annotationsManager) {
        this.assistant = assistant;
        this.annotationsManager = annotationsManager;
        this.commands = {
            'ajuda': this.showHelp.bind(this),
            'clima': this.getWeather.bind(this),
            'calculadora': this.openCalculator.bind(this),
            'timer': this.setTimer.bind(this),
            'cronômetro': this.setTimer.bind(this),
            'pesquisar': this.searchWeb.bind(this),
            'anotar': this.createNote.bind(this),
            'limpar': this.clearChat.bind(this)
        };
    }

    executeCommand(input) {
        const command = input.toLowerCase().trim();
        
        for (const [cmd, handler] of Object.entries(this.commands)) {
            if (command.startsWith(cmd)) {
                return handler(input);
            }
        }
        
        return false; // Não é um comando
    }

    showHelp() {
        const helpText = `📋 **COMANDOS DISPONÍVEIS:**

**💬 Chat**
• "ajuda" - Mostra esta mensagem
• "limpar" - Limpa o histórico do chat

**🌤️ Clima** 
• "clima [cidade]" - Mostra previsão do tempo
• "clima agora" - Clima atual pela localização

**🧮 Calculadora**
• "calculadora" - Abre calculadora
• "calcular [expressão]" - Calcula expressão

**⏰ Timers**
• "timer 5 minutos" - Define timer
• "cronômetro 30 segundos" - Inicia cronômetro

**🔍 Pesquisa**
• "pesquisar [termo]" - Pesquisa na web
• "buscar [termo]" - Busca informações

**📝 Anotações**
• "anotar [texto]" - Cria anotação rápida
• "anotações" - Mostra anotações

*Digite o comando seguido dos parâmetros necessários.*`;

        this.assistant.addMessage(helpText, 'assistant');
        return true;
    }

    getWeather(input) {
        const location = input.replace('clima', '').trim() || 'pela localização';
        this.assistant.addMessage(`🌤️ Buscando previsão do tempo para: ${location}...`, 'assistant');
        // Implementação da API de clima aqui
        return true;
    }

    openCalculator() {
        this.assistant.addMessage(`🧮 Calculadora aberta! Digite expressões matemáticas como:
• "2 + 2"
• "10 * 5" 
• "sqrt(16)"
• "sin(30)"`, 'assistant');
        return true;
    }

    setTimer(input) {
        const timeMatch = input.match(/(\d+)\s*(segundos?|minutos?|horas?)/i);
        if (timeMatch) {
            const amount = parseInt(timeMatch[1]);
            const unit = timeMatch[2].toLowerCase();
            this.assistant.addMessage(`⏰ Timer definido: ${amount} ${unit}`, 'assistant');
            // Implementação do timer aqui
        } else {
            this.assistant.addMessage('⏰ Use: "timer 5 minutos" ou "cronômetro 30 segundos"', 'assistant');
        }
        return true;
    }

    searchWeb(input) {
        const query = input.replace(/(pesquisar|buscar)/, '').trim();
        if (query) {
            this.assistant.addMessage(`🔍 Pesquisando: "${query}"...`, 'assistant');
            // Implementação da pesquisa aqui
        } else {
            this.assistant.addMessage('🔍 Use: "pesquisar [o que você quer buscar]"', 'assistant');
        }
        return true;
    }

    createNote(input) {
        const noteText = input.replace('anotar', '').trim();
        if (noteText) {
            this.annotationsManager.createAnnotation('Anotação Rápida', noteText);
            this.assistant.addMessage('📝 Anotação criada com sucesso!', 'assistant');
        } else {
            this.assistant.addMessage('📝 Use: "anotar [seu texto]" para criar uma anotação rápida', 'assistant');
        }
        return true;
    }

    clearChat() {
        this.assistant.clearChat();
        return true;
    }
}