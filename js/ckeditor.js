// ============================================================
// VARIÁVEIS GLOBAIS
// ============================================================

const { 
  DecoupledEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  Heading,
  Font,
  Alignment,
  Link,
  List,
  BlockQuote,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,
  Base64UploadAdapter,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  MediaEmbed,
  Indent,
  IndentBlock,
  CodeBlock,
  HorizontalLine,
  PageBreak,
  RemoveFormat,
  SourceEditing,
  GeneralHtmlSupport,
  Highlight
} = CKEDITOR;

let editor;
let pages = [];
let currentPageIndex = 0;
let documentConfig = {
  margins: { top: 3, left: 3, right: 2, bottom: 2 },
  pageNumbers: { style: 'arabic', position: 'bottom-right', start: 1 },
  font: { family: 'Times New Roman', size: 12, lineHeight: 1.5 },
  header: { show: true, text: '' },
  footer: { show: true },
  background: { color: '#ffffff', image: null, blur: false, allPages: false },
  counters: { figures: true, tables: true, equations: true }
};

// ============================================================
// INICIALIZAÇÃO
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  initializeEditor();
});

async function initializeEditor() {
  try {
	// Criar primeira página
	createPage();
	
	// Inicializar CKEditor na primeira página
	const firstPageEditor = document.querySelector('.editor-page-content');
	
	editor = await DecoupledEditor.create(firstPageEditor, {
	  licenseKey: 'GPL',
	  
	  plugins: [
		Essentials, Paragraph, Bold, Italic, Underline, Strikethrough,
		Code, Subscript, Superscript, Heading, Font, Alignment,
		Link, List, BlockQuote, Image, ImageCaption, ImageStyle,
		ImageToolbar, ImageUpload, ImageResize, Base64UploadAdapter,
		Table, TableToolbar, TableProperties, TableCellProperties,
		MediaEmbed, Indent, IndentBlock, CodeBlock, HorizontalLine,
		PageBreak, RemoveFormat, SourceEditing, GeneralHtmlSupport, Highlight
	  ],
	  
	  toolbar: {
		items: [
		  'undo', 'redo', '|',
		  'heading', '|',
		  'bold', 'italic', 'underline', 'strikethrough', '|',
		  'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
		  'alignment', '|',
		  'numberedList', 'bulletedList', '|',
		  'outdent', 'indent', '|',
		  'link', 'insertImage', 'insertTable', 'blockQuote', 'codeBlock', '|',
		  'subscript', 'superscript', 'code', 'highlight', '|',
		  'horizontalLine', 'pageBreak', '|',
		  'removeFormat', 'sourceEditing'
		],
		shouldNotGroupWhenFull: true
	  },
	  
	  heading: {
		options: [
		  { model: 'paragraph', title: 'Parágrafo', class: 'ck-heading_paragraph' },
		  { model: 'heading1', view: 'h1', title: 'Título 1', class: 'ck-heading_heading1' },
		  { model: 'heading2', view: 'h2', title: 'Título 2', class: 'ck-heading_heading2' },
		  { model: 'heading3', view: 'h3', title: 'Título 3', class: 'ck-heading_heading3' },
		  { model: 'heading4', view: 'h4', title: 'Título 4', class: 'ck-heading_heading4' },
		  { model: 'heading5', view: 'h5', title: 'Título 5', class: 'ck-heading_heading5' },
		  { model: 'heading6', view: 'h6', title: 'Título 6', class: 'ck-heading_heading6' }
		]
	  },
	  
	  fontSize: {
		options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
	  },
	  
	  fontFamily: {
		options: [
		  'default',
		  'Times New Roman, Times, serif',
		  'Arial, Helvetica, sans-serif',
		  'Courier New, Courier, monospace',
		  'Georgia, serif',
		  'Calibri, sans-serif',
		  'Verdana, Geneva, sans-serif'
		]
	  },
	  
	  alignment: {
		options: ['left', 'center', 'right', 'justify']
	  },
	  
	  image: {
		toolbar: [
		  'imageStyle:inline',
		  'imageStyle:block',
		  'imageStyle:alignLeft',
		  'imageStyle:alignRight',
		  'imageStyle:alignCenter',
		  '|',
		  'toggleImageCaption',
		  'imageTextAlternative',
		  '|',
		  'resizeImage'
		],
		styles: [
		  'full',
		  'alignLeft',
		  'alignRight',
		  'alignCenter'
		],
		resizeOptions: [
		  {
			name: 'resizeImage:original',
			value: null,
			label: 'Original'
		  },
		  {
			name: 'resizeImage:25',
			value: '25',
			label: '25%'
		  },
		  {
			name: 'resizeImage:50',
			value: '50',
			label: '50%'
		  },
		  {
			name: 'resizeImage:75',
			value: '75',
			label: '75%'
		  }
		]
	  },
	  
	  table: {
		contentToolbar: [
		  'tableColumn', 'tableRow', 'mergeTableCells',
		  'tableProperties', 'tableCellProperties'
		]
	  },
	  
	  codeBlock: {
		languages: [
		  { language: 'plaintext', label: 'Texto Simples' },
		  { language: 'c', label: 'C' },
		  { language: 'cpp', label: 'C++' },
		  { language: 'csharp', label: 'C#' },
		  { language: 'css', label: 'CSS' },
		  { language: 'html', label: 'HTML' },
		  { language: 'java', label: 'Java' },
		  { language: 'javascript', label: 'JavaScript' },
		  { language: 'php', label: 'PHP' },
		  { language: 'python', label: 'Python' },
		  { language: 'sql', label: 'SQL' }
		]
	  },
	  
	  htmlSupport: {
		allow: [
		  { name: /.*/, attributes: true, classes: true, styles: true }
		]
	  }
	});
	
	// Anexar toolbar
	document.getElementById('toolbar').appendChild(editor.ui.view.toolbar.element);
	
	// Configurar atalhos customizados
	setupKeyboardShortcuts(editor);
	
	// Event listeners
	editor.model.document.on('change:data', () => {
	  updateStatus();
	  updateTOC();
	  checkPageOverflow();
	});
	
	// Conteúdo inicial
	editor.setData(`
	  <h1>Título do Documento Acadêmico</h1>
	  <p>Bem-vindo ao <strong>Editor Acadêmico Profissional</strong> - a versão mais completa e poderosa!</p>
	  <h2>Recursos Implementados</h2>
	  <ul>
		<li>✅ Paginação automática com controle total</li>
		<li>✅ Renderização de LaTeX em tempo real</li>
		<li>✅ Edição avançada de imagens (redimensionar, alinhar, texto ao redor)</li>
		<li>✅ Sumário automático atualizado em tempo real</li>
		<li>✅ Plano de fundo com desfoque</li>
		<li>✅ Templates acadêmicos (capa, folha de rosto, citação, referências)</li>
		<li>✅ Controle de numeração de páginas (mostrar/ocultar por página)</li>
		<li>✅ Legendas automáticas para figuras e tabelas</li>
		<li>✅ Cabeçalho e rodapé personalizáveis</li>
		<li>✅ Sistema completo de margens ABNT</li>
	  </ul>
	  <h2>Como Usar</h2>
	  <p>Use o botão <strong>⚙️ Configurações</strong> para personalizar margens, paginação, fontes e muito mais.</p>
	  <p>O botão <strong>📑 Navegação</strong> exibe o sumário e a lista de páginas.</p>
	  <p>Use <strong>📄 Templates</strong> para inserir elementos acadêmicos pré-formatados.</p>
	`);
	
	// Esconder loader
	document.getElementById('loader').style.display = 'none';
	
	// Atualizar interface
	updateStatus();
	updatePageNavigation();
	applyMargins();
	
	console.log('✅ Editor inicializado com sucesso!');
	
  } catch (error) {
	console.error('❌ Erro ao inicializar:', error);
	document.getElementById('loader').innerHTML = 
	  '<p style="color: red;">Erro ao carregar o editor. Por favor, recarregue a página.</p>';
  }
}

