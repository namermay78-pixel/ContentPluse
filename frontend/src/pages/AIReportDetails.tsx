import React, { useState } from 'react';
import {
  Eye,
  Zap,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Globe,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Target,
} from 'lucide-react';
import { generateAnalyticsPDF } from '@/utils/pdfExport';

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

interface ChartDataPoint {
  month: string;
  views: number;
}

// Dummy Data
const reportHeader = {
  name: 'Q3 2024 Content Performance Report',
  platform: 'Multi-Channel (Web, Social, Email)',
  uploadDate: '2024-09-28',
  overallScore: 87,
};

const executiveSummary = `
This comprehensive analysis of your content performance across Q3 2024 reveals exceptional growth in key metrics. Your content strategy has successfully driven a 18.7% increase in total views, reaching 542.8K impressions, while maintaining a healthy engagement rate of 12.4%. The strategic focus on AI and technology-related topics has yielded outstanding results, with these categories outperforming the industry benchmark by 56%.

The data highlights several critical success factors: your investment in interactive tools and video content has resulted in a 4.2x higher conversion rate compared to traditional text-only formats. Peak traffic patterns show concentration during business hours (Tue-Thu, 10 AM - 2 PM UTC), suggesting a highly engaged professional audience. Long-form content (5000+ words) continues to drive significant backlinks and social shares.

Moving forward, the recommendation is to amplify Machine Learning and Cloud Computing content production while refining your publishing schedule. The data-driven insights suggest a strong opportunity to launch your planned AI certification course series and develop industry benchmark reports to further solidify thought leadership in this space.
`;

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
  { name: 'AI & Machine Learning', views: 58200, engagement: 15.8, conversionRate: 4.9 },
  { name: 'Technology', views: 52100, engagement: 13.2, conversionRate: 4.1 },
  { name: 'Finance & Economics', views: 48900, engagement: 14.7, conversionRate: 5.3 },
  { name: 'Education & Learning', views: 42300, engagement: 11.9, conversionRate: 3.8 },
  { name: 'Marketing & Growth', views: 38700, engagement: 10.5, conversionRate: 3.2 },
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
];

const aiInsightsList = [
  {
    title: 'AI Content Dominance',
    description: 'Machine Learning content drives 56% higher engagement vs average topics',
    icon: <Lightbulb className="w-5 h-5" />,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Video Performance',
    description: 'Video tutorials have 4.2x conversion rate compared to text-only content',
    icon: <Zap className="w-5 h-5" />,
    color: 'from-pink-500 to-red-500',
  },
  {
    title: 'Peak Hours Identified',
    description: 'Peak traffic occurs Tue-Thu between 10 AM - 2 PM UTC',
    icon: <Activity className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Long-Form Content',
    description: 'Long-form content (5000+ words) gets 8x more backlinks and shares',
    icon: <Target className="w-5 h-5" />,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Interactive Tools',
    description: 'Interactive tools retention rate is 68% vs 22% for static content',
    icon: <Zap className="w-5 h-5" />,

    color: 'from-purple-500 to-pink-500',
  },
];

