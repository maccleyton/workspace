let documents = [];
let collapsedDocs = new Set();
let viewMode = 'grid';
window.addEventListener('load', () => { loadDocuments(); });
function loadDocuments() {
	const saved = localStorage.getItem('hubDocuments');
	if (saved) { documents = JSON.parse(saved); }
	const savedCollapsed = localStorage.getItem('collapsedDocs');
	if (savedCollapsed) { collapsedDocs = new Set(JSON.parse(savedCollapsed)); }
	const savedView = localStorage.getItem('viewMode');
	if (savedView) {
		viewMode = savedView;
		document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
		document.querySelectorAll('.toggle-btn')[viewMode === 'grid' ? 0 : 1].classList.add('active');
	}
	renderDocuments();
}
function changeView(mode) {
	viewMode = mode;
	localStorage.setItem('viewMode', mode);
	document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
	event.target.closest('.toggle-btn').classList.add('active');
	renderDocuments();
}
function renderDocuments() {
	const container = document.getElementById('documentsContainer');
	if (documents.length === 0) {
		container.className = 'documents-grid';
		container.innerHTML = `
			<div class="empty-state" style="grid-column: 1 / -1;">
				<div class="empty-icon">📄</div>
				<div class="empty-title">Nenhum documento ainda</div>
				<div class="empty-text">Comece adicionando seu primeiro documento Markdown</div>
			</div>
		`;
		return;
	}
	const childIds = new Set();
	documents.forEach(doc => { if (doc.children) doc.children.forEach(childId => childIds.add(childId)); });
	const rootDocs = documents.filter(doc => !childIds.has(doc.id));
	if (viewMode === 'grid') {
		container.className = 'documents-grid';
		container.innerHTML = rootDocs.map(doc => createCardGridHTML(doc)).join('');
	} else {
		container.className = 'documents-hierarchy';
		container.innerHTML = rootDocs.map(doc => createCardListHTML(doc)).join('');
	}
}
function createCardGridHTML(doc) {
	const title = doc.title || extractH1(doc.content);
	const renderedTitle = renderMarkdownInline(title);
	const date = new Date(doc.timestamp).toLocaleDateString('pt-BR');
	const hasChildren = doc.children && doc.children.length > 0;
	const isCollapsed = collapsedDocs.has(doc.id);
	return `
		<div class="doc-card-grid">
			${hasChildren ? `<div class="toggle-children ${isCollapsed ? 'collapsed' : ''}" onclick="toggleChildren('${doc.id}', event)"></div>` : ''}
			<div class="doc-content-top" onclick="openDocument('${doc.id}')">
				<div class="doc-icon">📄</div>
				<div class="doc-title">
					${renderedTitle}
					${hasChildren ? `<span class="children-badge">${doc.children.length}</span>` : ''}
				</div>
			</div>
			<div class="doc-meta">
				<div class="doc-date">${date}</div>
				<div class="doc-actions" onclick="event.stopPropagation()">
					<div class="action-btn" onclick="viewDocument('${doc.id}')" title="Visualizar">👁️</div>
					<div class="action-btn" onclick="editDocument('${doc.id}')" title="Editar">✏️</div>
					<div class="action-btn" onclick="manageDocument('${doc.id}')" title="Vincular">🔗</div>
					<div class="action-btn" onclick="deleteDocument('${doc.id}')" title="Excluir">🗑️</div>
				</div>
			</div>
			${hasChildren && !isCollapsed ? `<div class="children-grid">${doc.children.map(childId => createChildMiniHTML(childId)).join('')}</div>` : ''}
		</div>
	`;
}
function createChildMiniHTML(childId) {
	const child = documents.find(d => d.id === childId);
	if (!child) return '';
	const title = child.title || extractH1(child.content);
	const renderedTitle = renderMarkdownInline(title);
	return `
		<div class="child-mini-card" onclick="openDocument('${childId}'); event.stopPropagation();">
			<div class="child-mini-left">
				<div class="child-mini-icon">📄</div>
				<div class="child-mini-title">${renderedTitle}</div>
			</div>
			<div class="child-mini-actions" onclick="event.stopPropagation()">
				<div class="child-mini-btn" onclick="viewDocument('${childId}')" title="Visualizar">👁️</div>
				<div class="child-mini-btn" onclick="editDocument('${childId}')" title="Editar">✏️</div>
				<div class="child-mini-btn" onclick="deleteDocument('${childId}')" title="Excluir">🗑️</div>
			</div>
		</div>
	`;
}
function createCardListHTML(doc) {
	const title = doc.title || extractH1(doc.content);
	const renderedTitle = renderMarkdownInline(title);
	const date = new Date(doc.timestamp).toLocaleDateString('pt-BR');
	const hasChildren = doc.children && doc.children.length > 0;
	const isCollapsed = collapsedDocs.has(doc.id);
	return `
		<div class="doc-card-list">
			${hasChildren ? `<div class="toggle-children ${isCollapsed ? 'collapsed' : ''}" onclick="toggleChildren('${doc.id}', event)"></div>` : ''}
			<div class="doc-card-header" onclick="openDocument('${doc.id}')">
				<div class="doc-icon">📄</div>
				<div class="doc-content">
					<div class="doc-title">
						${renderedTitle}
						${hasChildren ? `<span class="children-badge">${doc.children.length}</span>` : ''}
					</div>
					<div class="doc-meta">
						<div class="doc-date">${date}</div>
						<div class="doc-actions" onclick="event.stopPropagation()">
							<div class="action-btn" onclick="viewDocument('${doc.id}')" title="Visualizar">👁️</div>
							<div class="action-btn" onclick="editDocument('${doc.id}')" title="Editar">✏️</div>
							<div class="action-btn" onclick="manageDocument('${doc.id}')" title="Vincular">🔗</div>
							<div class="action-btn" onclick="deleteDocument('${doc.id}')" title="Excluir">🗑️</div>
						</div>
					</div>
				</div>
			</div>
			${hasChildren && !isCollapsed ? `<div class="children-list">${doc.children.map(childId => createChildHTML(childId)).join('')}</div>` : ''}
		</div>
	`;
}
function createChildHTML(childId) {
	const child = documents.find(d => d.id === childId);
	if (!child) return '';
	const title = child.title || extractH1(child.content);
	const renderedTitle = renderMarkdownInline(title);
	const date = new Date(child.timestamp).toLocaleDateString('pt-BR');
	return `
		<div class="child-card">
			<div class="child-card-header" onclick="openDocument('${childId}')">
				<div class="child-left">
					<div class="child-icon">📄</div>
					<div class="child-info">
						<div class="child-title">${renderedTitle}</div>
						<div class="child-date">${date}</div>
					</div>
				</div>
				<div class="child-actions" onclick="event.stopPropagation()">
					<div class="child-action-btn" onclick="viewDocument('${childId}')" title="Visualizar">👁️</div>
					<div class="child-action-btn" onclick="editDocument('${childId}')" title="Editar">✏️</div>
					<div class="child-action-btn" onclick="deleteDocument('${childId}')" title="Excluir">🗑️</div>
				</div>
			</div>
		</div>
	`;
}
function toggleChildren(docId, event) {
	event.stopPropagation();
	if (collapsedDocs.has(docId)) { collapsedDocs.delete(docId); }
	else { collapsedDocs.add(docId); }
	localStorage.setItem('collapsedDocs', JSON.stringify([...collapsedDocs]));
	renderDocuments();
}
function extractH1(markdown) {
	const match = markdown.match(/^#\s+(.+)$/m);
	return match ? match[1] : 'Sem Título';
}
function renderMarkdownInline(text) {
	if (!marked) return text;
	let rendered = text
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/`(.+?)`/g, '<code>$1</code>');
	return rendered;
}
function openUploadModal() { document.getElementById('uploadModal').classList.add('active'); }
function closeUploadModal() { document.getElementById('uploadModal').classList.remove('active'); }
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
		const doc = {
			id: Date.now().toString(),
			title: title,
			content: content,
			timestamp: new Date().toISOString(),
			children: []
		};
		documents.push(doc);
		localStorage.setItem('hubDocuments', JSON.stringify(documents));
		closeUploadModal();
		renderDocuments();
		event.target.value = '';
	};
	reader.readAsText(file);
}
function openDocument(id) { window.location.href = `view.html?id=${id}`; }
function viewDocument(id) { window.location.href = `view.html?id=${id}`; }
function editDocument(id) { window.location.href = `edit.html?id=${id}`; }
function manageDocument(id) { window.location.href = `manage.html?id=${id}`; }
function deleteDocument(id) {
	if (!confirm('Tem certeza que deseja excluir este documento?')) return;
	documents.forEach(doc => {
		if (doc.children) { doc.children = doc.children.filter(childId => childId !== id); }
	});
	documents = documents.filter(d => d.id !== id);
	localStorage.setItem('hubDocuments', JSON.stringify(documents));
	renderDocuments();
}

document.getElementById('toGoBackBtn').addEventListener('click', toGoBack);

function toGoBack() {
	const base = window.location.origin;
	window.location.href = "../../index.html";
}

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
