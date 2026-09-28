import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const INITIAL_PLACEHOLDERS = [
  { id: 1, title: 'Editorial Look 01', tag: 'Paris Haute Couture' },
  { id: 2, title: 'Runway Archive 02', tag: 'Milan Spring / Summer' },
  { id: 3, title: 'Studio Study 03', tag: 'Vogue Portrait Series' },
  { id: 4, title: 'Sculptural Form 04', tag: 'Monochrome Drapery' },
  { id: 5, title: 'Architectural Light 05', tag: 'Natural Shadows' },
  { id: 6, title: 'Campaign Preview 06', tag: 'Autumn Winter 2026' },
];

export default function App() {
  const [phase, setPhase] = useState('void');
  const [isHoverWinking, setIsHoverWinking] = useState(false);
  const [photos, setPhotos] = useState({});
  const [activeUploadId, setActiveUploadId] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleCardClick = (id) => {
    setActiveUploadId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && activeUploadId !== null) {
      const url = URL.createObjectURL(file);
      setPhotos((prev) => ({ ...prev, [activeUploadId]: url }));
    }
  };

  const isWinking = phase === 'wink' || isHoverWinking;
  const marqueeItems = [...INITIAL_PLACEHOLDERS, ...INITIAL_PLACEHOLDERS];

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
            <a href="#carousel">Archive</a>
            <a href="#about">Bio</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main className="main-content">
          {/* CENTERED HERO SECTION */}
          <section className="hero-section">
            <span className="hero-tag">Model Portfolio / 2026</span>
            <h1 className="hero-title">ALAA</h1>
            <div className="hero-desc">
              <p className="hero-text">
                High-end fashion silhouette, editorial campaigns, and runway archives. Refined proportions with sculptural identity.
              </p>
            </div>
          </section>

          {/* HORIZONTAL MOVING OBJECTS PLACEHOLDER (LEFT TO RIGHT) */}
          <section className="marquee-section" id="carousel">
            <div className="section-header">
              <div className="section-title-wrap">
                <span className="section-num">01 / FEATURED ARCHIVE</span>
                <h2 className="section-title">EDITORIAL STRIP</h2>
              </div>
              <span className="marquee-hint">Hover to pause • Click card to add photo</span>
            </div>

            <div className="marquee-container">
              <div className="marquee-track">
                {marqueeItems.map((item, index) => (
                  <div
                    key={'card-' + item.id + '-' + index}
                    className="marquee-card"
                    onClick={() => handleCardClick(item.id)}
                    title="Click to add photo"
                  >
                    <div className="card-media">
                      {photos[item.id] ? (
                        <img src={photos[item.id]} alt={item.title} className="card-img" />
                      ) : (
                        <div className="card-placeholder">
                          <div className="placeholder-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </div>
                          <span className="placeholder-label">Add Picture</span>
                          <span className="placeholder-sub">Click to upload</span>
                        </div>
                      )}
                      <span className="card-badge">{'0' + item.id}</span>
                    </div>
                    <div className="card-info">
                      <span className="card-title">{item.title}</span>
                      <span className="card-tag">{item.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden native file input for upload */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </section>

          {/* EDITORIAL GALLERY GRID */}
          <section className="gallery-grid" id="work">
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
