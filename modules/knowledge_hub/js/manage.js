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
let uploadedFile = null; // upload por arquivo

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
        list.innerHTML = `<p class="empty-text">Nenhum documento filho vinculado.</p>`;
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

        item.querySelector(".remove-child-btn").onclick = () =>
            handleUnlink(child.id);

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

        card.onclick = () => selectExistingDoc(doc.id);

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
}

// ======================================================
// ================== ABRIR / FECHAR MODAL ===============
// ======================================================
function openAddChildModal() {
    selectedChildId = null;
    uploadedFile = null;

    document.getElementById("existingDocsGrid")
        .querySelectorAll(".selected")
        .forEach(el => el.classList.remove("selected"));

    document.getElementById("fileInput").value = "";

    document.getElementById("existingDocsTab").style.display = "block";
    document.getElementById("uploadTab").style.display = "none";

    document.getElementById("tabExisting").classList.add("active");
    document.getElementById("tabUpload").classList.remove("active");

    document.getElementById("addChildModal").style.display = "flex";
}

function closeAddChildModal() {
    document.getElementById("addChildModal").style.display = "none";
}

// ======================================================
// ============== TROCAR ENTRE TABS =====================
// ======================================================
function switchTab(tab) {
    if (tab === "existing") {
        document.getElementById("existingDocsTab").style.display = "block";
        document.getElementById("uploadTab").style.display = "none";

        document.getElementById("tabExisting").classList.add("active");
        document.getElementById("tabUpload").classList.remove("active");
    } else {
        document.getElementById("existingDocsTab").style.display = "none";
        document.getElementById("uploadTab").style.display = "block";

        document.getElementById("tabExisting").classList.remove("active");
        document.getElementById("tabUpload").classList.add("active");
    }
}

// ======================================================
// ================ UPLOAD DE NOVO DOC ===================
// ======================================================
function handleFileUpload(event) {
    uploadedFile = event.target.files[0] || null;
}

// ======================================================
// ================= CONFIRMAR AÇÃO ======================
// ======================================================
async function confirmAddChild() {
    // Opção 1 → documento existente selecionado
    if (selectedChildId) {
        try {
            await linkDoc(selectedChildId, parentId);
            await loadAllDocs();
            renderChildren();
            renderExistingDocs();
            closeAddChildModal();
            return;
        } catch (err) {
            console.error(err);
            alert("Erro ao vincular documento.");
        }
    }

    // Opção 2 → upload de novo documento
    if (uploadedFile) {
        try {
            const content = await uploadedFile.text();
            const title = extractH1(content) || uploadedFile.name;

            const newDoc = await createDoc({ title, content });
            await linkDoc(newDoc.id, parentId);

            await loadAllDocs();
            renderChildren();
            renderExistingDocs();
            closeAddChildModal();
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

// ======================================================
// =========== EXPOSE FUNCTIONS FOR HTML =================
// ======================================================
window.openAddChildModal = openAddChildModal;
window.closeAddChildModal = closeAddChildModal;
window.switchTab = switchTab;
window.handleFileUpload = handleFileUpload;
window.confirmAddChild = confirmAddChild;
