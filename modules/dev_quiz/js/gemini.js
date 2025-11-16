// Configuração do Gemini
const GEMINI_API_KEY = 'MINHA_CHAVE_AQUI'; // Cole sua chave
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// Gerar questões
async function generateQuestions(language, mode, quantity = 20) {
    const prompts = {
        multipla: `Gere ${quantity} questões de múltipla escolha sobre programação em ${language}.
        
Cada questão deve ter:
- Uma pergunta clara e específica
- 4 alternativas (A, B, C, D)
- Apenas 1 resposta correta
- Nível de dificuldade variado (fácil, médio, difícil)

Retorne SOMENTE um JSON válido neste formato exato:
[
  {
    "question": "Qual é...",
    "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
    "correct": 0,
    "explanation": "Explicação detalhada da resposta correta"
  }
]`,

        erro: `Gere ${quantity} questões de identificação de erros em código ${language}.

Cada questão deve ter:
- Um trecho de código com erro
- 4 alternativas identificando possíveis erros
- 1 resposta correta
- Explicação do erro

Retorne SOMENTE um JSON válido neste formato:
[
  {
    "question": "Identifique o erro no código abaixo:",
    "code": "código com erro aqui",
    "options": ["Erro A", "Erro B", "Erro C", "Erro D"],
    "correct": 0,
    "explanation": "Explicação do erro e como corrigir"
  }
]`,

        codigo: `Gere ${quantity} desafios de código em ${language}.

Cada desafio deve:
- Descrever uma tarefa específica
- Ser resolvível em poucas linhas
- Ter critérios claros de validação

Retorne SOMENTE um JSON válido neste formato:
[
  {
    "question": "Crie uma função que...",
    "task": "Descrição detalhada da tarefa",
    "expectedOutput": "Saída esperada",
    "solution": "Solução modelo",
    "explanation": "Explicação da solução"
  }
]`,

        corrigir: `Gere ${quantity} desafios de correção de código em ${language}.

Cada desafio deve ter:
- Código com erro
- Descrição do que o código deveria fazer
- Código corrigido

Retorne SOMENTE um JSON válido neste formato:
[
  {
    "question": "Corrija o código abaixo para...",
    "buggyCode": "código com erro",
    "expectedBehavior": "O que deveria fazer",
    "correctCode": "código corrigido",
    "explanation": "Explicação das correções"
  }
]`
    };
    
    try {
        const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompts[mode]
                    }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    maxOutputTokens: 8000,
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        // Extrair JSON do texto
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error('Formato de resposta inválido');
        }
        
        return JSON.parse(jsonMatch[0]);
        
    } catch (error) {
        console.error('Erro ao gerar questões:', error);
        throw error;
    }
}

// Validar resposta de código com IA
async function validateCode(userCode, expectedTask, language) {
    const prompt = `Você é um validador de código. Analise se o código do usuário resolve a tarefa proposta.

TAREFA: ${expectedTask}
LINGUAGEM: ${language}
CÓDIGO DO USUÁRIO:
${userCode}

Retorne SOMENTE um JSON neste formato:
{
  "correct": true ou false,
  "feedback": "Feedback detalhado sobre o código"
}`;

    try {
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
                    temperature: 0.3,
                    maxOutputTokens: 500,
                }
            })
        });
        
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Formato de resposta inválido');
        }
        
        return JSON.parse(jsonMatch[0]);
        
    } catch (error) {
        console.error('Erro ao validar código:', error);
        return {
            correct: false,
            feedback: 'Erro ao validar código. Tente novamente.'
        };
    }
}

// Gerar feedback personalizado
async function generateFeedback(isCorrect, score, errorCount) {
    let tone = '';
    
    if (score >= 80) {
        tone = isCorrect ? 'muito entusiasmado e motivador' : 'encorajador mas firme';
    } else if (score >= 60) {
        tone = isCorrect ? 'positivo' : 'construtivo com sugestão de melhoria';
    } else {
        tone = isCorrect ? 'encorajador' : 'chamando atenção para reforçar fundamentos';
    }
    
    const prompt = `Gere uma frase curta (máximo 15 palavras) de feedback ${tone} para um jogador que ${isCorrect ? 'acertou' : 'errou'} uma questão de programação. Score atual: ${score}. Erros: ${errorCount}.`;
    
    try {
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
                    temperature: 0.8,
                    maxOutputTokens: 50,
                }
            })
        });
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();
        
    } catch (error) {
        console.error('Erro ao gerar feedback:', error);
        return isCorrect ? '🎉 Parabéns! Continue assim!' : '💪 Não desista! Estude mais.';
    }
}
