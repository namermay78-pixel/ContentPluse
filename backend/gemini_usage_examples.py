"""
Usage Examples - Google Gemini API Integration

This file demonstrates various ways to use the Google Gemini API
integration in the ContentPulse backend.
"""

# ============================================================================
# EXAMPLE 1: Direct Python Function Call
# ============================================================================

from app.services.ai_service import generate_insights

# Sample marketing content analysis
marketing_content = """
Our Q1 2024 campaign performance metrics:
- Email open rate: 28% (up from 18% last quarter)
- Click-through rate: 3.5%
- Website traffic increased 45% YoY
- Video content engagement: 4.2x higher than blog posts
- Average session duration: 5 minutes 20 seconds
- Mobile traffic: 72% of total
- Conversion rate from email: 2.8%
"""

result = generate_insights(marketing_content)

# Access the structured insights
if result['status'] == 'success':
    print(f"Opportunity Score: {result['opportunity_score']}")
    print(f"\nExecutive Summary:\n{result['executive_summary']}")
    
    print("\nKey Performance Indicators:")
    for kpi, value in result['kpis'].items():
        print(f"  - {kpi}: {value}")
    
    print("\nTop Insights:")
    for insight in result['insights'][:3]:
        print(f"  • {insight['title']} (Confidence: {insight['confidence']*100}%)")
        print(f"    {insight['description']}")
    
    print("\nStrategic Recommendations:")
    for action in result['recommendations']['continue']:
        print(f"  ✓ Continue: {action}")
    for action in result['recommendations']['improve']:
        print(f"  ⬆ Improve: {action}")
else:
    print(f"Error: {result['error']}")


# ============================================================================
# EXAMPLE 2: FastAPI Endpoint Usage (via HTTP)
# ============================================================================

import requests
import json

# Start your FastAPI server first:
# cd backend && uvicorn app.main:app --reload

API_URL = "http://localhost:8000/api/v1/ai/analyze"

# Prepare the request
payload = {
    "text": """
    Our blog receives 50,000 monthly visitors. 
    Top performing content: Machine Learning tutorials (8,000 views/month).
    Video tutorials: 4.2x conversion rate vs text.
    Email subscribers: 15,000 with 28% open rate.
    """,
    "report_id": "blog-performance-q1-2024"
}

# Send the request
response = requests.post(API_URL, json=payload)
data = response.json()

print(f"Status: {data['status']}")
print(f"Opportunity Score: {data['data']['opportunity_score']}")
print(f"Executive Summary: {data['data']['executive_summary']}")


# ============================================================================
# EXAMPLE 3: Using in a Flask/FastAPI Route Handler
# ============================================================================

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ContentAnalysisRequest(BaseModel):
    content: str
    content_type: str = "general"  # blog, email, social, etc.

@router.post("/analyze-content")
async def analyze_content(request: ContentAnalysisRequest):
    """Analyze content using Gemini AI"""
    try:
        result = generate_insights(request.content)
        
        if result['status'] == 'success':
            return {
                "success": True,
                "opportunity_score": result['opportunity_score'],
                "summary": result['executive_summary'],
                "insights": result['insights'],
                "recommendations": result['recommendations'],
                "kpis": result['kpis']
            }
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Analysis failed: {result['error']}"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# EXAMPLE 4: Batch Analysis of Multiple Content Pieces
# ============================================================================

def analyze_content_batch(content_list: list) -> list:
    """Analyze multiple pieces of content"""
    results = []
    
    for idx, content in enumerate(content_list, 1):
        print(f"Analyzing content {idx}/{len(content_list)}...")
        result = generate_insights(content)
        results.append({
            "index": idx,
            "status": result['status'],
            "opportunity_score": result['opportunity_score'],
            "summary": result['executive_summary']
        })
    
    return results

# Usage
blog_posts = [
    "First blog post content about AI...",
    "Second blog post about marketing strategies...",
    "Third blog post on analytics...",
]

batch_results = analyze_content_batch(blog_posts)

# Find best performing content
best_content = max(batch_results, key=lambda x: x['opportunity_score'])
print(f"\nBest performing content (Score: {best_content['opportunity_score']}):")
print(best_content['summary'])


# ============================================================================
# EXAMPLE 5: Using Results for Content Recommendations
# ============================================================================

def generate_content_roadmap(performance_data: str) -> dict:
    """Generate content roadmap based on performance analysis"""
    
    result = generate_insights(performance_data)
    
    if result['status'] != 'success':
        return {"error": result['error']}
    
    recommendations = result['recommendations']
    
    # Build actionable roadmap
    roadmap = {
        "next_week": recommendations['continue'][:2],
        "next_month": recommendations['improve'][:3],
        "next_quarter": recommendations['create'],
        "stop_immediately": recommendations['stop'],
        "priority_score": result['opportunity_score']
    }
    
    return roadmap

# Usage
quarterly_performance = """
This quarter, we published 12 blog posts, 8 videos, and 20 social posts.
Top performers: ML tutorials (12K views), webinars (850 attendees).
Lowest performers: short-form blog posts (<500 words).
Email engagement steady at 28% open rate.
"""

roadmap = generate_content_roadmap(quarterly_performance)
print("\nContent Strategy Roadmap:")
print(f"Priority Score: {roadmap['priority_score']}/100")
print(f"Next Week Focus: {roadmap['next_week']}")
print(f"Stop: {roadmap['stop_immediately']}")


# ============================================================================
# EXAMPLE 6: Error Handling and Retry Logic
# ============================================================================

import time
from typing import Optional

