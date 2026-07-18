import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Trash2 } from 'lucide-react';

export default function ReportDetails() {
  const { id } = useParams<{ id: string }>();

  // Placeholder data - would come from backend
  const report = {
    id,
    name: 'Q3 Social Media Performance Report',
    platform: 'Facebook',
    date: '2024-01-15',
    status: 'Completed',
    uploadedDate: '2024-01-15',
    metrics: {
      impressions: '125,430',
      engagements: '8,234',
      clicks: '3,421',
      shares: '234',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-semibold"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{report.name}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div>
                  <span className="font-semibold text-gray-700">Platform:</span> {report.platform}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Report Date:</span> {report.date}
                </div>
                <div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {report.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Impressions</p>
            <p className="text-3xl font-bold text-gray-900">{report.metrics.impressions}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Engagements</p>
            <p className="text-3xl font-bold text-gray-900">{report.metrics.engagements}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Clicks</p>
            <p className="text-3xl font-bold text-gray-900">{report.metrics.clicks}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Shares</p>
            <p className="text-3xl font-bold text-gray-900">{report.metrics.shares}</p>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Report ID</span>
              <span className="text-gray-600">{report.id}</span>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Platform</span>
              <span className="text-gray-600">{report.platform}</span>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Report Date</span>
              <span className="text-gray-600">{report.date}</span>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Uploaded Date</span>
              <span className="text-gray-600">{report.uploadedDate}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="font-semibold text-gray-700">Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                {report.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Content</h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
            <p className="mb-4">Report content preview would be displayed here</p>
            <p className="text-sm text-gray-500">
              This is a placeholder for the actual report visualization or content display
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            <Download size={20} className="mr-2" />
            Download Report
          </button>
          <button className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
            <Share2 size={20} className="mr-2" />
            Share Report
          </button>
          <button className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold">
            <Trash2 size={20} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
