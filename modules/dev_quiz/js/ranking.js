// Sistema de Ranking com LocalStorage
class RankingSystem {
    constructor() {
        this.storageKey = 'devQuizRanking';
    }
    
    // Salvar pontuação
    saveScore(playerName, score, language, mode, correctAnswers, wrongAnswers) {
        const ranking = this.getRanking();
        
        const newEntry = {
            id: Date.now(),
            playerName: playerName,
            score: score,
            language: language,
            mode: mode,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            date: new Date().toISOString(),
            dateFormatted: new Date().toLocaleDateString('pt-BR')
        };
        
        ranking.push(newEntry);
        
        // Ordenar por pontuação (maior para menor)
        ranking.sort((a, b) => b.score - a.score);
        
        // Manter apenas top 100
        const top100 = ranking.slice(0, 100);
        
        localStorage.setItem(this.storageKey, JSON.stringify(top100));
        
        return this.getPlayerPosition(newEntry.id);
    }
    
    // Obter ranking completo
    getRanking() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }
    
    // Filtrar ranking por linguagem
    getRankingByLanguage(language) {
        const ranking = this.getRanking();
        
        if (language === 'all') {
            return ranking;
        }
        
        return ranking.filter(entry => entry.language === language);
    }
    
    // Obter posição do jogador
    getPlayerPosition(entryId) {
        const ranking = this.getRanking();
        const index = ranking.findIndex(entry => entry.id === entryId);
        return index !== -1 ? index + 1 : null;
    }
    
    // Obter top N jogadores
    getTopPlayers(n = 10, language = 'all') {
        const ranking = this.getRankingByLanguage(language);
        return ranking.slice(0, n);
    }
    
    // Limpar ranking
    clearRanking() {
        localStorage.removeItem(this.storageKey);
    }
}

// Instância global
const rankingSystem = new RankingSystem();
