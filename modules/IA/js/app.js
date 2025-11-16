// Aplicação principal do assistente
let conversationHistory = [];

// Comandos disponíveis
const COMMANDS = {
    calcular: /^(calcular|quanto é|quanto da|calcula) (.+)$/i,
    lembrete: /^(lembrete|lembrar|alarme) (.+)$/i,
    tarefa: /^(tarefa|adicionar tarefa|nova tarefa) (.+)$/i,
    listar_tarefas: /^(listar tarefas|ver tarefas|minhas tarefas|tarefas)$/i,
    timer: /^(timer|cronômetro) (\d+) (minutos?|segundos?|horas?)$/i,
    hora: /^(que horas|horas|hora atual)$/i,
    data: /^(que dia|data|dia hoje|hoje)$/i,
    pesquisar: /^(pesquisar|buscar|procurar|google) (.+)$/i,
    abrir: /^(abrir|acessar|ir para) (.+)$/i,
    clima: /^(clima|tempo|previsão) (.+)$/i,
    limpar: /^(limpar|clear|apagar tudo)$/i,
    ajuda: /^(ajuda|help|comandos|\?)$/i
};

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', async () => {
    updateStatus('Iniciando...');
    
    try {
        // Inicializar banco de dados
        await initDB();
        
        // Carregar mensagens anteriores
        await loadPreviousMessages();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Inicializar reconhecimento de voz
        initSpeechRecognition();
        
        updateStatus('Pronto');
        
    } catch (error) {
        console.error('Erro ao inicializar:', error);
        updateStatus('Erro na inicialização');
    }
});

// Configurar eventos
function setupEventListeners() {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const clearBtn = document.getElementById('clearBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const helpBtn = document.getElementById('helpBtn');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }
    
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', handleClear);
    }
    
    if (voiceBtn) {
        voiceBtn.addEventListener('click', toggleVoiceRecognition);
    }
    
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            const helpMsg = getHelpMessage();
            displayMessage(helpMsg, 'assistant');
        });
    }
}

// Carregar histórico
async function loadPreviousMessages() {
    try {
        const messages = await loadMessages();
        
        if (messages && messages.length > 0) {
            // Remover mensagem de boas-vindas
            const welcomeMsg = document.querySelector('.welcome-message');
            if (welcomeMsg) {
                welcomeMsg.remove();
            }
            
            // Reconstruir histórico
            conversationHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));
            
            // Exibir mensagens
            messages.forEach(msg => {
                displayMessage(msg.content, msg.role);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
    }
}

// Processar envio de mensagem
async function handleSend() {
    const input = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Desabilitar input durante processamento
    input.disabled = true;
    sendBtn.disabled = true;
    
    // Remover mensagem de boas-vindas
    const welcomeMsg = document.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.remove();
    }
    
    // Exibir mensagem do usuário
    displayMessage(message, 'user');
    await saveMessage('user', message);
    
    // Limpar input
    input.value = '';
    
    // Processar comando ou enviar para IA
    const commandResult = await processCommand(message);
    
    if (commandResult !== null) {
        // Comando offline executado
        displayMessage(commandResult, 'assistant');
        await saveMessage('assistant', commandResult);
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: commandResult }
        );
    } else {
        // Enviar para IA
        updateStatus('Pensando...');
        const loadingId = showLoading();
        
        try {
            const response = await sendToAI(message, conversationHistory);
            removeLoading(loadingId);
            
            displayMessage(response, 'assistant');
            await saveMessage('assistant', response);
            conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: response }
            );
        } catch (error) {
            removeLoading(loadingId);
            console.error('Erro:', error);
            displayMessage('❌ Erro ao processar mensagem. Tente novamente.', 'assistant');
        }
        
        updateStatus('Pronto');
    }
    
    // Reabilitar input
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
}

// Processar comandos offline
async function processCommand(message) {
    const msg = message.toLowerCase().trim();
    
    // Calcular
    const calcMatch = msg.match(COMMANDS.calcular);
    if (calcMatch) {
        return calcular(calcMatch[2]);
    }
    
    // Lembrete
    const lembreteMatch = msg.match(COMMANDS.lembrete);
    if (lembreteMatch) {
        return criarLembrete(lembreteMatch[2]);
    }
    
    // Adicionar tarefa
    const tarefaMatch = msg.match(COMMANDS.tarefa);
    if (tarefaMatch) {
        adicionarTarefaStorage(tarefaMatch[2]);
        return `✅ Tarefa adicionada: "${tarefaMatch[2]}"\n\nDigite "listar tarefas" para ver todas.`;
    }
    
    // Listar tarefas
    if (COMMANDS.listar_tarefas.test(msg)) {
        return listarTarefas();
    }
    
    // Timer
    const timerMatch = msg.match(COMMANDS.timer);
    if (timerMatch) {
        return iniciarTimer(parseInt(timerMatch[2]), timerMatch[3]);
    }
    
    // Hora
    if (COMMANDS.hora.test(msg)) {
        return `⏰ Agora são ${new Date().toLocaleTimeString('pt-BR')}`;
    }
    
    // Data
    if (COMMANDS.data.test(msg)) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return `📅 Hoje é ${new Date().toLocaleDateString('pt-BR', options)}`;
    }
    
    // Pesquisar
    const pesquisarMatch = msg.match(COMMANDS.pesquisar);
    if (pesquisarMatch) {
        const query = encodeURIComponent(pesquisarMatch[2]);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
        return `🔍 Abrindo pesquisa para "${pesquisarMatch[2]}"`;
    }
    
    // Abrir site
    const abrirMatch = msg.match(COMMANDS.abrir);
    if (abrirMatch) {
        return abrirSite(abrirMatch[2]);
    }
    
    // Clima
    const climaMatch = msg.match(COMMANDS.clima);
    if (climaMatch) {
        updateStatus('Buscando clima...');
        return await buscarClima(climaMatch[2]);
    }
    
    // Limpar
    if (COMMANDS.limpar.test(msg)) {
        await handleClear();
        return null;
    }
    
    // Ajuda
    if (COMMANDS.ajuda.test(msg)) {
        return getHelpMessage();
    }
    
    return null; // Não é comando, usar IA
}