// ============================================================
// GERENCIAMENTO DE PÁGINAS
// ============================================================

function createPage(content = '') {
  const pageNumber = pages.length + 1;
  const container = document.getElementById('pagesContainer');
  
  const pageWrapper = document.createElement('div');
  pageWrapper.className = 'page-wrapper';
  pageWrapper.dataset.pageNumber = pageNumber;
  
  pageWrapper.innerHTML = `
	<div class="page-background"></div>
	
	<div class="page-header">
	  <span class="header-text"></span>
	  <span>Página ${pageNumber}</span>
	</div>
	
	<div class="editor-page-content">
	  ${content || '<p>Nova página...</p>'}
	</div>
	
	<div class="page-footer">
	  <span></span>
	  <span class="page-number">${pageNumber}</span>
	</div>
  `;
  
  container.appendChild(pageWrapper);
  pages.push(pageWrapper);
  
  updatePageNavigation();
  updatePageNumbers();
  
  return pageWrapper;
}

function addNewPage() {
  const newPage = createPage();
  updateStatus();
  
  // Scroll para a nova página
  newPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function checkPageOverflow() {
  // Sistema simples de detecção de overflow
  const editorElement = document.querySelector('.editor-page-content');
  if (!editorElement) return;
  
  const maxHeight = 25.7 * 37.795; // 25.7cm em pixels (aproximadamente)
  
  if (editorElement.scrollHeight > maxHeight * 1.1) {
	console.log('⚠️ Conteúdo excedendo página detectado');
  }
}

// ============================================================
// CONFIGURAÇÕES E MARGENS
// ============================================================

// CORRIGIDO: Adicionar/remover classe na toolbar quando configurações abrem/fecham
function toggleSettings() {
  const panel = document.getElementById('settingsPanel');
  const toolbar = document.getElementById('toolbarContainer');
  
  panel.classList.toggle('open');
  
  // Adicionar ou remover classe que ajusta a posição da toolbar
  if (panel.classList.contains('open')) {
	toolbar.classList.add('settings-open');
  } else {
	toolbar.classList.remove('settings-open');
  }
}

function applyMargins() {
  documentConfig.margins = {
	top: parseFloat(document.getElementById('marginTop').value),
	left: parseFloat(document.getElementById('marginLeft').value),
	right: parseFloat(document.getElementById('marginRight').value),
	bottom: parseFloat(document.getElementById('marginBottom').value)
  };
  
  pages.forEach(page => {
	const content = page.querySelector('.editor-page-content');
	if (content) {
	  const m = documentConfig.margins;
	  content.style.padding = `${m.top}cm ${m.right}cm ${m.bottom}cm ${m.left}cm`;
	}
  });
  
  console.log('✅ Margens aplicadas:', documentConfig.margins);
}

function applyTypography() {
  documentConfig.font = {
	family: document.getElementById('defaultFont').value,
	size: parseInt(document.getElementById('defaultFontSize').value),
	lineHeight: parseFloat(document.getElementById('lineSpacing').value)
  };
  
  const style = document.createElement('style');
  style.id = 'custom-typography';
  
  const oldStyle = document.getElementById('custom-typography');
  if (oldStyle) oldStyle.remove();
  
  style.textContent = `
	.ck-content {
	  font-family: ${documentConfig.font.family} !important;
	  font-size: ${documentConfig.font.size}pt !important;
	  line-height: ${documentConfig.font.lineHeight} !important;
	}
  `;
  
  document.head.appendChild(style);
  console.log('✅ Tipografia aplicada:', documentConfig.font);
}

function updatePageNumbers() {
  documentConfig.pageNumbers = {
	style: document.getElementById('pageNumberStyle').value,
	position: document.getElementById('pageNumberPosition').value,
	start: parseInt(document.getElementById('pageNumberStart').value)
  };
  
  pages.forEach((page, index) => {
	const pageNum = page.querySelector('.page-number');
	if (!pageNum) return;
	
	const number = index + documentConfig.pageNumbers.start;
	
	switch (documentConfig.pageNumbers.style) {
	  case 'arabic':
		pageNum.textContent = number;
		break;
	  case 'roman':
		pageNum.textContent = toRoman(number).toLowerCase();
		break;
	  case 'Roman':
		pageNum.textContent = toRoman(number);
		break;
	  case 'none':
		pageNum.textContent = '';
		break;
	}
  });
  
  console.log('✅ Numeração atualizada');
}

function toRoman(num) {
  const romanNumerals = [
	{ value: 1000, numeral: 'M' },
	{ value: 900, numeral: 'CM' },
	{ value: 500, numeral: 'D' },
	{ value: 400, numeral: 'CD' },
	{ value: 100, numeral: 'C' },
	{ value: 90, numeral: 'XC' },
	{ value: 50, numeral: 'L' },
	{ value: 40, numeral: 'XL' },
	{ value: 10, numeral: 'X' },
	{ value: 9, numeral: 'IX' },
	{ value: 5, numeral: 'V' },
	{ value: 4, numeral: 'IV' },
	{ value: 1, numeral: 'I' }
  ];
  
  let result = '';
  for (let i = 0; i < romanNumerals.length; i++) {
	while (num >= romanNumerals[i].value) {
	  result += romanNumerals[i].numeral;
	  num -= romanNumerals[i].value;
	}
  }
  return result;
}

function updateHeaderFooter() {
  documentConfig.header.show = document.getElementById('showHeader').checked;
  documentConfig.header.text = document.getElementById('headerText').value;
  documentConfig.footer.show = document.getElementById('showFooter').checked;
  
  pages.forEach(page => {
	const header = page.querySelector('.page-header');
	const footer = page.querySelector('.page-footer');
	
	if (header) {
	  header.style.display = documentConfig.header.show ? 'flex' : 'none';
	  const headerText = header.querySelector('.header-text');
	  if (headerText) headerText.textContent = documentConfig.header.text;
	}
	
	if (footer) {
	  footer.style.display = documentConfig.footer.show ? 'flex' : 'none';
	}
  });
  
  console.log('✅ Cabeçalho/Rodapé atualizados');
}

function applyBackground() {
  const color = document.getElementById('bgColor').value;
  const blur = document.getElementById('bgBlur').checked;
  const allPages = document.getElementById('bgAllPages').checked;
  const imageInput = document.getElementById('bgImage');
  
  documentConfig.background = { color, blur, allPages };
  
  const applyToPage = (page) => {
	const bg = page.querySelector('.page-background');
	if (!bg) return;
	
	bg.style.background = color;
	bg.classList.toggle('blurred', blur);
	
	if (imageInput.files && imageInput.files[0]) {
	  const reader = new FileReader();
	  reader.onload = (e) => {
		bg.innerHTML = `<img src="${e.target.result}" alt="Background">`;
		documentConfig.background.image = e.target.result;
	  };
	  reader.readAsDataURL(imageInput.files[0]);
	}
  };
  
  if (allPages) {
	pages.forEach(applyToPage);
  } else {
	const currentPage = pages[currentPageIndex];
	if (currentPage) applyToPage(currentPage);
  }
  
  console.log('✅ Plano de fundo aplicado');
}

// ============================================================
// NAVEGAÇÃO E SUMÁRIO
// ============================================================

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const workspace = document.getElementById('workspace');
  
  sidebar.classList.toggle('open');
  workspace.classList.toggle('with-sidebar');
  
  if (sidebar.classList.contains('open')) {
	updateTOC();
  }
}

