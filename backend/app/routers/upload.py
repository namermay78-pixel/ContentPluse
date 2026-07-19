"""
Upload router for handling file uploads and document processing
"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Optional
import uuid
from datetime import datetime
from pathlib import Path
import mimetypes

from app.services.pdf_parser import parse_pdf
from app.services.csv_parser import parse_csv

router = APIRouter(prefix="/upload", tags=["upload"])

# File validation constants
ALLOWED_EXTENSIONS = {"pdf", "csv"}
ALLOWED_CONTENT_TYPES = {
    "application/pdf",
    "text/csv",
    "application/csv",
    "application/x-csv",
}

# Upload directory configuration
UPLOADS_DIR = Path(__file__).parent.parent.parent / "uploads"


def ensure_uploads_directory() -> Path:
    """Ensure the uploads directory exists."""
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    return UPLOADS_DIR


def validate_file_type(filename: str, content_type: Optional[str]) -> tuple[bool, Optional[str], str]:
    """Validate file type by extension and MIME type."""
    if not filename:
        return False, "No filename provided", ""
    
    file_extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    
    if file_extension not in ALLOWED_EXTENSIONS:
        return (
            False,
            f"Invalid file extension '{file_extension}'. Allowed: {', '.join(ALLOWED_EXTENSIONS)}",
            file_extension,
        )
    
    if content_type:
        base_content_type = content_type.split(";")[0].strip()
        
        if base_content_type not in ALLOWED_CONTENT_TYPES:
            inferred_type = mimetypes.guess_type(filename)[0]
            if inferred_type and inferred_type not in ALLOWED_CONTENT_TYPES:
                return (
                    False,
                    f"Invalid MIME type '{base_content_type}'. Allowed: {', '.join(sorted(ALLOWED_CONTENT_TYPES))}",
                    file_extension,
                )
    
    return True, None, file_extension


def validate_file_content(content: bytes, file_extension: str) -> tuple[bool, Optional[str]]:
    """Validate file content by checking magic bytes (file signatures)."""
    if not content:
        return False, "File is empty"
    
    if file_extension == "pdf":
        if not content.startswith(b"%PDF"):
            return False, "File does not appear to be a valid PDF (invalid magic bytes)"
    
    elif file_extension == "csv":
        try:
            content.decode("utf-8")
        except UnicodeDecodeError:
            try:
                content.decode("latin-1")
            except UnicodeDecodeError:
                return False, "File does not appear to be valid CSV (not text-based)"
    
    return True, None


def save_uploaded_file(content: bytes, filename: str) -> tuple[str, str]:
    """Save an uploaded file to the temporary uploads directory."""
    ensure_uploads_directory()
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_id = str(uuid.uuid4())[:8]
    
    saved_filename = f"{timestamp}_{unique_id}_{filename}"
    file_path = UPLOADS_DIR / saved_filename
    
    with open(file_path, "wb") as f:
        f.write(content)
    
    return saved_filename, str(file_path)


def get_file_size_display(size_bytes: int) -> str:
    """Convert file size to human-readable format."""
    for unit in ["B", "KB", "MB", "GB"]:
        if size_bytes < 1024:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.2f} TB"


def get_mime_type_from_extension(file_extension: str) -> str:
    """Get MIME type from file extension."""
    mime_types = {
        "pdf": "application/pdf",
        "csv": "text/csv",
    }
    return mime_types.get(file_extension.lower(), "application/octet-stream")


@router.post("")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload and process a report file (PDF or CSV).
    
    Args:
        file: The file to upload (PDF or CSV)
        
    Returns:
        dict: Upload confirmation with file details including:
            - success: bool
            - filename: original filename
            - size: file size in bytes
            - type: file extension
            - message: upload status message
    """
    try:
        # Validate file type (extension and MIME type)
        is_valid, error_msg, file_extension = validate_file_type(file.filename, file.content_type)
        if not is_valid:
            raise HTTPException(status_code=400, detail=error_msg)
        
        # Read file content
        content = await file.read()
        
        # Validate file content (magic bytes and encoding)
        is_valid_content, content_error = validate_file_content(content, file_extension)
        if not is_valid_content:
            raise HTTPException(status_code=400, detail=content_error)
        
        # Save uploaded file
        saved_filename, file_path = save_uploaded_file(content, file.filename)
        file_size = len(content)
        
        # Return success response with required format
        return {
            "success": True,
            "filename": file.filename,
            "size": file_size,
            "type": file_extension,
            "message": "Upload successful",
            "saved_as": saved_filename,
            "uploaded_at": datetime.now().isoformat(),
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload error: {str(e)}")


@router.post("/analyze")
async def analyze_report(report_id: str):
    """
    Trigger AI analysis on an uploaded report.
    
    Args:
        report_id: The ID of the report to analyze
        
    Returns:
        dict: Analysis job confirmation
    """
    try:
        if not report_id:
            raise HTTPException(status_code=400, detail="report_id is required")
        
        return {
            "success": True,
            "status": "analysis_started",
            "message": f"Analysis started for report {report_id}",
            "report_id": report_id,
            "job_id": str(uuid.uuid4()),
            "started_at": datetime.now().isoformat(),
            "estimated_duration": "2-5 minutes",
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")
