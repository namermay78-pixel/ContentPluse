import React, { useState } from 'react';
import {
  TrendingUp,
  Eye,
  Zap,
  BarChart3,
  Lightbulb,
  Download,
  TrendingDown,
} from 'lucide-react';

// Types
interface KPIData {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

interface Topic {
  name: string;
  views: number;
  engagement: number;
  conversionRate: number;
}

interface ContentFormat {
  name: string;
  views: number;
}

interface ChartDataPoint {
  month: string;
  views: number;
}

// Dummy Data
const kpiData: KPIData[] = [
  {
    label: 'Total Views',
    value: '284.5K',
    change: 12.5,
    icon: <Eye className="w-6 h-6" />,
    trend: 'up',
  },
  {
    label: 'Engagement Rate',
    value: '8.2%',
    change: 5.3,
    icon: <Zap className="w-6 h-6" />,
    trend: 'up',
  },
  {
    label: 'Conversions',
    value: '1,234',
    change: -2.1,
    icon: <BarChart3 className="w-6 h-6" />,
    trend: 'down',
  },
  {
    label: 'Avg Time on Page',
    value: '3m 42s',
    change: 8.7,
    icon: <TrendingUp className="w-6 h-6" />,
    trend: 'up',
  },
];

const topicsData: Topic[] = [
  { name: 'AI', views: 42500, engagement: 12.3, conversionRate: 3.8 },
  { name: 'Technology', views: 38200, engagement: 9.8, conversionRate: 2.9 },
  { name: 'Finance', views: 35800, engagement: 11.2, conversionRate: 4.2 },
  { name: 'Education', views: 28900, engagement: 14.5, conversionRate: 5.1 },
  { name: 'Marketing', views: 26400, engagement: 10.3, conversionRate: 3.5 },
];

const contentFormatsData: ContentFormat[] = [
  { name: 'Blog', views: 125000 },
  { name: 'Video', views: 95000 },
  { name: 'Newsletter', views: 78000 },
  { name: 'Social Post', views: 62000 },
  { name: 'Case Study', views: 42000 },
];

const performanceChartData: ChartDataPoint[] = [
  { month: 'Jan', views: 45000 },
  { month: 'Feb', views: 52000 },
  { month: 'Mar', views: 48000 },
  { month: 'Apr', views: 61000 },
  { month: 'May', views: 55000 },
  { month: 'Jun', views: 70000 },
  { month: 'Jul', views: 68000 },
  { month: 'Aug', views: 82000 },
  { month: 'Sep', views: 76000 },
  { month: 'Oct', views: 89000 },
  { month: 'Nov', views: 95000 },
  { month: 'Dec', views: 102000 },
];

const aiInsights = [
  'AI-related content shows 42% higher engagement compared to other topics',
  'Video content drives 3x more conversions than static content formats',
  'Peak content consumption occurs between 2-4 PM on weekdays',
  'Newsletter subscribers have 5.2x higher conversion rates than organic visitors',
  'Long-form content (3000+ words) receives 40% more shares on social media',
];

const recommendations = {
  continue: [
    'Publish AI and Technology content weekly',
    'Maintain newsletter publication schedule',
    'Create more video content',
  ],
  stop: [
    'Avoid publishing on weekends (lowest engagement)',
    'Reduce low-performing topic mix',
  ],
  create: [
    'Launch webinar series on AI trends',
    'Create interactive tools and calculators',
    'Develop case study series with real data',
  ],
};

// KPI Card Component
const KPICard: React.FC<{ data: KPIData }> = ({ data }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className="text-gray-600 text-sm font-medium">{data.label}</div>
      <div className="text-blue-600">{data.icon}</div>
    </div>
    <div className="mb-4">
      <div className="text-3xl font-bold text-gray-900">{data.value}</div>
    </div>
    <div className="flex items-center">
      {data.trend === 'up' ? (
        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
      )}
      <span
        className={`text-sm font-medium ${
          data.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {data.trend === 'up' ? '+' : ''}{data.change}%
      </span>
      <span className="text-gray-500 text-sm ml-2">vs last month</span>
    </div>
  </div>
);

// Performance Line Chart Component
const PerformanceChart: React.FC = () => {
  const maxValue = Math.max(...performanceChartData.map((d) => d.views));
  const minValue = Math.min(...performanceChartData.map((d) => d.views));
  const range = maxValue - minValue;

  const normalizeValue = (value: number): number => {
    return ((value - minValue) / range) * 100;
  };

  const points = performanceChartData
    .map((d, i) => {
      const normalized = normalizeValue(d.views);
      const x = (i / (performanceChartData.length - 1)) * 100;
      const y = 100 - normalized;
      return { x, y, ...d };
    });

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`)
    .join(' ');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Content Performance Over Time
      </h3>
      <div className="w-full h-80 flex flex-col">
        <svg
          viewBox="0 0 100 100"
          className="flex-1 w-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={`grid-${y}`}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          ))}
          {/* Chart line */}
          <polyline
            points={pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data points */}
          {points.map((p, i) => (
            <circle
              key={`point-${i}`}
              cx={p.x}
              cy={p.y}
              r="1"
              fill="#3b82f6"
            />
          ))}
        </svg>
        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          {performanceChartData.map((d, i) => (
            <div key={`label-${i}`}>{d.month}</div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Views trend showing consistent growth throughout the year
      </div>
    </div>
  );
};

// Topic Card Component
const TopicCard: React.FC<{ topic: Topic }> = ({ topic }) => (
  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
    <div className="mb-4">
      <h4 className="text-lg font-bold text-gray-900">{topic.name}</h4>
    </div>
    <div className="space-y-3">
      <div>
        <div className="text-sm text-gray-600 mb-1">Views</div>
        <div className="text-2xl font-bold text-gray-900">
          {(topic.views / 1000).toFixed(1)}K
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-600 mb-1">Engagement</div>
        <div className="text-xl font-bold text-blue-600">{topic.engagement}%</div>
      </div>
      <div>
        <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
        <div className="text-xl font-bold text-green-600">
          {topic.conversionRate}%
        </div>
      </div>
    </div>
  </div>
);

// Content Format Bar Chart Component
const ContentFormatChart: React.FC = () => {
  const maxViews = Math.max(...contentFormatsData.map((d) => d.views));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Best Performing Content Formats
      </h3>
      <div className="space-y-4">
        {contentFormatsData.map((format, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-sm font-medium text-gray-700">
              {format.name}
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex items-center justify-end pr-3"
                  style={{
                    width: `${(format.views / maxViews) * 100}%`,
                  }}
                >
                  <span className="text-white text-xs font-semibold hidden sm:inline">
                    {format.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-24 text-right text-sm font-medium text-gray-700">
              {format.views.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function ContentIntelligenceDashboard() {
  const [downloadProgress, setDownloadProgress] = useState(false);

  const handleDownloadReport = () => {
    setDownloadProgress(true);
    setTimeout(() => {
      setDownloadProgress(false);
      // In a real app, this would trigger actual PDF generation
      alert('PDF report download would be initiated here');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Content Intelligence Dashboard
            </h1>
            <p className="text-gray-600">
              AI-powered editorial insights from your content performance
            </p>
          </div>
          <button
            onClick={handleDownloadReport}
            disabled={downloadProgress}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400"
          >
            <Download className="w-4 h-4" />
            {downloadProgress ? 'Generating...' : 'Download Report'}
          </button>
        </div>

        {/* KPI Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} data={kpi} />
          ))}
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <PerformanceChart />
        </div>

        {/* Topics and Content Formats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top Performing Topics */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Top Performing Topics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {topicsData.map((topic, index) => (
                  <TopicCard key={index} topic={topic} />
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
            </div>
            <ul className="space-y-3">
              {aiInsights.map((insight, index) => (
                <li key={index} className="flex gap-3 text-sm text-gray-700">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Format Chart */}
        <div className="mb-8">
          <ContentFormatChart />
        </div>

        {/* Recommendations Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Continue Section */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-green-200">
            <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Continue
            </h3>
            <ul className="space-y-2">
              {recommendations.continue.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-sm text-gray-700 pb-2 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <span className="text-green-600 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stop Section */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-red-200">
            <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Stop
            </h3>
            <ul className="space-y-2">
              {recommendations.stop.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-sm text-gray-700 pb-2 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <span className="text-red-600 font-bold">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Create Next Section */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Create Next
            </h3>
            <ul className="space-y-2">
              {recommendations.create.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-sm text-gray-700 pb-2 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <span className="text-blue-600 font-bold">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-sm text-blue-800">
          <p>
            <strong>Note:</strong> All data shown in this dashboard is based on
            aggregated analytics and AI-generated insights. Last updated today.
          </p>
        </div>
      </div>
    </div>
  );
}
