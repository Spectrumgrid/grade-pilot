const API_URL = import.meta.env.VITE_API_URL;

export async function validateExam(formData) {
    const res = await fetch(`${API_URL}/validate`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Error en validación");
    }

    return res.json();
}

export async function correctExam(formData) {
    const res = await fetch(`${API_URL}/corregir`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Error en corrección");
    }

    return res.json();
}

export async function getPreview(sessionId) {
    const res = await fetch(`${API_URL}/preview/${sessionId}`);
    if (!res.ok) throw new Error("Error al obtener preview");
    return res.json();
}

export async function getMetrics(sessionId) {
    const res = await fetch(`${API_URL}/metrics/${sessionId}`);
    if (!res.ok) throw new Error("Error al obtener métricas");
    return res.json();
}

export function downloadExcel(sessionId) {
    window.open(`${API_URL}/download/${sessionId}`, "_blank");
}

export function downloadPdf(sessionId) {
    window.open(`${API_URL}/export-pdf/${sessionId}`, "_blank");
}
