import React from 'react'
import isDark from '../App'
import toggleTheme from '../App'

const Header = () => {
  return (
      <div
        className={`flex items-center justify-between px-6 py-3 border-b ${
          isDark ? "bg-black border-gray-800" : "bg-white border-gray-300"
        }`}
      >
        <span
          className={`font-bold text-lg text-black ${isDark ? "text-white" : "text-black"}`}
        >
          CodeBin.
        </span>

        <div className="flex gap-3">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md text-sm"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
  )
}

export default Header;
