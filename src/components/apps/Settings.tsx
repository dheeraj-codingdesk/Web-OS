import { useState } from 'react';

interface SettingsProps {
  windowId: string;
  onClose: () => void;
}

const Settings = ({ windowId, onClose }: SettingsProps) => {
  const [activeTab, setActiveTab] = useState('system');

  const tabs = [
    { id: 'system', name: 'System', icon: '💻' },
    { id: 'display', name: 'Display', icon: '🖥️' },
    { id: 'sound', name: 'Sound', icon: '🔊' },
    { id: 'network', name: 'Network', icon: '🌐' },
    { id: 'personalization', name: 'Personalization', icon: '🎨' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'system':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fake OS Version:</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Build:</span>
                    <span className="font-medium">2024.01.15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Type:</span>
                    <span className="font-medium">64-bit</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Device Specifications</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processor:</span>
                    <span className="font-medium">Fake CPU @ 3.2GHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memory:</span>
                    <span className="font-medium">8 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage:</span>
                    <span className="font-medium">256 GB SSD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'display':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Display Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Brightness</span>
                  <input type="range" className="w-32" defaultValue="75" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Resolution</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>1920 × 1080</option>
                    <option>1366 × 768</option>
                    <option>1280 × 720</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Scale</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>100%</option>
                    <option>125%</option>
                    <option>150%</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'sound':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Sound Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Volume</span>
                  <input type="range" className="w-32" defaultValue="50" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Output Device</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>Speakers</option>
                    <option>Headphones</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Settings for {activeTab} coming soon...
          </div>
        );
    }
  };

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;