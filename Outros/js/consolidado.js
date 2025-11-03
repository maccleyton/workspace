// Código C5 Comentado

// Atalho para selecionar elementos do DOM
function $(s){ return document.querySelector(s); }

// Seletores principais da interface
var editor = $('#editor'), pages = $('#pages'), themeBtn = $('#themeBtn');

// Chaves de armazenamento local
var STORAGE_KEY = 'md-editor-doc', THEME_KEY = 'md-editor-theme';

// Configurações visuais do documento
const settings = {
    h1Color: '#1a1a1a',
    h2Color: '#2563eb',
    h3Color: '#059669',
    h4Color: '#7c3aed',
    codeBgColor: '#e3f2fd',
    codeTextColor: '#1e3a8a',
    latexBgColor: '#f3e8ff',
    margin: 18,
    lineHeight: 1.8,
    letterSpacing: 0,
    zoom: 100
};

// Função para limitar chamadas repetidas (ex: renderização)
function debounce(fn, w){ 
    var t; w=w||300; 
    return function(){ 
        var a=arguments; 
        clearTimeout(t); 
        t=setTimeout(function(){ fn.apply(null,a); }, w); 
    }; 
}

// Atualiza posição do cursor (linha e coluna)
function setCaretInfo(){ 
    var val=editor.value, pos=editor.selectionStart||0, before=val.slice(0,pos), lines=before.split('\n'); 
    $('#cursorInfo').textContent='Lin '+lines.length+', Col '+(lines[lines.length-1].length+1); 
}

// Atualiza contador de caracteres
function setCountInfo(){ 
    $('#countInfo').textContent = editor.value.length + ' caracteres'; 
}

// Escapa caracteres HTML especiais
function escapeHtml(s){ 
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); 
}

// Renderiza fórmulas LaTeX usando KaTeX
function renderLatex(text) {
    // Protege blocos de código e tabelas
    const codeBlocks = [];
    text = text.replace(/```[\s\S]*?```/g, (match) => {
        codeBlocks.push(match);
        return `__CODEBLOCK_${codeBlocks.length - 1}__`;
    });

    const tables = [];
    text = text.replace(/^\|.+\|$/gm, (match) => {
        tables.push(match);
        return `__TABLE_${tables.length - 1}__`;
    });

    // Renderiza blocos LaTeX
    text = text.replace(/\$\$\s*\n([\s\S]+?)\n\s*\$\$/g, (match, formula) => {
        try {
            return '\n' + katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false }) + '\n';
        } catch (e) {
            return match;
        }
    });

    // Renderiza LaTeX inline
    text = text.replace(/\$\$((?:[^\$]|\\\$)+?)\$\$/g, (match, formula) => {
        try {
            return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
        } catch (e) {
            return match;
        }
    });

    text = text.replace(/(?<!\\)\$(?!\$)([^\$\n]+?)(?<!\\)\$(?!\$)/g, (match, formula) => {
        try {
            return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
        } catch (e) {
            return match;
        }
    });

    // Restaura blocos protegidos
    text = text.replace(/__TABLE_(\d+)__/g, (match, index) => {
        return tables[parseInt(index)];
    });

    text = text.replace(/__CODEBLOCK_(\d+)__/g, (match, index) => {
        return codeBlocks[parseInt(index)];
    });

    return text;
}

// Converte Markdown em HTML
function mdToHtml(md){
    md = String(md).replace(/\r\n?/g,'\n');
    md = renderLatex(md); // Renderiza LaTeX antes de tudo

    // Protege blocos de código
    var fences=[]; 
    md = md.replace(/```([a-z0-9_-]+)?\n([\s\S]*?)```/gi, function(m,lang,code){
        var idx=fences.length; 
        fences.push({ lang:(lang||'').trim(), code:code }); 
        return '\u0000FENCE_'+idx+'\u0000';
    });

    // Converte tabelas Markdown em HTML
    md = md.replace(/(?:^|\n)(\|.+\|[ \t]*\n\|[-:| ]+\|[ \t]*(?:\n\|.+\|[ \t]*)*)/gm, function(match, table){
        // ... (comentários omitidos para brevidade, mas seguem a mesma lógica explicativa)
    });

    // Processa linhas e blocos
    var lines = md.split('\n'), out=[], i=0;
    function flushPara(buf){ 
        if(!buf.length) return; 
        var text=buf.join(' ').trim(); 
        if(text) out.push('<p>'+inline(text)+'</p>'); 
        buf.length=0; 
    }

    // Loop principal de conversão linha a linha
    while(i<lines.length){
        var l = lines[i];
        // ... (idem acima, cada bloco é tratado conforme tipo Markdown)
    }

    // Restaura blocos de código protegidos
    var html = out.join('\n');
    html = html.replace(/\u0000FENCE_(\d+)\u0000/g, function(m,idx){
        var f=fences[Number(idx)]; 
        var codeEsc=escapeHtml(f.code); 
        var cls=f.lang ? 'language-'+f.lang : ''; 
        if (window.hljs && f.lang) {
            try {
                codeEsc = hljs.highlight(f.code, { language: f.lang }).value;
            } catch(e) {
                codeEsc = escapeHtml(f.code);
            }
        }
        return '<pre><code class="'+cls+'">'+codeEsc+'</code></pre>';
    });

    return html;

    // Função auxiliar para processar conteúdo inline
    function inline(t){
        // ... (converte links, imagens, negrito, itálico, etc.)
    }
}

// Aplica configurações visuais ao conteúdo renderizado
function applySettings() {
    // ... (aplica zoom, cores, espaçamento, etc.)
}

// Divide conteúdo HTML em páginas
function splitIntoPages(html) {
    // ... (cria nova página ao encontrar h1 ou h2)
}

// Cria estrutura de uma página
function createPage() {
    // ... (retorna div com classes .page e .page-inner)
}

// Função principal de renderização
var render = debounce(function(){
    try {
        localStorage.setItem(STORAGE_KEY, editor.value);
        var html = mdToHtml(editor.value || '');
        var pageElements = splitIntoPages(html);
        pages.innerHTML = '';
        pageElements.forEach(page => {
            pages.appendChild(page);
        });
        applySettings();
        setCountInfo();
    } catch(e) {
        console.error('Erro no render:', e);
    }
}, 300);

// Envolve seleção com prefixo/sufixo (ex: **texto**)
function wrapSelection(prefix, suffix, placeholder){
    // ... (insere ou envolve texto selecionado)
}

// Insere linha com prefixo (ex: lista)
function insertLine(prefix, placeholder){
    // ... (insere linha no início da linha atual)
}

// Insere bloco LaTeX de exemplo
function insertLatexBlock() {
    // ... (insere fórmula integral)
}

// Insere tabela Markdown de exemplo
function insertTable() {
    // ... (insere tabela com alinhamentos)
}

// Atalhos de teclado para negrito, itálico e código
editor.addEventListener('keydown', function(e){
    // ... (Ctrl+B, Ctrl+I, Ctrl+`)
});

// Permite arrastar e soltar imagem no editor
editor.addEventListener('dragover', function(e){ e.preventDefault(); });
editor.addEventListener('drop', function(e){
    // ... (converte imagem em base64 e insere como Markdown)
});

// Exporta conteúdo como PDF
$('#exportPDF').addEventListener('click', function(){ 
    // ... (usa html2pdf com configurações específicas)
});

