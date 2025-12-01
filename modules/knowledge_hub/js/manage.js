import { getDoc, getDocs, linkDoc, unlinkDoc, createDoc, getLinks } from "./hub-api.js";

let parentId = null;
let parentDoc = null;
let allDocs = [];
let selectedChildId = null;
let uploadedFile = null;
let childLinks = []; // armazenar objetos de links do backend { id, child_id, parent_id }

window.addEventListener("DOMContentLoaded", initManage);

async function initManage() {
    parentId = getDocumentIdFromURL();
    if (!parentId) {
        alert("Nenhum ID encontrado na URL.");
        return;
    }

    bindUIEvents();

    await loadParentDocument();
    await loadAllDocs();      // Carrega todos os docs para o modal
    await loadChildLinks();    // Carrega APENAS os links deste pai
    renderParentData();
    renderChildren();
    renderExistingDocs();
}

function getDocumentIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function bindUIEvents() {
    document.getElementById("btnOpenModal").addEventListener("click", openAddModal);
    document.getElementById("btnCloseModal").addEventListener("click", closeAddModal);
    document.getElementById("btnCancel").addEventListener("click", closeAddModal);
    document.getElementById("btnConfirm").addEventListener("click", confirmAddChild);

    document.getElementById("tabExistingBtn").addEventListener("click", () => switchTab("existing"));
    document.getElementById("tabUploadBtn").addEventListener("click", () => switchTab("upload"));

    document.getElementById("uploadArea").addEventListener("click", () => {
        document.getElementById("fileInput").click();
    });

    document.getElementById("fileInput").addEventListener("change", handleFileUpload);
}

async function loadParentDocument() {
    try {
        parentDoc = await getDoc(parentId);
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar o documento.");
    }
}

async function loadAllDocs() {
    try {
        allDocs = await getDocs();
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar documentos.");
    }
}

async function loadChildLinks() {
    try {
        childLinks = await getLinks(parentId);
    } catch (err) {
        console.error("Erro ao carregar os vínculos:", err);
        alert("Erro ao carregar os vínculos.");
        childLinks = []; // Garante que não quebre a renderização
    }
}

// =================================================================
// CORREÇÃO 1: Extrair H1 e renderizar com Marked para o título principal
// =================================================================
function renderParentData() {
    // Extrai o primeiro H1 do conteúdo, igual ao index.js
    const lines = parentDoc.content ? parentDoc.content.split("\n") : [];
    const h1Line = lines.find(l => l.trim().startsWith("#")) || "";
    const h1Title = h1Line.replace(/^#+\s*/, "").trim();
    const displayTitle = h1Title || parentDoc.title;

    // Usa innerHTML com marked.parse para renderizar a formatação (ex: **negrito**)
    document.getElementById("docTitle").innerHTML = marked.parse(displayTitle);
    document.getElementById("docMeta").textContent =
        "Atualizado: " + new Date(parentDoc.updated_at).toLocaleString("pt-BR");
}

// =================================================================
// CORREÇÃO 2: Ajustar HTML para o botão "Remover" funcionar com o CSS
// =================================================================
function renderChildren() {
    const list = document.getElementById("childrenList");
    list.innerHTML = "";

    if (childLinks.length === 0) {
        list.innerHTML = `<p class="empty-text">Nenhum documento filho vinculado.</p>`;
        return;
    }

    childLinks.forEach(link => {
        const child = allDocs.find(d => d.id === link.child_id);
        if (!child) return;

        const item = document.createElement("div");
        item.className = "child-item";

        // HTML corrigido para corresponder ao CSS
        item.innerHTML = `
            <div class="child-info">
                <div class="child-title">${child.title}</div>
                <div class="child-date">${new Date(child.updated_at).toLocaleString("pt-BR")}</div>
            </div>
            <div class="child-actions">
                <button class="action-btn action-btn-danger">Remover</button>
            </div>
        `;

        item.querySelector(".action-btn-danger").addEventListener("click", () => handleUnlink(link.id));

        list.appendChild(item);
    });
}

async function handleUnlink(linkId) {
    if (!confirm("Remover este vínculo?")) return;

    try {
        await unlinkDoc(linkId);
        await loadChildLinks();
        renderChildren();
        renderExistingDocs();
    } catch (err) {
        console.error(err);
        alert("Erro ao remover vínculo.");
    }
}

function renderExistingDocs() {
    const grid = document.getElementById("existingDocsGrid");
    grid.innerHTML = "";

    const docs = allDocs.filter(d => d.id !== parentId);

    docs.forEach(doc => {
        const lines = doc.content ? doc.content.split("\n") : [];
        const h1Line = lines.find(l => l.trim().startsWith("#")) || "";
        const h1Title = h1Line.replace(/^#+\s*/, "").trim();
        const displayTitle = h1Title || doc.title;

        const card = document.createElement("div");
        card.className = "existing-doc-card"; // Mantive a classe original, mas o CSS usa .doc-card. Se quiser o estilo, troque aqui.
        card.dataset.id = doc.id;

        card.innerHTML = `
            <div class="doc-card-title">${displayTitle}</div>
            <div class="doc-card-date">${new Date(doc.updated_at).toLocaleString("pt-BR")}</div>
        `;

        card.addEventListener("click", () => selectExistingDoc(doc.id));

        grid.appendChild(card);
    });
}

function selectExistingDoc(id) {
    selectedChildId = id;

    document.querySelectorAll(".existing-doc-card")
        .forEach(card => card.classList.remove("selected"));

    const card = document.querySelector(`.existing-doc-card[data-id="${id}"]`);
    if (card) card.classList.add("selected");

    document.getElementById("btnConfirm").style.display = "inline-flex";
}

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

function handleFileUpload(event) {
    uploadedFile = event.target.files[0] || null;
    if (uploadedFile) document.getElementById("btnConfirm").style.display = "inline-flex";
}

async function confirmAddChild() {
    if (selectedChildId) {
        try {
            await linkDoc(parentId, selectedChildId);
            await loadChildLinks();
            renderChildren();
            renderExistingDocs();
            closeAddModal();
            return;
        } catch (err) {
            console.error(err);
            alert("Erro ao vincular documento.");
        }
    }

    if (uploadedFile) {
        try {
            const content = await uploadedFile.text();
            const title = extractH1(content) || uploadedFile.name;

            const newDoc = await createDoc({ title, content });
            allDocs.push(newDoc);
            
            await linkDoc(parentId, newDoc.id);
            
            await loadChildLinks();
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

function extractH1(md) {
    const match = md.match(/^#\s+(.+)/m);
    return match ? match[1].trim() : null;
}
