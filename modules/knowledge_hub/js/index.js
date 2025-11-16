// ========================================================
// IMPORTAÇÃO DA API OFICIAL
// ========================================================
import { 
    listDocs, 
    createDoc, 
    deleteDoc as deleteDocAPI 
} from "./hub-api.js";


// ========================================================
// ESTADO DO FRONT-END
// ========================================================
let documents = [];
let collapsedDocs = new Set();
let viewMode = "grid";


// ========================================================
// BOOTSTRAP (início da aplicação)
// ========================================================
window.addEventListener("load", () => {
    loadPreferences();
    loadDocuments();
});


// ========================================================
// PREFERÊNCIAS: view mode + nós colapsados
// ========================================================
function loadPreferences() {
    const savedCollapsed = localStorage.getItem("collapsedDocs");
    if (savedCollapsed) {
        collapsedDocs = new Set(JSON.parse(savedCollapsed));
    }

    const savedView = localStorage.getItem("viewMode");
    if (savedView) {
        viewMode = savedView;

        document.querySelectorAll(".toggle-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        document
            .querySelectorAll(".toggle-btn")[viewMode === "grid" ? 0 : 1]
            .classList.add("active");
    }
}


// ========================================================
// CARREGAR DOCUMENTOS DO BACKEND
// ========================================================
async function loadDocuments() {
    const container = document.getElementById("documentsContainer");

    try {
        const rawDocs = await listDocs();
        documents = normalizeDocuments(rawDocs);
        renderDocuments();

    } catch (err) {
        console.error(err);

        container.className = "documents-grid";
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">⚠️</div>
                <div class="empty-title">Erro ao carregar documentos</div>
                <div class="empty-text">Verifique o backend e atualize a página.</div>
            </div>
        `;
    }
}


// ========================================================
// NORMALIZAR DOCUMENTOS (montar árvore)
// ========================================================
function normalizeDocuments(rawDocs) {
    const map = new Map();

    rawDocs.forEach(d => {
        map.set(d.id, {
            id: d.id,
            title: d.title || "Sem Título",
            content: d.content || "",
            timestamp: d.updated_at || d.created_at || new Date().toISOString(),
            parent_id: d.parent_id,
            children: []
        });
    });

    rawDocs.forEach(d => {
        if (d.parent_id && map.has(d.parent_id) && map.has(d.id)) {
            map.get(d.parent_id).children.push(d.id);
        }
    });

    return Array.from(map.values());
}


// ========================================================
// VIEW MODE (GRID / LISTA)
// ========================================================
function changeView(mode) {
    viewMode = mode;
    localStorage.setItem("viewMode", mode);

    document.querySelectorAll(".toggle-btn").forEach(btn =>
        btn.classList.remove("active")
    );

    const btn = event.target.closest(".toggle-btn");
    if (btn) btn.classList.add("active");

    renderDocuments();
}


// ========================================================
// RENDERIZAÇÃO PRINCIPAL
// ========================================================
function renderDocuments() {
    const container = document.getElementById("documentsContainer");

    if (!documents || documents.length === 0) {
        container.className = "documents-grid";
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">📄</div>
                <div class="empty-title">Nenhum documento ainda</div>
                <div class="empty-text">Comece adicionando seu primeiro documento Markdown</div>
            </div>
        `;
        return;
    }

    const childIds = new Set();
    documents.forEach(doc => doc.children.forEach(c => childIds.add(c)));

    const rootDocs = documents.filter(doc => !childIds.has(doc.id));

    if (viewMode === "grid") {
        container.className = "documents-grid";
        container.innerHTML = rootDocs.map(createCardGridHTML).join("");
    } else {
        container.className = "documents-hierarchy";
        container.innerHTML = rootDocs.map(createCardListHTML).join("");
    }
}


// ========================================================
// COMPONENTES DE UI
// ========================================================
function createCardGridHTML(doc) {
    const title = doc.title || extractH1(doc.content);
    const renderedTitle = renderMarkdownInline(title);
    const date = new Date(doc.timestamp).toLocaleDateString("pt-BR");
    const hasChildren = doc.children.length > 0;
    const isCollapsed = collapsedDocs.has(doc.id);

    return `
        <div class="doc-card-grid">
            ${hasChildren ? `
                <div class="toggle-children ${isCollapsed ? "collapsed" : ""}"
                     onclick="toggleChildren('${doc.id}', event)">
                </div>` 
            : ""}

            <div class="doc-content-top" onclick="openDocument('${doc.id}')">
                <div class="doc-icon">📄</div>
                <div class="doc-title">
                    ${renderedTitle}
                    ${hasChildren ? `<span class="children-badge">${doc.children.length}</span>` : ""}
                </div>
            </div>

            <div class="doc-meta">
                <div class="doc-date">${date}</div>
                <div class="doc-actions" onclick="event.stopPropagation()">
                    <div class="action-btn" onclick="viewDocument('${doc.id}')">👁️</div>
                    <div class="action-btn" onclick="editDocument('${doc.id}')">✏️</div>
                    <div class="action-btn" onclick="manageDocument('${doc.id}')">🔗</div>
                    <div class="action-btn" onclick="deleteDocument('${doc.id}')">🗑️</div>
                </div>
            </div>

            ${hasChildren && !isCollapsed ? `
                <div class="children-grid">
                    ${doc.children.map(createChildMiniHTML).join("")}
                </div>`
            : ""}
        </div>
    `;
}

function createChildMiniHTML(childId) {
    const child = documents.find(d => d.id === childId);
    if (!child) return "";

    const title = child.title || extractH1(child.content);
    const renderedTitle = renderMarkdownInline(title);

    return `
        <div class="child-mini-card" onclick="openDocument('${childId}'); event.stopPropagation();">
            <div class="child-mini-left">
                <div class="child-mini-icon">📄</div>
                <div class="child-mini-title">${renderedTitle}</div>
            </div>
            <div class="child-mini-actions" onclick="event.stopPropagation()">
                <div class="child-mini-btn" onclick="viewDocument('${childId}')">👁️</div>
                <div class="child-mini-btn" onclick="editDocument('${childId}')">✏️</div>
                <div class="child-mini-btn" onclick="deleteDocument('${childId}')">🗑️</div>
            </div>
        </div>
    `;
}


// ========================================================
// COLAPSAR NÓS
// ========================================================
function toggleChildren(id, event) {
    event.stopPropagation();

    if (collapsedDocs.has(id)) collapsedDocs.delete(id);
    else collapsedDocs.add(id);

    localStorage.setItem("collapsedDocs", JSON.stringify([...collapsedDocs]));
    renderDocuments();
}


// ========================================================
// MARKDOWN INLINE
// ========================================================
function extractH1(md) {
    const m = md.match(/^#\s+(.+)$/m);
    return m ? m[1] : "Sem Título";
}

function renderMarkdownInline(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code>$1</code>");
}


// ========================================================
// UPLOAD DE ARQUIVO
// ========================================================
function openUploadModal() {
    document.getElementById('uploadModal').classList.add('active');
}

function closeUploadModal() {
    document.getElementById("uploadModal").classList.remove("active");
}

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".md")) {
        alert("Selecione um arquivo .md");
        return;
    }

    const reader = new FileReader();
    reader.onload = async e => {
        const content = e.target.result;
        const title = extractH1(content);

        await createDoc({ title, content });
        await loadDocuments();

        closeUploadModal();
        event.target.value = "";
    };
    reader.readAsText(file);
}