// Exporta como HTML completo
$('#exportHTML').addEventListener('click', function(){
    // ... (gera blob com conteúdo HTML e baixa)
});

// Baixa conteúdo como arquivo Markdown
$('#downloadMD').addEventListener('click', function(){
    // ... (gera blob .md e baixa)
});

// Alterna tema claro/escuro
themeBtn.addEventListener('click', function(){
    // ... (salva preferência no localStorage)
});

// Listeners
// Atualiza conteúdo e posição do cursor ao digitar
editor.addEventListener('input', function(){
    render();          // Re-renderiza o conteúdo
    setCaretInfo();    // Atualiza posição do cursor
});

// Atualiza posição do cursor ao clicar
editor.addEventListener('click', setCaretInfo);

// Atualiza posição do cursor ao usar teclado
editor.addEventListener('keyup', setCaretInfo);

// Mostra ou oculta o painel de configurações
function toggleSettings() {
    const pane = $('#settingsPane');
    pane.classList.toggle('hidden');
}

$('#h1-color').addEventListener('input', (e) => {
    settings.h1Color = e.target.value;
    applySettings();
});

$('#h2-color').addEventListener('input', (e) => {
    settings.h2Color = e.target.value;
    applySettings();
});

$('#h3-color').addEventListener('input', (e) => {
    settings.h3Color = e.target.value;
    applySettings();
});

$('#h4-color').addEventListener('input', (e) => {
    settings.h4Color = e.target.value;
    applySettings();
});

$('#code-bg-color').addEventListener('input', (e) => {
    settings.codeBgColor = e.target.value;
    applySettings();
});

$('#code-text-color').addEventListener('input', (e) => {
    settings.codeTextColor = e.target.value;
    applySettings();
});

$('#latex-bg-color').addEventListener('input', (e) => {
    settings.latexBgColor = e.target.value;
    applySettings();
});

$('#margin').addEventListener('input', (e) => {
    settings.margin = e.target.value;
    $('#margin-value').textContent = e.target.value;
    applySettings();
});

$('#line-height').addEventListener('input', (e) => {
    settings.lineHeight = e.target.value;
    $('#line-height-value').textContent = e.target.value;
    applySettings();
});

$('#letter-spacing').addEventListener('input', (e) => {
    settings.letterSpacing = e.target.value;
    $('#letter-spacing-value').textContent = e.target.value;
    applySettings();
});

$('#zoom').addEventListener('input', (e) => {
    settings.zoom = e.target.value;
    $('#zoom-value').textContent = e.target.value;
    applySettings();
});

function resetSettings() {
    // Define valores padrão nos inputs
    $('#h1-color').value = '#1a1a1a';
    $('#h2-color').value = '#2563eb';
    $('#h3-color').value = '#059669';
    $('#h4-color').value = '#7c3aed';
    $('#code-bg-color').value = '#e3f2fd';
    $('#code-text-color').value = '#1e3a8a';
    $('#latex-bg-color').value = '#f3e8ff';
    $('#margin').value = 18;
    $('#line-height').value = 1.8;
    $('#letter-spacing').value = 0;
    $('#zoom').value = 100;

    // Atualiza objeto settings
    settings.h1Color = '#1a1a1a';
    settings.h2Color = '#2563eb';
    settings.h3Color = '#059669';
    settings.h4Color = '#7c3aed';
    settings.codeBgColor = '#e3f2fd';
    settings.codeTextColor = '#1e3a8a';
    settings.latexBgColor = '#f3e8ff';
    settings.margin = 18;
    settings.lineHeight = 1.8;
    settings.letterSpacing = 0;
    settings.zoom = 100;

    // Atualiza valores visuais
    $('#margin-value').textContent = 18;
    $('#line-height-value').textContent = 1.8;
    $('#letter-spacing-value').textContent = 0;
    $('#zoom-value').textContent = 100;

    applySettings();
}

//Inicialização automática
(function(){
    var saved = localStorage.getItem(STORAGE_KEY); 
    if (saved != null) editor.value = saved;

    var theme = localStorage.getItem(THEME_KEY) || 'light';
    document.body.className = theme; 
    themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';

    render(); 
    setCaretInfo(); 
    setCountInfo();
})();


// Código New3 Comentado

// Seletores principais da interface
const editor = document.getElementById('editor');
const pages = document.getElementById('pages');
const cursorInfo = document.getElementById('cursorInfo');
const countInfo = document.getElementById('countInfo');

// Chave para salvar conteúdo no armazenamento local
const STORAGE_KEY = 'fusion-editor-v4';

// Função debounce para evitar chamadas excessivas
function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Atualiza a posição do cursor (linha e coluna)
function updateCursor() {
    const pos = editor.selectionStart;
    const text = editor.value.substring(0, pos);
    const lines = text.split('\n');
    cursorInfo.textContent = `Lin ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
}

// Atualiza contador de caracteres
function updateCount() {
    countInfo.textContent = `${editor.value.length} caracteres`;
}

// Escapa caracteres HTML especiais
function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Renderiza fórmula LaTeX inline
function renderLatexInline(formula) {
    try {
        if (window.katex) {
            return katex.renderToString(formula, { displayMode: false, throwOnError: false });
        }
    } catch(e) {
        console.error('LaTeX inline error:', e);
    }
    return `$${formula}$`;
}

// Renderiza fórmula LaTeX em bloco
function renderLatexDisplay(formula) {
    try {
        if (window.katex) {
            return `<div style="text-align: center; margin: 1.5rem 0;">${katex.renderToString(formula, { displayMode: true, throwOnError: false })}</div>`;
        }
    } catch(e) {
        console.error('LaTeX display error:', e);
    }
    return `<div style="text-align: center; margin: 1.5rem 0;">$$${formula}$$</div>`;
}

// Processa conteúdo inline (LaTeX, código, links, imagens, formatação)
function parseInline(text) {
    text = text.replace(/\$([^\$\n]+)\$/g, (match, formula) => renderLatexInline(formula.trim()));
    text = text.replace(/`([^`]+)`/g, (match, code) => `<code>${escapeHtml(code)}</code>`);
    text = text.replace(/!

\[([^\]

]*)\]

\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    text = text.replace(/

\[([^\]

]+)\]

\(([^)]+)\)/g, '<a href="$2">$1</a>');
    text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    return text;
}

