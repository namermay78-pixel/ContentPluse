# Google Gemini API Integration Guide

## Overview

This project integrates the **Google Generative AI (Gemini) API** for intelligent content analysis and insights generation. The `ai_service.py` module provides a `generate_insights()` function that analyzes text and returns structured business intelligence.

## Setup Instructions

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Sign in with your Google account (create one if needed)
3. Click **"Create API Key"**
4. Copy your API key

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env` in the `backend/` directory:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. Update the `GEMINI_API_KEY` in `backend/.env`:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Install Dependencies

The required package is already in `requirements.txt`:
```
google-generativeai==0.3.0
```

Install it with:
```bash
pip install -r backend/requirements.txt
```

## API Reference

### `generate_insights(text: str) -> Dict[str, Any]`

**Purpose:** Analyzes input text using Google Gemini API and returns structured business intelligence.

**Parameters:**
- `text` (str): The input text to analyze

**Returns:** Dictionary with the following structure:

```json
{
  "status": "success|error",
  "executive_summary": "High-level overview of findings",
  "kpis": {
    "engagement_rate": "75%",
    "content_quality_score": 87,
    "audience_relevance": "92%",
    "conversion_potential": "68%",
    "trend_momentum": "positive|negative|neutral"
  },
  "insights": [
    {
      "title": "Insight Title",
      "description": "Detailed explanation",
      "confidence": 0.95,
      "impact": "high|medium|low"
    }
  ],
  "recommendations": {
    "continue": ["action 1", "action 2"],
    "improve": ["action 1", "action 2"],
    "stop": ["action 1"],
    "create": ["new initiative 1"]
  },
  "opportunity_score": 85,
  "error": null
}
```

**Example Usage:**

```python
from app.services.ai_service import generate_insights

text = """
Our blog posts about machine learning averaged 5,000 views per month.
Video content outperformed text by 3x. Email campaigns had 25% open rate.
"""

result = generate_insights(text)

if result["status"] == "success":
    print(f"Opportunity Score: {result['opportunity_score']}")
    print(f"Summary: {result['executive_summary']}")
    for insight in result['insights']:
        print(f"- {insight['title']}: {insight['description']}")
else:
    print(f"Error: {result['error']}")
```

## API Endpoint

### POST `/api/v1/ai/analyze`

**Request:**
```json
{
  "text": "Your content to analyze",
  "report_id": "optional-report-id"
}
```

**Response:**
```json
{
  "success": true,
  "status": "success",
  "report_id": "generated-or-provided-id",
  "data": {
    "executive_summary": "...",
    "kpis": {...},
    "insights": [...],
    "recommendations": {...},
    "opportunity_score": 85
  },
  "error": null,
  "generated_at": "2024-01-15T10:30:00"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/v1/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Our quarterly report shows 45% growth in engagement metrics.",
    "report_id": "q1-2024"
  }'