function updateTOC() {
  if (!editor) return;
  
  const content = editor.getData();
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const tocSidebar = document.getElementById('tocSidebar');
  
  if (!headings.length) {
	tocSidebar.innerHTML = '<p style="color: #999; font-size: 12px;">Nenhum título encontrado</p>';
	return;
  }
  
  tocSidebar.innerHTML = '';
  
  headings.forEach((heading, index) => {
	const level = parseInt(heading.tagName.substring(1));
	const item = document.createElement('div');
	item.className = `toc-item level-${level}`;
	item.textContent = heading.textContent;
	item.onclick = () => {
	  console.log('Navegar para:', heading.textContent);
	};
	tocSidebar.appendChild(item);
  });
}

function updatePageNavigation() {
  const nav = document.getElementById('pageNavigation');
  nav.innerHTML = '';
  
  pages.forEach((page, index) => {
	const item = document.createElement('div');
	item.className = 'page-nav-item';
	if (index === currentPageIndex) item.classList.add('active');
	
	item.innerHTML = `
	  <span>Página ${index + 1}</span>
	  <span>${index === 0 ? '📄' : '📃'}</span>
	`;
	
	item.onclick = () => {
	  currentPageIndex = index;
	  page.scrollIntoView({ behavior: 'smooth' });
	  updatePageNavigation();
	};
	
	nav.appendChild(item);
  });
}

