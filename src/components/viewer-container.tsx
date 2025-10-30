import { useState } from 'react'
import { FileData } from '../types/viewer'
import { detectFileType, formatFileSize } from '../utils/file-detector'
import { getViewersForFileType } from '../viewers'
import ViewerSelector from './viewer-selector'

interface ViewerContainerProps {
  fileData: FileData
  onClose: () => void
}

export default function ViewerContainer({ fileData, onClose }: ViewerContainerProps) {
  // These are lightweight operations, no need for useMemo in React 19
  const fileTypeInfo = detectFileType(fileData.file)
  const availableViewers = getViewersForFileType(fileTypeInfo.category)

  const [currentViewerId, setCurrentViewerId] = useState<string>(
    availableViewers[0]?.id || ''
  )
  const [error, setError] = useState<Error | null>(null)

  const currentViewer = availableViewers.find(v => v.id === currentViewerId)

  const handleError = (err: Error) => {
    setError(err)
  }

  if (availableViewers.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <Header
          fileName={fileData.name}
          fileSize={fileData.size}
          onClose={onClose}
        />
        <div className="flex justify-center items-center h-full p-8">
          <div className="text-center max-w-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Unsupported File Type
            </h3>
            <p className="text-base text-gray-500 mb-2">
              No viewer available for <strong>{fileTypeInfo.category}</strong> files.
            </p>
            <p className="text-sm text-gray-400">
              File: {fileData.name} ({fileTypeInfo.mimeType || 'unknown type'})
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header
        fileName={fileData.name}
        fileSize={fileData.size}
        onClose={onClose}
      />

      <ViewerSelector
        viewers={availableViewers}
        currentViewerId={currentViewerId}
        onViewerChange={setCurrentViewerId}
      />

      <div className="flex-1 overflow-hidden">
        {error ? (
          <div className="flex flex-col justify-center items-center h-full p-8">
            <h3 className="text-2xl font-semibold text-red-500 mb-4">Error</h3>
            <p className="text-base text-gray-500">{error.message}</p>
          </div>
        ) : currentViewer ? (
          <currentViewer.component fileData={fileData} onError={handleError} />
        ) : null}
      </div>
    </div>
  )
}

interface HeaderProps {
  fileName: string
  fileSize: number
  onClose: () => void
}

function Header({ fileName, fileSize, onClose }: HeaderProps) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-900">{fileName}</h2>
        <span className="text-sm text-gray-500">{formatFileSize(fileSize)}</span>
      </div>
      <button
        onClick={onClose}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Close"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}