```

## Response Structure

### Status Field
- `"success"`: Insights generated successfully
- `"error"`: An error occurred during analysis

### Executive Summary
A concise 2-3 sentence overview of the key findings from the analysis.

### KPIs (Key Performance Indicators)
Quantitative metrics extracted from the analysis:
- `engagement_rate`: Percentage of audience engagement
- `content_quality_score`: Overall quality assessment (0-100)
- `audience_relevance`: How relevant content is to target audience (0-100%)
- `conversion_potential`: Likelihood of converting audience (0-100%)
- `trend_momentum`: Direction of trends (positive/negative/neutral)

### Insights
Array of key findings, each containing:
- `title`: Short insight name
- `description`: Detailed explanation
- `confidence`: Confidence level (0.0-1.0)
- `impact`: Business impact level (high/medium/low)

### Recommendations
Strategic action items organized by category:
- `continue`: Keep doing these activities
- `improve`: Enhance these aspects
- `stop`: Discontinue these activities
- `create`: New initiatives to develop

### Opportunity Score
Numeric score (0-100) representing overall business opportunity and potential.

## Error Handling

The function returns an error response if:
1. `GEMINI_API_KEY` is not configured
2. API quota is exceeded
3. Network connectivity issues occur
4. Invalid or incomplete API response

**Error Response Example:**
```json
{
  "status": "error",
  "error": "GEMINI_API_KEY not configured",
  "executive_summary": null,
  "kpis": null,
  "insights": null,
  "recommendations": null,
  "opportunity_score": null
}
```

## Configuration Details

### File: `backend/app/core/config.py`
Contains the `Settings` class that loads `GEMINI_API_KEY` from environment:
```python
gemini_api_key: Optional[str] = None
```

### File: `backend/app/services/ai_service.py`
- Initializes Gemini API with the configured key
- Implements `generate_insights()` function
- Handles JSON parsing and error cases
- Includes comprehensive logging

### File: `backend/.env`
Store sensitive configuration:
```env
GEMINI_API_KEY=sk-xxxxxxxxxxxxx
```

**⚠️ Never commit `.env` to version control!**

## Logging

The service includes logging at key points:
- Successful insights generation with opportunity score
- API errors and JSON parsing failures
- Missing API key warnings

View logs to debug issues:
```python
import logging
logger = logging.getLogger("app.services.ai_service")
logger.setLevel(logging.DEBUG)
```

## Testing

### Quick Test
```bash
cd backend
python -c "
from app.services.ai_service import generate_insights
result = generate_insights('Test content about growth metrics and performance.')
print('Status:', result['status'])
print('Opportunity Score:', result['opportunity_score'])
"
```

### With FastAPI Server
1. Start the backend:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Send a test request:
   ```bash
   curl -X POST http://localhost:8000/api/v1/ai/analyze \
     -H "Content-Type: application/json" \
     -d '{"text": "Our engagement metrics improved by 45% this quarter."}'
   ```

## Troubleshooting

### "GEMINI_API_KEY not configured"
- **Cause**: Environment variable not set
- **Solution**: Ensure `.env` file exists in `backend/` with valid API key

### "Invalid JSON response from API"
- **Cause**: Gemini API returned non-JSON format
- **Solution**: Check API limits; may need to retry or update prompt

### API Quota Exceeded
- **Cause**: Too many requests to Gemini API
- **Solution**: Implement rate limiting or upgrade your API quota at [Google Cloud Console](https://console.cloud.google.com/)

### Connection Timeout
- **Cause**: Network issues or slow API response
- **Solution**: Increase timeout, check internet connection, verify API key validity

## Best Practices

1. **Keep API Key Secure**: Never commit `.env` or share your API key
2. **Error Handling**: Always check `status` field in response
3. **Rate Limiting**: Implement request throttling for production
4. **Logging**: Monitor logs for API errors and trends
5. **Input Validation**: Ensure input text is meaningful and substantial
6. **Response Caching**: Consider caching results for identical inputs

## API Limits

Google Generative AI (free tier):
- **Rate Limit**: 60 requests per minute
- **Daily Limit**: Varies (check your account)
- **Token Limit**: Up to 32K tokens per request (text-davinci-003 equivalent)

For higher limits, consider upgrading to a paid plan at [Google AI Studio](https://aistudio.google.com/app/apikeys).

## Security Considerations

1. **Never log API keys**: The logging system automatically redacts sensitive data
2. **Use environment variables**: Always load secrets from `.env`
3. **Validate input**: Sanitize user input before sending to API
4. **HTTPS only**: Use HTTPS in production
5. **Rate limit**: Implement per-user rate limiting

## Support and Resources

- [Google Generative AI Documentation](https://ai.google.dev/)
- [Gemini API Reference](https://ai.google.dev/api)
- [Python SDK Documentation](https://ai.google.dev/tutorials/python_quickstart)
- [API Key Management](https://aistudio.google.com/app/apikeys)

## Version Information

- **google-generativeai**: 0.3.0+
- **Python**: 3.8+
- **FastAPI**: 0.104.1+
- **Pydantic**: 2.5.0+

## License

This integration follows the same license as the main project.
