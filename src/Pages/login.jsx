import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Components/navbar'

const Login = () => {
  const [tab, setTab] = useState('login') // login | signup
  const [form, setForm] = useState({ email: '', password: '', name: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 50) }, [])

  const handleChange = (f, v) => {
    setForm(p => ({ ...p, [f]: v }))
    if (errors[f]) setErrors(e => ({ ...e, [f]: null }))
  }

  const validate = () => {
    const e = {}
    if (tab === 'signup' && !form.name.trim()) e.name = 'Required'
    if (!form.email.includes('@')) e.email = 'Invalid email'
    if (form.password.length < 6) e.password = 'Min 6 characters'
    if (tab === 'signup' && form.confirm !== form.password) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 1800)
  }

  const switchTab = (t) => {
    setTab(t)
    setForm({ email: '', password: '', name: '', confirm: '' })
    setErrors({})
    setSuccess(false)
    setShowPass(false)
    setShowConfirm(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --green: #75B06F;
          --green-dim: rgba(117,176,111,0.1);
          --green-border: rgba(117,176,111,0.3);
          --black: #000000;
          --g900: #060606;
          --g800: #0f0f0f;
          --g700: #1a1a1a;
          --g600: #242424;
          --g400: #444444;
          --g300: #6a6a6a;
          --g200: #999999;
          --white: #ffffff;
          --red: rgba(255, 80, 80, 0.85);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lg-root {
          background: var(--black);
          color: var(--white);
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          padding-top: 64px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ─── SPLIT LAYOUT ─── */
        .lg-layout {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 64px);
        }

        /* ─── LEFT PANEL ─── */
        .lg-left {
          position: relative;
          background: var(--g900);
          border-right: 1px solid var(--g700);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 72px;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .lg-left.in { opacity: 1; transform: translateX(0); }

        .lg-left-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(117,176,111,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(117,176,111,0.04) 1px, transparent 1px);
          background-size: 44px 44px;
          z-index: 0;
        }

        .lg-left-glow {
          position: absolute;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(117,176,111,0.1) 0%, transparent 70%);
          bottom: -80px; left: -80px;
          z-index: 0;
          animation: glowPulse 5s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }

        .lg-left-inner {
          position: relative;
          z-index: 1;
        }

        .lg-left-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--green);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lg-tag-line {
          width: 28px; height: 1px;
          background: var(--green);
        }

        .lg-left-title {
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.05;
          margin-bottom: 20px;
        }

        .lg-left-title span { color: var(--green); }

        .lg-left-desc {
          font-size: 14px;
          color: var(--g300);
          line-height: 1.75;
          max-width: 360px;
          font-weight: 400;
          margin-bottom: 40px;
        }

        /* Features list */
        .lg-features {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .lg-feat {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: var(--g200);
          font-weight: 600;
          opacity: 0;
          transform: translateX(-12px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .lg-feat.in { opacity: 1; transform: translateX(0); }

        .lg-feat-check {
          width: 20px; height: 20px;
          background: var(--green-dim);
          border: 1px solid var(--green-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: var(--green);
          flex-shrink: 0;
        }

        /* Code snippet decoration */
        .lg-code-deco {
          margin-top: 48px;
          background: var(--g800);
          border: 1px solid var(--g700);
          border-radius: 6px;
          overflow: hidden;
          max-width: 380px;
        }

        .lg-code-bar {
          background: var(--g700);
          padding: 9px 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .lg-code-dot {
          width: 9px; height: 9px; border-radius: 50%;
        }

        .lg-code-body {
          padding: 16px 18px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: #9ed49a;
          line-height: 1.7;
        }

        .lg-code-comment { color: var(--g400); }
        .lg-code-key     { color: var(--green); }
        .lg-code-str     { color: #c5e8c2; }

        /* ─── RIGHT PANEL ─── */
        .lg-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 32px;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
        }

        .lg-right.in { opacity: 1; transform: translateX(0); }

        .lg-card {
          width: 100%;
          max-width: 420px;
        }

        /* Tab switcher */
        .lg-tabs {
          display: flex;
          background: var(--g800);
          border: 1px solid var(--g700);
          border-radius: 6px;
          padding: 4px;
          margin-bottom: 32px;
        }

        .lg-tab {
          flex: 1;
          padding: 10px;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          color: var(--g300);
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
          user-select: none;
        }

        .lg-tab.active {
          background: var(--green);
          color: var(--black);
        }

        .lg-tab:not(.active):hover { color: var(--white); }

        /* Form header */
        .lg-card-title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.8px;
          margin-bottom: 6px;
        }

        .lg-card-sub {
          font-size: 13px;
          color: var(--g300);
          margin-bottom: 28px;
          font-weight: 400;
        }

        /* OAuth buttons */
        .lg-oauth {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
        }

        .lg-oauth-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px;
          background: var(--g800);
          border: 1px solid var(--g700);
          border-radius: 4px;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--g200);
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.3px;
        }

        .lg-oauth-btn:hover {
          border-color: var(--green);
          color: var(--white);
          background: var(--g700);
        }

        .lg-oauth-icon { font-size: 14px; }

        /* Divider */
        .lg-or {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .lg-or-line {
          flex: 1;
          height: 1px;
          background: var(--g700);
        }

        .lg-or-text {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--g400);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Fields */
        .lg-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .lg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lg-field-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--g300);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Space Mono', monospace;
        }

        .lg-field-label span { color: var(--green); }

        .lg-input-wrap {
          position: relative;
        }

        .lg-input {
          width: 100%;
          background: var(--g800);
          border: 1px solid var(--g700);
          border-radius: 4px;
          padding: 13px 16px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--white);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .lg-input::placeholder { color: var(--g400); font-weight: 400; }

        .lg-input:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(117,176,111,0.1);
          background: var(--g900);
        }

        .lg-input.error { border-color: var(--red); }
        .lg-input.has-toggle { padding-right: 48px; }

        .lg-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--g400);
          font-size: 15px;
          transition: color 0.2s;
          padding: 0;
          line-height: 1;
        }

        .lg-toggle:hover { color: var(--green); }

        .lg-error-msg {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--red);
          letter-spacing: 0.3px;
        }

        /* Forgot */
        .lg-forgot {
          text-align: right;
          margin-top: -8px;
        }

        .lg-forgot a {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--g400);
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: color 0.2s;
        }

        .lg-forgot a:hover { color: var(--green); }

        /* Submit */
        .lg-submit {
          background: var(--green);
          color: var(--black);
          border: none;
          padding: 14px;
          width: 100%;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 50px;
        }

        .lg-submit::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: rgba(255,255,255,0.15);
          transform: skewX(-15deg);
          transition: left 0.3s;
        }

        .lg-submit:hover::before { left: 150%; }
        .lg-submit:hover:not(:disabled) {
          background: #8ac984;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(117,176,111,0.35);
        }

        .lg-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        /* Loader */
        .lg-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: var(--black);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success */
        .lg-success {
          text-align: center;
          padding: 32px 0;
          animation: successIn 0.5s ease;
        }

        @keyframes successIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }

        .lg-success-icon {
          width: 64px; height: 64px;
          background: var(--green-dim);
          border: 1px solid var(--green-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin: 0 auto 20px;
        }

        .lg-success h3 {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .lg-success p {
          font-size: 13px;
          color: var(--g300);
          line-height: 1.6;
        }

        .lg-success p span { color: var(--green); font-weight: 700; }

        /* Switch link */
        .lg-switch {
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
          color: var(--g300);
          font-weight: 400;
        }

        .lg-switch button {
          background: none;
          border: none;
          color: var(--green);
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
          padding: 0;
        }

        .lg-switch button:hover { opacity: 0.7; }

        /* Terms */
        .lg-terms {
          margin-top: 16px;
          text-align: center;
          font-size: 11px;
          color: var(--g400);
          line-height: 1.6;
        }

        .lg-terms a {
          color: var(--g300);
          text-decoration: none;
          transition: color 0.2s;
        }

        .lg-terms a:hover { color: var(--green); }

        @media (max-width: 900px) {
          .lg-layout { grid-template-columns: 1fr; }
          .lg-left { display: none; }
          .lg-right { padding: 32px 20px; }
        }
      `}</style>

      <div className="lg-root">
        <Navbar />

        <div className="lg-layout">

          {/* ── LEFT PANEL ── */}
          <div className={`lg-left ${mounted ? 'in' : ''}`}>
            <div className="lg-left-grid" />
            <div className="lg-left-glow" />
            <div className="lg-left-inner">
              <div className="lg-left-tag">
                <span className="lg-tag-line" />
                Welcome back
              </div>
              <h2 className="lg-left-title">
                Code without<br />
                <span>limits.</span>
              </h2>
              <p className="lg-left-desc">
                Sign in to access your snippets, run code in 25+ languages, and share your work with a single link.
              </p>

              <div className="lg-features">
                {[
                  'Instant code execution in the browser',
                  'Permanent snippet URLs, no expiry',
                  'Fork and collaborate on any snippet',
                  'API access for automation & CI',
                ].map((f, i) => (
                  <div
                    key={i}
                    className={`lg-feat ${mounted ? 'in' : ''}`}
                    style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
                  >
                    <span className="lg-feat-check">✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <div className="lg-code-deco">
                <div className="lg-code-bar">
                  <div className="lg-code-dot" style={{ background: '#ff5f57' }} />
                  <div className="lg-code-dot" style={{ background: '#febc2e' }} />
                  <div className="lg-code-dot" style={{ background: '#75B06F' }} />
                </div>
                <div className="lg-code-body">
                  <span className="lg-code-comment">{'# Already have an account?'}</span>{'\n'}
                  <span className="lg-code-key">user</span>{' = auth.login(\n'}
                  {'  '}<span className="lg-code-key">email</span>{'='}<span className="lg-code-str">"you@example.com"</span>{',\n'}
                  {'  '}<span className="lg-code-key">password</span>{'='}<span className="lg-code-str">"••••••••"</span>{'\n'}
                  {')\n'}
                  <span className="lg-code-comment">{'# → Welcome back 🚀'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className={`lg-right ${mounted ? 'in' : ''}`}>
            <div className="lg-card">

              {/* Tabs */}
              <div className="lg-tabs">
                <div className={`lg-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>
                  Sign In
                </div>
                <div className={`lg-tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => switchTab('signup')}>
                  Create Account
                </div>
              </div>

              {success ? (
                <div className="lg-success">
                  <div className="lg-success-icon">✓</div>
                  <h3>{tab === 'login' ? 'Welcome back.' : 'Account created.'}</h3>
                  <p>
                    {tab === 'login'
                      ? <>Signed in as <span>{form.email || 'you@example.com'}</span>. Redirecting to editor...</>
                      : <>Your account is ready. <span>Start coding now.</span></>
                    }
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="lg-card-title">{tab === 'login' ? 'Sign in' : 'Create account'}</h2>
                  <p className="lg-card-sub">
                    {tab === 'login'
                      ? 'Enter your credentials to access your workspace.'
                      : 'Join thousands of developers on CodeRn.'}
                  </p>

                  {/* OAuth */}
                  <div className="lg-oauth">
                    <button className="lg-oauth-btn">
                      <span className="lg-oauth-icon">⬡</span> GitHub
                    </button>
                    <button className="lg-oauth-btn">
                      <span className="lg-oauth-icon">✦</span> Google
                    </button>
                  </div>

                  <div className="lg-or">
                    <div className="lg-or-line" />
                    <span className="lg-or-text">or continue with email</span>
                    <div className="lg-or-line" />
                  </div>

                  <div className="lg-form">
                    {tab === 'signup' && (
                      <div className="lg-field">
                        <label className="lg-field-label">Full Name <span>*</span></label>
                        <input
                          className={`lg-input ${errors.name ? 'error' : ''}`}
                          placeholder="Avinash Gundimeda"
                          value={form.name}
                          onChange={e => handleChange('name', e.target.value)}
                        />
                        {errors.name && <span className="lg-error-msg">↑ {errors.name}</span>}
                      </div>
                    )}

                    <div className="lg-field">
                      <label className="lg-field-label">Email <span>*</span></label>
                      <input
                        className={`lg-input ${errors.email ? 'error' : ''}`}
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                      />
                      {errors.email && <span className="lg-error-msg">↑ {errors.email}</span>}
                    </div>

                    <div className="lg-field">
                      <label className="lg-field-label">Password <span>*</span></label>
                      <div className="lg-input-wrap">
                        <input
                          className={`lg-input has-toggle ${errors.password ? 'error' : ''}`}
                          type={showPass ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={form.password}
                          onChange={e => handleChange('password', e.target.value)}
                        />
                        <button className="lg-toggle" onClick={() => setShowPass(v => !v)}>
                          {showPass ? '🙈' : '👁'}
                        </button>
                      </div>
                      {errors.password && <span className="lg-error-msg">↑ {errors.password}</span>}
                    </div>

                    {tab === 'signup' && (
                      <div className="lg-field">
                        <label className="lg-field-label">Confirm Password <span>*</span></label>
                        <div className="lg-input-wrap">
                          <input
                            className={`lg-input has-toggle ${errors.confirm ? 'error' : ''}`}
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={form.confirm}
                            onChange={e => handleChange('confirm', e.target.value)}
                          />
                          <button className="lg-toggle" onClick={() => setShowConfirm(v => !v)}>
                            {showConfirm ? '🙈' : '👁'}
                          </button>
                        </div>
                        {errors.confirm && <span className="lg-error-msg">↑ {errors.confirm}</span>}
                      </div>
                    )}

                    {tab === 'login' && (
                      <div className="lg-forgot">
                        <a href="#">Forgot password?</a>
                      </div>
                    )}

                    <button
                      className="lg-submit"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading
                        ? <span className="lg-spinner" />
                        : tab === 'login' ? 'Sign In →' : 'Create Account →'
                      }
                    </button>
                  </div>

                  <div className="lg-switch">
                    {tab === 'login'
                      ? <>No account? <button onClick={() => switchTab('signup')}>Sign up free</button></>
                      : <>Already have one? <button onClick={() => switchTab('login')}>Sign in</button></>
                    }
                  </div>

                  {tab === 'signup' && (
                    <p className="lg-terms">
                      By creating an account, you agree to our{' '}
                      <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </p>
                  )}
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login