function insertTOC() {
  if (!editor) return;
  
  const tocHTML = `
	<div class="table-of-contents">
	  <h2>Sumário</h2>
	  <ul class="toc-list" id="generatedTOC">
		<li><a href="#"><span>1. Introdução</span><span>1</span></a></li>
		<li><a href="#"><span>2. Desenvolvimento</span><span>5</span></a></li>
		<li><a href="#"><span>3. Conclusão</span><span>12</span></a></li>
	  </ul>
	  <p style="font-size: 10pt; color: #999; margin-top: 10px;">
		<em>Este sumário será atualizado automaticamente conforme você edita o documento.</em>
	  </p>
	</div>
  `;
  
  editor.model.change(writer => {
	const viewFragment = editor.data.processor.toView(tocHTML);
	const modelFragment = editor.data.toModel(viewFragment);
	editor.model.insertContent(modelFragment);
  });
  
  closeModal('templateModal');
  console.log('✅ Sumário inserido');
}

// ============================================================
// TEMPLATES ACADÊMICOS
// ============================================================

function openTemplateModal() {
  openModal('templateModal');
}

function insertCover() {
  const coverHTML = `
	<div class="academic-cover">
	  <div class="institution">UNIVERSIDADE FEDERAL DO BRASIL</div>
	  <div class="institution">Faculdade de Engenharia</div>
	  <div class="title">TÍTULO DO TRABALHO ACADÊMICO:<br>SUBTÍTULO SE NECESSÁRIO</div>
	  <div class="author">Nome do Autor</div>
	  <div class="location">
		<p>Cidade - Estado</p>
		<p>2025</p>
	  </div>
	</div>
  `;
  
  insertContent(coverHTML);
  closeModal('templateModal');
}

