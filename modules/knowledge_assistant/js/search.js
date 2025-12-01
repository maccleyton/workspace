// js/search.js
import { getDocs } from './hub-api-assistant.js'; 

export class DocumentSearch {
    constructor(container) {
        this.container = container;
        this.allDocs = [];
        this.init();
    }

    async init() {
        this.render();
        await this.loadDocuments();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="search-widget">
                <h3>🔍 Pesquisar Documentos</h3>
                <div class="search-form">
                    <input type="text" id="searchInput" class="search-input" placeholder="Pesquisar por título ou conteúdo...">
                </div>
                <div id="searchResults" class="search-results"></div>
            </div>
        `;
    }

    async loadDocuments() {
        try {
            this.allDocs = await getDocs();
        } catch (error) {
            console.error("Falha ao carregar documentos para pesquisa:", error);
        }
    }

    attachEventListeners() {
        const searchInput = this.container.querySelector('#searchInput');
        searchInput.addEventListener('input', (e) => this.performSearch(e.target.value));
    }

    performSearch(query) {
        const resultsDiv = this.container.querySelector('#searchResults');
        const lowerCaseQuery = query.toLowerCase().trim();

        if (!lowerCaseQuery) {
            resultsDiv.innerHTML = '<p class="search-placeholder">Digite algo para começar a pesquisar.</p>';
            return;
        }

        const results = this.allDocs.filter(doc => {
            const titleMatch = doc.title.toLowerCase().includes(lowerCaseQuery);
            const contentMatch = doc.content.toLowerCase().includes(lowerCaseQuery);
            return titleMatch || contentMatch;
        });

        if (results.length === 0) {
            resultsDiv.innerHTML = '<p class="search-placeholder">Nenhum documento encontrado.</p>';
            return;
        }

        resultsDiv.innerHTML = results.map(doc => `
            <a href="view.html?id=${doc.id}" class="search-result-item">
                <h4>${this.highlightTerm(doc.title, lowerCaseQuery)}</h4>
                <p>${this.highlightTerm(this.getSnippet(doc.content, lowerCaseQuery), lowerCaseQuery)}</p>
            </a>
        `).join('');
    }

    // ADICIONE ESTA NOVA FUNÇÃO
    highlightTerm(text, term) {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    getSnippet(content, query) {
        const index = content.toLowerCase().indexOf(query);
        if (index === -1) return content.substring(0, 100) + '...';
        
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + query.length + 50);
        let snippet = content.substring(start, end);
        
        if (start > 0) snippet = '...' + snippet;
        if (end < content.length) snippet = snippet + '...';
        
        return snippet;
    }
}