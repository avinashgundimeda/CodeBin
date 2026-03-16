import React, { useState, useRef } from 'react'
import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

const contactMethods = [
  {
    icon: '◈',
    title: 'Discord Community',
    desc: 'Chat with the team and other developers in real time.',
    link: 'Join Server →',
    href: '#',
  },
  {
    icon: '⬡',
    title: 'GitHub Issues',
    desc: 'Found a bug or want a feature? Open an issue on GitHub.',
    link: 'Open Issue →',
    href: '#',
  },
  {
    icon: '✦',
    title: 'Email Support',
    desc: 'For private or account-related matters. We reply within 24h.',
    link: 'support@CodeRn.dev',
    href: 'mailto:support@CodeRn.dev',
  },
]

const faqs = [
  {
    q: 'Is CodeRn free to use?',
    a: 'Yes. The core editor, execution, and sharing features are completely free with no account required. A Pro tier is available for higher rate limits and private snippets.',
  },
  {
    q: 'How long are snippets stored?',
    a: 'Snippets are stored permanently by default. You can optionally set an expiry of 1h, 24h, or 7 days before sharing.',
  },
  {
    q: 'Which languages are supported?',
    a: 'CodeRn supports 25+ languages including Python, JavaScript, TypeScript, C++, Java, Rust, Go, PHP, Ruby, Swift, and more. Check the Docs for the full list.',
  },
  {
    q: 'Can I use CodeRn offline?',
    a: 'Code editing works offline, but execution and sharing require an internet connection as code runs on our sandboxed servers.',
  },
  {
    q: 'Is my code private?',
    a: 'Unshared snippets are only accessible via direct URL. Pro users get true private snippets with access control.',
  },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Required'
    if (!form.email.includes('@')) e.email = 'Invalid email'
    if (!form.subject.trim()) e.subject = 'Required'
    if (form.message.trim().length < 10) e.message = 'Too short'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setSubmitted(true)
  }

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
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
          --g900: #080808;
          --g800: #0f0f0f;
          --g700: #1a1a1a;
          --g600: #252525;
          --g400: #444444;
          --g300: #777777;
          --g200: #aaaaaa;
          --white: #ffffff;
          --red: rgba(255,90,90,0.85);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ct-root {
          background: var(--black);
          color: var(--white);
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          padding-top: 64px;
          overflow-x: hidden;
        }

        /* ─── HERO STRIP ─── */
        .ct-hero {
          position: relative;
          padding: 72px 24px 64px;
          text-align: center;
          overflow: hidden;
          border-bottom: 1px solid var(--g700);
        }

        .ct-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(117,176,111,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(117,176,111,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
        }

        .ct-hero-glow {
          position: absolute;
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(117,176,111,0.12) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
        }

        .ct-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto;
          animation: fadeUp 0.7s ease both;
        }

        .ct-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--green);
          border-radius: 20px;
          padding: 5px 14px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--green);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .ct-hero-dot {
          width: 6px; height: 6px;
          background: var(--green);
          border-radius: 50%;
          animation: dotBlink 1.2s ease-in-out infinite;
        }

        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.15; }
        }

        .ct-hero-title {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.05;
          margin-bottom: 16px;
        }

        .ct-hero-title span { color: var(--green); }

        .ct-hero-sub {
          font-size: 15px;
          color: var(--g300);
          line-height: 1.7;
          font-weight: 400;
        }

        /* ─── BODY LAYOUT ─── */
        .ct-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 24px 80px;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 64px;
          align-items: start;
        }

        /* ─── FORM SIDE ─── */
        .ct-form-side {
          animation: fadeUp 0.6s ease both 0.1s;
        }

        .ct-form-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--green);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: block;
        }

        .ct-form-title {
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .ct-form-subtitle {
          font-size: 14px;
          color: var(--g300);
          margin-bottom: 36px;
          font-weight: 400;
        }

        /* Success State */
        .ct-success {
          background: var(--green-dim);
          border: 1px solid var(--green-border);
          border-radius: 8px;
          padding: 40px 32px;
          text-align: center;
          animation: fadeUp 0.5s ease both;
        }

        .ct-success-icon {
          font-size: 40px;
          margin-bottom: 16px;
          display: block;
          animation: popIn 0.5s ease both 0.1s;
        }

        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .ct-success h3 {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .ct-success p {
          font-size: 14px;
          color: var(--g300);
        }

        /* Form */
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .ct-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ct-field-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--g300);
          letter-spacing: 0.5px;
          font-family: 'Space Mono', monospace;
          text-transform: uppercase;
        }

        .ct-field-label span {
          color: var(--green);
          margin-left: 2px;
        }

        .ct-input, .ct-textarea {
          background: var(--g800);
          border: 1px solid var(--g700);
          border-radius: 4px;
          padding: 13px 16px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--white);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          width: 100%;
        }

        .ct-input::placeholder, .ct-textarea::placeholder {
          color: var(--g400);
          font-weight: 400;
        }

        .ct-input:focus, .ct-textarea:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(117,176,111,0.1);
          background: var(--g900);
        }

        .ct-input.error, .ct-textarea.error {
          border-color: var(--red);
        }

        .ct-error-msg {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--red);
          letter-spacing: 0.5px;
        }

        .ct-textarea {
          resize: vertical;
          min-height: 140px;
        }

        .ct-char-count {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--g400);
          text-align: right;
          margin-top: -4px;
        }

        .ct-submit {
          background: var(--green);
          color: var(--black);
          border: none;
          padding: 15px 32px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .ct-submit::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: rgba(255,255,255,0.15);
          transform: skewX(-15deg);
          transition: left 0.3s ease;
        }

        .ct-submit:hover::before { left: 150%; }
        .ct-submit:hover {
          background: #8ac984;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(117,176,111,0.35);
        }

        /* ─── RIGHT SIDE ─── */
        .ct-right {
          display: flex;
          flex-direction: column;
          gap: 32px;
          animation: fadeUp 0.6s ease both 0.25s;
        }

        /* Contact Cards */
        .ct-cards-title {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--green);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .ct-cards {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: var(--g700);
          border: 1px solid var(--g700);
          border-radius: 6px;
          overflow: hidden;
        }

        .ct-card {
          background: var(--g800);
          padding: 20px 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: background 0.2s;
          cursor: default;
        }

        .ct-card:hover { background: var(--g700); }

        .ct-card-icon {
          width: 36px; height: 36px;
          background: var(--green-dim);
          border: 1px solid var(--green-border);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: var(--green);
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        .ct-card:hover .ct-card-icon { transform: scale(1.1) rotate(-5deg); }

        .ct-card-title {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .ct-card-desc {
          font-size: 12px;
          color: var(--g300);
          line-height: 1.5;
          margin-bottom: 8px;
          font-weight: 400;
        }

        .ct-card-link {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--green);
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: opacity 0.2s;
        }

        .ct-card-link:hover { opacity: 0.7; }

        /* FAQ */
        .ct-faq-title {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--green);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .ct-faqs {
          border: 1px solid var(--g700);
          border-radius: 6px;
          overflow: hidden;
        }

        .ct-faq-item {
          border-bottom: 1px solid var(--g700);
        }

        .ct-faq-item:last-child { border-bottom: none; }

        .ct-faq-q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          background: var(--g800);
          transition: background 0.2s;
          gap: 12px;
          user-select: none;
        }

        .ct-faq-q:hover { background: var(--g700); }

        .ct-faq-arrow {
          color: var(--green);
          font-size: 10px;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .ct-faq-arrow.open { transform: rotate(90deg); }

        .ct-faq-a {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease, padding 0.3s ease;
          font-size: 13px;
          color: var(--g300);
          line-height: 1.65;
          font-weight: 400;
          background: var(--g900);
          padding: 0 20px;
        }

        .ct-faq-a.open {
          max-height: 120px;
          padding: 14px 20px;
        }

        /* Response time badge */
        .ct-response-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--g800);
          border: 1px solid var(--g700);
          border-radius: 4px;
          padding: 12px 16px;
        }

        .ct-response-dot {
          width: 8px; height: 8px;
          background: var(--green);
          border-radius: 50%;
          animation: dotBlink 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        .ct-response-text {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--g300);
          letter-spacing: 0.3px;
        }

        .ct-response-text strong {
          color: var(--green);
          font-weight: 700;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .ct-body { grid-template-columns: 1fr; gap: 48px; }
          .ct-form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ct-root">
        <Navbar />

        {/* ── HERO ── */}
        <section className="ct-hero">
          <div className="ct-hero-grid" />
          <div className="ct-hero-glow" />
          <div className="ct-hero-inner">
            <div className="ct-hero-tag">
              <span className="ct-hero-dot" />
              Get in Touch
            </div>
            <h1 className="ct-hero-title">
              We're here.<br />
              <span>Talk to us.</span>
            </h1>
            <p className="ct-hero-sub">
              Questions, bug reports, feature requests, or just want to say hi — drop us a message and we'll get back to you fast.
            </p>
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="ct-body">

          {/* ── FORM ── */}
          <div className="ct-form-side">
            <span className="ct-form-label">// send a message</span>
            <h2 className="ct-form-title">What's on your mind?</h2>
            <p className="ct-form-subtitle">Fill out the form and we'll respond within 24 hours.</p>

            {submitted ? (
              <div className="ct-success">
                <span className="ct-success-icon">✓</span>
                <h3>Message sent.</h3>
                <p>We'll get back to you at <strong style={{ color: 'var(--green)' }}>{form.email}</strong> within 24 hours.</p>
              </div>
            ) : (
              <div className="ct-form">
                <div className="ct-form-row">
                  <div className="ct-field">
                    <label className="ct-field-label">Name <span>*</span></label>
                    <input
                      className={`ct-input ${errors.name ? 'error' : ''}`}
                      placeholder="Avinash"
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                    />
                    {errors.name && <span className="ct-error-msg">↑ {errors.name}</span>}
                  </div>
                  <div className="ct-field">
                    <label className="ct-field-label">Email <span>*</span></label>
                    <input
                      className={`ct-input ${errors.email ? 'error' : ''}`}
                      placeholder="you@example.com"
                      type="email"
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                    />
                    {errors.email && <span className="ct-error-msg">↑ {errors.email}</span>}
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-field-label">Subject <span>*</span></label>
                  <input
                    className={`ct-input ${errors.subject ? 'error' : ''}`}
                    placeholder="Bug report / Feature request / General inquiry"
                    value={form.subject}
                    onChange={e => handleChange('subject', e.target.value)}
                  />
                  {errors.subject && <span className="ct-error-msg">↑ {errors.subject}</span>}
                </div>

                <div className="ct-field">
                  <label className="ct-field-label">Message <span>*</span></label>
                  <textarea
                    className={`ct-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Describe your issue or question in detail..."
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                  />
                  <div className="ct-char-count">{form.message.length} / 1000</div>
                  {errors.message && <span className="ct-error-msg">↑ {errors.message}</span>}
                </div>

                <button className="ct-submit" onClick={handleSubmit}>
                  Send Message →
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT ── */}
          <div className="ct-right">

            {/* Response badge */}
            <div className="ct-response-badge">
              <span className="ct-response-dot" />
              <span className="ct-response-text">
                Average response time: <strong>under 4 hours</strong>
              </span>
            </div>

            {/* Contact Methods */}
            <div>
              <p className="ct-cards-title">// other channels</p>
              <div className="ct-cards">
                {contactMethods.map((m, i) => (
                  <div className="ct-card" key={i}>
                    <div className="ct-card-icon">{m.icon}</div>
                    <div>
                      <div className="ct-card-title">{m.title}</div>
                      <div className="ct-card-desc">{m.desc}</div>
                      <a className="ct-card-link" href={m.href}>{m.link}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <p className="ct-faq-title">// faq</p>
              <div className="ct-faqs">
                {faqs.map((f, i) => (
                  <div className="ct-faq-item" key={i}>
                    <div
                      className="ct-faq-q"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {f.q}
                      <span className={`ct-faq-arrow ${openFaq === i ? 'open' : ''}`}>▶</span>
                    </div>
                    <div className={`ct-faq-a ${openFaq === i ? 'open' : ''}`}>
                      {f.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      <Footer />
      </div>
    </>
  )
}

export default Contact