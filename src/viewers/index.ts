/**
 * Viewer Registry
 * Maps file types to available viewer components
 */

import { ViewerConfig, ViewerRegistry } from '../types/viewer';
import ImageViewer from './image-viewer';
import TextViewer from './text-viewer';
import JsonHighlightViewer from './json-highlight-viewer';
import JsonTableViewer from './json-table-viewer';

// Define all available viewers
export const viewers: ViewerConfig[] = [
  {
    id: 'image-viewer',
    name: 'Image Viewer',
    description: 'Display images',
    supportedTypes: ['image'],
    component: ImageViewer,
  },
  {
    id: 'json-highlight',
    name: 'JSON Highlight',
    description: 'Syntax highlighted JSON',
    supportedTypes: ['json'],
    component: JsonHighlightViewer,
  },
  {
    id: 'json-table',
    name: 'JSON Table',
    description: 'Display JSON as a table',
    supportedTypes: ['json'],
    component: JsonTableViewer,
  },
  {
    id: 'text-viewer',
    name: 'Text Viewer',
    description: 'Plain text display',
    supportedTypes: ['text'],
    component: TextViewer,
  },
];

// Build registry: fileType -> ViewerConfig[]
export const viewerRegistry: ViewerRegistry = viewers.reduce((registry, viewer) => {
  viewer.supportedTypes.forEach(type => {
    if (!registry[type]) {
      registry[type] = [];
    }
    registry[type].push(viewer);
  });
  return registry;
}, {} as ViewerRegistry);

export function getViewersForFileType(fileType: string): ViewerConfig[] {
  return viewerRegistry[fileType] || [];
}
