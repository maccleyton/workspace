let currentDoc = null;
let allDocuments = [];
let selectedDocId = null;
let currentTab = 'existing';

window.addEventListener('load', () => {
	loadCurrentDocument();
	loadAllDocuments();
});

function loadCurrentDocument() {
	const urlParams = new URLSearchParams(window.location.search);
	const docId = urlParams.get('id');

	if (!docId) {
		alert('ID do documento não fornecido');
		window.location.href = 'index.html';
		return;
	}

	const hubDocs = localStorage.getItem('hubDocuments');
	if (hubDocs) {
		const docs = JSON.parse(hubDocs);
		currentDoc = docs.find(d => d.id === docId);

		if (currentDoc) {
			const titleElement = document.getElementById('docTitle');
			const originalTitle = currentDoc.title || 'Sem Título';
			
			// Renderizar markdown no título
			titleElement.innerHTML = marked.parse(originalTitle);
			
			// Configurar título da aba (limitado para evitar truncagem)
			let pageTitle = originalTitle;
			if (pageTitle.length > 50) {
				pageTitle = pageTitle.substring(0, 47) + '...';
			}
			document.title = `${pageTitle} - Gerenciar Vínculos`;
			
			const date = new Date(currentDoc.timestamp).toLocaleDateString('pt-BR');
			document.getElementById('docMeta').textContent = `Atualizado: ${date}`;
			
			renderChildren();
		} else {
			alert('Documento não encontrado');
			window.location.href = 'index.html';
		}
	}
}

function loadAllDocuments() {
	const hubDocs = localStorage.getItem('hubDocuments');
	if (hubDocs) {
		allDocuments = JSON.parse(hubDocs);
	}
}

function renderChildren() {
	const childrenList = document.getElementById('childrenList');
	
	if (!currentDoc.children || currentDoc.children.length === 0) {
		childrenList.innerHTML = `
			<div class="empty-state">
				<div class="empty-icon">📄</div>
				<div class="empty-text">Nenhum documento vinculado ainda</div>
			</div>
		`;
		return;
	}

	childrenList.innerHTML = currentDoc.children.map(childId => {
		const child = allDocuments.find(d => d.id === childId);
		if (!child) return '';

		const date = new Date(child.timestamp).toLocaleDateString('pt-BR');
		const childTitle = child.title || 'Sem Título';
		
		return `
			<div class="child-item">
				<div class="child-info">
					<div class="child-title">${childTitle}</div>
					<div class="child-date">${date}</div>
				</div>
				<div class="child-actions">
					<button class="action-btn" onclick="viewChild('${childId}')">👁️ Ver</button>
					<button class="action-btn" onclick="editChild('${childId}')">✏️ Editar</button>
					<button class="action-btn action-btn-danger" onclick="removeChild('${childId}')">🗑️ Remover</button>
				</div>
			</div>
		`;
	}).join('');
}

function openAddChildModal() {
	document.getElementById('addChildModal').classList.add('active');
	renderExistingDocs();
}

function closeAddChildModal() {
	document.getElementById('addChildModal').classList.remove('active');
	selectedDocId = null;
	document.getElementById('confirmBtn').style.display = 'none';
}

function switchTab(tab) {
	currentTab = tab;
	
	document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
	document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
	
	if (tab === 'existing') {
		document.querySelectorAll('.tab')[0].classList.add('active');
		document.getElementById('tabExisting').classList.add('active');
		renderExistingDocs();
	} else {
		document.querySelectorAll('.tab')[1].classList.add('active');
		document.getElementById('tabUpload').classList.add('active');
	}
	
	document.getElementById('confirmBtn').style.display = 'none';
	selectedDocId = null;
}

function renderExistingDocs() {
	const grid = document.getElementById('existingDocsGrid');
	
	// Filtrar documentos que não são o atual e não são já filhos
	const availableDocs = allDocuments.filter(doc => {
		if (doc.id === currentDoc.id) return false;
		if (currentDoc.children && currentDoc.children.includes(doc.id)) return false;
		return true;
	});

	if (availableDocs.length === 0) {
		grid.innerHTML = `
			<div class="empty-state" style="grid-column: 1 / -1;">
				<div class="empty-text">Nenhum documento disponível para vincular</div>
			</div>
		`;
		return;
	}

	grid.innerHTML = availableDocs.map(doc => {
		const date = new Date(doc.timestamp).toLocaleDateString('pt-BR');
		return `
			<div class="doc-card" onclick="selectDoc('${doc.id}')">
				<div class="doc-card-title">${doc.title || 'Sem Título'}</div>
				<div class="doc-card-date">${date}</div>
			</div>
		`;
	}).join('');
}

