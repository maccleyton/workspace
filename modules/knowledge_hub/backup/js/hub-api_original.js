// ===============================
// Knowledge Hub - API Centralizada
// ===============================

// 🔥 URL do backend no Render
export const API_BASE = "https://workspace-backend-p5xx.onrender.com";

// -------------------------------
// Função genérica de requisição
// -------------------------------
async function apiRequest(path, method = "GET", body = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE}${path}`, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (err) {
        console.error("🚨 API ERROR:", err);
        throw err;
    }
}

// -------------------------------
// Documentos
// -------------------------------

// Listar documentos
export async function listDocs() {
    return apiRequest("/api/docs", "GET");
}

// Obter documento por ID
export async function getDoc(id) {
    return apiRequest(`/api/docs/${id}`, "GET");
}

// Criar novo documento
export async function createDoc(data) {
    return apiRequest("/api/docs", "POST", data);
}

// Atualizar documento existente
export async function updateDoc(id, data) {
    return apiRequest(`/api/docs/${id}`, "PUT", data);
}

// Deletar documento
export async function deleteDoc(id) {
    return apiRequest(`/api/docs/${id}`, "DELETE");
}

// Criar vínculo pai → filho
export async function linkDoc(id, parentId) {
    return apiRequest(`/api/docs/${id}/link`, "PUT", { parent_id: parentId });
}

// Remover vínculo
export async function unlinkDoc(id) {
    return apiRequest(`/api/docs/${id}/unlink`, "PUT");
}
