const API_URL = "http://localhost:3000";

// =========================
// GET LISTA DE DOCUMENTOS
// =========================
export async function getDocs() {
    const res = await fetch(`${API_URL}/documents`);
    if (!res.ok) throw new Error("Erro ao carregar documentos");
    return await res.json();
}

// =========================
// GET DOCUMENTO POR ID
// =========================
export async function getDoc(id) {
    const res = await fetch(`${API_URL}/documents/${id}`);
    if (!res.ok) throw new Error("Erro ao carregar documento");
    return await res.json();
}

// =========================
// CRIAR DOCUMENTO
// =========================
export async function createDoc({ title, content }) {
    const res = await fetch(`${API_URL}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });

    if (!res.ok) throw new Error("Erro ao criar documento");
    return await res.json();
}

// =========================
// EDITAR DOCUMENTO
// =========================
export async function updateDoc(id, title, content) {
    const res = await fetch(`${API_URL}/documents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });

    if (!res.ok) throw new Error("Erro ao atualizar documento");
    return await res.json();
}

// =========================
// DELETAR DOCUMENTO
// =========================
export async function deleteDoc(id) {
    const res = await fetch(`${API_URL}/documents/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Erro ao deletar documento");
    return await res.json();
}

// =========================
// BUSCAR VÍNCULOS DE UM DOCUMENTO PAI
// =========================
export async function getLinks(parentId) {
    const res = await fetch(`${API_URL}/links/${parentId}`);
    if (!res.ok) throw new Error("Erro ao carregar vínculos");
    return await res.json();
}

// =========================
// VINCULAR DOCUMENTO (criar relação pai-filho via links)
// =========================
export async function linkDoc(parentId, childId) {
    const res = await fetch(`${API_URL}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parent: parentId, child: childId })
    });

    if (!res.ok) throw new Error("Erro ao vincular documento");
    return await res.json();
}

// =========================
// DESVINCULAR DOCUMENTO (remover relação pai-filho via linkId)
// =========================
export async function unlinkDoc(linkId) {
    const res = await fetch(`${API_URL}/links/${linkId}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Erro ao remover vínculo");
    return await res.json();
}
