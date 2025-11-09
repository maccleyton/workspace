/**
 * Storage Manager - Handles game history, scores, and user data
 * Manages local storage for game statistics and settings
 */

class StorageManager {
    constructor() {
        this.storageKeys = {
            gameHistory: 'devquiz_game_history',
            userSettings: 'devquiz_user_settings',
            achievements: 'devquiz_achievements',
            statistics: 'devquiz_statistics',
            currentSession: 'devquiz_current_session'
        };
        
        this.maxHistoryItems = 100;
        this.storageQuota = 5 * 1024 * 1024; // 5MB
        this.compressionEnabled = true;
    }

    /**
     * Initialize storage manager
     */
    init() {
        this.checkStorageAvailability();
        this.loadStatistics();
        this.setupStorageListener();
        console.log('Storage Manager initialized');
    }

    /**
     * Check if localStorage is available
     */
    checkStorageAvailability() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            this.storageAvailable = true;
        } catch (error) {
            this.storageAvailable = false;
            console.warn('localStorage not available:', error);
        }
    }

    /**
     * Save game result to history
     */
    saveGameResult(gameData) {
        if (!this.storageAvailable) {
            console.warn('Cannot save: storage not available');
            return false;
        }

        try {
            const history = this.getGameHistory();
            
            // Add new game data with additional metadata
            const enrichedGameData = {
                ...gameData,
                id: this.generateGameId(),
                timestamp: Date.now(),
                sessionId: this.getCurrentSessionId(),
                version: '1.0.0'
            };

            // Add to beginning of array
            history.unshift(enrichedGameData);

            // Limit history size
            if (history.length > this.maxHistoryItems) {
                history.splice(this.maxHistoryItems);
            }

            // Compress if enabled
            const dataToStore = this.compressionEnabled 
                ? this.compressData(history) 
                : JSON.stringify(history);

            localStorage.setItem(this.storageKeys.gameHistory, dataToStore);
            
            // Update statistics
            this.updateStatistics(enrichedGameData);
            
            return true;
        } catch (error) {
            console.error('Error saving game result:', error);
            return false;
        }
    }

    /**
     * Get game history
     */
    getGameHistory(filters = {}) {
        if (!this.storageAvailable) {
            return [];
        }

        try {
            const stored = localStorage.getItem(this.storageKeys.gameHistory);
            if (!stored) {
                return [];
            }

            const history = this.compressionEnabled 
                ? this.decompressData(stored) 
                : JSON.parse(stored);

            // Apply filters
            let filteredHistory = history;
            
            if (filters.player) {
                filteredHistory = filteredHistory.filter(game => 
                    game.player === filters.player
                );
            }
            
            if (filters.mode) {
                filteredHistory = filteredHistory.filter(game => 
                    game.mode === filters.mode
                );
            }
            
            if (filters.dateRange) {
                const { start, end } = filters.dateRange;
                filteredHistory = filteredHistory.filter(game => 
                    game.timestamp >= start && game.timestamp <= end
                );
            }
            
            if (filters.minScore !== undefined) {
                filteredHistory = filteredHistory.filter(game => 
                    game.score >= filters.minScore
                );
            }
            
            if (filters.maxScore !== undefined) {
                filteredHistory = filteredHistory.filter(game => 
                    game.score <= filters.maxScore
                );
            }

            return filteredHistory;
        } catch (error) {
            console.error('Error loading game history:', error);
            return [];
        }
    }

    /**
     * Get player's best scores
     */
    getPlayerBestScores(playerName) {
        const history = this.getGameHistory({ player: playerName });
        
        const bestScores = {
            overall: Math.max(...history.map(game => game.score), 0),
            byMode: {},
            byLanguage: {},
            recent: history.slice(0, 10)
        };

        // Best score by mode
        const modes = [...new Set(history.map(game => game.mode))];
        modes.forEach(mode => {
            const modeGames = history.filter(game => game.mode === mode);
            bestScores.byMode[mode] = Math.max(...modeGames.map(game => game.score), 0);
        });

        // Best score by language
        const languages = [...new Set(history.map(game => game.language))];
        languages.forEach(lang => {
            const langGames = history.filter(game => game.language === lang);
            bestScores.byLanguage[lang] = Math.max(...langGames.map(game => game.score), 0);
        });

        return bestScores;
    }

    /**
     * Get game statistics
     */
    getStatistics() {
        if (!this.storageAvailable) {
            return this.getDefaultStatistics();
        }

        try {
            const stored = localStorage.getItem(this.storageKeys.statistics);
            return stored ? JSON.parse(stored) : this.getDefaultStatistics();
        } catch (error) {
            console.error('Error loading statistics:', error);
            return this.getDefaultStatistics();
        }
    }

    /**
     * Update statistics after game
     */
    updateStatistics(gameData) {
        const stats = this.getStatistics();
        
        // Update general stats
        stats.totalGames += 1;
        stats.totalQuestions += gameData.questions.length;
        stats.totalCorrectAnswers += gameData.performance.correctAnswers;
        
        // Update mode stats
        if (!stats.byMode[gameData.mode]) {
            stats.byMode[gameData.mode] = { games: 0, averageScore: 0, bestScore: 0 };
        }
        stats.byMode[gameData.mode].games += 1;
        stats.byMode[gameData.mode].averageScore = this.calculateAverage(
            stats.byMode[gameData.mode].averageScore,
            stats.byMode[gameData.mode].games,
            gameData.score
        );
        stats.byMode[gameData.mode].bestScore = Math.max(
            stats.byMode[gameData.mode].bestScore,
            gameData.score
        );

        // Update language stats
        if (gameData.language !== 'mixed') {
            if (!stats.byLanguage[gameData.language]) {
                stats.byLanguage[gameData.language] = { games: 0, averageScore: 0, bestScore: 0 };
            }
            stats.byLanguage[gameData.language].games += 1;
            stats.byLanguage[gameData.language].averageScore = this.calculateAverage(
                stats.byLanguage[gameData.language].averageScore,
                stats.byLanguage[gameData.language].games,
                gameData.score
            );
            stats.byLanguage[gameData.language].bestScore = Math.max(
                stats.byLanguage[gameData.language].bestScore,
                gameData.score
            );
        }

        // Update achievements
        this.updateAchievements(gameData, stats);

        // Save updated statistics
        this.saveStatistics(stats);
    }

    /**
     * Check and update achievements
     */
    updateAchievements(gameData, stats) {
        if (!stats.achievements) {
            stats.achievements = {};
        }

        const newAchievements = [];

        // First game achievement
        if (stats.totalGames === 1) {
            newAchievements.push('first-game');
        }

        // Perfect score achievement
        if (gameData.score === 100) {
            newAchievements.push('perfect-score');
        }

        // High score achievements
        if (gameData.score >= 90) {
            newAchievements.push('high-scorer');
        }

        // Streak achievements
        if (gameData.performance.streak >= 10) {
            newAchievements.push('streak-master');
        }

        // Mode-specific achievements
        if (gameData.mode === 'coding' && gameData.score >= 80) {
            newAchievements.push('coding-expert');
        }

        if (gameData.mode === 'debugging' && gameData.score >= 80) {
            newAchievements.push('debugging-expert');
        }

        // Add new achievements
        newAchievements.forEach(achievement => {
            if (!stats.achievements[achievement]) {
                stats.achievements[achievement] = {
                    unlocked: true,
                    unlockedAt: Date.now(),
                    gameId: gameData.id
                };
            }
        });
    }

    /**
     * Get achievements
     */
    getAchievements() {
        const stats = this.getStatistics();
        return stats.achievements || {};
    }

    /**
     * Save user settings
     */
    saveUserSettings(settings) {
        if (!this.storageAvailable) {
            return false;
        }

        try {
            const currentSettings = this.getUserSettings();
            const mergedSettings = { ...currentSettings, ...settings };
            
            localStorage.setItem(this.storageKeys.userSettings, JSON.stringify(mergedSettings));
            return true;
        } catch (error) {
            console.error('Error saving user settings:', error);
            return false;
        }
    }

    /**
     * Get user settings
     */
    getUserSettings() {
        if (!this.storageAvailable) {
            return this.getDefaultSettings();
        }

        try {
            const stored = localStorage.getItem(this.storageKeys.userSettings);
            return stored ? { ...this.getDefaultSettings(), ...JSON.parse(stored) } : this.getDefaultSettings();
        } catch (error) {
            console.error('Error loading user settings:', error);
            return this.getDefaultSettings();
        }
    }

    /**
     * Save current session
     */
    saveCurrentSession(sessionData) {
        if (!this.storageAvailable) {
            return false;
        }

        try {
            const sessionId = this.getCurrentSessionId();
            const session = {
                id: sessionId,
                ...sessionData,
                savedAt: Date.now()
            };

            localStorage.setItem(this.storageKeys.currentSession, JSON.stringify(session));
            return true;
        } catch (error) {
            console.error('Error saving current session:', error);
            return false;
        }
    }

    /**
     * Load current session
     */
    loadCurrentSession() {
        if (!this.storageAvailable) {
            return null;
        }

        try {
            const stored = localStorage.getItem(this.storageKeys.currentSession);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Error loading current session:', error);
            return null;
        }
    }

    /**
     * Clear current session
     */
    clearCurrentSession() {
        if (!this.storageAvailable) {
            return false;
        }

        try {
            localStorage.removeItem(this.storageKeys.currentSession);
            return true;
        } catch (error) {
            console.error('Error clearing current session:', error);
            return false;
        }
    }

    /**
     * Export game data
     */
    exportGameData(format = 'json') {
        const data = {
            gameHistory: this.getGameHistory(),
            statistics: this.getStatistics(),
            achievements: this.getAchievements(),
            settings: this.getUserSettings(),
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };

        switch (format) {
            case 'json':
                return JSON.stringify(data, null, 2);
            case 'csv':
                return this.convertToCSV(data.gameHistory);
            default:
                return JSON.stringify(data, null, 2);
        }
    }

    /**
     * Import game data
     */
    importGameData(data, format = 'json') {
        try {
            let parsedData;
            
            switch (format) {
                case 'json':
                    parsedData = typeof data === 'string' ? JSON.parse(data) : data;
                    break;
                case 'csv':
                    parsedData = this.parseCSV(data);
                    break;
                default:
                    parsedData = typeof data === 'string' ? JSON.parse(data) : data;
            }

            // Validate data structure
            if (!this.validateImportedData(parsedData)) {
                throw new Error('Invalid data format');
            }

            // Import game history
            if (parsedData.gameHistory) {
                const currentHistory = this.getGameHistory();
                const mergedHistory = [...parsedData.gameHistory, ...currentHistory];
                this.saveGameHistory(mergedHistory);
            }

            // Import statistics
            if (parsedData.statistics) {
                this.saveStatistics(parsedData.statistics);
            }

            // Import achievements
            if (parsedData.achievements) {
                const currentAchievements = this.getAchievements();
                const mergedAchievements = { ...parsedData.achievements, ...currentAchievements };
                const stats = this.getStatistics();
                stats.achievements = mergedAchievements;
                this.saveStatistics(stats);
            }

            return true;
        } catch (error) {
            console.error('Error importing game data:', error);
            return false;
        }
    }

    /**
     * Clear all data
     */
    clearAllData() {
        if (!this.storageAvailable) {
            return false;
        }

        try {
            Object.values(this.storageKeys).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }

    /**
     * Get storage usage information
     */
    getStorageInfo() {
        if (!this.storageAvailable) {
            return null;
        }

        let usedSpace = 0;
        const items = {};

        Object.entries(this.storageKeys).forEach(([name, key]) => {
            const data = localStorage.getItem(key);
            const size = data ? new Blob([data]).size : 0;
            usedSpace += size;
            items[name] = {
                size: size,
                sizeFormatted: this.formatBytes(size)
            };
        });

        return {
            usedSpace: usedSpace,
            usedSpaceFormatted: this.formatBytes(usedSpace),
            quota: this.storageQuota,
            quotaFormatted: this.formatBytes(this.storageQuota),
            percentage: (usedSpace / this.storageQuota) * 100,
            items: items
        };
    }

    /**
     * Compress data for storage
     */
    compressData(data) {
        if (!this.compressionEnabled) {
            return JSON.stringify(data);
        }

        try {
            // Simple compression (in production, use a library like pako)
            const jsonString = JSON.stringify(data);
            return this.simpleCompress(jsonString);
        } catch (error) {
            console.warn('Compression failed, storing uncompressed:', error);
            return JSON.stringify(data);
        }
    }

    /**
     * Decompress data from storage
     */
    decompressData(compressedData) {
        if (!this.compressionEnabled) {
            return JSON.parse(compressedData);
        }

        try {
            // Simple decompression
            const jsonString = this.simpleDecompress(compressedData);
            return JSON.parse(jsonString);
        } catch (error) {
            console.warn('Decompression failed, trying uncompressed:', error);
            return JSON.parse(compressedData);
        }
    }

    /**
     * Simple compression algorithm
     */
    simpleCompress(str) {
        // Basic string compression - replace common patterns
        return str
            .replace(/true/g, 't')
            .replace(/false/g, 'f')
            .replace(/null/g, 'n')
            .replace(/:null/g, ':n')
            .replace(/:true/g, ':t')
            .replace(/:false/g, ':f');
    }

    /**
     * Simple decompression algorithm
     */
    simpleDecompress(str) {
        return str
            .replace(/t/g, 'true')
            .replace(/f/g, 'false')
            .replace(/n/g, 'null');
    }

    /**
     * Generate unique game ID
     */
    generateGameId() {
        return 'game_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Get current session ID
     */
    getCurrentSessionId() {
        let sessionId = sessionStorage.getItem('devquiz_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('devquiz_session_id', sessionId);
        }
        return sessionId;
    }

    /**
     * Setup storage event listener
     */
    setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (Object.values(this.storageKeys).includes(e.key)) {
                this.onStorageChange(e.key, e.newValue, e.oldValue);
            }
        });
    }

    /**
     * Handle storage changes
     */
    onStorageChange(key, newValue, oldValue) {
        if (key === this.storageKeys.gameHistory) {
            this.onGameHistoryChange(newValue, oldValue);
        } else if (key === this.storageKeys.userSettings) {
            this.onSettingsChange(newValue, oldValue);
        }
    }

    /**
     * Handle game history changes
     */
    onGameHistoryChange(newValue, oldValue) {
        // Notify other tabs about history changes
        if (window.devQuiz && typeof window.devQuiz.loadHistoryScreen === 'function') {
            window.devQuiz.loadHistoryScreen();
        }
    }

    /**
     * Handle settings changes
     */
    onSettingsChange(newValue, oldValue) {
        // Update UI if needed
        console.log('Settings changed');
    }

    /**
     * Save game history directly
     */
    saveGameHistory(history) {
        if (!this.storageAvailable) {
            return false;
        }

        try {
            const dataToStore = this.compressionEnabled 
                ? this.compressData(history) 
                : JSON.stringify(history);

            localStorage.setItem(this.storageKeys.gameHistory, dataToStore);
            return true;
        } catch (error) {
            console.error('Error saving game history:', error);
            return false;
        }
    }

    /**
     * Save statistics
     */
    saveStatistics(stats) {
        if (!this.storageAvailable) {
            return false;
        }

        try {
            localStorage.setItem(this.storageKeys.statistics, JSON.stringify(stats));
            return true;
        } catch (error) {
            console.error('Error saving statistics:', error);
            return false;
        }
    }

    /**
     * Load statistics
     */
    loadStatistics() {
        this.statistics = this.getStatistics();
    }

    /**
     * Get default settings
     */
    getDefaultSettings() {
        return {
            soundEnabled: true,
            animationsEnabled: true,
            showHints: true,
            timeLimit: 30,
            questionsPerRound: 20,
            preferredLanguages: [],
            difficulty: 'mixed',
            theme: 'default'
        };
    }

    /**
     * Get default statistics
     */
    getDefaultStatistics() {
        return {
            totalGames: 0,
            totalQuestions: 0,
            totalCorrectAnswers: 0,
            byMode: {},
            byLanguage: {},
            achievements: {}
        };
    }

    /**
     * Calculate running average
     */
    calculateAverage(currentAverage, count, newValue) {
        return ((currentAverage * (count - 1)) + newValue) / count;
    }

    /**
     * Format bytes to human readable
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Convert game history to CSV
     */
    convertToCSV(history) {
        const headers = ['Date', 'Player', 'Mode', 'Score', 'Correct', 'Total', 'Language', 'Time'];
        const rows = history.map(game => [
            new Date(game.timestamp).toLocaleDateString(),
            game.player,
            game.mode,
            game.score,
            game.performance.correctAnswers,
            game.performance.questionsAnswered,
            game.language || 'Mixed',
            Math.round(game.performance.averageTime / 1000) + 's'
        ]);

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    /**
     * Parse CSV data
     */
    parseCSV(csvData) {
        // Simplified CSV parser
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        const games = [];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',');
                games.push({
                    player: values[1],
                    mode: values[2],
                    score: parseInt(values[3]),
                    performance: {
                        correctAnswers: parseInt(values[4]),
                        questionsAnswered: parseInt(values[5])
                    },
                    language: values[6],
                    timestamp: new Date(values[0]).getTime()
                });
            }
        }

        return { gameHistory: games };
    }

    /**
     * Validate imported data structure
     */
    validateImportedData(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }

        // Basic structure validation
        if (data.gameHistory && !Array.isArray(data.gameHistory)) {
            return false;
        }

        if (data.statistics && typeof data.statistics !== 'object') {
            return false;
        }

        if (data.achievements && typeof data.achievements !== 'object') {
            return false;
        }

        return true;
    }
}

// Initialize storage manager
const storageManager = new StorageManager();
storageManager.init();

// Export for global use
window.storageManager = storageManager;