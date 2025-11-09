/**
 * Quiz Engine - Core game mechanics
 * Handles game flow, scoring, validation, and state management
 */

class QuizEngine {
    constructor() {
        this.currentGame = null;
        this.questionTimer = null;
        this.timePerQuestion = 30; // seconds
        this.currentQuestionStart = 0;
        this.totalTimeSpent = 0;
        
        // Scoring system
        this.scoreRules = {
            correctAnswer: 0,      // No bonus for correct (start with 100)
            incorrectAnswer: -5,   // Penalty for wrong answer
            minimumScore: 50,      // Game over threshold
            perfectScore: 100,     // Champion threshold
            goodScore: 70          // Good performance threshold
        };
        
        // Performance tracking
        this.performance = {
            startTime: 0,
            questionsAnswered: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            averageTime: 0,
            streak: 0,
            bestStreak: 0
        };
    }

    /**
     * Initialize a new game session
     */
    initializeGame(playerName, mode, questions) {
        this.currentGame = {
            id: this.generateGameId(),
            player: playerName,
            mode: mode,
            questions: questions,
            currentIndex: 0,
            score: 100,
            startTime: Date.now(),
            isActive: true,
            gameType: mode === 'random' ? 'mixed' : 'specific',
            language: this.getGameLanguage(questions),
            difficulty: this.calculateDifficulty(questions)
        };
        
        this.performance = {
            startTime: Date.now(),
            questionsAnswered: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            averageTime: 0,
            streak: 0,
            bestStreak: 0
        };
        
        this.currentQuestionStart = Date.now();
        return this.currentGame;
    }

    /**
     * Get current question
     */
    getCurrentQuestion() {
        if (!this.currentGame || !this.currentGame.isActive) {
            return null;
        }
        
        return this.currentGame.questions[this.currentGame.currentIndex] || null;
    }

    /**
     * Process answer and update score
     */
    processAnswer(answer) {
        if (!this.currentGame || !this.currentGame.isActive) {
            return { success: false, error: 'Game not active' };
        }
        
        const question = this.getCurrentQuestion();
        if (!question) {
            return { success: false, error: 'No current question' };
        }
        
        const timeSpent = Date.now() - this.currentQuestionStart;
        this.totalTimeSpent += timeSpent;
        
        let isCorrect = false;
        let explanation = '';
        
        // Validate answer based on question type
        switch (question.type) {
            case 'choice':
            case 'debugging':
                isCorrect = this.validateChoiceAnswer(answer, question);
                break;
            case 'coding':
                isCorrect = this.validateCodingAnswer(answer, question);
                explanation = this.getCodingExplanation(answer, question);
                break;
            case 'correction':
                isCorrect = this.validateCorrectionAnswer(answer, question);
                explanation = this.getCorrectionExplanation(answer, question);
                break;
        }
        
        // Update performance metrics
        this.updatePerformance(isCorrect, timeSpent);
        
        // Update score
        this.updateScore(isCorrect);
        
        // Check game over conditions
        const gameState = this.checkGameState();
        
        return {
            success: true,
            isCorrect: isCorrect,
            question: question,
            timeSpent: timeSpent,
            currentScore: this.currentGame.score,
            explanation: explanation || question.explanation,
            gameState: gameState,
            performance: this.getCurrentPerformance()
        };
    }

    /**
     * Validate multiple choice answers
     */
    validateChoiceAnswer(selectedIndex, question) {
        if (typeof selectedIndex !== 'number' || selectedIndex < 0 || selectedIndex >= question.options.length) {
            return false;
        }
        
        return selectedIndex === question.correct;
    }

    /**
     * Validate coding answers
     */
    validateCodingAnswer(code, question) {
        if (!code || typeof code !== 'string') {
            return false;
        }
        
        // Basic validation rules
        const validationRules = this.getCodingValidationRules(question.language);
        const isValid = validationRules.every(rule => rule.test(code));
        
        return isValid;
    }

    /**
     * Validate correction answers
     */
    validateCorrectionAnswer(correctedCode, question) {
        if (!correctedCode || typeof correctedCode !== 'string') {
            return false;
        }
        
        // Check if code was actually changed
        if (correctedCode.trim() === question.incorrectCode.trim()) {
            return false;
        }
        
        // Check if the correction addresses the main issues
        const issues = this.identifyCodeIssues(question.incorrectCode);
        const fixes = this.identifyFixes(correctedCode);
        
        return this.validateFixes(issues, fixes);
    }

