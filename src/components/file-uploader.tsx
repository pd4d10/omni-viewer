import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploaderProps {
  onFileSelect: (file: File) => void
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <div className="flex justify-center items-center min-h-screen p-8 bg-gray-50">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-16 text-center cursor-pointer
          transition-all duration-300 bg-white max-w-2xl w-full
          ${isDragActive
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {isDragActive ? 'Drop your file here' : 'Drag & drop a file here'}
        </h3>
        <p className="text-base text-gray-500 mb-8">or click to browse</p>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Supported formats:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Images</span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">JSON</span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Text</span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">PDF</span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Word</span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Excel</span>
          </div>
        </div>
      </div>
    </div>
  )
}
