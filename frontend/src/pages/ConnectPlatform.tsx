import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  selectedPlatform: Platform | null;
  onCancel: () => void;
  onContinue: () => void;
}

function ConfirmationModal({
  isOpen,
  selectedPlatform,
  onCancel,
  onContinue,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="text-center">
          {selectedPlatform && (
            <div className="mb-4">
              <span className="text-5xl">{selectedPlatform.icon}</span>
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connect Your Account
          </h2>
          <p className="text-gray-600 mb-8">
            You will be redirected to securely connect your account.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onContinue}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConnectPlatform() {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);

  const platforms: Platform[] = [
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Connect your YouTube channel and access video analytics',
      icon: '📺',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Track your Instagram content performance and engagement',
      icon: '📷',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Connect your Facebook pages and monitor metrics',
      icon: '📘',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Manage your LinkedIn presence and track analytics',
      icon: '💼',
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Access your website analytics and user behavior data',
      icon: '📊',
    },
  ];

  const currentPlatform = platforms.find((p) => p.id === selectedPlatform);

  const handleConnectClick = (platformId: string) => {
    setSelectedPlatform(platformId);
    setShowModal(true);
  };

  const handleContinue = () => {
    if (selectedPlatform) {
      // Mark platform as connected
      setConnectedPlatforms(prev => new Set(prev).add(selectedPlatform));
    }
    setShowModal(false);
    // Navigate to processing page
    navigate('/processing');
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedPlatform(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Your Platforms
          </h1>
          <p className="text-lg text-gray-600">
            Select a platform to connect and start tracking your content performance
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`relative p-6 rounded-xl border-2 transition-all ${
                selectedPlatform === platform.id
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 shadow hover:shadow-md'
              }`}
            >
              {/* Selection Indicator */}
              {selectedPlatform === platform.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
              )}

              {/* Connected Badge */}
              {connectedPlatforms.has(platform.id) && (
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Check size={14} />
                  Connected
                </div>
              )}

              {/* Platform Icon */}
              <div className="text-5xl mb-4">{platform.icon}</div>

              {/* Platform Name */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {platform.name}
              </h3>

              {/* Platform Description */}
              <p className="text-gray-600 text-sm mb-6">{platform.description}</p>

              {/* Connect Button */}
              <button
                onClick={() => handleConnectClick(platform.id)}
                disabled={selectedPlatform !== null && selectedPlatform !== platform.id}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedPlatform === null || selectedPlatform === platform.id
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Connect
              </button>
            </div>
          ))}
        </div>

        {/* Selected Platform Display */}
        {selectedPlatform && currentPlatform && (
          <div className="bg-white rounded-xl shadow-md border-2 border-blue-100 p-8 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{currentPlatform.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {currentPlatform.name} Selected
                </h3>
                <p className="text-gray-600 mt-1">{currentPlatform.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-white rounded-xl shadow p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-semibold">1</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Select Platform</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Choose a platform from the cards above
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-semibold">2</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Click Connect</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Click the Connect button on your selected platform
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-semibold">3</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Confirm Connection</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Review and confirm in the modal dialog
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-semibold">4</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Start Analytics</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Access your platform analytics and insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        selectedPlatform={currentPlatform || null}
        onCancel={handleCancel}
        onContinue={handleContinue}
      />
    </div>
  );
}
