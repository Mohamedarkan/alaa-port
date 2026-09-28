import React, { useState, useEffect } from 'react';
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
