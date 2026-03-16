import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'
const features = [
  {
    icon: '⚡',
    title: 'Instant Execution',
    desc: 'Run code in milliseconds. No setup, no installs. Just write and go.',
  },
  {
    icon: '🌐',
    title: 'Multi-Language',
    desc: 'Python, JavaScript, C++, Java, Go and 20+ languages supported out of the box.',
  },
  {
    icon: '🔗',
    title: 'Share Snippets',
    desc: 'One link. Anyone can view, fork, and run your code instantly.',
  },
  {
    icon: '🛡️',
    title: 'Sandboxed & Safe',
    desc: 'Every execution runs in an isolated environment. Safe by design.',
  },
  {
    icon: '🎨',
    title: 'Syntax Highlighting',
    desc: 'Beautiful, readable code with full syntax coloring for every language.',
  },
  {
    icon: '📦',
    title: 'Save & Organize',
    desc: 'Keep your snippets organized. Access them anywhere, anytime.',
  },
]

const languages = ['Python', 'JavaScript', 'C++', 'Java', 'Rust', 'Go', 'TypeScript', 'PHP', 'Ruby', 'Swift']

const codeSnippet = `# CodeRn — write, run, share
def greet(name: str) -> str:
    return f"Hello, {name}! 🚀"

languages = ["Python", "JS", "C++", "Go"]
for lang in languages:
    print(greet(lang))`

