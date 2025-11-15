export interface App {
  id: string;
  name: string;
  icon: string;
  component: string;
}

export interface Window {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}