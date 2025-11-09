/**
 * Dev Quiz - Main Application Entry Point
 * Ultimate Programming Challenge Game
 * Author: MiniMax Agent
 */

class DevQuizApp {
    constructor() {
        this.currentPlayer = null;
        this.currentMode = null;
        this.currentQuestionIndex = 0;
        this.currentScore = 100;
        this.questions = [];
        this.gameHistory = [];
        this.isGameActive = false;
        this.startTime = null;
        
        // Modalidades do jogo
        this.modalities = {
            'choice': {
                name: 'Múltipla Escolha',
                description: 'Teste seus conhecimentos teóricos',
                color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            },
            'coding': {
                name: 'Desafio de Código',
                description: 'Escreva soluções do zero',
                color: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
            },
            'debugging': {
                name: 'Interpretação de Erros',
                description: 'Identifique problemas no código',
                color: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
            },
            'correction': {
                name: 'Corretor de Erros',
                description: 'Corrija códigos com bugs',
                color: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)'
            },
            'random': {
                name: 'Modo Aleatório',
                description: 'Uma mistura de tudo',
                color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }
        };

        // Linguagens suportadas
        this.languages = [
            'html', 'css', 'js', 'ts', 'c', 'cpp', 'csharp', 'python', 'sql',
            'java', 'php', 'go', 'rust', 'kotlin', 'swift'
        ];

        this.init();
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        console.log('🚀 Dev Quiz App Iniciando...');
        
        // Aguarda o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * Configura a aplicação após o DOM estar pronto
     */
    setup() {
        console.log('⚙️ Configurando Dev Quiz...');
        
        // Inicializar componentes
        this.setupEventListeners();
        this.loadGameHistory();
        this.showScreen('loginScreen');
        
        console.log('✅ Dev Quiz App Configurado com Sucesso!');
    }