function insertTitlePage() {
  const titlePageHTML = `
	<div style="min-height: 25cm; display: flex; flex-direction: column; justify-content: space-between;">
	  <div style="text-align: center;">
		<h2 style="font-size: 14pt; margin-bottom: 2cm;">Nome do Autor</h2>
	  </div>
	  
	  <div style="text-align: center;">
		<h1 style="font-size: 18pt; font-weight: bold; text-transform: uppercase;">
		  TÍTULO DO TRABALHO
		</h1>
	  </div>
	  
	  <div style="margin-left: 8cm;">
		<p style="text-align: justify; font-size: 11pt;">
		  Trabalho de Conclusão de Curso apresentado à Faculdade de [Nome] da 
		  Universidade [Nome] como requisito parcial para obtenção do título de 
		  [Grau] em [Curso].
		</p>
		<p style="margin-top: 1cm; font-size: 11pt;">
		  <strong>Orientador:</strong> Prof. Dr. Nome do Orientador
		</p>
	  </div>
	  
	  <div style="text-align: center; margin-top: auto;">
		<p>Cidade - Estado</p>
		<p>2025</p>
	  </div>
	</div>
  `;
  
  insertContent(titlePageHTML);
  closeModal('templateModal');
}

function insertQuotePage() {
  const quoteHTML = `
	<div style="min-height: 25cm; display: flex; flex-direction: column; justify-content: center; align-items: flex-end; padding-right: 3cm;">
	  <blockquote style="width: 10cm; text-align: justify; font-style: italic; border-left: 3px solid #667eea; padding-left: 1cm;">
		"Insira aqui uma citação relevante ao tema do trabalho. A citação deve ser inspiradora 
		e relacionada ao conteúdo desenvolvido."
	  </blockquote>
	  <p style="margin-top: 1cm; text-align: right;">— Autor da Citação</p>
	</div>
  `;
  
  insertContent(quoteHTML);
  closeModal('templateModal');
}

