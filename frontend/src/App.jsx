import { useState, useRef, useEffect } from "react";
import "./App.css";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import toast, { Toaster } from "react-hot-toast";
import { validateExam, correctExam, getPreview, getMetrics, downloadExcel, downloadPdf } from "./services/api";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [showMetrics, setShowMetrics] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [nOpciones, setNOpciones] = useState(5);
  const [nPreguntas, setNPreguntas] = useState(10);
  const [bumpPreguntas, setBumpPreguntas] = useState(false);
  const [history, setHistory] = useState([]);
  const [session_id, setSessionId] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem("corrector_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleClick = () => {
    if (!loading) {
      fileInputRef.current?.click();
    }
  };


  const updateNPreguntas = (value) => {
    setNPreguntas(value);
    setValidated(false);

    setBumpPreguntas(true);
    setTimeout(() => setBumpPreguntas(false), 150);
  };


  const validarArchivo = async () => {
    if (!file) {
      toast.error("Selecciona un archivo antes de validar");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("n_opciones", nOpciones);
    formData.append("n_preguntas", nPreguntas);

    try {
      const res = await fetch(`${API_URL}/validate`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Error en la validación");
      }

      toast.success("Archivo válido. Puedes corregir el examen.");
      setValidated(true);
    } catch (err) {
      toast.error(err.message);
      setValidated(false);
    }
  };


  const corregir = async () => {
    if (!file) {
      toast.error("Por favor, selecciona un archivo primero");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("n_opciones", nOpciones);
    formData.append("n_preguntas", nPreguntas);

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/corregir`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error en la corrección");
      }

      const data = await response.json();
      const newSessionId = data.session_id;
      setSessionId(newSessionId);

      toast.success("¡Examen corregido y descargado!");

      // Obtener datos para el historial
      const previewRes = await fetch(`${API_URL}/preview/${newSessionId}`);
      const previewJson = await previewRes.json();
      const metricsRes = await fetch(`${API_URL}/metrics/${newSessionId}`);
      const metricsJson = await metricsRes.json();

      // ACTUALIZAR ESTADO LOCAL PARA QUE SE VEA AL MOMENTO
      setPreviewData(previewJson);
      setMetrics(metricsJson);

      const newHistoryItem = {
        id: Date.now(),
        filename: file.name,
        date: new Date().toLocaleString(),
        nOpciones,
        previewData: previewJson,
        metrics: metricsJson
      };

      const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("corrector_history", JSON.stringify(updatedHistory));

      setSuccess(true);
    } catch (err) {
      console.error("Error en corrección:", err);
      toast.error(err.message || "Hubo un fallo al corregir el archivo");
    } finally {
      setLoading(false);
    }
  };

  const descargarExcel = async () => {
    try {
      const response = await fetch(`${API_URL}/download/${session_id}`);
      if (!response.ok) throw new Error("Error al descargar Excel");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "examen_corregido.xlsx";
      a.click();
      toast.success("Excel descargado correctamente");
    } catch (err) {
      toast.error("Error al descargar el Excel");
    }
  };

  const descargarPDF = async () => {
    try {
      const response = await fetch(`${API_URL}/export-pdf/${session_id}`);
      if (!response.ok) throw new Error("Error al exportar PDF");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte_examen.pdf";
      a.click();
      toast.success("¡PDF exportado con éxito!");
    } catch (err) {
      toast.error("Error al exportar el PDF");
    }
  };


  return (
    <div className="page">
      <Toaster position="top-right" />
      <div className="glass-card enter">
        <div className="glass-card-body">

          {/* ===== TUTORIAL MODAL ===== */}
          {showTutorial && (
            <div className="tutorial-modal">
              <div className="tutorial-content">
                <div className="tutorial-header">
                  Tutorial
                </div>

                <div className="tutorial-body">
                  <h3>📋 Formato requerido del Excel</h3>

                  <div className="tutorial-section">
                    <h4>Estructura de columnas:</h4>
                    <ul>
                      <li><strong>Columna A:</strong> DNI de los alumnos</li>
                      <li><strong>Columnas B-K:</strong> P1, P2, P3... PN (las N preguntas). Hasta un mínimo de 5 preguntas y un máximo de 20.</li>
                    </ul>
                  </div>

                  <div className="tutorial-section">
                    <h4>Filas importantes:</h4>
                    <ul>
                      <li><strong>Fila 1:</strong> Encabezados (DNI, P1, P2, P3... PN)</li>
                      <li><strong>Fila 2:</strong> Clave de respuestas correctas</li>
                      <li><strong>Fila 3 en adelante:</strong> Respuestas de cada alumno</li>
                    </ul>
                  </div>

                  <div className="tutorial-section">
                    <h4>Formato de respuestas:</h4>
                    <ul>
                      <li>Opciones disponibles: <strong>A, B, C, D, E</strong></li>
                      <li>Respuesta simple: <code>A</code></li>
                      <li>Respuestas múltiples: <code>A,B</code> o <code>C,D,E</code></li>
                      <li>Sin respuesta: dejar la celda <strong>vacía</strong></li>
                    </ul>
                  </div>

                  <div className="tutorial-image">
                    <img src="/artifacts/excel_format_example.png" alt="Ejemplo de formato Excel" />
                    <p className="image-caption">Ejemplo del formato correcto del Excel</p>
                  </div>

                  <div className="tutorial-section">
                    <h4>📝 Pasos para usar el corrector:</h4>
                    <ol>
                      <li>Prepara tu archivo Excel con el formato indicado arriba</li>
                      <li>Asegúrate de que la fila 2 contiene las respuestas correctas</li>
                      <li>Haz clic en "Seleccionar archivo" o arrastra el Excel a la zona de carga</li>
                      <li>Presiona el botón "Corregir examen"</li>
                      <li>El archivo corregido se descargará automáticamente</li>
                      <li>Opcionalmente, puedes ver las métricas y el preview de notas</li>
                      <li>Si necesitas descargar el Excel de nuevo, usa el botón "Descargar Excel"</li>
                    </ol>
                  </div>

                  <div className="tutorial-section tutorial-note">
                    <strong>💡 Nota importante:</strong> El sistema calcula automáticamente:
                    <ul>
                      <li>Puntuación por aciertos y penalización por errores</li>
                      <li>Estadísticas detalladas por pregunta y opción</li>
                      <li>Gráficos de análisis en la hoja MÉTRICAS del Excel</li>
                    </ul>
                  </div>
                </div>

                <div className="tutorial-footer">
                  <button
                    className="primary-btn"
                    onClick={() => setShowTutorial(false)}
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== PREVIEW MODAL ===== */}
          {showPreview && (
            <div className="preview-modal">
              <div className="preview-content">

                <div className="preview-header">
                  Preview de notas
                </div>

                <div className="preview-table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>DNI</th>
                        <th>Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, idx) => {
                        const isAprobado = row.presentado && row.nota >= 5;
                        const isSuspenso = row.presentado && row.nota < 5;
                        const className = isAprobado ? "aprobado" : isSuspenso ? "suspenso" : "";

                        return (
                          <tr key={idx} className={className}>
                            <td>{row.dni}</td>
                            <td>{Number(row.nota).toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="preview-footer">
                  <button
                    className="primary-btn"
                    onClick={() => setShowPreview(false)}
                  >
                    Cerrar
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ===== METRICS MODAL ===== */}
          {showMetrics && metrics && (
            <div className="metrics-modal">
              <div className="metrics-content">

                <div className="metrics-header">
                  Métricas del examen
                </div>

                <div className="metrics-body">
                  {/* === BLOQUE PRINCIPAL === */}
                  <div className="metric-hero">
                    <span className="hero-label">Nota media </span>
                    <br />
                    <span className="hero-value">{metrics.media}</span>
                    <br />
                    <span className="hero-sub">
                      {metrics.aprobados} aprobados · {metrics.suspensos} suspensos
                    </span>
                  </div>

                  {/* === PARTICIPACIÓN === */}
                  <div className="metric-row">
                    <div>
                      <span className="row-label">Presentados</span>
                      <strong>
                        {metrics.presentados} / {metrics.alumnos_totales}
                      </strong>
                    </div>
                    <div>
                      <span className="row-label">Aprobados</span>
                      <strong>{metrics.porcentaje_aprobados}%</strong>
                    </div>
                  </div>

                  {/* === DETALLE === */}
                  <div className="metric-detail">
                    <div>
                      Máxima <strong>{metrics.max}</strong>
                    </div>
                    <div>
                      Mínima <strong>{metrics.min}</strong>
                    </div>
                  </div>

                  {/* === GRÁFICOS === */}
                  {metrics.question_data && (
                    <>
                      {/* Gráfico de puntuación media por pregunta */}
                      <div className="chart-section">
                        <h3 className="chart-title">Puntuación media por pregunta</h3>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={metrics.question_data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="question" stroke="#fff" />
                            <YAxis stroke="#fff" domain={[0, 1]} tickFormatter={(val) => val.toFixed(2)} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(30, 60, 114, 0.95)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "8px",
                                color: "#fff",
                              }}
                            />
                            <Bar dataKey="avg_score" fill="#00c6ff" name="Puntuación media" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Gráfico de tasa de acierto por opción */}
                      <div className="chart-section">
                        <h3 className="chart-title">Porcentaje de aciertos por opción (%)</h3>
                        <p className="chart-subtitle">
                          Acierto = marcar cuando es correcta O no marcar cuando es incorrecta
                        </p>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={metrics.question_data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="question" stroke="#fff" />
                            <YAxis stroke="#fff" domain={[0, 100]} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(30, 60, 114, 0.95)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                borderRadius: "8px",
                                color: "#fff",
                              }}
                            />
                            <Legend />
                            {
                              ["A", "B", "C", "D", "E"]
                                .slice(0, metrics.n_opciones || 5)
                                .map((opt, idx) => {
                                  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
                                  return (
                                    <Bar
                                      key={opt}
                                      dataKey={opt}
                                      fill={colors[idx]}
                                      name={opt}
                                      radius={[8, 8, 0, 0]}
                                    />
                                  );
                                })
                            }
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  )}
                </div>
                <div className="metrics-footer">
                  <button
                    className="primary-btn"
                    onClick={() => setShowMetrics(false)}
                  >
                    Cerrar
                  </button>
                </div>

              </div>
            </div>
          )}


          {/* ===== SUCCESS STATE ===== */}
          {success && !loading && (
            <div className="success-state">
              <IconCircleCheckFilled size={56} className="success-icon" />
              <h2>Examen corregido</h2>
              <p>El archivo se ha procesado correctamente.</p>

              <button
                className="secondary-btn"
                onClick={descargarExcel}
              >
                Descargar Excel
              </button>
              <button
                className="secondary-btn"
                onClick={descargarPDF}
              >
                Exportar a PDF
              </button>
              <button
                className="secondary-btn"
                onClick={async () => {
                  const res = await fetch(`${API_URL}/preview/${session_id}`);
                  const data = await res.json();
                  setPreviewData(data);
                  setShowPreview(true);
                }}
              >
                Ver preview de notas
              </button>
              <button
                className="secondary-btn"
                onClick={async () => {
                  const res = await fetch(`${API_URL}/metrics/${session_id}`);
                  const data = await res.json();
                  setMetrics(data);
                  setShowMetrics(true);
                }}
              >
                Ver métricas
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  setFile(null);
                  setSuccess(false);
                  setShowPreview(false);
                  setPreviewData([]);
                }}
              >
                Corregir otro examen
              </button>
            </div>
          )}

          {/* ===== MAIN FORM ===== */}
          {!success && (
            <>
              {loading && (
                <div className="glass-loader">
                  <div className="spinner" />
                  <span>Corrigiendo examen…</span>
                </div>
              )}

              <h1>Grade Pilot</h1>
              <p className="subtitle">
                Sube el Excel del examen tipo test y descarga la corrección al instante
              </p>

              <div
                className={`file-upload ${file ? "loaded" : ""} ${dragActive ? "drag-active" : ""
                  } ${loading ? "disabled" : ""}`}
                onClick={handleClick}
                onDragEnter={!loading ? handleDrag : undefined}
                onDragOver={!loading ? handleDrag : undefined}
                onDragLeave={!loading ? handleDrag : undefined}
                onDrop={!loading ? handleDrop : undefined}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx"
                  disabled={loading}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setValidated(false);
                  }}
                />

                {!file ? (
                  <span className="drop-text">
                    Arrastra aquí el archivo Excel
                    <br />
                    o haz clic para seleccionarlo
                  </span>
                ) : (
                  <span className="file-loaded">
                    <IconCircleCheckFilled size={22} className="check-icon" />
                    {file.name}
                  </span>
                )}
              </div>

              {/* Selector de preguntas */}
              <div className="options-selector">
                <label>Número de preguntas del examen:</label>
                <div className="number-control">
                  <button
                    className="control-btn"
                    onClick={() => {
                      updateNPreguntas(Math.max(5, nPreguntas - 1));
                    }}
                    disabled={nPreguntas <= 5}
                  >
                    -
                  </button>
                  <div
                    className={`number-display 
                      ${bumpPreguntas ? "bump" : ""} 
                      ${nPreguntas <= 5 || nPreguntas >= 20 ? "disabled" : ""}
                    `}
                  >
                    {nPreguntas}
                  </div>
                  <button
                    className="control-btn"
                    onClick={() => {
                      updateNPreguntas(Math.min(20, nPreguntas + 1));
                    }}
                    disabled={nPreguntas >= 20}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Selector de opciones */}
              <div className="options-selector">
                <label>Número de opciones por pregunta:</label>
                <div className="options-buttons">
                  {[3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className={`opt-btn ${nOpciones === num ? "active" : ""}`}
                      onClick={() => {
                        setNOpciones(num);
                        setValidated(false);
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="secondary-btn"
                onClick={validarArchivo}
                disabled={!file || loading}
              >
                Validar archivo
              </button>

              <button
                className="primary-btn"
                onClick={corregir}
                disabled={!file || loading || !validated}
              >
                {loading ? "Corrigiendo…" : "Corregir examen"}
              </button>

              <button
                className="primary-btn"
                onClick={() => setShowTutorial(true)}
              >
                Tutorial
              </button>

              {/* Historial Reciente */}
              {history.length > 0 && (
                <div className="history-section">
                  <h3>Historial Reciente</h3>
                  <div className="history-list">
                    {history.map((item) => (
                      <div key={item.id} className="history-item">
                        <div className="history-info">
                          <strong>{item.filename}</strong>
                          <span>{item.date} · {item.nOpciones} opciones</span>
                        </div>
                        <div className="history-actions">
                          <button
                            className="history-btn"
                            onClick={() => {
                              setPreviewData(item.previewData);
                              setMetrics(item.metrics);
                              setSuccess(true);
                            }}
                          >
                            Ver
                          </button>
                          <button
                            className="history-btn delete"
                            onClick={() => {
                              const newHist = history.filter(h => h.id !== item.id);
                              setHistory(newHist);
                              localStorage.setItem("corrector_history", JSON.stringify(newHist));
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="clear-history"
                    onClick={() => {
                      setHistory([]);
                      localStorage.removeItem("corrector_history");
                    }}
                  >
                    Borrar historial
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

}

export default App;
