// ======================================================
// =============== IMPORTAÇÃO DA API =====================
// ======================================================
import { getDoc } from "./hub-api.js";

// ======================================================
// ===================== ESTADO ==========================
// ======================================================
let currentId = null;
let scrollLock = false;

// ======================================================
// ===================== BOOTSTRAP ========================
// ======================================================
window.addEventListener("DOMContentLoaded", async () => {
    currentId = getIdFromURL();
    if (!currentId) {
        showError("Nenhum ID foi informado.");
        return;
    }

    await loadDocument(currentId);
    setupPrintButton();
});

// ======================================================
// =============== PEGAR ID DA URL ========================
// ======================================================
function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// ======================================================
// =============== CARREGAR DOCUMENTO =====================
// ======================================================
async function loadDocument(id) {
    try {
        const doc = await getDoc(id);

        // Título
        const titleElement = document.getElementById("docTitle");
        if (titleElement) {
            titleElement.innerHTML = marked.parse(doc.title || "Sem Título");
        }
        document.title = `${doc.title || "Documento"} - Knowledge Hub`;

        // Conteúdo
        renderMarkdown(doc.content);

    } catch (err) {
        console.error(err);
        showError("Erro ao carregar documento.");
    }
}

// ======================================================
// =================== RENDER MARCADO =====================
// ======================================================
function renderMarkdown(markdownText) {
    const contentEl = document.getElementById("content");
    if (!contentEl) return;

    // Proteção de pipes dentro de código
    markdownText = protectPipes(markdownText);

    // Renderizar Markdown
    contentEl.innerHTML = marked.parse(markdownText);

    // Recolocar pipes
    restorePipes(contentEl);

    // Renderizar matemática
    if (window.MathJax) {
        MathJax.typesetPromise();
    }

    // Syntax highlight
    document.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));

    // Depois que tudo estiver renderizado → reconstruir TOC
    buildTOC();
    activateTOCScroll();
}

// ======================================================
// =================== ERROS ==============================
// ======================================================
function showError(msg) {
    const contentEl = document.getElementById("content");
    const titleEl = document.getElementById("docTitle");

    if (titleEl) titleEl.textContent = "Erro";
    if (contentEl) contentEl.innerHTML = `<div class="error">${msg}</div>`;
}

// ======================================================
// =============== PROTEÇÃO DE PIPES ======================
// ======================================================
function protectPipes(md) {
    return md.replace(/`([^`]+)`/g, (match, p1) => {
        return "`" + p1.replace(/\|/g, "%%PIPE%%") + "`";
    });
}

function restorePipes(container) {
    container.querySelectorAll("code").forEach(code => {
        code.innerHTML = code.innerHTML.replace(/%%PIPE%%/g, "|");
    });
}

// ======================================================
// ====================== TOC =============================
// ======================================================
function buildTOC() {
    const toc = document.getElementById("tocArea");
    if (!toc) return;

    toc.innerHTML = "";

    const headers = document.querySelectorAll("#content h1, #content h2, #content h3, #content h4");

    headers.forEach((h, index) => {
        const id = `header-${index}`;
        h.id = id;

        const div = document.createElement("div");
        div.className = `toc-item level-${h.tagName.toLowerCase()}`;
        div.textContent = h.innerText;

        div.addEventListener("click", () => {
            h.scrollIntoView({ behavior: "smooth" });
        });

        toc.appendChild(div);
    });
}

function activateTOCScroll() {
    const tocItems = document.querySelectorAll(".toc-item");
    const headers = document.querySelectorAll("#content h1, #content h2, #content h3, #content h4");

    document.addEventListener("scroll", () => {
        if (scrollLock) return;

        let current = null;
        headers.forEach(h => {
            const rect = h.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= 200) {
                current = h.id;
            }
        });

        tocItems.forEach(item => item.classList.remove("active"));
        if (current) {
            const activeItem = [...tocItems].find(i => i.textContent === document.getElementById(current).innerText);
            if (activeItem) activeItem.classList.add("active");
        }
    });
}

// ======================================================
// ======================== PRINT =========================
// ======================================================
function setupPrintButton() {
    const printBtn = document.getElementById("printBtn");
    if (!printBtn) return;

    printBtn.addEventListener("click", () => {
        window.print();
    });
}
