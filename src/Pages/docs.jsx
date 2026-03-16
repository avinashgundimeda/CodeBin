import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

const sidebar = [
  {
    section: 'Getting Started',
    icon: '▶',
    items: [
      { id: 'intro',       label: 'Introduction' },
      { id: 'quickstart',  label: 'Quick Start' },
      { id: 'interface',   label: 'The Interface' },
    ],
  },
  {
    section: 'Editor',
    icon: '✦',
    items: [
      { id: 'languages',   label: 'Supported Languages' },
      { id: 'shortcuts',   label: 'Keyboard Shortcuts' },
      { id: 'themes',      label: 'Editor Themes' },
    ],
  },
  {
    section: 'Sharing',
    icon: '◈',
    items: [
      { id: 'share',       label: 'Share a Snippet' },
      { id: 'embed',       label: 'Embed Code' },
      { id: 'export',      label: 'Export Options' },
    ],
  },
  {
    section: 'API',
    icon: '⬡',
    items: [
      { id: 'api-intro',   label: 'API Overview' },
      { id: 'endpoints',   label: 'Endpoints' },
      { id: 'auth',        label: 'Authentication' },
    ],
  },
]

const content = {
  intro: {
    title: 'Introduction',
    badge: 'Getting Started',
    body: `CodeRn is a browser-based code editor and execution environment. Write code, run it instantly, and share it with a permanent URL — no account required to get started.

Built for developers who want zero friction. No local setup, no dependencies, no waiting. Just open a tab and start coding.`,
    code: null,
    tip: 'CodeRn supports over 25 programming languages with real-time syntax highlighting and intelligent auto-complete.',
  },
  quickstart: {
    title: 'Quick Start',
    badge: 'Getting Started',
    body: `Getting started with CodeRn takes under 30 seconds. Navigate to the Editor, pick your language, write your code, and hit Run. That's it.

To save and share your snippet, click the Share button in the top-right of the editor. You'll get a permanent URL you can send to anyone.`,
    code: `// 1. Open the Editor from the navbar
// 2. Select your language
// 3. Write your code
console.log("Hello from CodeRn!");

// 4. Press Ctrl+Enter to run
// 5. Click Share → copy your link`,
    tip: 'Use Ctrl+Enter (or Cmd+Enter on Mac) anywhere in the editor to run your code without reaching for the mouse.',
  },
  interface: {
    title: 'The Interface',
    badge: 'Getting Started',
    body: `The CodeRn editor is divided into three panels: the code editor on the left, the output terminal at the bottom, and the toolbar at the top.

The toolbar contains your language selector, run button, share controls, and settings. The terminal captures both stdout and stderr, color-coded for clarity.`,
    code: null,
    tip: 'Drag the divider between the editor and terminal to resize panels to your preference.',
  },
  languages: {
    title: 'Supported Languages',
    badge: 'Editor',
    body: `CodeRn supports 25+ languages out of the box. Each language runs in an isolated sandbox with the latest stable runtime version.`,
    code: `const languages = [
  "Python 3.12",  "JavaScript (Node 20)",
  "TypeScript",   "C++17",
  "Java 21",      "Rust 1.78",
  "Go 1.22",      "PHP 8.3",
  "Ruby 3.3",     "Swift 5.10",
  "Kotlin",       "R",
  "Bash",         "SQL",
  // ...and more
];`,
    tip: 'Missing a language? Submit a request via the GitHub repo and it may be added in the next release.',
  },
  shortcuts: {
    title: 'Keyboard Shortcuts',
    badge: 'Editor',
    body: `CodeRn is designed to keep your hands on the keyboard. All critical actions have shortcuts.`,
    table: [
      ['Ctrl + Enter',   'Run code'],
      ['Ctrl + S',       'Save snippet'],
      ['Ctrl + /',       'Toggle comment'],
      ['Ctrl + Shift+F', 'Format code'],
      ['Ctrl + Z',       'Undo'],
      ['Ctrl + K',       'Clear terminal'],
      ['F11',            'Toggle fullscreen'],
    ],
    tip: 'On macOS, replace Ctrl with Cmd for all shortcuts.',
  },
  themes: {
    title: 'Editor Themes',
    badge: 'Editor',
    body: `CodeRn ships with 8 built-in editor themes. The default is a custom dark theme designed for long coding sessions with reduced eye strain.

Themes can be changed from the Settings panel (gear icon) in the top-right of the editor. Your preference is saved to localStorage.`,
    code: `// Available themes
const themes = [
  "CodeRn Dark",   // default
  "CodeRn Light",
  "Monokai",
  "Nord",
  "Dracula",
  "Solarized Dark",
  "GitHub Dark",
  "One Dark Pro",
];`,
    tip: null,
  },
  share: {
    title: 'Share a Snippet',
    badge: 'Sharing',
    body: `Every snippet gets a unique, permanent URL the moment you click Share. The URL encodes your language, code, and settings — no account needed.

Shared snippets are read-only for viewers. They can fork your snippet into their own session with one click.`,
    code: `// Example shared snippet URL
https://CodeRn.dev/s/x7k2mP9q

// Forking via API
POST /api/v1/snippets/x7k2mP9q/fork`,
    tip: 'Snippets are stored permanently. Optionally set an expiry (1h, 24h, 7d, never) before sharing.',
  },
  embed: {
    title: 'Embed Code',
    badge: 'Sharing',
    body: `You can embed any CodeRn snippet as a live, runnable widget on any webpage. The embed is a sandboxed iframe that lets viewers read and run the code without leaving your site.`,
    code: `<!-- Embed a snippet -->
<iframe
  src="https://CodeRn.dev/embed/x7k2mP9q"
  width="100%"
  height="400"
  frameborder="0"
  allow="clipboard-write"
></iframe>`,
    tip: 'Add ?readOnly=true to the embed URL to disable editing for your audience.',
  },
  export: {
    title: 'Export Options',
    badge: 'Sharing',
    body: `CodeRn supports exporting your snippet in multiple formats directly from the editor toolbar.`,
    table: [
      ['Raw file',     'Download as .py, .js, .cpp, etc.'],
      ['Gist',         'Push directly to GitHub Gist'],
      ['PNG image',    'Export code as a styled screenshot'],
      ['PDF',          'Export as formatted PDF document'],
      ['Markdown',     'Wrapped in a fenced code block'],
    ],
    tip: 'The PNG export uses your active editor theme, perfect for sharing on social media.',
  },
  'api-intro': {
    title: 'API Overview',
    badge: 'API',
    body: `The CodeRn REST API lets you create, run, and retrieve snippets programmatically. It's ideal for CI pipelines, bots, or integrating CodeRn into your own tools.

Base URL: https://api.CodeRn.dev/v1`,
    code: `// Run a snippet via API
const res = await fetch("https://api.CodeRn.dev/v1/run", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY",
  },
  body: JSON.stringify({
    language: "python",
    code: "print('Hello from API!')",
  }),
});

const { output } = await res.json();
console.log(output); // Hello from API!`,
    tip: 'Rate limit for free tier: 60 requests/minute. Pro tier: 600 requests/minute.',
  },
  endpoints: {
    title: 'Endpoints',
    badge: 'API',
    body: `All endpoints return JSON. Authentication is via Bearer token in the Authorization header.`,
    table: [
      ['POST /run',            'Execute code and return output'],
      ['POST /snippets',       'Create and save a snippet'],
      ['GET  /snippets/:id',   'Retrieve a saved snippet'],
      ['POST /snippets/:id/fork', 'Fork an existing snippet'],
      ['DELETE /snippets/:id', 'Delete your snippet'],
    ],
    tip: null,
  },
  auth: {
    title: 'Authentication',
    badge: 'API',
    body: `API keys are available to registered users. Generate yours from the Account → API Keys settings page.

Keep your key secret — it grants full access to your account via the API.`,
    code: `// Include in every request
headers: {
  "Authorization": "Bearer cb_live_xxxxxxxxxxxxxxxxxxxx"
}

// Key format
// cb_live_ → production key
// cb_test_ → sandbox key (no rate limits, no persistence)`,
    tip: 'Rotate your key immediately if you suspect it has been compromised. Old keys are invalidated instantly.',
  },
}

