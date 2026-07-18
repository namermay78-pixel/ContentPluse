import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ConnectPlatform from './pages/ConnectPlatform'
import UploadReport from './pages/UploadReport'
import ReportDetails from './pages/ReportDetails'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/connect-platform" element={<ConnectPlatform />} />
          <Route path="/upload-report" element={<UploadReport />} />
          <Route path="/report/:id" element={<ReportDetails />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
