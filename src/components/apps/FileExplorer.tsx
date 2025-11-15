import { useState } from 'react';

interface FileExplorerProps {
  windowId: string;
  onClose: () => void;
}

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
}

const mockFiles: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder', modified: '2024-01-15' },
  { id: '2', name: 'Pictures', type: 'folder', modified: '2024-01-14' },
  { id: '3', name: 'Music', type: 'folder', modified: '2024-01-13' },
  { id: '4', name: 'notes.txt', type: 'file', size: '2 KB', modified: '2024-01-15' },
  { id: '5', name: 'budget.xlsx', type: 'file', size: '156 KB', modified: '2024-01-12' },
  { id: '6', name: 'presentation.pptx', type: 'file', size: '4.2 MB', modified: '2024-01-10' },
];

const FileExplorer = ({ windowId, onClose }: FileExplorerProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState('This PC');

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return '📁';
      case 'file':
        return '📄';
      default:
        return '📄';
    }
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <span>💻</span>
            <span className="text-sm">This PC</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <span>📂</span>
            <span className="text-sm">Documents</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <span>🖼️</span>
            <span className="text-sm">Pictures</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <span>🎵</span>
            <span className="text-sm">Music</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-3 flex items-center space-x-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            New
          </button>
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors">
            Copy
          </button>
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors">
            Paste
          </button>
          <div className="border-l border-gray-300 h-6 mx-2"></div>
          <span className="text-sm text-gray-600">{currentPath}</span>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-1">
              {mockFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => setSelectedFile(file.id)}
                  className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors ${
                    selectedFile === file.id
                      ? 'bg-blue-100 border border-blue-300'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{getFileIcon(file.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{file.name}</div>
                    {file.type === 'file' && (
                      <div className="text-xs text-gray-500">{file.size}</div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{file.modified}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-50 border-t border-gray-200 p-2 text-xs text-gray-600">
          {mockFiles.length} items
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;