// Converte Markdown em HTML
function mdToHtml(md) {
    if (!md || md.trim() === '') return '<p>Digite algo no editor...</p>';

    let html = md;

    // Protege blocos de código
    const codeBlocks = [];
    html = html.replace(/``````/g, (match, lang, code) => {
        const id = `§§§CODE${codeBlocks.length}§§§`;
        codeBlocks.push(`<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`);
        return id;
    });

    // Protege blocos LaTeX display
    const latexDisplays = [];
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
        const id = `§§§LATEXD${latexDisplays.length}§§§`;
        latexDisplays.push(renderLatexDisplay(formula.trim()));
        return id;
    });

    // Processa linha por linha
    const lines = html.split('\n');
    const output = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) {
            i++;
            continue;
        }

        // Tabelas
        if (trimmed.startsWith('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
            const tableResult = parseTable(lines, i);
            output.push(tableResult.html);
            i = tableResult.nextIdx;
            continue;
        }

        // Cabeçalhos
        const headerMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const text = headerMatch[2];
            output.push(`<h${level}>${parseInline(text)}</h${level}>`);
            i++;
            continue;
        }

        // Lista não ordenada
        if (trimmed.match(/^[-*+]\s/)) {
            const items = [];
            while (i < lines.length && lines[i].trim().match(/^[-*+]\s/)) {
                const text = lines[i].trim().replace(/^[-*+]\s/, '');
                items.push(`<li>${parseInline(text)}</li>`);
                i++;
            }
            output.push(`<ul>${items.join('')}</ul>`);
            continue;
        }

        // Lista ordenada
        if (trimmed.match(/^\d+\.\s/)) {
            const items = [];
            while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
                const text = lines[i].trim().replace(/^\d+\.\s/, '');
                items.push(`<li>${parseInline(text)}</li>`);
                i++;
            }
            output.push(`<ol>${items.join('')}</ol>`);
            continue;
        }

        // Citação
        if (trimmed.startsWith('> ')) {
            const text = trimmed.replace(/^>\s*/, '');
            output.push(`<blockquote>${parseInline(text)}</blockquote>`);
            i++;
            continue;
        }

        // Linha horizontal
        if (trimmed.match(/^(---|___|\*\*\*)$/)) {
            output.push('<hr>');
            i++;
            continue;
        }

        // Parágrafo padrão
        output.push(`<p>${parseInline(trimmed)}</p>`);
        i++;
    }

    html = output.join('\n');

    // Restaura blocos protegidos
    latexDisplays.forEach((rendered, idx) => {
        html = html.replace(`§§§LATEXD${idx}§§§`, rendered);
    });

    codeBlocks.forEach((block, idx) => {
        html = html.replace(`§§§CODE${idx}§§§`, block);
    });

    return html;
}

// Converte linhas Markdown em tabela HTML
function parseTable(lines, startIdx) {
    let idx = startIdx;
    const headerLine = lines[idx++];
    const separatorLine = lines[idx++];

    const headers = headerLine.split('|').filter(h => h.trim()).map(h => h.trim());
    const aligns = separatorLine.split('|').filter(a => a.trim()).map(a => {
        a = a.trim();
        if (a.startsWith(':') && a.endsWith(':')) return 'center';
        if (a.endsWith(':')) return 'right';
        return 'left';
    });

    let html = '<table><thead><tr>';
    headers.forEach((h, i) => {
        html += `<th align="${aligns[i] || 'left'}">${parseInline(h)}</th>`;
    });
    html += '</tr></thead><tbody>';

    while (idx < lines.length && lines[idx].trim().startsWith('|')) {
        const cells = lines[idx].split('|').filter(c => c.trim()).map(c => c.trim());
        html += '<tr>';
        cells.forEach((c, i) => {
            html += `<td align="${aligns[i] || 'left'}">${parseInline(c)}</td>`;
        });
        html += '</tr>';
        idx++;
    }

    html += '</tbody></table>';
    return { html, nextIdx: idx };
}

// Renderiza conteúdo com debounce
const render = debounce(() => {
    const html = mdToHtml(editor.value);

    pages.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'page';
    const inner = document.createElement('div');
    inner.className = 'page-inner content';
    inner.innerHTML = html;
    page.appendChild(inner);
    pages.appendChild(page);

    updateCount();
    localStorage.setItem(STORAGE_KEY, editor.value);
}, 200);

// Envolve seleção com delimitador (ex: **texto**)
function wrap(delimiter) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    const before = editor.value.substring(0, start);
    const after = editor.value.substring(end);

    if (selected) {
        // Se há texto selecionado, envolve com o delimitador
        editor.value = before + delimiter + selected + delimiter + after;
        editor.selectionStart = start + delimiter.length;
        editor.selectionEnd = end + delimiter.length;
    } else {
        // Se não há seleção, insere "texto" como placeholder
        editor.value = before + delimiter + 'texto' + delimiter + after;
        editor.selectionStart = editor.selectionEnd = start + delimiter.length;
    }

    editor.focus();
    render(); // Atualiza visualização
}

function insertLine(prefix) {
    const pos = editor.selectionStart;
    const before = editor.value.substring(0, pos);
    const after = editor.value.substring(pos);

    const lastNewline = before.lastIndexOf('\n');
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;

    const beforeLine = editor.value.substring(0, lineStart);
    const afterLine = editor.value.substring(lineStart);

    editor.value = beforeLine + prefix + afterLine;
    editor.selectionStart = editor.selectionEnd = lineStart + prefix.length;
    editor.focus();
    render();
}

function insertLatex() {
    const latex = '\n$$\n\\frac{a^2 + b^2}{c} = x\n$$\n\n';
    insertAtCursor(latex);
}

function insertCode() {
    const code = '\n``````\n\n';
    insertAtCursor(code);
}

function insertAtCursor(text) {
    const pos = editor.selectionStart;
    const before = editor.value.substring(0, pos);
    const after = editor.value.substring(pos);

    editor.value = before + text + after;
    editor.selectionStart = editor.selectionEnd = pos + text.length;
    editor.focus();
    render();
}

function exportHTML() {
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Documento Exportado</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
</head>
<body>
    ${pages.innerHTML}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento.html';
    a.click();
    URL.revokeObjectURL(url);
}

// Ao digitar, atualiza cursor e renderiza
editor.addEventListener('input', () => {
    updateCursor();
    render();
});

// Ao clicar ou usar teclado, atualiza posição do cursor
editor.addEventListener('click', updateCursor);
editor.addEventListener('keyup', updateCursor);

// Atalhos de teclado: Ctrl+B para negrito, Ctrl+I para itálico
editor.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        wrap('**');
    } else if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        wrap('*');
    }
});

window.addEventListener('load', () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        editor.value = saved;
    } else {
        // Conteúdo inicial de exemplo
        editor.value = `# Guia de Bolso: LaTeX para Programadores

## 🟢 **Fundamentos do LaTeX (1-3 meses)**

Fórmula simples: $E=mc^2$

### 🟠 Truques de Formatação

| Recurso | Comando | Tradução |
|---------|---------|----------|
| Texto colorido | \`\\textcolor{red}{texto}\` | texto em vermelho |
| Margens personalizadas | \`\\usepackage[margin=1in]{geometry}\` | define margens de 2,54 cm |

**Exemplos Práticos**

\`\`\`latex
\\documentclass{article}
\\begin{document}
Este é um texto em \\textbf{negrito}.
\\end{document}
\`\`\`

### Mini Desafios

1. **Use "xcolor" para colorir uma palavra em verde.**
2. **Configure margens de 3 cm com "geometry".**

$$
\\frac{a^2 + b^2}{c^2} = 1
$$

Fórmula inline complexa: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$`;
    }

    render();        // Renderiza conteúdo inicial
    updateCursor();  // Atualiza posição do cursor
    updateCount();   // Atualiza contador de caracteres
});

// 

// Código New6 Comentado
// Elementos principais da interface
const editor = document.getElementById('editor');
const pages = document.getElementById('pages');
const cursorInfo = document.getElementById('cursorInfo');
const countInfo = document.getElementById('countInfo');

// Chave para salvar conteúdo no armazenamento local
const STORAGE_KEY = 'fusion-editor-v7';

// Dimensões da página em milímetros
const PAGE_HEIGHT = 297; // Altura padrão A4
const PAGE_PADDING = 36; // Margem total (18mm superior + 18mm inferior)
const MAX_CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING; // Altura útil para conteúdo (~261mm)

