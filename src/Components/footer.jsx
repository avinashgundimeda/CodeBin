import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const links = {
  Product: [
    { label: "Editor", to: "/editor" },
    { label: "Snippets", to: "/snippets" },
    { label: "Languages", to: "/docs" },
    { label: "Themes", to: "/docs" },
    { label: "API", to: "/docs" },
  ],
  Resources: [
    { label: "Docs", to: "/docs" },
    { label: "Quick Start", to: "/docs" },
    { label: "Changelog", to: "#" },
    { label: "Status", to: "#" },
    { label: "Roadmap", to: "#" },
  ],
  Company: [
    { label: "About", to: "#" },
    { label: "Blog", to: "#" },
    { label: "Careers", to: "#" },
    { label: "Contact", to: "/contact" },
    { label: "Privacy", to: "#" },
  ],
  Community: [
    { label: "Discord", to: "#" },
    { label: "GitHub", to: "#" },
    { label: "Twitter / X", to: "#" },
    { label: "Newsletter", to: "#" },
    { label: "Open Source", to: "#" },
  ],
};

const socials = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState("idle"); // idle | success | error
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSub = () => {
    if (!email.includes("@")) {
      setSubState("error");
      return;
    }
    setSubState("success");
    setEmail("");
    setTimeout(() => setSubState("idle"), 3500);
  };

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
          --g700: #181818;
          --g600: #222222;
          --g400: #444444;
          --g300: #666666;
          --g200: #999999;
          --white: #ffffff;
        }

        .ft-root {
          background: var(--g900);
          border-top: 1px solid var(--g700);
          font-family: 'Syne', sans-serif;
          color: var(--white);
          overflow: hidden;
          position: relative;
        }

        /* ─── TOP GLOW BAR ─── */
        .ft-glow-bar {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--green) 30%,
            rgba(117,176,111,0.4) 50%,
            var(--green) 70%,
            transparent 100%
          );
          opacity: 0;
          transform: scaleX(0.4);
          transition: opacity 1s ease, transform 1.2s ease;
        }

        .ft-root.visible .ft-glow-bar {
          opacity: 1;
          transform: scaleX(1);
        }

        /* ─── NEWSLETTER BAND ─── */
        .ft-newsletter {
          border-bottom: 1px solid var(--g700);
          padding: 48px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }

        .ft-root.visible .ft-newsletter {
          opacity: 1;
          transform: translateY(0);
        }

        .ft-nl-left h3 {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
        }

        .ft-nl-left p {
          font-size: 13px;
          color: var(--g300);
          font-weight: 400;
        }

        .ft-nl-right {
          display: flex;
          gap: 0;
          flex-shrink: 0;
        }

        .ft-nl-input {
          background: var(--g800);
          border: 1px solid var(--g600);
          border-right: none;
          border-radius: 4px 0 0 4px;
          padding: 12px 18px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--white);
          outline: none;
          width: 260px;
          transition: border-color 0.2s;
        }

        .ft-nl-input::placeholder { color: var(--g400); font-weight: 400; }
        .ft-nl-input:focus { border-color: var(--green); }
        .ft-nl-input.error { border-color: rgba(255,90,90,0.7); }

        .ft-nl-btn {
          background: var(--green);
          color: var(--black);
          border: none;
          border-radius: 0 4px 4px 0;
          padding: 12px 22px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }

        .ft-nl-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: rgba(255,255,255,0.15);
          transform: skewX(-15deg);
          transition: left 0.3s;
        }

        .ft-nl-btn:hover::before { left: 150%; }
        .ft-nl-btn:hover { background: #8ac984; }

        .ft-nl-success {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--green);
          animation: fadeIn 0.4s ease;
        }

        /* ─── MAIN GRID ─── */
        .ft-main {
          padding: 56px 64px 48px;
          display: grid;
          grid-template-columns: 1.8fr repeat(4, 1fr);
          gap: 48px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
        }

        .ft-root.visible .ft-main {
          opacity: 1;
          transform: translateY(0);
        }

        /* Brand col */
        .ft-brand-col {}

        .ft-logo {
          font-family: 'Space Mono', monospace;
          font-size: 20px;
          font-weight: 700;
          color: var(--white);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .ft-logo-dot {
          color: var(--green);
          display: inline-block;
          transition: transform 0.3s ease;
          font-size: 26px;
          line-height: 1;
        }

        .ft-logo:hover .ft-logo-dot { transform: rotate(90deg) scale(1.3); }

        .ft-brand-desc {
          font-size: 13px;
          color: var(--g300);
          line-height: 1.7;
          max-width: 220px;
          font-weight: 400;
          margin-bottom: 24px;
        }

        /* Socials */
        .ft-socials {
          display: flex;
          gap: 8px;
        }

        .ft-social {
          width: 34px; height: 34px;
          background: var(--g700);
          border: 1px solid var(--g600);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--g300);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .ft-social:hover {
          background: var(--green-dim);
          border-color: var(--green);
          color: var(--green);
          transform: translateY(-3px);
        }

        /* Status pill */
        .ft-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 20px;
          background: var(--g700);
          border: 1px solid var(--g600);
          border-radius: 20px;
          padding: 5px 12px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--g200);
          letter-spacing: 0.5px;
        }

        .ft-status-dot {
          width: 6px; height: 6px;
          background: var(--green);
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(117,176,111,0.4); }
          50%       { box-shadow: 0 0 0 4px rgba(117,176,111,0); }
        }

        /* Link cols */
        .ft-link-col {}

        .ft-col-title {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--green);
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: block;
        }

        .ft-col-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ft-col-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--g300);
          text-decoration: none;
          transition: color 0.15s ease, padding-left 0.15s ease;
          display: inline-block;
        }

        .ft-col-link:hover {
          color: var(--white);
          padding-left: 6px;
        }

        /* ─── DIVIDER ─── */
        .ft-divider {
          height: 1px;
          background: var(--g700);
          margin: 0 64px;
          opacity: 0;
          transition: opacity 0.7s ease 0.4s;
        }

        .ft-root.visible .ft-divider { opacity: 1; }

        /* ─── BOTTOM BAR ─── */
        .ft-bottom {
          padding: 20px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
        }

        .ft-root.visible .ft-bottom {
          opacity: 1;
          transform: translateY(0);
        }

        .ft-copy {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--g400);
          letter-spacing: 0.3px;
        }

        .ft-copy span { color: var(--green); }

        .ft-bottom-links {
          display: flex;
          gap: 24px;
        }

        .ft-bottom-link {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--g400);
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: color 0.2s;
        }

        .ft-bottom-link:hover { color: var(--green); }

        .ft-version {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--g600);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* ─── BG DECORATION ─── */
        .ft-bg-deco {
          position: absolute;
          bottom: 0; right: 0;
          font-family: 'Space Mono', monospace;
          font-size: 180px;
          font-weight: 700;
          color: rgba(117,176,111,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -8px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .ft-main {
            grid-template-columns: 1fr 1fr;
            padding: 48px 32px;
          }
          .ft-brand-col { grid-column: 1 / -1; }
          .ft-newsletter { padding: 36px 32px; flex-direction: column; align-items: flex-start; }
          .ft-nl-right { width: 100%; }
          .ft-nl-input { flex: 1; }
          .ft-divider { margin: 0 32px; }
          .ft-bottom { padding: 20px 32px; flex-direction: column; text-align: center; gap: 12px; }
        }

        @media (max-width: 600px) {
          .ft-main { grid-template-columns: 1fr 1fr; padding: 36px 20px; gap: 32px; }
          .ft-newsletter { padding: 28px 20px; }
          .ft-nl-right { flex-direction: column; }
          .ft-nl-input { width: 100%; border-right: 1px solid var(--g600); border-radius: 4px; }
          .ft-nl-btn { border-radius: 4px; }
          .ft-divider { margin: 0 20px; }
          .ft-bottom { padding: 20px; }
          .ft-bottom-links { flex-wrap: wrap; justify-content: center; gap: 12px; }
          .ft-bg-deco { font-size: 100px; }
        }
      `}</style>

      <footer className={`ft-root ${visible ? "visible" : ""}`} ref={footerRef}>
        {/* Glow bar */}
        <div className="ft-glow-bar" />

        {/* Newsletter */}
        <div className="ft-newsletter">
          <div className="ft-nl-left">
            <h3>Stay in the loop.</h3>
            <p>
              Get notified about new languages, features, and releases. No spam,
              ever.
            </p>
          </div>
          <div className="ft-nl-right">
            {subState === "success" ? (
              <div className="ft-nl-success">
                <span>✓</span> You're subscribed. Welcome aboard.
              </div>
            ) : (
              <>
                <input
                  className={`ft-nl-input ${subState === "error" ? "error" : ""}`}
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubState("idle");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSub()}
                />
                <button className="ft-nl-btn" onClick={handleSub}>
                  Subscribe →
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main grid */}
        <div className="ft-main">
          {/* Brand */}
          <div className="ft-brand-col">
            <NavLink to="/" className="ft-logo">
              CodeRn<span className="ft-logo-dot">.</span>
            </NavLink>
            <p className="ft-brand-desc">
              A browser-based code editor and execution environment. Write, run,
              and share code with zero setup.
            </p>
            <div className="ft-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="ft-social"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="ft-status">
              <span className="ft-status-dot" />
              All systems operational
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([col, items]) => (
            <div className="ft-link-col" key={col}>
              <span className="ft-col-title">{col}</span>
              <div className="ft-col-links">
                {items.map(({ label, to }) => (
                  <NavLink key={label} to={to} className="ft-col-link">
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ft-divider" />

        {/* Bottom bar */}
        <div className="ft-bottom">
          <span className="ft-copy">
            © 2026 <span>CodeRn</span>. Built for developers, by Developer.
          </span>

          <div className="ft-bottom-links">
            <NavLink to="#" className="ft-bottom-link">
              Terms
            </NavLink>
            <NavLink to="#" className="ft-bottom-link">
              Privacy
            </NavLink>
            <NavLink to="#" className="ft-bottom-link">
              Cookies
            </NavLink>
            <NavLink to="#" className="ft-bottom-link">
              Security
            </NavLink>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
            }}
          >
            <span className="ft-version">v2.0.1</span>
            <a
              href="https://wa.link/t79ys0"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                color: "var(--g600)",
                hover: { color: "var(--green)" },
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#75B06F";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--g600)";
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
