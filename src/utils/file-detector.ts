/**
 * Utility to detect file types based on extension and MIME type
 */

export interface FileTypeInfo {
  category: string;
  extension: string;
  mimeType: string;
}

export function detectFileType(file: File): FileTypeInfo {
  const fileName = file.name.toLowerCase();
  const mimeType = file.type;

  // Extract extension
  const lastDot = fileName.lastIndexOf('.');
  const extension = lastDot !== -1 ? fileName.substring(lastDot + 1) : '';

  // Image files
  if (mimeType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
    return { category: 'image', extension, mimeType };
  }

  // PDF files
  if (mimeType === 'application/pdf' || extension === 'pdf') {
    return { category: 'pdf', extension, mimeType };
  }

  // JSON files
  if (mimeType === 'application/json' || extension === 'json') {
    return { category: 'json', extension, mimeType };
  }

  // Text files
  if (mimeType.startsWith('text/') || ['txt', 'md', 'markdown', 'log', 'csv'].includes(extension)) {
    return { category: 'text', extension, mimeType };
  }

  // Office documents - Word
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      extension === 'docx') {
    return { category: 'word', extension, mimeType };
  }

  // Office documents - Excel
  if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      ['xlsx', 'xls'].includes(extension)) {
    return { category: 'excel', extension, mimeType };
  }

  // XML files
  if (mimeType === 'application/xml' || mimeType === 'text/xml' || extension === 'xml') {
    return { category: 'xml', extension, mimeType };
  }

  // Default to unknown
  return { category: 'unknown', extension, mimeType };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
