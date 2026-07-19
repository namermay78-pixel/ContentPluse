# Google Gemini API Integration - Quick Start

## 30-Second Setup

### Step 1: Get API Key
1. Visit https://aistudio.google.com/app/apikeys
2. Click "Create API Key"
3. Copy the key

### Step 2: Configure
```bash
cd backend
cp .env.example .env
# Edit .env and paste your API key next to GEMINI_API_KEY=
```

### Step 3: Test
```bash
cd backend
python test_gemini_integration.py
```

## Usage Examples

### Python (Direct Function Call)
```python
from app.services.ai_service import generate_insights

# Analyze content
result = generate_insights("Your content here...")

# Access results
print(result['opportunity_score'])        # 85
print(result['executive_summary'])        # Summary text
print(result['insights'])                 # List of insights
print(result['recommendations'])          # Dict of recommendations
```

### FastAPI Endpoint
```bash
curl -X POST http://localhost:8000/api/v1/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your content to analyze",
    "report_id": "optional-report-id"
  }'
```

### Response Structure
```json
{
  "success": true,
  "status": "success",
  "data": {
    "executive_summary": "High-level findings...",
    "kpis": {
      "engagement_rate": "75%",
      "content_quality_score": 87,
      "audience_relevance": "92%",
      "conversion_potential": "68%",
      "trend_momentum": "positive"
    },
    "insights": [
      {
        "title": "Insight Title",
        "description": "Description...",
        "confidence": 0.95,
        "impact": "high"
      }
    ],
    "recommendations": {
      "continue": ["action 1"],
      "improve": ["action 2"],
      "stop": ["action 3"],
      "create": ["initiative 1"]
    },
    "opportunity_score": 85
  }
}
```

## Key Features

✓ **Structured JSON Output**: Executive Summary, KPIs, Insights, Recommendations, Opportunity Score
✓ **Secure**: API key stored in `.env`, never committed to git
✓ **Error Handling**: Graceful error responses with meaningful messages
✓ **Logging**: Built-in logging for debugging
✓ **Type Hints**: Full Python type annotations for IDE support

## API Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `executive_summary` | string | 2-3 sentence overview |
| `kpis` | object | Key metrics (engagement, quality, relevance, etc.) |
| `insights` | array | Key findings with confidence scores |
| `recommendations` | object | Grouped actions (continue, improve, stop, create) |
| `opportunity_score` | number | Overall opportunity rating (0-100) |
| `status` | string | "success" or "error" |
| `error` | string | Error message if status is "error" |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "GEMINI_API_KEY not configured" | Check `.env` file has valid API key |
| "Invalid JSON response" | API may be rate limited, try again |
| Connection timeout | Check internet connection and API key validity |

## Files Modified/Created

- ✓ `backend/app/services/ai_service.py` - Core integration with Gemini API
- ✓ `backend/app/routers/ai.py` - Updated API endpoint
- ✓ `backend/app/core/config.py` - Already has GEMINI_API_KEY
- ✓ `backend/.env.example` - Already has GEMINI_API_KEY placeholder
- ✓ `backend/GEMINI_API_INTEGRATION.md` - Full documentation
- ✓ `backend/test_gemini_integration.py` - Test script
- ✓ `backend/GEMINI_QUICK_START.md` - This file

## Next Steps

1. Configure `.env` with your Gemini API key
2. Run `python test_gemini_integration.py` to verify
3. Start FastAPI server: `uvicorn app.main:app --reload`
4. Test endpoint: `POST /api/v1/ai/analyze`
5. Integrate into your frontend/application

## Support

- Full docs: See `backend/GEMINI_API_INTEGRATION.md`
- API Reference: https://ai.google.dev/
- Key Management: https://aistudio.google.com/app/apikeys
