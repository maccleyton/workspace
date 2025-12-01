// assistant.js
import { loadHistory, saveHistory, clearHistory } from './storage.js';
import { AnnotationsManager } from './annotations.js';
import { toggleVoiceRecognition } from './speech.js';
import { sendToAI } from './api.js';
import { Calculator } from './calculator.js';
import { Weather } from './weather.js'; // Importar
import { Timer } from './timers.js'; // Importar
import { DocumentSearch } from './search.js'; // Importar

// DOM
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const helpBtn = document.getElementById('helpBtn');
const voiceBtn = document.getElementById('voiceBtn');

let conversationHistory = [];
let processing = false;

// INICIALIZA O GERENCIADOR DE ANOTAÇÕES
const annotationsManager = new AnnotationsManager();

function getHelpMessage() {
    return `
Eu sou o seu assistente de IA! Aqui estão algumas coisas que você pode fazer:

**💬 Pergunte o que quiser:**
*   "Explique conceito de polimorfismo em programação"
*   "Me dê ideias para um projeto de blog"
*   "Qual a receita de um bolo de chocolate?"

**🎤 Fale comigo:**
*   Use o botão do microfone para enviar mensagens por voz.

**💾 Salve conversas:**
*   Clique no ícone de disquete ao lado de uma resposta para salvá-la como uma anotação.

**🔍 Use seu conhecimento:**
*   Você pode me pedir para usar os documentos do seu Knowledge Hub para responder perguntas mais específicas.

Estou aqui para ajudar!
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    conversationHistory = loadHistory();
    if (conversationHistory.length === 0) {
        displayWelcomeMessage();
    } else {
        conversationHistory.forEach(msg => {
            displayMessage(msg.content, msg.role, false);
        });
    }

    sendBtn.addEventListener('click', handleSend);
    voiceBtn.addEventListener('click', toggleVoiceRecognition);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    clearBtn.addEventListener('click', clearChat);
    helpBtn.addEventListener('click', () => {
        displayMessage(getHelpMessage(), "assistant");
    });

    // --- NOVO: FUNCIONALIDADE DA SIDEBAR ---
    const sidebarButtons = document.querySelectorAll('.sidebar-btn');
    const chatTitle = document.querySelector('.chat-title');

    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const buttonText = button.textContent.trim();
            chatTitle.textContent = buttonText;

            chatContainer.innerHTML = '';

            switch (buttonText) {
                case '💬 Chat Geral':
                    if (conversationHistory.length === 0) {
                        displayWelcomeMessage();
                    } else {
                        conversationHistory.forEach(msg => {
                            displayMessage(msg.content, msg.role, false);
                        });
                    }
                    break;

                case '🧮 Calculadora':
                    new Calculator(chatContainer);
                    break;

                case '🌤️ Clima':
                    new Weather(chatContainer); // Instanciar
                    break;

                case '⏰ Timers':
                    new Timer(chatContainer); // Instanciar
                    break;

                case '🔍 Pesquisar':
                    new DocumentSearch(chatContainer); // Instanciar
                    break;
                    
                default:
                    displayMessage(`A funcionalidade "${buttonText}" ainda está em desenvolvimento. 😊`, "assistant");
			}
		});
    });
});

function displayWelcomeMessage() {
    chatContainer.innerHTML = `
        <div class="welcome-message">
            <h2>👋 Olá! Eu sou o Knowledge Assistant</h2>
            <p>Pronto para ajudar com estudos, códigos e ideias.</p>
        </div>
    `;
}

async function handleSend() {
    const message = userInput.value.trim();
    if (!message || processing) return;

    processing = true;
    sendBtn.disabled = true;

    const welcomeMsg = chatContainer.querySelector('.welcome-message');
    if (welcomeMsg) welcomeMsg.remove();

    displayMessage(message, "user");
    userInput.value = "";

    const loadingId = showLoading();
    const response = await sendToAI(message, conversationHistory);
    removeLoading(loadingId);

    displayMessage(response, "assistant", message);

    conversationHistory.push(
        { role: "user", content: message },
        { role: "assistant", content: response }
    );

    saveHistory(conversationHistory);

    processing = false;
    sendBtn.disabled = false;
}

function displayMessage(text, role, userMessage = null) {
    const div = document.createElement("div");
    div.className = `message ${role}`;

    const content = role === 'assistant' ? marked.parse(text) : text;

    const saveButton = role === 'assistant' && userMessage 
        ? `<button class="save-annotation-btn" title="Salvar como anotação">💾</button>` 
        : '';

    div.innerHTML = `
        <div class="message-avatar">${role === "user" ? "👤" : "🤖"}</div>
        <div class="message-content">
            ${content}
            ${saveButton}
        </div>
    `;

    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (saveButton) {
        const saveBtn = div.querySelector('.save-annotation-btn');
        saveBtn.addEventListener('click', () => {
            annotationsManager.createFromChat(userMessage, text);
            saveBtn.textContent = '✅';
            saveBtn.disabled = true;
        });
    }
}

function showLoading() {
    const id = "loading-" + Date.now();
    const div = document.createElement("div");
    div.className = "message assistant";
    div.id = id;
    div.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content"><span class="loading-dots">Pensando</span></div>
    `;
    chatContainer.appendChild(div);
    return id;
}

function removeLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

async function clearChat() {
    if (!confirm("Limpar todo o histórico de conversa?")) return;
    
    chatContainer.innerHTML = '';
    displayWelcomeMessage();

    conversationHistory = [];
    await clearHistory();
}