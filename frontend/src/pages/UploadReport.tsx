import { useState } from 'react';
import { Upload, FileText, Calendar } from 'lucide-react';

export default function UploadReport() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    reportName: '',
    platform: '',
    reportDate: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - no business logic
    console.log('Report submission:', { ...formData, file: fileName });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Report</h1>
          <p className="text-gray-600 mt-2">Add a new content report to your dashboard</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Report Name */}
            <div>
              <label htmlFor="reportName" className="block text-sm font-medium text-gray-700 mb-2">
                Report Name *
              </label>
              <input
                type="text"
                id="reportName"
                name="reportName"
                value={formData.reportName}
                onChange={handleChange}
                placeholder="e.g., Q3 Social Media Report"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Platform Selection */}
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
                Platform *
              </label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a platform</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter / X</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>

            {/* Report Date */}
            <div>
              <label htmlFor="reportDate" className="block text-sm font-medium text-gray-700 mb-2">
                Report Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="reportDate"
                  name="reportDate"
                  value={formData.reportDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <label htmlFor="file" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="text-gray-400 mb-2" size={32} />
                    <span className="text-sm font-semibold text-gray-700">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      CSV, Excel, or PDF files (max 10MB)
                    </span>
                  </div>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  accept=".csv,.xlsx,.xls,.pdf"
                  className="hidden"
                />
              </div>
              {fileName && (
                <div className="mt-4 p-4 bg-green-50 rounded-md flex items-center">
                  <FileText className="text-green-600 mr-3" size={20} />
                  <span className="text-green-800 text-sm font-medium">{fileName}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Upload Report
              </button>
              <button
                type="button"
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-2">Supported Formats</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• CSV (Comma-Separated Values)</li>
            <li>• XLSX / XLS (Excel files)</li>
            <li>• PDF (PDF documents)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
