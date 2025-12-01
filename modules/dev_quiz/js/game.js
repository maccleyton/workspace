// game.js

// Importação da API
import { generateQuestions, submitScore, getRanking, generateFeedback, validateCode } from './quiz-api.js';

// Estado do jogo
const gameState = {
    score: 100,
    currentQuestion: 0,
    totalQuestions: 20,
    correctAnswers: 0,
    wrongAnswers: 0,
    questions: [],
    language: '',
    mode: '',
    selectedAnswer: null,
    playerName: '',
    timer: null
};

// Elementos DOM
const screens = {
    start: document.getElementById('startScreen'),
    loading: document.getElementById('loadingScreen'),
    game: document.getElementById('gameScreen'),
    gameOver: document.getElementById('gameOverScreen'),
    result: document.getElementById('resultScreen'),
    ranking: document.getElementById('rankingScreen')
};

const elements = {
    playerName: document.getElementById('playerName'),
    language: document.getElementById('language'),
    gameMode: document.getElementById('gameMode'),
    startBtn: document.getElementById('startBtn'),
    rankingBtn: document.getElementById('rankingBtn'),
    backToMenuBtn: document.getElementById('backToMenuBtn'),
    score: document.getElementById('score'),
    questionNumber: document.getElementById('questionNumber'),
    questionContainer: document.getElementById('questionContainer'),
    feedbackContainer: document.getElementById('feedbackContainer'),
    submitAnswer: document.getElementById('submitAnswer'),
    nextQuestion: document.getElementById('nextQuestion'),
    restartBtn: document.getElementById('restartBtn'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    rankingList: document.getElementById('rankingList')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    elements.startBtn.addEventListener('click', startGame);
    elements.rankingBtn.addEventListener('click', showRankingScreen);
    elements.backToMenuBtn.addEventListener('click', () => showScreen('start'));
    elements.submitAnswer.addEventListener('click', submitAnswer);
    elements.nextQuestion.addEventListener('click', nextQuestionHandler);
    elements.restartBtn.addEventListener('click', resetGame);
    elements.playAgainBtn.addEventListener('click', resetGame);
    
    // Filtros de ranking
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', async (e) => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            displayRanking(await getRanking(e.target.dataset.language));
        });
    });
});

// Iniciar jogo
async function startGame() {
    const playerName = elements.playerName.value.trim();
    
    if (!playerName) {
        alert('❌ Digite seu nome para começar!');
        elements.playerName.focus();
        return;
    }
    
    gameState.playerName = playerName;
    gameState.language = elements.language.value;
    gameState.mode = elements.gameMode.value;
    
    showScreen('loading');
    
    try {
        const selectedLanguage = gameState.language === 'random' ? getRandomLanguage() : gameState.language;
        
        gameState.questions = await generateQuestions(
            selectedLanguage,
            gameState.mode,
            gameState.totalQuestions
        );
        
        showScreen('game');
        loadQuestion();
        
    } catch (error) {
        console.error(error);
        alert('❌ Erro ao gerar questões. Verifique a conexão com o servidor.');
        showScreen('start');
    }
}

