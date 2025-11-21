// Gerenciamento de armazenamento com IndexedDB
const DB_NAME = 'AssistantDB';
const DB_VERSION = 1;
const STORE_NAME = 'messages';

let db = null;

// Inicializar IndexedDB
async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => {
            console.error('Erro ao abrir IndexedDB:', request.error);
            reject(request.error);
        };
        
        request.onsuccess = () => {
            db = request.result;
            console.log('IndexedDB inicializado com sucesso');
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Criar object store se não existir
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const objectStore = db.createObjectStore(STORE_NAME, { 
                    keyPath: 'id', 
                    autoIncrement: true 
                });
                objectStore.createIndex('timestamp', 'timestamp', { unique: false });
                objectStore.createIndex('role', 'role', { unique: false });
                console.log('Object store criado');
            }
        };
    });
}

// Salvar mensagem no banco
async function saveMessage(role, content) {
    if (!db) {
        console.error('Database não inicializado');
        return null;
    }
    
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            
            const message = {
                role: role,
                content: content,
                timestamp: new Date().toISOString()
            };
            
            const request = objectStore.add(message);
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                console.error('Erro ao salvar mensagem:', request.error);
                reject(request.error);
            };
        } catch (error) {
            console.error('Erro na transação:', error);
            reject(error);
        }
    });
}

// Carregar todas as mensagens
async function loadMessages() {
    if (!db) {
        console.error('Database não inicializado');
        return [];
    }
    
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.getAll();
            
            request.onsuccess = () => {
                resolve(request.result || []);
            };
            
            request.onerror = () => {
                console.error('Erro ao carregar mensagens:', request.error);
                reject(request.error);
            };
        } catch (error) {
            console.error('Erro ao carregar:', error);
            reject(error);
        }
    });
}

// Limpar todo o histórico
async function clearHistory() {
    if (!db) {
        console.error('Database não inicializado');
        return false;
    }
    
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.clear();
            
            request.onsuccess = () => {
                console.log('Histórico limpo');
                resolve(true);
            };
            
            request.onerror = () => {
                console.error('Erro ao limpar histórico:', request.error);
                reject(request.error);
            };
        } catch (error) {
            console.error('Erro ao limpar:', error);
            reject(error);
        }
    });
}

// LocalStorage para dados simples
function saveLembrete(texto) {
    const lembretes = JSON.parse(localStorage.getItem('lembretes') || '[]');
    lembretes.push({
        texto: texto,
        criado: new Date().toISOString(),
        ativado: false
    });
    localStorage.setItem('lembretes', JSON.stringify(lembretes));
}

function listarLembretes() {
    return JSON.parse(localStorage.getItem('lembretes') || '[]');
}

function adicionarTarefaStorage(tarefa) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    tarefas.push({
        texto: tarefa,
        criada: new Date().toISOString(),
        concluida: false
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function listarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    if (tarefas.length === 0) {
        return 'Você não tem tarefas cadastradas.';
    }
    
    let lista = '📋 Suas tarefas:\n\n';
    tarefas.forEach((tarefa, index) => {
        const status = tarefa.concluida ? '✅' : '⬜';
        lista += `${index + 1}. ${status} ${tarefa.texto}\n`;
    });
    return lista;
}
