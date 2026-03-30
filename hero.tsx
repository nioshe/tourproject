"use client";

import { useEffect, useRef, useState } from "react";

const CITIES = ["Marrakech", "Fes", "Chefchaouen", "Sahara", "Casablanca", "Essaouira"];

export default function Hero() {
  const [activeCity, setActiveCity] = useState(0);
  const [query, setQuery] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCity((prev: number) => (prev + 1) % CITIES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        :root {
          --midnight: #0d0d1a;
          --indigo:   #1a1a3e;
          --gold:     #c9962a;
          --amber:    #e8b84b;
          --sand:     #f5e6c8;
          --terra:    #c1440e;
          --muted:    #8c8a9e;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-root {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background-color: var(--midnight);
          overflow: hidden;
          font-family: 'Jost', sans-serif;
          color: var(--sand);
        }

        /* ── Layered background ── */
        .bg-gradient {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 70% 10%,  rgba(201,150,42,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 10% 90%,  rgba(193,68,14,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 100% 70% at 50% 50%, rgba(26,26,62,0.95)  0%, var(--midnight) 100%);
        }

        .bg-noise {
          position: absolute; inset: 0; z-index: 1; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        /* ── Zellige / Star geometry ── */
        .geo-left {
          position: absolute;
          left: -120px; top: 50%;
          transform: translateY(-50%);
          width: 420px; height: 420px;
          opacity: 0.07; z-index: 1;
          animation: slowSpin 60s linear infinite;
        }
        .geo-right {
          position: absolute;
          right: -80px; bottom: -80px;
          width: 520px; height: 520px;
          opacity: 0.06; z-index: 1;
          animation: slowSpin 90s linear infinite reverse;
        }
        .geo-top-right {
          position: absolute;
          right: 60px; top: -40px;
          width: 200px; height: 200px;
          opacity: 0.10; z-index: 1;
          animation: slowSpin 45s linear infinite;
        }

        @keyframes slowSpin { to { transform: translateY(-50%) rotate(360deg); } }
        .geo-right { animation-name: spinNoTranslate; }
        .geo-top-right { animation-name: spinNoTranslate; }
        @keyframes spinNoTranslate { to { transform: rotate(360deg); } }

        /* ── Gold divider line ── */
        .gold-line {
          position: absolute;
          left: 0; right: 0;
          bottom: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          z-index: 2;
        }

        /* ── Content ── */
        .content {
          position: relative; z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100svh;
          padding: 80px 24px 100px;
          text-align: center;
        }

        /* ── Eyebrow ── */
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 28px;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.1s forwards;
        }
        .eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--terra);
          flex-shrink: 0;
        }

        /* ── Headline ── */
        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(52px, 8vw, 110px);
          line-height: 0.95;
          letter-spacing: -0.01em;
          color: var(--sand);
          margin-bottom: 12px;
          opacity: 0;
          animation: fadeUp 1s ease 0.3s forwards;
        }
        .headline em {
          font-style: italic;
          color: var(--amber);
          font-weight: 400;
        }

        /* ── Rotating city ── */
        .city-ticker-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 1s ease 0.5s forwards;
        }
        .city-line {
          width: 50px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .city-line.right {
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .city-ticker {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 2.5vw, 26px);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          min-width: 200px;
          text-align: center;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        /* ── Subtext ── */
        .subtext {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(14px, 1.5vw, 17px);
          color: var(--muted);
          max-width: 480px;
          line-height: 1.75;
          letter-spacing: 0.02em;
          margin-bottom: 52px;
          opacity: 0;
          animation: fadeUp 1s ease 0.7s forwards;
        }

        /* ── Search bar ── */
        .search-wrap {
          width: 100%;
          max-width: 640px;
          opacity: 0;
          animation: fadeUp 1s ease 0.9s forwards;
          margin-bottom: 48px;
        }
        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,150,42,0.25);
          border-radius: 6px;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .search-box.focused {
          border-color: rgba(201,150,42,0.65);
          box-shadow: 0 0 0 3px rgba(201,150,42,0.08), 0 8px 32px rgba(0,0,0,0.4);
        }
        .search-icon {
          padding: 0 18px;
          display: flex;
          align-items: center;
          color: var(--gold);
          flex-shrink: 0;
        }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: var(--sand);
          padding: 18px 0;
          letter-spacing: 0.04em;
        }
        .search-input::placeholder { color: rgba(140,138,158,0.6); }
        .search-btn {
          flex-shrink: 0;
          margin: 6px;
          padding: 12px 28px;
          background: linear-gradient(135deg, var(--gold), #a87820);
          border: none;
          border-radius: 4px;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--midnight);
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .search-btn:hover { opacity: 0.88; transform: scale(0.98); }

        /* ── Stats ── */
        .stats {
          display: flex;
          align-items: center;
          gap: 40px;
          opacity: 0;
          animation: fadeUp 1s ease 1.1s forwards;
        }
        .stat { text-align: center; }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 600;
          color: var(--sand);
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-value span {
          color: var(--amber);
        }
        .stat-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(201,150,42,0.2);
        }

        /* ── Scroll hint ── */
        .scroll-hint {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: fadeIn 1s ease 1.8s forwards;
          z-index: 10;
        }
        .scroll-text {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .scroll-bar {
          width: 1px;
          height: 40px;
          background: rgba(201,150,42,0.2);
          position: relative;
          overflow: hidden;
          border-radius: 1px;
        }
        .scroll-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          animation: scrollDrop 2s ease-in-out infinite;
        }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); }
          50%  { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }

        /* ── AI badge ── */
        .ai-badge {
          position: absolute;
          top: 32px; right: 32px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,150,42,0.2);
          border-radius: 100px;
          padding: 8px 16px 8px 10px;
          z-index: 20;
          opacity: 0;
          animation: fadeIn 0.8s ease 1.4s forwards;
        }
        .ai-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.8);
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
        .ai-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: rgba(245,230,200,0.7);
        }

        /* ── Navbar hint ── */
        .nav-logo {
          position: absolute;
          top: 32px; left: 32px;
          z-index: 20;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: var(--sand);
          letter-spacing: 0.05em;
          opacity: 0;
          animation: fadeIn 0.8s ease 0.2s forwards;
        }
        .nav-logo span { color: var(--gold); }

        /* ── Keyframes ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .stats { gap: 20px; }
          .ai-badge, .nav-logo { display: none; }
          .geo-left { width: 260px; height: 260px; left: -80px; }
          .search-btn { padding: 12px 16px; font-size: 11px; }
        }
      `}</style>

      <div className="hero-root">
        {/* Backgrounds */}
        <div className="bg-gradient" />
        <div className="bg-noise" />

        {/* Geometric ornaments */}
        <svg className="geo-left" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <MoroccanStar color="#c9962a" />
        </svg>
        <svg className="geo-right" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <MoroccanStar color="#c9962a" />
        </svg>
        <svg className="geo-top-right" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <MoroccanStar color="#e8b84b" />
        </svg>

        <div className="gold-line" />

        {/* Nav logo */}
        <div className="nav-logo">
          Rahla<span>.</span>AI
        </div>

        {/* AI status badge */}
        <div className="ai-badge">
          <div className="ai-dot" />
          <span className="ai-text">AI Planner Active</span>
        </div>

        {/* Main content */}
        <div className="content">
          <div className="eyebrow">
            <div className="eyebrow-dot" />
            Crafted Moroccan Experiences
            <div className="eyebrow-dot" />
          </div>

          <h1 className="headline">
            Discover the<br />
            <em>Soul of</em> Morocco
          </h1>

          <div className="city-ticker-wrap">
            <div className="city-line" />
            <div className="city-ticker">{CITIES[activeCity]}</div>
            <div className="city-line right" />
          </div>

          <p className="subtext">
            Let our AI guide you through ancient medinas, golden deserts,
            and coastal havens — crafting the journey only Morocco can offer.
          </p>

          {/* Search */}
          <div className="search-wrap">
            <div className={`search-box ${inputFocused ? "focused" : ""}`}>
              <div className="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                ref={inputRef}
                className="search-input"
                placeholder="Ask our AI — &quot;3 days in Marrakech under $800…&quot;"
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
              <button className="search-btn">Plan Trip</button>
            </div>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat">
              <div className="stat-value">40<span>+</span></div>
              <div className="stat-label">Curated Tours</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-value">12<span>k</span></div>
              <div className="stat-label">Travelers Guided</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-value">4.9<span>★</span></div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-hint">
          <span className="scroll-text">Explore</span>
          <div className="scroll-bar" />
        </div>
      </div>
    </>
  );
}

/* ── Moroccan 8-pointed star SVG ── */
function MoroccanStar({ color }: Readonly<{ color: string }>) {
  return (
    <>
      {/* Outer octagon frame */}
      <polygon
        points="100,10 145,30 190,30 190,75 170,100 190,125 190,170 145,170 100,190 55,170 10,170 10,125 30,100 10,75 10,30 55,30"
        stroke={color} strokeWidth="1.5" fill="none"
      />
      {/* Inner 8-pointed star */}
      <polygon
        points="100,40 113,80 155,80 123,103 135,145 100,122 65,145 77,103 45,80 87,80"
        stroke={color} strokeWidth="1.2" fill="none"
      />
      {/* Center diamond */}
      <polygon
        points="100,72 115,100 100,128 85,100"
        stroke={color} strokeWidth="1" fill="none"
      />
      {/* Corner details */}
      {[0, 90, 180, 270].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <line x1="100" y1="10" x2="100" y2="35" stroke={color} strokeWidth="0.8" opacity="0.5" />
        </g>
      ))}
    </>
  );
}
