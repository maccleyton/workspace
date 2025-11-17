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
    bindUIEvents(); // ⬅ conecta todos os botões
});

// ======================================================
// ===================== URL ============================
// ======================================================
function getIdFromURL() {
    return new URLSearchParams(location.search).get("id");
}

// ======================================================
// ================= LOAD DATA ===========================
// ======================================================
async function initManage() {
    parentId = getIdFromURL();
    if (!parentId) return alert("Nenhum ID encontrado.");

    parentDoc = await getDoc(parentId).catch(err => console.error(err));
    allDocs = await listDocs().catch(err => console.error(err));

    renderParent();
    renderChildren();
    renderDocGrid();
}

function renderParent() {
    document.getElementById("docTitle").textContent = parentDoc.title;
    document.getElementById("docMeta").textContent =
        "Atualizado: " + new Date(parentDoc.updated_at).toLocaleString("pt-BR");
}

// ======================================================
// ================ RENDER CHILDREN ======================
// ======================================================
function renderChildren() {
    const list = document.getElementById("childrenList");
    list.innerHTML = "";

    const children = allDocs.filter(doc => doc.parent_id === parentId);

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

        el.querySelector(".remove-child-btn")
            .addEventListener("click", () => removeLink(child.id));

        list.appendChild(el);
    });
}

async function removeLink(childId) {
    if (!confirm("Remover este vínculo?")) return;

    await unlinkDoc(childId).catch(err => alert("Erro ao remover vínculo."));
    allDocs = await listDocs();
    renderChildren();
    renderDocGrid();
}

// ======================================================
// ================= DOC GRID ============================
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
        .forEach(c => c.classList.remove("selected"));

    const selected = document.querySelector(`[data-id="${id}"]`);
    selected.classList.add("selected");
}

// ======================================================
// ==================== MODAL ============================
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
// ==================== TABS ============================
// ======================================================
function switchTab(tab) {
    document.getElementById("tabExisting").classList.toggle("active", tab === "existing");
    document.getElementById("tabUpload").classList.toggle("active", tab === "upload");
}

// ======================================================
// ================= UPLOAD FILE =========================
// ======================================================
function handleFile(e) {
    uploadedFile = e.target.files[0] || null;
}

// ======================================================
// ================= CONFIRM ADD =========================
// ======================================================
async function confirmAdd() {
    // 1 — Vínculo com documento EXISTENTE
    if (selectedChildId) {
        await linkDoc(selectedChildId, parentId);
        allDocs = await listDocs();
        renderChildren();
        renderDocGrid();
        closeAddModal();
        return;
    }

    // 2 — Upload de novo documento
    if (uploadedFile) {
        const content = await uploadedFile.text();
        const title = extractH1(content) || uploadedFile.name;

        const newDoc = await createDoc({ title, content });
        await linkDoc(newDoc.id, parentId);

        allDocs = await listDocs();
        renderChildren();
        renderDocGrid();
        closeAddModal();
        return;
    }

    alert("Selecione um documento ou envie um arquivo.");
}

function extractH1(md) {
    const m = md.match(/^#\s+(.+)/m);
    return m ? m[1].trim() : null;
}

// ======================================================
// ================ BIND EVENTS (SEM ONCLICK) ============
// ======================================================
function bindUIEvents() {
    document.querySelector(".section-header .btn")
        .addEventListener("click", openAddModal);

    document.querySelector(".close-btn")
        .addEventListener("click", closeAddModal);

    document.querySelectorAll(".tab")[0]
        .addEventListener("click", () => switchTab("existing"));

    document.querySelectorAll(".tab")[1]
        .addEventListener("click", () => switchTab("upload"));

    document.getElementById("fileInput")
        .addEventListener("change", handleFile);

    document.getElementById("confirmBtn")
        .addEventListener("click", confirmAdd);
}
