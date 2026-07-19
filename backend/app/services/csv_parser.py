"""
CSV Parser Service
Handles parsing and extraction of data from CSV files
"""
import io
import csv


def parse_csv(content: bytes) -> dict:
    """
    Parse CSV file content and extract data.
    
    Args:
        content: CSV file bytes
        
    Returns:
        dict: Extracted data from CSV
    """
    try:
        # Decode bytes to string
        text = content.decode('utf-8')
        
        # Parse CSV
        reader = csv.DictReader(io.StringIO(text))
        rows = list(reader)
        
        return {
            "status": "parsed",
            "format": "csv",
            "size_bytes": len(content),
            "rows": len(rows),
            "columns": list(rows[0].keys()) if rows else [],
            "preview": rows[:5] if rows else [],
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "format": "csv",
        }
