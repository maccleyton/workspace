function $(s){ return document.querySelector(s); }
var editor = $('#editor'), pages = $('#pages'), themeBtn = $('#themeBtn');
var STORAGE_KEY = 'md-editor-doc', THEME_KEY = 'md-editor-theme';

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

function debounce(fn, w){ 
	var t; w=w||300; 
	return function(){ 
		var a=arguments; 
		clearTimeout(t); 
		t=setTimeout(function(){ fn.apply(null,a); }, w); 
	}; 
}

function setCaretInfo(){ 
	var val=editor.value, pos=editor.selectionStart||0, before=val.slice(0,pos), lines=before.split('\n'); 
	$('#cursorInfo').textContent='Lin '+lines.length+', Col '+(lines[lines.length-1].length+1); 
}

function setCountInfo(){ 
	$('#countInfo').textContent = editor.value.length + ' caracteres'; 
}

function escapeHtml(s){ 
	return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); 
}

function renderLatex(text) {
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

	text = text.replace(/\$\$\s*\n([\s\S]+?)\n\s*\$\$/g, (match, formula) => {
		try {
			return '\n' + katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false }) + '\n';
		} catch (e) {
			return match;
		}
	});

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

	text = text.replace(/__TABLE_(\d+)__/g, (match, index) => {
		return tables[parseInt(index)];
	});

	text = text.replace(/__CODEBLOCK_(\d+)__/g, (match, index) => {
		return codeBlocks[parseInt(index)];
	});

	return text;
}

