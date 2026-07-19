import React, { useState } from 'react';
import {
  TrendingUp,
  Eye,
  Zap,
  BarChart3,
  Lightbulb,
  Download,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';

// Types
interface KPIData {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  color: string;
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
    value: '542.8K',
    change: 18.7,
    icon: <Eye className="w-7 h-7" />,
    trend: 'up',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    label: 'Engagement Rate',
    value: '12.4%',
    change: 9.2,
    icon: <Zap className="w-7 h-7" />,
    trend: 'up',
    color: 'from-purple-600 to-pink-600',
  },
  {
    label: 'Conversions',
    value: '2,847',
    change: 3.5,
    icon: <BarChart3 className="w-7 h-7" />,
    trend: 'up',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    label: 'Avg Time on Page',
    value: '5m 24s',
    change: 12.1,
    icon: <Activity className="w-7 h-7" />,
    trend: 'up',
    color: 'from-orange-600 to-red-600',
  },
];

const topicsData: Topic[] = [
  { name: 'Machine Learning', views: 58200, engagement: 15.8, conversionRate: 4.9 },
  { name: 'Cloud Computing', views: 52100, engagement: 13.2, conversionRate: 4.1 },
  { name: 'Data Science', views: 48900, engagement: 14.7, conversionRate: 5.3 },
  { name: 'DevOps', views: 42300, engagement: 11.9, conversionRate: 3.8 },
  { name: 'Web Development', views: 38700, engagement: 10.5, conversionRate: 3.2 },
];

const contentFormatsData: ContentFormat[] = [
  { name: 'In-Depth Articles', views: 185000 },
  { name: 'Video Tutorials', views: 156000 },
  { name: 'Webinar Series', views: 124000 },
  { name: 'Interactive Tools', views: 98000 },
  { name: 'Whitepapers', views: 67000 },
];

const performanceChartData: ChartDataPoint[] = [
  { month: 'Jan', views: 62000 },
  { month: 'Feb', views: 71000 },
  { month: 'Mar', views: 68000 },
  { month: 'Apr', views: 85000 },
  { month: 'May', views: 78000 },
  { month: 'Jun', views: 95000 },
  { month: 'Jul', views: 102000 },
  { month: 'Aug', views: 118000 },
  { month: 'Sep', views: 125000 },
  { month: 'Oct', views: 142000 },
  { month: 'Nov', views: 156000 },
  { month: 'Dec', views: 175000 },
];

const aiInsights = [
  'Machine Learning content drives 56% higher engagement vs average topics',
  'Video tutorials have 4.2x conversion rate compared to text-only content',
  'Peak traffic occurs Tue-Thu between 10 AM - 2 PM UTC',
  'Long-form content (5000+ words) gets 8x more backlinks and shares',
  'Interactive tools retention rate is 68% vs 22% for static content',
];

const recommendations = {
  continue: [
    'Expand Machine Learning tutorials weekly',
    'Maintain webinar cadence biweekly',
    'Invest in interactive tool development',
  ],
  stop: [
    'Reduce short-form content (<500 words)',
    'Minimize Friday publication schedule',
  ],
  create: [
    'Launch AI certification course series',
    'Develop industry benchmark reports',
    'Create AI tool comparison database',
  ],
};

// Premium KPI Card Component
const PremiumKPICard: React.FC<{ data: KPIData }> = ({ data }) => (
  <div className="group relative overflow-hidden rounded-2xl">
    {/* Gradient Background */}
    <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
    
    {/* Card */}
    <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Icon Background */}
      <div className={`absolute top-4 right-4 bg-gradient-to-br ${data.color} rounded-xl p-3 opacity-10`}>
        <div className={`bg-gradient-to-br ${data.color} bg-clip-text text-transparent`}>
          {data.icon}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600 mb-1">{data.label}</p>
        <div className="text-4xl font-bold text-gray-900">{data.value}</div>
      </div>

      {/* Trend */}
      <div className="flex items-center gap-2">
        {data.trend === 'up' ? (
          <>
            <ArrowUpRight className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold text-green-600">
              +{data.change}%
            </span>
          </>
        ) : (
          <>
            <ArrowDownRight className="w-5 h-5 text-red-500" />
            <span className="text-sm font-semibold text-red-600">
              {data.change}%
            </span>
          </>
        )}
        <span className="text-xs text-gray-500 ml-auto">vs last month</span>
      </div>
    </div>
  </div>
);

