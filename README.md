# CodeBin

A lightweight, browser-based code editor built with React and Monaco Editor.

## Features

- Monaco Editor with syntax highlighting
- JavaScript code execution in the browser
- Custom input support
- Real-time output display
- Light / Dark mode toggle
- Clean minimal UI

## Tech Stack

- React
- Vite
- Monaco Editor (`@monaco-editor/react`)
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/avinashgundimeda/codebin.git
cd codebin
npm install
npm run dev
```

## Usage

1. Write JavaScript code in the editor
2. Add input values in the INPUT panel if needed
3. Click **Run Code** to execute
4. Output appears in the OUTPUT panel

## Project Structure

```
codebin/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Limitations

- Currently supports JavaScript only
- Code runs in the browser using `new Function()` — no backend execution

## Roadmap

- [ ] Multi-language support via Judge0 API
- [ ] File save and load
- [ ] Code sharing via URL
- [ ] Keyboard shortcuts
- [ ] Tab support for multiple files

## License

MIT
