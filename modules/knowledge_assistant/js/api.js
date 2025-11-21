// Envia mensagem para o backend
async function sendToAI(userMessage, conversationHistory) {
    try {
        const response = await fetch("http://localhost:3000/api/assistant/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage,
                history: conversationHistory
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao conectar com o servidor");
        }

        const data = await response.json();
        return data.reply || "❌ Erro: resposta inválida do servidor.";

    } catch (err) {
        console.error(err);
        return "❌ Falha ao conectar ao backend.";
    }
}
