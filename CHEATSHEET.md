# 🚀 ContentPulse Development Cheat Sheet

## Installation & First Run

### Frontend - Initial Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with backend URL
```

### Backend - Initial Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate          # macOS/Linux
# or
venv\Scripts\activate             # Windows

pip install -r requirements.txt
cp .env.example .env
# Edit .env with database and API keys
createdb contentpulse
```

---

## Daily Development

### Start Frontend (Port 5173)
```bash
cd frontend
npm run dev
```

### Start Backend (Port 8000)
```bash
cd backend
source venv/bin/activate          # macOS/Linux / or Windows equivalent
python -m uvicorn app.main:app --reload
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/api/v1/health

---

## Package Management

### Add Frontend Package
```bash
cd frontend
npm install <package-name>
```

### Add Backend Package
```bash
cd backend
source venv/bin/activate
pip install <package-name>
pip freeze > requirements.txt
```

### Remove Frontend Package
```bash
cd frontend
npm uninstall <package-name>
```

### Remove Backend Package
```bash
cd backend
source venv/bin/activate
pip uninstall <package-name>
pip freeze > requirements.txt
```

---

## Backend Development

### Create New Backend Module
```bash
cd backend/app
mkdir module_name
touch module_name/__init__.py
touch module_name/models.py
touch module_name/schemas.py
touch module_name/crud.py
```

### Add New Route
1. Create file in `backend/app/api/v1/routes.py`
2. Create router with `from fastapi import APIRouter`
3. Register in `backend/app/main.py` with `app.include_router()`

### Database Migration
```bash
cd backend
source venv/bin/activate
# When available:
alembic init alembic
alembic revision --autogenerate -m "description"
alembic upgrade head
```

### Run Tests
```bash
cd backend
source venv/bin/activate
pip install pytest pytest-asyncio
pytest tests/
```

---

## Frontend Development

### Create New Component
```bash
cd frontend/src/components
mkdir ComponentName
touch ComponentName/index.tsx
touch ComponentName/ComponentName.css    # if needed
```

### Create New Page
```bash
cd frontend/src/pages
touch PageName.tsx
# Then add route in App.tsx
```

### Create New Store (Zustand)
```bash
cd frontend/src/store
touch storeName.ts
```

### Install UI Component (shadcn/ui)
```bash
cd frontend
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
# etc.
```

### Build for Production
```bash
cd frontend
npm run build
npm run preview   # Preview production build
```

---

## API Testing

### Test Health Endpoint
```bash
curl http://localhost:8000/api/v1/health
```

### Test with JSON Data
```bash
curl -X POST http://localhost:8000/api/v1/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

### Use Swagger UI
Visit: http://localhost:8000/docs
(Interactive documentation and testing interface)

---

## Git Workflow

### Create Feature Branch
```bash
git checkout -b feature/feature-name
```

### Check Status
```bash
git status
```

### Stage Changes
```bash
git add .
git add specific/file.ts      # Specific file
```

### Commit Changes
```bash
git commit -m "feat(scope): description"
```

### Push to Remote
```bash
git push origin feature/feature-name
```

### Update from Remote
```bash
git fetch origin
git pull origin develop
```

---

## Environment Variables Quick Ref

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/contentpulse
GEMINI_API_KEY=your_key_here
DEBUG=False
```

---

## Useful npm Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run linter
npm test              # Run tests (if configured)
```

---

## Useful Python Commands

```bash
# Activate virtual environment
source venv/bin/activate              # macOS/Linux
venv\Scripts\activate                 # Windows

# Deactivate virtual environment
deactivate

# Check installed packages
pip list

# Show package version
pip show package-name

# Install from requirements
pip install -r requirements.txt

# Update requirements file
pip freeze > requirements.txt

# Create virtual environment
python -m venv venv

# Remove virtual environment
rm -rf venv                    # macOS/Linux
rmdir /s venv                 # Windows
```

---

## Troubleshooting Commands

### Backend - Fresh Start
```bash
cd backend
deactivate                    # or skip if not activated
rm -rf venv                   # macOS/Linux
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### Frontend - Fresh Start
```bash
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

### Clear Python Cache
```bash
cd backend
find . -type d -name __pycache__ -exec rm -rf {} +
find . -name "*.pyc" -delete
```

### Verify Python Installation
```bash
python --version              # Should be 3.9+
python -m venv --help
```

### Verify Node Installation
```bash
node --version                # Should be 18+
npm --version                 # Should be 9+
```

---

## Database Commands

### Create Database
```bash
createdb contentpulse
```

### Connect to Database
```bash
psql contentpulse
```

### List Databases
```bash
psql -l
```

### Drop Database
```bash
dropdb contentpulse
```

### Backup Database
```bash
pg_dump contentpulse > backup.sql
```

### Restore Database
```bash
psql contentpulse < backup.sql
```

---

## Docker Commands (Optional)

```bash
# Build Docker image
docker build -t contentpulse .

# Run Docker container
docker run -p 8000:8000 contentpulse

# View running containers
docker ps

# Stop container
docker stop container_id
```

---

## Debugging

### Frontend - Console Logging
```typescript
console.log('message', data);
console.error('error message', error);
console.warn('warning message');
```

### Backend - Print Debugging
```python
print('message', data)
import pdb; pdb.set_trace()  # Breakpoint
```

### Check Port Usage
```bash
# macOS/Linux
lsof -i :8000
lsof -i :5173

# Windows
netstat -ano | findstr :8000
netstat -ano | findstr :5173
```

### Kill Process on Port
```bash
# macOS/Linux
lsof -ti:8000 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

## Performance Monitoring

### Frontend
- Open DevTools: F12 or Cmd+Option+I
- Check Network tab for API calls
- Check Console for errors
- Check Performance tab for rendering time

### Backend
- Check console output for logs
- Use FastAPI docs at /docs
- Monitor database queries
- Check CPU and memory usage

---

## Useful Links in Development

| Tool | URL |
|------|-----|
| API Docs | http://localhost:8000/docs |
| Alternative Docs | http://localhost:8000/redoc |
| Health Check | http://localhost:8000/api/v1/health |
| Frontend App | http://localhost:5173 |
| Gemini API | https://aistudio.google.com/app/apikeys |

---

## Code Style & Formatting

### Python (Backend)
```bash
# Install formatters
pip install black flake8 isort

# Format code
black app/
isort app/

# Check style
flake8 app/
```

### TypeScript/React (Frontend)
```bash
# Install ESLint
npm install --save-dev eslint

# Format with Prettier (if installed)
npm install --save-dev prettier
npx prettier --write src/
```

---

## Security Checklist

- [ ] Never commit .env file
- [ ] Never share API keys
- [ ] Use .env.example as template
- [ ] Keep dependencies updated
- [ ] Validate all user inputs
- [ ] Use HTTPS in production
- [ ] Set CORS properly in production
- [ ] Use environment-specific configs

---

## Production Deployment

### Backend Build
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend Build
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

---

**Print this and keep it handy! 📋**
