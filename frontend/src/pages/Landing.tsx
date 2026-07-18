import { Link } from 'react-router-dom'
import { LinkIcon, BarChart3 } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6">
            ContentPulse
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto">
            AI-powered Content Performance & Editorial Intelligence
          </p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Connect Platform */}
          <div className="border-2 border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow bg-white">
            <div className="flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <LinkIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Connect Platform
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Connect your YouTube, Instagram, Facebook, or LinkedIn account to automatically analyze your published content.
              </p>
              <Link
                to="/connect-platform"
                className="inline-block w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold text-center"
              >
                Connect Platform
              </Link>
            </div>
          </div>

          {/* Card 2: Upload Analytics Report */}
          <div className="border-2 border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow bg-white">
            <div className="flex flex-col h-full">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Upload Analytics Report
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Upload CSV, Excel, or PDF analytics reports and receive AI-powered insights.
              </p>
              <Link
                to="/upload-report"
                className="inline-block w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-semibold text-center"
              >
                Upload Report
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