// Função calculadora
function calcular(expressao) {
    try {
        expressao = expressao
            .replace(/x/gi, '*')
            .replace(/÷/g, '/')
            .replace(/[^0-9+\-*/().]/g, '');
        
        if (!expressao) throw new Error('Expressão inválida');
        
        const resultado = Function('"use strict"; return (' + expressao + ')')();
        return `🧮 ${expressao} = ${resultado}`;
    } catch (error) {
        return '❌ Não consegui calcular. Exemplo: "calcular 2 + 2"';
    }
}

// Criar lembrete
function criarLembrete(texto) {
    if ('Notification' in window && Notification.permission === 'granted') {
        setTimeout(() => {
            new Notification('🔔 Lembrete!', {
                body: texto,
                icon: '🤖'
            });
        }, 10000);
        
        saveLembrete(texto);
        return `⏰ Lembrete criado: "${texto}"\n(Será ativado em 10 segundos)`;
    } else if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                return criarLembrete(texto);
            }
        });
        return '⚠️ Permita notificações para usar lembretes';
    }
    return '❌ Notificações não suportadas neste navegador';
}

// Iniciar timer
function iniciarTimer(tempo, unidade) {
    const multiplicadores = {
        'segundo': 1000, 'segundos': 1000,
        'minuto': 60000, 'minutos': 60000,
        'hora': 3600000, 'horas': 3600000
    };
    
    const ms = tempo * multiplicadores[unidade];
    
    setTimeout(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('⏰ Timer Finalizado!', {
                body: `Seu timer de ${tempo} ${unidade} terminou!`
            });
        }
        alert(`⏰ Timer de ${tempo} ${unidade} finalizado!`);
    }, ms);
    
    return `⏱️ Timer iniciado: ${tempo} ${unidade}`;
}

// Abrir site
function abrirSite(site) {
    const sites = {
        'youtube': 'https://youtube.com',
        'gmail': 'https://gmail.com',
        'github': 'https://github.com',
        'facebook': 'https://facebook.com',
        'twitter': 'https://twitter.com',
        'x': 'https://x.com',
        'instagram': 'https://instagram.com',
        'linkedin': 'https://linkedin.com',
        'reddit': 'https://reddit.com'
    };
    
    const siteNome = site.toLowerCase().trim();
    
    if (sites[siteNome]) {
        window.open(sites[siteNome], '_blank');
        return `🌐 Abrindo ${site}`;
    }
    
    const url = site.includes('http') ? site : `https://${site}`;
    window.open(url, '_blank');
    return `🌐 Abrindo ${site}`;
}

// Mensagem de ajuda
function getHelpMessage() {
    return `🤖 **Comandos Disponíveis:**

**📊 Cálculos:**
• "calcular 2 + 2"
• "quanto é 15 * 8"

**📝 Organização:**
• "lembrete comprar pão"
• "tarefa estudar JavaScript"
• "listar tarefas"
• "timer 5 minutos"

**ℹ️ Informações:**
• "que horas"
• "que dia"
• "clima São Paulo"

**🌐 Web:**
• "pesquisar JavaScript"
• "abrir youtube"
• "abrir github.com"

**⚙️ Controle:**
• "limpar" - limpa o chat
• "ajuda" - mostra esta mensagem

💬 **Você também pode conversar normalmente!**
Farei o possível para ajudar.`;
}

// Exibir mensagem no chat
function displayMessage(content, role) {
    const chatContainer = document.getElementById('chatContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? '👤' : '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    // Scroll para o final
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Mostrar loading
function showLoading() {
    const chatContainer = document.getElementById('chatContainer');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant';
    loadingDiv.id = 'loading-' + Date.now();
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<span class="loading-dots">Pensando</span>';
    
    loadingDiv.appendChild(avatar);
    loadingDiv.appendChild(contentDiv);
    chatContainer.appendChild(loadingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return loadingDiv.id;
}

// Remover loading
function removeLoading(id) {
    const loadingDiv = document.getElementById(id);
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Limpar histórico
async function handleClear() {
    if (confirm('🗑️ Deseja limpar todo o histórico de conversas?')) {
        await clearHistory();
        conversationHistory = [];
        
        const chatContainer = document.getElementById('chatContainer');
        chatContainer.innerHTML = `
            <div class="welcome-message">
                <h2>👋 Histórico limpo!</h2>
                <p>Digite <strong>"ajuda"</strong> para ver os comandos.</p>
            </div>
        `;
        
        updateStatus('Histórico limpo');
    }
}
