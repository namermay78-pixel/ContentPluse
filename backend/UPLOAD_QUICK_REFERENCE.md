# POST /upload - Quick Reference

## TL;DR

Upload PDF or CSV files to the API:

```bash
curl -X POST -F "file=@report.pdf" http://localhost:8000/api/v1/upload
```

Success response:
```json
{
  "success": true,
  "filename": "report.pdf",
  "size": 102400,
  "type": "pdf",
  "message": "Upload successful"
}
```

## Endpoint Info

- **URL:** `POST http://localhost:8000/api/v1/upload`
- **Content-Type:** `multipart/form-data`
- **Accepts:** PDF, CSV files only
- **Storage:** `backend/uploads/{timestamp}_{uuid}_{filename}`

## Validation

| Check | Allowed |
|-------|---------|
| Extensions | `.pdf`, `.csv` |
| MIME Types | `application/pdf`, `text/csv`, `application/csv`, `application/x-csv` |
| PDF Magic | Must start with `%PDF` |
| CSV Format | UTF-8 or Latin-1 text |
| Min Size | >0 bytes |

## Response Fields

| Field | Type | Example |
|-------|------|---------|
| success | bool | `true` |
| filename | string | `"report.pdf"` |
| size | int | `102400` |
| type | string | `"pdf"` |
| message | string | `"Upload successful"` |
| saved_as | string | `"20260719_145032_a1b2c3d4_report.pdf"` |
| uploaded_at | string | `"2026-07-19T14:50:32.123456"` |

## Error Codes

| Code | Scenario |
|------|----------|
| 400 | Invalid extension, invalid MIME, empty file, invalid content |
| 422 | Missing file in request |
| 500 | Server error |

## Testing

### Curl
```bash
# PDF
curl -X POST -F "file=@report.pdf" http://localhost:8000/api/v1/upload

# CSV
curl -X POST -F "file=@data.csv" http://localhost:8000/api/v1/upload
```

### Python
```python
import requests
with open('report.pdf', 'rb') as f:
    r = requests.post('http://localhost:8000/api/v1/upload', files={'file': f})
    print(r.json())
```

### JavaScript
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
fetch('http://localhost:8000/api/v1/upload', {
  method: 'POST',
  body: formData
}).then(r => r.json()).then(console.log);
```

### Postman
1. POST to `http://localhost:8000/api/v1/upload`
2. Body → form-data
3. Key: `file` (File type)
4. Select file
5. Send

### Pytest
```bash
cd backend
pytest test_upload_endpoint.py -v
```

## Swagger UI

Visit: http://localhost:8000/docs

Try it out from the browser!

## Files Created

- ✅ `backend/app/routers/upload.py` - Endpoint logic
- ✅ `backend/test_upload_endpoint.py` - Test suite (19+ tests)
- ✅ `backend/UPLOAD_ENDPOINT_GUIDE.md` - Full docs
- ✅ `backend/app/uploads/` - Auto-created directory

## Key Functions

```python
# File type validation
validate_file_type(filename, content_type) → (bool, error, extension)

# File content validation
validate_file_content(content, extension) → (bool, error)

# Save uploaded file
save_uploaded_file(content, filename) → (saved_name, file_path)

# Get human-readable size
get_file_size_display(size_bytes) → "1.00 MB"

# Get MIME type from extension
get_mime_type_from_extension(extension) → "application/pdf"
```

## Storage Format

Files saved with timestamp + UUID for uniqueness:

```
{YYYYMMDD}_{HHMMSS}_{8-char-UUID}_{original_filename}

Example:
20260719_145032_a1b2c3d4_report.pdf
20260719_150145_b2c3d4e5_data.csv
```

## Startup

On app startup:
1. `ensure_uploads_directory()` called
2. `backend/uploads/` created if missing
3. Ready to accept uploads

## Next Steps

1. ✅ Implement upload endpoint (DONE)
2. Next: Parse PDF/CSV content
3. Next: Store metadata in database
4. Next: Trigger AI analysis
5. Next: Return analytics

---

**Status: ✅ IMPLEMENTED & TESTED**

Ready to use! Check full docs in `UPLOAD_ENDPOINT_GUIDE.md`
