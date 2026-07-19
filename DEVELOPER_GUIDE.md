# Developer Guide - Complete Integration

## 📚 How to Use This Integration

### What Was Built

A complete end-to-end system for:
1. **Uploading reports** (PDF, CSV, Excel)
2. **Parsing file content** on backend
3. **Analyzing with Google Gemini AI**
4. **Displaying insights** with real data
5. **Exporting reports** as PDF

### Architecture

```
┌──────────────┐
│   Frontend   │ (React + TypeScript)
│              │ - File upload
│              │ - Display results
│              │ - Export PDF
└──────┬───────┘
       │ HTTP
       ↓
┌──────────────┐
│   Backend    │ (FastAPI + Python)
│              │ - Parse files
│              │ - Call Gemini API
│              │ - Return JSON
└──────────────┘
       │ API
       ↓
┌──────────────────────────┐
│ Google Generative AI     │
│ (Gemini API)             │
│ - Analyze text           │
│ - Generate insights      │
│ - Return structured data │
└──────────────────────────┘
```

---

## 🔧 Key Components

### Backend Services
- `ai_service.py` - Handles Gemini API calls
- `upload.py` - File parsing (PDF, CSV, Excel)
- `ai.py` - REST endpoint for analysis

### Frontend Services
- `apiClient.ts` - HTTP client with interceptors
- `reportService.ts` - API wrapper functions

### Frontend Pages
- `UploadReport.tsx` - File upload interface
- `AIProcessing.tsx` - Progress visualization
- `AnalyticsDashboard.tsx` - Results display
- `AIReportDetails.tsx` - Detailed report view

---

## 💻 Development Workflow

### 1. Make Changes

**Backend Changes**
```python
# Edit backend/app/services/ai_service.py
# Changes to generate_insights() function
# Then restart server:
# uvicorn app.main:app --reload
```

**Frontend Changes**
```typescript
// Edit frontend/src/services/reportService.ts
// Changes auto-reload via Vite dev server
// No restart needed
```

### 2. Test Changes

```bash
# Backend test
python backend/test_gemini_integration.py

# Frontend - use browser
# Network tab (F12) shows API calls
# Console shows any errors
```

### 3. Verify Data Flow

```typescript
// Check localStorage in browser console:
JSON.parse(localStorage.getItem('currentAnalysis'))

// Should show structure:
{
  reportId: "...",
  reportName: "...",
  analysis: {
    status: "success",
    executive_summary: "...",
    kpis: {...},
    insights: [...],
    recommendations: {...},
    opportunity_score: 85
  }
}
```

---

## 📡 API Contract

### Upload Request
```http
POST /api/v1/upload
Content-Type: multipart/form-data

file: [binary]
file_type: "pdf" | "csv" | "excel"
```

### Upload Response
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "file_id": "abc123",
  "file_name": "report.pdf",
  "parsed_content": "Extracted text content..."
}
```

### Analysis Request
```http
POST /api/v1/ai/analyze
Content-Type: application/json

{
  "text": "Content to analyze",
  "report_id": "optional-id"
}
```

### Analysis Response
```json
{
  "success": true,
  "status": "success",
  "data": {
    "executive_summary": "...",
    "kpis": {
      "engagement_rate": "75%",
      "content_quality_score": 87,
      "audience_relevance": "92%",
      "conversion_potential": "68%",
      "trend_momentum": "positive"
    },
    "insights": [
      {
        "title": "High Video Performance",
        "description": "Video drives 3.2x engagement",
        "confidence": 0.92,
        "impact": "high"
      }
    ],
    "recommendations": {
      "continue": [...],
      "improve": [...],
      "stop": [...],
      "create": [...]
    },
    "opportunity_score": 85
  }
}
```

---

## 🔐 Data Security

### API Key Protection
```python
# backend/.env (NEVER COMMIT)
GEMINI_API_KEY=sk_...

# Loaded in config.py
from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    gemini_api_key: str
```

### Frontend Auth
```typescript
// Auth token stored in localStorage
localStorage.setItem('authToken', token);

// Automatically added to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🧩 Extending the System

### Add New KPI

1. **Backend** - Update Gemini prompt
```python
# In ai_service.py - analysis_prompt section
# Add to kpis structure:
"your_new_kpi": "value or metric"
```

2. **Frontend** - Update interfaces
```typescript
// In reportService.ts
export interface AIInsights {
  kpis: {
    // ... existing fields
    your_new_kpi: string;
  };
}
```

