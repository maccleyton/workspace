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
let autoSaveTimeout = null;

let editor = null;
let preview = null;
let tocContent = null;

// ======================================================
// =================== BOOTSTRAP ========================
// ======================================================
window.addEventListener("load", initEditor);

async function initEditor() {
    // Garante que o marked carregou
    if (!window.marked) {
        console.error("Biblioteca marked não carregada");
        alert("Erro ao carregar biblioteca marked. Recarregue a página.");
        return;
    }

    editor = document.getElementById("editor");
    preview = document.getElementById("preview");
    tocContent = document.getElementById("tocContent");
    const titleInput = document.getElementById("docTitle");

    if (!editor || !preview || !tocContent || !titleInput) {
        console.error("Elementos essenciais do editor não foram encontrados no DOM.");
        return;
    }

    // ID vindo da URL (quando abre a partir do Hub)
    const params = new URLSearchParams(window.location.search);
    docId = params.get("id");

    if (docId) {
        // Tenta carregar do backend
        try {
            const doc = await getDoc(docId);
            currentDoc = doc;
            originalParentId = doc.parent_id ?? null;

            titleInput.value = doc.title || "Novo Documento";
            editor.value = doc.content || "";
        } catch (e) {
            console.error("Erro ao carregar documento do backend:", e);
            alert("Erro ao carregar documento do servidor.");
            // Se der ruim no backend, segue com conteúdo padrão da página
            originalParentId = null;
        }
    } else {
        // Sem ID → editor livre, usa conteúdo padrão do HTML
        originalParentId = null;
    }

    // Primeira renderização
    renderMarkdown();
    updateStats();

    // Eventos e UX
    setupEditorEvents();
    setupScrollSync();
    setupKeyboardShortcuts();
    setupTOCToggleObserver();

    // Autosave
    setupAutoSave();
}

// ======================================================
// ================== RENDER MARKDOWN ===================
// ======================================================

// Wrap LaTeX blocks com estilização (global pro MathJax)
function wrapLatexBlocks() {
    if (!preview) return;

    const mathBlocks = preview.querySelectorAll('mjx-container[display="true"]');

    mathBlocks.forEach(block => {
        // já embrulhado?
        if (block.parentElement.classList.contains("latex-block-wrapper")) {
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "latex-block-wrapper";

        const label = document.createElement("div");
        label.className = "latex-block-label";
        label.textContent = "LATEX";

        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(label);
    });
}

function renderMarkdown() {
    if (!editor || !preview) return;

    let markdownText = editor.value;

    // Guarda posição do scroll
    const scrollPos = preview.scrollTop;
    const scrollPercentage =
        preview.scrollHeight > 0 ? scrollPos / preview.scrollHeight : 0;

    if (!markdownText.trim()) {
        preview.innerHTML =
            '<div style="color:#6b7280;text-align:center;padding:40px;">Digite algo...</div>';
        updateTOC();
        updateStats();
        return;
    }

    try {
        // === Proteção de pipes dentro de código em linhas de tabela ===
        const lines = markdownText.split("\n");
        const processedLines = lines.map(line => {
            let inCode = false;
            let pipeCount = 0;

            for (let i = 0; i < line.length; i++) {
                if (line[i] === "`") {
                    inCode = !inCode;
                } else if (line[i] === "|" && !inCode) {
                    pipeCount++;
                }
            }

            if (pipeCount > 0) {
                let result = "";
                let inBacktick = false;

                for (let i = 0; i < line.length; i++) {
                    if (line[i] === "`") {
                        inBacktick = !inBacktick;
                        result += line[i];
                    } else if (line[i] === "|" && inBacktick) {
                        result += "\\|";
                    } else {
                        result += line[i];
                    }
                }

                return result;
            }

            return line;
        });

        markdownText = processedLines.join("\n");

        // Configuração do marked
        marked.setOptions({
            breaks: true,
            gfm: true
        });

        preview.innerHTML = marked.parse(markdownText);

        updateTOC();
        updateStats();

        if (window.MathJax) {
            setTimeout(() => {
                MathJax.typesetPromise([preview])
                    .then(() => {
                        wrapLatexBlocks();
                        preview.scrollTop = preview.scrollHeight * scrollPercentage;
                    })
                    .catch(err => console.error(err.message));
            }, 0);
        } else {
            setTimeout(() => {
                preview.scrollTop = preview.scrollHeight * scrollPercentage;
            }, 50);
        }
    } catch (e) {
        console.error("Erro na renderização:", e);
        preview.innerHTML = `<div style="color:#dc2626">Erro de renderização: ${e.message}</div>`;
    }
}

// ======================================================
// =================== TOC & STATS ======================
// ======================================================
function updateTOC() {
    if (!preview || !tocContent) return;

    try {
        const headings = preview.querySelectorAll("h1,h2,h3,h4,h5,h6");
        if (!headings.length) {
            tocContent.innerHTML =
                '<div style="color:#6b7280;text-align:center;padding:20px;font-size:12px;">Nenhum título</div>';
            return;
        }

        tocContent.innerHTML = "";
        headings.forEach((h, i) => {
            h.id = `h${i}`;
            const item = document.createElement("div");
            item.className = `toc-item toc-${h.tagName.toLowerCase()}`;
            item.textContent = h.textContent;
            item.onclick = () => {
                h.scrollIntoView({ behavior: "smooth", block: "center" });
                document
                    .querySelectorAll(".toc-item")
                    .forEach(el => el.classList.remove("active"));
                item.classList.add("active");
            };
            tocContent.appendChild(item);
        });
    } catch (e) {
        console.error("Erro ao atualizar TOC:", e);
        tocContent.innerHTML =
            '<div style="color:#dc2626;text-align:center;padding:20px;font-size:12px;">Erro no TOC</div>';
    }
}

function updateStats() {
    if (!editor) return;

    const text = editor.value;
    const charCount = document.getElementById("charCount");
    const wordCount = document.getElementById("wordCount");

    if (charCount) {
        charCount.textContent = `${text.length} caracteres`;
    }
    if (wordCount) {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        wordCount.textContent = `${words} palavras`;
    }
}

// ======================================================
// ================== EVENTOS EDITOR =====================
// ======================================================
function setupEditorEvents() {
    const titleInput = document.getElementById("docTitle");
    if (!editor || !titleInput) return;

    editor.addEventListener("input", () => {
        renderMarkdown();
        queueAutoSave();
    });

    titleInput.addEventListener("input", () => {
        queueAutoSave();
    });
}

// Scroll sync editor → preview
function setupScrollSync() {
    if (!editor || !preview) return;

    let syncing = false;

    editor.addEventListener("scroll", () => {
        if (syncing) return;
        syncing = true;
        const pct =
            editor.scrollTop /
            ((editor.scrollHeight - editor.clientHeight) || 1);
        preview.scrollTop =
            pct * (preview.scrollHeight - preview.clientHeight);
        setTimeout(() => (syncing = false), 10);
    });
}

// Atalhos de teclado (Ctrl+S)
function setupKeyboardShortcuts() {
    if (!editor) return;

    editor.addEventListener("keydown", e => {
        if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            saveDocument();
        }
    });
}

