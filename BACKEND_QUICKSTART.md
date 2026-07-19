# FastAPI Backend - Quick Start Guide

## 🚀 Installation & Setup

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Server
```bash
# Option 1: Using Python module (recommended)
python -m app.main

# Option 2: Using uvicorn directly
uvicorn app.main:app --reload

# Option 3: With specific host/port
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
```

## 🌐 Test the API

### Health Check
```bash
curl http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "message": "ContentPulse API is running"
}
```

### Via Browser/Swagger UI
1. Open: http://localhost:8000/docs
2. Test any endpoint directly in the UI
3. See real-time responses

### Via ReDoc
1. Open: http://localhost:8000/redoc
2. View full API documentation

## 📝 Example API Calls

### Upload a File
```bash
curl -X POST \
  -F "file=@report.pdf" \
  http://localhost:8000/api/v1/upload
```

### Get Analytics
```bash
curl http://localhost:8000/api/v1/analytics?report_id=123
```

### Get KPIs
```bash
curl http://localhost:8000/api/v1/analytics/kpis/report-id-here
```

### Get AI Insights
```bash
curl http://localhost:8000/api/v1/ai/insights/report-id-here
```

### Get Recommendations
```bash
curl http://localhost:8000/api/v1/ai/recommendations/report-id-here
```

## 📚 API Endpoints

### Root & Health
- `GET /` - API info
- `GET /health` - Health status

### Upload
- `POST /api/v1/upload` - Upload file
- `POST /api/v1/upload/analyze` - Analyze report

### Analytics
- `GET /api/v1/analytics` - Get analytics data
- `GET /api/v1/analytics/kpis/{report_id}` - Get KPIs
- `GET /api/v1/analytics/trends/{report_id}` - Get trends
- `GET /api/v1/analytics/topics/{report_id}` - Get topics

### AI
- `POST /api/v1/ai/analyze` - Start analysis
- `GET /api/v1/ai/insights/{report_id}` - Get insights
- `GET /api/v1/ai/summary/{report_id}` - Get summary
- `GET /api/v1/ai/recommendations/{report_id}` - Get recommendations

### Reports
- `POST /api/v1/reports/upload` - Upload report
- `GET /api/v1/reports` - List reports
- `GET /api/v1/reports/{report_id}` - Get report details
- `DELETE /api/v1/reports/{report_id}` - Delete report

### Platforms
- `POST /api/v1/platforms/connect` - Connect platform
- `GET /api/v1/platforms` - List connections
- `GET /api/v1/platforms/{connection_id}` - Get connection
- `DELETE /api/v1/platforms/{connection_id}` - Disconnect

## 🔧 Configuration

### Environment Variables
Create `.env` file in `backend/` directory:

```env
APP_NAME=ContentPulse API
APP_VERSION=1.0.0
DEBUG=True
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

### Change Port
```bash
uvicorn app.main:app --reload --port 9000
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process using port 8000
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

### Module Not Found
```bash
# Reinstall dependencies
pip install -r requirements.txt

# Or upgrade pip
pip install --upgrade pip
```

### Virtual Environment Issues
```bash
# Deactivate current venv
deactivate

# Remove and recreate
rm -rf venv  # or rmdir venv on Windows
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

## 📱 Frontend Integration

The frontend (React) can now connect to:
```
API Base URL: http://localhost:8000
```

Example fetch:
```javascript
const response = await fetch('http://localhost:8000/api/v1/analytics/kpis/report-123');
const data = await response.json();
console.log(data);
```

## 📚 Documentation

- Full backend docs: `backend/BACKEND_README.md`
- API structure: Swagger UI at `/docs`
- All endpoints are documented inline

## 🎉 Next Steps

1. Test all endpoints via Swagger UI
2. Connect frontend to API
3. Verify CORS works with frontend
4. Start implementing real services
5. Add authentication layer
6. Set up database

## 💡 Tips

- Always activate venv before working
- Keep dependencies updated: `pip install -r requirements.txt --upgrade`
- Use `--reload` flag during development for hot reload
- Check logs for errors - they're detailed and helpful
- Use Swagger UI for manual testing
- Test endpoints before integrating with frontend

---

**Backend is ready to use! Happy coding! 🚀**
