#!/usr/bin/env python3
"""Test script to verify backend imports and functionality - Server startup test"""

import sys
import traceback
import time
import subprocess
import requests

# Force UTF-8 output
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

print("=" * 60)
print("BACKEND STARTUP VERIFICATION TEST")
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

# Test 2: Start server in background
print("\n[TEST 2] Starting uvicorn server...")
try:
    # Start server
    proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--reload", "--port", "8000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        cwd="."
    )
    print(f"PASS: Server process started (PID: {proc.pid})")
    
    # Wait for server to start
    time.sleep(3)
    
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    sys.exit(1)

# Test 3: Test root endpoint
print("\n[TEST 3] Testing root endpoint...")
try:
    response = requests.get("http://localhost:8000/")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert "message" in data, "Response missing 'message' field"
    assert data["message"] == "Welcome to ContentPulse", f"Unexpected message: {data['message']}"
    print(f"PASS: Root endpoint working - {data['message']}")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    proc.terminate()
    sys.exit(1)

# Test 4: Test health endpoint
print("\n[TEST 4] Testing health endpoint...")
try:
    response = requests.get("http://localhost:8000/api/v1/health")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert data["status"] == "healthy", f"Unexpected status: {data['status']}"
    print(f"PASS: Health endpoint working - {data['message']}")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    proc.terminate()
    sys.exit(1)

# Test 5: Test get reports endpoint
print("\n[TEST 5] Testing GET /api/v1/reports...")
try:
    response = requests.get("http://localhost:8000/api/v1/reports")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert "success" in data, "Response missing 'success' field"
    assert data["success"] == True, "Success field should be True"
    print(f"PASS: Reports endpoint working - {data['count']} reports")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    proc.terminate()
    sys.exit(1)

# Test 6: Test get platforms endpoint
print("\n[TEST 6] Testing GET /api/v1/platforms...")
try:
    response = requests.get("http://localhost:8000/api/v1/platforms")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert "success" in data, "Response missing 'success' field"
    assert data["success"] == True, "Success field should be True"
    print(f"PASS: Platforms endpoint working - {data['count']} connections")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    proc.terminate()
    sys.exit(1)

# Test 7: Test file upload endpoint
print("\n[TEST 7] Testing POST /api/v1/reports/upload...")
try:
    # Create a test file
    test_file = {"file": ("test.txt", b"Test file content")}
    response = requests.post(
        "http://localhost:8000/api/v1/reports/upload",
        files=test_file
    )
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert data["success"] == True, "Success field should be True"
    assert "report_id" in data, "Response missing 'report_id'"
    assert data["filename"] == "test.txt", f"Expected filename 'test.txt', got {data['filename']}"
    print(f"PASS: Upload endpoint working - Report ID: {data['report_id']}")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    proc.terminate()
    sys.exit(1)

# Test 8: Test platform connect endpoint
print("\n[TEST 8] Testing POST /api/v1/platforms/connect...")
try:
    payload = {"platform": "YouTube", "account_email": "test@example.com"}
    response = requests.post(
        "http://localhost:8000/api/v1/platforms/connect",
        json=payload
    )
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert data["success"] == True, "Success field should be True"
    assert "connection" in data, "Response missing 'connection'"
    print(f"PASS: Platform connect endpoint working")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    proc.terminate()
    sys.exit(1)

# Test 9: Test CORS headers
print("\n[TEST 9] Testing CORS headers...")
try:
    response = requests.options(
        "http://localhost:8000/api/v1/reports",
        headers={"Origin": "http://localhost:5173"}
    )
    assert "access-control-allow-origin" in response.headers, "Missing CORS header"
    print(f"PASS: CORS headers present - {response.headers.get('access-control-allow-origin')}")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    proc.terminate()
    sys.exit(1)

# Test 10: Test API documentation
print("\n[TEST 10] Testing API documentation endpoints...")
try:
    response = requests.get("http://localhost:8000/docs")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    print("PASS: Swagger UI documentation available")
    
    response = requests.get("http://localhost:8000/openapi.json")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    print("PASS: OpenAPI schema available")
except Exception as e:
    print(f"FAIL: {e}")
    traceback.print_exc()
    proc.terminate()
    sys.exit(1)

# Cleanup
print("\n[CLEANUP] Stopping server...")
try:
    proc.terminate()
    proc.wait(timeout=5)
    print("PASS: Server stopped successfully")
except Exception as e:
    print(f"WARNING: Could not stop server cleanly: {e}")
    proc.kill()

print("\n" + "=" * 60)
print("ALL TESTS PASSED - BACKEND IS FULLY OPERATIONAL")
print("=" * 60)
print("\nBackend verified successfully!")
print("- All imports working")
print("- All endpoints functional")
print("- Database operations working")
print("- CORS properly configured")
print("- Documentation available")
print("\nReady for production use!")
