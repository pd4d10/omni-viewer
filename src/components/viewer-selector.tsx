import { ViewerConfig } from '../types/viewer'

interface ViewerSelectorProps {
  viewers: ViewerConfig[]
  currentViewerId: string
  onViewerChange: (viewerId: string) => void
}

export default function ViewerSelector({
  viewers,
  currentViewerId,
  onViewerChange
}: ViewerSelectorProps) {
  // Don't render if there's only one viewer
  if (viewers.length <= 1) {
    return null
  }

  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-white border-b border-gray-200">
      <label className="text-sm font-medium text-gray-500">View as:</label>
      <div className="flex gap-2">
        {viewers.map((viewer) => (
          <button
            key={viewer.id}
            onClick={() => onViewerChange(viewer.id)}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
              border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${currentViewerId === viewer.id
                ? 'text-white bg-blue-500 border-blue-500'
                : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100'
              }
            `}
            title={viewer.description}
          >
            {viewer.name}
          </button>
        ))}
      </div>
    </div>
  )
}
