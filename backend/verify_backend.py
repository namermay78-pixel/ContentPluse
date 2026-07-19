#!/usr/bin/env python3
"""Test script to verify backend imports and functionality"""

import sys
import traceback

# Force UTF-8 output
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

print("=" * 60)
print("BACKEND VERIFICATION TEST")
print("=" * 60)

# Test 1: Import main app
print("\n[TEST 1] Importing FastAPI app...")
try:
    from app.main import app
    print("PASS: Successfully imported FastAPI app")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 2: Import config
print("\n[TEST 2] Importing configuration...")
try:
    from app.core.config import settings
    print(f"PASS: Configuration loaded - App name: {settings.app_name}")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 3: Import in-memory database
print("\n[TEST 3] Importing in-memory database...")
try:
    from app.db import (
        create_report,
        get_report,
        list_reports,
        delete_report,
        create_platform_connection,
        get_platform_connection,
        list_platform_connections,
        delete_platform_connection,
    )
    print("PASS: Successfully imported all database functions")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 4: Import routers
print("\n[TEST 4] Importing routers...")
try:
    from app.api.v1 import health, reports, platforms
    print("PASS: Successfully imported all routers")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 5: Test in-memory database functionality
print("\n[TEST 5] Testing in-memory database functionality...")
try:
    # Create a report
    report = create_report("test.pdf", 1024, "application/pdf")
    print(f"PASS: Created report: {report['id']}")
    
    # Get the report
    retrieved = get_report(report['id'])
    assert retrieved is not None, "Report not found"
    print(f"PASS: Retrieved report: {retrieved['filename']}")
    
    # List reports
    reports_list = list_reports()
    assert len(reports_list) > 0, "No reports in list"
    print(f"PASS: Listed {len(reports_list)} report(s)")
    
    # Delete report
    deleted = delete_report(report['id'])
    assert deleted, "Failed to delete report"
    print(f"PASS: Deleted report: {report['id']}")
    
    # Verify deletion
    retrieved_after = get_report(report['id'])
    assert retrieved_after is None, "Report should be deleted"
    print(f"PASS: Verified report deleted")
    
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 6: Test platform connection functionality
print("\n[TEST 6] Testing platform connection functionality...")
try:
    # Create connection
    connection = create_platform_connection("YouTube", "test@example.com")
    print(f"PASS: Created connection: {connection['id']}")
    
    # Get connection
    retrieved = get_platform_connection(connection['id'])
    assert retrieved is not None, "Connection not found"
    print(f"PASS: Retrieved connection: {retrieved['platform']}")
    
    # List connections
    connections = list_platform_connections()
    assert len(connections) > 0, "No connections in list"
    print(f"PASS: Listed {len(connections)} connection(s)")
    
    # Delete connection
    deleted = delete_platform_connection(connection['id'])
    assert deleted, "Failed to delete connection"
    print(f"PASS: Deleted connection: {connection['id']}")
    
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 7: Check app routes
print("\n[TEST 7] Checking app routes...")
try:
    routes = []
    for route in app.routes:
        if hasattr(route, 'path') and hasattr(route, 'methods'):
            routes.append(f"{route.methods} {route.path}")
    
    print(f"PASS: Total routes found: {len(routes)}")
    for route in sorted(routes):
        print(f"   - {route}")
    
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 8: Check CORS configuration
print("\n[TEST 8] Checking CORS configuration...")
try:
    print(f"PASS: CORS origins: {settings.allowed_origins}")
    print(f"PASS: Debug mode: {settings.debug}")
    print(f"PASS: API v1 prefix: {settings.api_v1_str}")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    sys.exit(1)

print("\n" + "=" * 60)
print("ALL TESTS PASSED - BACKEND IS READY")
print("=" * 60)
print("\nNext steps:")
print("1. Run: uvicorn app.main:app --reload")
print("2. Visit: http://localhost:8000/docs")
print("3. Test the API endpoints")
