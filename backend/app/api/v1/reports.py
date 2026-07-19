"""Report endpoints"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.db import create_report, get_report, list_reports, delete_report

router = APIRouter(prefix="/reports", tags=["reports"])


@router.post("/upload")
async def upload_report(file: UploadFile = File(...)):
    """
    Upload a report file.
    
    Args:
        file: The file to upload
        
    Returns:
        dict: Success response with file information
    """
    try:
        # Read file content to get size
        content = await file.read()
        file_size = len(content)
        
        # Create report record in-memory
        report = create_report(
            filename=file.filename,
            file_size=file_size,
            content_type=file.content_type or "application/octet-stream",
        )
        
        return {
            "success": True,
            "message": "File received successfully",
            "report_id": report["id"],
            "filename": report["filename"],
            "file_size": report["file_size"],
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("")
async def get_reports():
    """Get all uploaded reports"""
    reports = list_reports()
    return {
        "success": True,
        "count": len(reports),
        "reports": reports,
    }


@router.get("/{report_id}")
async def get_report_details(report_id: str):
    """Get details of a specific report"""
    report = get_report(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return {
        "success": True,
        "report": report,
    }


@router.delete("/{report_id}")
async def delete_report_endpoint(report_id: str):
    """Delete a report"""
    if delete_report(report_id):
        return {
            "success": True,
            "message": "Report deleted successfully",
        }
    else:
        raise HTTPException(status_code=404, detail="Report not found")