const recommendations = {
  continue: [
    'Expand Machine Learning tutorials weekly',
    'Maintain webinar cadence biweekly',
    'Invest in interactive tool development',
  ],
  improve: [
    'Optimize email subject lines for 15% uplift',
    'A/B test call-to-action placement',
    'Refine audience segmentation strategy',
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

// Performance Chart Component
const PerformanceChart: React.FC = () => {
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

  const areaPath = `${pathData} L 100,100 L 0,100 Z`;

  return (
    <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Performance Trends</h3>
        <p className="text-sm text-gray-600">Content views over Q3 2024</p>
      </div>

      <div className="w-full h-96 flex flex-col">
        <svg
          viewBox="0 0 100 100"
          className="flex-1 w-full"
          preserveAspectRatio="none"
        >
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

          <path d={areaPath} fill="url(#chartGradient)" />

          <polyline
            points={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

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

        <div className="flex justify-between text-xs font-medium text-gray-600 mt-4 px-1">
          {performanceChartData.map((d, i) => (
            <div key={`label-${i}`}>{d.month}</div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-600">Views Trend</span>
        </div>
        <div className="text-sm text-gray-500">
          Growth: <span className="font-bold text-gray-900">+101.6%</span>
        </div>
      </div>
    </div>
  );
};

// Topic Card Component
const TopicCard: React.FC<{ topic: Topic; index: number }> = ({ topic, index }) => {
  const colors = [
    'from-blue-600 to-cyan-600',
    'from-purple-600 to-pink-600',
    'from-emerald-600 to-teal-600',
    'from-orange-600 to-red-600',
    'from-indigo-600 to-blue-600',
  ];

  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${colors[index]} mb-4`}>
          #{index + 1}
        </div>

        <h4 className="text-lg font-bold text-gray-900 mb-4">{topic.name}</h4>

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

// AI Insights Card
const AIInsightCard: React.FC<{ insight: (typeof aiInsightsList)[0] }> = ({ insight }) => (
  <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${insight.color} p-0.5`}>
    <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 h-full">
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${insight.color} mb-4`}>
        <div className="text-white">{insight.icon}</div>
      </div>

      <h4 className="text-lg font-bold text-gray-900 mb-2">{insight.title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
    </div>
  </div>
);

// Recommendation Box Component
const RecommendationBox: React.FC<{
  title: string;
  items: string[];
  color: string;
  icon: React.ReactNode;
}> = ({ title, items, color, icon }) => (
  <div className={`bg-gradient-to-br ${color} p-0.5 rounded-2xl`}>
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`bg-gradient-to-br ${color} p-2 rounded-lg text-white`}>
          {icon}
        </div>
        <h4 className="font-bold text-gray-900">{title}</h4>
      </div>

      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-gray-700">
            <span className={`font-bold flex-shrink-0 ${
              title === 'Continue' ? 'text-emerald-600' :
              title === 'Improve' ? 'text-blue-600' :
              title === 'Stop' ? 'text-red-600' :
              'text-purple-600'
            }`}>
              {title === 'Continue' ? '→' : title === 'Improve' ? '⟳' : title === 'Stop' ? '✕' : '+'}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Main AIReportDetails Component
export default function AIReportDetails() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        generateAnalyticsPDF({
          kpiData,
          topicsData,
          contentFormatsData: [],
          aiInsights: aiInsightsList.map(i => i.description),
          recommendations: {
            continue: recommendations.continue,
            stop: recommendations.stop,
            create: recommendations.create,
          },
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      } finally {
        setIsExporting(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Report Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {reportHeader.name}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-blue-200 text-xs uppercase tracking-wide mb-1">Platform</p>
                  <div className="flex items-center gap-2 text-white">
                    <Globe className="w-4 h-4" />
                    <span className="font-semibold text-sm">{reportHeader.platform}</span>
                  </div>
                </div>

                <div>
                  <p className="text-blue-200 text-xs uppercase tracking-wide mb-1">Upload Date</p>
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold text-sm">
                      {new Date(reportHeader.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-blue-200 text-xs uppercase tracking-wide mb-1">Overall Score</p>
                  <div className="flex items-center gap-2">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="4"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#scoreGradient)"
                          strokeWidth="4"
                          strokeDasharray={`${(reportHeader.overallScore / 100) * 283} 283`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute text-white font-bold text-sm">{reportHeader.overallScore}%</span>
                    </div>
                    <span className="text-white font-semibold">Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <Download className="w-5 h-5" />
              {isExporting ? 'Generating...' : 'Export PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Executive Summary */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Executive Summary</h2>
            <div className="space-y-4">
              {executiveSummary.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed text-justify">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiData.map((kpi, index) => (
            <PremiumKPICard key={index} data={kpi} />
          ))}
        </div>

        {/* Performance Trends Chart */}
        <div className="mb-12">
          <PerformanceChart />
        </div>

        {/* Top Performing Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Top Performing Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {topicsData.map((topic, index) => (
              <TopicCard key={index} topic={topic} index={index} />
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">AI Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {aiInsightsList.map((insight, index) => (
              <AIInsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Strategic Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RecommendationBox
              title="Continue"
              items={recommendations.continue}
              color="from-emerald-600 to-teal-600"
              icon={<CheckCircle className="w-5 h-5" />}
            />
            <RecommendationBox
              title="Improve"
              items={recommendations.improve}
              color="from-blue-600 to-cyan-600"
              icon={<Zap className="w-5 h-5" />}
            />
            <RecommendationBox
              title="Stop"
              items={recommendations.stop}
              color="from-red-600 to-orange-600"
              icon={<AlertCircle className="w-5 h-5" />}
            />
            <RecommendationBox
              title="Create Next"
              items={recommendations.create}
              color="from-purple-600 to-pink-600"
              icon={<Lightbulb className="w-5 h-5" />}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 backdrop-blur-xl rounded-2xl border border-blue-200/30 p-8 text-center">
          <p className="text-gray-700">
            <span className="font-bold">Report Period:</span> Q3 2024 (Jul - Sep)
            <span className="mx-2">•</span>
            <span className="font-bold">Generated:</span> {new Date().toLocaleDateString()}
            <span className="mx-2">•</span>
            <span className="font-bold">Status:</span> <span className="text-green-600 font-bold">Final</span>
          </p>
        </div>
      </div>
    </div>
  );
}
