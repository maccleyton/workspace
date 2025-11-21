// ======================================================
// =============== IMPORTAÇÃO DA API =====================
// ======================================================
import { getDoc, listDocs, linkDoc, unlinkDoc, createDoc } from "./hub-api.js";

// ======================================================
// ==================== ESTADO ==========================
// ======================================================
let parentId = null;
let parentDoc = null;
let allDocs = [];
let selectedChildId = null; // documento escolhido para vínculo
let uploadedFile = null;    // upload de arquivo

// ======================================================
// ===================== INICIALIZAÇÃO ===================
// ======================================================
window.addEventListener("DOMContentLoaded", initManage);

async function initManage() {
    parentId = getDocumentIdFromURL();
    if (!parentId) {
        alert("Nenhum ID encontrado na URL.");
        return;
    }

    bindUIEvents();

    await loadParentDocument();
    await loadAllDocs();
    renderParentData();
    renderChildren();
    renderExistingDocs();
}

// ======================================================
// ===================== BUSCAR ID =======================
// ======================================================
function getDocumentIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// ======================================================
// ===================== UI EVENTS =======================
// ======================================================
function bindUIEvents() {
    document.getElementById("btnOpenModal").addEventListener("click", openAddModal);
    document.getElementById("btnCloseModal").addEventListener("click", closeAddModal);
    document.getElementById("btnCancel").addEventListener("click", closeAddModal);
    document.getElementById("btnConfirm").addEventListener("click", confirmAddChild);

    // Tabs
    document.getElementById("tabExistingBtn").addEventListener("click", () => switchTab("existing"));
    document.getElementById("tabUploadBtn").addEventListener("click", () => switchTab("upload"));

    // Upload
    document.getElementById("uploadArea").addEventListener("click", () => {
        document.getElementById("fileInput").click();
    });

    document.getElementById("fileInput").addEventListener("change", handleFileUpload);
}

// ======================================================
// =============== CARREGAR DOCUMENTO PAI ================
// ======================================================
async function loadParentDocument() {
    try {
        parentDoc = await getDoc(parentId);
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar o documento.");
    }
}

// ======================================================
// =============== CARREGAR TODOS DOCUMENTOS =============
// ======================================================
async function loadAllDocs() {
    try {
        allDocs = await listDocs();
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar documentos.");
    }
}

// ======================================================
// =============== RENDERIZAR DADOS DO PAI ===============
// ======================================================
function renderParentData() {
    document.getElementById("docTitle").textContent = parentDoc.title;
    document.getElementById("docMeta").textContent =
        "Atualizado: " + new Date(parentDoc.updated_at).toLocaleString("pt-BR");
}

// ======================================================
// ============ RENDERIZAR FILHOS DO DOCUMENTO ===========
// ======================================================
function renderChildren() {
    const list = document.getElementById("childrenList");
    list.innerHTML = "";

    const children = allDocs.filter(d => d.parent_id === parentId);

    if (children.length === 0) {
        list.innerHTML = `
            <p class="empty-text">Nenhum documento filho vinculado.</p>
        `;
        return;
    }

    children.forEach(child => {
        const item = document.createElement("div");
        item.className = "child-item";

        item.innerHTML = `
            <div>
                <strong>${child.title}</strong><br>
                <small>${new Date(child.updated_at).toLocaleString("pt-BR")}</small>
            </div>
            <button class="remove-child-btn">Remover</button>
        `;

        item.querySelector(".remove-child-btn").addEventListener("click", () => handleUnlink(child.id));

        list.appendChild(item);
    });
}

// ======================================================
// ============== REMOVER VÍNCULO PAI → FILHO ============
// ======================================================
async function handleUnlink(id) {
    if (!confirm("Remover este vínculo?")) return;

    try {
        await unlinkDoc(id);
        await loadAllDocs();
        renderChildren();
        renderExistingDocs();
    } catch (err) {
        console.error(err);
        alert("Erro ao remover vínculo.");
    }
}