function selectDoc(docId) {
	selectedDocId = docId;
	
	document.querySelectorAll('.doc-card').forEach(card => {
		card.classList.remove('selected');
	});
	event.target.closest('.doc-card').classList.add('selected');
	
	document.getElementById('confirmBtn').style.display = 'inline-flex';
}

function handleFileUpload(event) {
	const file = event.target.files[0];
	if (!file) return;

	if (!file.name.endsWith('.md')) {
		alert('Por favor, selecione um arquivo Markdown (.md)');
		return;
	}

	if (file.size > 5 * 1024 * 1024) {
		alert('Arquivo muito grande! Máximo: 5MB');
		return;
	}

	const reader = new FileReader();
	reader.onload = (e) => {
		const content = e.target.result;
		const title = extractH1(content);
		
		// Criar novo documento
		const newDoc = {
			id: Date.now().toString(),
			title: title,
			content: content,
			timestamp: new Date().toISOString(),
			children: []
		};

		// Adicionar ao hub
		allDocuments.push(newDoc);
		localStorage.setItem('hubDocuments', JSON.stringify(allDocuments));

		// Vincular como filho
		if (!currentDoc.children) currentDoc.children = [];
		currentDoc.children.push(newDoc.id);
		
		// Salvar alterações
		const docIndex = allDocuments.findIndex(d => d.id === currentDoc.id);
		allDocuments[docIndex] = currentDoc;
		localStorage.setItem('hubDocuments', JSON.stringify(allDocuments));

		closeAddChildModal();
		renderChildren();
		
		event.target.value = '';
	};
	reader.readAsText(file);
}

function extractH1(markdown) {
	const match = markdown.match(/^#\s+(.+)$/m);
	return match ? match[1] : 'Sem Título';
}

function confirmAddChild() {
	if (!selectedDocId) return;

	// Adicionar documento selecionado como filho
	if (!currentDoc.children) currentDoc.children = [];
	
	if (currentDoc.children.includes(selectedDocId)) {
		alert('Este documento já está vinculado!');
		return;
	}

	currentDoc.children.push(selectedDocId);

	// Salvar alterações
	const docIndex = allDocuments.findIndex(d => d.id === currentDoc.id);
	allDocuments[docIndex] = currentDoc;
	localStorage.setItem('hubDocuments', JSON.stringify(allDocuments));

	closeAddChildModal();
	renderChildren();
}

function viewChild(childId) {
	window.location.href = `view.html?id=${childId}`;
}

function editChild(childId) {
	window.location.href = `edit.html?id=${childId}`;
}

function removeChild(childId) {
	if (!confirm('Tem certeza que deseja desvincular este documento?')) return;

	currentDoc.children = currentDoc.children.filter(id => id !== childId);

	// Salvar alterações
	const docIndex = allDocuments.findIndex(d => d.id === currentDoc.id);
	allDocuments[docIndex] = currentDoc;
	localStorage.setItem('hubDocuments', JSON.stringify(allDocuments));

	renderChildren();
}

// Drag and drop para upload
const uploadArea = document.querySelector('.upload-area');
if (uploadArea) {
	uploadArea.addEventListener('dragover', (e) => {
		e.preventDefault();
		uploadArea.style.borderColor = '#10b981';
	});

	uploadArea.addEventListener('dragleave', () => {
		uploadArea.style.borderColor = '#2a2a2a';
	});

	uploadArea.addEventListener('drop', (e) => {
		e.preventDefault();
		uploadArea.style.borderColor = '#2a2a2a';
		
		const file = e.dataTransfer.files[0];
		if (file) {
			const input = document.getElementById('fileInput');
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			input.files = dataTransfer.files;
			handleFileUpload({ target: input });
		}
	});
}