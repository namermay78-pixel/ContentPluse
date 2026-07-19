# Frontend Flow - Quick Reference

## Complete User Journey

```
Landing (/) 
  ↓ "Upload Report" button
Upload Report (/upload-report)
  ↓ "Generate Insights" button (after file selection)
Analytics Dashboard (/analytics-dashboard)
  ↓ "Export PDF Report" button
PDF Download
```

---

## Key Files Modified

### 1. **apiClient.ts** - Fixed VITE env variables
```typescript
// Now uses: import.meta.env.VITE_API_BASE_URL
// .env.local should have: VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 2. **AIProcessing.tsx** - Enhanced redirect
```typescript
// Passes analysis data to Analytics Dashboard via location.state
navigate('/analytics-dashboard', { state: { analysis: analysisState } });
```

### 3. **UploadReport.tsx** - Fixed flow
```typescript
// Added handleSubmit for form
// Stores analysis in localStorage
// Cancel button goes to Dashboard
// Generate Insights triggers analysis
```

### 4. **Login.tsx** - Added redirect
```typescript
// Stores mock auth token
// Redirects to Dashboard after login
localStorage.setItem('authToken', 'mock-token-' + Date.now());
navigate('/dashboard');
```

### 5. **AIInsightsPanel.tsx** - Safe data access
```typescript
// Uses optional chaining for all analysis properties
analysis?.insights?.map(i => i.title)
analysis?.kpis?.trend_momentum
```

---

## Data Flow Diagram

```
Upload File & Metadata
    ↓
uploadReport() [Backend: Parse file]
    ↓
analyzeContent() [Backend: Gemini AI analysis]
    ↓
Store in localStorage: currentAnalysis
    ↓
Navigate to Analytics Dashboard
    ↓
AnalyticsDashboard reads from location.state OR localStorage
    ↓
Pass to AIInsightsPanel component
    ↓
Display KPIs, charts, insights, recommendations
    ↓
Export to PDF
```

---

## Environment Setup

### .env.local (frontend/)
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_ENV=development
```

### .env (backend/)
```
API_URL=http://localhost:8000
GEMINI_API_KEY=your_key_here
```

---

## Testing the Flow

### Local Development:
```bash
# Terminal 1: Backend
cd backend
python -m uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Manual Testing:
1. Navigate to `http://localhost:5173`
2. Click "Upload Report"
3. Select a CSV/Excel/PDF file
4. Enter report details
5. Click "Generate Insights"
6. Wait for analysis (real or demo)
7. View Analytics Dashboard
8. Click "Export PDF Report"

---

## Component Props

### AIInsightsPanel
```typescript
interface AIInsightsPanelProps {
  analysis?: AIInsights;  // Optional AI analysis data
}

// AIInsights interface (from reportService.ts):
{
  status: string;
  executive_summary: string;
  kpis: {
    engagement_rate: string;
    content_quality_score: number;
    audience_relevance: string;
    conversion_potential: string;
    trend_momentum: string;
  };
  insights: Array<{
    title: string;
    description: string;
    confidence: number;
    impact: 'high' | 'medium' | 'low';
  }>;
  recommendations: {
    continue: string[];
    improve: string[];
    stop: string[];
    create: string[];
  };
  opportunity_score: number;
}
```

---

## API Endpoints Used

### Upload & Analysis
- `POST /api/v1/upload` - Upload file
- `POST /api/v1/ai/analyze` - Analyze content with Gemini

### Optional Data Fetching
- `GET /api/v1/ai/insights/{reportId}` - Get stored insights
- `GET /api/v1/ai/recommendations/{reportId}` - Get recommendations

---

## State Management

### localStorage Keys
- `currentAnalysis` - Stores complete analysis data
- `authToken` - Stores authentication token

### Navigation State
- `location.state.analysis` - Passed via React Router navigation

---

## UI Components

### Pages (in /src/pages/)
1. Landing.tsx
2. Login.tsx
3. Dashboard.tsx
4. UploadReport.tsx
5. AIProcessing.tsx (optional progress display)
6. AnalyticsDashboard.tsx
7. AIReportDetails.tsx (optional details view)

### Components (in /src/components/)
1. AIInsightsPanel.tsx - Insights display
2. Layout.tsx - Page wrapper
3. Navbar.tsx - Navigation
4. Footer.tsx - Footer

---

## Error Handling

### User Errors (Validation)
- Missing file selection
- Missing form fields
- Unsupported file type

### API Errors
- Upload failure
- Analysis failure
- Network timeout

### UI Errors
- Undefined analysis data (handled with optional chaining)
- Missing localStorage data (fallback to dummy data)

---

## Build & Deploy

### Development
```bash
npm run dev         # Start dev server
npm run lint        # Check for errors
npm run build       # Production build
npm run preview     # Preview production build
```

### Production
```bash
# Build and deploy to hosting service
npm run build
# Deploy /dist folder to hosting
```

---

## Troubleshooting

### Issue: API 404 errors
**Solution:** Check VITE_API_BASE_URL in .env.local

### Issue: Analysis not showing on dashboard
**Solution:** Check localStorage for 'currentAnalysis' key in DevTools

### Issue: File upload failing
**Solution:** Verify backend is running and file size < 10MB

### Issue: Export PDF not working
**Solution:** Check browser console for errors, verify jsPDF library

---

## Key Features Implemented

✅ Complete navigation flow
✅ File upload validation
✅ AI analysis integration
✅ Real-time progress display
✅ Dynamic KPI visualization
✅ PDF export functionality
✅ Persistent data storage
✅ Error handling and validation
✅ Responsive design
✅ Clean UI components

---

## Next Phase

When backend APIs are ready:
1. Replace mock auth with real JWT
2. Connect real Gemini API calls
3. Implement database storage
4. Add real-time analysis updates
5. Setup production monitoring
