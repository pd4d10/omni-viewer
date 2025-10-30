import { ViewerProps } from '../types/viewer'
import { useState } from 'react'

export default function ImageViewer({ fileData, onError }: ViewerProps) {
  const [imageError, setImageError] = useState(false)

  const handleError = () => {
    setImageError(true)
    onError?.(new Error('Failed to load image'))
  }

  if (imageError) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        <p>Failed to load image</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center p-8 h-full overflow-auto bg-gray-50 custom-scrollbar">
      <img
        src={fileData.url}
        alt={fileData.name}
        className="max-w-full max-h-full object-contain shadow-lg"
        onError={handleError}
      />
    </div>
  )
}
