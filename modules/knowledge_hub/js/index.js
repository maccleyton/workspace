// index.js
import { getDocs, createDoc, getLinks, deleteDoc } from './hub-api.js'; // 1. Importe as novas funções

const documentsContainer = document.getElementById('documentsContainer');
const fileInput = document.getElementById('fileInput');
const uploadModal = document.getElementById('uploadModal');

// Estado para controlar quais documentos estão expandidos
const expandedDocs = new Set();

// === LISTAR DOCUMENTOS ===
async function loadDocuments() {
    try {
        const docs = await getDocs();

        if (docs.length === 0) {
            documentsContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-icon">📄</div>
                    <div class="empty-title">Nenhum documento ainda</div>
                    <div class="empty-text">Comece adicionando seu primeiro documento Markdown</div>
                </div>`;
            return;
        }

        // Limpa o container e o estado de expandidos
        documentsContainer.innerHTML = '';
        expandedDocs.clear();

        // Renderiza cada documento usando a nova função modular
        docs.forEach(doc => {
            const cardElement = createDocumentCard(doc);
            documentsContainer.appendChild(cardElement);
        });

    } catch (err) {
        console.error(err);
        documentsContainer.innerHTML = `<div style="color:red;">Erro ao carregar documentos</div>`;
    }
}

// 2. FUNÇÃO MODULAR PARA CRIAR O CARD DE UM DOCUMENTO (CORRIGIDA COM TODOS OS BOTÕES)
function createDocumentCard(doc) {
    const card = document.createElement('div');
    card.className = 'doc-card-grid'; // Usa a classe do CSS para o estilo correto
    card.dataset.docId = doc.id;

    // Extrai o H1 para o título
    const lines = doc.content ? doc.content.split('\n') : [];
    const h1Line = lines.find(l => l.trim().startsWith('#')) || '';
    const cleanH1 = h1Line.replace(/^#+\s*/, '').trim();
    const title = cleanH1 || doc.title;

    // Renderiza o título com marked.parse para suportar formatação
    const renderedTitle = marked.parse(title);

    card.innerHTML = `
        <div class="doc-content-top">
            <div class="doc-icon">📄</div>
            <h3 class="doc-title">${renderedTitle}</h3>
        </div>
        <div class="doc-meta">
            <span class="doc-date">${new Date(doc.updated_at).toLocaleString('pt-BR')}</span>
            <div class="doc-actions">
                <!-- BOTÕES DE AÇÃO PRINCIPAL -->
                <a href="view.html?id=${doc.id}" class="action-btn" title="Abrir">👁️</a>
                <a href="manage.html?id=${doc.id}" class="action-btn" title="Vincular">⚙️</a>
                
                <!-- BOTÕES DE AÇÃO SECUNDÁRIA -->
                <button class="action-btn delete-btn" title="Deletar Documento">🗑️</button>
                <button class="toggle-children ${expandedDocs.has(doc.id) ? '' : 'collapsed'}" title="Expandir/Recolher Filhos"></button>
            </div>
        </div>
        <div class="children-grid" id="children-${doc.id}" style="${expandedDocs.has(doc.id) ? '' : 'display: none;'}">
            <!-- Os filhos serão carregados aqui dinamicamente -->
        </div>
    `;

    // 3. ADICIONA OS EVENT LISTENERS (apenas para os botões que precisam de JS)
    const deleteBtn = card.querySelector('.delete-btn');
    const toggleBtn = card.querySelector('.toggle-children');
    const childrenContainer = card.querySelector('.children-grid');

    deleteBtn.addEventListener('click', () => handleDelete(doc.id, title));
    toggleBtn.addEventListener('click', () => handleToggleChildren(doc.id, childrenContainer, toggleBtn));

    return card;
}

// 4. FUNÇÃO PARA LIDAR COM A EXPANSÃO/RECOLHIMENTO DOS FILHOS
async function handleToggleChildren(docId, container, button) {
    const isExpanded = !button.classList.contains('collapsed');

    if (isExpanded) {
        // Recolher
        container.style.display = 'none';
        button.classList.add('collapsed');
        expandedDocs.delete(docId);
    } else {
        // Expandir
        button.classList.remove('collapsed');
        expandedDocs.add(docId);
        container.style.display = 'flex';

        // Mostra indicador de carregamento
        container.innerHTML = '<p style="color: #6b7280; font-size: 12px;">Carregando...</p>';

        try {
            // Busca os links e depois os documentos filhos
            const links = await getLinks(docId);
            const allDocs = await getDocs(); // Poderia otimizar para não buscar de novo, mas por enquanto é ok
            
            const children = links.map(link => allDocs.find(d => d.id === link.child_id)).filter(Boolean);

            if (children.length === 0) {
                container.innerHTML = '<p style="color: #6b7280; font-size: 12px;">Nenhum documento filho.</p>';
                return;
            }

            // Renderiza os filhos
            container.innerHTML = children.map(child => `
                <div class="child-mini-card">
                    <div class="child-mini-left">
                        <div class="child-mini-icon">📄</div>
                        <div class="child-mini-title">${child.title}</div>
                    </div>
                    <div class="child-mini-actions">
                        <a href="view.html?id=${child.id}" class="child-mini-btn" title="Abrir">👁️</a>
                        <a href="manage.html?id=${child.id}" class="child-mini-btn" title="Gerenciar">⚙️</a>
                    </div>
                </div>
            `).join('');

        } catch (err) {
            console.error("Erro ao carregar filhos:", err);
            container.innerHTML = '<p style="color: #dc2626; font-size: 12px;">Erro ao carregar filhos.</p>';
        }
    }
}

// 5. FUNÇÃO PARA LIDAR COM A EXCLUSÃO
async function handleDelete(docId, title) {
    if (!confirm(`Tem certeza que deseja deletar o documento "${title}"?`)) {
        return;
    }

    try {
        await deleteDoc(docId);
        // Recarrega a lista de documentos para atualizar a UI
        await loadDocuments();
    } catch (err) {
        console.error(err);
        alert("Erro ao deletar documento.");
    }
}

// === UPLOAD DE DOCUMENTO (sem mudanças significativas, apenas ajustado para usar createDoc com objeto) ===
fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        alert("Arquivo muito grande! Máximo 5MB.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        const content = e.target.result;
        const title = extractH1(content) || file.name.replace('.md', '');

        try {
            // CORREÇÃO: Passar um objeto como createDoc espera
            await createDoc({ title, content });
            closeUploadModal();
            loadDocuments();
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar documento");
        }
    };
    reader.readAsText(file);
});

// === MODAL DE UPLOAD (ajustado para usar classes) ===
function openUploadModal() {
    uploadModal.classList.add('active');
}

function closeUploadModal() {
    uploadModal.classList.remove('active');
}

// Função auxiliar para extrair H1
function extractH1(md) {
    const match = md.match(/^#\s+(.+)/m);
    return match ? match[1].trim() : null;
}

function goToAssistant() {
    window.location.href = "../Knowledge_assistant/index.html";
}

// Expor funções globais para o HTML (opcional, mas bom para manter compatibilidade se houver algum onclick esquecido)
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.goToAssistant = goToAssistant;
// Carregar documentos ao iniciar
loadDocuments();