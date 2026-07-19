# ContentPulse FastAPI Backend

Professional, modular FastAPI backend for the ContentPulse AI-powered content analytics platform.

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI application entry point
│   ├── __init__.py
│   ├── routers/               # API route modules (NEW)
│   │   ├── __init__.py
│   │   ├── upload.py          # File upload and processing routes
│   │   ├── analytics.py       # Analytics data retrieval routes
│   │   └── ai.py              # AI insights and analysis routes
│   ├── api/
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── health.py      # Health check endpoint
│   │   │   ├── reports.py     # Report management endpoints
│   │   │   └── platforms.py   # Platform connection endpoints
│   ├── services/              # Business logic (NEW)
│   │   ├── __init__.py
│   │   ├── pdf_parser.py      # PDF file parsing service
│   │   ├── csv_parser.py      # CSV file parsing service
│   │   ├── ai_service.py      # AI insights generation service
│   │   └── analytics_service.py # Analytics data processing service
│   ├── models/                # Pydantic models (directory placeholder)
│   │   └── __init__.py
│   ├── schemas/               # Request/response schemas (directory placeholder)
│   │   └── __init__.py
│   ├── utils/                 # Utility functions (directory placeholder)
│   │   └── __init__.py
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py          # Configuration settings
│   └── db/
│       ├── __init__.py
│       └── memory.py          # In-memory database
├── requirements.txt           # Python dependencies
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip package manager

### Installation

1. **Clone and navigate to backend:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Run the application:**
```bash
python -m app.main

# Or with uvicorn directly:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

5. **Access the API:**
- API Docs (Swagger UI): http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Health Check: http://localhost:8000/health

## 📚 API Endpoints

### Health Check
- **GET** `/health` - Server health status
- **GET** `/` - Root endpoint with API information

### Upload & Processing (NEW)
- **POST** `/api/v1/upload` - Upload report file (PDF, CSV, XLSX)
- **POST** `/api/v1/upload/analyze` - Trigger AI analysis on report

### Analytics (NEW)
- **GET** `/api/v1/analytics` - Get analytics data (with optional filters)
- **GET** `/api/v1/analytics/kpis/{report_id}` - Get KPI metrics
- **GET** `/api/v1/analytics/trends/{report_id}` - Get trend data
- **GET** `/api/v1/analytics/topics/{report_id}` - Get top performing topics

### AI Insights (NEW)
- **POST** `/api/v1/ai/analyze` - Start AI analysis
- **GET** `/api/v1/ai/insights/{report_id}` - Get AI insights
- **GET** `/api/v1/ai/summary/{report_id}` - Get executive summary
- **GET** `/api/v1/ai/recommendations/{report_id}` - Get recommendations

### Reports
- **POST** `/api/v1/reports/upload` - Upload report
- **GET** `/api/v1/reports` - List all reports
- **GET** `/api/v1/reports/{report_id}` - Get report details
- **DELETE** `/api/v1/reports/{report_id}` - Delete report

### Platforms
- **POST** `/api/v1/platforms/connect` - Connect to platform
- **GET** `/api/v1/platforms` - List all connections
- **GET** `/api/v1/platforms/{connection_id}` - Get connection details
- **DELETE** `/api/v1/platforms/{connection_id}` - Disconnect platform

## 🔧 Configuration

The application uses environment variables via `app.core.config`:

```python
# Default values in config.py:
- APP_NAME = "ContentPulse API"
- APP_VERSION = "1.0.0"
- DEBUG = False
- ALLOWED_ORIGINS = ["*"]  # CORS configuration
- API_V1_STR = "/api/v1"
```

### Override with .env file:
```bash
# backend/.env
APP_NAME=ContentPulse API
APP_VERSION=1.0.0
DEBUG=True
ALLOWED_ORIGINS=["http://localhost:3000"]
```

## 🔐 CORS Configuration

CORS is enabled with the following defaults:
- **Allow Origins:** `["*"]` (all origins)
- **Allow Methods:** All methods
- **Allow Headers:** All headers
- **Allow Credentials:** True

For production, update `allowed_origins` in `config.py`:

```python
ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://app.yourdomain.com",
]
```

## 📝 Services

### PDF Parser Service (`pdf_parser.py`)
- Extracts text, tables, and images from PDF files
- Returns metadata and parsed content
- Placeholder implementation (use PyPDF2, pdfplumber in production)

### CSV Parser Service (`csv_parser.py`)
- Parses CSV files into structured data
- Returns row count, columns, and preview
- Handles encoding automatically

### AI Service (`ai_service.py`)
- Generates AI-powered insights
- Creates strategic recommendations
- Produces executive summaries
- All functions return dummy data (integrate with AI model in production)

### Analytics Service (`analytics_service.py`)
- Generates KPI metrics
- Produces trend data
- Identifies top performing topics
- Analyzes content format performance

## 🗄️ Database

Currently uses in-memory storage (`app/db/memory.py`):
- No persistent storage
- Perfect for MVP and testing
- Ready to replace with PostgreSQL/MongoDB

To add database:
1. Create models in `app/models/`
2. Update `app/db/` with database queries
3. Replace in-memory functions with database calls

## 🧪 Testing

Create `backend/test_api.py`:

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "name" in response.json()
```

Run tests:
```bash
pip install pytest
pytest backend/test_api.py
```

## 📦 Dependencies

- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **python-dotenv** - Environment variables
- **pydantic** - Data validation
- **pydantic-settings** - Settings management

Optional (for production):
- `sqlalchemy` - ORM
- `psycopg2` - PostgreSQL driver
- `pymongo` - MongoDB driver
- `pyjwt` - JWT authentication
- `python-jose` - Secure tokens

## 🚢 Deployment

### Local Development
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📖 API Response Format

All endpoints return consistent JSON responses:

### Success Response
```json
{
  "success": true,
  "status": "operation_status",
  "message": "Human readable message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error type",
  "detail": "Detailed error message"
}
```

## 🔄 Future Enhancements

1. **Authentication & Authorization**
   - Add JWT token-based auth
   - Implement role-based access control

2. **Database Integration**
   - PostgreSQL/MongoDB connection
   - Persistent data storage
   - Query optimization

3. **Real AI Integration**
   - Connect to AI services (OpenAI, Claude, etc.)
   - Implement actual ML models
   - Add async processing with Celery

4. **File Processing**
   - Actually parse PDF/CSV files
   - Extract structured data
   - Handle large file uploads

5. **Caching**
   - Redis for performance
   - Result caching

6. **Logging & Monitoring**
   - Structured logging
   - Performance monitoring
   - Error tracking (Sentry)

## 📄 License

MIT License - See LICENSE file for details

## 👥 Support

For issues and questions:
1. Check existing issues in repository
2. Create detailed issue report
3. Include API response samples
4. Provide steps to reproduce

---

**Built with FastAPI + Python + ❤️**
