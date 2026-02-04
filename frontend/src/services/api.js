const base = (import.meta.env.BASE_URL || "/gradepilot").replace(/\/$/, "");
export const apiBase = (import.meta.env.VITE_API_URL || `${base}/api`).replace(/\/$/, "");

async function ensureJson(res, fallbackMsg) {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || fallbackMsg);
    }

    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
        const text = await res.text();
        throw new Error(text || "La API no devolvio JSON");
    }

    return res.json();
}

export async function validateExam(formData) {
    const res = await fetch(`${apiBase}/validate`, {
        method: "POST",
        body: formData,
    });
    return ensureJson(res, "Error en validacion");
}

export async function correctExam(formData) {
    const res = await fetch(`${apiBase}/corregir`, {
        method: "POST",
        body: formData,
    });
    return ensureJson(res, "Error en correccion");
}

export async function getPreview(sessionId) {
    const res = await fetch(`${apiBase}/preview/${sessionId}`);
    return ensureJson(res, "Error al obtener preview");
}

export async function getMetrics(sessionId) {
    const res = await fetch(`${apiBase}/metrics/${sessionId}`);
    return ensureJson(res, "Error al obtener metricas");
}

export function downloadExcel(sessionId) {
    window.open(`${apiBase}/download/${sessionId}`, "_blank");
}

export function downloadPdf(sessionId) {
    window.open(`${apiBase}/export-pdf/${sessionId}`, "_blank");
}