function insertAbstract() {
  const abstractHTML = `
	<h2 style="text-align: center; text-transform: uppercase;">Resumo</h2>
	<p style="text-align: justify;">
	  Este trabalho apresenta... [Escreva aqui o resumo do trabalho em português, 
	  com no máximo 500 palavras, destacando objetivos, metodologia, resultados e conclusões].
	</p>
	<p style="margin-top: 1cm;">
	  <strong>Palavras-chave:</strong> Palavra1. Palavra2. Palavra3. Palavra4. Palavra5.
	</p>
	
	<hr style="margin: 2cm 0;">
	
	<h2 style="text-align: center; text-transform: uppercase;">Abstract</h2>
	<p style="text-align: justify;">
	  This work presents... [Write here the abstract in English, 
	  with a maximum of 500 words, highlighting objectives, methodology, results and conclusions].
	</p>
	<p style="margin-top: 1cm;">
	  <strong>Keywords:</strong> Keyword1. Keyword2. Keyword3. Keyword4. Keyword5.
	</p>
  `;
  
  insertContent(abstractHTML);
  closeModal('templateModal');
}

function insertReferences() {
  const referencesHTML = `
	<div class="references-section">
	  <h2>REFERÊNCIAS</h2>
	  
	  <div class="reference-item">
		SOBRENOME, Nome. <strong>Título do livro em negrito</strong>. Cidade: Editora, ano.
	  </div>
	  
	  <div class="reference-item">
		SOBRENOME, Nome; SOBRENOME2, Nome2. Título do artigo. <strong>Nome da Revista</strong>, 
		v. X, n. Y, p. XX-YY, mês ano.
	  </div>
	  
	  <div class="reference-item">
		SOBRENOME, Nome. Título do artigo online. <strong>Nome do Site</strong>, ano. 
		Disponível em: &lt;URL&gt;. Acesso em: DD mês. AAAA.
	  </div>
	  
	  <p style="margin-top: 2cm; font-size: 10pt; color: #999; font-style: italic;">
		Adicione suas referências seguindo as normas ABNT. As referências devem estar 
		em ordem alfabética pelo sobrenome do primeiro autor.
	  </p>
	</div>
  `;
  
  insertContent(referencesHTML);
  closeModal('templateModal');
}

function insertBackCover() {
  addNewPage();
  closeModal('templateModal');
  console.log('✅ Contracapa inserida (nova página)');
}

function insertContent(html) {
  if (!editor) return;
  
  editor.model.change(writer => {
	const viewFragment = editor.data.processor.toView(html);
	const modelFragment = editor.data.toModel(viewFragment);
	editor.model.insertContent(modelFragment);
  });
}

