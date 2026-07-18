# ContentPulse

AI-powered content management and optimization platform built with modern technologies.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup Instructions](#setup-instructions)
- [Running Development Servers](#running-development-servers)
- [Environment Variables](#environment-variables)
- [Git Workflow](#git-workflow)
- [API Documentation](#api-documentation)

## 🎯 Overview

ContentPulse is an AI SaaS application that helps users create, manage, and optimize content using advanced AI capabilities. The platform integrates with Google's Gemini API to provide intelligent content suggestions and analysis.

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **Server**: Uvicorn
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Configuration**: Pydantic Settings
- **Migrations**: Alembic
- **AI API**: Google Gemini API

## 📁 Project Structure

```
ContentPulse/
├── frontend/                      # React + Vite frontend application
│   ├── src/
│   │   ├── components/            # Reusable React components
│   │   ├── pages/                 # Page components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # API service calls
│   │   ├── store/                 # Zustand state management
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── utils/                 # Utility functions
│   │   ├── App.tsx                # Main App component
│   │   └── main.tsx               # Entry point
│   ├── public/                    # Static assets
│   ├── index.html                 # HTML template
│   ├── package.json               # Frontend dependencies
│   ├── tsconfig.json              # TypeScript configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── vite.config.ts             # Vite configuration
│   └── .env.example               # Example environment variables
│
├── backend/                       # FastAPI backend application
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/                # API v1 endpoints
│   │   │       └── health.py      # Health check endpoints
│   │   ├── core/
│   │   │   └── config.py          # Application configuration
│   │   ├── models/                # SQLAlchemy database models
│   │   ├── services/              # Business logic services
│   │   ├── db/                    # Database utilities and session
│   │   └── main.py                # FastAPI application entry point
│   ├── tests/                     # Test suite
│   ├── requirements.txt           # Python dependencies
│   ├── .env.example               # Example environment variables
│   └── .gitignore                 # Git ignore patterns
│
├── .env.example                   # Root environment template
├── .gitignore                     # Git ignore patterns
└── README.md                      # This file
```

## 📋 Prerequisites

### System Requirements
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Python**: 3.9 or higher
- **PostgreSQL**: 12 or higher
- **Git**: 2.x or higher

### Additional Requirements
- Google Gemini API key (get from [AI Studio](https://aistudio.google.com/app/apikeys))

## 💻 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ContentPulse
```

### 2. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

#### Set up shadcn/ui (if not already done)
```bash
npx shadcn-ui@latest init
```

### 3. Backend Setup

#### Create Virtual Environment
```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Configure Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

#### Set Up Database
```bash
# Create PostgreSQL database
createdb contentpulse

# Run migrations (when available)
alembic upgrade head
```

## 🚀 Setup Instructions

### Frontend Configuration

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env.local` file**:
   ```bash
   cp .env.example .env.local
   ```

4. **Update environment variables** in `.env.local`:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

### Backend Configuration

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file**:
   ```bash
   cp .env.example .env
   ```

5. **Update environment variables** in `.env`:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/contentpulse
   GEMINI_API_KEY=your_actual_gemini_api_key
   DEBUG=False
   ```

6. **Create PostgreSQL database**:
   ```bash
   createdb contentpulse
   ```

## ▶️ Running Development Servers

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Start Backend Development Server

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`
- API Docs (Swagger UI): `http://localhost:8000/docs`
- Alternative API Docs (ReDoc): `http://localhost:8000/redoc`

### Running Both Servers (Recommended)

Open two terminal windows:

**Terminal 1 - Frontend**:
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend**:
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 🔧 Environment Variables

### Root `.env.example`
Template containing both frontend and backend variables.

### Frontend `.env.example` / `.env.local`

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api/v1` |
| `VITE_ENV` | Environment (development/production) | `development` |

### Backend `.env.example` / `.env`

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_NAME` | Application name | `ContentPulse` |
| `APP_VERSION` | Application version | `0.1.0` |
| `DEBUG` | Debug mode | `False` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/contentpulse` |
| `GEMINI_API_KEY` | Google Gemini API key | *(required)* |
| `API_V1_STR` | API v1 prefix | `/api/v1` |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `http://localhost:3000,http://localhost:5173` |

## 📚 Git Workflow

### Branch Naming Convention
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches (e.g., `feature/auth-system`)
- `bugfix/*` - Bug fix branches (e.g., `bugfix/login-error`)
- `hotfix/*` - Urgent production fixes

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): add JWT authentication

- Implement JWT token generation
- Add token validation middleware
- Update user model with token field

Closes #123
```

### Creating a Feature
```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat(scope): description"

# Push branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Merging
```bash
# Keep branches in sync
git fetch origin
git rebase origin/develop

# Push changes
git push origin feature/your-feature-name

# After PR approval, merge via GitHub UI or:
git checkout develop
git pull origin develop
git merge feature/your-feature-name
git push origin develop
```

## 📖 API Documentation

### Health Check
```bash
GET http://localhost:8000/api/v1/health
```

Response:
```json
{
  "status": "healthy",
  "message": "ContentPulse API is running"
}
```

### Interactive API Documentation
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 📝 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 🤝 Contributing

1. Follow the branch naming convention
2. Write meaningful commit messages
3. Create pull requests with clear descriptions
4. Ensure code passes linting and tests
5. Request review from team members

## 📄 License

All rights reserved - ContentPulse Inc.