const Docs = () => {
  const [active, setActive] = useState('intro')
  const [openSections, setOpenSections] = useState({ 'Getting Started': true, Editor: true, Sharing: true, API: true })
  const [copied, setCopied] = useState(false)
  const contentRef = useRef(null)

  const doc = content[active]

  const toggleSection = (sec) =>
    setOpenSections(v => ({ ...v, [sec]: !v[sec] }))

  const handleNav = (id) => {
    setActive(id)
    if (contentRef.current) contentRef.current.scrollTop = 0
  }

  const copyCode = () => {
    if (doc.code) {
      navigator.clipboard.writeText(doc.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --green: #75B06F;
          --green-dim: rgba(117,176,111,0.12);
          --green-glow: rgba(117,176,111,0.3);
          --black: #000000;
          --g900: #080808;
          --g800: #111111;
          --g700: #1a1a1a;
          --g600: #222222;
          --g400: #444444;
          --g300: #777777;
          --g200: #aaaaaa;
          --white: #ffffff;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .docs-root {
          background: var(--black);
          color: var(--white);
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          padding-top: 64px;
        }

        /* ─── LAYOUT ─── */
        .docs-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ─── SIDEBAR ─── */
        .docs-sidebar {
          border-right: 1px solid var(--g700);
          padding: 32px 0;
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--g600) transparent;
          animation: sidebarIn 0.5s ease both;
        }

        @keyframes sidebarIn {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .docs-sidebar::-webkit-scrollbar { width: 4px; }
        .docs-sidebar::-webkit-scrollbar-thumb { background: var(--g600); border-radius: 2px; }

        .docs-sidebar-top {
          padding: 0 20px 24px;
          border-bottom: 1px solid var(--g700);
          margin-bottom: 16px;
        }

        .docs-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--g800);
          border: 1px solid var(--g600);
          border-radius: 4px;
          padding: 8px 12px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--g300);
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .docs-search:hover { border-color: var(--green); }

        .docs-sec {
          margin-bottom: 4px;
        }

        .docs-sec-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 20px;
          cursor: pointer;
          user-select: none;
        }

        .docs-sec-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          color: var(--g300);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: 'Space Mono', monospace;
        }

        .docs-sec-icon {
          color: var(--green);
          font-size: 10px;
        }

        .docs-sec-arrow {
          font-size: 10px;
          color: var(--g400);
          transition: transform 0.2s;
        }

        .docs-sec-arrow.open { transform: rotate(90deg); }

        .docs-sec-items {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
        }

        .docs-sec-items.open { max-height: 300px; }

        .docs-nav-item {
          display: block;
          padding: 9px 20px 9px 38px;
          font-size: 13px;
          font-weight: 600;
          color: var(--g300);
          cursor: pointer;
          border-left: 2px solid transparent;
          transition: all 0.15s ease;
          position: relative;
        }

        .docs-nav-item:hover {
          color: var(--white);
          background: var(--g800);
        }

        .docs-nav-item.active {
          color: var(--green);
          border-left-color: var(--green);
          background: var(--green-dim);
        }

        /* ─── CONTENT ─── */
        .docs-content {
          padding: 48px 64px;
          overflow-y: visible;
          scrollbar-width: thin;
          scrollbar-color: var(--g600) transparent;
        }

        .docs-content::-webkit-scrollbar { width: 4px; }
        .docs-content::-webkit-scrollbar-thumb { background: var(--g600); border-radius: 2px; }

        .docs-article {
          max-width: 720px;
          animation: articleIn 0.35s ease both;
        }

        @keyframes articleIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .docs-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid var(--green);
          border-radius: 20px;
          padding: 4px 12px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--green);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .docs-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .docs-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--green) 0%, transparent 60%);
          margin-bottom: 28px;
          opacity: 0.4;
        }

        .docs-body {
          font-size: 15px;
          color: var(--g200);
          line-height: 1.8;
          font-weight: 400;
          margin-bottom: 28px;
          white-space: pre-line;
        }

        /* Code Block */
        .docs-code-wrap {
          background: var(--g800);
          border: 1px solid var(--g700);
          border-radius: 6px;
          margin-bottom: 28px;
          overflow: hidden;
        }

        .docs-code-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: var(--g700);
          border-bottom: 1px solid var(--g600);
        }

        .docs-code-dots {
          display: flex;
          gap: 6px;
        }

        .docs-code-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }

        .docs-code-copy {
          background: none;
          border: 1px solid var(--g600);
          border-radius: 3px;
          padding: 4px 10px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--g300);
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.5px;
        }

        .docs-code-copy:hover, .docs-code-copy.copied {
          border-color: var(--green);
          color: var(--green);
        }

        .docs-code-body {
          padding: 20px 20px;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          line-height: 1.8;
          color: #b8ddb5;
          overflow-x: auto;
          white-space: pre;
        }

        /* Table */
        .docs-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 28px;
          font-size: 14px;
        }

        .docs-table th {
          background: var(--g800);
          color: var(--green);
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid var(--g600);
        }

        .docs-table td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--g700);
          color: var(--g200);
          font-family: 'Space Mono', monospace;
          font-size: 12px;
        }

        .docs-table tr:hover td {
          background: var(--g800);
          color: var(--white);
        }

        .docs-table td:first-child {
          color: var(--green);
        }

        /* Tip */
        .docs-tip {
          display: flex;
          gap: 12px;
          background: var(--green-dim);
          border: 1px solid rgba(117,176,111,0.3);
          border-radius: 6px;
          padding: 16px 20px;
          margin-bottom: 28px;
        }

        .docs-tip-icon {
          font-size: 16px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .docs-tip-text {
          font-size: 13px;
          color: var(--g200);
          line-height: 1.65;
          font-weight: 400;
        }

        /* Bottom Nav */
        .docs-bottom-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--g700);
          gap: 16px;
        }

        .docs-nav-btn {
          background: var(--g800);
          border: 1px solid var(--g600);
          border-radius: 4px;
          padding: 14px 20px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
          min-width: 160px;
          color: var(--white);
        }

        .docs-nav-btn:hover {
          border-color: var(--green);
          background: var(--green-dim);
        }

        .docs-nav-btn-dir {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--g300);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .docs-nav-btn-label {
          font-size: 14px;
          font-weight: 700;
          color: var(--white);
        }

        .docs-nav-btn.next { text-align: right; }

        /* Responsive */
        @media (max-width: 768px) {
          .docs-layout { grid-template-columns: 1fr; }
          .docs-sidebar { display: none; }
          .docs-content { padding: 32px 24px; }
        }
      `}</style>

      <div className="docs-root">
        <Navbar />

        <div className="docs-layout">
          {/* ── SIDEBAR ── */}
          <aside className="docs-sidebar">
            <div className="docs-sidebar-top">
              <div className="docs-search">
                <span>⌕</span>
                Search docs...
                <span style={{ marginLeft: 'auto', fontSize: 10, background: 'var(--g700)', padding: '2px 6px', borderRadius: 3 }}>⌘K</span>
              </div>
            </div>

            {sidebar.map(({ section, icon, items }) => (
              <div className="docs-sec" key={section}>
                <div className="docs-sec-header" onClick={() => toggleSection(section)}>
                  <span className="docs-sec-label">
                    <span className="docs-sec-icon">{icon}</span>
                    {section}
                  </span>
                  <span className={`docs-sec-arrow ${openSections[section] ? 'open' : ''}`}>▶</span>
                </div>
                <div className={`docs-sec-items ${openSections[section] ? 'open' : ''}`}>
                  {items.map(({ id, label }) => (
                    <div
                      key={id}
                      className={`docs-nav-item ${active === id ? 'active' : ''}`}
                      onClick={() => handleNav(id)}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* ── CONTENT ── */}
          <main className="docs-content" ref={contentRef}>
            {doc && (
              <article className="docs-article" key={active}>
                <div className="docs-badge">// {doc.badge}</div>
                <h1 className="docs-title">{doc.title}</h1>
                <div className="docs-divider" />

                <p className="docs-body">{doc.body}</p>

                {doc.code && (
                  <div className="docs-code-wrap">
                    <div className="docs-code-bar">
                      <div className="docs-code-dots">
                        <div className="docs-code-dot" style={{ background: '#ff5f57' }} />
                        <div className="docs-code-dot" style={{ background: '#febc2e' }} />
                        <div className="docs-code-dot" style={{ background: '#75B06F' }} />
                      </div>
                      <button
                        className={`docs-code-copy ${copied ? 'copied' : ''}`}
                        onClick={copyCode}
                      >
                        {copied ? 'COPIED ✓' : 'COPY'}
                      </button>
                    </div>
                    <div className="docs-code-body">{doc.code}</div>
                  </div>
                )}

                {doc.table && (
                  <table className="docs-table">
                    <thead>
                      <tr>
                        <th>{active === 'shortcuts' ? 'Shortcut' : active === 'export' ? 'Format' : 'Method / Route'}</th>
                        <th>{active === 'shortcuts' ? 'Action' : active === 'export' ? 'Description' : 'Description'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doc.table.map(([a, b], i) => (
                        <tr key={i}>
                          <td>{a}</td>
                          <td style={{ color: 'var(--g200)', fontFamily: 'Syne, sans-serif', fontSize: 13 }}>{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {doc.tip && (
                  <div className="docs-tip">
                    <span className="docs-tip-icon">💡</span>
                    <p className="docs-tip-text">{doc.tip}</p>
                  </div>
                )}

                {/* Bottom Prev/Next */}
                <BottomNav active={active} sidebar={sidebar} onNav={handleNav} />
              </article>
            )}
          </main>
        </div>
                      <Footer />
      </div>
    </>
  )
}

const BottomNav = ({ active, sidebar, onNav }) => {
  const allItems = sidebar.flatMap(s => s.items)
  const idx = allItems.findIndex(i => i.id === active)
  const prev = allItems[idx - 1]
  const next = allItems[idx + 1]

  return (
    <div className="docs-bottom-nav">
      {prev ? (
        <button className="docs-nav-btn" onClick={() => onNav(prev.id)}>
          <div className="docs-nav-btn-dir">← Previous</div>
          <div className="docs-nav-btn-label">{prev.label}</div>
        </button>
      ) : <div />}
      {next ? (
        <button className="docs-nav-btn next" onClick={() => onNav(next.id)}>
          <div className="docs-nav-btn-dir">Next →</div>
          <div className="docs-nav-btn-label">{next.label}</div>
        </button>
      ) : <div />}
    </div>

  )
}

export default Docs