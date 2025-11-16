// ======================================================
// =============== IMPORTAÇÃO DA API =====================
// ======================================================
import { getDoc } from "./hub-api.js";

// ======================================================
// ===================== ESTADO ==========================
// ======================================================
let currentId = null;

// ======================================================
// ===================== BOOTSTRAP =======================
// ======================================================
window.addEventListener("load", async () => {
    currentId = getIdFromURL();
    if (!currentId) {
        showError("Nenhum ID foi informado.");
        return;
    }

    await loadDocument(currentId);
    setupScrollSync();
});

// ======================================================
// =============== PEGAR ID DA URL =======================
// ======================================================
function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// ======================================================
// =============== CARREGAR DOCUMENTO ====================
// ======================================================
async function loadDocument(id) {
    try {
        const doc = await getDoc(id);

        // Título
        const titleEl = document.getElementById("docTitle");
        if (titleEl) {
            if (window.marked) {
                titleEl.innerHTML = marked.parse(doc.title || "Sem Título");
            } else {
                titleEl.textContent = doc.title || "Sem Título";
            }
        }

        document.title = `${doc.title || "Documento"} - Knowledge Hub`;

        // Info (data)
        const infoEl = document.getElementById("docInfo");
        if (infoEl) {
            const ts = doc.updated_at || doc.created_at;
            if (ts) {
                const date = new Date(ts);
                infoEl.textContent = `Atualizado: ${date.toLocaleDateString("pt-BR")}`;
            } else {
                infoEl.textContent = "";
            }
        }

        // Link Editar → edit.html?id=...
        const editLink = document.getElementById("editLink");
        if (editLink) {
            editLink.href = `edit.html?id=${id}`;
        }

        // Conteúdo
        renderMarkdown(doc.content || "");

    } catch (err) {
        console.error(err);
        showError("Erro ao carregar documento.");
    }
}

// ======================================================
// =============== RENDERIZAÇÃO AVANÇADA =================
// ======================================================
function renderMarkdown(markdownText) {
    const contentEl = document.getElementById("content");
    const wrapper = document.querySelector(".content-wrapper");
    if (!contentEl) return;

    try {
        // posição de scroll
        const scrollPos = wrapper ? wrapper.scrollTop : 0;
        const scrollPerc =
            wrapper && wrapper.scrollHeight > 0
                ? scrollPos / wrapper.scrollHeight
                : 0;

        // proteger pipes em código dentro de tabelas (mesmo esquema do editor)
        const lines = markdownText.split("\n");
        const processedLines = lines.map(line => {
            let inCode = false;
            let pipeCount = 0;

            for (let i = 0; i < line.length; i++) {
                const ch = line[i];
                if (ch === "`") {
                    inCode = !inCode;
                } else if (ch === "|" && !inCode) {
                    pipeCount++;
                }
            }

            if (pipeCount > 0) {
                let result = "";
                let inBacktick = false;

                for (let i = 0; i < line.length; i++) {
                    const ch = line[i];
                    if (ch === "`") {
                        inBacktick = !inBacktick;
                        result += ch;
                    } else if (ch === "|" && inBacktick) {
                        result += "\\|";
                    } else {
                        result += ch;
                    }
                }

                return result;
            }

            return line;
        });

        const safeMarkdown = processedLines.join("\n");

        if (window.marked) {
            marked.setOptions({
                breaks: true,
                gfm: true
            });
            contentEl.innerHTML = marked.parse(safeMarkdown);
        } else {
            contentEl.textContent = safeMarkdown;
        }

        // Highlight.js
        if (window.hljs) {
            contentEl
                .querySelectorAll("pre code")
                .forEach(block => window.hljs.highlightElement(block));
        }

        // MathJax + TOC + scroll restore
        if (window.MathJax && typeof MathJax.typesetPromise === "function") {
            setTimeout(() => {
                MathJax.typesetPromise([contentEl])
                    .then(() => {
                        // envolver blocos LaTeX
                        if (window.wrapLatexBlocks) {
                            window.wrapLatexBlocks();
                        }
                        updateTOC();
                        if (wrapper) {
                            setTimeout(() => {
                                wrapper.scrollTop =
                                    wrapper.scrollHeight * scrollPerc;
                            }, 50);
                        }
                    })
                    .catch(err => {
                        console.error("Erro MathJax:", err);
                        updateTOC();
                    });
            }, 0);
        } else {
            updateTOC();
            if (wrapper) {
                setTimeout(() => {
                    wrapper.scrollTop = wrapper.scrollHeight * scrollPerc;
                }, 50);
            }
        }
    } catch (e) {
        console.error("Erro ao renderizar:", e);
        contentEl.innerHTML = `<div class="error">❌ Erro ao renderizar: ${e.message}</div>`;
    }
}

