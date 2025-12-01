// js/storage.js
const HISTORY_KEY = 'assistant_history_v1';

export function loadHistory() {
    try {
        const history = localStorage.getItem(HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        return [];
    }
}

export function saveHistory(history) {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
        console.error("Erro ao salvar histórico:", error);
    }
}

export function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
}