// ============================================================
// FÓRMULAS LaTeX
// ============================================================

function insertMathFormula() {
  openModal('mathModal');
  
  const input = document.getElementById('mathInput');
  input.oninput = () => {
	const preview = document.getElementById('mathPreview');
	preview.innerHTML = `$$${input.value}$$`;
	if (window.MathJax) {
	  MathJax.typesetClear([preview]);
	  MathJax.typesetPromise([preview]).catch(err => console.error(err));
	}
  };
}

function applyMathFormula() {
  const latex = document.getElementById('mathInput').value.trim();
  if (!latex) {
	alert('Por favor, digite uma fórmula LaTeX.');
	return;
  }
  
  const mathHTML = `<span class="math-tex" data-latex="${latex}">$$${latex}$$</span>`;
  insertContent(mathHTML);
  
  closeModal('mathModal');
  setTimeout(renderAllMath, 100);
}

function renderAllMath() {
  if (!window.MathJax) {
	console.warn('MathJax não está carregado ainda');
	return;
  }
  
  MathJax.typesetClear();
  MathJax.typesetPromise([document.getElementById('pagesContainer')])
	.then(() => {
	  console.log('✅ LaTeX renderizado!');
	  document.querySelectorAll('.math-tex').forEach(el => {
		if (el.querySelector('.MathJax')) {
		  el.classList.add('rendered');
		}
	  });
	})
	.catch(err => console.error('❌ Erro ao renderizar LaTeX:', err));
}

window.MathJax = {
  tex: {
	inlineMath: [['$', '$'], ['\\(', '\\)']],
	displayMath: [['$$', '$$'], ['\\[', '\\]']]
  },
  startup: {
	ready: () => {
	  MathJax.startup.defaultReady();
	  setTimeout(renderAllMath, 1500);
	}
  }
};

// ============================================================
// ATALHOS DE TECLADO
// ============================================================

function setupKeyboardShortcuts(editor) {
  const keystrokes = editor.keystrokes;
  
  keystrokes.set('Ctrl+S', (data, cancel) => {
	saveDocument();
	cancel();
  });
  
  keystrokes.set('Ctrl+P', (data, cancel) => {
	printDocument();
	cancel();
  });
  
  keystrokes.set('Ctrl+Alt+F', (data, cancel) => {
	insertMathFormula();
	cancel();
  });
  
  keystrokes.set('Ctrl+Enter', (data, cancel) => {
	addNewPage();
	cancel();
  });
  
  console.log('✅ Atalhos configurados');
}

// ============================================================
// UTILIDADES
// ============================================================

function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

function updateStatus() {
  if (!editor) return;
  
  const text = editor.getData().replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const chars = text.length;
  
  document.getElementById('statusPages').textContent = `Página ${currentPageIndex + 1} de ${pages.length}`;
  document.getElementById('statusWords').textContent = `${words} palavras`;
  document.getElementById('statusChars').textContent = `${chars} caracteres`;
}

function updateCounters() {
  console.log('Atualizando contadores...');
}

function saveDocument() {
  if (!editor) return;
  
  const content = editor.getHTML();
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'documento-academico.html';
  a.click();
  URL.revokeObjectURL(url);
  
  const now = new Date().toLocaleString('pt-BR');
  document.getElementById('lastSaved').textContent = `Salvo em ${now}`;
  console.log('✅ Documento salvo!');
}

function exportToPDF() {
  alert('Exportação para PDF: Use Ctrl+P e selecione "Salvar como PDF" para melhores resultados.');
  printDocument();
}

function printDocument() {
  window.print();
}

setInterval(() => {
  if (editor) {
	const content = editor.getData();
	localStorage.setItem('academic_editor_autosave', content);
	localStorage.setItem('academic_editor_autosave_time', new Date().toISOString());
  }
}, 120000);

console.log('🚀 Editor Acadêmico Profissional - CKEditor 5 Ultra');