// ======================================================
// ==================== AUTOSAVE ========================
// ======================================================
function setupAutoSave() {
    autoSaveTimeout = null;
}

function queueAutoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        const titleInput = document.getElementById("docTitle");
        if (!editor || !titleInput) return;

        if (editor.value.trim() && titleInput.value.trim()) {
            saveDocument();
        }
    }, 30000); // 30s
}

// ======================================================
// ======================= SAVE =========================
// ======================================================
async function saveDocument() {
    const titleInput = document.getElementById("docTitle");
    if (!editor || !titleInput) return;

    const title = titleInput.value.trim();
    const content = editor.value;

    if (!title) {
        alert("Por favor, digite um título para o documento.");
        return;
    }

    if (!docId || !currentDoc) {
        // Editor aberto sem vínculo real com doc do Hub
        alert(
            "Este editor só salva no Knowledge Hub quando é aberto a partir de um documento existente."
        );
        return;
    }

    const payload = {
        title,
        content,
        parentId: originalParentId
    };

    try {
        await updateDoc(docId, payload);
        const status = document.getElementById("saveStatus");
        if (status) {
            status.textContent = "✓ Salvo no Hub";
            setTimeout(() => (status.textContent = ""), 2000);
        }
    } catch (e) {
        console.error("Erro ao salvar documento no backend:", e);
        const status = document.getElementById("saveStatus");
        if (status) {
            status.textContent = "❌ Erro ao salvar";
            setTimeout(() => (status.textContent = ""), 3000);
        }
        alert("Falha ao salvar no servidor.");
    }
}

