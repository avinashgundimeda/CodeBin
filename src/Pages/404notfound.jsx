import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Components/navbar'

const glitchChars = '!<>-_\\/[]{}—=+*^?#'

function useGlitch(text, active) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!active) { setDisplay(text); return }
    let frame = 0
    const total = 18
    const interval = setInterval(() => {
      frame++
      setDisplay(
        text.split('').map((char, i) => {
          if (frame / total > i / text.length) return char
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        }).join('')
      )
      if (frame >= total) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [active, text])

  return display
}

const NotFound = () => {
  const [glitch, setGlitch] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 80)
    const loop = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 900)
    }, 4000)
    return () => clearInterval(loop)
  }, [])

  const title = useGlitch('PAGE_NOT_FOUND', glitch)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --green: #75B06F;
          --green-dim: rgba(117,176,111,0.1);
          --green-border: rgba(117,176,111,0.25);
          --black: #000000;
          --g900: #060606;
          --g800: #0f0f0f;
          --g700: #1a1a1a;
          --g600: #222222;
          --g400: #444444;
          --g300: #666666;
          --g200: #999999;
          --white: #ffffff;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nf-root {
          background: var(--black);
          color: var(--white);
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          padding-top: 64px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ─── GRID BG ─── */
        .nf-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(117,176,111,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(117,176,111,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 0;
          pointer-events: none;
        }

        /* ─── SCANLINES ─── */
        .nf-scanlines {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 4px
          );
          z-index: 0;
          pointer-events: none;
        }

        /* ─── GLOW ─── */
        .nf-glow {
          position: fixed;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(117,176,111,0.07) 0%, transparent 65%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
          animation: glowBreath 6s ease-in-out infinite;
        }

        @keyframes glowBreath {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.1); }
        }

        /* ─── MAIN CONTENT ─── */
        .nf-body {
          flex: 1;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          text-align: center;
        }

        /* ─── 404 NUMBER ─── */
        .nf-404 {
          font-family: 'Space Mono', monospace;
          font-size: clamp(120px, 20vw, 220px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -8px;
          color: transparent;
          -webkit-text-stroke: 2px rgba(117,176,111,0.3);
          position: relative;
          user-select: none;
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .nf-404.in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .nf-404::before {
          content: '404';
          position: absolute;
          inset: 0;
          color: var(--green);
          -webkit-text-stroke: 0;
          opacity: 0.08;
          filter: blur(12px);
        }

        /* Glitch layers */
        .nf-404-wrap {
          position: relative;
          display: inline-block;
        }

        .nf-404-wrap.glitching .nf-404 {
          -webkit-text-stroke-color: var(--green);
          animation: glitchShake 0.1s ease-in-out infinite;
        }

        @keyframes glitchShake {
          0%   { transform: translate(0, 0); }
          20%  { transform: translate(-3px, 1px); }
          40%  { transform: translate(3px, -1px); }
          60%  { transform: translate(-2px, 2px); }
          80%  { transform: translate(2px, -2px); }
          100% { transform: translate(0, 0); }
        }

        /* ─── ERROR CODE ─── */
        .nf-code {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--green);
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
          min-height: 16px;
        }

        .nf-code.in { opacity: 1; transform: translateY(0); }

        /* ─── TITLE ─── */
        .nf-title {
          font-size: clamp(22px, 4vw, 38px);
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 14px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s;
        }

        .nf-title.in { opacity: 1; transform: translateY(0); }

        /* ─── DESC ─── */
        .nf-desc {
          font-size: 15px;
          color: var(--g300);
          max-width: 440px;
          line-height: 1.75;
          font-weight: 400;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s;
        }

        .nf-desc.in { opacity: 1; transform: translateY(0); }

        /* ─── TERMINAL BLOCK ─── */
        .nf-terminal {
          background: var(--g800);
          border: 1px solid var(--g700);
          border-radius: 6px;
          overflow: hidden;
          width: 100%;
          max-width: 480px;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s;
        }

        .nf-terminal.in { opacity: 1; transform: translateY(0); }

        .nf-term-bar {
          background: var(--g700);
          padding: 9px 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nf-term-dot { width: 10px; height: 10px; border-radius: 50%; }

        .nf-term-title {
          margin-left: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--g400);
        }

        .nf-term-body {
          padding: 16px 18px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          line-height: 1.8;
          text-align: left;
        }

        .nf-term-line { display: flex; gap: 10px; }
        .nf-term-prompt { color: var(--green); flex-shrink: 0; }
        .nf-term-cmd    { color: var(--g200); }
        .nf-term-err    { color: rgba(255,100,100,0.85); }
        .nf-term-hint   { color: var(--g400); }
        .nf-term-cursor {
          display: inline-block;
          width: 8px; height: 14px;
          background: var(--green);
          vertical-align: middle;
          margin-left: 2px;
          animation: cursorBlink 1s step-end infinite;
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ─── ACTIONS ─── */
        .nf-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s;
        }

        .nf-actions.in { opacity: 1; transform: translateY(0); }

        .nf-btn-primary {
          background: var(--green);
          color: var(--black);
          border: none;
          padding: 13px 28px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.3px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .nf-btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: rgba(255,255,255,0.15);
          transform: skewX(-15deg);
          transition: left 0.3s;
        }

        .nf-btn-primary:hover::before { left: 150%; }
        .nf-btn-primary:hover {
          background: #8ac984;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(117,176,111,0.35);
        }

        .nf-btn-ghost {
          background: transparent;
          color: var(--g200);
          border: 1px solid var(--g600);
          padding: 13px 28px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .nf-btn-ghost:hover {
          border-color: var(--green);
          color: var(--green);
          transform: translateY(-2px);
        }

        /* ─── BOTTOM LINK ROW ─── */
        .nf-links {
          display: flex;
          gap: 24px;
          margin-top: 48px;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.6s ease 0.75s;
        }

        .nf-links.in { opacity: 1; }

        .nf-link {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--g400);
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }

        .nf-link:hover { color: var(--green); }

        /* ─── DECO NUMBER ─── */
        .nf-deco {
          position: fixed;
          bottom: -30px;
          right: -20px;
          font-family: 'Space Mono', monospace;
          font-size: 260px;
          font-weight: 700;
          color: rgba(117,176,111,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          letter-spacing: -12px;
        }
      `}</style>

      <div className="nf-root">
        <div className="nf-grid" />
        <div className="nf-scanlines" />
        <div className="nf-glow" />
        <div className="nf-deco">404</div>

        <Navbar />

        <div className="nf-body">

          {/* 404 */}
          <div className={`nf-404-wrap ${glitch ? 'glitching' : ''}`}>
            <div className={`nf-404 ${mounted ? 'in' : ''}`}>404</div>
          </div>

          {/* Glitch title */}
          <div className={`nf-code ${mounted ? 'in' : ''}`}>
            {title}
          </div>

          <h1 className={`nf-title ${mounted ? 'in' : ''}`}>
            You've gone too far, Coder.
          </h1>

          <p className={`nf-desc ${mounted ? 'in' : ''}`}>
            This route doesn't exist. The page you're looking for was never here — or got deleted somewhere between your last commit and now.
          </p>

          {/* Terminal block */}
          <div className={`nf-terminal ${mounted ? 'in' : ''}`}>
            <div className="nf-term-bar">
              <div className="nf-term-dot" style={{ background: '#ff5f57' }} />
              <div className="nf-term-dot" style={{ background: '#febc2e' }} />
              <div className="nf-term-dot" style={{ background: '#75B06F' }} />
              <span className="nf-term-title">bash — CodeRn</span>
            </div>
            <div className="nf-term-body">
              <div className="nf-term-line">
                <span className="nf-term-prompt">$</span>
                <span className="nf-term-cmd">GET {window?.location?.pathname || '/unknown'}</span>
              </div>
              <div className="nf-term-line">
                <span className="nf-term-prompt" style={{ color: 'rgba(255,100,100,0.8)' }}>✖</span>
                <span className="nf-term-err">404 Not Found — route does not exist</span>
              </div>
              <div className="nf-term-line">
                <span className="nf-term-prompt" style={{ color: 'var(--g400)' }}>#</span>
                <span className="nf-term-hint">try navigating back to a known route</span>
              </div>
              <div className="nf-term-line" style={{ marginTop: 4 }}>
                <span className="nf-term-prompt">$</span>
                <span className="nf-term-cmd"><span className="nf-term-cursor" /></span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={`nf-actions ${mounted ? 'in' : ''}`}>
            <NavLink to="/home" className="nf-btn-primary">
              ← Back to Home
            </NavLink>
            <NavLink to="/editor" className="nf-btn-ghost">
              Open Editor
            </NavLink>
          </div>

          {/* Quick links */}
          <div className={`nf-links ${mounted ? 'in' : ''}`}>
            <NavLink to="/docs"    className="nf-link">Docs</NavLink>
            <NavLink to="/contact" className="nf-link">Contact</NavLink>
            <NavLink to="/login"   className="nf-link">Login</NavLink>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nf-link">GitHub</a>
          </div>

        </div>
      </div>
    </>
  )
}

export default NotFound