// Enhanced Line Chart Component
const EnhancedLineChart: React.FC = () => {
  const maxValue = Math.max(...performanceChartData.map((d) => d.views));
  const minValue = Math.min(...performanceChartData.map((d) => d.views));
  const range = maxValue - minValue;

  const normalizeValue = (value: number): number => {
    return ((value - minValue) / range) * 100;
  };

  const points = performanceChartData.map((d, i) => {
    const normalized = normalizeValue(d.views);
    const x = (i / (performanceChartData.length - 1)) * 100;
    const y = 100 - normalized;
    return { x, y, ...d };
  });

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`)
    .join(' ');

  // Gradient fill area
  const areaPath = `${pathData} L 100,100 L 0,100 Z`;

  return (
    <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Performance Analytics</h3>
        <p className="text-sm text-gray-600">Year-over-year growth trend</p>
      </div>

      <div className="w-full h-96 flex flex-col">
        <svg
          viewBox="0 0 100 100"
          className="flex-1 w-full"
          preserveAspectRatio="none"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

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
              strokeDasharray="2,2"
            />
          ))}

          {/* Filled area under curve */}
          <path
            d={areaPath}
            fill="url(#chartGradient)"
          />

          {/* Chart line */}
          <polyline
            points={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((p, i) => (
            <g key={`point-${i}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r="1.5"
                fill="url(#lineGradient)"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="2.5"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </g>
          ))}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs font-medium text-gray-600 mt-4 px-1">
          {performanceChartData.map((d, i) => (
            <div key={`label-${i}`}>{d.month}</div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-600">Views Trend</span>
        </div>
        <div className="text-sm text-gray-500">
          Growth: <span className="font-bold text-gray-900">+182.3%</span>
        </div>
      </div>
    </div>
  );
};

// Premium Topic Card Component
const PremiumTopicCard: React.FC<{ topic: Topic; index: number }> = ({ topic, index }) => {
  const colors = [
    'from-blue-600 to-cyan-600',
    'from-purple-600 to-pink-600',
    'from-emerald-600 to-teal-600',
    'from-orange-600 to-red-600',
    'from-indigo-600 to-blue-600',
  ];

  return (
    <div className="group relative">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Card */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
        {/* Badge */}
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${colors[index]} mb-4`}>
          #{index + 1}
        </div>

        {/* Topic Name */}
        <h4 className="text-lg font-bold text-gray-900 mb-4">{topic.name}</h4>

        {/* Stats */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 uppercase">Views</span>
              <span className="text-xs font-bold text-gray-900">
                {(topic.views / 1000).toFixed(1)}K
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${colors[index]} h-2 rounded-full`}
                style={{ width: `${(topic.views / 60000) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 uppercase">Engagement</span>
              <span className="text-xs font-bold text-gray-900">{topic.engagement}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${colors[index]} h-2 rounded-full`}
                style={{ width: `${topic.engagement}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 uppercase">Conversion</span>
              <span className="text-xs font-bold text-gray-900">{topic.conversionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${colors[index]} h-2 rounded-full`}
                style={{ width: `${(topic.conversionRate / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Content Format Chart Component
const ContentFormatChart: React.FC = () => {
  const maxViews = Math.max(...contentFormatsData.map((d) => d.views));
  const colors = [
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
  ];

  return (
    <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Content Format Performance</h3>
        <p className="text-sm text-gray-600">Total views by content type</p>
      </div>

      <div className="space-y-6">
        {contentFormatsData.map((format, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="font-semibold text-gray-900">{format.name}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {format.views.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(format.views / maxViews) * 100}%`,
                  backgroundColor: colors[index],
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {contentFormatsData.length}
          </div>
          <div className="text-xs text-gray-600">Format Types</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {(contentFormatsData.reduce((sum, f) => sum + f.views, 0) / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-gray-600">Total Views</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {(contentFormatsData.reduce((sum, f) => sum + f.views, 0) / contentFormatsData.length / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-gray-600">Average Views</div>
        </div>
      </div>
    </div>
  );
};

// AI Insights Card Component
const AIInsightsCard: React.FC = () => (
  <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-200/30 p-8">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-3">
        <Lightbulb className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
        <p className="text-xs text-gray-600">Powered by content intelligence</p>
      </div>
    </div>

    <div className="space-y-4">
      {aiInsights.map((insight, index) => (
        <div key={index} className="flex gap-3 p-4 bg-white/50 rounded-lg border border-white/20 hover:bg-white/70 transition-colors">
          <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-2" />
          <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
        </div>
      ))}
    </div>
  </div>
);

// Recommendations Card Component
const RecommendationsCard: React.FC = () => (
  <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8">
    <h3 className="text-xl font-bold text-gray-900 mb-8">Recommendations</h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Continue */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-emerald-200">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg p-2">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-bold text-gray-900">Continue</h4>
        </div>
        <ul className="space-y-2">
          {recommendations.continue.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-gray-700">
              <span className="text-emerald-600 font-bold">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stop */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-red-200">
          <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-lg p-2">
            <TrendingDown className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-bold text-gray-900">Stop</h4>
        </div>
        <ul className="space-y-2">
          {recommendations.stop.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-gray-700">
              <span className="text-red-600 font-bold">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Create Next */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-blue-200">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-2">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-bold text-gray-900">Create Next</h4>
        </div>
        <ul className="space-y-2">
          {recommendations.create.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-gray-700">
              <span className="text-blue-600 font-bold">+</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// Main Analytics Dashboard Component
export default function AnalyticsDashboard() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('PDF export would be generated here');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 sm:py-24">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Analytics Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8">
              Premium AI-powered insights for content creators & publishers
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                {isExporting ? 'Generating PDF...' : 'Export PDF Report'}
              </button>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 border border-white/20 backdrop-blur-xl">
                <Activity className="w-5 h-5" />
                View Real-Time Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <PremiumKPICard key={index} data={kpi} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <EnhancedLineChart />
        </div>

        {/* Topics and Formats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Topics */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topicsData.map((topic, index) => (
                <PremiumTopicCard key={index} topic={topic} index={index} />
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Analytics</h2>
            <AIInsightsCard />
          </div>
        </div>

        {/* Content Formats */}
        <div className="mb-8">
          <ContentFormatChart />
        </div>

        {/* Recommendations */}
        <div className="mb-12">
          <RecommendationsCard />
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-8 text-center">
          <p className="text-gray-700">
            <span className="font-bold">Last updated:</span> Today at 2:34 PM UTC
            <span className="mx-2">•</span>
            <span className="font-bold">Data retention:</span> Last 12 months
            <span className="mx-2">•</span>
            <span className="font-bold">Analysis powered by:</span> Advanced AI Engine
          </p>
        </div>
      </div>
    </div>
  );
}
