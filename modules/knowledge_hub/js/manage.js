// ======================================================
// =============== IMPORTAÇÃO DA API =====================
// ======================================================
import { 
    listDocs, 
    getDoc, 
    updateDoc, 
    createDoc 
} from "./hub-api.js";

// ======================================================
// ===================== ESTADO ==========================
// ======================================================
let currentId = null;
let currentDoc = null;
let allDocs = [];
let children = [];
let parentIdOriginal = null;

// ======================================================
// ===================== BOOTSTRAP ========================
// ======================================================
window.addEventListener("DOMContentLoaded", async () => {
    currentId = getIdFromURL();
    if (!currentId) {
        showError("Nenhum documento informado.");
        return;
    }

    await loadCurrentDocument();
    await loadAllDocs();
    renderChildren();
    renderPossibleParents();
    setupNavigation();
});

// ======================================================
// ===================== UTIL =============================
// ======================================================
function getIdFromURL() {
    const p = new URLSearchParams(window.location.search);
    return p.get("id");
}

function showError(msg) {
    const el = document.getElementById("docTitle");
    if (el) el.innerHTML = `<div class="error">${msg}</div>`;
}

// ======================================================
// =============== CARREGAR DOCUMENTO =====================
// ======================================================
async function loadCurrentDocument() {
    try {
        currentDoc = await getDoc(currentId);
        parentIdOriginal = currentDoc.parent_id;

        document.getElementById("docTitle").textContent = currentDoc.title;
        document.title = `${currentDoc.title} – Vincular Documentos`;

        // Carregar filhos reais
        children = allDocs.filter(d => d.parent_id === currentId);

    } catch (err) {
        console.error(err);
        showError("Erro ao buscar documento.");
    }
}

// ======================================================
// ================== CARREGAR TODOS ======================
// ======================================================
async function loadAllDocs() {
    try {
        allDocs = await listDocs();
        children = allDocs.filter(d => d.parent_id === currentId);
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar lista de documentos.");
    }
}

// ======================================================
// ================= RENDERIZAR FILHOS ====================
// ======================================================
function renderChildren() {
    const area = document.getElementById("childrenList");
    area.innerHTML = "";

    if (!children.length) {
        area.innerHTML = `<div class="empty">Nenhum documento vinculado ainda.</div>`;
        return;
    }

    children.forEach(c => {
        const div = document.createElement("div");
        div.className = "child-item";

        div.innerHTML = `
            <div class="child-info">
                <div class="child-title">📄 ${c.title}</div>
            </div>
            <button class="unlink-btn" data-id="${c.id}">Remover vínculo</button>
        `;

        area.appendChild(div);
    });

    document.querySelectorAll(".unlink-btn").forEach(btn => {
        btn.addEventListener("click", async e => {
            const childId = e.target.dataset.id;
            await unlinkChild(childId);
        });
    });
}

// ======================================================
// ================ REMOVER VÍNCULO =======================
// ======================================================
async function unlinkChild(childId) {
    try {
        const child = allDocs.find(d => d.id === childId);
        if (!child) return;

        await updateDoc(childId, {
            title: child.title,
            content: child.content,
            parentId: null
        });

        await loadAllDocs();
        children = allDocs.filter(d => d.parent_id === currentId);
        renderChildren();
        renderPossibleParents();

    } catch (err) {
        console.error(err);
        alert("Erro ao remover vínculo.");
    }
}

// ======================================================
// ============== RENDERIZAR LISTA PARA VINCULAR =========
// ======================================================
function renderPossibleParents() {
    const list = document.getElementById("docsList");
    list.innerHTML = "";

    const possible = allDocs.filter(
        d => d.id !== currentId && d.parent_id !== currentId
    );

    possible.forEach(doc => {
        const div = document.createElement("div");
        div.className = "doc-item";

        div.innerHTML = `
            <div class="doc-line">📄 ${doc.title}</div>
            <button class="link-btn" data-id="${doc.id}">Vincular</button>
        `;

        list.appendChild(div);
    });

    document.querySelectorAll(".link-btn").forEach(btn => {
        btn.addEventListener("click", async e => {
            const childId = e.target.dataset.id;
            await linkChild(childId);
        });
    });
}

// ======================================================
// ===================== VINCULAR =========================
// ======================================================
async function linkChild(childId) {
    try {
        const child = allDocs.find(d => d.id === childId);
        if (!child) return;

        await updateDoc(childId, {
            title: child.title,
            content: child.content,
            parentId: currentId
        });

        await loadAllDocs();
        children = allDocs.filter(d => d.parent_id === currentId);
        renderChildren();
        renderPossibleParents();

    } catch (err) {
        console.error(err);
        alert("Erro ao vincular documento.");
    }
}

// ======================================================
// =============== CRIAR DOCUMENTO FILHO =================
// ======================================================
document.getElementById("uploadInput")?.addEventListener("change", async e => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".md")) {
        alert("Selecione um arquivo .md");
        return;
    }

    const reader = new FileReader();
    reader.onload = async ev => {
        const content = ev.target.result;
        const title = extractH1(content);

        try {
            await createDoc({
                title,
                content,
                parentId: currentId
            });

            await loadAllDocs();
            children = allDocs.filter(d => d.parent_id === currentId);
            renderChildren();
            renderPossibleParents();

        } catch (err) {
            console.error(err);
            alert("Erro ao criar documento.");
        }
    };

    reader.readAsText(file);
});

// ======================================================
// ====================== UTIL ============================
// ======================================================
function extractH1(md) {
    const m = md.match(/^#\s+(.+)$/m);
    return m ? m[1] : "Novo Documento";
}

// ======================================================
// ================= NAVEGAÇÃO (BACK) =====================
// ======================================================
function setupNavigation() {
    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
}