// Função debounce para evitar chamadas excessivas
function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Atualiza posição do cursor (linha e coluna)
function updateCursor() {
    const pos = editor.selectionStart;
    const text = editor.value.substring(0, pos);
    const lines = text.split('\n');
    cursorInfo.textContent = `Lin ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
}

// Atualiza contador de caracteres
function updateCount() {
    countInfo.textContent = `${editor.value.length} caracteres`;
}

// Escapa caracteres HTML especiais
function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Renderiza fórmula LaTeX inline (ex: $x^2$)
function renderLatexInline(formula) {
    try {
        if (window.katex) {
            return katex.renderToString(formula, { displayMode: false, throwOnError: false });
        }
    } catch(e) {
        console.error('LaTeX inline error:', e);
    }
    return `$${formula}$`;
}

// Renderiza fórmula LaTeX em bloco (ex: $$x^2$$)
function renderLatexDisplay(formula) {
    try {
        if (window.katex) {
            return `<div style="text-align: center; margin: 1.5rem 0;">${katex.renderToString(formula, { displayMode: true, throwOnError: false })}</div>`;
        }
    } catch(e) {
        console.error('LaTeX display error:', e);
    }
    return `<div style="text-align: center; margin: 1.5rem 0;">$$${formula}$$</div>`;
}

function parseInline(text) {
    // LaTeX inline
    text = text.replace(/\$([^\$\n]+)\$/g, (match, formula) => renderLatexInline(formula.trim()));

    // Código inline
    text = text.replace(/`([^`]+)`/g, (match, code) => `<code>${escapeHtml(code)}</code>`);

    // Imagens
    text = text.replace(/!

\[([^\]

]*)\]

\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // Links
    text = text.replace(/

\[([^\]

]+)\]

\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Negrito + itálico
    text = text.replace(/\*\*\*([^\*]+)\*\*\*/g, '<strong><em>$1</em></strong>');

    // Negrito
    text = text.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');

    // Itálico
    text = text.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

    return text;
}

function mdToHtml(md) {
    if (!md || md.trim() === '') return '<p>Digite algo no editor...</p>';

    let html = md;

    // Protege blocos de código
    const codeBlocks = [];
    html = html.replace(/``````/gm, (match, lang, code) => {
        const id = `§§§CODE${codeBlocks.length}§§§`;
        const langClass = (lang && lang.trim()) || 'plaintext';
        codeBlocks.push(`<pre><code class="language-${langClass}">${escapeHtml(code)}</code></pre>`);
        return id;
    });

    // Protege blocos LaTeX display
    const latexDisplays = [];
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
        const id = `§§§LATEXD${latexDisplays.length}§§§`;
        latexDisplays.push(renderLatexDisplay(formula.trim()));
        return id;
    });

    // Processa linha por linha
    const lines = html.split('\n');
    const output = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) { i++; continue; }

        // Tabela
        if (trimmed.startsWith('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
            const tableResult = parseTable(lines, i);
            output.push(tableResult.html);
            i = tableResult.nextIdx;
            continue;
        }

        // Cabeçalhos
        const headerMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const text = headerMatch[2];
            output.push(`<h${level}>${parseInline(text)}</h${level}>`);
            i++;
            continue;
        }

        // Listas
        if (trimmed.match(/^[-*+]\s/)) {
            const items = [];
            while (i < lines.length && lines[i].trim().match(/^[-*+]\s/)) {
                const text = lines[i].trim().replace(/^[-*+]\s/, '');
                items.push(`<li>${parseInline(text)}</li>`);
                i++;
            }
            output.push(`<ul>${items.join('')}</ul>`);
            continue;
        }

        if (trimmed.match(/^\d+\.\s/)) {
            const items = [];
            while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
                const text = lines[i].trim().replace(/^\d+\.\s/, '');
                items.push(`<li>${parseInline(text)}</li>`);
                i++;
            }
            output.push(`<ol>${items.join('')}</ol>`);
            continue;
        }

        // Citação
        if (trimmed.startsWith('> ')) {
            const text = trimmed.replace(/^>\s*/, '');
            output.push(`<blockquote>${parseInline(text)}</blockquote>`);
            i++;
            continue;
        }

        // Linha horizontal
        if (trimmed.match(/^(---|___|\*\*\*)$/)) {
            output.push('<hr>');
            i++;
            continue;
        }

        // Parágrafo padrão
        output.push(`<p>${parseInline(trimmed)}</p>`);
        i++;
    }

    // Restaura blocos protegidos
    html = output.join('\n');
    latexDisplays.forEach((rendered, idx) => {
        html = html.replace(`§§§LATEXD${idx}§§§`, rendered);
    });
    codeBlocks.forEach((block, idx) => {
        html = html.replace(`§§§CODE${idx}§§§`, block);
    });

    return html;
}

