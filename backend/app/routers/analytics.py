"""
Analytics router for retrieving and processing analytics data
"""
from fastapi import APIRouter, HTTPException, Query
from datetime import datetime, timedelta
from typing import Optional

from app.services.analytics_service import generate_analytics

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("")
async def get_analytics(
    report_id: Optional[str] = Query(None),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
):
    """
    Get analytics data for a report or date range.
    
    Args:
        report_id: Optional report ID to get specific report analytics
        start_date: Optional start date (YYYY-MM-DD)
        end_date: Optional end date (YYYY-MM-DD)
        
    Returns:
        dict: Analytics data with KPIs and trends
    """
    try:
        analytics_data = generate_analytics(report_id, start_date, end_date)
        return {
            "success": True,
            "data": analytics_data,
            "generated_at": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analytics error: {str(e)}")


@router.get("/kpis/{report_id}")
async def get_kpis(report_id: str):
    """
    Get KPI summary for a report.
    
    Args:
        report_id: The report ID
        
    Returns:
        dict: KPI metrics and trends
    """
    try:
        if not report_id:
            raise HTTPException(status_code=400, detail="report_id is required")
        
        return {
            "success": True,
            "report_id": report_id,
            "kpis": {
                "total_views": {
                    "value": 542800,
                    "change": 18.7,
                    "trend": "up",
                    "unit": "views",
                },
                "engagement_rate": {
                    "value": 12.4,
                    "change": 9.2,
                    "trend": "up",
                    "unit": "%",
                },
                "conversions": {
                    "value": 2847,
                    "change": 3.5,
                    "trend": "up",
                    "unit": "conversions",
                },
                "avg_time_on_page": {
                    "value": 324,  # in seconds (5m 24s)
                    "change": 12.1,
                    "trend": "up",
                    "unit": "seconds",
                },
            },
            "period": "monthly",
            "last_updated": datetime.now().isoformat(),
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"KPI retrieval error: {str(e)}")


@router.get("/trends/{report_id}")
async def get_trends(report_id: str, months: int = Query(12, ge=1, le=24)):
    """
    Get trend data for a report.
    
    Args:
        report_id: The report ID
        months: Number of months to return (default: 12, max: 24)
        
    Returns:
        dict: Time-series trend data
    """
    try:
        if not report_id:
            raise HTTPException(status_code=400, detail="report_id is required")
        
        # Generate dummy trend data
        trends = []
        base_views = 62000
        for i in range(months):
            date = datetime.now() - timedelta(days=30 * (months - i - 1))
            views = base_views + (i * 9000)
            trends.append({
                "date": date.strftime("%Y-%m-%d"),
                "month": date.strftime("%b"),
                "views": views,
                "engagement_rate": 10 + (i * 0.3),
                "conversions": int(views * 0.005),
            })
        
        return {
            "success": True,
            "report_id": report_id,
            "data": trends,
            "period_months": months,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Trends retrieval error: {str(e)}")


@router.get("/topics/{report_id}")
async def get_top_topics(report_id: str):
    """
    Get top performing topics for a report.
    
    Args:
        report_id: The report ID
        
    Returns:
        dict: Top topics with metrics
    """
    try:
        if not report_id:
            raise HTTPException(status_code=400, detail="report_id is required")
        
        return {
            "success": True,
            "report_id": report_id,
            "topics": [
                {
                    "rank": 1,
                    "name": "AI & Machine Learning",
                    "views": 58200,
                    "engagement_rate": 15.8,
                    "conversion_rate": 4.9,
                },
                {
                    "rank": 2,
                    "name": "Technology",
                    "views": 52100,
                    "engagement_rate": 13.2,
                    "conversion_rate": 4.1,
                },
                {
                    "rank": 3,
                    "name": "Finance & Economics",
                    "views": 48900,
                    "engagement_rate": 14.7,
                    "conversion_rate": 5.3,
                },
                {
                    "rank": 4,
                    "name": "Education & Learning",
                    "views": 42300,
                    "engagement_rate": 11.9,
                    "conversion_rate": 3.8,
                },
                {
                    "rank": 5,
                    "name": "Marketing & Growth",
                    "views": 38700,
                    "engagement_rate": 10.5,
                    "conversion_rate": 3.2,
                },
            ],
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Topics retrieval error: {str(e)}")