def analyze_with_retry(
    text: str,
    max_retries: int = 3,
    backoff_factor: float = 1.0
) -> Optional[dict]:
    """Analyze with automatic retry on failure"""
    
    for attempt in range(max_retries):
        try:
            result = generate_insights(text)
            
            if result['status'] == 'success':
                return result
            elif result['status'] == 'error':
                print(f"Attempt {attempt + 1} failed: {result['error']}")
                
                if attempt < max_retries - 1:
                    wait_time = backoff_factor * (2 ** attempt)
                    print(f"Retrying in {wait_time} seconds...")
                    time.sleep(wait_time)
            
        except Exception as e:
            print(f"Exception on attempt {attempt + 1}: {str(e)}")
            if attempt < max_retries - 1:
                time.sleep(backoff_factor * (2 ** attempt))
    
    return None

# Usage
content = "Your content here..."
result = analyze_with_retry(content)

if result:
    print(f"Success! Score: {result['opportunity_score']}")
else:
    print("Failed after all retries")


# ============================================================================
# EXAMPLE 7: Filtering Insights by Confidence and Impact
# ============================================================================

def get_high_confidence_insights(text: str) -> dict:
    """Get only high-confidence, high-impact insights"""
    
    result = generate_insights(text)
    
    if result['status'] != 'success':
        return {"error": result['error']}
    
    # Filter insights
    high_quality_insights = [
        insight for insight in result['insights']
        if insight['confidence'] >= 0.85 and insight['impact'] in ['high', 'medium']
    ]
    
    return {
        "opportunity_score": result['opportunity_score'],
        "high_confidence_insights": high_quality_insights,
        "count": len(high_quality_insights)
    }

# Usage
content = "Performance data..."
insights = get_high_confidence_insights(content)
print(f"Found {insights['count']} high-confidence insights")


# ============================================================================
# EXAMPLE 8: Export Results to Different Formats
# ============================================================================

import json
from datetime import datetime

def export_insights_to_formats(text: str, report_name: str) -> dict:
    """Export analysis results in multiple formats"""
    
    result = generate_insights(text)
    
    if result['status'] != 'success':
        return {"error": result['error']}
    
    timestamp = datetime.now().isoformat()
    
    # JSON format
    json_output = {
        "report_name": report_name,
        "generated_at": timestamp,
        "data": result
    }
    
    # Save to file
    filename = f"insights_{report_name}_{timestamp.split('T')[0]}.json"
    with open(filename, 'w') as f:
        json.dump(json_output, f, indent=2)
    
    # CSV format (for spreadsheets)
    csv_output = f"""Report,Generated,Score,Summary
{report_name},{timestamp},{result['opportunity_score']},"{result['executive_summary']}"
"""
    
    return {
        "json_file": filename,
        "csv_output": csv_output,
        "data": result
    }

# Usage
exports = export_insights_to_formats("Your content...", "q1-2024")
print(f"Saved to: {exports['json_file']}")


# ============================================================================
# EXAMPLE 9: Comparing Multiple Content Pieces
# ============================================================================

def compare_content_performance(content_pieces: dict) -> dict:
    """Compare performance of multiple content pieces"""
    
    comparison = {}
    
    for name, content in content_pieces.items():
        result = generate_insights(content)
        comparison[name] = {
            "score": result.get('opportunity_score', 0),
            "summary": result.get('executive_summary', 'N/A'),
            "top_insight": result['insights'][0]['title'] if result['insights'] else 'N/A'
        }
    
    # Sort by score
    sorted_comparison = sorted(
        comparison.items(),
        key=lambda x: x[1]['score'],
        reverse=True
    )
    
    return dict(sorted_comparison)

# Usage
content_to_compare = {
    "blog_post": "Blog post content...",
    "email_campaign": "Email content...",
    "social_media": "Social post content..."
}

comparison = compare_content_performance(content_to_compare)
print("Content Performance Ranking:")
for rank, (name, data) in enumerate(comparison.items(), 1):
    print(f"{rank}. {name}: {data['score']}/100")


# ============================================================================
# EXAMPLE 10: Integration with Database
# ============================================================================

# Pseudocode for database integration
def save_analysis_to_database(
    report_id: str,
    content: str,
    db_connection
) -> bool:
    """Analyze content and save results to database"""
    
    try:
        # Generate insights
        result = generate_insights(content)
        
        if result['status'] != 'success':
            return False
        
        # Save to database
        query = """
            INSERT INTO content_analysis 
            (report_id, content, opportunity_score, executive_summary, 
             kpis, insights, recommendations, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """
        
        db_connection.execute(query, (
            report_id,
            content,
            result['opportunity_score'],
            result['executive_summary'],
            json.dumps(result['kpis']),
            json.dumps(result['insights']),
            json.dumps(result['recommendations']),
            datetime.now()
        ))
        
        db_connection.commit()
        return True
        
    except Exception as e:
        print(f"Database error: {str(e)}")
        return False


# ============================================================================
# TESTING
# ============================================================================

if __name__ == "__main__":
    # Run examples
    print("Google Gemini API Integration Examples")
    print("=" * 50)
    
    # Simple test
    test_content = """
    Our company achieved:
    - 45% revenue growth YoY
    - 28% email open rate
    - 72% mobile traffic
    - 3.2x video engagement vs blog posts
    """
    
    result = generate_insights(test_content)
    
    if result['status'] == 'success':
        print("✓ Integration working!")
        print(f"Opportunity Score: {result['opportunity_score']}")
    else:
        print(f"✗ Error: {result['error']}")
