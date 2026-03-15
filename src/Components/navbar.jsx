import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-zinc-900 border-b border-zinc-800">
      
      <NavLink to="/" className="font-bold text-2xl text-white">
        CodeBin<span className="text-[#75B06F]">.</span>
      </NavLink>

      <div className="flex items-center gap-1">
        {[
          { to: "/home", label: "Home" },
          { to: "/docs", label: "Docs" },
          { to: "/contact", label: "Contact" },
          { to: "/editor", label: "Editor" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "text-white bg-zinc-800"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      <NavLink
        to="/login"
        className="px-4 py-2 bg-[#75B06F]  hover:bg-[#6d9a62] text-white text-sm font-medium rounded-md transition-colors"
      >
        Login
      </NavLink>

    </nav>
  )
}

export default Navbar