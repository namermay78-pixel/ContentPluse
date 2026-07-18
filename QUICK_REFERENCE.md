# ⚡ Quick Reference - ContentPulse Commands

## 🚀 First Time Setup (Complete)

### 1. Frontend Initial Setup
```bash
cd frontend
npm install
cp .env.example .env.local
```
**Then edit `.frontend/.env.local`:**
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 2. Backend Initial Setup
```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```
**Then edit `backend/.env`:**
```
DATABASE_URL=postgresql://user:password@localhost:5432/contentpulse
GEMINI_API_KEY=your_api_key_here
DEBUG=False
```

### 3. Create Database
```bash
createdb contentpulse
```

### 4. Install shadcn/ui (Optional)
```bash
cd frontend
npx shadcn-ui@latest init
```

---

## 🏃 Daily Development Commands

### Start Both Servers

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Access: http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python -m uvicorn app.main:app --reload
```
Access: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 📝 Common Development Tasks

### Install New Frontend Package
```bash
cd frontend
npm install package-name
```

### Install New Backend Package
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install package-name
pip freeze > requirements.txt  # Update requirements
```

### Format Backend Code
```bash
cd backend
source venv/bin/activate
pip install black flake8
black app/
flake8 app/
```

### Run Backend Tests
```bash
cd backend
source venv/bin/activate
pip install pytest
pytest tests/
```

### Build Frontend for Production
```bash
cd frontend
npm run build
npm run preview
```

---

## 🔍 Testing Endpoints

### Health Check
```bash
curl http://localhost:8000/api/v1/health
```

Expected Response:
```json
{
  "status": "healthy",
  "message": "ContentPulse API is running"
}
```

---

## 🌍 Environment Variables

### Frontend (.env.local)
| Variable | Default |
|----------|---------|
| `VITE_API_BASE_URL` | `http://localhost:8000/api/v1` |
| `VITE_ENV` | `development` |

### Backend (.env)
| Variable | Required | Default |
|----------|----------|---------|
| `DATABASE_URL` | ✅ | (PostgreSQL URL) |
| `GEMINI_API_KEY` | ✅ | (API key) |
| `DEBUG` | ❌ | `False` |
| `APP_NAME` | ❌ | `ContentPulse` |
| `APP_VERSION` | ❌ | `0.1.0` |

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start
```bash
cd backend
# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Check Python version
python --version  # Should be 3.9+

# Reinstall dependencies
pip install -r requirements.txt

# Try running directly
python app/main.py
```

### Database connection error
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in backend/.env
# Try creating database again
createdb contentpulse

# Or check if it exists
psql -l
```

### CORS errors in frontend
- Ensure backend is running
- Check ALLOWED_ORIGINS in backend/.env includes http://localhost:5173
- Verify VITE_API_BASE_URL in frontend/.env.local

---

## 📚 Project Files Reference

| File | Purpose |
|------|---------|
| `README.md` | Comprehensive documentation |
| `.env.example` | Template for environment variables |
| `FILES_CREATED.md` | Complete file inventory |
| `SETUP_SUMMARY.md` | Setup summary and quick start |

---

## 🔗 Useful Links

- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **shadcn/ui**: https://ui.shadcn.com/
- **FastAPI**: https://fastapi.tiangolo.com/
- **SQLAlchemy**: https://docs.sqlalchemy.org/
- **Zustand**: https://github.com/pmndrs/zustand
- **Gemini API**: https://aistudio.google.com/

---

## 📋 Project Status

✅ Frontend scaffold
✅ Backend scaffold
✅ Database configuration
✅ Environment setup
✅ Documentation complete

⏳ Ready to start implementing features!

---

**Last Updated**: Project Setup Complete
