# 🎓 Grade Pilot — Guía de Uso

Grade Pilot es una herramienta web para la **corrección automática de exámenes tipo test** a partir de archivos Excel.

Está diseñada para **profesores universitarios y personal académico**, sin necesidad de conocimientos técnicos.

---

## 🚀 Acceso a la aplicación

Puedes usar Grade Pilot directamente desde tu navegador:

👉 https://grade-pilot-1.onrender.com

No es necesario instalar nada.

---

## 📂 Paso 1 — Preparar el Excel

El archivo Excel debe tener **exactamente este formato**:

### Estructura obligatoria

| Fila    | Contenido                                          |
| ------- | -------------------------------------------------- |
| Fila 1  | Encabezados (`DNI`, `P1`, `P2`, ..., `PN`) |
| Fila 2  | Respuestas correctas                               |
| Fila 3+ | Respuestas de los alumnos                          |

- La **columna A** debe contener el identificador del alumno (DNI, matrícula, etc.)
- Las columnas siguientes corresponden a las preguntas (mínimo 5 y máximo 20)

---

### Formato de respuestas

- Respuesta simple: `A`
- Respuesta múltiple: `A,B`
- Celda vacía: pregunta no respondida

Un alumno se considera **no presentado** si todas sus respuestas están vacías.

---

## 🧮 Paso 2 — Seleccionar opciones

Antes de subir el Excel, debes indicar:

- Número de opciones por pregunta (3, 4 o 5)
- Número total de preguntas (5-20)

Esto permite al sistema **validar el archivo antes de corregirlo**.

---

## 🧪 Paso 3 — Validación automática

Al subir el Excel, Grade Pilot verifica automáticamente:

- Que el número de columnas es correcto
- Que existe una fila de respuestas correctas
- Que las respuestas están dentro del rango permitido
- Que el número de preguntas coincide con lo seleccionado
- Que existe una columna de identificación de alumno completada

⚠️ Si hay errores, el sistema **no permite continuar** hasta corregirlos.

---

## 📊 Paso 4 — Resultados y métricas

Una vez validado y corregido el examen, puedes:

- Ver un **preview de las notas**
- Consultar **métricas estadísticas**
  - Nota media
  - Aprobados / suspensos
  - Análisis por pregunta y opción

---

## 📁 Paso 5 — Exportar resultados

Puedes descargar:

- 📊 **Excel corregido**
  - Notas finales
  - Hoja de métricas
  - Gráficos incluidos
- 📄 **Informe PDF**
  - Tabla de notas
  - Resumen estadístico
  - Visualizaciones

---

## 🔐 Privacidad y seguridad

- No se almacenan datos personales permanentemente
- Cada corrección se procesa en una sesión aislada
- No se requiere registro ni cuenta de usuario
- Compatible con entornos académicos y GDPR

---

## 🆘 Problemas frecuentes

- ❌ “El archivo no es válido” → revisa filas y número de columnas
- ❌ “No coincide el número de preguntas” → ajusta la selección inicial
- ❌ “Respuestas fuera de rango” → revisa la fila de respuestas correctas

---

## 🎯 Público objetivo

- Profesores universitarios
- Departamentos académicos
- Personal de evaluación
- Instituciones educativas

---

Grade Pilot está diseñado para **ahorrar tiempo**, **evitar errores** y **garantizar correcciones justas y reproducibles**.
