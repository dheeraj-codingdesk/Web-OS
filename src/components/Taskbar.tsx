import { useState, useEffect } from 'react';
import type { Window, App } from '../types';

interface TaskbarProps {
  windows: Window[];
  activeWindow: string | null;
  startMenuOpen: boolean;
  onStartMenuToggle: () => void;
  onWindowClick: (windowId: string) => void;
  apps: App[];
  onAppClick: (app: App) => void;
}

const Taskbar = ({ 
  windows, 
  activeWindow, 
  startMenuOpen, 
  onStartMenuToggle, 
  onWindowClick,
  apps,
  onAppClick
}: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900 bg-opacity-95 backdrop-blur-sm border-t border-gray-700 flex items-center px-2">
      {/* Start Button */}
      <div className="relative">
        <button
            onClick={onStartMenuToggle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 ${
              startMenuOpen 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-700 text-gray-300 hover:text-white'
            }`}
          >
          <span className="text-xl">🪟</span>
          <span className="font-semibold text-sm">Start</span>
        </button>

        {/* Start Menu */}
        {startMenuOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-80 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-600 p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="mb-4">
              <h3 className="text-white font-semibold mb-3 text-sm">Apps</h3>
              <div className="space-y-1">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => onAppClick(app)}
                    className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                  >
                    <span className="text-xl">{app.icon}</span>
                    <span className="text-gray-200 text-sm">{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-600 pt-3">
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-150">
                <span className="text-lg">👤</span>
                <span className="text-gray-200 text-sm">User Account</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer transition-colors duration-150">
                <span className="text-lg">🚪</span>
                <span className="text-gray-200 text-sm">Power Options</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Taskbar Apps */}
      <div className="flex-1 flex items-center space-x-1 ml-4">
        {windows.filter(w => !w.isMinimized).map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 min-w-0 ${
              activeWindow === window.id
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            <span className="text-sm truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-3 text-gray-300 text-sm">
        <div className="flex items-center space-x-2">
          <span>🔊</span>
          <span>🔋</span>
          <span>📶</span>
        </div>
        <div className="text-right border-l border-gray-600 pl-3">
          <div className="font-medium">{formatTime(currentTime)}</div>
          <div className="text-xs text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;