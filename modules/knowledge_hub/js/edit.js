// ======================================================
// =============== IMPORTAÇÃO DA API =====================
// ======================================================
import { getDoc, updateDoc } from "./hub-api.js";

// ======================================================
// ==================== ESTADO ==========================
// ======================================================
let docId = null;
let currentDoc = null;
let originalParentId = null;
let autoSaveTimer = null;

// ======================================================
// =============== BOOTSTRAP DA PÁGINA ===================
// ======================================================
window.addEventListener("DOMContentLoaded", initEditor);

async function initEditor() {
    docId = getDocumentIdFromURL();
    if (!docId) {
        alert("Nenhum ID encontrado na URL.");
        return;
    }

    await loadDocumentFromBackend(docId);
    setupEditorEvents();
    setupNavigation();
    startAutoSave();
    renderPreview();
}

// ======================================================
// ===================== BUSCA ID ========================
// ======================================================
function getDocumentIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// ======================================================
// ============== CARREGAR DOCUMENTO =====================
// ======================================================
async function loadDocumentFromBackend(id) {
    try {
        const doc = await getDoc(id);
        currentDoc = doc;
        originalParentId = doc.parent_id; // ✨ preservação garantida

        document.getElementById("titleInput").value = doc.title || "";
        document.getElementById("markdownInput").value = doc.content || "";

        renderPreview();
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar documento do servidor.");
    }
}

// ======================================================
// ================ CONFIGURAÇÃO DE EVENTOS ==============
// ======================================================
function setupEditorEvents() {
    const titleInput = document.getElementById("titleInput");
    const markdownInput = document.getElementById("markdownInput");

    titleInput.addEventListener("input", renderPreview);
    markdownInput.addEventListener("input", renderPreview);

    document.getElementById("saveBtn").addEventListener("click", saveDocument);
}

// ======================================================
// ====================== SALVAR =========================
// ======================================================
async function saveDocument() {
    if (!currentDoc) return;

    const updated = {
        title: document.getElementById("titleInput").value.trim(),
        content: document.getElementById("markdownInput").value,
        parentId: originalParentId // ✨ preserva o vínculo!
    };

    try {
        await updateDoc(docId, updated);
        showStatus("Documento salvo ✔");
    } catch (err) {
        console.error(err);
        showStatus("Erro ao salvar ❌");
        alert("Falha ao salvar no servidor.");
    }
}

// ======================================================
// ===================== AUTOSAVE =========================
// ======================================================
function startAutoSave() {
    clearInterval(autoSaveTimer);
    autoSaveTimer = setInterval(saveDocument, 30000); // 30s
}

// ======================================================
// ===================== STATUS ===========================
// ======================================================
function showStatus(msg) {
    const el = document.getElementById("saveStatus");
    if (!el) return;

    el.textContent = msg;
    el.style.opacity = 1;

    setTimeout(() => {
        el.style.opacity = 0;
    }, 2500);
}

// ======================================================
// ===================== PREVIEW ==========================
// ======================================================
function renderPreview() {
    const content = document.getElementById("markdownInput").value;
    const target = document.getElementById("previewArea");

    if (window.marked) {
        target.innerHTML = marked.parse(content);
    } else {
        target.textContent = content;
    }

    if (window.MathJax) {
        MathJax.typesetPromise();
    }

    generateTOC();
}

// ======================================================
// ======================= TOC ============================
// ======================================================
function generateTOC() {
    const preview = document.getElementById("previewArea");
    const toc = document.getElementById("tocArea");

    if (!preview || !toc) return;

    const headers = preview.querySelectorAll("h1, h2, h3, h4, h5, h6");

    toc.innerHTML = "";
    headers.forEach(h => {
        const lvl = Number(h.tagName.substring(1));
        const li = document.createElement("div");
        li.className = `toc-item level-${lvl}`;

        li.textContent = h.textContent;
        li.onclick = () => h.scrollIntoView({ behavior: "smooth" });

        toc.appendChild(li);
    });
}

// ======================================================
// =================== NAVEGAÇÃO ==========================
// ======================================================
function setupNavigation() {
    document.getElementById("backBtn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