function parseTable(lines, startIdx) {
    let idx = startIdx;
    const headerLine = lines[idx++];
    const separatorLine = lines[idx++];

    // Divide cabeçalhos e detecta alinhamentos
    const headers = headerLine.split('|').filter(h => h.trim()).map(h => h.trim());
    const aligns = separatorLine.split('|').filter(a => a.trim()).map(a => {
        a = a.trim();
        if (a.startsWith(':') && a.endsWith(':')) return 'center';
        if (a.endsWith(':')) return 'right';
        return 'left';
    });

    // Monta HTML da tabela
    let html = '<table><thead><tr>';
    headers.forEach((h, i) => {
        html += `<th align="${aligns[i] || 'left'}">${parseInline(h)}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Processa linhas de dados
    while (idx < lines.length && lines[idx].trim().startsWith('|')) {
        const cells = lines[idx].split('|').filter(c => c.trim()).map(c => c.trim());
        html += '<tr>';
        cells.forEach((c, i) => {
            html += `<td align="${aligns[i] || 'left'}">${parseInline(c)}</td>`;
        });
        html += '</tr>';
        idx++;
    }

    html += '</tbody></table>';
    return { html, nextIdx: idx };
}

function createPage() {
    // Cria estrutura de uma página com conteúdo interno
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page';
    const inner = document.createElement('div');
    inner.className = 'page-inner content';
    pageDiv.appendChild(inner);
    return { page: pageDiv, inner };
}

function paginateContent(html) {
    // Cria div temporária invisível para medir altura
    const tempDiv = document.createElement('div');
    tempDiv.className = 'content';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.position = 'absolute';
    tempDiv.style.width = '174mm'; // largura útil (210mm - 36mm)
    tempDiv.innerHTML = html;
    document.body.appendChild(tempDiv);

    const elements = Array.from(tempDiv.children);
    pages.innerHTML = '';

    let { page, inner } = createPage();
    pages.appendChild(page);

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const tagName = el.tagName;

        // Começa nova página em H1 ou H2 (exceto H1 seguido de H2)
        if ((tagName === 'H1' || tagName === 'H2') && inner.children.length > 0) {
            const nextEl = elements[i + 1];
            if (!(tagName === 'H1' && nextEl && nextEl.tagName === 'H2')) {
                ({ page, inner } = createPage());
                pages.appendChild(page);
            }
        }

        inner.appendChild(el.cloneNode(true));

        // Se ultrapassou altura da página, move para nova
        if (inner.scrollHeight > inner.clientHeight) {
            inner.removeChild(inner.lastChild);
            ({ page, inner } = createPage());
            pages.appendChild(page);
            inner.appendChild(el.cloneNode(true));
        }
    }

    tempDiv.remove(); // Remove div temporária
}

const render = debounce(() => {
    const html = mdToHtml(editor.value); // Converte Markdown para HTML
    paginateContent(html);               // Divide em páginas
    updateCount();                       // Atualiza contador de caracteres
    localStorage.setItem(STORAGE_KEY, editor.value); // Salva conteúdo
}, 200);

// Envolve seleção com delimitador (ex: **texto** para negrito)
function wrap(delimiter) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    const before = editor.value.substring(0, start);
    const after = editor.value.substring(end);

    if (selected) {
        editor.value = before + delimiter + selected + delimiter + after;
        editor.selectionStart = start + delimiter.length;
        editor.selectionEnd = end + delimiter.length;
    } else {
        editor.value = before + delimiter + 'texto' + delimiter + after;
        editor.selectionStart = editor.selectionEnd = start + delimiter.length;
    }

    editor.focus();
    render();
}

// Insere prefixo no início da linha atual (ex: "- " para listas)
function insertLine(prefix) {
    const pos = editor.selectionStart;
    const before = editor.value.substring(0, pos);
    const after = editor.value.substring(pos);

    const lastNewline = before.lastIndexOf('\n');
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;

    const beforeLine = editor.value.substring(0, lineStart);
    const afterLine = editor.value.substring(lineStart);

    editor.value = beforeLine + prefix + afterLine;
    editor.selectionStart = editor.selectionEnd = lineStart + prefix.length;
    editor.focus();
    render();
}

// Insere tabela Markdown de exemplo
function insertTable() {
    const table = '\n| Coluna A | Coluna B | Coluna C |\n|:---|:---:|---:|\n| Esquerda | Centro | Direita |\n| A1 | B1 | C1 |\n\n';
    insertAtCursor(table);
}

// Insere bloco LaTeX de exemplo
function insertLatex() {
    const latex = '\n$$\n\\frac{a^2 + b^2}{c} = x\n$$\n\n';
    insertAtCursor(latex);
}

// Insere bloco de código vazio
function insertCode() {
    const code = '\n``````\n\n';
    insertAtCursor(code);
}

// Insere texto diretamente na posição do cursor
function insertAtCursor(text) {
    const pos = editor.selectionStart;
    const before = editor.value.substring(0, pos);
    const after = editor.value.substring(pos);

    editor.value = before + text + after;
    editor.selectionStart = editor.selectionEnd = pos + text.length;
    editor.focus();
    render();
}

function exportHTML() {
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Documento Exportado</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
</head>
<body>
    ${pages.innerHTML}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento.html';
    a.click();
    URL.revokeObjectURL(url);
}

// Ao digitar, atualiza cursor e renderiza conteúdo
editor.addEventListener('input', () => {
    updateCursor();
    render();
});

// Ao clicar ou usar teclado, atualiza posição do cursor
editor.addEventListener('click', updateCursor);
editor.addEventListener('keyup', updateCursor);

// Atalhos de teclado: Ctrl+B para negrito, Ctrl+I para itálico
editor.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        wrap('**');
    } else if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        wrap('*');
    }
});

window.addEventListener('load', () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        editor.value = saved;
    } else {
        // Conteúdo inicial de exemplo
        editor.value = `# Guia de Bolso: LaTeX para Programadores

## 🟢 **Fundamentos do LaTeX (1-3 meses)**

Fórmula simples: $E=mc^2$

### 🟠 Truques de Formatação

| Recurso | Comando | Tradução |
|---------|---------|----------|
| Texto colorido | \`\\textcolor{red}{texto}\` | texto em vermelho |
| Margens | \`\\usepackage[margin=1in]{geometry}\` | margens de 2,54 cm |

**Exemplos Práticos**

\`\`\`latex
\\documentclass{article}
\\begin{document}
Este é um texto em \\textbf{negrito}.
\\end{document}
\`\`\`

### Mini Desafios

1. **Use "xcolor"** para colorir uma palavra em verde.
2. *Configure margens* de 3 cm com "geometry".

$$
\\frac{a^2 + b^2}{c^2} = 1
$$

Fórmula inline: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$

# Novo Capítulo

## Subtítulo do Capítulo

Aqui começa uma nova seção que deve estar em uma nova página.
`;
    }

    render();        // Renderiza conteúdo inicial
    updateCursor();  // Atualiza posição do cursor
    updateCount();   // Atualiza contador de caracteres
});

// Código New8 Comentado
// Elementos da interface
const editor = document.getElementById('editor');       // Área de edição de texto Markdown
const pages = document.getElementById('pages');         // Área onde o conteúdo renderizado é exibido em páginas
const cursorInfo = document.getElementById('cursorInfo'); // Exibe linha e coluna do cursor
const countInfo = document.getElementById('countInfo');   // Exibe contagem de caracteres

// Chave usada para salvar o conteúdo no armazenamento local
const STORAGE_KEY = 'fusion-editor-v10-code-fixed';

