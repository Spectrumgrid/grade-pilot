# 🎓 Grade‑Pilot

Grade‑Pilot is a **production‑ready automatic exam correction platform** designed specifically for **universities, higher‑education institutions and academic staff**.

It provides a complete workflow to **validate, correct, analyse and export multiple‑choice exams** using Excel files, ensuring correctness, fairness and transparency in grading while drastically reducing manual workload.

Grade‑Pilot is built as a **real academic tool**, not a demo: it follows robust validation rules, generates reproducible metrics, and is suitable for everyday use by lecturers with no technical background.

DEMO-URL: https://grade-pilot-1.onrender.com/ 

---

## ✨ Core Capabilities

### 🧪 Intelligent exam correction

- Supports **3, 4 or 5 options per question**
- Supports **variable question counts (5 to 20 questions)**
- Handles **single‑answer and multiple‑answer questions**
- Correct application of **negative marking**
- Ensures **grades are never negative**
- Automatically detects **non‑presented students**
- Consistent and deterministic scoring logic

### 🔎 Mandatory pre‑validation step

Before correction, the system verifies:

- Excel structure and exact column count (matching user selection)
- Presence of a valid answer key
- Consistency between selected number of options and detected answers
- Exact matching between selected number of questions and Excel columns
- Invalid or out‑of‑range answer keys
- Common formatting errors

This prevents silent grading errors and ensures academic reliability.

### 📊 Advanced metrics & analytics

Grade‑Pilot generates detailed statistics:

- Total students / presented / non‑presented
- Average, minimum and maximum grade
- Pass/fail counts and percentages
- Per‑question analytics:
  - Average score
  - Response rate
  - Accuracy by option (A–E)

Metrics are available:

- In the web interface (interactive charts)
- Inside the generated Excel file
- Inside the exported PDF report

### 📁 Export formats

- **Excel (.xlsx)**
  - Original data
  - Corrected grades
  - Metrics table
  - Embedded charts
- **PDF report**
  - Student grades table
  - Summary metrics
  - Graphical analysis (charts)

### 🧠 Session‑based architecture

- Each correction generates a **unique session**
- Preview, metrics, Excel and PDF belong to the same session
- No data mixing between users or uploads
- Automatic cleanup of old sessions (configurable)

### 🖥️ Modern academic UI

- Glassmorphism design
- Drag‑and‑drop Excel upload
- Clear validation feedback
- Responsive layout
- No configuration files required
- Designed for non‑technical lecturers

---

## 📂 Excel Format Specification

### Required structure

| Row    | Content                                              |
| ------ | ---------------------------------------------------- |
| Row 1  | Column headers (`DNI`, `P1`, `P2`, … `PN`)           |
| Row 2  | Correct answers (answer key)                         |
| Row 3+ | Student responses                                    |

*Where N is the number of questions selected in the UI (5–20).*

### Answer format

- Single answer: `A`
- Multiple answers: `A,B`
- Empty cell: unanswered

A student is considered *not presented* if **all answers are empty**.

---

## 🧮 Scoring Model

- Each question is worth **1 point**
- Correct answers share the point equally
- Incorrect selections subtract proportionally
- Not selecting an incorrect option counts as correct
- Final score is clamped to **≥ 0**

This model ensures:

- Fairness across different numbers of correct answers
- No advantage for random guessing
- Transparency and reproducibility

---

## 🛠️ Technical Stack

### Backend

- Python
- FastAPI
- Pandas
- OpenPyXL
- ReportLab
- Matplotlib

### Frontend

- React
- Vite
- Recharts
- Tabler Icons
- Custom CSS (Glassmorphism)
- React Hot Toast

---

## ⚙️ Local Installation

### Backend

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
npm install
npm run dev
```

Default ports:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

---

## 🔐 Privacy & Deployment

- No authentication required
- No external databases
- All data stored locally per session
- Suitable for **on‑premise university deployment**
- GDPR‑friendly by design

---

## 🎯 Intended Users

- University lecturers
- Teaching assistants
- Academic departments
- Examination offices
- Educational institutions

---

## 📜 License

MIT License
© 2025 Spectrumgrid S.L.

Free for academic, institutional and commercial use.

---

## 📬 Contributions & Contact

Contributions, feedback and institutional collaborations are welcome.

Grade‑Pilot is designed to evolve into a full academic assessment platform.
