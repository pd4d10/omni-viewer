import { ViewerProps } from '../types/viewer'
import { useEffect, useState } from 'react'

interface TableData {
  headers: string[]
  rows: Record<string, unknown>[]
}

export default function JsonTableViewer({ fileData, onError }: ViewerProps) {
  const [tableData, setTableData] = useState<TableData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const loadJson = async () => {
      try {
        const text = await fileData.file.text()
        const json = JSON.parse(text)

        // Try to convert JSON to table format
        if (Array.isArray(json) && json.length > 0) {
          // Array of objects - extract headers from first object
          const headers = Object.keys(json[0])
          setTableData({ headers, rows: json })
        } else if (typeof json === 'object' && json !== null) {
          // Single object - convert to single row
          const headers = Object.keys(json)
          setTableData({ headers, rows: [json] })
        } else {
          setError('JSON data is not in a table-compatible format. Expected an array or object.')
        }
      } catch (error) {
        setError((error as Error).message)
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

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-red-500 p-8 text-center">
        <p>{error}</p>
        <p className="text-gray-500 text-sm mt-2">Try using JSON Highlight viewer instead.</p>
      </div>
    )
  }

  if (!tableData) {
    return null
  }

  const renderValue = (value: unknown): string => {
    if (value === null) return 'null'
    if (value === undefined) return 'undefined'
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
  }

  return (
    <div className="h-full overflow-auto bg-white custom-scrollbar">
      <div className="p-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {tableData.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="bg-gray-100 px-4 py-3 text-left font-semibold border-b-2 border-gray-200 sticky top-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {tableData.headers.map((header, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-4 py-3 border-b border-gray-200"
                  >
                    {renderValue(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
