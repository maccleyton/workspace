/**
 * Knowledge Hub - Storage Manager
 * Gerencia o armazenamento local usando IndexedDB
 */

class StorageManager {
    constructor() {
        this.dbName = 'KnowledgeHubDB';
        this.dbVersion = 1;
        this.db = null;
        this.initialized = false;
    }

    /**
     * Inicializa a conexão com IndexedDB
     */
    async init() {
        if (this.initialized) return;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error('Erro ao abrir IndexedDB:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                this.initialized = true;
                console.log('IndexedDB inicializado com sucesso');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                console.log('Atualizando estrutura do banco de dados...');

                // Deletar object store antigo se existir
                if (db.objectStoreNames.contains('documents')) {
                    db.deleteObjectStore('documents');
                }

                // Criar object store para documentos
                const documentsStore = db.createObjectStore('documents', {
                    keyPath: 'id',
                    autoIncrement: true
                });

                // Índices para buscas eficientes
                documentsStore.createIndex('name', 'name', { unique: false });
                documentsStore.createIndex('type', 'type', { unique: false });
                documentsStore.createIndex('createdAt', 'createdAt', { unique: false });
                documentsStore.createIndex('updatedAt', 'updatedAt', { unique: false });
                documentsStore.createIndex('contentPreview', 'contentPreview', { unique: false });

                console.log('Object stores criados com sucesso');
            };
        });
    }

    /**
     * Adiciona um novo documento
     */
    async addDocument(documentData) {
        if (!this.initialized) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['documents'], 'readwrite');
            const store = transaction.objectStore('documents');

            const document = {
                name: documentData.name,
                type: documentData.type, // 'markdown' ou 'pdf'
                content: documentData.content,
                contentPreview: this.generatePreview(documentData.content, documentData.type),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                size: this.calculateSize(documentData.content)
            };

            const request = store.add(document);

            request.onsuccess = () => {
                document.id = request.result;
                console.log('Documento salvo:', document);
                resolve(document);
            };

            request.onerror = () => {
                console.error('Erro ao salvar documento:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Atualiza um documento existente
     */
    async updateDocument(id, updates) {
        if (!this.initialized) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['documents'], 'readwrite');
            const store = transaction.objectStore('documents');
            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const document = getRequest.result;
                if (!document) {
                    reject(new Error('Documento não encontrado'));
                    return;
                }

                // Aplicar atualizações
                Object.assign(document, updates, {
                    updatedAt: new Date().toISOString()
                });

                // Atualizar preview se o conteúdo mudou
                if (updates.content) {
                    document.contentPreview = this.generatePreview(document.content, document.type);
                    document.size = this.calculateSize(document.content);
                }

                const updateRequest = store.put(document);

                updateRequest.onsuccess = () => {
                    console.log('Documento atualizado:', document);
                    resolve(document);
                };

                updateRequest.onerror = () => {
                    console.error('Erro ao atualizar documento:', updateRequest.error);
                    reject(updateRequest.error);
                };
            };

            getRequest.onerror = () => {
                console.error('Erro ao buscar documento:', getRequest.error);
                reject(getRequest.error);
            };
        });
    }

    /**
     * Remove um documento
     */
    async deleteDocument(id) {
        if (!this.initialized) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['documents'], 'readwrite');
            const store = transaction.objectStore('documents');
            const request = store.delete(id);

            request.onsuccess = () => {
                console.log('Documento removido:', id);
                resolve(true);
            };

            request.onerror = () => {
                console.error('Erro ao remover documento:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Busca um documento por ID
     */
    async getDocument(id) {
        if (!this.initialized) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['documents'], 'readonly');
            const store = transaction.objectStore('documents');
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Erro ao buscar documento:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Lista todos os documentos
     */
    async getAllDocuments() {
        if (!this.initialized) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['documents'], 'readonly');
            const store = transaction.objectStore('documents');
            const request = store.getAll();

            request.onsuccess = () => {
                const documents = request.result.sort((a, b) => 
                    new Date(b.updatedAt) - new Date(a.updatedAt)
                );
                resolve(documents);
            };

            request.onerror = () => {
                console.error('Erro ao listar documentos:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Busca documentos por nome ou conteúdo
     */
    async searchDocuments(query) {
        if (!this.initialized) {
            await this.init();
        }

        const allDocuments = await this.getAllDocuments();
        const searchTerm = query.toLowerCase();

        return allDocuments.filter(doc => 
            doc.name.toLowerCase().includes(searchTerm) ||
            doc.contentPreview.toLowerCase().includes(searchTerm)
        );
    }

    /**
     * Exporta todos os documentos
     */
    async exportAllDocuments() {
        const documents = await this.getAllDocuments();
        return {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            count: documents.length,
            documents: documents
        };
    }

    /**
     * Importa documentos de um backup
     */
    async importDocuments(backupData) {
        if (!this.initialized) {
            await this.init();
        }

        const transaction = this.db.transaction(['documents'], 'readwrite');
        const store = transaction.objectStore('documents');

        return new Promise((resolve, reject) => {
            let imported = 0;
            let failed = 0;

            const promises = backupData.documents.map(async (doc) => {
                try {
                    // Remover ID se existir para evitar conflitos
                    const { id, ...docData } = doc;
                    await this.addDocument(docData);
                    imported++;
                } catch (error) {
                    console.error('Erro ao importar documento:', error);
                    failed++;
                }
            });

            Promise.all(promises).then(() => {
                console.log(`Importação concluída: ${imported} sucessos, ${failed} falhas`);
                resolve({ imported, failed });
            }).catch(error => {
                reject(error);
            });
        });
    }

    /**
     * Limpa todos os dados (para debug/reset)
     */
    async clearAll() {
        if (!this.initialized) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['documents'], 'readwrite');
            const store = transaction.objectStore('documents');
            const request = store.clear();

            request.onsuccess = () => {
                console.log('Todos os documentos foram removidos');
                resolve(true);
            };

            request.onerror = () => {
                console.error('Erro ao limpar dados:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Obtém estatísticas do banco
     */
    async getStats() {
        const documents = await this.getAllDocuments();
        const markdownDocs = documents.filter(doc => doc.type === 'markdown');
        const pdfDocs = documents.filter(doc => doc.type === 'pdf');
        
        const totalSize = documents.reduce((sum, doc) => sum + (doc.size || 0), 0);

        return {
            totalDocuments: documents.length,
            markdownDocuments: markdownDocs.length,
            pdfDocuments: pdfDocs.length,
            totalSize: totalSize,
            averageSize: documents.length > 0 ? totalSize / documents.length : 0,
            lastUpdated: documents.length > 0 ? 
                Math.max(...documents.map(doc => new Date(doc.updatedAt))) : null
        };
    }

    /**
     * Gera preview do conteúdo para busca
     */
    generatePreview(content, type) {
        if (type === 'pdf') {
            return `PDF Document: ${content?.name || 'Untitled'}`;
        }

        if (typeof content !== 'string') {
            return '';
        }

        // Remove markdown syntax e gera preview
        const plainText = content
            .replace(/^#{1,6}\s*/gm, '') // Headers
            .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
            .replace(/\*(.*?)\*/g, '$1') // Italic
            .replace(/`(.*?)`/g, '$1') // Inline code
            .replace(/```[\s\S]*?```/g, '') // Code blocks
            .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
            .replace(/!\[.*?\]\(.*?\)/g, '') // Images
            .replace(/>\s*/g, '') // Blockquotes
            .replace(/^\s*[-*+]\s*/gm, '') // Lists
            .replace(/^\s*\d+\.\s*/gm, '') // Numbered lists
            .trim();

        return plainText.substring(0, 200) + (plainText.length > 200 ? '...' : '');
    }

    /**
     * Calcula o tamanho do conteúdo
     */
    calculateSize(content) {
        if (content == null) return 0;
        return new Blob([JSON.stringify(content)]).size;
    }

    /**
     * Verifica se o IndexedDB é suportado
     */
    static isSupported() {
        return 'indexedDB' in window;
    }

    /**
     * Limpa storage se necessário (quota exceeded)
     */
    async cleanup() {
        const stats = await this.getStats();
        
        if (stats.totalDocuments > 100) {
            // Manter apenas os 50 mais recentes
            const allDocuments = await this.getAllDocuments();
            const toKeep = allDocuments.slice(0, 50);
            const toDelete = allDocuments.slice(50);

            console.log(`Limpando ${toDelete.length} documentos antigos...`);
            
            for (const doc of toDelete) {
                await this.deleteDocument(doc.id);
            }
        }
    }

    /**
     * Backup automático periódico
     */
    async autoBackup() {
        try {
            const backup = await this.exportAllDocuments();
            localStorage.setItem('knowledgeHubAutoBackup', JSON.stringify(backup));
            console.log('Backup automático realizado');
        } catch (error) {
            console.error('Erro no backup automático:', error);
        }
    }

    /**
     * Restaura backup automático
     */
    async restoreAutoBackup() {
        try {
            const backupData = localStorage.getItem('knowledgeHubAutoBackup');
            if (backupData) {
                const backup = JSON.parse(backupData);
                console.log('Restaurando backup automático...');
                await this.importDocuments(backup);
            }
        } catch (error) {
            console.error('Erro ao restaurar backup automático:', error);
        }
    }
}

// Instância global
const storageManager = new StorageManager();

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}