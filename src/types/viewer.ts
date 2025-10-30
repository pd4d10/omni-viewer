/**
 * Core types for the OmniViewer architecture
 */

export interface FileData {
  file: File;
  url: string;
  type: string;
  name: string;
  size: number;
}

export interface ViewerConfig {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  supportedTypes: string[];
  component: React.ComponentType<ViewerProps>;
}

export interface ViewerProps {
  fileData: FileData;
  onError?: (error: Error) => void;
}

export interface ViewerRegistry {
  [fileType: string]: ViewerConfig[];
}
