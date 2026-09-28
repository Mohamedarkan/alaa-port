const fs = require('fs');

const appJsx = `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [phase, setPhase] = useState('void');
  const [isHoverWinking, setIsHoverWinking] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => setPhase('reveal'), 800);
    const winkTimer = setTimeout(() => setPhase('wink'), 2600);
    const navTimer = setTimeout(() => setPhase('navbar'), 4000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(winkTimer);
      clearTimeout(navTimer);
    };
  }, []);

  const triggerWink = () => {
    if (phase === 'navbar' && !isHoverWinking) {
      setIsHoverWinking(true);
      setTimeout(() => setIsHoverWinking(false), 550);
    }
  };

  const isWinking = phase === 'wink' || isHoverWinking;

  return (
    <div className="portfolio-wrapper">
      {/* CONTINUOUS LOGO / AVATAR LAYER */}
      <motion.div
        className="avatar-container"
        initial={{
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          scale: 0.9,
          opacity: 0,
        }}
        animate={{
          top: phase === 'navbar' ? '40px' : '50%',
          left: phase === 'navbar' ? 'var(--nav-avatar-left, calc(2.5rem + 22px))' : '50%',
          x: '-50%',
          y: '-50%',
          scale: phase === 'void' ? 0.9 : phase === 'navbar' ? 0.115 : 1,
          opacity: phase === 'void' ? 0 : 1,
        }}
        transition={{
          duration: phase === 'navbar' ? 1.4 : 0.8,
          ease: [0.77, 0, 0.175, 1],
        }}
        onClick={triggerWink}
        onMouseEnter={triggerWink}
        style={{
          cursor: phase === 'navbar' ? 'pointer' : 'default',
          pointerEvents: phase === 'navbar' ? 'auto' : 'none',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg
            viewBox="0 0 1536 2091"
            className="avatar-svg"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              overflow: 'visible',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {/* Base silhouette: hair, face contour, beard, left eyebrow */}
            <image
              href="/avatar-base.png"
              width="1536"
              height="2730"
              preserveAspectRatio="none"
              transform="translate(0, -190)"
            />

            {/* Right eyebrow: full vector layer animating the entire eyebrow naturally */}
            <motion.g
              initial={{ y: 0, scaleY: 1, rotate: 0 }}
              animate={{
                y: isWinking ? [0, 24, -4, 0] : 0,
                scaleY: isWinking ? [1, 0.18, 1.08, 1] : 1,
                rotate: isWinking ? [0, -3, 0.5, 0] : 0,
              }}
              transition={{
                duration: 0.52,
                ease: [0.4, 0, 0.2, 1],
                times: [0, 0.45, 0.75, 1],
              }}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center center',
              }}
            >
              <image
                href="/avatar-eyebrow.png"
                x="829"
                y="919"
                width="333"
                height="110"
                preserveAspectRatio="none"
              />
            </motion.g>
          </svg>
        </div>
      </motion.div>

      {/* EDITORIAL PORTFOLIO CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'navbar' ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="content-container"
      >
        <header className="navbar-header">
          <div className="avatar-placeholder" onClick={triggerWink} style={{ cursor: 'pointer' }} />
          <nav className="nav-links">
            <a href="#work">Work</a>
            <a href="#archive">Archive</a>
            <a href="#about">Bio</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main className="main-content">
          <section className="hero-section">
            <h1 className="hero-title">ALAA</h1>
            <div className="hero-desc">
              <p className="hero-tag">Model Portfolio / 2026</p>
              <p className="hero-text">
                High-end fashion silhouette, editorial campaigns, and runway archives. Refined proportions with sculptural identity.
              </p>
            </div>
          </section>

          <section className="gallery-grid">
            <div className="gallery-card large">
              <div className="image-placeholder">Editorial Image 01</div>
            </div>
            <div className="gallery-side">
              <div className="gallery-card small">
                <div className="image-placeholder">Editorial Image 02</div>
              </div>
              <div className="campaign-info">
                <span className="campaign-tag">Campaign 01</span>
                <p className="campaign-text">
                  Architectural drapery and natural light studies.
                </p>
              </div>
            </div>
          </section>
        </main>
      </motion.div>
    </div>
  );
}
`;

const indexCss = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #ffffff;
  color: #111111;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
}

#root {
  width: 100vw;
  min-height: 100vh;
}

.portfolio-wrapper {
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  position: relative;
}

:root {
  --nav-avatar-left: calc(2.5rem + 22px);
}

.avatar-container {
  position: fixed;
  z-index: 50;
  transform-origin: center center;
  width: 340px;
  height: 463px;
  aspect-ratio: 1536 / 2091;
  pointer-events: none;
}

.avatar-svg {
  width: 100%;
  height: 100%;
}

.content-container {
  width: 100%;
  min-height: 100vh;
}

.navbar-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 40;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #eeeeee;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-placeholder {
  width: 44px;
  height: 52px;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #111111;
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.nav-links a:hover {
  opacity: 0.4;
}

.main-content {
  padding-top: 10rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 8rem;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 5rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.hero-title {
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.85;
}

.hero-desc {
  max-width: 340px;
}

.hero-tag {
  font-size: 11px;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #888888;
  margin-bottom: 0.75rem;
}

.hero-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555555;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 2.5rem;
}

@media (max-width: 850px) {
  :root {
    --nav-avatar-left: calc(1.5rem + 22px);
  }

  .navbar-header {
    padding: 0 1.5rem;
  }

  .nav-links {
    gap: 1.5rem;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

.gallery-card {
  background: #f7f7f7;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-card.large {
  aspect-ratio: 4/5;
}

.gallery-card.small {
  aspect-ratio: 3/4;
}

.gallery-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
}

.image-placeholder {
  width: 90%;
  height: 90%;
  border: 1px dashed #d0d0d0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999999;
}

.campaign-info {
  border-top: 1px solid #eeeeee;
  padding-top: 1.5rem;
}

.campaign-tag {
  font-size: 10px;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #888888;
  display: block;
  margin-bottom: 0.5rem;
}

.campaign-text {
  font-size: 1.1rem;
  font-weight: 300;
  color: #222222;
}
`;

fs.writeFileSync('src/App.jsx', appJsx);
fs.writeFileSync('src/index.css', indexCss);
fs.writeFileSync('portfolio/src/App.jsx', appJsx);
fs.writeFileSync('portfolio/src/index.css', indexCss);

console.log('ALL FILES WRITTEN SUCCESSFULLY!');
