import type { App } from '../types';

interface DesktopProps {
  apps: App[];
  onAppClick: (app: App) => void;
}

const Desktop = ({ apps, onAppClick }: DesktopProps) => {
  return (
    <div className="absolute inset-0 pt-4 pl-4 overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 w-48 sm:w-96 md:w-48">
        {apps.map((app) => (
          <div
            key={app.id}
            onClick={() => onAppClick(app)}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-white hover:bg-opacity-10 cursor-pointer transition-all duration-200 group active:scale-95"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200 group-active:scale-100">
              {app.icon}
            </div>
            <span className="text-white text-sm text-center font-medium group-hover:bg-blue-600 group-hover:bg-opacity-50 px-2 py-1 rounded transition-all duration-200">
              {app.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Desktop;