// Função debounce: evita chamadas excessivas de uma função
function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Atualiza a posição do cursor (linha e coluna)
function updateCursor() {
    const pos = editor.selectionStart;
    const text = editor.value.substring(0, pos);
    const lines = text.split('\n');
    cursorInfo.textContent = `Lin ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
}

// Atualiza o contador de caracteres
function updateCount() {
    countInfo.textContent = `${editor.value.length} caracteres`;
}

// Escapa caracteres HTML especiais para evitar conflitos na renderização
function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Renderiza fórmula LaTeX inline (ex: $x^2$)
function renderLatexInline(formula) {
    try {
        if (window.katex) {
            return katex.renderToString(formula, { displayMode: false, throwOnError: false });
        }
    } catch(e) {
        console.error('LaTeX inline error:', e);
    }
    return `$${formula}$`; // Retorna original se falhar
}

// Renderiza fórmula LaTeX em bloco (ex: $$x^2$$)
function renderLatexDisplay(formula) {
    try {
        if (window.katex) {
            return `<div style="text-align: center; margin: 1.5rem 0;">${katex.renderToString(formula, { displayMode: true, throwOnError: false })}</div>`;
        }
    } catch(e) {
        console.error('LaTeX display error:', e);
    }
    return `<div style="text-align: center; margin: 1.5rem 0;">$$${formula}$$</div>`; // Retorna original se falhar
}

function parseInline(text) {
    // Renderiza LaTeX inline
    text = text.replace(/\$([^\$\n]+)\$/g, (match, formula) => {
        return renderLatexInline(formula.trim());
    });

    // Código inline
    text = text.replace(/`([^`]+)`/g, (match, code) => {
        return `<code>${escapeHtml(code)}</code>`;
    });

    // Imagens Markdown
    text = text.replace(/!

\[([^\]

]*)\]

\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // Links Markdown
    text = text.replace(/

\[([^\]

]+)\]

\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Negrito + itálico
    text = text.replace(/\*\*\*([^\*]+)\*\*\*/g, '<strong><em>$1</em></strong>');

    // Negrito
    text = text.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');

    // Itálico
    text = text.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

    return text;
}

function mdToHtml(md) {
    if (!md || md.trim() === '') return '<p>Digite algo no editor...</p>';

    let html = md;

    // Protege blocos de código com placeholders únicos
    const codeBlocks = [];
    html = html.replace(/``````/gm, (match, lang, code) => {
        const id = `§CODE§${codeBlocks.length}§`;
        const langClass = (lang && lang.trim()) || 'plaintext';
        codeBlocks.push(`<pre><code class="language-${langClass}">${escapeHtml(code)}</code></pre>`);
        return '\n' + id + '\n';
    });

    // Protege blocos LaTeX display com placeholders
    const latexDisplays = [];
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
        const id = `§LATEX§${latexDisplays.length}§`;
        latexDisplays.push(renderLatexDisplay(formula.trim()));
        return '\n' + id + '\n';
    });

    // Processa linha por linha
    const lines = html.split('\n');
    const output = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) {
            i++;
            continue;
        }

        // Mantém os placeholders intactos
        if (trimmed.startsWith('§CODE§') || trimmed.startsWith('§LATEX§')) {
            output.push(trimmed);
            i++;
            continue;
        }

        // Tabelas Markdown
        if (trimmed.startsWith('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
            const tableResult = parseTable(lines, i);
            output.push(tableResult.html);
            i = tableResult.nextIdx;
            continue;
        }

        // Cabeçalhos (#, ##, ###, etc.)
        const headerMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const text = headerMatch[2];
            output.push(`<h${level}>${parseInline(text)}</h${level}>`);
            i++;
            continue;
        }

        // Lista não ordenada
        if (trimmed.match(/^[-*+]\s/)) {
            const items = [];
            while (i < lines.length && lines[i].trim().match(/^[-*+]\s/)) {
                const text = lines[i].trim().replace(/^[-*+]\s/, '');
                items.push(`<li>${parseInline(text)}</li>`);
                i++;
            }
            output.push(`<ul>${items.join('')}</ul>`);
            continue;
        }

        // Lista ordenada
        if (trimmed.match(/^\d+\.\s/)) {
            const items = [];
            while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
                const text = lines[i].trim().replace(/^\d+\.\s/, '');
                items.push(`<li>${parseInline(text)}</li>`);
                i++;
            }
            output.push(`<ol>${items.join('')}</ol>`);
            continue;
        }

        // Citações
        if (trimmed.startsWith('> ')) {
            const text = trimmed.replace(/^>\s*/, '');
            output.push(`<blockquote>${parseInline(text)}</blockquote>`);
            i++;
            continue;
        }

        // Linha horizontal
        if (trimmed.match(/^(---|___|\*\*\*)$/)) {
            output.push('<hr>');
            i++;
            continue;
        }

        // Parágrafo padrão
        output.push(`<p>${parseInline(trimmed)}</p>`);
        i++;
    }

    // Restaura os blocos protegidos
    html = output.join('\n');
    latexDisplays.forEach((rendered, idx) => {
        html = html.replace(`§LATEX§${idx}§`, rendered);
    });
    codeBlocks.forEach((block, idx) => {
        html = html.replace(`§CODE§${idx}§`, block);
    });

    return html;
}

function parseTable(lines, startIdx) {
    let idx = startIdx;
    const headerLine = lines[idx++];
    const separatorLine = lines[idx++];

    // Divide cabeçalhos e detecta alinhamentos
    const headers = headerLine.split('|').filter(h => h.trim()).map(h => h.trim());
    const aligns = separatorLine.split('|').filter(a => a.trim()).map(a => {
        a = a.trim();
        if (a.startsWith(':') && a.endsWith(':')) return 'center';
        if (a.endsWith(':')) return 'right';
        return 'left';
    });

    // Monta HTML da tabela
    let html = '<table><thead><tr>';
    headers.forEach((h, i) => {
        html += `<th align="${aligns[i] || 'left'}">${parseInline(h)}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Processa linhas de dados
    while (idx < lines.length && lines[idx].trim().startsWith('|')) {
        const cells = lines[idx].split('|').filter(c => c.trim()).map(c => c.trim());
        html += '<tr>';
        cells.forEach((c, i) => {
            html += `<td align="${aligns[i] || 'left'}">${parseInline(c)}</td>`;
        });
        html += '</tr>';
        idx++;
    }

    html += '</tbody></table>';
    return { html, nextIdx: idx };
}

function createPage() {
    // Cria a estrutura de uma página com conteúdo interno
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page'; // Classe usada para estilizar a página

    const inner = document.createElement('div');
    inner.className = 'page-inner content'; // Área interna da página

    pageDiv.appendChild(inner);
    return { page: pageDiv, inner }; // Retorna os dois elementos para uso posterior
}

function paginateContent(html) {
    // Cria uma div temporária invisível para medir altura do conteúdo
    const tempDiv = document.createElement('div');
    tempDiv.className = 'content';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.position = 'absolute';
    tempDiv.style.width = '174mm'; // Largura útil da página (210mm - 36mm de margem)
    tempDiv.innerHTML = html;
    document.body.appendChild(tempDiv);

    const elements = Array.from(tempDiv.children); // Todos os elementos renderizados
    pages.innerHTML = ''; // Limpa páginas anteriores

    let { page, inner } = createPage();
    pages.appendChild(page);

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const tagName = el.tagName;

        // Começa nova página em H1 ou H2, exceto se H1 for seguido de H2
        if ((tagName === 'H1' || tagName === 'H2') && inner.children.length > 0) {
            const nextEl = elements[i + 1];
            if (!(tagName === 'H1' && nextEl && nextEl.tagName === 'H2')) {
                ({ page, inner } = createPage());
                pages.appendChild(page);
            }
        }

        const clonedEl = el.cloneNode(true);
        inner.appendChild(clonedEl);

        // Se ultrapassou altura da página, move para nova
        if (inner.scrollHeight > inner.clientHeight) {
            inner.removeChild(clonedEl);
            ({ page, inner } = createPage());
            pages.appendChild(page);
            inner.appendChild(clonedEl.cloneNode(true));
        }
    }

    // Remove páginas vazias no final
    const allPages = pages.querySelectorAll('.page');
    allPages.forEach(p => {
        const innerContent = p.querySelector('.page-inner');
        if (!innerContent || innerContent.children.length === 0) {
            p.remove();
        }
    });

    tempDiv.remove(); // Remove div temporária
}

const render = debounce(() => {
    const html = mdToHtml(editor.value);     // Converte Markdown para HTML
    paginateContent(html);                   // Divide conteúdo em páginas
    updateCount();                           // Atualiza contador de caracteres
    localStorage.setItem(STORAGE_KEY, editor.value); // Salva conteúdo no navegador
}, 200);

// Envolve seleção com delimitador (ex: **texto** para negrito)
function wrap(delimiter) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    const before = editor.value.substring(0, start);
    const after = editor.value.substring(end);

    if (selected) {
        editor.value = before + delimiter + selected + delimiter + after;
        editor.selectionStart = start + delimiter.length;
        editor.selectionEnd = end + delimiter.length;
    } else {
        editor.value = before + delimiter + 'texto' + delimiter + after;
        editor.selectionStart = editor.selectionEnd = start + delimiter.length;
    }

    editor.focus();
    render(); // Atualiza visualização
}

// Insere prefixo no início da linha atual (ex: "- " para listas)
function insertLine(prefix) {
    const pos = editor.selectionStart;
    const before = editor.value.substring(0, pos);
    const after = editor.value.substring(pos);

    const lastNewline = before.lastIndexOf('\n');
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;

    const beforeLine = editor.value.substring(0, lineStart);
    const afterLine = editor.value.substring(lineStart);

    editor.value = beforeLine + prefix + afterLine;
    editor.selectionStart = editor.selectionEnd = lineStart + prefix.length;
    editor.focus();
    render();
}

// Insere tabela Markdown de exemplo
function insertTable() {
    const table = '\n| Coluna A | Coluna B | Coluna C |\n|:---|:---:|---:|\n| Esquerda | Centro | Direita |\n| A1 | B1 | C1 |\n\n';
    insertAtCursor(table);
}

// Insere bloco LaTeX de exemplo
function insertLatex() {
    const latex = '\n$$\n\\frac{a^2 + b^2}{c} = x\n$$\n\n';
    insertAtCursor(latex);
}

// Insere bloco de código vazio
function insertCode() {
    const code = '\n``````\n\n';
    insertAtCursor(code);
}

// Insere texto diretamente na posição do cursor
function insertAtCursor(text) {
    const pos = editor.selectionStart;
    const before = editor.value.substring(0, pos);
    const after = editor.value.substring(pos);

    editor.value = before + text + after;
    editor.selectionStart = editor.selectionEnd = pos + text.length;
    editor.focus();
    render();
}

function exportHTML() {
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Documento Exportado</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
</head>
<body>
    ${pages.innerHTML}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento.html';
    a.click();
    URL.revokeObjectURL(url);
}

// Ao digitar, atualiza cursor e renderiza conteúdo
editor.addEventListener('input', () => {
    updateCursor();
    render();
});

// Ao clicar ou usar teclado, atualiza posição do cursor
editor.addEventListener('click', updateCursor);
editor.addEventListener('keyup', updateCursor);

// Atalhos de teclado: Ctrl+B para negrito, Ctrl+I para itálico
editor.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        wrap('**');
    } else if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        wrap('*');
    }
});

window.addEventListener('load', () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        editor.value = saved;
    } else {
        // Conteúdo inicial de exemplo
        editor.value = `# Guia de Bolso: LaTeX

## 🟢 Fundamentos

Fórmula: $E=mc^2$

**Texto em negrito** e *itálico*

### Código Python

\`\`\`python
def hello():
    print("Hello World!")
\`\`\`

### Código LaTeX

\`\`\`latex
\\documentclass{article}
\\begin{document}
Este é um texto em \\textbf{negrito}.
\\end{document}
\`\`\`

$$
\\frac{a^2 + b^2}{c^2} = 1
$$
`;
    }

    render();        // Renderiza conteúdo inicial
    updateCursor();  // Atualiza posição do cursor
    updateCount();   // Atualiza contador de caracteres
});