function mdToHtml(md){
	md = String(md).replace(/\r\n?/g,'\n');

	// Processar LaTeX ANTES de tudo, protegendo tabelas
	md = renderLatex(md);

	var fences=[]; 
	md = md.replace(/```([a-z0-9_-]+)?\n([\s\S]*?)```/gi, function(m,lang,code){
		var idx=fences.length; 
		fences.push({ lang:(lang||'').trim(), code:code }); 
		return '\u0000FENCE_'+idx+'\u0000';
	});

	// Processar tabelas com regex melhorado
	md = md.replace(/(?:^|\n)(\|.+\|[ \t]*\n\|[-:| ]+\|[ \t]*(?:\n\|.+\|[ \t]*)*)/gm, function(match, table){
		var rows = table.trim().split('\n').filter(r => r.trim());
		if (rows.length < 2) return match;
		
		var header = rows[0];
		var alignRow = rows[1];
		var body = rows.slice(2);
		
		function splitRow(r){ 
			return r.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()); 
		}
		
		var aligns = splitRow(alignRow).map(a => {
			a = a.trim();
			if(/^:-+:$/.test(a)) return 'center'; 
			if(/^:-+$/.test(a)) return 'left'; 
			if(/^-+:$/.test(a)) return 'right'; 
			return 'left';
		});
		
		var html = '<table><thead><tr>';
		splitRow(header).forEach((c, i) => { 
			html += '<th style="text-align:'+(aligns[i]||'left')+'">'+inline(c)+'</th>'; 
		});
		html += '</tr></thead><tbody>';
		
		body.forEach(r => { 
			if(!r.trim()) return; 
			var cells = splitRow(r); 
			html += '<tr>'; 
			cells.forEach((c, i) => { 
				html += '<td style="text-align:'+(aligns[i]||'left')+'">'+inline(c)+'</td>'; 
			}); 
			html += '</tr>'; 
		});
		
		html += '</tbody></table>\n';
		return '\n' + html + '\n';
	});

	var lines = md.split('\n'), out=[], i=0;

	function flushPara(buf){ 
		if(!buf.length) return; 
		var text=buf.join(' ').trim(); 
		if(text) out.push('<p>'+inline(text)+'</p>'); 
		buf.length=0; 
	}

	while(i<lines.length){
		var l = lines[i];
		if(/^\s*$/.test(l)){ out.push(''); i++; continue; }

		if(/^#{1,6}\s+/.test(l)){
			var level=(l.match(/^#{1,6}/)[0]||'#').length;
			var text=l.replace(/^#{1,6}\s+/, '');
			out.push('<h'+level+'>'+inline(text)+'</h'+level+'>'); 
			i++; 
			continue;
		}

		if(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(l)){ 
			out.push('<hr />'); 
			i++; 
			continue; 
		}

		if(/^>\s?/.test(l)){
			var q=[]; 
			while(i<lines.length && /^>\s?/.test(lines[i])){ 
				q.push(lines[i].replace(/^>\s?/, '')); 
				i++; 
			}
			out.push('<blockquote>'+ q.map(s => inline(s)).join('<br/>') +'</blockquote>'); 
			continue;
		}

		if(/^(-|\+|\*)\s+\[[ x]\]/.test(l)){
			var checked = /\[x\]/i.test(l);
			var text = l.replace(/^(-|\+|\*)\s+\[[ x]\]\s*/i, '');
			out.push('<div><input type="checkbox"'+(checked?' checked':'')+' disabled> '+inline(text)+'</div>');
			i++;
			continue;
		}

		if(/^(-|\+|\*)\s+/.test(l) || /^\d+\.\s+/.test(l)){
			var isOrdered = /^\d+\.\s+/.test(l);
			var tag = isOrdered ? 'ol' : 'ul';
			var html = '<'+tag+'>';
			while(i<lines.length && (/^(-|\+|\*)\s+/.test(lines[i]) || /^\d+\.\s+/.test(lines[i]))){
				var item = lines[i].replace(/^((-|\+|\*)\s+|\d+\.\s+)/, '');
				html += '<li>'+inline(item)+'</li>';
				i++;
			}
			html += '</'+tag+'>';
			out.push(html);
			continue;
		}

		var buf=[l]; i++;
		while(i<lines.length && !/^\s*$/.test(lines[i]) &&
			!/^#{1,6}\s+/.test(lines[i]) && !/^>\s?/.test(lines[i]) &&
			!/^(-|\+|\*)\s+/.test(lines[i]) && !/^\d+\.\s+/.test(lines[i]) &&
			!/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i])){ 
			buf.push(lines[i]); 
			i++; 
		}
		flushPara(buf);
	}

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

	function inline(t){
		t = String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(m, alt, src) {
			return '<img alt="'+alt+'" src="'+src+'" />';
		});
		t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(m, txt, href) {
			return '<a href="'+href+'" target="_blank">'+txt+'</a>';
		});
		t = t.replace(/\*\*\*([^\*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
		t = t.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
		t = t.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
		t = t.replace(/~~([^~]+)~~/g, '<s>$1</s>');
		t = t.replace(/`([^`]+)`/g, function(m, code) {
			return '<code>'+escapeHtml(code)+'</code>';
		});
		return t;
	}
}

function applySettings() {
	const pageElements = document.querySelectorAll('.page');
	const zoomScale = settings.zoom / 100;
	
	pageElements.forEach(page => {
		page.style.transform = `scale(${zoomScale})`;
		
		const inner = page.querySelector('.page-inner');
		if (inner) {
			inner.style.padding = `${settings.margin}mm`;
		}
		
		page.querySelectorAll('h1').forEach(el => {
			el.style.color = settings.h1Color;
			el.style.borderBottomColor = settings.h1Color;
		});
		page.querySelectorAll('h2').forEach(el => {
			el.style.color = settings.h2Color;
			el.style.borderBottomColor = settings.h2Color;
		});
		page.querySelectorAll('h3').forEach(el => el.style.color = settings.h3Color);
		page.querySelectorAll('h4').forEach(el => el.style.color = settings.h4Color);
		
		page.querySelectorAll('pre').forEach(el => {
			el.style.background = settings.codeBgColor;
			el.style.color = settings.codeTextColor;
		});
		
		page.querySelectorAll('.katex-display').forEach(el => {
			el.style.background = settings.latexBgColor;
		});
		
		page.querySelectorAll('p, li').forEach(el => {
			el.style.lineHeight = settings.lineHeight;
			el.style.letterSpacing = `${settings.letterSpacing}px`;
		});
	});
}

function splitIntoPages(html) {
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = html;
	
	const pageElements = [];
	let currentPage = createPage();
	pageElements.push(currentPage.wrap);
	
	const children = Array.from(tempDiv.children);
	
	for (let i = 0; i < children.length; i++) {
		const el = children[i];
		const tagName = el.tagName.toLowerCase();
		
		if ((tagName === 'h1' || tagName === 'h2') && currentPage.inner.children.length > 0) {
			currentPage = createPage();
			pageElements.push(currentPage.wrap);
		}
		
		currentPage.inner.appendChild(el.cloneNode(true));
	}
	
	return pageElements;
}

function createPage() {
	const wrap = document.createElement('div');
	wrap.className = 'page';
	const inner = document.createElement('div');
	inner.className = 'page-inner';
	wrap.appendChild(inner);
	return { wrap, inner };
}

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

function wrapSelection(prefix, suffix, placeholder){
	suffix = (typeof suffix==='string') ? suffix : prefix; 
	placeholder = placeholder || '';
	var el=editor, start=el.selectionStart, end=el.selectionEnd;
	var sel=el.value.slice(start,end), content=sel||placeholder;
	var before=el.value.slice(0,start), after=el.value.slice(end);
	el.value = before + prefix + content + suffix + after;
	var head=(before+prefix+content).length; 
	el.focus(); 
	el.setSelectionRange(head, head); 
	render();
}

function insertLine(prefix, placeholder){
	placeholder=placeholder||''; 
	var el=editor, start=el.selectionStart;
	var lineStart=el.value.lastIndexOf('\n', start-1)+1;
	var before=el.value.slice(0,lineStart), after=el.value.slice(lineStart);
	el.value = before + prefix + placeholder + after;
	el.focus(); 
	el.setSelectionRange(lineStart + prefix.length, lineStart + prefix.length); 
	render();
}

function insertLatexBlock() {
	var latexBlock = '\n$\n\\int_0^1 x^2\\,dx = \\frac{1}{3}\n$\n';
	var start=editor.selectionStart, end=editor.selectionEnd;
	var before=editor.value.slice(0,start), after=editor.value.slice(end);
	editor.value = before + latexBlock + after;
	var caret = before.length + latexBlock.length;
	editor.setSelectionRange(caret, caret);
	editor.focus();
	render();
}

function insertTable() {
	var table = '\n| Coluna A | Coluna B | Coluna C |\n|:---|:---:|---:|\n| Esq | Centro | Dir |\n| A | B | C |\n';
	var start=editor.selectionStart, end=editor.selectionEnd;
	var before=editor.value.slice(0,start), after=editor.value.slice(end);
	editor.value = before + table + after;
	var caret = before.length + table.length;
	editor.setSelectionRange(caret, caret);
	editor.focus();
	render();
}

editor.addEventListener('keydown', function(e){
	if(e.ctrlKey && e.key.toLowerCase()==='b'){ 
		e.preventDefault(); 
		wrapSelection('**','**','texto'); 
	}
	else if(e.ctrlKey && e.key.toLowerCase()==='i'){ 
		e.preventDefault(); 
		wrapSelection('*','*','texto'); 
	}
	else if(e.ctrlKey && (e.key==='`')){ 
		e.preventDefault(); 
		wrapSelection('`','`','codigo'); 
	}
});