// ======================================================
// ============== RENDERIZAR LISTA DE DOCUMENTOS =========
// ======================================================
function renderExistingDocs() {
    const grid = document.getElementById("existingDocsGrid");
    grid.innerHTML = "";

    const docs = allDocs.filter(d => d.id !== parentId);

    docs.forEach(doc => {
        const card = document.createElement("div");
        card.className = "existing-doc-card";
        card.dataset.id = doc.id;

        card.innerHTML = `
            <div class="doc-title">${doc.title}</div>
            <div class="doc-meta">${new Date(doc.updated_at).toLocaleString("pt-BR")}</div>
        `;

        card.addEventListener("click", () => selectExistingDoc(doc.id));

        grid.appendChild(card);
    });
}

// ======================================================
// ============= SELECIONAR DOC EXISTENTE ===============
// ======================================================
function selectExistingDoc(id) {
    selectedChildId = id;

    document.querySelectorAll(".existing-doc-card")
        .forEach(card => card.classList.remove("selected"));

    const card = document.querySelector(`.existing-doc-card[data-id="${id}"]`);
    if (card) card.classList.add("selected");

    // ativa botão de confirmar
    document.getElementById("btnConfirm").style.display = "inline-flex";
}

// ======================================================
// ======================= MODAL =========================
// ======================================================
function openAddModal() {
    selectedChildId = null;
    uploadedFile = null;

    document.getElementById("fileInput").value = "";
    document.getElementById("btnConfirm").style.display = "none";

    switchTab("existing");

    document.getElementById("addChildModal").style.display = "flex";
}

function closeAddModal() {
    document.getElementById("addChildModal").style.display = "none";
}

// ======================================================
// ============== TROCAR ENTRE TABS =====================
// ======================================================
function switchTab(tab) {
    if (tab === "existing") {
        document.getElementById("tabExisting").classList.add("active");
        document.getElementById("tabUpload").classList.remove("active");

        document.getElementById("tabExistingBtn").classList.add("active");
        document.getElementById("tabUploadBtn").classList.remove("active");
    } else {
        document.getElementById("tabExisting").classList.remove("active");
        document.getElementById("tabUpload").classList.add("active");

        document.getElementById("tabExistingBtn").classList.remove("active");
        document.getElementById("tabUploadBtn").classList.add("active");
    }
}

// ======================================================
// ================ UPLOAD DE NOVO DOC ===================
// ======================================================
function handleFileUpload(event) {
    uploadedFile = event.target.files[0] || null;

    if (uploadedFile) {
        document.getElementById("btnConfirm").style.display = "inline-flex";
    }
}

// ======================================================
// ================= CONFIRMAR AÇÃO ======================
// ======================================================
async function confirmAddChild() {
    // Caso 1 → documento existente
    if (selectedChildId) {
        try {
            await linkDoc(selectedChildId, parentId);
            await loadAllDocs();
            renderChildren();
            renderExistingDocs();
            closeAddModal();
            return;
        } catch (err) {
            console.error(err);
            alert("Erro ao vincular documento.");
        }
    }

    // Caso 2 → upload
    if (uploadedFile) {
        try {
            const content = await uploadedFile.text();
            const title = extractH1(content) || uploadedFile.name;

            const newDoc = await createDoc({ title, content });
            await linkDoc(newDoc.id, parentId);

            await loadAllDocs();
            renderChildren();
            renderExistingDocs();
            closeAddModal();
            return;
        } catch (err) {
            console.error(err);
            alert("Erro ao criar documento.");
        }
    }

    alert("Selecione um documento ou envie um arquivo.");
}

// ======================================================
// ======== UTIL: extrair título do markdown ============
// ======================================================
function extractH1(md) {
    const match = md.match(/^#\s+(.+)/m);
    return match ? match[1].trim() : null;
}