// Código C4 Comentado
// Elementos da interface
const editor = document.getElementById('editor');
const pages = document.getElementById('pages');
const cursorInfo = document.getElementById('cursorInfo');
const countInfo = document.getElementById('countInfo');

// Chave de armazenamento local
const STORAGE_KEY = 'fusion-editor-v10-code-fixed';

// Função debounce para evitar renderizações excessivas
function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Atualiza posição do cursor (linha e coluna)
function updateCursor() {
    const pos = editor.selectionStart;
    const text = editor.value.substring(0, pos);
    const lines = text.split('\n');
    cursorInfo.textContent = `Lin ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
}

// Atualiza contador de caracteres
function updateCount() {
    countInfo.textContent = `${editor.value.length} caracteres`;
}

// Escapa caracteres HTML especiais
function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Renderiza LaTeX inline (ex: $x^2$)
function renderLatexInline(formula) {
    try {
        if (window.katex) {
            return katex.renderToString(formula, { displayMode: false, throwOnError: false });
        }
    } catch(e) {
        console.error('LaTeX inline error:', e);
    }
    return `$${formula}$`; // Retorna original se falhar
}

// Renderiza LaTeX em bloco (ex: $$x^2$$)
function renderLatexDisplay(formula) {
    try {
        if (window.katex) {
            return `<div style="text-align: center; margin: 1.5rem 0;">${katex.renderToString(formula, { displayMode: true, throwOnError: false })}</div>`;
        }
    } catch(e) {
        console.error('LaTeX display error:', e);
    }
    return `<div style="text-align: center; margin: 1.5rem 0;">$$${formula}$$</div>`;
}

function parseInline(text) {
    // Renderiza LaTeX inline
    text = text.replace(/\$([^\$\n]+)\$/g, (match, formula) => {
        return renderLatexInline(formula.trim());
    });

    // Código inline
    text = text.replace(/`([^`]+)`/g, (match, code) => {
        return `<code>${escapeHtml(code)}</code>`;
    });

    // Imagens
    text = text.replace(/!

\[([^\]

]*)\]

\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // Links
    text = text.replace(/

\[([^\]

]+)\]

\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Negrito + itálico
    text = text.replace(/\*\*\*([^\*]+)\*\*\*/g, '<strong><em>$1</em></strong>');

    // Negrito
    text = text.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');

    // Itálico
    text = text.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

    return text;
}

function mdToHtml(md) {
    if (!md || md.trim() === '') return '<p>Digite algo no editor...</p>';

    let html = md;

    // Protege blocos de código com placeholders
    const codeBlocks = [];
    html = html.replace(/``````/gm, (match, lang, code) => {
        const id = `§CODE§${codeBlocks.length}§`;
        const langClass = (lang && lang.trim()) || 'plaintext';
        codeBlocks.push(`<pre><code class="language-${langClass}">${escapeHtml(code)}</code></pre>`);
        return '\n' + id + '\n';
    });

    // Protege blocos LaTeX com placeholders
    const latexDisplays = [];
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
        const id = `§LATEX§${latexDisplays.length}§`;
        latexDisplays.push(renderLatexDisplay(formula.trim()));
        return '\n' + id + '\n';
    });

    // Processa linha por linha
    const lines = html.split('\n');
    const output = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed) { i++; continue; }

        // Mantém placeholders intactos
        if (trimmed.startsWith('§CODE§') || trimmed.startsWith('§LATEX§')) {
            output.push(trimmed);
            i++;
            continue;
        }

        // Tabelas
        if (trimmed.startsWith('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
            const tableResult = parseTable(lines, i);
            output.push(tableResult.html);
            i = tableResult.nextIdx;
            continue;
        }

        // Cabeçalhos
        const headerMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const text = headerMatch[2];
            output.push(`<h${level}>${parseInline(text)}</h${level}>`);
            i++;
            continue;
        }

        // Listas
        if (trimmed.match(/^[-*+]\s/)) {
            const items = [];
            while (i < lines.length && lines[i].trim().match(/^[-*+]\s/)) {
                const text = lines[i].trim().replace(/^[-*+]\s/, '');
                items.push(`<li>${parseInline(text)}</li>`);
                i++;
            }
            output.push(`<ul>${items.join('')}</ul>`);
            continue;
        }

        if (trimmed.match(/^\d+\.\s/)) {
            const items = [];
            while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
                const text = lines[i].trim().replace(/^\d+\.\s/, '');
                items.push(`<li>${parseInline(text)}</li>`);
                i++;
            }
            output.push(`<ol>${items.join('')}</ol>`);
            continue;
        }

        // Citações
        if (trimmed.startsWith('> ')) {
            const text = trimmed.replace(/^>\s*/, '');
            output.push(`<blockquote>${parseInline(text)}</blockquote>`);
            i++;
            continue;
        }

        // Linha horizontal
        if (trimmed.match(/^(---|___|\*\*\*)$/)) {
            output.push('<hr>');
            i++;
            continue;
        }

        // Parágrafo padrão
        output.push(`<p>${parseInline(trimmed)}</p>`);
        i++;
    }

    html = output.join('\n');

    // Restaura blocos protegidos
    latexDisplays.forEach((rendered, idx) => {
        html = html.replace(`§LATEX§${idx}§`, rendered);
    });
    codeBlocks.forEach((block, idx) => {
        html = html.replace(`§CODE§${idx}§`, block);
    });

    return html;
}