editor.addEventListener('dragover', function(e){ e.preventDefault(); });
editor.addEventListener('drop', function(e){
	e.preventDefault(); 
	var files=Array.from(e.dataTransfer.files||[]); 
	var img=files.find(f => /^image\//.test(f.type));
	if(!img) return;
	var fr=new FileReader();
	fr.onload=function(){
		var dataUrl=fr.result; 
		var name=(img.name||'imagem').replace(/\.[^.]+$/,'');
		var start=editor.selectionStart, end=editor.selectionEnd;
		var before=editor.value.slice(0,start), after=editor.value.slice(end);
		editor.value = before + '!['+name+']('+dataUrl+')' + after;
		var caret=(before + '!['+name+']('+dataUrl+')').length; 
		editor.setSelectionRange(caret, caret); 
		editor.focus(); 
		render();
	};
	fr.readAsDataURL(img);
});

$('#exportPDF').addEventListener('click', function(){ 
	const element = pages.cloneNode(true);
	const pageElements = element.querySelectorAll('.page');
	
	pageElements.forEach(page => {
		page.style.transform = 'none';
		const inner = page.querySelector('.page-inner');
		if (inner) {
			inner.style.padding = `${settings.margin}mm`;
		}
	});
	
	const opt = {
		margin: 0,
		filename: 'documento.pdf',
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: { 
			scale: 2, 
			useCORS: true,
			windowWidth: 794,
			windowHeight: 1123
		},
		jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
		pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
	};
	
	html2pdf().set(opt).from(element).save();
});

$('#exportHTML').addEventListener('click', function(){
	const pagesHtml = pages.innerHTML;
	const htmlContent = `<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Documento Exportado</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
	<style>
		body { margin: 0; padding: 20px; background: #f5f5f5; font-family: system-ui, sans-serif; }
		.pages { display: flex; flex-direction: column; gap: 20px; align-items: center; }
		.page { width: 210mm; min-height: 297mm; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); padding: ${settings.margin}mm; }
		.page-inner h1 { color: ${settings.h1Color}; border-bottom: 3px solid ${settings.h1Color}; }
		.page-inner h2 { color: ${settings.h2Color}; border-bottom: 2px solid ${settings.h2Color}; }
		.page-inner h3 { color: ${settings.h3Color}; }
		.page-inner h4 { color: ${settings.h4Color}; }
		.page-inner pre { background: ${settings.codeBgColor}; color: ${settings.codeTextColor}; padding: 16px; border-radius: 6px; }
		.page-inner .katex-display { background: ${settings.latexBgColor}; padding: 16px; border-radius: 6px; }
		.page-inner p, .page-inner li { line-height: ${settings.lineHeight}; letter-spacing: ${settings.letterSpacing}px; }
		.page-inner table { width: 100%; border-collapse: collapse; margin: 16px 0; }
		.page-inner th, .page-inner td { border: 1px solid #ddd; padding: 12px; }
		.page-inner thead { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
		@media print { body { background: white; padding: 0; } .page { margin: 0; box-shadow: none; page-break-after: always; } }
	</style>
</head>
<body>
	<div class="pages">${pagesHtml}</div>
</body>
</html>`;
	
	const blob = new Blob([htmlContent], { type: 'text/html' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'documento.html';
	a.click();
	URL.revokeObjectURL(url);
});

$('#downloadMD').addEventListener('click', function(){
	var md = editor.value; 
	if(!/\n$/.test(md)) md+='\n';
	var blob = new Blob([md], {type:'text/markdown'});
	var a=document.createElement('a'); 
	a.href=URL.createObjectURL(blob); 
	a.download='documento.md'; 
	a.click(); 
	URL.revokeObjectURL(a.href);
});

themeBtn.addEventListener('click', function(){
	var isLight=document.body.classList.contains('light'); 
	document.body.classList.toggle('light', !isLight);
	localStorage.setItem(THEME_KEY, isLight ? 'dark':'light'); 
	themeBtn.textContent = isLight ? '☀️' : '🌙';
});

editor.addEventListener('input', function(){ render(); setCaretInfo(); });
editor.addEventListener('click', setCaretInfo);
editor.addEventListener('keyup', setCaretInfo);

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
	
	$('#margin-value').textContent = 18;
	$('#line-height-value').textContent = 1.8;
	$('#letter-spacing-value').textContent = 0;
	$('#zoom-value').textContent = 100;
	
	applySettings();
}

(function(){
	var saved=localStorage.getItem(STORAGE_KEY); 
	if(saved!=null) editor.value=saved;
	var theme=localStorage.getItem(THEME_KEY)||'light';
	document.body.className=theme; 
	themeBtn.textContent = theme==='light' ? '🌙' : '☀️';
	render(); 
	setCaretInfo(); 
	setCountInfo();
})();
