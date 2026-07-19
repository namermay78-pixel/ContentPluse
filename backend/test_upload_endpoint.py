"""
Test suite for the POST /upload endpoint
"""
import pytest
from fastapi.testclient import TestClient
from pathlib import Path
import io

from app.main import app

# Initialize test client
client = TestClient(app)


class TestUploadEndpoint:
    """Test cases for the upload endpoint"""
    
    def test_upload_pdf_success(self):
        """Test successful PDF upload"""
        # Create a minimal PDF file
        pdf_content = b"%PDF-1.4\n%test\nendstream\n"
        
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.pdf", io.BytesIO(pdf_content), "application/pdf")}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["filename"] == "test.pdf"
        assert data["type"] == "pdf"
        assert data["size"] == len(pdf_content)
        assert data["message"] == "Upload successful"
        assert "saved_as" in data
        assert "uploaded_at" in data
    
    def test_upload_csv_success(self):
        """Test successful CSV upload"""
        csv_content = b"name,age,email\nJohn,30,john@example.com\nJane,28,jane@example.com\n"
        
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.csv", io.BytesIO(csv_content), "text/csv")}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["filename"] == "test.csv"
        assert data["type"] == "csv"
        assert data["size"] == len(csv_content)
        assert data["message"] == "Upload successful"
    
    def test_upload_invalid_extension(self):
        """Test upload with invalid file extension"""
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.txt", io.BytesIO(b"test content"), "text/plain")}
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "Invalid file extension" in data["detail"]
    
    def test_upload_empty_file(self):
        """Test upload with empty file"""
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.pdf", io.BytesIO(b""), "application/pdf")}
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "File is empty" in data["detail"]
    
    def test_upload_invalid_pdf(self):
        """Test upload with invalid PDF file"""
        # File with PDF extension but invalid content
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.pdf", io.BytesIO(b"not a pdf"), "application/pdf")}
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "does not appear to be a valid PDF" in data["detail"]
    
    def test_upload_invalid_csv_binary(self):
        """Test upload with binary content as CSV"""
        binary_content = bytes([0xFF, 0xD8, 0xFF, 0xE0])  # JPEG header
        
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.csv", io.BytesIO(binary_content), "text/csv")}
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "does not appear to be valid CSV" in data["detail"]
    
    def test_upload_mime_type_mismatch_pdf(self):
        """Test upload with PDF content but wrong MIME type"""
        pdf_content = b"%PDF-1.4\n%test\nendstream\n"
        
        # Send with text/csv MIME type (incorrect)
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.pdf", io.BytesIO(pdf_content), "text/csv")}
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "Invalid MIME type" in data["detail"]
    
    def test_upload_mime_type_mismatch_csv(self):
        """Test upload with CSV content but wrong MIME type"""
        csv_content = b"name,age,email\nJohn,30,john@example.com\n"
        
        # Send with application/pdf MIME type (incorrect)
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.csv", io.BytesIO(csv_content), "application/pdf")}
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "Invalid MIME type" in data["detail"]
    
    def test_upload_alternative_csv_mime_type(self):
        """Test upload with alternative CSV MIME types"""
        csv_content = b"name,email\nJohn,john@example.com\n"
        
        # Test with application/csv
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.csv", io.BytesIO(csv_content), "application/csv")}
        )
        assert response.status_code == 200
        
        # Test with application/x-csv
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test2.csv", io.BytesIO(csv_content), "application/x-csv")}
        )
        assert response.status_code == 200
    
    def test_file_saved_with_timestamp_prefix(self):
        """Test that uploaded file is saved with timestamp prefix"""
        csv_content = b"name,email\nJohn,john@example.com\n"
        
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.csv", io.BytesIO(csv_content), "text/csv")}
        )
        
        assert response.status_code == 200
        data = response.json()
        saved_filename = data["saved_as"]
        
        # Verify filename format: YYYYMMDD_HHMMSS_UUID_original_filename
        parts = saved_filename.split("_")
        assert len(parts) >= 4
        assert len(parts[0]) == 8  # YYYYMMDD
        assert len(parts[1]) == 6  # HHMMSS
        assert len(parts[2]) == 8  # UUID prefix
        assert parts[-1] == "test.csv"
    
    def test_uploads_directory_created(self):
        """Test that uploads directory is created"""
        uploads_dir = Path(__file__).parent / "uploads"
        
        # After any upload test, the directory should exist
        csv_content = b"name\ntest\n"
        client.post(
            "/api/v1/upload",
            files={"file": ("test.csv", io.BytesIO(csv_content), "text/csv")}
        )
        
        assert uploads_dir.exists()
        assert uploads_dir.is_dir()


class TestUploadResponseFormat:
    """Test the response format matches specification"""
    
    def test_response_format_success(self):
        """Test response format matches specification"""
        pdf_content = b"%PDF-1.4\n%test\nendstream\n"
        
        response = client.post(
            "/api/v1/upload",
            files={"file": ("test.pdf", io.BytesIO(pdf_content), "application/pdf")}
        )
        
        data = response.json()
        
        # Required fields per specification
        assert "success" in data
        assert "filename" in data
        assert "size" in data
        assert "type" in data
        assert "message" in data
        
        # Type checking
        assert isinstance(data["success"], bool)
        assert isinstance(data["filename"], str)
        assert isinstance(data["size"], int)
        assert isinstance(data["type"], str)
        assert isinstance(data["message"], str)


class TestErrorHandling:
    """Test error handling"""
    
    def test_no_file_provided(self):
        """Test error when no file is provided"""
        response = client.post("/api/v1/upload")
        
        # Should return 422 (Unprocessable Entity) for missing required file
        assert response.status_code == 422
    
    def test_malformed_request(self):
        """Test handling of malformed requests"""
        response = client.post(
            "/api/v1/upload",
            data={"not_file": "test"}
        )
        
        assert response.status_code == 422


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
