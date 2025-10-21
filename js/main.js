/* =========================================================
   Cosmos Editor — JS definitivo com toolbar completa + novas funções
   ========================================================= */

/* ==========================
   Elementos principais
   ========================== */
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebar');
const sheet = document.getElementById('sheet');
const zoomRange = document.getElementById('zoomRange');
const zoomLabel = document.getElementById('zoomLabel');
const wordCountEl = document.getElementById('wordCount');

let collapsed = false;

/* ==========================
   Sidebar collapse
   ========================== */
toggleSidebarBtn.addEventListener('click', () => {
  collapsed = !collapsed;
  sidebar.classList.toggle('collapsed', collapsed);
  toggleSidebarBtn.querySelector('.material-icon').textContent = collapsed ? 'chevron_right' : 'chevron_left';
  toggleSidebarBtn.querySelector('.text').textContent = collapsed ? '' : 'Recolher';
});

/* ==========================
   Toolbar — ação de todos os botões
   ========================== */
document.querySelectorAll('.icon-btn[data-cmd]').forEach(btn => {
  const cmd = btn.getAttribute('data-cmd');

  btn.addEventListener('click', () => {
    const page = getCurrentPage();

    switch(cmd){
      /* Formatação básica */
      case 'bold': case 'italic': case 'underline': case 'strikeThrough':
        document.execCommand(cmd); break;
      case 'subscriptText': document.execCommand('subscript'); break;
      case 'superscriptText': document.execCommand('superscript'); break;

      /* Fonte e estilo */
      case 'selectColor':
        const color = prompt('Escolha a cor da fonte (hex ou nome):', '#000000');
        if(color) document.execCommand('foreColor', false, color);
        break;
      case 'borderColor':
        const border = prompt('Escolha a cor da borda (hex ou nome):', '#000000');
        if(border){
          const sel = window.getSelection();
          if(sel.rangeCount){
            const span = document.createElement('span');
            span.style.border = `1px solid ${border}`;
            span.appendChild(sel.getRangeAt(0).extractContents());
            sel.getRangeAt(0).insertNode(span);
          }
        }
        break;
      case 'rotateText':
        const block = getCurrentBlock();
        if(block){
          let angle = parseInt(block.dataset.rotate || '0');
          angle = (angle + 90) % 360; // incrementa 90°
          block.style.transform = `rotate(${angle}deg)`;
          block.dataset.rotate = angle;
        }
        break;
      case 'sortText':
        const b = getCurrentBlock();
        if(b){
          let lines = b.innerText.split(/\n/).filter(l=>l.trim().length>0);
          lines.sort((a,b)=>a.localeCompare(b));
          b.innerHTML = lines.join('<br>');
        }
        break;
      case 'selectTitle':
        const level = prompt('Digite o nível do título (1-6):', '2');
        if(level) document.execCommand('formatBlock', false, `H${level}`); break;

      /* Alinhamento */
      case 'justifyLeft': case 'justifyCenter': case 'justifyRight': case 'justifyFull':
        document.execCommand(cmd); break;

      /* Espaçamento e listas */
      case 'formatSpacing':
        const blockSpacing = getCurrentBlock();
        if(blockSpacing){
          const current = window.getComputedStyle(blockSpacing).lineHeight;
          blockSpacing.style.lineHeight = current === 'normal' ? '1.5' : 'normal';
        }
        break;
      case 'insertUnorderedList': case 'insertOrderedList':
        document.execCommand(cmd); break;
      case 'insertTable':
        const rows = parseInt(prompt('Número de linhas:', 2));
        const cols = parseInt(prompt('Número de colunas:', 2));
        if(rows>0 && cols>0){
          const table = document.createElement('table');
          table.style.width = '100%';
          table.style.borderCollapse = 'collapse';
          for(let r=0;r<rows;r++){
            const tr = document.createElement('tr');
            for(let c=0;c<cols;c++){
              const td = document.createElement('td');
              td.style.border = '1px solid #000';
              td.style.padding = '4px';
              td.innerHTML = '&nbsp;';
              tr.appendChild(td);
            }
            table.appendChild(tr);
          }
          document.execCommand('insertHTML', false, table.outerHTML);
        }
        break;

      /* Inserção de conteúdo */
      case 'linkBtn':
        const url = prompt('URL do link:', 'https://');
        if(url) document.execCommand('createLink', false, url);
        break;
      case 'localImageBtn':
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = e => insertLocalImage(e);
        input.click();
        break;
      case 'insertLatexBtn':
        const formula = prompt('Digite a fórmula LaTeX:');
        if(formula){
          const span = document.createElement('span');
          span.innerHTML = `\\(${formula}\\)`;
          page.appendChild(span);
          renderLatex();
        }
        break;
      case 'insertCodeBtn':
        const code = prompt('Digite o código:');
        if(code){
          const pre = document.createElement('pre');
          pre.style.backgroundColor = '#f4f4f4';
          pre.style.padding = '4px';
          pre.style.fontFamily = 'monospace';
          pre.textContent = code;
          page.appendChild(pre);
          checkPageOverflow(page);
        }
        break;
      case 'exportBtn':
        alert('Exportar PDF — placeholder'); break;

      /* Funções avançadas */
      case 'formatLatexBtn': renderLatex(); break;
      case 'formatCodeBtn':
        const sel = window.getSelection();
        if(sel.rangeCount){
          const span = document.createElement('span');
          span.style.backgroundColor = '#f4f4f4';
          span.style.fontFamily = 'monospace';
          span.textContent = sel.toString();
          const range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(span);
        }
        break;
      case 'saveBtn': alert('Salvar — placeholder'); break;
      case 'publishBtn': alert('Publicar — placeholder'); break;
      case 'configBtn': alert('Configurações — placeholder'); break;

      default: document.execCommand(cmd);
    }

    page.focus();
    checkPageOverflow(page);
  });
});

