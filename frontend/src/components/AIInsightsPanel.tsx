import type { AIInsights } from '../services/reportService';
import {
  TrendingUp,
  Lightbulb,
  CheckCircle,
  XCircle,
  Plus,
  Zap,
  Target,
  AlertCircle,
} from 'lucide-react';


interface AIInsightsPanelProps {
  analysis?: AIInsights;
}

export default function AIInsightsPanel({ analysis }: AIInsightsPanelProps) {
  // Use real data if available, otherwise use defaults
  const contentSummary = analysis?.executive_summary || 
    "This month's content generated 1.2M impressions with a 14% increase in engagement.";

  const topInsights = analysis?.insights?.map(i => i.title) || [
    'AI content performs best.',
    'Videos have the highest conversion.',
    'Finance articles have low retention.',
    'Tuesday posts receive the most traffic.',
    'Short-form content outperforms long articles.',
  ];

  const recommendations = {
    continue: analysis?.recommendations?.continue || ['AI', 'Technology'],
    stop: analysis?.recommendations?.stop || ['Long Finance Articles'],
    createNext: analysis?.recommendations?.create || ['AI Tutorials', 'Industry Case Studies', 'Weekly Newsletters'],
  };

  const opportunityScore = analysis?.opportunity_score || 87;
  const scoreLabel = opportunityScore >= 80 ? 'Excellent' : opportunityScore >= 60 ? 'Good' : 'Fair';
  const trendStatus = analysis?.kpis?.trend_momentum === 'positive' ? 'Growing' : 'Declining';
  const engagementRate = analysis?.kpis?.engagement_rate || '14%';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-gray-900">AI Insights Panel</h1>
          </div>
          <p className="text-gray-600">Real-time analysis of your content performance</p>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Opportunity Score Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Opportunity Score</h2>
              <Target className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex items-end gap-4">
              <div>
                <div className="text-5xl font-bold text-green-600">{opportunityScore}%</div>
                <div className="text-lg font-semibold text-green-600 mt-2">{scoreLabel}</div>
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${opportunityScore}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Your content strategy is performing exceptionally well
            </p>
          </div>

          {/* Trend Indicator Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Trend Indicator</h2>
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-4xl font-bold text-blue-600 flex items-center gap-2">
                  <TrendingUp className="w-8 h-8" />
                  {trendStatus}
                </div>
              </div>
              <div className="flex-1 text-right">
                <div className="text-3xl font-bold text-blue-600">↑ 24%</div>
                <p className="text-sm text-gray-600 mt-1">week-over-week growth</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                Your content engagement is accelerating. Keep up the momentum!
              </p>
            </div>
          </div>
        </div>

        {/* Content Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-semibold text-gray-900">Content Summary</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">{contentSummary}</p>
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-900">
              💡 <span className="font-semibold">Pro Tip:</span> Maintain consistent posting
              schedules and focus on video content to maximize your engagement metrics.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Insights */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-indigo-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Top Insights</h2>
            </div>
            <ul className="space-y-4">
              {topInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-indigo-600">{index + 1}</span>
                  </span>
                  <span className="text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-emerald-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-emerald-500" />
              <h2 className="text-2xl font-semibold text-gray-900">AI Recommendations</h2>
            </div>

            {/* Continue */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Continue
              </h3>
              <div className="space-y-2">
                {recommendations.continue.map((item, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-gray-700 font-medium">• {item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stop */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                Stop
              </h3>
              <div className="space-y-2">
                {recommendations.stop.map((item, index) => (
                  <div key={index} className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-gray-700 font-medium">• {item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Next */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-500" />
                Create Next
              </h3>
              <div className="space-y-2">
                {recommendations.createNext.map((item, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-gray-700 font-medium">• {item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-orange-500" />
              <h3 className="font-semibold text-gray-900">Performance</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Engagement Rate</p>
                <p className="text-2xl font-bold text-orange-600">{engagementRate}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${parseInt(engagementRate)}%` }} />
              </div>
            </div>
          </div>

          {/* Reach Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-cyan-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-cyan-500" />
              <h3 className="font-semibold text-gray-900">Total Reach</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-cyan-600">1.2M</p>
              </div>
              <p className="text-sm text-gray-600">↑ 12% from last month</p>
            </div>
          </div>

          {/* Conversion Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-rose-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-rose-500" />
              <h3 className="font-semibold text-gray-900">Conversions</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Video Content</p>
                <p className="text-2xl font-bold text-rose-600">42%</p>
              </div>
              <p className="text-sm text-gray-600">Highest conversion rate</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
          <p className="text-center text-gray-700">
            <span className="font-semibold">🤖 AI-Powered Insights</span> - These recommendations are
            based on your content performance patterns. Update your content strategy accordingly for
            optimal results.
          </p>
        </div>
      </div>
    </div>
  );
}
