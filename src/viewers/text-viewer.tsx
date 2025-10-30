import { ViewerProps } from '../types/viewer'
import { useEffect, useState } from 'react'

export default function TextViewer({ fileData, onError }: ViewerProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadText = async () => {
      try {
        const text = await fileData.file.text()
        setContent(text)
      } catch (error) {
        onError?.(error as Error)
      } finally {
        setLoading(false)
      }
    }

    loadText()
  }, [fileData.file, onError])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Loading...
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto bg-white custom-scrollbar">
      <pre className="m-0 p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
        <code>{content}</code>
      </pre>
    </div>
  )
}
