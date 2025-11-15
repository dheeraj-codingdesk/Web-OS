import { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import type { Window, App as AppType } from './types';

const defaultApps: AppType[] = [
  {
    id: 'file-explorer',
    name: 'File Explorer',
    icon: '📁',
    component: 'FileExplorer'
  },
  {
    id: 'notepad',
    name: 'Notepad',
    icon: '📝',
    component: 'Notepad'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: '🧮',
    component: 'Calculator'
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    component: 'Settings'
  }
];

function App() {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const openApp = (app: AppType) => {
    const existingWindow = windows.find(w => w.appId === app.id && !w.isMinimized);
    
    if (existingWindow) {
      setActiveWindow(existingWindow.id);
      setWindows(prev => prev.map(w => 
        w.id === existingWindow.id ? { ...w, isMinimized: false, zIndex: getMaxZIndex() + 1 } : w
      ));
    } else {
      const newWindow: Window = {
        id: `${app.id}-${Date.now()}`,
        appId: app.id,
        title: app.name,
        isMinimized: false,
        isMaximized: false,
        zIndex: getMaxZIndex() + 1,
        position: { x: 50 + windows.length * 30, y: 50 + windows.length * 30 },
        size: { width: 800, height: 600 }
      };
      setWindows(prev => [...prev, newWindow]);
      setActiveWindow(newWindow.id);
    }
    setStartMenuOpen(false);
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      const remainingWindows = windows.filter(w => w.id !== windowId);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const minimizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
    if (activeWindow === windowId) {
      const remainingWindows = windows.filter(w => w.id !== windowId && !w.isMinimized);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const maximizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (windowId: string) => {
    setActiveWindow(windowId);
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: getMaxZIndex() + 1, isMinimized: false } : w
    ));
  };

  const updateWindowPosition = (windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ));
  };

  const updateWindowSize = (windowId: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, size } : w
    ));
  };

  const getMaxZIndex = () => {
    return windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 0;
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative">
      {/* Desktop */}
      <Desktop apps={defaultApps} onAppClick={openApp} />
      
      {/* Windows */}
      <WindowManager
        windows={windows}
        activeWindow={activeWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        onFocus={focusWindow}
        onPositionChange={updateWindowPosition}
        onSizeChange={updateWindowSize}
      />
      
      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        startMenuOpen={startMenuOpen}
        onStartMenuToggle={() => setStartMenuOpen(!startMenuOpen)}
        onWindowClick={focusWindow}
        apps={defaultApps}
        onAppClick={openApp}
      />
    </div>
  );
}

export default App;