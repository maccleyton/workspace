class AnnotationsManager {
    constructor() {
        this.annotations = this.loadAnnotations();
        this.currentAnnotationId = null;
        this.init();
    }

    init() {
        this.renderAnnotations();
        this.setupEventListeners();
    }

    loadAnnotations() {
        const saved = localStorage.getItem('ai_assistant_annotations');
        return saved ? JSON.parse(saved) : [];
    }

    saveAnnotations() {
        localStorage.setItem('ai_assistant_annotations', JSON.stringify(this.annotations));
    }

    renderAnnotations() {
        const container = document.querySelector('.annotations-content');
        if (!container) return;

        if (this.annotations.length === 0) {
            container.innerHTML = '<div class="no-annotations">Nenhuma anotação ainda</div>';
            return;
        }

        container.innerHTML = this.annotations.map(annotation => `
            <div class="annotation-item ${annotation.id === this.currentAnnotationId ? 'active' : ''}" 
                 data-id="${annotation.id}">
                <div class="annotation-title">${this.escapeHtml(annotation.title)}</div>
                <div class="annotation-preview">${this.escapeHtml(annotation.content.substring(0, 80))}${annotation.content.length > 80 ? '...' : ''}</div>
                <div class="annotation-date">${new Date(annotation.date).toLocaleDateString('pt-BR')}</div>
            </div>
        `).join('');

        // Adiciona event listeners para os itens
        container.querySelectorAll('.annotation-item').forEach(item => {
            item.addEventListener('click', () => {
                this.viewAnnotation(item.dataset.id);
            });
        });
    }

    createAnnotation(title, content) {
        const annotation = {
            id: Date.now().toString(),
            title: title || 'Nova Anotação',
            content: content || '',
            date: new Date().toISOString()
        };

        this.annotations.unshift(annotation);
        this.saveAnnotations();
        this.renderAnnotations();
        return annotation;
    }

    updateAnnotation(id, title, content) {
        const annotation = this.annotations.find(a => a.id === id);
        if (annotation) {
            annotation.title = title;
            annotation.content = content;
            annotation.date = new Date().toISOString();
            this.saveAnnotations();
            this.renderAnnotations();
        }
    }

    deleteAnnotation(id) {
        this.annotations = this.annotations.filter(a => a.id !== id);
        this.saveAnnotations();
        this.renderAnnotations();
    }

    viewAnnotation(id) {
        const annotation = this.annotations.find(a => a.id === id);
        if (annotation) {
            this.currentAnnotationId = id;
            this.showAnnotationModal(annotation);
        }
    }

    showAnnotationModal(annotation = null) {
        let modal = document.getElementById('annotationModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'annotationModal';
            modal.className = 'modal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${annotation ? 'Editar Anotação' : 'Nova Anotação'}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <input type="text" class="modal-input annotation-title" 
                       placeholder="Título da anotação" 
                       value="${annotation ? this.escapeHtml(annotation.title) : ''}">
                <textarea class="modal-textarea annotation-content" 
                          placeholder="Conteúdo da anotação...">${annotation ? this.escapeHtml(annotation.content) : ''}</textarea>
                <div class="modal-buttons">
                    ${annotation ? `<button class="modal-btn secondary delete-annotation">Excluir</button>` : ''}
                    <button class="modal-btn secondary cancel-annotation">Cancelar</button>
                    <button class="modal-btn primary save-annotation">Salvar</button>
                </div>
            </div>
        `;

        // Event listeners do modal
        modal.querySelector('.close-modal').addEventListener('click', () => this.hideModal());
        modal.querySelector('.cancel-annotation').addEventListener('click', () => this.hideModal());
        modal.querySelector('.save-annotation').addEventListener('click', () => this.saveAnnotationFromModal());
        
        if (annotation) {
            modal.querySelector('.delete-annotation').addEventListener('click', () => {
                if (confirm('Tem certeza que deseja excluir esta anotação?')) {
                    this.deleteAnnotation(annotation.id);
                    this.hideModal();
                }
            });
        }

        modal.style.display = 'flex';
        modal.querySelector('.annotation-title').focus();
    }

    saveAnnotationFromModal() {
        const modal = document.getElementById('annotationModal');
        const title = modal.querySelector('.annotation-title').value.trim();
        const content = modal.querySelector('.annotation-content').value.trim();

        if (!title) {
            alert('Por favor, insira um título para a anotação.');
            return;
        }

        if (this.currentAnnotationId) {
            this.updateAnnotation(this.currentAnnotationId, title, content);
        } else {
            this.createAnnotation(title, content);
        }

        this.hideModal();
    }

    hideModal() {
        const modal = document.getElementById('annotationModal');
        if (modal) {
            modal.style.display = 'none';
            this.currentAnnotationId = null;
        }
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Método para criar anotação rápida do chat
    createFromChat(message, response) {
        const title = `Chat - ${new Date().toLocaleDateString('pt-BR')}`;
        const content = `Pergunta: ${message}\n\nResposta: ${response}`;
        return this.createAnnotation(title, content);
    }

    setupEventListeners() {
        // Botão nova anotação
        const newNoteBtn = document.querySelector('.new-annotation-btn');
        if (newNoteBtn) {
            newNoteBtn.addEventListener('click', () => {
                this.showAnnotationModal();
            });
        }
    }
}