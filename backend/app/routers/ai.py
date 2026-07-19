"""
AI router for AI-powered insights and analysis
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
import uuid

from app.services.ai_service import generate_insights

router = APIRouter(prefix="/ai", tags=["ai"])


class AnalysisRequest(BaseModel):
    """Request model for text analysis"""
    text: str
    report_id: str = None


@router.post("/analyze")
async def analyze_report(request: AnalysisRequest):
    """
    Trigger AI analysis using Google Gemini API.
    
    Args:
        request: Analysis request containing text and optional report_id
        
    Returns:
        dict: Structured insights with executive summary, KPIs, insights, recommendations, and opportunity score
    """
    try:
        if not request.text or not request.text.strip():
            raise HTTPException(status_code=400, detail="text is required")
        
        # Generate insights using Gemini API
        insights = generate_insights(request.text)
        
        return {
            "success": insights.get("status") == "success",
            "status": insights.get("status"),
            "report_id": request.report_id or str(uuid.uuid4()),
            "data": {
                "executive_summary": insights.get("executive_summary"),
                "kpis": insights.get("kpis"),
                "insights": insights.get("insights"),
                "recommendations": insights.get("recommendations"),
                "opportunity_score": insights.get("opportunity_score"),
            },
            "error": insights.get("error"),
            "generated_at": datetime.now().isoformat(),
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")


@router.get("/insights/{report_id}")
async def get_insights(report_id: str):
    """
    Get AI-generated insights for a report.
    
    Args:
        report_id: The report ID
        
    Returns:
        dict: AI insights and recommendations
    """
    try:
        if not report_id:
            raise HTTPException(status_code=400, detail="report_id is required")
        
        # Note: This endpoint returns mock data. For real analysis, use /analyze with text input.
        insights = {
            "insights": [
                {
                    "title": "AI Content Dominance",
                    "description": "Machine Learning content drives 56% higher engagement vs average topics",
                    "confidence": 0.95,
                    "impact": "high",
                },
                {
                    "title": "Video Performance",
                    "description": "Video tutorials have 4.2x conversion rate compared to text-only content",
                    "confidence": 0.92,
                    "impact": "high",
                },
                {
                    "title": "Peak Hours Identified",
                    "description": "Peak traffic occurs Tue-Thu between 10 AM - 2 PM UTC",
                    "confidence": 0.88,
                    "impact": "medium",
                },
            ]
        }
        
        return {
            "success": True,
            "report_id": report_id,
            "insights": insights,
            "generated_at": datetime.now().isoformat(),
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Insights retrieval error: {str(e)}")



@router.get("/summary/{report_id}")
async def get_summary(report_id: str):
    """
    Get AI-generated executive summary for a report.
    
    Args:
        report_id: The report ID
        
    Returns:
        dict: Executive summary with key findings
    """
    try:
        if not report_id:
            raise HTTPException(status_code=400, detail="report_id is required")
        
        return {
            "success": True,
            "report_id": report_id,
            "summary": {
                "overall_score": 87,
                "executive_summary": "This comprehensive analysis of your content performance reveals exceptional growth in key metrics. Your content strategy has successfully driven a 18.7% increase in total views, reaching 542.8K impressions, while maintaining a healthy engagement rate of 12.4%. The strategic focus on AI and technology-related topics has yielded outstanding results.",
                "key_findings": [
                    "Machine Learning content drives 56% higher engagement vs average topics",
                    "Video tutorials have 4.2x conversion rate compared to text-only content",
                    "Peak traffic occurs Tue-Thu between 10 AM - 2 PM UTC",
                    "Long-form content (5000+ words) gets 8x more backlinks and shares",
                    "Interactive tools retention rate is 68% vs 22% for static content",
                ],
                "recommendations": {
                    "continue": [
                        "Expand Machine Learning tutorials weekly",
                        "Maintain webinar cadence biweekly",
                        "Invest in interactive tool development",
                    ],
                    "improve": [
                        "Optimize email subject lines for 15% uplift",
                        "A/B test call-to-action placement",
                        "Refine audience segmentation strategy",
                    ],
                    "stop": [
                        "Reduce short-form content (<500 words)",
                        "Minimize Friday publication schedule",
                    ],
                    "create": [
                        "Launch AI certification course series",
                        "Develop industry benchmark reports",
                        "Create AI tool comparison database",
                    ],
                },
            },
            "generated_at": datetime.now().isoformat(),
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summary retrieval error: {str(e)}")


@router.get("/recommendations/{report_id}")
async def get_recommendations(report_id: str):
    """
    Get AI recommendations for a report.
    
    Args:
        report_id: The report ID
        
    Returns:
        dict: Strategic recommendations
    """
    try:
        if not report_id:
            raise HTTPException(status_code=400, detail="report_id is required")
        
        return {
            "success": True,
            "report_id": report_id,
            "recommendations": {
                "continue": {
                    "label": "Continue",
                    "color": "green",
                    "items": [
                        "Expand Machine Learning tutorials weekly",
                        "Maintain webinar cadence biweekly",
                        "Invest in interactive tool development",
                    ],
                },
                "improve": {
                    "label": "Improve",
                    "color": "blue",
                    "items": [
                        "Optimize email subject lines for 15% uplift",
                        "A/B test call-to-action placement",
                        "Refine audience segmentation strategy",
                    ],
                },
                "stop": {
                    "label": "Stop",
                    "color": "red",
                    "items": [
                        "Reduce short-form content (<500 words)",
                        "Minimize Friday publication schedule",
                    ],
                },
                "create": {
                    "label": "Create Next",
                    "color": "purple",
                    "items": [
                        "Launch AI certification course series",
                        "Develop industry benchmark reports",
                        "Create AI tool comparison database",
                    ],
                },
            },
            "priority": "high",
            "generated_at": datetime.now().isoformat(),
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendations retrieval error: {str(e)}")