const Home = () => {
  const [typed, setTyped] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [counters, setCounters] = useState({ snippets: 0, users: 0, langs: 0 })
  const statsRef = useRef(null)
  const hasAnimated = useRef(false)

  // Typing animation
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= codeSnippet.length) {
        setTyped(codeSnippet.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 22)
    return () => clearInterval(interval)
  }, [])

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 500)
    return () => clearInterval(blink)
  }, [])

  // Counter animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const targets = { snippets: 120000, users: 45000, langs: 25 }
          const duration = 1800
          const steps = 60
          const stepTime = duration / steps
          let step = 0
          const timer = setInterval(() => {
            step++
            const progress = step / steps
            const ease = 1 - Math.pow(1 - progress, 3)
            setCounters({
              snippets: Math.floor(targets.snippets * ease),
              users: Math.floor(targets.users * ease),
              langs: Math.floor(targets.langs * ease),
            })
            if (step >= steps) clearInterval(timer)
          }, stepTime)
        }
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --green: #75B06F;
          --green-dim: rgba(117,176,111,0.15);
          --green-glow: rgba(117,176,111,0.35);
          --black: #000000;
          --gray-900: #0a0a0a;
          --gray-800: #111111;
          --gray-700: #1a1a1a;
          --gray-600: #222222;
          --gray-400: #555555;
          --gray-300: #888888;
          --white: #ffffff;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--black);
          color: var(--white);
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
        }

        .cb-home {
          background: var(--black);
          min-height: 100vh;
        }

        /* ─── HERO ─── */
        .cb-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 100px 24px 60px;
        }

        .cb-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(117,176,111,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(117,176,111,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 0;
          animation: gridDrift 20s linear infinite;
        }

        @keyframes gridDrift {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(48px, 48px); }
        }

        .cb-hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(117,176,111,0.18) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.1); }
        }

        .cb-hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          max-width: 1200px;
          width: 100%;
          align-items: center;
        }

        .cb-hero-left {
          animation: fadeSlideLeft 0.9s ease both;
        }

        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .cb-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--green);
          border-radius: 20px;
          padding: 6px 14px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--green);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 24px;
          animation: fadeIn 1s ease both 0.2s;
        }

        .cb-badge-dot {
          width: 6px;
          height: 6px;
          background: var(--green);
          border-radius: 50%;
          animation: blink 1.2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }

        .cb-hero-title {
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -2px;
          margin-bottom: 20px;
          animation: fadeIn 1s ease both 0.3s;
        }

        .cb-hero-title .accent {
          color: var(--green);
          position: relative;
          display: inline-block;
        }

        .cb-hero-title .accent::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--green);
          animation: underlineGrow 1s ease both 1s;
          transform-origin: left;
        }

        @keyframes underlineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .cb-hero-sub {
          font-size: 17px;
          color: var(--gray-300);
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 480px;
          animation: fadeIn 1s ease both 0.5s;
          font-weight: 400;
        }

        .cb-hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeIn 1s ease both 0.7s;
        }

        .cb-btn-primary {
          background: var(--green);
          color: var(--black);
          border: none;
          padding: 14px 32px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .cb-btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: rgba(255,255,255,0.15);
          transform: skewX(-15deg);
          transition: left 0.3s ease;
        }

        .cb-btn-primary:hover::before { left: 150%; }
        .cb-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--green-glow); }

        .cb-btn-ghost {
          background: transparent;
          color: var(--white);
          border: 1px solid var(--gray-600);
          padding: 14px 32px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cb-btn-ghost:hover {
          border-color: var(--green);
          color: var(--green);
          transform: translateY(-2px);
        }

        /* Code Window */
        .cb-hero-right {
          animation: fadeSlideRight 0.9s ease both 0.4s;
        }

        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .cb-code-window {
          background: var(--gray-800);
          border: 1px solid var(--gray-600);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(117,176,111,0.12), 0 24px 64px rgba(0,0,0,0.6);
        }

        .cb-code-titlebar {
          background: var(--gray-700);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--gray-600);
        }

        .cb-dot { width: 12px; height: 12px; border-radius: 50%; }
        .cb-dot-r { background: #ff5f57; }
        .cb-dot-y { background: #febc2e; }
        .cb-dot-g { background: var(--green); }

        .cb-code-filename {
          margin-left: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--gray-300);
        }

        .cb-code-body {
          padding: 24px;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          line-height: 1.8;
          color: #c8e6c5;
          min-height: 200px;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .cb-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--green);
          vertical-align: text-bottom;
          margin-left: 1px;
          transition: opacity 0.1s;
        }

        /* ─── LANGS TICKER ─── */
        .cb-langs-strip {
          background: var(--gray-900);
          border-top: 1px solid var(--gray-700);
          border-bottom: 1px solid var(--gray-700);
          padding: 16px 0;
          overflow: hidden;
          position: relative;
        }

        .cb-langs-strip::before,
        .cb-langs-strip::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
        }
        .cb-langs-strip::before { left: 0;  background: linear-gradient(90deg, var(--gray-900), transparent); }
        .cb-langs-strip::after  { right: 0; background: linear-gradient(-90deg, var(--gray-900), transparent); }

        .cb-langs-track {
          display: flex;
          gap: 0;
          animation: ticker 18s linear infinite;
          width: max-content;
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .cb-lang-tag {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--green);
          letter-spacing: 1px;
          padding: 0 32px;
          border-right: 1px solid var(--gray-700);
          white-space: nowrap;
          text-transform: uppercase;
        }

        /* ─── STATS ─── */
        .cb-stats {
          background: var(--black);
          padding: 80px 24px;
          display: flex;
          justify-content: center;
        }

        .cb-stats-inner {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          max-width: 1300px;
          width: 100%;
          background: var(--gray-700);
          border: 1px solid var(--gray-700);
          border-radius: 8px;
          overflow: hidden;
        }

        .cb-stat {
          background: var(--gray-900);
          padding: 38px 26px;
          text-align: center;
        }

        .cb-stat-num {
          font-size: 52px;
          font-weight: 800;
          color: var(--green);
          line-height: 1;
          letter-spacing: -2px;
          margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
        }

        .cb-stat-label {
          font-size: 13px;
          color: var(--gray-300);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: 'Space Mono', monospace;
        }

        /* ─── FEATURES ─── */
        .cb-features {
          padding: 80px 24px 100px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cb-section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .cb-section-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--green);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .cb-section-title {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.1;
        }

        .cb-feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: var(--gray-700);
          border: 1px solid var(--gray-700);
          border-radius: 8px;
          overflow: hidden;
        }

        .cb-feature-card {
          background: var(--gray-900);
          padding: 40px 32px;
          transition: background 0.2s ease;
          cursor: default;
        }

        .cb-feature-card:hover {
          background: var(--gray-800);
        }

        .cb-feature-card:hover .cb-feature-icon {
          transform: scale(1.15) rotate(-5deg);
        }

        .cb-feature-icon {
          font-size: 32px;
          margin-bottom: 20px;
          display: block;
          transition: transform 0.3s ease;
        }

        .cb-feature-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }

        .cb-feature-desc {
          font-size: 14px;
          color: var(--gray-300);
          line-height: 1.65;
          font-weight: 400;
        }

        /* ─── CTA BANNER ─── */
        .cb-cta-banner {
          margin: 0 24px 80px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          background: var(--green-dim);
          border: 1px solid var(--green);
          border-radius: 8px;
          padding: 64px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          position: relative;
          overflow: hidden;
          margin-bottom: 80px;
        }

        .cb-cta-banner::before {
          content: '</>';
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Space Mono', monospace;
          font-size: 120px;
          font-weight: 700;
          color: rgba(117,176,111,0.06);
          pointer-events: none;
          line-height: 1;
        }

        .cb-cta-banner-text h2 {
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }

        .cb-cta-banner-text p {
          color: var(--gray-300);
          font-size: 15px;
        }

        /* ─── FOOTER ─── */
        .cb-footer {
          border-top: 1px solid var(--gray-700);
          padding: 32px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cb-footer-brand {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: var(--green);
          font-weight: 700;
        }

        .cb-footer-links {
          display: flex;
          gap: 24px;
        }

        .cb-footer-links a {
          font-size: 13px;
          color: var(--gray-400);
          text-decoration: none;
          transition: color 0.2s;
          font-family: 'Space Mono', monospace;
        }

        .cb-footer-links a:hover { color: var(--green); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 900px) {
          .cb-hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .cb-feature-grid { grid-template-columns: 1fr 1fr; }
          .cb-stats-inner { grid-template-columns: 1fr; }
          .cb-cta-banner { flex-direction: column; text-align: center; }
        }

        @media (max-width: 580px) {
          .cb-feature-grid { grid-template-columns: 1fr; }
          .cb-footer { flex-direction: column; gap: 16px; text-align: center; }
        }
      `}</style>

      <div className="cb-home">
        <Navbar />

        {/* ── HERO ── */}
        <section className="cb-hero">
          <div className="cb-grid-bg" />
          <div className="cb-hero-glow" />
          <div className="cb-hero-inner">
            <div className="cb-hero-left">
              <div className="cb-badge">
                <span className="cb-badge-dot" />
                Now live — v2.0
              </div>
              <h1 className="cb-hero-title">
                Code. Run.<br />
                <span className="accent">Share.</span>
              </h1>
              <p className="cb-hero-sub">
                CodeRn is your browser-based code editor and compiler. Write in any language, execute instantly, and share your work with a single link — no setup required.
              </p>
              <div className="cb-hero-ctas">
                <button className="cb-btn-primary" onClick={() => window.location.href = '/editor'}>
                  Start Coding →
                </button>
                <button className="cb-btn-ghost " onClick={() => window.location.href = '/docs'}>
                  Explore Docs →
                </button>
              </div>
            </div>

            <div className="cb-hero-right">
              <div className="cb-code-window">
                <div className="cb-code-titlebar">
                  <span className="cb-dot cb-dot-r" />
                  <span className="cb-dot cb-dot-y" />
                  <span className="cb-dot cb-dot-g" />
                  <span className="cb-code-filename">main.py</span>
                </div>
                <div className="cb-code-body">
                  {typed}
                  <span className="cb-cursor" style={{ opacity: cursorVisible ? 1 : 0 }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LANGUAGE TICKER ── */}
        <div className="cb-langs-strip">
          <div className="cb-langs-track">
            {[...languages, ...languages].map((lang, i) => (
              <span key={i} className="cb-lang-tag">{lang}</span>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <section className="cb-stats" ref={statsRef}>
          <div className="cb-stats-inner">
            <div className="cb-stat">
              <div className="cb-stat-num">{counters.snippets.toLocaleString()}+</div>
              <div className="cb-stat-label">Snippets Shared</div>
            </div>
            <div className="cb-stat">
              <div className="cb-stat-num">{counters.users.toLocaleString()}+</div>
              <div className="cb-stat-label">Active Users</div>
            </div>
            <div className="cb-stat">
              <div className="cb-stat-num">{counters.langs}+</div>
              <div className="cb-stat-label">Languages</div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="cb-features">
          <div className="cb-section-header">
            <p className="cb-section-label">// why CodeRn</p>
            <h2 className="cb-section-title">Everything you need.<br />Nothing you don't.</h2>
          </div>

          <div className="cb-feature-grid">
            {features.map((f, i) => (
              <div className="cb-feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="cb-feature-icon">{f.icon}</span>
                <div className="cb-feature-title">{f.title}</div>
                <div className="cb-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <div className="cb-cta-banner">
          <div className="cb-cta-banner-text">
            <h2>Your next great snippet<br />is one click away.</h2>
            <p>Join thousands of developers already using CodeRn daily.</p>
          </div>
          <button className="cb-btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Open Editor →
          </button>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home