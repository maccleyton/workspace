// js/hub-api-assistant.js

const API_URL = "http://localhost:3000"; // URL do seu backend do Hub

// =========================
// GET LISTA DE DOCUMENTOS
// =========================
export async function getDocs() {
    const res = await fetch(`${API_URL}/documents`);
    if (!res.ok) throw new Error("Erro ao carregar documentos");
    return await res.json();
}