// Carregar questão
function loadQuestion() {
    const question = gameState.questions[gameState.currentQuestion];
    elements.questionNumber.textContent = gameState.currentQuestion + 1;
    elements.feedbackContainer.classList.add('hidden');
    elements.submitAnswer.classList.remove('hidden');
    elements.nextQuestion.classList.add('hidden');
    elements.submitAnswer.disabled = false;
    gameState.selectedAnswer = null;
    
    if (gameState.timer) {
        gameState.timer.stop();
    }
    
    let html = '';
    
    // AJUSTE: Define o tempo com base no modo
    let timerDuration = 60;
    if (gameState.mode === 'erro') timerDuration = 120;
    if (gameState.mode === 'codigo' || gameState.mode === 'corrigir') timerDuration = 180;

    if (gameState.mode === 'multipla' || gameState.mode === 'erro') {
        html = `
            <div class="timer-container">
                <div class="timer-display" id="timerDisplay">${timerDuration}</div>
            </div>
            <h2 class="question-title">${question.question}</h2>
            ${question.code ? `<div class="code-block">${escapeHtml(question.code)}</div>` : ''}
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" data-index="${index}">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </div>
                `).join('')}
            </div>
        `;
        
        setTimeout(() => {
            document.querySelectorAll('.option').forEach(opt => {
                opt.addEventListener('click', selectOption);
            });
            startQuestionTimer(timerDuration);
        }, 100);
        
    } else if (gameState.mode === 'codigo') {
        html = `
            <div class="timer-container">
                <div class="timer-display" id="timerDisplay">${timerDuration}</div>
            </div>
            <h2 class="question-title">${question.question}</h2>
            <p style="margin: 15px 0; color: #666;">${question.task}</p>
            <textarea class="code-input" id="codeAnswer" placeholder="Digite seu código aqui..."></textarea>
        `;
        
        setTimeout(() => startQuestionTimer(timerDuration), 100);
        
    } else if (gameState.mode === 'corrigir') {
        html = `
            <div class="timer-container">
                <div class="timer-display" id="timerDisplay">${timerDuration}</div>
            </div>
            <h2 class="question-title">${question.question}</h2>
            <p style="margin: 15px 0; color: #666;">O código deveria: ${question.expectedBehavior}</p>
            <div class="code-block">${escapeHtml(question.buggyCode)}</div>
            <p style="margin: 15px 0; font-weight: 600;">Corrija o código abaixo:</p>
            <textarea class="code-input" id="codeAnswer" placeholder="Cole e corrija o código aqui...">${question.buggyCode}</textarea>
        `;
        
        setTimeout(() => startQuestionTimer(timerDuration), 100);
    }
    
    elements.questionContainer.innerHTML = html;
}

// Iniciar timer da questão
function startQuestionTimer(duration) {
    const timerDisplay = document.getElementById('timerDisplay');
    
    gameState.timer = new QuestionTimer(
        duration,
        (remaining) => {
            timerDisplay.textContent = remaining;
            if (remaining <= 10) {
                timerDisplay.classList.add('warning');
            }
        },
        () => {
            handleTimeOut();
        }
    );
    
    gameState.timer.start();
}

// Tempo esgotado
function handleTimeOut() {
    gameState.score -= 5;
    gameState.wrongAnswers++;
    elements.score.textContent = gameState.score;
    
    if (gameState.score < 50) {
        showGameOver();
        return;
    }
    
    showFeedback(false, '⏰ Tempo Esgotado!', 'Você não respondeu a tempo. -5 pontos.');
    
    elements.submitAnswer.classList.add('hidden');
    elements.nextQuestion.classList.remove('hidden');
}

// Selecionar opção
function selectOption(e) {
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    e.target.classList.add('selected');
    gameState.selectedAnswer = parseInt(e.target.dataset.index);
}

// Submeter resposta
async function submitAnswer() {
    if (gameState.timer) {
        gameState.timer.stop();
    }
    
    const question = gameState.questions[gameState.currentQuestion];
    let isCorrect = false;
    let feedback = '';
    
    elements.submitAnswer.disabled = true;
    
    if (gameState.mode === 'multipla' || gameState.mode === 'erro') {
        if (gameState.selectedAnswer === null) {
            alert('Selecione uma opção!');
            elements.submitAnswer.disabled = false;
            if (gameState.timer) gameState.timer.start();
            return;
        }
        
        isCorrect = gameState.selectedAnswer === question.correct;
        feedback = question.explanation;
        
        document.querySelectorAll('.option').forEach((opt, index) => {
            opt.style.pointerEvents = 'none';
            if (index === question.correct) {
                opt.classList.add('correct');
            } else if (index === gameState.selectedAnswer && !isCorrect) {
                opt.classList.add('wrong');
            }
        });
        
    } else {
        const userCode = document.getElementById('codeAnswer').value.trim();
        
        if (!userCode) {
            alert('Digite seu código!');
            elements.submitAnswer.disabled = false;
            if (gameState.timer) gameState.timer.start();
            return;
        }
        
        elements.feedbackContainer.innerHTML = '<div class="loader" style="margin: 20px auto;"></div>';
        elements.feedbackContainer.classList.remove('hidden');
        
        if (gameState.mode === 'codigo') {
            const result = await validateCode(userCode, question.task, gameState.language);
            isCorrect = result.correct;
            feedback = result.feedback;
        } else { // modo 'corrigir'
            // Validação simples no frontend como fallback
            const isCorrectSimple = Validator.compareCode(userCode, question.correctCode);
            const result = await validateCode(userCode, question.task, gameState.language);
            isCorrect = result.correct || isCorrectSimple; // Aceita se a IA ou a validação simples concordar
            feedback = result.feedback || (isCorrectSimple ? question.explanation : `Código incorreto. ${question.explanation}`);
        }
    }
    
    if (!isCorrect) {
        gameState.score -= 5;
        gameState.wrongAnswers++;
        elements.score.textContent = gameState.score;
        
        if (gameState.score < 50) {
            showGameOver();
            return;
        }
    } else {
        gameState.correctAnswers++;
    }
    
    const personalFeedback = await generateFeedback(isCorrect, gameState.score, gameState.wrongAnswers);
    showFeedback(isCorrect, personalFeedback, feedback);
    
    elements.submitAnswer.classList.add('hidden');
    elements.nextQuestion.classList.remove('hidden');
}

// Mostrar feedback
function showFeedback(isCorrect, title, message) {
    elements.feedbackContainer.className = 'feedback-container';
    elements.feedbackContainer.classList.add(isCorrect ? 'correct' : 'wrong');
    
    elements.feedbackContainer.innerHTML = `
        <div class="feedback-title">${isCorrect ? '✅' : '❌'} ${title}</div>
        <div class="feedback-message">${message}</div>
    `;
    
    elements.feedbackContainer.classList.remove('hidden');
}

// Próxima questão
function nextQuestionHandler() {
    gameState.currentQuestion++;
    
    if (gameState.currentQuestion >= gameState.totalQuestions) {
        showResults();
    } else {
        loadQuestion();
    }
}

// Mostrar game over
async function showGameOver() {
    if (gameState.timer) {
        gameState.timer.stop();
    }
    
    document.getElementById('gameOverTitle').textContent = 'Game Over!';
    document.getElementById('gameOverIcon').textContent = '😢';
    document.getElementById('gameOverMessage').innerHTML = `
        <strong>Desempenho muito fraco!</strong><br><br>
        Você precisa reforçar seus fundamentos em programação.<br>
        Estude mais e tente novamente. Não desista! 💪
    `;
    document.getElementById('finalScore').textContent = gameState.score;
    
    // Salvar no ranking mesmo com game over
    try {
        await submitScore(
            gameState.playerName,
            gameState.score,
            gameState.language,
            gameState.mode,
            gameState.correctAnswers,
            gameState.wrongAnswers
        );
    } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
    }
    
    showScreen('gameOver');
}

// Mostrar resultados finais
async function showResults() {
    if (gameState.timer) {
        gameState.timer.stop();
    }
    
    const classifications = [
        { min: 100, title: '🏆 Mestre da Programação!', message: 'Perfeito! Você domina completamente o assunto. Parabéns pelo desempenho impecável!' },
        { min: 90, title: '⭐ Campeão!', message: 'Excelente trabalho! Você tem um conhecimento excepcional em programação.' },
        { min: 80, title: '💪 Guerreiro!', message: 'Muito bom! Você está acima da média e demonstra sólido conhecimento.' },
        { min: 70, title: '📚 Na Média', message: 'Desempenho razoável, mas há espaço para melhorias. Continue estudando!' },
        { min: 60, title: '🎯 Esforçado', message: 'Você está se esforçando, mas ainda precisa evoluir bastante. Não desista!' },
        { min: 50, title: '⚠️ Desempenho Fraco', message: 'É preciso dedicar mais tempo aos estudos. Revise os fundamentos.' }
    ];
    
    const classification = classifications.find(c => gameState.score >= c.min);
    
    // Salvar no ranking
    try {
        await submitScore(
            gameState.playerName,
            gameState.score,
            gameState.language,
            gameState.mode,
            gameState.correctAnswers,
            gameState.wrongAnswers
        );
    } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
        alert("Não foi possível salvar sua pontuação no ranking.");
    }
    
    document.getElementById('resultScore').textContent = gameState.score;
    document.getElementById('resultTitle').textContent = classification.title;
    document.getElementById('resultMessage').innerHTML = classification.message;
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;
    document.getElementById('wrongAnswers').textContent = gameState.wrongAnswers;
    
    showScreen('result');
}

// Mostrar tela de ranking
async function showRankingScreen() {
    try {
        const ranking = await getRanking('all');
        displayRanking(ranking);
    } catch (error) {
        console.error("Erro ao carregar ranking:", error);
        elements.rankingList.innerHTML = '<p>Erro ao carregar ranking.</p>';
    }
    showScreen('ranking');
}

// Exibir ranking
function displayRanking(ranking) {
    const container = elements.rankingList;
    
    if (ranking.length === 0) {
        container.innerHTML = `
            <div class="no-ranking">
                <div class="no-ranking-icon">🏆</div>
                <p>Nenhum registro ainda.<br>Seja o primeiro a jogar!</p>
            </div>
        `;
        return;
    }
    
    const medals = ['🥇', '🥈', '🥉'];
    
    container.innerHTML = ranking.map((entry, index) => {
        const position = index + 1;
        const positionClass = position <= 3 ? `top${position}` : '';
        const medal = position <= 3 ? `<span class="ranking-medal">${medals[index]}</span>` : '';
        
        const modeNames = {
            'multipla': 'Múltipla Escolha',
            'erro': 'Identificar Erros',
            'codigo': 'Desafio de Código',
            'corrigir': 'Corrigir Código'
        };
        
        return `
            <div class="ranking-item">
                ${medal}
                <div class="ranking-position ${positionClass}">#${position}</div>
                <div class="ranking-details">
                    <div class="ranking-name">${escapeHtml(entry.player_name)}</div>
                    <div class="ranking-info">
                        ${entry.language.toUpperCase()} • ${modeNames[entry.mode]} • 
                        ${entry.correct_answers} acertos • ${new Date(entry.created_at + 'Z').toLocaleDateString('pt-BR')}
                    </div>
                </div>
                <div class="ranking-score">${entry.score}</div>
            </div>
        `;
    }).join('');
}

// Resetar jogo
function resetGame() {
    gameState.score = 100;
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.wrongAnswers = 0;
    gameState.questions = [];
    
    if (gameState.timer) {
        gameState.timer.stop();
    }
    
    elements.score.textContent = 100;
    elements.playerName.value = gameState.playerName;
    
    showScreen('start');
}

// Trocar telas
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// Utilitários
function getRandomLanguage() {
    const languages = ['python', 'javascript', 'typescript', 'java', 'csharp', 'cpp', 'go', 'rust', 'php', 'swift', 'kotlin', 'sql'];
    return languages[Math.floor(Math.random() * languages.length)];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Classe de Timer (movida para cá)
class QuestionTimer {
    constructor(duration, onTick, onComplete) {
        this.duration = duration;
        this.remaining = duration;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.interval = null;
        this.isRunning = false;
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.remaining = this.duration;
        this.onTick(this.remaining);
        
        this.interval = setInterval(() => {
            this.remaining--;
            this.onTick(this.remaining);
            
            if (this.remaining <= 0) {
                this.stop();
                this.onComplete();
            }
        }, 1000);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.isRunning = false;
    }
}

// Classe de Validador (fallback)
class Validator {
    static compareCode(userCode, correctCode) {
        const normalize = (code) => {
            return code
                .replace(/\s+/g, ' ')
                .replace(/;\s*/g, ';')
                .trim()
                .toLowerCase();
        };
        
        return normalize(userCode) === normalize(correctCode);
    }
}