/* ==========================
   Font family & size
   ========================== */
document.getElementById('fontName')?.addEventListener('change', e => {
  document.execCommand('fontName', false, e.target.value);
  getCurrentPage().focus();
});

document.getElementById('fontSize')?.addEventListener('change', e => {
  const sizePx = e.target.value;
  document.execCommand('styleWithCSS', false, true);
  document.execCommand('fontSize', false, "4");
  const fonts = getCurrentPage().querySelectorAll('font[size="4"]');
  fonts.forEach(f=>{
    const span = document.createElement('span');
    span.style.fontSize = sizePx + 'px';
    span.innerHTML = f.innerHTML;
    f.parentNode.replaceChild(span,f);
  });
  getCurrentPage().focus();
});

/* ==========================
   Zoom
   ========================== */
zoomRange.addEventListener('input', e => {
  const val = parseInt(e.target.value,10);
  zoomLabel.textContent = val + '%';
  sheet.style.transform = `scale(${val/100})`;
});

/* ==========================
   Word count
   ========================== */
function updateWordCount(){
  let words = [];
  document.querySelectorAll('.sheet .page').forEach(p=>{
    words = words.concat((p.innerText||'').trim().split(/\s+/).filter(w=>w.length>0));
  });
  wordCountEl.textContent = `${words.length} palavras`;
}
document.querySelectorAll('.sheet .page').forEach(p=>{
  p.addEventListener('input', ()=>{
    updateWordCount();
    checkPageOverflow(p);
  });
});
updateWordCount();

/* ==========================
   Prevent focus loss
   ========================== */
document.querySelectorAll('.icon-btn, .top-btn, .btn-small, .select').forEach(el=>{
  el.addEventListener('mousedown', e=>e.preventDefault());
});

/* ==========================
   Keyboard shortcuts
   ========================== */
document.addEventListener('keydown', e=>{
  if(e.ctrlKey && e.key.toLowerCase()==='b'){ e.preventDefault(); document.execCommand('bold'); }
  if(e.ctrlKey && e.key.toLowerCase()==='i'){ e.preventDefault(); document.execCommand('italic'); }
  if(e.ctrlKey && e.key.toLowerCase()==='u'){ e.preventDefault(); document.execCommand('underline'); }
});

/* ==========================
   LaTeX
   ========================== */
function renderLatex(){
  MathJax.typesetPromise(Array.from(document.querySelectorAll('.page')));
}

/* ==========================
   Local image insert
   ========================== */
function insertLocalImage(event){
  const file = event.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = e=>{
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '100%';
      getCurrentPage().appendChild(img);
      checkPageOverflow(getCurrentPage());
    };
    reader.readAsDataURL(file);
  }
}

/* ==========================
   Auxiliares
   ========================== */
function getCurrentPage(){
  const pages = document.querySelectorAll('.sheet .page');
  return pages[pages.length-1];
}

function getCurrentBlock(){
  const sel = window.getSelection();
  if(!sel.rangeCount) return null;
  let el = sel.getRangeAt(0).startContainer;
  while(el && el !== getCurrentPage()){
    if(el.nodeType===1 && /(P|DIV|H1|H2|H3|PRE)/i.test(el.nodeName)) return el;
    el = el.parentNode;
  }
  return null;
}

/* ==========================
   Quebra automática de página
   ========================== */
function checkPageOverflow(page){
  while(page.scrollHeight > page.clientHeight + 5){
    const newPage = document.createElement('div');
    newPage.className = 'page';
    newPage.contentEditable = true;
    page.parentNode.appendChild(newPage);

    while(page.scrollHeight > page.clientHeight + 5){
      const lastNode = page.lastChild;
      if(!lastNode) break;
      newPage.insertBefore(lastNode,page.firstChild);
    }
    page = newPage;
    setCursorToStart(page);
  }
}

function setCursorToStart(el){
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}

document.querySelectorAll('.sheet .page').forEach(p=>{
  p.addEventListener('input', ()=>checkPageOverflow(p));
});
