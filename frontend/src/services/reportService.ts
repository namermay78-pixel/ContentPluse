import apiClient from './apiClient';

export interface AIInsights {
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
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  file_id?: string;
  file_name?: string;
  parsed_content?: string;
  error?: string;
}

export interface AnalyzeResponse {
  success: boolean;
  status: string;
  data: AIInsights;
  error?: string;
}

/**
 * Upload a report file to the backend
 * @param file - File to upload
 * @param fileType - Type of file (pdf, csv, etc.)
 * @returns Upload response with file_id and parsed content
 */
export const uploadReport = async (
  file: File,
  fileType: string = 'pdf'
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('file_type', fileType);

  try {
    const response = await apiClient.post<UploadResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'Upload failed';
    throw new Error(errorMessage);
  }
};

/**
 * Analyze content using Gemini AI
 * @param text - Text content to analyze
 * @param reportId - Optional report ID for tracking
 * @returns AI-generated insights and analysis
 */
export const analyzeContent = async (
  text: string,
  reportId?: string
): Promise<AnalyzeResponse> => {
  try {
    const payload = {
      text,
      report_id: reportId || `report-${Date.now()}`,
    };

    const response = await apiClient.post<AnalyzeResponse>('/ai/analyze', payload);

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'Analysis failed';
    throw new Error(errorMessage);
  }
};

/**
 * Get existing analysis for a report
 * @param reportId - Report ID to fetch
 * @returns Analysis data for the report
 */
export const getReportAnalysis = async (reportId: string): Promise<AIInsights> => {
  try {
    const response = await apiClient.get<{ data: AIInsights }>(`/ai/insights/${reportId}`);
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch analysis';
    throw new Error(errorMessage);
  }
};

/**
 * Get recommendations for a report
 * @param reportId - Report ID to fetch recommendations for
 * @returns Recommendations data
 */
export const getRecommendations = async (reportId: string): Promise<any> => {
  try {
    const response = await apiClient.get(`/ai/recommendations/${reportId}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch recommendations';
    throw new Error(errorMessage);
  }
};

/**
 * Parse CSV file on the backend
 * @param file - CSV file to parse
 * @returns Parsed CSV data
 */
export const parseCSV = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/upload/csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'CSV parsing failed';
    throw new Error(errorMessage);
  }
};

/**
 * Parse PDF file on the backend
 * @param file - PDF file to parse
 * @returns Parsed PDF content
 */
export const parsePDF = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/upload/pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'PDF parsing failed';
    throw new Error(errorMessage);
  }
};

export default {
  uploadReport,
  analyzeContent,
  getReportAnalysis,
  getRecommendations,
  parseCSV,
  parsePDF,
};
