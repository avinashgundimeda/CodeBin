import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b bg-zinc-900 border-zinc-800">
      <span className="font-bold text-2xl text-white">CodeRn<span className="text-[#75B06F]">.</span></span>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive
            ? "text-white text-sm font-medium"
            : "text-zinc-500 hover:text-[#75B06F] text-sm"
        }
      >
        Overview
      </NavLink>
    </div>
  )
}

export default Header