// ======================================================
// =================== EXPORTAR MD ======================
// ======================================================
function exportMarkdown() {
    if (!editor) return;

    const titleInput = document.getElementById("docTitle");
    const name = (titleInput?.value || "documento").trim() || "documento";

    const blob = new Blob([editor.value], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name}.md`;
    a.click();
}

// ======================================================
// ================== NAVEGAÇÃO / MODAIS ================
// ======================================================
function goBackToHub() {
    if (
        confirm(
            "Voltar ao Hub Central? Alterações não salvas podem ser perdidas."
        )
    ) {
        window.location.href = "index.html";
    }
}

function goToAssistant() {
    window.location.href = "assistant.html";
}

function openSettings() {
    const modal = document.getElementById("settingsModal");
    if (modal) modal.classList.add("active");
}

function closeSettings() {
    const modal = document.getElementById("settingsModal");
    if (modal) modal.classList.remove("active");
}

// ======================================================
// =================== CONFIGURAÇÕES ====================
// ======================================================
function applySettings() {
    const root = document.documentElement.style;

    const get = id => document.getElementById(id)?.value;

    root.setProperty("--h1-color", get("h1Color"));
    root.setProperty("--h2-color", get("h2Color"));
    root.setProperty("--h3-color", get("h3Color"));
    root.setProperty("--h4-color", get("h4Color"));
    root.setProperty("--h5-color", get("h5Color"));
    root.setProperty("--h6-color", get("h6Color"));

    root.setProperty("--code-block-text", get("codeText"));
    root.setProperty("--code-block-bg", get("codeBg"));
    root.setProperty("--code-block-border", get("codeBorder"));
    root.setProperty(
        "--code-block-border-width",
        get("codeBorderWidth") + "px"
    );

    root.setProperty("--latex-block-text", get("latexText"));
    root.setProperty("--latex-block-bg", get("latexBg"));
    root.setProperty("--latex-block-border", get("latexBorder"));
    root.setProperty(
        "--latex-block-border-width",
        get("latexBorderWidth") + "px"
    );

    root.setProperty("--quote-text", get("quoteText"));
    root.setProperty("--quote-bg", get("quoteBg"));
    root.setProperty("--quote-border", get("quoteBorder"));
    root.setProperty(
        "--quote-border-width",
        get("quoteBorderWidth") + "px"
    );

    root.setProperty("--code-inline-text", get("codeInlineText"));
    root.setProperty("--code-inline-bg", get("codeInlineBg"));
    root.setProperty("--code-inline-border", get("codeInlineBorder"));
    root.setProperty(
        "--code-inline-border-width",
        get("codeInlineBorderWidth") + "px"
    );

    root.setProperty("--latex-inline-text", get("latexInlineText"));

    root.setProperty("--line-height", get("lineHeight"));
    root.setProperty("--word-spacing", get("wordSpacing") + "px");
    root.setProperty("--letter-spacing", get("letterSpacing") + "px");
    root.setProperty("--margin", get("margin") + "px");

    root.setProperty("--font-family", get("fontFamily"));

    closeSettings();
}

function resetSettings() {
    if (confirm("Restaurar configurações padrão?")) {
        location.reload();
    }
}

// ======================================================
// ======================= TOC SIDE =====================
// ======================================================
function toggleTOC() {
    const sidebar = document.getElementById("tocSidebar");
    if (!sidebar) return;

    const button = sidebar.querySelector(".toggle-toc-btn");
    if (!button) return;

    if (sidebar.classList.contains("collapsed")) {
        sidebar.classList.remove("collapsed");
        button.textContent = "◀";
        button.title = "Ocultar navegação";
        button.style.display = "block";
    } else {
        sidebar.classList.add("collapsed");
        button.textContent = "▶";
        button.title = "Mostrar navegação";
    }

    ensureToggleButton();
}

function ensureToggleButton() {
    const sidebar = document.getElementById("tocSidebar");
    if (!sidebar) return;

    const button = sidebar.querySelector(".toggle-toc-btn");
    if (!button) return;

    if (sidebar.classList.contains("collapsed")) {
        button.style.position = "fixed";
        button.style.top = "50%";
        button.style.left = "10px";
        button.style.transform = "translateY(-50%)";
        button.style.zIndex = "1000";
        button.style.display = "block";
    } else {
        button.style.position = "static";
        button.style.top = "";
        button.style.left = "";
        button.style.transform = "";
        button.style.zIndex = "";
    }
}

function setupTOCToggleObserver() {
    const sidebar = document.getElementById("tocSidebar");
    if (!sidebar) return;

    const observer = new MutationObserver(() => {
        setTimeout(ensureToggleButton, 100);
    });

    observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
    ensureToggleButton();
}

// ======================================================
// ========= EXPORTAR FUNÇÕES PARA O ESCOPO GLOBAL ======
// ======================================================
window.wrapLatexBlocks = wrapLatexBlocks;
window.saveDocument = saveDocument;
window.exportMarkdown = exportMarkdown;
window.goBackToHub = goBackToHub;
window.goToAssistant = goToAssistant;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.applySettings = applySettings;
window.resetSettings = resetSettings;
window.toggleTOC = toggleTOC;
