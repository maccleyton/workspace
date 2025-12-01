// api.js
// Envia mensagem para o backend
export async function sendToAI(userMessage, conversationHistory) {
    try {
        // CORREÇÃO: Ajustada a URL para a rota correta do backend
        const response = await fetch("http://localhost:3000/ai/ask", {
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
        return data.result || "❌ Erro: resposta inválida do servidor."; // Ajuste para 'data.result' para bater com o backend

    } catch (err) {
        console.error(err);
        return "❌ Falha ao conectar ao backend.";
    }
}

// api.js
// ... (função sendToAI existente)

// ADICIONE ESTA FUNÇÃO
export async function getWeather(city) {
    try {
        // Assumindo que você tem uma rota /ai/weather no seu backend
        const response = await fetch(`http://localhost:3000/ai/weather?city=${encodeURIComponent(city)}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro ao buscar clima.");
        }

        return await response.json();
    } catch (err) {
        console.error(err);
        throw new Error("Falha ao conectar ao serviço de clima.");
    }
}

