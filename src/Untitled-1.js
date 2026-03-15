      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        {/* Editor */}
        <div className="flex-1 flex justify-center items-center p-6">
          <div
            className={`relative w-full h-full rounded-lg overflow-hidden border shadow-2xl
    ${isDark ? "border-gray-800 bg-black" : "border-gray-300 bg-white"}`}
          >
            {/* Monaco Editor */}
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue="// Start coding"
              theme={isDark ? "vs-dark" : "light"}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                padding: { top: 10, bottom: 60 }, // space for bottom bar
                scrollBeyondLastLine: false,
              }}
            />

            {/* Bottom Control Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/80 backdrop-blur-md border border-gray-800 rounded-lg px-4 py-2 shadow-lg">
              {/* Language selector */}
              <select className="bg-black text-gray-200 text-sm border border-gray-700 rounded-md px-3 py-1 outline-none">
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>Rust</option>
                <option>C++</option>
                <option>Go</option>
                <option>Ruby</option>
                <option>PHP</option>
                <option>C#</option>
              </select>

              {/* Run Button */}
              <button
                onClick={runCode}
                className="px-4 py-1.5 bg-gray-200 text-black text-sm rounded-md hover:bg-white"
              >
                Run Code
              </button>
            </div>
          </div>
        </div>

        {/* Input / Output */}
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