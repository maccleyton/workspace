// ======================================================
// =============== IMPORTAÇÃO DA API =====================
// ======================================================
import { getDoc, listDocs, linkDoc, unlinkDoc, createDoc } from "./hub-api.js";

// ======================================================
// ==================== ESTADO ===========================
// ======================================================
let parentId = null;
let parentDoc = null;
let allDocs = [];
let selectedChildId = null;
let uploadedFile = null;

// ======================================================
// ==================== INIT =============================
// ======================================================
window.addEventListener("DOMContentLoaded", () => {
    initManage();
    bindUIEvents();
});

async function initManage() {
    parentId = getIdFromURL();
    if (!parentId) return alert("Nenhum ID encontrado.");

    await loadParent();
    await loadAllDocs();

    renderParent();
    renderChildren();
    renderDocGrid();
}

// ======================================================
// ===================== URL ID ==========================
// ======================================================
function getIdFromURL() {
    const p = new URLSearchParams(location.search);
    return p.get("id");
}

// ======================================================
// ================== LOAD DATA ==========================
// ======================================================
async function loadParent() {
    parentDoc = await getDoc(parentId).catch(err => console.error(err));
}

async function loadAllDocs() {
    allDocs = await listDocs().catch(err => console.error(err));
}

// ======================================================
// =================== RENDER PARENT =====================
// ======================================================
function renderParent() {
    document.getElementById("docTitle").textContent = parentDoc.title;
    document.getElementById("docMeta").textContent =
        "Atualizado: " + new Date(parentDoc.updated_at).toLocaleString("pt-BR");
}

// ======================================================
// =================== CHILDREN ==========================
// ======================================================
function renderChildren() {
    const list = document.getElementById("childrenList");
    list.innerHTML = "";

    const children = allDocs.filter(d => d.parent_id === parentId);

    if (children.length === 0) {
        return list.innerHTML = `
            <p class="empty-text">Nenhum documento filho vinculado.</p>
        `;
    }

    children.forEach(child => {
        const el = document.createElement("div");
        el.className = "child-item";

        el.innerHTML = `
            <div>
                <strong>${child.title}</strong><br>
                <small>${new Date(child.updated_at).toLocaleString("pt-BR")}</small>
            </div>
            <button class="remove-child-btn">Remover</button>
        `;

        el.querySelector("button").addEventListener("click", () => removeLink(child.id));

        list.appendChild(el);
    });
}

async function removeLink(id) {
    if (!confirm("Remover este vínculo?")) return;

    await unlinkDoc(id).catch(err => alert("Erro ao remover vínculo."));
    await loadAllDocs();
    renderChildren();
    renderDocGrid();
}

// ======================================================
// ================== DOC GRID ===========================
// ======================================================
function renderDocGrid() {
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

        card.addEventListener("click", () => selectDoc(doc.id));

        grid.appendChild(card);
    });
}

function selectDoc(id) {
    selectedChildId = id;

    document.querySelectorAll(".existing-doc-card")
        .forEach(el => el.classList.remove("selected"));

    const card = document.querySelector(`.existing-doc-card[data-id="${id}"]`);
    if (card) card.classList.add("selected");
}

// ======================================================
// =================== MODAL FUNÇÕES =====================
// ======================================================
function openAddModal() {
    selectedChildId = null;
    uploadedFile = null;

    document.getElementById("fileInput").value = "";
    document.querySelectorAll(".existing-doc-card")
        .forEach(el => el.classList.remove("selected"));

    switchTab("existing");

    document.getElementById("addChildModal").style.display = "flex";
}

function closeAddModal() {
    document.getElementById("addChildModal").style.display = "none";
}

// ======================================================
// ===================== TABS ============================
// ======================================================
function switchTab(tab) {
    document.getElementById("tabExisting").classList.toggle("active", tab === "existing");
    document.getElementById("tabUpload").classList.toggle("active", tab === "upload");
}

// ======================================================
// =================== UPLOAD ============================
// ======================================================
function handleFile(ev) {
    uploadedFile = ev.target.files[0] || null;
}

// ======================================================
// ================== CONFIRM ADD ========================
// ======================================================
async function confirmAdd() {
    // A) Documento existente
    if (selectedChildId) {
        await linkDoc(selectedChildId, parentId).catch(_ => alert("Erro."));
        await loadAllDocs();
        renderChildren();
        renderDocGrid();
        closeAddModal();
        return;
    }

    // B) Upload
    if (uploadedFile) {
        const content = await uploadedFile.text();
        const title = extractH1(content) || uploadedFile.name;

        const newDoc = await createDoc({ title, content });
        await linkDoc(newDoc.id, parentId);

        await loadAllDocs();
        renderChildren();
        renderDocGrid();
        closeAddModal();
        return;
    }

    alert("Escolha um documento ou envie um arquivo.");
}

function extractH1(md) {
    const m = md.match(/^#\s+(.+)/m);
    return m ? m[1].trim() : null;
}

// ======================================================
// ================== EVENT BINDING ======================
// ======================================================
function bindUIEvents() {
    document.querySelector(".section-header .btn")
        .addEventListener("click", openAddModal);

    document.querySelector(".close-btn")
        .addEventListener("click", closeAddModal);

    document.getElementById("tabExisting").previousElementSibling
        .addEventListener("click", () => switchTab("existing"));

    document.getElementById("tabUpload").previousElementSibling
        .addEventListener("click", () => switchTab("upload"));

    document.getElementById("fileInput")
        .addEventListener("change", handleFile);

    document.getElementById("confirmBtn")
        .addEventListener("click", confirmAdd);
}
