import { useState } from 'react';

interface NotepadProps {
  windowId: string;
  onClose: () => void;
}

const Notepad = ({ windowId, onClose }: NotepadProps) => {
  const [content, setContent] = useState(
    `Welcome to Fake OS Notepad!\n\nThis is a simple text editor that mimics Windows Notepad.\n\nYou can type anything here and it will be saved in memory.\n\nFeatures:\n- Basic text editing\n- Auto-save to state\n- Windows-style interface\n\nTry typing something below:`
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu Bar */}
      <div className="bg-gray-100 border-b border-gray-300 flex">
        <div className="px-3 py-1 text-sm hover:bg-gray-200 cursor-pointer">File</div>
        <div className="px-3 py-1 text-sm hover:bg-gray-200 cursor-pointer">Edit</div>
        <div className="px-3 py-1 text-sm hover:bg-gray-200 cursor-pointer">Format</div>
        <div className="px-3 py-1 text-sm hover:bg-gray-200 cursor-pointer">View</div>
        <div className="px-3 py-1 text-sm hover:bg-gray-200 cursor-pointer">Help</div>
      </div>

      {/* Text Area */}
      <div className="flex-1 p-0">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full resize-none border-none outline-none p-4 font-mono text-sm"
          placeholder="Start typing here..."
        />
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 border-t border-gray-300 px-3 py-1 text-xs text-gray-600 flex justify-between">
        <span>Length: {content.length}</span>
        <span>Lines: {content.split('\n').length}</span>
      </div>
    </div>
  );
};

export default Notepad;