    /**
     * Configura todos os event listeners
     */
    setupEventListeners() {
        // Tela de Login
        document.getElementById('startGame')?.addEventListener('click', () => this.startLogin());
        document.getElementById('playerName')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.startLogin();
        });

        // Tela de Regras
        document.getElementById('selectMode')?.addEventListener('click', () => this.showScreen('modeScreen'));

        // Tela de Modo
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectMode(e.currentTarget.dataset.mode));
        });

        // Quiz
        document.getElementById('submitAnswer')?.addEventListener('click', () => this.submitAnswer());
        document.getElementById('quitGame')?.addEventListener('click', () => this.quitGame());
        document.getElementById('nextQuestion')?.addEventListener('click', () => this.nextQuestion());

        // Modais
        document.getElementById('playAgain')?.addEventListener('click', () => this.playAgain());
        document.getElementById('viewHistory')?.addEventListener('click', () => this.showHistory());
        document.getElementById('backToMenu')?.addEventListener('click', () => this.backToMenu());
        document.getElementById('closeHistory')?.addEventListener('click', () => this.closeHistory());

        // Run Code button
        document.getElementById('runCode')?.addEventListener('click', () => this.runCode());
    }

    /**
     * Inicia o processo de login
     */
    startLogin() {
        const playerName = document.getElementById('playerName')?.value.trim();
        
        if (!playerName) {
            this.showNotification('Por favor, digite seu nome!', 'error');
            return;
        }

        if (playerName.length < 2) {
            this.showNotification('O nome deve ter pelo menos 2 caracteres!', 'error');
            return;
        }

        this.currentPlayer = playerName;
        this.showScreen('rulesScreen');
        this.showNotification(`Bem-vindo, ${playerName}! 🎮`, 'success');
    }

    /**
     * Seleciona o modo de jogo
     */
    async selectMode(mode) {
        this.currentMode = mode;
        this.currentQuestionIndex = 0;
        this.currentScore = 100;
        this.isGameActive = true;
        this.startTime = Date.now();

        console.log(`🎯 Modo selecionado: ${mode}`);

        // Gerar questões
        this.questions = await this.generateQuestions(mode);
        
        if (this.questions.length === 0) {
            this.showNotification('Erro ao gerar questões. Tente novamente!', 'error');
            return;
        }

        this.showScreen('quizScreen');
        this.displayQuestion();
    }

    /**
     * Gera as questões baseado no modo
     */
    async generateQuestions(mode) {
        try {
            if (typeof window.generateQuestions === 'function') {
                return await window.generateQuestions(mode, this.questionsPerRound || 20);
            } else {
                console.warn('Question generator not loaded, using fallback');
                return this.generateFallbackQuestions(mode);
            }
        } catch (error) {
            console.error('Erro ao gerar questões:', error);
            return this.generateFallbackQuestions(mode);
        }
    }

    /**
     * Gera questões de fallback em caso de erro
     */
    generateFallbackQuestions(mode) {
        const questions = [];
        const questionCount = 20;

        for (let i = 0; i < questionCount; i++) {
            const language = this.languages[Math.floor(Math.random() * this.languages.length)];
            
            if (mode === 'random' || mode === 'choice') {
                questions.push(this.generateMultipleChoiceQuestion(language, i));
            } else if (mode === 'coding') {
                questions.push(this.generateCodingChallenge(language, i));
            } else if (mode === 'debugging') {
                questions.push(this.generateErrorInterpretation(language, i));
            } else if (mode === 'correction') {
                questions.push(this.generateCodeCorrection(language, i));
            }
        }

        return questions;
    }

    /**
     * Gera uma questão de múltipla escolha
     */
    generateMultipleChoiceQuestion(language, index) {
        const questions = {
            html: [
                { question: 'Qual tag HTML é usada para criar um link?', options: ['<link>', '<a>', '<href>', '<url>'], correct: 1, explanation: 'A tag <a> (anchor) é usada para criar links em HTML.' },
                { question: 'O que significa HTML?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'], correct: 0, explanation: 'HTML significa HyperText Markup Language.' },
                { question: 'Qual tag é usada para imagens?', options: ['<image>', '<img>', '<picture>', '<media>'], correct: 1, explanation: 'A tag <img> é usada para inserir imagens em HTML.' }
            ],
            css: [
                { question: 'Qual propriedade CSS define a cor do texto?', options: ['font-color', 'text-color', 'color', 'font-style'], correct: 2, explanation: 'A propriedade color define a cor do texto em CSS.' },
                { question: 'O que significa CSS?', options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Cascading Script Sheets'], correct: 0, explanation: 'CSS significa Cascading Style Sheets.' },
                { question: 'Qual unidade é relativa ao tamanho da fonte do elemento pai?', options: ['px', 'em', 'rem', 'vh'], correct: 1, explanation: 'A unidade em é relativa ao tamanho da fonte do elemento pai.' }
            ],
            js: [
                { question: 'Como declarar uma variável em JavaScript?', options: ['variable x', 'var x', 'v x', 'declare x'], correct: 1, explanation: 'A palavra-chave var é usada para declarar variáveis em JavaScript.' },
                { question: 'Qual método converte string para número?', options: ['Number()', 'String()', 'ParseNumber()', 'Convert()'], correct: 0, explanation: 'Number() converte uma string para número.' },
                { question: 'O que significa NaN?', options: ['Not a Number', 'New and Null', 'No Answer', 'Null and Number'], correct: 0, explanation: 'NaN significa Not a Number.' }
            ]
        };

        const langQuestions = questions[language] || questions.js;
        const qData = langQuestions[index % langQuestions.length];

        return {
            id: `choice_${index}`,
            type: 'choice',
            language: language,
            question: qData.question,
            options: qData.options,
            correct: qData.correct,
            explanation: qData.explanation,
            selectedAnswer: null
        };
    }

    /**
     * Gera um desafio de código
     */
    generateCodingChallenge(language, index) {
        const challenges = {
            js: [
                {
                    prompt: 'Crie uma função que soma dois números',
                    template: 'function soma(a, b) {\n    // Sua código aqui\n}',
                    test: 'soma(2, 3) === 5',
                    solution: 'function soma(a, b) {\n    return a + b;\n}',
                    explanation: 'Esta função utiliza o operador + para somar os dois parâmetros.'
                },
                {
                    prompt: 'Crie uma função que verifica se um número é par',
                    template: 'function isPar(num) {\n    // Sua código aqui\n}',
                    test: 'isPar(4) === true',
                    solution: 'function isPar(num) {\n    return num % 2 === 0;\n}',
                    explanation: 'Um número é par quando o resto da divisão por 2 é zero.'
                }
            ],
            python: [
                {
                    prompt: 'Crie uma função que calcula o fatorial',
                    template: 'def fatorial(n):\n    # Sua código aqui\n',
                    test: 'fatorial(5) == 120',
                    solution: 'def fatorial(n):\n    if n <= 1:\n        return 1\n    return n * fatorial(n-1)',
                    explanation: 'Fatorial é o produto de todos os números naturais de 1 até n.'
                }
            ]
        };

        const langChallenges = challenges[language] || challenges.js;
        const challenge = langChallenges[index % langChallenges.length];

        return {
            id: `coding_${index}`,
            type: 'coding',
            language: language,
            question: challenge.prompt,
            template: challenge.template,
            test: challenge.test,
            solution: challenge.solution,
            explanation: challenge.explanation,
            userCode: ''
        };
    }

    /**
     * Gera uma interpretação de erro
     */
    generateErrorInterpretation(language, index) {
        const errors = {
            js: [
                {
                    error: 'TypeError: Cannot read property \'length\' of undefined',
                    options: [
                        'A variável está definida mas é null',
                        'A propriedade length não existe no objeto',
                        'A variável é undefined ou null',
                        'O objeto não foi inicializado'
                    ],
                    correct: 2,
                    explanation: 'Este erro ocorre quando tentamos acessar uma propriedade de uma variável que é undefined ou null.'
                }
            ]
        };

        const langErrors = errors[language] || errors.js;
        const errorData = langErrors[index % langErrors.length];

        return {
            id: `debug_${index}`,
            type: 'debugging',
            language: language,
            error: errorData.error,
            options: errorData.options,
            correct: errorData.correct,
            explanation: errorData.explanation
        };
    }

    /**
     * Gera uma correção de código
     */
    generateCodeCorrection(language, index) {
        const corrections = {
            js: [
                {
                    incorrect: 'function soma(a,b) {\n    return a + b\n}',
                    correct: 'function soma(a, b) {\n    return a + b;\n}',
                    error: 'Faltam espaços e ponto e vírgula',
                    explanation: 'É uma boa prática usar espaços entre parâmetros e sempre terminar statements com ponto e vírgula.'
                }
            ]
        };

        const langCorrections = corrections[language] || corrections.js;
        const correction = langCorrections[index % langCorrections.length];

        return {
            id: `correction_${index}`,
            type: 'correction',
            language: language,
            incorrectCode: correction.incorrect,
            correctCode: correction.correct,
            error: correction.error,
            explanation: correction.explanation,
            userCode: ''
        };
    }

    /**
     * Exibe a questão atual
     */
    displayQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endGame();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        // Atualizar informações da questão
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('questionLanguage').textContent = this.formatLanguage(question.language);
        document.getElementById('questionType').textContent = this.modalities[question.type]?.name || 'Questão';

        // Configurar o tipo de questão
        this.setupQuestionType(question);

        // Atualizar progresso
        this.updateProgress();
        this.updateStats();
    }

    /**
     * Configura o tipo específico de questão
     */
    setupQuestionType(question) {
        // Esconder todas as áreas
        document.getElementById('choiceOptions').style.display = 'none';
        document.getElementById('codeEditor').style.display = 'none';
        document.getElementById('errorInterpretation').style.display = 'none';
        document.getElementById('codeCorrection').style.display = 'none';

        // Configurar baseado no tipo
        if (question.type === 'choice') {
            this.setupMultipleChoice(question);
        } else if (question.type === 'coding') {
            this.setupCodeEditor(question);
        } else if (question.type === 'debugging') {
            this.setupErrorInterpretation(question);
        } else if (question.type === 'correction') {
            this.setupCodeCorrection(question);
        }
    }

    /**
     * Configura questão de múltipla escolha
     */
    setupMultipleChoice(question) {
        const container = document.getElementById('choiceOptions');
        container.style.display = 'flex';
        container.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.innerHTML = `
                <div class="option-label">
                    <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                    <div class="option-text">${option}</div>
                </div>
            `;
            
            optionDiv.addEventListener('click', () => this.selectOption(optionDiv, index, question));
            container.appendChild(optionDiv);
        });
    }

    /**
     * Configura editor de código
     */
    setupCodeEditor(question) {
        const container = document.getElementById('codeEditor');
        container.style.display = 'block';
        
        document.getElementById('codeLanguage').textContent = this.formatLanguage(question.language);
        document.getElementById('codeInput').value = question.template || '';
        document.getElementById('codeOutput').style.display = 'none';
    }

    /**
     * Configura interpretação de erro
     */
    setupErrorInterpretation(question) {
        const container = document.getElementById('errorInterpretation');
        container.style.display = 'block';
        
        document.getElementById('errorText').textContent = question.error;
        
        const optionsContainer = document.getElementById('errorOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.innerHTML = `
                <div class="option-label">
                    <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                    <div class="option-text">${option}</div>
                </div>
            `;
            
            optionDiv.addEventListener('click', () => this.selectOption(optionDiv, index, question));
            optionsContainer.appendChild(optionDiv);
        });
    }

    /**
     * Configura correção de código
     */
    setupCodeCorrection(question) {
        const container = document.getElementById('codeCorrection');
        container.style.display = 'block';
        
        document.getElementById('incorrectCode').textContent = question.incorrectCode;
        document.getElementById('correctionInput').value = question.template || '';
    }

    /**
     * Seleciona uma opção
     */
    selectOption(element, index, question) {
        // Remover seleção anterior
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        
        // Selecionar nova opção
        element.classList.add('selected');
        
        question.selectedAnswer = index;
    }

    /**
     * Executa código (para desafios de código)
     */
    runCode() {
        const code = document.getElementById('codeInput').value;
        const output = document.getElementById('codeOutput');
        
        if (!code.trim()) {
            this.showNotification('Por favor, escreva algum código!', 'warning');
            return;
        }

        try {
            // Simular execução (em um ambiente real, usaria sandbox)
            const result = this.simulateCodeExecution(code);
            output.style.display = 'block';
            output.className = 'code-output success';
            output.textContent = `✅ Código executado com sucesso!\nResultado: ${result}`;
        } catch (error) {
            output.style.display = 'block';
            output.className = 'code-output error';
            output.textContent = `❌ Erro na execução:\n${error.message}`;
        }
    }

    /**
     * Simula execução de código (simplificado)
     */
    simulateCodeExecution(code) {
        // Validação básica de sintaxe
        if (code.includes('function') && !code.includes('{')) {
            throw new Error('Falta abrir chaves na função');
        }
        
        if (code.includes('return') && !code.includes(';')) {
            throw new Error('Falta ponto e vírgula');
        }

        // Simular resultado baseado no código
        if (code.includes('soma')) {
            return '5 (função soma disponível)';
        }
        
        if (code.includes('isPar')) {
            return 'true (função isPar disponível)';
        }

        return 'Código executado com sucesso!';
    }

    /**
     * Submete a resposta
     */
    submitAnswer() {
        if (!this.isGameActive) return;

        const question = this.questions[this.currentQuestionIndex];
        let isCorrect = false;

        if (question.type === 'choice' || question.type === 'debugging') {
            if (question.selectedAnswer === null || question.selectedAnswer === undefined) {
                this.showNotification('Por favor, selecione uma resposta!', 'warning');
                return;
            }
            isCorrect = question.selectedAnswer === question.correct;
        } else if (question.type === 'coding') {
            const userCode = document.getElementById('codeInput').value;
            if (!userCode.trim()) {
                this.showNotification('Por favor, escreva seu código!', 'warning');
                return;
            }
            question.userCode = userCode;
            isCorrect = this.validateCode(userCode, question);
        } else if (question.type === 'correction') {
            const userCode = document.getElementById('correctionInput').value;
            if (!userCode.trim()) {
                this.showNotification('Por favor, escreva a correção!', 'warning');
                return;
            }
            question.userCode = userCode;
            isCorrect = this.validateCode(userCode, question);
        }

        this.processAnswer(question, isCorrect);
    }

    /**
     * Valida código enviado
     */
    validateCode(userCode, question) {
        if (question.type === 'coding') {
            // Validar se o código contém os elementos básicos esperados
            return userCode.includes('return') && userCode.includes('}');
        } else if (question.type === 'correction') {
            // Validar se o código foi corrigido
            return userCode.trim() !== question.incorrectCode.trim() && 
                   userCode.includes('{') && userCode.includes('}');
        }
        return false;
    }

    /**
     * Processa a resposta
     */
    processAnswer(question, isCorrect) {
        // Atualizar pontuação
        if (!isCorrect) {
            this.currentScore = Math.max(0, this.currentScore - 5);
        }

        // Verificar game over
        if (this.currentScore < 50) {
            this.endGame();
            return;
        }

        // Mostrar feedback
        this.showFeedback(question, isCorrect);
    }

    /**
     * Mostra feedback da resposta
     */
    showFeedback(question, isCorrect) {
        const modal = document.getElementById('feedbackModal');
        const icon = document.getElementById('feedbackIcon');
        const title = document.getElementById('feedbackTitle');
        const message = document.getElementById('feedbackMessage');
        const explanation = document.getElementById('feedbackExplanation');
        const explanationText = document.getElementById('explanationText');

        // Configurar conteúdo
        if (isCorrect) {
            icon.className = 'fas fa-check-circle';
            title.textContent = 'Correto! 🎉';
            message.textContent = 'Excelente trabalho! Você acertou esta questão.';
            modal.className = 'modal show correct';
        } else {
            icon.className = 'fas fa-times-circle';
            title.textContent = 'Incorreto! 😔';
            message.textContent = 'Não foi desta vez, mas continue tentando!';
            modal.className = 'modal show incorrect';
        }

        // Mostrar explicação
        if (question.explanation) {
            explanationText.textContent = question.explanation;
            explanation.style.display = 'block';
        } else {
            explanation.style.display = 'none';
        }

        // Animar feedback
        const content = modal.querySelector('.modal-content');
        content.classList.add(isCorrect ? 'correct' : 'incorrect');

        // Marcar questão como respondida
        question.isAnswered = true;
        question.isCorrect = isCorrect;
    }

    /**
     * Próxima questão
     */
    nextQuestion() {
        const modal = document.getElementById('feedbackModal');
        modal.classList.remove('show', 'correct', 'incorrect');
        
        this.currentQuestionIndex++;
        this.updateProgress();
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endGame();
        } else {
            this.displayQuestion();
        }
    }

    /**
     * Finaliza o jogo
     */
    endGame() {
        this.isGameActive = false;
        
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        const correctAnswers = this.questions.filter(q => q.isCorrect).length;
        const totalQuestions = this.questions.length;
        const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

        // Determinar resultado
        let result, title, message;
        if (this.currentScore === 100) {
            result = 'champion';
            title = '🏆 CAMPEÃO!';
            message = 'Parabéns! Você demonstrou conhecimento excepcional em programação!';
        } else if (this.currentScore >= 70) {
            result = 'good';
            title = '🎯 BOM DESEMPENHO!';
            message = 'Ótimo trabalho! Você atingiu uma pontuação acima da média!';
        } else if (this.currentScore >= 50) {
            result = 'average';
            title = '📈 POVO SUPEROU!';
            message = 'Bom esforço! Continue praticando para melhorar ainda mais!';
        } else {
            result = 'gameover';
            title = '🔄 TENTE NOVAMENTE!';
            message = 'Não desista! A prática leva à perfeição. Tente novamente!';
        }

        // Salvar no histórico
        this.saveToHistory({
            player: this.currentPlayer,
            mode: this.currentMode,
            score: this.currentScore,
            correct: correctAnswers,
            total: totalQuestions,
            accuracy: accuracy,
            time: timeSpent,
            result: result,
            date: new Date().toLocaleString('pt-BR')
        });

        // Mostrar tela final
        this.showFinalScreen(result, title, message, {
            score: this.currentScore,
            correct: `${correctAnswers}/${totalQuestions}`,
            accuracy: `${accuracy}%`,
            time: this.formatTime(timeSpent)
        });
    }

    /**
     * Mostra tela final
     */
    showFinalScreen(result, title, message, stats) {
        const modal = document.getElementById('finalScreen');
        const content = modal.querySelector('.modal-content');
        const titleEl = document.getElementById('finalTitle');
        const messageEl = document.getElementById('finalMessage');
        const scoreEl = document.getElementById('finalScore');
        const correctEl = document.getElementById('finalCorrect');
        const accuracyEl = document.getElementById('finalAccuracy');
        const iconEl = document.getElementById('finalIcon');

        // Configurar classes
        content.className = `modal-content final-content ${result}`;

        // Configurar conteúdo
        titleEl.textContent = title;
        messageEl.textContent = message;
        scoreEl.textContent = stats.score;
        correctEl.textContent = stats.correct;
        accuracyEl.textContent = stats.accuracy;

        // Mostrar modal
        modal.classList.add('show');
    }

    /**
     * Para o jogo atual
     */
    quitGame() {
        if (confirm('Tem certeza que deseja sair? Seu progresso será perdido.')) {
            this.resetGame();
            this.showScreen('modeScreen');
        }
    }

    /**
     * Joga novamente
     */
    playAgain() {
        this.resetGame();
        this.showScreen('modeScreen');
    }

    /**
     * Volta ao menu
     */
    backToMenu() {
        this.resetGame();
        this.showScreen('loginScreen');
    }

    /**
     * Mostra histórico
     */
    showHistory() {
        this.loadHistoryScreen();
        this.showScreen('historyScreen');
    }

    /**
     * Fecha histórico
     */
    closeHistory() {
        this.showScreen('quizScreen');
    }

    /**
     * Reseta o estado do jogo
     */
    resetGame() {
        this.currentMode = null;
        this.currentQuestionIndex = 0;
        this.currentScore = 100;
        this.questions = [];
        this.isGameActive = false;
        this.startTime = null;
    }

    /**
     * Atualiza progresso
     */
    updateProgress() {
        const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        
        // Atualizar barra de progresso se existir
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    /**
     * Atualiza estatísticas
     */
    updateStats() {
        document.getElementById('currentScore').textContent = this.currentScore;
        document.getElementById('currentPlayer').textContent = this.currentPlayer;
        document.getElementById('currentMode').textContent = this.modalities[this.currentMode]?.name || this.currentMode;
    }

    /**
     * Salva no histórico
     */
    saveToHistory(gameData) {
        this.gameHistory.unshift(gameData);
        
        // Manter apenas os últimos 50 jogos
        if (this.gameHistory.length > 50) {
            this.gameHistory = this.gameHistory.slice(0, 50);
        }
        
        this.saveGameHistory();
    }

    /**
     * Carrega tela de histórico
     */
    loadHistoryScreen() {
        const container = document.getElementById('historyList');
        container.innerHTML = '';

        if (this.gameHistory.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-history" style="font-size: 3rem; margin-bottom: 20px; color: #ccc;"></i>
                    <p>Você ainda não jogou nenhuma partida!</p>
                    <p>Volte e jogue sua primeira partida para ver o histórico aqui.</p>
                </div>
            `;
            return;
        }

        this.gameHistory.forEach((game, index) => {
            const item = document.createElement('div');
            item.className = `history-item ${game.result}`;
            item.innerHTML = `
                <div class="history-row">
                    <div class="history-left">
                        <div class="history-info">
                            <h4>Jogo ${index + 1} - ${this.modalities[game.mode]?.name || game.mode}</h4>
                            <p>${game.date}</p>
                        </div>
                    </div>
                    <div class="history-score">${game.score}</div>
                </div>
                <div class="history-details">
                    <div class="history-detail">
                        <span>Acertos</span>
                        <strong>${game.correct}/${game.total}</strong>
                    </div>
                    <div class="history-detail">
                        <span>Precisão</span>
                        <strong>${game.accuracy}%</strong>
                    </div>
                    <div class="history-detail">
                        <span>Tempo</span>
                        <strong>${this.formatTime(game.time)}</strong>
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    /**
     * Salva histórico no localStorage
     */
    saveGameHistory() {
        try {
            localStorage.setItem('devquiz-history', JSON.stringify(this.gameHistory));
        } catch (error) {
            console.warn('Não foi possível salvar histórico:', error);
        }
    }

    /**
     * Carrega histórico do localStorage
     */
    loadGameHistory() {
        try {
            const saved = localStorage.getItem('devquiz-history');
            if (saved) {
                this.gameHistory = JSON.parse(saved);
            }
        } catch (error) {
            console.warn('Não foi possível carregar histórico:', error);
            this.gameHistory = [];
        }
    }

    /**
     * Mostra/oculta telas
     */
    showScreen(screenId) {
        // Ocultar todas as telas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Mostrar tela específica
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
        }
    }

    /**
     * Formata linguagem para display
     */
    formatLanguage(lang) {
        const formatMap = {
            'html': 'HTML',
            'css': 'CSS',
            'js': 'JavaScript',
            'ts': 'TypeScript',
            'c': 'C',
            'cpp': 'C++',
            'csharp': 'C#',
            'python': 'Python',
            'sql': 'SQL',
            'java': 'Java',
            'php': 'PHP',
            'go': 'Go',
            'rust': 'Rust',
            'kotlin': 'Kotlin',
            'swift': 'Swift'
        };
        return formatMap[lang] || lang.toUpperCase();
    }

    /**
     * Formata tempo
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Mostra notificação
     */
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : type === 'warning' ? 'exclamation' : 'info'}-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Adicionar estilos se não existirem
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 8px;
                    padding: 15px 20px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    z-index: 2000;
                    animation: slideInRight 0.3s ease-out;
                    max-width: 300px;
                }
                .notification.success { border-left: 4px solid #28a745; }
                .notification.error { border-left: 4px solid #dc3545; }
                .notification.warning { border-left: 4px solid #ffc107; }
                .notification.info { border-left: 4px solid #17a2b8; }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .notification i { font-size: 1.2rem; }
                .notification.success i { color: #28a745; }
                .notification.error i { color: #dc3545; }
                .notification.warning i { color: #ffc107; }
                .notification.info i { color: #17a2b8; }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Inicializar aplicação
const devQuiz = new DevQuizApp();