function parseTable(lines, startIdx) {
    let idx = startIdx;
    const headerLine = lines[idx++];
    const separatorLine = lines[idx++];

    // Divide cabeçalhos e detecta alinhamentos
    const headers = headerLine.split('|').filter(h => h.trim()).map(h => h.trim());
    const aligns = separatorLine.split('|').filter(a => a.trim()).map(a => {
        a = a.trim();
        if (a.startsWith(':') && a.endsWith(':')) return 'center';
        if (a.endsWith(':')) return 'right';
        return 'left';
    });

    // Monta HTML da tabela
    let html = '<table><thead><tr>';
    headers.forEach((h, i) => {
        html += `<th align="${aligns[i] || 'left'}">${parseInline(h)}</th>`;
    });
    html += '</tr></thead><tbody>';

    // Processa linhas de dados
    while (idx < lines.length && lines[idx].trim().startsWith('|')) {
        const cells = lines[idx].split('|').filter(c => c.trim()).map(c => c.trim());
        html += '<tr>';
        cells.forEach((c, i) => {
            html += `<td align="${aligns[i] || 'left'}">${parseInline(c)}</td>`;
        });
        html += '</tr>';
        idx++;
    }

    html += '</tbody></table>';
    return { html, nextIdx: idx };
}

function createPage() {
    // Cria estrutura de uma página com conteúdo interno
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page';

    const inner = document.createElement('div');
    inner.className = 'page-inner content';

    pageDiv.appendChild(inner);
    return { page: pageDiv, inner };
}

function paginateContent(html) {
    // Cria div temporária invisível para medir altura do conteúdo
    const tempDiv = document.createElement('div');
    tempDiv.className = 'content';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.position = 'absolute';
    tempDiv.style.width = '174mm';
    tempDiv.innerHTML = html;
    document.body.appendChild(tempDiv);

    const elements = Array.from(tempDiv.children);
    pages.innerHTML = '';

    let { page, inner } = createPage();
    pages.appendChild(page);

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const tagName = el.tagName;

        // Começa nova página em H1 ou H2, exceto se H1 for seguido de H2
        if ((tagName === 'H1' || tagName === 'H2') && inner.children.length > 0) {
            const nextEl = elements[i + 1];
            if (!(tagName === 'H1' && nextEl && nextEl.tagName === 'H2')) {
                ({ page, inner } = createPage());
                pages.appendChild(page);
            }
        }

        const clonedEl = el.cloneNode(true);
        inner.appendChild(clonedEl);

        // Se ultrapassou altura da página, move para nova
        if (inner.scrollHeight > inner.clientHeight) {
            inner.removeChild(clonedEl);
            ({ page, inner } = createPage());
            pages.appendChild(page);
            inner.appendChild(clonedEl.cloneNode(true));
        }
    }

    // Remove páginas vazias no final
    const allPages = pages.querySelectorAll('.page');
    allPages.forEach(p => {
        const innerContent = p.querySelector('.page-inner');
        if (!innerContent || innerContent.children.length === 0) {
            p.remove();
        }
    });

    tempDiv.remove();
}

const render = debounce(() => {
    const html = mdToHtml(editor.value);     // Converte Markdown para HTML
    paginateContent(html);                   // Divide conteúdo em páginas
    updateCount();                           // Atualiza contador de caracteres
    localStorage.setItem(STORAGE_KEY, editor.value); // Salva conteúdo no navegador
}, 200);


// Envolve seleção com delimitador (ex: **texto** para negrito)
function wrap(delimiter) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    const before = editor.value.substring(0, start);
    const after = editor.value.substring(end);

    if (selected) {
        editor.value = before + delimiter + selected + delimiter + after;
        editor.selectionStart = start + delimiter.length;
        editor.selectionEnd = end + delimiter.length;
    } else {
        editor.value = before + delimiter + 'texto' + delimiter + after;
        editor.selectionStart = editor.selectionEnd = start + delimiter.length;
    }

    editor.focus();
    render(); // Atualiza visualização
}

// Insere prefixo no início da linha atual (ex: "- " para listas)
function insertLine(prefix) {
    const pos = editor.selectionStart;
    const before = editor.value.substring(0, pos);
    const after = editor.value.substring(pos);

    const lastNewline = before.lastIndexOf('\n');
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;

    const beforeLine = editor.value.substring(0, lineStart);
    const afterLine = editor.value.substring(lineStart);

    editor.value = beforeLine + prefix + afterLine;
    editor.selectionStart = editor.selectionEnd = lineStart + prefix.length;
    editor.focus();
    render();
}

// Insere tabela Markdown de exemplo
function insertTable() {
    const table = '\n| Coluna A | Coluna B | Coluna C |\n|:---|:---:|---:|\n| Esquerda | Centro | Direita |\n| A1 | B1 | C1 |\n\n';
    insertAtCursor(table);
}

// Insere bloco LaTeX de exemplo
function insertLatex() {
    const latex = '\n$$\n\\frac{a^2 + b^2}{c} = x\n$$\n\n';
    insertAtCursor(latex);
}

// Insere bloco de código vazio
function insertCode() {
    const code = '\n``````\n\n';
    insertAtCursor(code);
}

// Insere texto diretamente na posição do cursor
function insertAtCursor(text) {
    const pos = editor.selectionStart;
    const before = editor.value.substring(0, pos);
    const after = editor.value.substring(pos);

    editor.value = before + text + after;
    editor.selectionStart = editor.selectionEnd = pos + text.length;
    editor.focus();
    render();
}

function exportHTML() {
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Documento Exportado</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
</head>
<body>
    ${pages.innerHTML}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento.html';
    a.click();
    URL.revokeObjectURL(url);
}

// Ao digitar, atualiza cursor e renderiza conteúdo
editor.addEventListener('input', () => {
    updateCursor();
    render();
});

// Ao clicar ou usar teclado, atualiza posição do cursor
editor.addEventListener('click', updateCursor);
editor.addEventListener('keyup', updateCursor);

// Atalhos de teclado: Ctrl+B para negrito, Ctrl+I para itálico
editor.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        wrap('**');
    } else if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        wrap('*');
    }
});

window.addEventListener('load', () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        editor.value = saved;
    } else {
        // Conteúdo inicial de exemplo
        editor.value = `# Guia de Bolso: LaTeX

## 🟢 Fundamentos

Fórmula: $E=mc^2$

**Texto em negrito** e *itálico*

### Código Python

\`\`\`python
def hello():
    print("Hello World!")
\`\`\`

### Código LaTeX

\`\`\`latex
\\documentclass{article}
\\begin{document}
Este é um texto em \\textbf{negrito}.
\\end{document}
\`\`\`

$$
\\frac{a^2 + b^2}{c^2} = 1
$$
`;
    }

    render();        // Renderiza conteúdo inicial
    updateCursor();  // Atualiza posição do cursor
    updateCount();   // Atualiza contador de caracteres
});

