import React, { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Play } from "lucide-react";
import Header from "../Components/header";

const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGES = [
  { label: "JavaScript", value: "javascript", version: "18.15.0", ext: "main.js", default: `// JavaScript\nconsole.log("Hello, World!");` },
  { label: "TypeScript", value: "typescript", version: "5.0.3", ext: "main.ts", default: `// TypeScript\nconsole.log("Hello, World!");` },
  { label: "Python", value: "python", version: "3.10.0", ext: "main.py", default: `# Python\nprint("Hello, World!")` },
  { label: "Java", value: "java", version: "15.0.2", ext: "Main.java", default: `// Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}` },
  { label: "Rust", value: "rust", version: "1.68.2", ext: "main.rs", default: `// Rust\nfn main() {\n    println!("Hello, World!");\n}` },
  { label: "C++", value: "cpp", version: "10.2.0", ext: "main.cpp", default: `// C++\n#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}` },
  { label: "Go", value: "go", version: "1.16.2", ext: "main.go", default: `// Go\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}` },
  { label: "Ruby", value: "ruby", version: "3.0.1", ext: "main.rb", default: `# Ruby\nputs "Hello, World!"` },
  { label: "PHP", value: "php", version: "8.2.3", ext: "main.php", default: `<?php\necho "Hello, World!";\n?>` },
  { label: "C#", value: "csharp", version: "6.12.0", ext: "main.cs", default: `// C#\nusing System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}` },
];

const PISTON_LANG_MAP = { cpp: "c++", csharp: "c#" };

function Editor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  useEffect(() => {
    if (editorRef.current) {
      const lang = LANGUAGES.find(l => l.value === language);
      editorRef.current.setValue(lang?.default || "");
    }
  }, [language]);

  async function runCode() {
    const code = editorRef.current?.getValue();
    if (!code) return;

    setRunning(true);
    setOutput("");
    setActiveTab("output");

    const selected = LANGUAGES.find(l => l.value === language);
    const pistonLang = PISTON_LANG_MAP[language] || language;

    try {
      const res = await fetch(`${PISTON_API}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: pistonLang,
          version: selected.version,
          files: [{ name: selected.ext, content: code }],
          stdin: input,
        }),
      });

      const data = await res.json();
      const run = data?.run;

      if (run?.stdout) setOutput(run.stdout);
      else if (run?.stderr) setOutput(run.stderr);
      else if (run?.output) setOutput(run.output);
      else setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setRunning(false);
    }
  }

  const selectedLang = LANGUAGES.find(l => l.value === language);

  return (
    <>
    <Header />
    <div className="flex flex-1 overflow-hidden p-4 bg-zinc-950">
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">

        {/* Tabs */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-900 px-2">
          {["code", "input", "output"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-xs font-medium uppercase tracking-widest transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-[#75B06F] text-[#C7EABB]-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab === "code" ? selectedLang?.ext || "code.js" : tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden relative">

          <div className={`absolute inset-0 ${activeTab === "code" ? "block" : "hidden"}`}>
            <MonacoEditor
              height="100%"
              language={language}
              defaultValue={LANGUAGES[0].default}
              theme="vs-dark"
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                minimap: { enabled: true },
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                fontFamily: "JetBrains Mono, Fira Code, monospace",
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
              }}
            />
          </div>

          <div className={`absolute inset-0 p-4 ${activeTab === "input" ? "block" : "hidden"}`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input (stdin)..."
              className="w-full h-full resize-none bg-transparent text-sm font-mono text-zinc-200 placeholder:text-zinc-600 outline-none"
            />
          </div>

          <div className={`absolute inset-0 p-4 ${activeTab === "output" ? "block" : "hidden"}`}>
            <pre className="w-full h-full text-sm font-mono text-[#75B06F] overflow-auto whitespace-pre-wrap break-words">
              {running ? "Running..." : output || "Output will appear here..."}
            </pre>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800 bg-zinc-900">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-md px-3 py-1.5 outline-none cursor-pointer"
          >
            {LANGUAGES.map(l => (
              <option key={l.value} value={l.value} className="bg-zinc-900">
                {l.label} ({l.version})
              </option>
            ))}
          </select>

          <button
            onClick={runCode}
            disabled={running} className="flex items-center gap-2 px-5 py-1.5 bg-[#75B06F] hover:bg-[#6d9a62] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-md transition-colors"          >
            <Play className="w-3 h-3" />
            {running ? "Running..." : "RUN"}
          </button>
        </div>

      </div>
    </div>
    </>

  );
}
export default Editor;