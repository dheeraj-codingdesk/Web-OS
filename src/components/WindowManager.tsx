import { Window } from '../types';
import DraggableWindow from './DraggableWindow';
import FileExplorer from './apps/FileExplorer';
import Notepad from './apps/Notepad';
import Calculator from './apps/Calculator';
import Settings from './apps/Settings';

interface WindowManagerProps {
  windows: Window[];
  activeWindow: string | null;
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onMaximize: (windowId: string) => void;
  onFocus: (windowId: string) => void;
  onPositionChange: (windowId: string, position: { x: number; y: number }) => void;
  onSizeChange: (windowId: string, size: { width: number; height: number }) => void;
}

const WindowManager = ({
  windows,
  activeWindow,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange
}: WindowManagerProps) => {
  const renderAppContent = (window: Window) => {
    const appProps = {
      windowId: window.id,
      onClose: () => onClose(window.id)
    };

    switch (window.appId) {
      case 'file-explorer':
        return <FileExplorer {...appProps} />;
      case 'notepad':
        return <Notepad {...appProps} />;
      case 'calculator':
        return <Calculator {...appProps} />;
      case 'settings':
        return <Settings {...appProps} />;
      default:
        return <div className="p-8 text-center text-gray-500">App not found</div>;
    }
  };

  return (
    <>
      {windows.filter(window => !window.isMinimized).map((window) => (
        <DraggableWindow
          key={window.id}
          window={window}
          isActive={activeWindow === window.id}
          onClose={() => onClose(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onMaximize={() => onMaximize(window.id)}
          onFocus={() => onFocus(window.id)}
          onPositionChange={(position) => onPositionChange(window.id, position)}
          onSizeChange={(size) => onSizeChange(window.id, size)}
        >
          {renderAppContent(window)}
        </DraggableWindow>
      ))}
    </>
  );
};

export default WindowManager;