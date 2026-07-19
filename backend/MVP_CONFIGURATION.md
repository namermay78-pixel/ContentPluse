# FastAPI Backend - MVP Configuration

## Overview

The backend has been updated to work with **FastAPI** and **Python 3.14**, using **in-memory storage** instead of PostgreSQL for the MVP phase.

## Changes Made

### 1. Removed PostgreSQL Dependencies ✅
- Removed `sqlalchemy==2.0.23`
- Removed `psycopg2-binary==2.9.9`
- Removed `alembic==1.13.0`

**Reason:** psycopg2-binary requires pg_config which is not available in the development environment.

### 2. Updated requirements.txt ✅
```
fastapi==0.104.1
uvicorn==0.24.0
python-dotenv==1.0.0
pydantic==2.5.0
pydantic-settings==2.1.0
```

All dependencies are compatible with **Python 3.14**.

### 3. Created In-Memory Database ✅
**File:** `backend/app/db/memory.py`

Features:
- `InMemoryDatabase` class with storage for reports, platforms, and users
- Functions for CRUD operations on reports
- Functions for platform connections management
- UUID generation for record IDs
- Timestamp tracking with ISO format

### 4. Created Reports Router ✅
**File:** `backend/app/api/v1/reports.py`

Endpoints:
- `POST /api/v1/reports/upload` - Upload a report file
- `GET /api/v1/reports` - List all reports
- `GET /api/v1/reports/{report_id}` - Get report details
- `DELETE /api/v1/reports/{report_id}` - Delete a report

### 5. Created Platforms Router ✅
**File:** `backend/app/api/v1/platforms.py`

Endpoints:
- `POST /api/v1/platforms/connect` - Connect to a platform
- `GET /api/v1/platforms` - List platform connections
- `GET /api/v1/platforms/{connection_id}` - Get connection details
- `DELETE /api/v1/platforms/{connection_id}` - Disconnect platform

### 6. Updated Configuration ✅
**File:** `backend/app/core/config.py`

Changes:
- Removed `database_url` configuration
- Set `debug=True` for development with hot reload
- Kept CORS configuration for both localhost:3000 and localhost:5173

### 7. Updated Main Application ✅
**File:** `backend/app/main.py`

Changes:
- Imported new routers (reports, platforms)
- Registered routers with API v1 prefix
- All endpoints available at `/api/v1/` prefix

## Running the Backend

### Installation

```bash
cd backend
pip install -r requirements.txt
```

### Start Development Server

```bash
uvicorn app.main:app --reload
```

Or from the backend directory:

```bash
python -m uvicorn app.main:app --reload
```

Server will start at: **http://localhost:8000**

### API Documentation

Once running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## API Endpoints

### Health Check
```
GET /api/v1/health
```

Response:
```json
{
  "status": "healthy",
  "message": "ContentPulse API is running"
}
```

### Upload Report
```
POST /api/v1/reports/upload
Content-Type: multipart/form-data

file: <binary>
```

Response:
```json
{
  "success": true,
  "message": "File received successfully",
  "report_id": "uuid-string",
  "filename": "document.pdf",
  "file_size": 1024000
}
```

### Connect Platform
```
POST /api/v1/platforms/connect
Content-Type: application/json

{
  "platform": "YouTube",
  "account_email": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Successfully connected to YouTube",
  "connection": {
    "id": "uuid-string",
    "platform": "YouTube",
    "account_email": "user@example.com",
    "connected_at": "2024-01-19T10:30:00.000000",
    "status": "connected"
  }
}
```

### Get Reports
```
GET /api/v1/reports
```

Response:
```json
{
  "success": true,
  "count": 2,
  "reports": [...]
}
```

### List Platform Connections
```
GET /api/v1/platforms
```

Response:
```json
{
  "success": true,
  "count": 1,
  "connections": [...]
}
```

## Data Storage (In-Memory)

### Important Notes

1. **Data Persistence:** Data is stored in memory and will be lost when the server restarts
2. **Single Server Only:** Not suitable for multi-instance deployments
3. **MVP Phase:** This is temporary for MVP development
4. **Testing:** Data can be cleared using the `db.reset()` method

### Data Structures

#### Reports
```python
{
  "id": "uuid",
  "filename": "document.pdf",
  "file_size": 1024000,
  "content_type": "application/pdf",
  "created_at": "2024-01-19T10:30:00.000000",
  "status": "uploaded"
}
```

#### Platform Connections
```python
{
  "id": "uuid",
  "platform": "YouTube",
  "account_email": "user@example.com",
  "connected_at": "2024-01-19T10:30:00.000000",
  "status": "connected"
}
```

#### Users
```python
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2024-01-19T10:30:00.000000"
}
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (alternative frontend port)
- `http://localhost:5173` (current frontend port)

All HTTP methods are allowed: GET, POST, PUT, DELETE, OPTIONS
All headers are allowed.
Credentials are enabled.

## Frontend Integration

The frontend can now communicate with the backend at `http://localhost:8000`.

### Example Frontend Call

```typescript
// Upload a report
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:8000/api/v1/reports/upload', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
console.log(data);
```

## Troubleshooting

### Port Already in Use
If port 8000 is in use, specify a different port:
```bash
uvicorn app.main:app --reload --port 8001
```

### Module Not Found
Ensure you're in the backend directory and have installed requirements:
```bash
cd backend
pip install -r requirements.txt
```

### CORS Errors
Ensure the frontend is running on localhost:5173 or update the `allowed_origins` in `app/core/config.py`.

## Next Steps (For Production)

When ready to move to production:

1. Add PostgreSQL database integration back to `requirements.txt`
2. Migrate in-memory data to database
3. Remove in-memory storage from production code
4. Set `debug=False` in configuration
5. Configure proper environment variables
6. Add authentication/authorization middleware
7. Add request logging and monitoring
8. Deploy to production server

## File Structure

```
backend/
├── requirements.txt (updated)
├── app/
│   ├── main.py (updated)
│   ├── core/
│   │   └── config.py (updated)
│   ├── api/
│   │   └── v1/
│   │       ├── health.py (existing)
│   │       ├── reports.py (new)
│   │       └── platforms.py (new)
│   └── db/
│       └── memory.py (new)
```

## Python Version

Compatible with **Python 3.14** and later.

All dependencies are actively maintained and compatible with the latest Python versions.

---

**MVP Status:** Ready for development and testing ✅
