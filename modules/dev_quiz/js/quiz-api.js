// js/quiz-api.js
const API_URL = "http://localhost:3000/quiz";

// Gera perguntas do quiz via IA
export async function generateQuestions(language, mode, totalQuestions) {
    const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, mode, totalQuestions })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao gerar perguntas.");
    }

    return await response.json();
}

// Envia a pontuação final para o ranking
export async function submitScore(playerName, score, language, mode, correctAnswers, wrongAnswers) {
    const response = await fetch(`${API_URL}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName, score, language, mode, correctAnswers, wrongAnswers })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao salvar pontuação.");
    }

    return await response.json();
}

// Busca o ranking de jogadores
export async function getRanking(language = 'all') {
    const response = await fetch(`${API_URL}/ranking?language=${language}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao buscar ranking.");
    }

    return await response.json();
}

// Gera um feedback personalizado usando a IA
export async function generateFeedback(isCorrect, score, wrongAnswers) {
    const response = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCorrect, score, wrongAnswers })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao gerar feedback.");
    }

    const data = await response.json();
    return data.feedback;
}

// Valida o código do usuário usando a IA
export async function validateCode(userCode, task, language) {
    const response = await fetch(`${API_URL}/validate-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userCode, task, language })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao validar código.");
    }

    return await response.json();
}