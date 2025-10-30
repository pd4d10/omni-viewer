import { ViewerProps } from '../types/viewer'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function JsonHighlightViewer({ fileData, onError }: ViewerProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadJson = async () => {
      try {
        const text = await fileData.file.text()
        const json = JSON.parse(text)
        const formatted = JSON.stringify(json, null, 2)
        setContent(formatted)
      } catch (error) {
        onError?.(error as Error)
      } finally {
        setLoading(false)
      }
    }

    loadJson()
  }, [fileData.file, onError])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Loading...
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto bg-[#1e1e1e] custom-scrollbar">
      <SyntaxHighlighter
        language="json"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          height: '100%',
          fontSize: '0.875rem',
        }}
        showLineNumbers
      >
        {content}
      </SyntaxHighlighter>
    </div>
  )
}
