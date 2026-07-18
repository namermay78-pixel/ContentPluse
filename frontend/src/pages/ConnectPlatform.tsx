import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function ConnectPlatform() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Connect your Facebook pages and groups',
      icon: '📘',
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      description: 'Monitor your Twitter analytics and engagement',
      icon: '𝕏',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Track Instagram content performance',
      icon: '📷',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Analyze your TikTok video metrics',
      icon: '🎵',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Manage LinkedIn company page analytics',
      icon: '💼',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'View YouTube channel performance',
      icon: '🎥',
    },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect Platforms</h1>
          <p className="text-xl text-gray-600">
            Select the platforms you want to connect to ContentPulse. You can add more platforms later.
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPlatforms.includes(platform.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{platform.icon}</span>
                {selectedPlatforms.includes(platform.id) && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{platform.name}</h3>
              <p className="text-gray-600 text-sm">{platform.description}</p>
            </div>
          ))}
        </div>

        {/* Selected Platforms Summary */}
        {selectedPlatforms.length > 0 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">
              Selected Platforms: {selectedPlatforms.length}
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedPlatforms.map((platformId) => {
                const platform = platforms.find((p) => p.id === platformId);
                return (
                  <span
                    key={platformId}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold"
                  >
                    {platform?.name}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            disabled={selectedPlatforms.length === 0}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
              selectedPlatforms.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Continue <ArrowRight className="ml-2" size={20} />
          </button>
          <button className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works</h3>
          <ol className="space-y-4 text-gray-600">
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-4">1.</span>
              <span>Select the platforms you want to connect</span>
            </li>
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-4">2.</span>
              <span>Authenticate with each platform using OAuth</span>
            </li>
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-4">3.</span>
              <span>Grant permissions to access your content data</span>
            </li>
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-4">4.</span>
              <span>Start uploading and tracking reports</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
