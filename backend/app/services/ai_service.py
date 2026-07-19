"""
AI Service - Google Gemini API Integration
Handles AI-powered analysis and insights generation using Google Gemini
"""

import json
import logging
from typing import Optional, Dict, Any
import google.generativeai as genai
from app.core.config import settings

# Configure logging
logger = logging.getLogger(__name__)

# Initialize Gemini API
if settings.gemini_api_key:
    genai.configure(api_key=settings.gemini_api_key)
else:
    logger.warning("GEMINI_API_KEY not configured in environment")


def generate_insights(text: str) -> Dict[str, Any]:
    """
    Generate structured AI insights from text using Google Gemini API.
    
    Args:
        text: The input text to analyze
        
    Returns:
        dict: Structured insights containing:
            - executive_summary: High-level overview
            - kpis: Key performance indicators
            - insights: Detailed insights
            - recommendations: Action items
            - opportunity_score: Numeric score (0-100)
            - status: Success or error status
            - error: Error message if applicable
    """
    try:
        if not settings.gemini_api_key:
            return {
                "status": "error",
                "error": "GEMINI_API_KEY not configured",
                "executive_summary": None,
                "kpis": None,
                "insights": None,
                "recommendations": None,
                "opportunity_score": None,
            }
        
        # Initialize the model
        model = genai.GenerativeModel("gemini-pro")
        
        # Craft the analysis prompt
        analysis_prompt = f"""
Analyze the following text and provide a comprehensive business intelligence report in JSON format.

TEXT TO ANALYZE:
{text}

Please provide your analysis in the following JSON structure (ensure valid JSON):
{{
    "executive_summary": "A 2-3 sentence executive summary of the key findings",
    "kpis": {{
        "engagement_rate": "percentage or metric",
        "content_quality_score": "score out of 100",
        "audience_relevance": "percentage",
        "conversion_potential": "percentage",
        "trend_momentum": "positive/negative/neutral"
    }},
    "insights": [
        {{
            "title": "Insight title",
            "description": "Detailed explanation",
            "confidence": 0.95,
            "impact": "high/medium/low"
        }}
    ],
    "recommendations": {{
        "continue": ["action 1", "action 2"],
        "improve": ["action 1", "action 2"],
        "stop": ["action 1"],
        "create": ["new initiative 1", "new initiative 2"]
    }},
    "opportunity_score": 85
}}

Ensure the response is valid JSON that can be parsed. Do not include markdown formatting or code blocks.
"""
        
        # Call Gemini API
        response = model.generate_content(analysis_prompt)
        
        if not response.text:
            return {
                "status": "error",
                "error": "No response from Gemini API",
                "executive_summary": None,
                "kpis": None,
                "insights": None,
                "recommendations": None,
                "opportunity_score": None,
            }
        
        # Parse the JSON response
        response_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
        response_text = response_text.strip()
        
        # Parse JSON
        parsed_response = json.loads(response_text)
        
        # Validate and structure the response
        result = {
            "status": "success",
            "executive_summary": parsed_response.get("executive_summary", ""),
            "kpis": parsed_response.get("kpis", {}),
            "insights": parsed_response.get("insights", []),
            "recommendations": parsed_response.get("recommendations", {
                "continue": [],
                "improve": [],
                "stop": [],
                "create": []
            }),
            "opportunity_score": parsed_response.get("opportunity_score", 0),
        }
        
        logger.info(f"Successfully generated insights. Opportunity Score: {result['opportunity_score']}")
        return result
        
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse Gemini response as JSON: {str(e)}")
        return {
            "status": "error",
            "error": f"Invalid JSON response from API: {str(e)}",
            "executive_summary": None,
            "kpis": None,
            "insights": None,
            "recommendations": None,
            "opportunity_score": None,
        }
    except Exception as e:
        logger.error(f"Error generating insights: {str(e)}")
        return {
            "status": "error",
            "error": str(e),
            "executive_summary": None,
            "kpis": None,
            "insights": None,
            "recommendations": None,
            "opportunity_score": None,
        }


def generate_recommendations(report_id: str) -> dict:
    """
    Generate AI recommendations for a report.
    
    Args:
        report_id: The report ID
        
    Returns:
        dict: Strategic recommendations
    """
    return {
        "report_id": report_id,
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
    }
