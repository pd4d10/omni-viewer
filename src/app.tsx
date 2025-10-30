import { useState, useCallback } from 'react'
import FileUploader from './components/file-uploader'
import ViewerContainer from './components/viewer-container'
import { FileData } from './types/viewer'
import './app.css'

function App() {
  const [fileData, setFileData] = useState<FileData | null>(null)

  const handleFileSelect = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    setFileData({
      file,
      url,
      type: file.type,
      name: file.name,
      size: file.size,
    })
  }, [])

  const handleClose = useCallback(() => {
    if (fileData?.url) {
      URL.revokeObjectURL(fileData.url)
    }
    setFileData(null)
  }, [fileData])

  return (
    <div className="w-full min-h-screen">
      {fileData ? (
        <ViewerContainer fileData={fileData} onClose={handleClose} />
      ) : (
        <FileUploader onFileSelect={handleFileSelect} />
      )}
    </div>
  )
}

export default App