    /**
     * Get validation rules for coding challenges
     */
    getCodingValidationRules(language) {
        const rules = {
            js: [
                {
                    name: 'hasReturn',
                    test: (code) => code.includes('return') || code.includes('console.log'),
                    message: 'Código deve ter retorno ou saída'
                },
                {
                    name: 'properSyntax',
                    test: (code) => !code.match(/function\s+\w+\s*\([^)]*\)\s*[^{]/),
                    message: 'Função deve ter chaves de abertura'
                },
                {
                    name: 'completeStatement',
                    test: (code) => !code.match(/return\s+[^;{]+$/),
                    message: 'Statement deve terminar adequadamente'
                }
            ],
            python: [
                {
                    name: 'hasReturn',
                    test: (code) => code.includes('return'),
                    message: 'Função deve ter return'
                },
                {
                    name: 'properIndentation',
                    test: (code) => {
                        const lines = code.split('\n');
                        return lines.some(line => line.trim() && line.startsWith('    '));
                    },
                    message: 'Código deve estar indentado'
                }
            ]
        };
        
        return rules[language] || rules.js;
    }

    /**
     * Identify issues in incorrect code
     */
    identifyCodeIssues(code) {
        const issues = [];
        
        // Common JavaScript issues
        if (code.match(/function\s+\w+\s*\([^)]*\)\s*[^{]/)) {
            issues.push('missing-braces');
        }
        
        if (code.match(/return\s+[^;{]+$/)) {
            issues.push('incomplete-statement');
        }
        
        if (code.match(/[^;]\s*$/m) && !code.includes('function')) {
            issues.push('missing-semicolon');
        }
        
        if (code.match(/const\s+\w+\s*=/) && code.match(/=\s*[^;]+$/)) {
            issues.push('const-reassignment');
        }
        
        return issues;
    }

    /**
     * Identify fixes in corrected code
     */
    identifyFixes(code) {
        const fixes = [];
        
        if (code.match(/function\s+\w+\s*\([^)]*\)\s*{/)) {
            fixes.push('added-braces');
        }
        
        if (code.match(/return\s+[^;]*;/)) {
            fixes.push('added-semicolon');
        }
        
        if (code.match(/let\s+/) || code.match(/var\s+/)) {
            fixes.push('changed-const');
        }
        
        return fixes;
    }

    /**
     * Validate if fixes address the issues
     */
    validateFixes(issues, fixes) {
        // At least 50% of issues should be fixed
        const fixedCount = issues.filter(issue => {
            switch (issue) {
                case 'missing-braces': return fixes.includes('added-braces');
                case 'incomplete-statement': return fixes.includes('added-semicolon');
                case 'const-reassignment': return fixes.includes('changed-const');
                default: return true;
            }
        }).length;
        
        return fixedCount >= Math.ceil(issues.length / 2);
    }

    /**
     * Get explanation for coding answer
     */
    getCodingExplanation(code, question) {
        const rules = this.getCodingValidationRules(question.language);
        const failedRules = rules.filter(rule => !rule.test(code));
        
        if (failedRules.length === 0) {
            return 'Excelente! Seu código está correto e segue as melhores práticas.';
        }
        
        return `Atenção: ${failedRules[0].message}. ${question.explanation}`;
    }

    /**
     * Get explanation for correction answer
     */
    getCorrectionExplanation(code, question) {
        if (code.trim() === question.incorrectCode.trim()) {
            return 'Você não alterou o código. Tente identificar e corrigir os erros.';
        }
        
        return `Boa tentativa! ${question.explanation}`;
    }

    /**
     * Update performance metrics
     */
    updatePerformance(isCorrect, timeSpent) {
        this.performance.questionsAnswered++;
        this.performance.averageTime = this.totalTimeSpent / this.performance.questionsAnswered;
        
        if (isCorrect) {
            this.performance.correctAnswers++;
            this.performance.streak++;
            this.performance.bestStreak = Math.max(this.performance.bestStreak, this.performance.streak);
        } else {
            this.performance.incorrectAnswers++;
            this.performance.streak = 0;
        }
    }

    /**
     * Update game score
     */
    updateScore(isCorrect) {
        if (!isCorrect) {
            this.currentGame.score = Math.max(0, this.currentGame.score + this.scoreRules.incorrectAnswer);
        }
        // No bonus for correct answers (start with 100)
    }

    /**
     * Check if game should continue or end
     */
    checkGameState() {
        const totalQuestions = this.currentGame.questions.length;
        const currentIndex = this.currentGame.currentIndex;
        
        // Check score-based game over
        if (this.currentGame.score < this.scoreRules.minimumScore) {
            return {
                type: 'gameover',
                reason: 'low-score',
                message: 'Game Over! Sua pontuação ficou abaixo de 50.'
            };
        }
        
        // Check if all questions answered
        if (currentIndex >= totalQuestions - 1) {
            const accuracy = (this.performance.correctAnswers / this.performance.questionsAnswered) * 100;
            
            if (this.currentGame.score === this.scoreRules.perfectScore) {
                return {
                    type: 'champion',
                    reason: 'perfect-score',
                    message: '🏆 CAMPEÃO! Você demonstrou conhecimento excepcional!'
                };
            } else if (this.currentGame.score >= this.scoreRules.goodScore) {
                return {
                    type: 'good',
                    reason: 'good-performance',
                    message: '🎯 BOM DESEMPENHO! Você atingiu uma pontuação acima da média!'
                };
            } else {
                return {
                    type: 'average',
                    reason: 'completed',
                    message: '📈 BOM ESFORÇO! Continue praticando para melhorar!'
                };
            }
        }
        
        return {
            type: 'continue',
            reason: 'questions-remaining',
            message: 'Continue para a próxima questão!'
        };
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        if (!this.currentGame || !this.currentGame.isActive) {
            return null;
        }
        
        this.currentGame.currentIndex++;
        this.currentQuestionStart = Date.now();
        
        return this.getCurrentQuestion();
    }

    /**
     * End current game
     */
    endGame(reason = 'completed') {
        if (!this.currentGame) {
            return null;
        }
        
        this.currentGame.isActive = false;
        this.currentGame.endTime = Date.now();
        this.currentGame.totalTime = this.currentGame.endTime - this.currentGame.startTime;
        this.currentGame.finalPerformance = { ...this.performance };
        
        const result = this.generateFinalResult();
        
        return {
            game: this.currentGame,
            result: result,
            performance: this.getCurrentPerformance()
        };
    }

    /**
     * Generate final game result
     */
    generateFinalResult() {
        const score = this.currentGame.score;
        const accuracy = (this.performance.correctAnswers / this.performance.questionsAnswered) * 100;
        const totalTime = this.currentGame.totalTime;
        
        let result = {
            score: score,
            accuracy: accuracy,
            totalTime: totalTime,
            correctAnswers: this.performance.correctAnswers,
            totalQuestions: this.performance.questionsAnswered,
            bestStreak: this.performance.bestStreak,
            averageTime: Math.round(this.performance.averageTime)
        };
        
        if (score === this.scoreRules.perfectScore) {
            result.rank = 'champion';
            result.message = 'Parabéns! Você é um verdadeiro CAMPEÃO da programação!';
            result.achievement = 'Perfect Score';
        } else if (score >= this.scoreRules.goodScore) {
            result.rank = 'good';
            result.message = 'Excelente trabalho! Você demonstrou sólido conhecimento em programação.';
            result.achievement = 'Above Average';
        } else if (score >= this.scoreRules.minimumScore) {
            result.rank = 'average';
            result.message = 'Bom esforço! Continue praticando para melhorar ainda mais.';
            result.achievement = 'Completed';
        } else {
            result.rank = 'gameover';
            result.message = 'Não desista! A prática leva à perfeição. Tente novamente!';
            result.achievement = 'Try Again';
        }
        
        return result;
    }

    /**
     * Get current performance stats
     */
    getCurrentPerformance() {
        return {
            ...this.performance,
            currentScore: this.currentGame ? this.currentGame.score : 0,
            accuracy: this.performance.questionsAnswered > 0 
                ? Math.round((this.performance.correctAnswers / this.performance.questionsAnswered) * 100)
                : 0,
            averageTime: this.performance.questionsAnswered > 0
                ? Math.round(this.performance.averageTime / 1000)
                : 0
        };
    }

    /**
     * Get question statistics
     */
    getQuestionStats() {
        if (!this.currentGame) {
            return null;
        }
        
        return {
            current: this.currentGame.currentIndex + 1,
            total: this.currentGame.questions.length,
            remaining: this.currentGame.questions.length - this.currentGame.currentIndex - 1,
            progress: Math.round(((this.currentGame.currentIndex + 1) / this.currentGame.questions.length) * 100)
        };
    }

    /**
     * Generate unique game ID
     */
    generateGameId() {
        return 'game_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Get game language (for specific modes)
     */
    getGameLanguage(questions) {
        if (questions.length === 0) return 'mixed';
        
        const languages = [...new Set(questions.map(q => q.language))];
        return languages.length === 1 ? languages[0] : 'mixed';
    }

    /**
     * Calculate game difficulty
     */
    calculateDifficulty(questions) {
        if (questions.length === 0) return 'unknown';
        
        const codingQuestions = questions.filter(q => q.type === 'coding').length;
        const debuggingQuestions = questions.filter(q => q.type === 'debugging').length;
        const correctionQuestions = questions.filter(q => q.type === 'correction').length;
        
        const advancedQuestions = codingQuestions + debuggingQuestions + correctionQuestions;
        const difficultyRatio = advancedQuestions / questions.length;
        
        if (difficultyRatio >= 0.7) return 'hard';
        if (difficultyRatio >= 0.3) return 'medium';
        return 'easy';
    }

    /**
     * Get current game state
     */
    getGameState() {
        if (!this.currentGame) {
            return {
                isActive: false,
                error: 'No active game'
            };
        }
        
        return {
            isActive: this.currentGame.isActive,
            currentIndex: this.currentGame.currentIndex,
            totalQuestions: this.currentGame.questions.length,
            score: this.currentGame.score,
            timeSpent: Date.now() - this.currentGame.startTime,
            question: this.getCurrentQuestion(),
            performance: this.getCurrentPerformance(),
            stats: this.getQuestionStats()
        };
    }

    /**
     * Quit current game
     */
    quitGame() {
        if (!this.currentGame) {
            return { success: false, error: 'No active game' };
        }
        
        const gameData = this.endGame('quit');
        this.currentGame = null;
        
        return {
            success: true,
            reason: 'quit',
            gameData: gameData
        };
    }

    /**
     * Start timer for current question
     */
    startQuestionTimer(callback) {
        this.stopQuestionTimer();
        
        this.currentQuestionStart = Date.now();
        this.questionTimer = setInterval(() => {
            const timeSpent = Date.now() - this.currentQuestionStart;
            const timeRemaining = Math.max(0, (this.timePerQuestion * 1000) - timeSpent);
            
            if (callback) {
                callback({
                    timeSpent: timeSpent,
                    timeRemaining: timeRemaining,
                    timeLimit: this.timePerQuestion * 1000,
                    isExpired: timeRemaining <= 0
                });
            }
            
            if (timeRemaining <= 0) {
                this.stopQuestionTimer();
            }
        }, 1000);
    }

    /**
     * Stop question timer
     */
    stopQuestionTimer() {
        if (this.questionTimer) {
            clearInterval(this.questionTimer);
            this.questionTimer = null;
        }
    }

    /**
     * Get scoring breakdown
     */
    getScoringBreakdown() {
        return {
            startScore: 100,
            currentScore: this.currentGame ? this.currentGame.score : 0,
            totalPenalty: 100 - (this.currentGame ? this.currentGame.score : 0),
            wrongAnswers: this.performance.incorrectAnswers,
            penaltyPerWrong: Math.abs(this.scoreRules.incorrectAnswer),
            minimumScore: this.scoreRules.minimumScore,
            perfectScore: this.scoreRules.perfectScore,
            goodScore: this.scoreRules.goodScore
        };
    }

    /**
     * Validate game integrity
     */
    validateGameIntegrity() {
        if (!this.currentGame) {
            return { valid: false, error: 'No active game' };
        }
        
        const checks = [
            { name: 'Player name', valid: !!this.currentGame.player },
            { name: 'Questions available', valid: this.currentGame.questions.length > 0 },
            { name: 'Valid index', valid: this.currentGame.currentIndex >= 0 && this.currentGame.currentIndex < this.currentGame.questions.length },
            { name: 'Valid score', valid: this.currentGame.score >= 0 && this.currentGame.score <= 100 },
            { name: 'Active status', valid: typeof this.currentGame.isActive === 'boolean' }
        ];
        
        const failedChecks = checks.filter(check => !check.valid);
        
        return {
            valid: failedChecks.length === 0,
            checks: checks,
            failedChecks: failedChecks
        };
    }
}

// Initialize quiz engine
const quizEngine = new QuizEngine();

// Export for global use
window.quizEngine = quizEngine;