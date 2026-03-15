import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import Header from "./Components/header";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  async function runCode() {
    const code = editorRef.current.getValue();

    try {
      const res = await fetch("https://api.onecompiler.com/v1/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify({
          language: language,
          stdin: input,
          files: [
            {
              name: "main",
              content: code,
            },
          ],
        }),
      });

      const data = await res.json();

      if (data?.stdout) {
        setOutput(data.stdout);
      } else if (data?.stderr) {
        setOutput(data.stderr);
      } else {
        setOutput(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col h-screen ${
        isDark ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Header toggleTheme={toggleTheme} />

      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="flex-1 flex justify-center items-center p-6">
          <div
            className={`relative w-full h-full rounded-lg overflow-hidden border shadow-2xl
            ${isDark ? "border-gray-800 bg-black" : "border-gray-300 bg-white"}`}
          >
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue="// Start coding"
              theme={isDark ? "vs-dark" : "light"}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                padding: { top: 10, bottom: 60 },
                scrollBeyondLastLine: false,
              }}
            />

            {/* Bottom Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/80 backdrop-blur-md border border-gray-800 rounded-lg px-4 py-2 shadow-lg">
              
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-black text-gray-200 text-sm border border-gray-700 rounded-md px-3 py-1 outline-none"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="rust">Rust</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="ruby">Ruby</option>
                <option value="php">PHP</option>
                <option value="csharp">C#</option>
              </select>

              <button
                onClick={runCode}
                className="px-4 py-1.5 bg-gray-200 text-black text-sm rounded-md hover:bg-white"
              >
                Run Code
              </button>
            </div>
          </div>
        </div>
        
        
        <div className="w-80 p-4 flex flex-col gap-4">
          {/* Input */}
          <div
            className={`flex-1 flex flex-col rounded-xl overflow-hidden shadow-lg border
            ${isDark ? "bg-black border-gray-800" : "bg-white border-gray-300"}`}
          >
            <div
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b
              ${isDark ? "text-gray-400 border-gray-800" : "text-gray-600 border-gray-300"}`}
            >
              Input
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input here..."
              className={`flex-1 p-4 resize-none text-sm outline-none font-mono
              ${isDark ? "bg-black text-gray-200" : "bg-white text-black"}`}
            />
          </div>

          {/* Output */}
          <div
            className={`flex-1 flex flex-col rounded-xl overflow-hidden shadow-lg border
            ${isDark ? "bg-black border-gray-800" : "bg-white border-gray-300"}`}
          >
            <div
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b
              ${isDark ? "text-gray-400 border-gray-800" : "text-gray-600 border-gray-300"}`}
            >
              Output
            </div>

            <pre
              className={`flex-1 p-4 text-sm font-mono overflow-auto whitespace-pre-wrap
              ${isDark ? "bg-black text-green-400" : "bg-white text-green-600"}`}
            >
              {output || "Output will appear here..."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;