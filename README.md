# OmniViewer

> A universal file viewer for the web - preview documents, images, and structured data directly in your browser

## ✨ Features

- 🖼️ **Image Viewing** - Display all common image formats
- 📊 **JSON Visualization** - View JSON with syntax highlighting or as an interactive table
- 📝 **Text Files** - Read plain text files with proper formatting
- 🎨 **Modern UI** - Clean, intuitive interface with drag-and-drop support
- 🔌 **Extensible Architecture** - Easily add new file viewers
- 🎯 **Multi-Instance Viewers** - Switch between different visualization modes for the same file type

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Lint and fix
pnpm lint:fix
```

## 📖 Usage

1. Open the application in your browser
2. Drag and drop a file, or click to browse
3. View your file instantly
4. For files with multiple viewers (like JSON), switch between different visualization modes

## 🏗️ Architecture

### Core Concepts

**OmniViewer** is built with extensibility in mind:

- **Viewer Registry**: Central registry mapping file types to available viewers
- **Multi-Instance Support**: Each file type can have multiple viewer implementations
- **Type Detection**: Automatic file type detection based on extension and MIME type
- **Component-Based**: Each viewer is an independent React component

### Project Structure

```
src/
├── components/          # UI Components
│   ├── file-uploader.tsx       # Drag & drop file upload
│   ├── viewer-container.tsx    # Main viewer container
│   └── viewer-selector.tsx     # Viewer mode switcher
├── viewers/            # Viewer Implementations
│   ├── image-viewer.tsx        # Image display
│   ├── text-viewer.tsx         # Plain text
│   ├── json-highlight-viewer.tsx # JSON with syntax highlighting
│   ├── json-table-viewer.tsx    # JSON as table
│   └── index.ts               # Viewer registry
├── types/              # TypeScript Definitions
│   └── viewer.ts              # Core types
├── utils/              # Utilities
│   └── file-detector.ts        # File type detection
├── app.tsx             # Main application
└── main.tsx            # Entry point
```

## 🔧 Adding New Viewers

Adding a new viewer is straightforward:

1. **Create a Viewer Component**:

```typescript
// src/viewers/my-viewer.tsx
import { ViewerProps } from "../types/viewer";

export default function MyViewer({ fileData, onError }: ViewerProps) {
  // Your viewer implementation
  return <div>...</div>;
}
```

2. **Register the Viewer**:

```typescript
// src/viewers/index.ts
import MyViewer from "./my-viewer";

export const viewers: ViewerConfig[] = [
  // ... existing viewers
  {
    id: "my-viewer",
    name: "My Viewer",
    description: "Description of my viewer",
    supportedTypes: ["mytype"],
    component: MyViewer,
  },
];
```

3. **Update File Detection** (if needed):

```typescript
// src/utils/file-detector.ts
// Add detection logic for your file type
```

## 🎨 Supported File Types

Currently supported:

- **Images**: JPG, PNG, GIF, WebP, SVG, BMP
- **JSON**: Syntax highlighting and table views
- **Text**: TXT, MD, LOG, CSV

Coming soon:

- **PDF** documents
- **Word** documents (DOCX)
- **Excel** spreadsheets (XLSX)
- **XML** files
- And more...

## 🌙 Dark Mode

The UI is designed with dark mode support in mind. The structure is ready for theme implementation in future versions.

## 🔮 Future Enhancements

- [ ] Dark mode toggle
- [ ] PDF viewer integration
- [ ] Office document support (Word, Excel, PowerPoint)
- [ ] Browser extension integration
- [ ] URL input support
- [ ] File comparison mode
- [ ] Export/download capabilities
- [ ] Customizable themes
- [ ] Keyboard shortcuts

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **react-dropzone** - File upload
- **react-syntax-highlighter** - Code highlighting
- **mammoth** - Word document parsing (planned)
- **xlsx** - Excel parsing (planned)
- **pdfjs-dist** - PDF rendering (planned)

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new viewer implementations
- Improve existing viewers
- Enhance the UI/UX
- Report bugs or suggest features

## 📝 Development Notes

### Browser Extension Integration

The architecture supports future browser extension integration. The plan is to:

1. Allow opening files from browser context menus
2. Preview files before downloading
3. Enhance browser's native file viewing capabilities

This will be implemented in a future version.

---

Built with ❤️ for better file viewing experience
