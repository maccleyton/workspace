// hub-api.js
const API_BASE = "http://localhost:3000"; // ajuste se hospedar online

// === DOCUMENTOS ===

// Lista todos os documentos
export async function getDocuments() {
  const res = await fetch(`${API_BASE}/documents`);
  if (!res.ok) throw new Error("Erro ao listar documentos");
  return res.json();
}

// Busca documento por ID
export async function getDocument(id) {
  const res = await fetch(`${API_BASE}/documents/${id}`);
  if (!res.ok) throw new Error("Erro ao carregar documento");
  return res.json();
}

// Cria novo documento
export async function createDocument(title, content) {
  const res = await fetch(`${API_BASE}/documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Erro ao criar documento");
  return res.json();
}

// Atualiza documento existente
export async function updateDocument(id, title, content) {
  const res = await fetch(`${API_BASE}/documents/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Erro ao atualizar documento");
  return res.json();
}

// Remove documento
export async function deleteDocument(id) {
  const res = await fetch(`${API_BASE}/documents/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao excluir documento");
  return res.json();
}

// === LINKS (VÍNCULOS) ===

// Cria vínculo pai/filho
export async function createLink(parentId, childId) {
  const res = await fetch(`${API_BASE}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ parent_id: parentId, child_id: childId }),
  });
  if (!res.ok) throw new Error("Erro ao criar vínculo");
  return res.json();
}

// Lista vínculos de um documento
export async function getLinks(docId) {
  const res = await fetch(`${API_BASE}/links/${docId}`);
  if (!res.ok) throw new Error("Erro ao listar vínculos");
  return res.json();
}

// Remove vínculo
export async function deleteLink(linkId) {
  const res = await fetch(`${API_BASE}/links/${linkId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao remover vínculo");
  return res.json();
}
