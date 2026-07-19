# Backend Quick Start Guide

## ⚡ Quick Setup (30 seconds)

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Start the Server
```bash
uvicorn app.main:app --reload
```

### 3. Verify It's Running
```
✅ Server running at http://localhost:8000
✅ Swagger Docs at http://localhost:8000/docs
```

---

## 📡 API Base URL

```
http://localhost:8000/api/v1
```

---

## 🔑 Key Endpoints

### Upload a Report
```bash
curl -X POST http://localhost:8000/api/v1/reports/upload \
  -F "file=@your-file.pdf"
```

### Connect Platform
```bash
curl -X POST http://localhost:8000/api/v1/platforms/connect \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "YouTube",
    "account_email": "user@example.com"
  }'
```

### Get All Reports
```bash
curl http://localhost:8000/api/v1/reports
```

### Check Health
```bash
curl http://localhost:8000/api/v1/health
```

---

## 📂 Project Structure

```
backend/
├── app/
│   ├── main.py              ← Main FastAPI app
│   ├── core/
│   │   └── config.py        ← Configuration
│   ├── api/
│   │   └── v1/
│   │       ├── health.py    ← Health endpoint
│   │       ├── reports.py   ← Report endpoints
│   │       └── platforms.py ← Platform endpoints
│   └── db/
│       └── memory.py        ← In-memory storage
└── requirements.txt         ← Dependencies
```

---

## ✅ What's New (MVP)

✅ FastAPI framework
✅ Uvicorn server
✅ In-memory database (no PostgreSQL needed)
✅ Report upload API
✅ Platform connection API
✅ CORS enabled for frontend
✅ Auto-reload for development
✅ Swagger API docs

---

## 🚫 What's Removed (MVP)

❌ PostgreSQL dependency (psycopg2-binary)
❌ SQLAlchemy ORM
❌ Alembic migrations
❌ Database configuration

---

## 💡 Example: Frontend Integration

```typescript
// React/TypeScript example
async function uploadReport(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    'http://localhost:8000/api/v1/reports/upload',
    { method: 'POST', body: formData }
  );

  const data = await response.json();
  console.log(data);
  // { success: true, report_id: "...", filename: "..." }
}
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 8000 in use | `uvicorn app.main:app --reload --port 8001` |
| Module not found | `cd backend` then `pip install -r requirements.txt` |
| CORS error | Frontend must be on localhost:5173 or update config |
| Import errors | Python 3.8+ required (tested on 3.14) |

---

## 📚 API Documentation

After starting the server, visit:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **OpenAPI JSON:** http://localhost:8000/openapi.json

---

## 🔄 Stop the Server

Press `Ctrl+C` in the terminal running uvicorn.

---

## 📝 Important Notes

- **Data is NOT persistent** - stored in memory only
- **For MVP only** - will switch to real database for production
- **Debug mode ON** - server auto-reloads on file changes
- **CORS enabled** - frontend on localhost:5173 can communicate freely

---

**Status:** ✅ Ready to Go!

Your backend is now running and ready to serve the frontend.
