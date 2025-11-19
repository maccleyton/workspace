// index.js
import { getDocuments, createDocument } from './hub-api.js';

const documentsContainer = document.getElementById('documentsContainer');
const fileInput = document.getElementById('fileInput');
const uploadModal = document.getElementById('uploadModal');

// === LISTAR DOCUMENTOS ===
async function loadDocuments() {
  try {
    const docs = await getDocuments();

    if (docs.length === 0) {
      documentsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">📄</div>
          <div class="empty-title">Nenhum documento ainda</div>
          <div class="empty-text">Comece adicionando seu primeiro documento Markdown</div>
        </div>`;
      return;
    }

    documentsContainer.innerHTML = docs.map(doc => `
      <div class="document-card">
        <h3>${doc.title}</h3>
        <p>${doc.content.substring(0, 100)}...</p>
        <a href="view.html?id=${doc.id}" class="btn">Abrir</a>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
    documentsContainer.innerHTML = `<div style="color:red;">Erro ao carregar documentos</div>`;
  }
}

// === UPLOAD DE DOCUMENTO ===
fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Arquivo muito grande! Máximo 5MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    const content = e.target.result;
    const title = file.name.replace('.md', '');

    try {
      await createDocument(title, content);
      closeUploadModal();
      loadDocuments();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar documento");
    }
  };
  reader.readAsText(file);
});

// === MODAL DE UPLOAD ===
function openUploadModal() {
  uploadModal.style.display = 'block';
}
function closeUploadModal() {
  uploadModal.style.display = 'none';
}

// Expor funções globais para index.html
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;

// Carregar documentos ao iniciar
loadDocuments();
