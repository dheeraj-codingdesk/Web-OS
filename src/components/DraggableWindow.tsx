import { useState, useRef, useEffect } from 'react';
import { Window } from '../types';

interface DraggableWindowProps {
  window: Window;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

const DraggableWindow = ({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
  children
}: DraggableWindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
      onFocus();
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        };
        onPositionChange(newPosition);
      } else if (isResizing) {
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
          const newSize = {
            width: Math.max(400, e.clientX - rect.left),
            height: Math.max(300, e.clientY - rect.top)
          };
          onSizeChange(newSize);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, onPositionChange, onSizeChange]);

  const windowStyle = window.isMaximized
    ? {
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)',
      }
    : {
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
      };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-gray-100 border border-gray-400 rounded-lg shadow-2xl overflow-hidden transition-all duration-200 window-animate ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{
        ...windowStyle,
        zIndex: window.zIndex,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div className="window-header bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 flex items-center justify-between cursor-grab active:cursor-grabbing">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium truncate">{window.title}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="w-6 h-6 bg-yellow-500 hover:bg-yellow-600 rounded text-xs font-bold text-white transition-colors duration-150"
          >
            _
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 bg-green-500 hover:bg-green-600 rounded text-xs font-bold text-white transition-colors duration-150"
          >
            ☐
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded text-xs font-bold text-white transition-colors duration-150"
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white" style={{ height: 'calc(100% - 40px)' }}>
        {children}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-300 hover:bg-gray-400 transition-colors duration-150"
          style={{
            clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)'
          }}
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
};

export default DraggableWindow;