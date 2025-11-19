// DOM
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const helpBtn = document.getElementById('helpBtn');

let conversationHistory = [];
let processing = false;

document.addEventListener("DOMContentLoaded", () => {
    loadHistory();

    sendBtn.addEventListener('click', handleSend);

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
});

// Enviar mensagem
async function handleSend() {
    const message = userInput.value.trim();
    if (!message || processing) return;

    processing = true;
    sendBtn.disabled = true;

    displayMessage(message, "user");
    await saveMessage('user', message);
    userInput.value = "";

    const loadingId = showLoading();
    const response = await sendToAI(message, conversationHistory);
    removeLoading(loadingId);

    displayMessage(response, "assistant");
    await saveMessage("assistant", response);

    conversationHistory.push(
        { role: "user", content: message },
        { role: "assistant", content: response }
    );

    saveHistory();

    processing = false;
    sendBtn.disabled = false;
}

// Renderizar mensagem
function displayMessage(text, role) {
    const div = document.createElement("div");
    div.className = `message ${role}`;

    div.innerHTML = `
        <div class="message-avatar">${role === "user" ? "👤" : "🤖"}</div>
        <div class="message-content">${text}</div>
    `;

    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Loading
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

// Clear
async function clearChat() {
    if (!confirm("Limpar histórico?")) return;
    
    chatContainer.innerHTML = `
        <div class="welcome-message">
            <h2>👋 Histórico limpo!</h2>
        </div>
    `;

    conversationHistory = [];
    await clearHistory();
}
