#!/usr/bin/env python3
"""
Test script for Google Gemini API integration
Run this to verify the AI service is working correctly
"""

import sys
import os
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent
sys.path.insert(0, str(backend_path))

# Set up environment
os.chdir(backend_path)

from app.core.config import settings
from app.services.ai_service import generate_insights

def test_gemini_integration():
    """Test the Gemini API integration"""
    
    print("=" * 60)
    print("Google Gemini API Integration Test")
    print("=" * 60)
    
    # Check API key
    print("\n1. Checking API Key Configuration...")
    if settings.gemini_api_key:
        print(f"   ✓ API Key Found: {settings.gemini_api_key[:10]}...")
    else:
        print("   ✗ API Key NOT Found")
        print("   Please configure GEMINI_API_KEY in backend/.env")
        return False
    
    # Test with sample text
    print("\n2. Testing generate_insights() function...")
    sample_text = """
    Our quarterly performance metrics show significant growth:
    - Website traffic increased by 45% year-over-year
    - Email engagement rate improved from 18% to 28%
    - Video content received 3.2x more engagement than blog posts
    - Mobile traffic now represents 72% of total visits
    - Average session duration increased from 3:45 to 5:20 minutes
    """
    
    print("   Sending text to Gemini API...")
    result = generate_insights(sample_text)
    
    print(f"\n   Status: {result.get('status')}")
    
    if result.get('status') == 'error':
        print(f"   Error: {result.get('error')}")
        return False
    
    print(f"\n3. Analysis Results:")
    print(f"   ✓ Opportunity Score: {result.get('opportunity_score')}/100")
    
    print(f"\n   Executive Summary:")
    print(f"   {result.get('executive_summary')}")
    
    print(f"\n   KPIs:")
    kpis = result.get('kpis', {})
    for key, value in kpis.items():
        print(f"      - {key}: {value}")
    
    print(f"\n   Insights ({len(result.get('insights', []))} found):")
    for insight in result.get('insights', []):
        print(f"      - {insight.get('title')} (Confidence: {insight.get('confidence')})")
    
    recommendations = result.get('recommendations', {})
    print(f"\n   Recommendations:")
    print(f"      Continue: {len(recommendations.get('continue', []))} items")
    print(f"      Improve: {len(recommendations.get('improve', []))} items")
    print(f"      Stop: {len(recommendations.get('stop', []))} items")
    print(f"      Create: {len(recommendations.get('create', []))} items")
    
    print("\n" + "=" * 60)
    print("✓ Integration Test PASSED")
    print("=" * 60)
    return True

if __name__ == "__main__":
    try:
        success = test_gemini_integration()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n✗ Test failed with exception: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
