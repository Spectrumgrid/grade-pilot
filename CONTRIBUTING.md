# Contributing to Grade-Pilot

First of all, thank you for considering contributing to **Grade-Pilot** 🚀  
This project aims to provide a **robust, transparent, and academically sound automatic grading system** for university-level multiple-choice exams.

Contributions from educators, researchers, and developers are very welcome.

---

## 📌 Project Philosophy

Grade-Pilot is designed with the following principles in mind:

- **Academic rigor**: grading logic must be explicit, reproducible, and fair.
- **Transparency**: scoring rules and metrics should be easy to inspect and audit.
- **Instructor-first design**: the tool must remain usable by non-technical university staff.
- **Data privacy**: no external storage or third-party services by default.
- **Maintainability**: clarity and readability over premature optimization.

Please keep these principles in mind when proposing changes.

---

## 🧩 Ways to Contribute

You can contribute in several ways:

### 🐛 Bug Reports
- Incorrect grading
- Edge cases in validation
- UI/UX inconsistencies
- Performance issues

### ✨ Feature Proposals
- New grading strategies
- Additional metrics or visualizations
- Export formats (CSV, LMS integration, etc.)
- Accessibility or usability improvements

### 🧪 Tests & Validation
- Add test cases for grading logic
- Improve Excel format validation
- Stress-test large cohorts

### 📚 Documentation
- Improve README clarity
- Add examples or screenshots
- Write usage guides for instructors

---

## 🛠 Development Setup

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will be available at:
```
http://127.0.0.1:8000
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at:
```
http://localhost:5173
```

---

## 🧪 Testing Guidelines

- Prefer **deterministic tests** (same input → same output).
- Validate both:
  - correct answers
  - incorrect / empty / malformed answers
- When modifying scoring logic:
  - clearly document the mathematical reasoning
  - include at least one example case

Automated tests are encouraged, but clarity is mandatory.

---

## 🧱 Code Style

### Backend
- Follow **PEP8**
- Use descriptive variable names
- Avoid hidden side effects
- Raise explicit HTTP errors with meaningful messages

### Frontend
- Prefer functional components
- Keep state minimal and explicit
- Avoid deeply nested JSX
- Prioritize readability over abstraction

---

## 🔐 Security & Privacy

- Do **not** introduce external tracking or analytics
- Do **not** log personal data unnecessarily
- Treat student identifiers (DNI, IDs) as sensitive data

If you discover a security issue, **do not open a public issue**.  
Contact the maintainer directly.

---

## 📥 Pull Request Process

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit with clear messages:
   ```
   feat: add validation for duplicated DNIs
   fix: handle empty answer rows correctly
   ```
4. Open a Pull Request with:
   - clear description
   - motivation
   - screenshots or examples if UI-related

Pull requests may be reviewed from both a **technical** and **pedagogical** perspective.

---

## 🧠 Academic Integrity

Grade-Pilot is intended as an **assessment support tool**, not a substitute for pedagogical judgment.

Contributions that:
- obscure grading logic,
- introduce opaque heuristics,
- or reduce instructor control

will not be accepted.

---

## 🙌 Thank You

Your contribution helps make academic assessment:
- more efficient,
- more transparent,
- and more fair.

Thank you for being part of **Grade-Pilot**.
