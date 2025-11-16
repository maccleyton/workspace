// Integração com APIs de IA
const GEMINI_API_KEY = 'AIzaSyA5qaWZShe5PR3k6wbOv7nZtIPUJh76jJ8';
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// Enviar mensagem para Gemini AI
async function sendToAI(userMessage, conversationHistory) {
    try {
        // Preparar contexto da conversa
        let prompt = 'Você é um assistente pessoal prestativo, amigável e conciso em português brasileiro.\n\n';
        
        // Adicionar últimas 10 mensagens de contexto
        const recentHistory = conversationHistory.slice(-10);
        if (recentHistory.length > 0) {
            prompt += 'Histórico recente:\n';
            recentHistory.forEach(msg => {
                const role = msg.role === 'user' ? 'Usuário' : 'Assistente';
                prompt += `${role}: ${msg.content}\n`;
            });
            prompt += '\n';
        }
        
        prompt += `Usuário: ${userMessage}\nAssistente:`;
        
        const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.3,  // MUDEI DE 0.7 PARA 0.3
                    maxOutputTokens: 800,
                    topP: 0.8,
                    topK: 10
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro da API:', errorData);
            throw new Error(`Erro ${response.status}: ${errorData.error?.message || 'Erro desconhecido'}`);
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Resposta inválida da API');
        }
        
    } catch (error) {
        console.error('Erro ao chamar Gemini API:', error);
        return `❌ Erro ao processar: ${error.message}\n\nVerifique sua conexão. Use comandos offline digitando "ajuda".`;
    }
}

// Buscar clima usando API gratuita
async function buscarClima(cidade) {
    const API_KEY = '851bc390fc1ab37cbb74fb828a901007'; // Gratuita em: https://openweathermap.org/api
    
    if (!API_KEY || API_KEY === 'SUA_CHAVE_OPENWEATHERMAP') {
        return '⚠️ API de clima não configurada. Pegue uma chave gratuita em:\nhttps://openweathermap.org/api';
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&units=metric&lang=pt_br`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }
        
        const data = await response.json();
        
        return `🌤️ Clima em ${data.name}:

Temperatura: ${data.main.temp.toFixed(1)}°C
Sensação: ${data.main.feels_like.toFixed(1)}°C
Condição: ${data.weather[0].description}
Umidade: ${data.main.humidity}%
Vento: ${data.wind.speed} m/s`;
        
    } catch (error) {
        console.error('Erro ao buscar clima:', error);
        return `❌ Não foi possível buscar o clima de "${cidade}". Verifique o nome da cidade.`;
    }
}
