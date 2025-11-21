// Elementos DOM
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');
const settingsBtn = document.getElementById('settingsBtn');
const statusBar = document.getElementById('statusBar');

// Estado
let conversationHistory = [];
let isProcessing = false;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    clearBtn.addEventListener('click', clearChat);
    exportBtn.addEventListener('click', exportHistory);
    voiceBtn.addEventListener('click', startVoiceRecording);
    
    // Auto-resize textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    });
});

// Enviar mensagem
async function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message || isProcessing) return;
    
    isProcessing = true;
    sendBtn.disabled = true;
    statusBar.textContent = 'Processando';
    
    // Remove welcome message
    const welcome = chatContainer.querySelector('.welcome-message');
    if (welcome) welcome.remove();
    
    // Adiciona mensagem do usuário
    addMessage(message, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Processa comando ou IA
    let response;
    
    if (message.startsWith('/') || isCommand(message)) {
        response = await processCommand(message);
    } else {
        response = await sendToAI(message, conversationHistory);
    }
    
    // Adiciona resposta
    addMessage(response, 'assistant');
    
    // Atualiza histórico
    conversationHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: response }
    );
    
    saveHistory();
    
    isProcessing = false;
    sendBtn.disabled = false;
    statusBar.textContent = 'Conectado ao Gemini AI • Pronto para usar';
    
    // Foco no input
    userInput.focus();
}

// Adicionar mensagem ao chat
function addMessage(content, role) {
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
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Limpar chat
function clearChat() {
    if (confirm('Deseja limpar toda a conversa?')) {
        chatContainer.innerHTML = `
            <div class="welcome-message">
                <h2>👋 Olá! Como posso ajudar?</h2>
                <p>Digite sua pergunta ou use comandos</p>
            </div>
        `;
        conversationHistory = [];
        saveHistory();
    }
}

// Exportar histórico
function exportHistory() {
    const text = conversationHistory.map(msg => 
        `${msg.role === 'user' ? 'Você' : 'Assistente'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversa-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Salvar/Carregar histórico
function saveHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
}

function loadHistory() {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
        conversationHistory = JSON.parse(saved);
        conversationHistory.forEach(msg => {
            addMessage(msg.content, msg.role);
        });
        
        const welcome = chatContainer.querySelector('.welcome-message');
        if (welcome && conversationHistory.length > 0) {
            welcome.remove();
        }
    }
}

// Gravação de voz (placeholder)
function startVoiceRecording() {
    alert('Funcionalidade de voz em desenvolvimento! 🎤');
}
