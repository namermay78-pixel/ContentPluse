import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Calendar, CheckCircle, X, ArrowRight, File, FileCode, AlertCircle, Loader } from 'lucide-react';
import { uploadReport, analyzeContent } from '../services/reportService';


export default function UploadReport() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [uploadTime, setUploadTime] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    reportName: '',
    platform: '',
    reportDate: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSize(selectedFile.size);
      setFileType(getFileType(selectedFile.name));
      setUploadTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setError(null);
      setSuccess(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit button click is now handled by handleGenerateInsights
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setFileSize(null);
    setFileType(null);
    setUploadTime(null);
    setFile(null);
    setError(null);
    setSuccess(null);
  };

  const handleGenerateInsights = async () => {
    // Validate inputs
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (!formData.reportName.trim()) {
      setError('Please enter a report name');
      return;
    }

    if (!formData.platform) {
      setError('Please select a platform');
      return;
    }

    if (!formData.reportDate) {
      setError('Please select a report date');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Upload file
      setSuccess('Uploading file...');
      const uploadResponse = await uploadReport(file, fileType || 'pdf');

      if (!uploadResponse.success) {
        throw new Error(uploadResponse.error || 'Upload failed');
      }

      const parsedContent = uploadResponse.parsed_content || '';
      setSuccess('Analyzing content...');

      // Step 2: Analyze content with AI
      const reportId = `${formData.reportName}-${Date.now()}`;
      const analyzeResponse = await analyzeContent(parsedContent, reportId);

      if (!analyzeResponse.success || analyzeResponse.data.status === 'error') {
        throw new Error(analyzeResponse.data.error || 'Analysis failed');
      }

      // Store analysis results in localStorage for dashboard
      const analysisData = {
        reportId,
        reportName: formData.reportName,
        platform: formData.platform,
        reportDate: formData.reportDate,
        uploadedAt: new Date().toISOString(),
        analysis: analyzeResponse.data,
      };

      localStorage.setItem('currentAnalysis', JSON.stringify(analysisData));

      setSuccess('Analysis complete! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard', { state: { analysis: analysisData } });
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get file type from extension
  const getFileType = (name: string): string => {
    const ext = name.split('.').pop()?.toUpperCase() || 'Unknown';
    switch (ext) {
      case 'CSV':
        return 'CSV File';
      case 'XLSX':
      case 'XLS':
        return 'Excel Spreadsheet';
      case 'PDF':
        return 'PDF Document';
      default:
        return 'File';
    }
  };

  // Format file size to KB or MB
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // Get file icon
  const getFileIcon = () => {
    if (!fileType) return <FileText className="w-12 h-12 text-blue-500" />;
    if (fileType.includes('CSV')) return <FileCode className="w-12 h-12 text-orange-500" />;
    if (fileType.includes('Excel')) return <File className="w-12 h-12 text-green-500" />;
    if (fileType.includes('PDF')) return <File className="w-12 h-12 text-red-500" />;
    return <FileText className="w-12 h-12 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Report</h1>
          <p className="text-gray-600 mt-2">Add a new content report to your dashboard</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">Processing</h3>
              <p className="text-green-700 text-sm mt-1">{success}</p>
            </div>
          </div>
        )}


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

              {/* Report Preview Card */}
              {fileName && (
                <div className="mt-6 space-y-4">
                  {/* Preview Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getFileIcon()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Report Preview</h3>
                          
                          {/* Preview Details */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-blue-100">
                              <span className="text-sm text-gray-600">File Name</span>
                              <span className="text-sm font-semibold text-gray-900">{fileName}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-blue-100">
                              <span className="text-sm text-gray-600">File Type</span>
                              <span className="text-sm font-semibold text-gray-900">{fileType}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-blue-100">
                              <span className="text-sm text-gray-600">File Size</span>
                              <span className="text-sm font-semibold text-gray-900">
                                {fileSize !== null ? formatFileSize(fileSize) : 'Unknown'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-blue-100">
                              <span className="text-sm text-gray-600">Upload Time</span>
                              <span className="text-sm font-semibold text-gray-900">{uploadTime || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <span className="text-sm text-gray-600">Status</span>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-semibold text-green-700">Ready for Analysis</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove file"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Verification Checklist */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Verification</h4>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Supported file format</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">File size verified</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Ready for AI analysis</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading ? 'Processing...' : 'Upload Report'}
              </button>
              <button
                type="button"
                disabled={!fileName || loading}
                onClick={handleGenerateInsights}
                className={`flex-1 px-6 py-3 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  !fileName || loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                }`}
              >
                {loading && <Loader size={18} className="animate-spin" />}
                {loading ? 'Analyzing...' : 'Generate Insights'}
                {!loading && fileName && <ArrowRight size={18} />}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate('/dashboard')}
                className={`flex-1 px-6 py-3 border-2 rounded-md font-semibold transition-colors ${
                  loading
                    ? 'border-gray-300 text-gray-500 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
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