3. **Dashboard** - Display KPI
```typescript
// In AnalyticsDashboard.tsx - transformedKPIData
{
  label: 'Your KPI',
  value: aiAnalysis?.kpis.your_new_kpi,
  // ... rest of config
}
```

### Add New File Format

1. **Backend** - Add parser
```python
# In services/pdf_parser.py or new parser
def parse_xlsx(file_path):
    # Parse Excel and return text
    return extracted_text
```

2. **Upload endpoint** - Handle format
```python
# In routers/upload.py
if file_type == 'xlsx':
    content = parse_xlsx(file_path)
```

3. **Frontend** - Accept format
```typescript
// In UploadReport.tsx
accept=".csv,.xlsx,.xls,.pdf,.docx"
```

---

## 🐛 Common Issues & Fixes

### Issue: "API Key Not Found"
```
Location: Backend starts up
Solution: 
1. Check backend/.env exists
2. Has GEMINI_API_KEY=sk_...
3. Restart server
```

### Issue: "File Upload Fails"
```
Location: UploadReport.tsx
Solution:
1. Check file size < 10MB
2. Format is PDF, CSV, or Excel
3. Check backend is running
```

### Issue: "No Data on Dashboard"
```
Location: AnalyticsDashboard shows dummy data
Solution:
1. Check localStorage: currentAnalysis
2. Run upload flow again
3. Check network tab for errors
```

### Issue: "Gemini Returns Error"
```
Location: API Response shows error
Solution:
1. Check API quota at console.cloud.google.com
2. Verify API key is valid
3. Check text length (must have content)
```

---

## 📊 Testing Checklist

### Unit Tests
- [ ] `backend/test_gemini_integration.py` passes
- [ ] API endpoint returns valid JSON
- [ ] File parsing works for all formats
- [ ] Error handling returns proper messages

### Integration Tests
- [ ] File upload → parsing → analysis flow works
- [ ] Data persists in localStorage
- [ ] Dashboard displays real data
- [ ] PDF exports with correct data

### End-to-End Tests
1. [ ] Landing → Login → Dashboard → Upload
2. [ ] Upload → Processing → Dashboard
3. [ ] Dashboard → Export PDF
4. [ ] PDF contains all real data
5. [ ] Error alerts display on failures

---

## 🚀 Deployment Checklist

### Backend
- [ ] GEMINI_API_KEY configured in production env
- [ ] Database migrations run
- [ ] Error logging configured
- [ ] Rate limiting enabled
- [ ] CORS configured for frontend domain

### Frontend
- [ ] VITE_API_BASE_URL points to production backend
- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] API calls work in production
- [ ] PDF export works

### Monitoring
- [ ] API error rate < 1%
- [ ] Response time < 5 seconds
- [ ] File upload size limits enforced
- [ ] Rate limits working
- [ ] Logs being collected

---

## 📚 Learn More

### Understanding the Flow
1. Read: `COMPLETE_INTEGRATION_SUMMARY.md`
2. See diagram in file
3. Trace through code step-by-step

### API Documentation
1. Read: `backend/GEMINI_API_INTEGRATION.md`
2. Check response structures
3. Review error handling

### Examples
1. Check: `backend/gemini_usage_examples.py`
2. 10 different usage patterns
3. Copy & adapt for your needs

---

## 🤝 Contributing

### Code Style
- Backend: PEP 8 (Python)
- Frontend: ESLint + Prettier (TypeScript)

### Before Committing
```bash
# Backend
python -m black app/
python -m flake8 app/

# Frontend
npm run lint
npm run format
```

### Commit Messages
```
Format: [COMPONENT] Short description

Examples:
[backend] Add sentiment analysis to AI service
[frontend] Fix upload progress display
[docs] Update API reference
```

---

## 📞 Support Resources

| Resource | Location | Use Case |
|----------|----------|----------|
| Quick Start | `backend/START_HERE.md` | Get running in 5 min |
| API Docs | `backend/GEMINI_API_INTEGRATION.md` | Understand endpoints |
| Examples | `backend/gemini_usage_examples.py` | Code samples |
| Flow Diagram | `COMPLETE_INTEGRATION_SUMMARY.md` | See big picture |
| Troubleshooting | This file | Fix issues |

---

## ✅ Success Metrics

- API response time: <5 seconds
- File upload success rate: >99%
- Dashboard load time: <100ms
- Zero unhandled errors
- PDF export works every time

---

**Ready to build? Start with `backend/START_HERE.md`!**