// ========================================================
// AÇÕES / NAVEGAÇÃO
// ========================================================
function openDocument(id) { window.location.href = `view.html?id=${id}`; }
function viewDocument(id) { window.location.href = `view.html?id=${id}`; }
function editDocument(id) { window.location.href = `edit.html?id=${id}`; }
function manageDocument(id) { window.location.href = `manage.html?id=${id}`; }

async function deleteDocument(id) {
    if (!confirm("Excluir este documento?")) return;
    await deleteDocAPI(id);
    await loadDocuments();
}


// ========================================================
// BOTÃO VOLTAR
// ========================================================
document.getElementById("toGoBackBtn").addEventListener("click", () => {
    window.location.href = "../../index.html";
});


// ========================================================
// DRAG & DROP UPLOAD
// ========================================================
const uploadArea = document.querySelector(".upload-area");
if (uploadArea) {
    uploadArea.addEventListener("dragover", e => {
        e.preventDefault();
        uploadArea.style.borderColor = "#10b981";
    });

    uploadArea.addEventListener("dragleave", () => {
        uploadArea.style.borderColor = "#2a2a2a";
    });

    uploadArea.addEventListener("drop", e => {
        e.preventDefault();
        uploadArea.style.borderColor = "#2a2a2a";
        const file = e.dataTransfer.files[0];
        if (file) {
            const input = document.getElementById("fileInput");
            const dt = new DataTransfer();
            dt.items.add(file);
            input.files = dt.files;
            handleFileUpload({ target: input });
        }
    });
}

// Expor funções usadas pelo HTML para o escopo global
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.changeView = changeView;
window.toggleChildren = toggleChildren;
window.openDocument = openDocument;
window.viewDocument = viewDocument;
window.editDocument = editDocument;
window.manageDocument = manageDocument;
window.deleteDocument = deleteDocument;
window.handleFileUpload = handleFileUpload;