// ======================================================
// =============== WRAPPER DE LATEX ======================
// ======================================================
function wrapLatexBlocks() {
    const mathBlocks = document.querySelectorAll('mjx-container[display="true"]');

    mathBlocks.forEach(block => {
        const parent = block.parentElement;
        if (!parent || parent.classList.contains("latex-block-wrapper")) {
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "latex-block-wrapper";

        const label = document.createElement("div");
        label.className = "latex-block-label";
        label.textContent = "LATEX";

        parent.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(label);
    });
}

// deixar disponível pro MathJax config
window.wrapLatexBlocks = wrapLatexBlocks;

// ======================================================
// ======================= TOC ===========================
// ======================================================
function updateTOC() {
    const content = document.getElementById("content");
    const tocContent = document.getElementById("tocContent");
    if (!content || !tocContent) return;

    const headings = content.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
    );

    if (!headings.length) {
        tocContent.innerHTML =
            '<div style="color:#6b7280;text-align:center;padding:20px;font-size:12px;">Nenhum título encontrado</div>';
        return;
    }

    tocContent.innerHTML = "";

    headings.forEach((heading, i) => {
        if (!heading.id) {
            heading.id = `heading-${i}-${Date.now()}`;
        }

        const level = heading.tagName.toLowerCase();
        const text = heading.textContent || `Título ${i + 1}`;

        const item = document.createElement("div");
        item.className = `toc-item toc-${level}`;
        item.textContent = text;

        item.addEventListener("click", () => {
            heading.scrollIntoView({ behavior: "smooth", block: "center" });
            document
                .querySelectorAll(".toc-item")
                .forEach(el => el.classList.remove("active"));
            item.classList.add("active");
        });

        tocContent.appendChild(item);
    });

    const firstItem = tocContent.querySelector(".toc-item");
    if (firstItem) firstItem.classList.add("active");
}

// ======================================================
// ============= SCROLL SYNC (TOC ativo) =================
// ======================================================
function setupScrollSync() {
    const wrapper = document.querySelector(".content-wrapper");
    if (!wrapper) return;

    wrapper.addEventListener("scroll", () => {
        const headings = document.querySelectorAll(
            "#content h1, #content h2, #content h3, #content h4, #content h5, #content h6"
        );
        const tocItems = document.querySelectorAll(".toc-item");

        let currentIndex = null;

        headings.forEach((heading, i) => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 0) {
                currentIndex = i;
            }
        });

        if (currentIndex !== null && tocItems[currentIndex]) {
            tocItems.forEach(item => item.classList.remove("active"));
            tocItems[currentIndex].classList.add("active");
        }
    });
}

// ======================================================
// ====================== ERROS ==========================
// ======================================================
function showError(msg) {
    const contentEl = document.getElementById("content");
    const titleEl = document.getElementById("docTitle");

    if (titleEl) titleEl.textContent = "Erro";
    if (contentEl) {
        contentEl.innerHTML = `<div class="error">${msg}</div>`;
    }
}

// ======================================================
// ================== EXPORT / PRINT =====================
// ======================================================
function printDoc() {
    window.print();
}

function exportPDF() {
    // por enquanto, usa a própria impressão (user escolhe "Salvar como PDF")
    window.print();
}

window.printDoc = printDoc;
window.exportPDF = exportPDF;