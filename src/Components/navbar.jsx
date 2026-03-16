import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/home',    label: 'Home' },
  { to: '/docs',    label: 'Docs' },
  { to: '/contact', label: 'Contact' },
  { to: '/editor',  label: 'Editor' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@600;700;800&display=swap');

        .cb-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .cb-nav.scrolled {
          background: rgba(0, 0, 0, 0.88);
          border-color: rgba(117, 176, 111, 0.18);
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .cb-nav.top {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* Brand */
        .cb-brand {
          font-family: 'Space Mono', monospace;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          text-decoration: none;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 0;
          position: relative;
          animation: navFadeIn 0.6s ease both 0s;
        }

        .cb-brand-dot {
          color: #75B06F;
          font-size: 28px;
          line-height: 1;
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .cb-brand:hover .cb-brand-dot {
          transform: rotate(90deg) scale(1.3);
        }

        .cb-brand-cursor {
          display: inline-block;
          width: 2px;
          height: 18px;
          background: #75B06F;
          margin-left: 2px;
          animation: cursorBlink 1s step-end infinite;
          vertical-align: middle;
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* Nav Links */
        .cb-links {
          display: flex;
          align-items: center;
          gap: 4px;
          animation: navFadeIn 0.6s ease both 0.2s;
        }

        .cb-link {
          position: relative;
          padding: 7px 16px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #666666;
          text-decoration: none;
          border-radius: 4px;
          transition: color 0.2s ease, background 0.2s ease;
          letter-spacing: 0.2px;
        }

        .cb-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          right: 50%;
          height: 2px;
          background: #75B06F;
          border-radius: 1px;
          transition: left 0.25s ease, right 0.25s ease;
        }

        .cb-link:hover {
          color: #ffffff;
          background: rgba(117, 176, 111, 0.08);
        }

        .cb-link:hover::after {
          left: 16px;
          right: 16px;
        }

        .cb-link.active {
          color: #75B06F;
          background: rgba(117, 176, 111, 0.1);
        }

        .cb-link.active::after {
          left: 16px;
          right: 16px;
          background: #75B06F;
        }

        /* Login Button */
        .cb-login {
          position: relative;
          padding: 9px 22px;
          background: #75B06F;
          color: #000000;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          border-radius: 4px;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          overflow: hidden;
          animation: navFadeIn 0.6s ease both 0.4s;
        }

        .cb-login::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: rgba(255,255,255,0.18);
          transform: skewX(-15deg);
          transition: left 0.3s ease;
        }

        .cb-login:hover::before { left: 150%; }

        .cb-login:hover {
          background: #8ac984;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(117, 176, 111, 0.4);
        }

        /* Hamburger */
        .cb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
        }

        .cb-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #ffffff;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .cb-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .cb-hamburger.open span:nth-child(2) { opacity: 0; }
        .cb-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile Menu */
        .cb-mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: rgba(0, 0, 0, 0.96);
          border-bottom: 1px solid rgba(117, 176, 111, 0.2);
          backdrop-filter: blur(12px);
          z-index: 99;
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transform: translateY(-110%);
          opacity: 0;
          transition: transform 0.35s ease, opacity 0.35s ease;
          pointer-events: none;
        }

        .cb-mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        .cb-mobile-link {
          padding: 12px 16px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #888888;
          text-decoration: none;
          border-radius: 4px;
          border-left: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .cb-mobile-link:hover,
        .cb-mobile-link.active {
          color: #75B06F;
          background: rgba(117, 176, 111, 0.08);
          border-left-color: #75B06F;
        }

        .cb-mobile-login {
          margin-top: 12px;
          padding: 13px 16px;
          background: #75B06F;
          color: #000;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border-radius: 4px;
          text-decoration: none;
          text-align: center;
          transition: background 0.2s ease;
        }

        .cb-mobile-login:hover { background: #8ac984; }

        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .cb-links,
          .cb-login { display: none; }
          .cb-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`cb-nav ${scrolled ? 'scrolled' : 'top'}`}>
        {/* Brand */}
        <NavLink to="/" className="cb-brand">
          CodeRn<span className="cb-brand-dot">.</span>
          <span className="cb-brand-cursor" />
        </NavLink>

        {/* Desktop Links */}
        <div className="cb-links">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `cb-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Login */}
        <NavLink to="/login" className="cb-login">
          Login →
        </NavLink>

        {/* Hamburger */}
        <button
          className={`cb-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`cb-mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `cb-mobile-link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <NavLink to="/login" className="cb-mobile-login" onClick={() => setMenuOpen(false)}>
          Login →
        </NavLink>
      </div>
    </>
  )
}

export default Navbar