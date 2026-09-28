import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ARCHIVE_SEPARATORS = [
  {
    id: 'sep-1',
    numAr: '٠١',
    numEn: '01',
    coord: '33°53′N / 35°30′E',
    glyph: '•',
    ruleHeight: 110,
    sub: 'SPECIMEN 01'
  },
  {
    id: 'sep-2',
    numAr: '٠٢',
    numEn: '02',
    coord: 'BEIRUT // 33⅓ RPM',
    glyph: '⌖',
    ruleHeight: 135,
    sub: 'SPECIMEN 02'
  },
  {
    id: 'sep-3',
    numAr: '٠٣',
    numEn: '03',
    coord: 'AXIS // PHL-III',
    glyph: '◇',
    ruleHeight: 95,
    sub: 'SPECIMEN 03'
  },
  {
    id: 'sep-4',
    numAr: '٠٤',
    numEn: '04',
    coord: 'DAMASCUS // 1924',
    glyph: '⊙',
    ruleHeight: 125,
    sub: 'SPECIMEN 04'
  },
  {
    id: 'sep-5',
    numAr: '٠٥',
    numEn: '05',
    coord: 'EXL // 33°N',
    glyph: '+',
    ruleHeight: 145,
    sub: 'SPECIMEN 05'
  },
  {
    id: 'sep-6',
    numAr: '٠٦',
    numEn: '06',
    coord: 'ALEPPO // SEMA',
    glyph: '⌖',
    ruleHeight: 105,
    sub: 'SPECIMEN 06'
  }
];

export const ARTIFACT_EDITORIAL_TRANSFORMS = {
  1: { rotate: '-1.4deg', translateY: '-8px', scale: 0.98 },
  2: { rotate: '2.2deg', translateY: '14px', scale: 1.01 },
  3: { rotate: '-2.1deg', translateY: '-16px', scale: 0.97 },
  4: { rotate: '1.6deg', translateY: '12px', scale: 1.0 },
  5: { rotate: '-2.4deg', translateY: '-10px', scale: 1.02 },
  6: { rotate: '1.8deg', translateY: '8px', scale: 1.01 }
};

export const ARCHIVE_ARTIFACTS = [
  {
    id: 1,
    number: '01',
    accession: 'ARC.01 / IDN',
    titleEn: 'THE SEAL',
    titleAr: 'الخَاتَم',
    dyadEn: 'IDENTITY',
    svgPath: '/archive/01-seal.svg',
    plate: 'PLATE 01'
  },
  {
    id: 2,
    number: '02',
    accession: 'ARC.02 / SND',
    titleEn: 'THE VINYL',
    titleAr: 'الأُسْطُوَانَة',
    dyadEn: 'SOLITUDE',
    svgPath: '/archive/02-vinyl.svg',
    plate: 'PLATE 02'
  },
  {
    id: 3,
    number: '03',
    accession: 'ARC.03 / PHL',
    titleEn: 'THE BUST',
    titleAr: 'التِّمْثَال',
    dyadEn: 'PHILOSOPHY',
    svgPath: '/archive/03-bust.svg',
    plate: 'PLATE 03'
  },
  {
    id: 4,
    number: '04',
    accession: 'ARC.04 / LIT',
    titleEn: 'THE ROSE',
    titleAr: 'الوَرْدَة',
    dyadEn: 'LONGING',
    svgPath: '/archive/04-rose.svg',
    plate: 'PLATE 04'
  },
  {
    id: 5,
    number: '05',
    accession: 'ARC.05 / EXL',
    titleEn: 'THE SWORD',
    titleAr: 'السَّيْف',
    dyadEn: 'ENDURANCE',
    svgPath: '/archive/05-sword.svg',
    plate: 'PLATE 05'
  },
  {
    id: 6,
    number: '06',
    accession: 'ARC.06 / SFM',
    titleEn: 'THE DERVISH',
    titleAr: 'الدَّرْوِيش',
    dyadEn: 'TRANSCENDENCE',
    svgPath: '/archive/06-dervish.svg',
    plate: 'PLATE 06'
  }
];

export default function App() {
  const [phase, setPhase] = useState('void');
  const [isHoverWinking, setIsHoverWinking] = useState(false);
  const [photos, setPhotos] = useState({});
  const [activeUploadId, setActiveUploadId] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
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

  const handleCardClick = (artifact) => {
    setSelectedArtifact(artifact);
  };

  const triggerUploadForArtifact = (id, e) => {
    if (e) e.stopPropagation();
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

  const resetPhoto = (id, e) => {
    if (e) e.stopPropagation();
    setPhotos((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
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

            {/* Right eyebrow: animating naturally via vector motion */}
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

      {/* EDITORIAL ARCHIVE CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'navbar' ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="content-container"
      >
        {/* Minimal Archival Navigation Bar */}
        <header className="navbar-header">
          <div className="avatar-placeholder" onClick={triggerWink} style={{ cursor: 'pointer' }} title="Codex Emblem" />
          
          
        </header>

        <main className="main-content">
          {/* CENTERED HERO SECTION - CLEAN & BOLD */}
          <section className="hero-section" id="hero">
            <h1 className="hero-title">ALAA</h1>
          </section>

          {/* ==========================================================================
          CONTINUOUS MOVING RIVER OF OBJECTS (CODEX STRIP)
          Order: SEAL → VINYL → BUST → ROSE → SWORD → DERVISH → repeat
          ========================================================================== */}
          <section className="archive-strip-section" id="codex-strip">
            {/* Continuous Seamless Infinite Moving Ribbon (Left to Right) */}
            <div className="strip-viewport">
              <div className="strip-motion-track">
                {[0, 1].map((setIndex) => (
                  <div key={'strip-set-' + setIndex} className="strip-specimen-group">
                    {ARCHIVE_ARTIFACTS.map((artifact, itemIndex) => {
                      const sep = ARCHIVE_SEPARATORS[itemIndex];
                      const transform = ARTIFACT_EDITORIAL_TRANSFORMS[artifact.id] || { rotate: '0deg', translateY: '0px', scale: 1 };
                      const hasCustom = Boolean(photos[artifact.id]);

                      return (
                        <React.Fragment key={'specimen-' + setIndex + '-' + artifact.id}>
                          {/* THE SPECIMEN PLATE */}
                          <div
                            className="specimen-plate-container"
                            style={{
                              transform: `translateY(${transform.translateY}) rotate(${transform.rotate}) scale(${transform.scale})`
                            }}
                            onClick={() => handleCardClick(artifact)}
                            title={`Examine ${artifact.titleEn} (${artifact.titleAr})`}
                          >
                            {/* Specimen Header */}
                            <div className="specimen-plate-header">
                              <span className="specimen-acc">{artifact.accession}</span>
                              <span className="specimen-ar-kicker">{artifact.titleAr}</span>
                            </div>

                            {/* Specimen Artwork Frame */}
                            <div className="specimen-art-frame">
                              {hasCustom ? (
                                <img src={photos[artifact.id]} alt={artifact.titleEn} className="specimen-graphic-img" />
                              ) : (
                                <img src={artifact.svgPath} alt={artifact.titleEn} className="specimen-graphic-svg" />
                              )}

                              <span className="specimen-tick tl">┌</span>
                              <span className="specimen-tick tr">┐</span>
                              <span className="specimen-tick bl">└</span>
                              <span className="specimen-tick br">┘</span>

                              <div className="specimen-hover-cue">
                                <span className="cue-action">[ EXAMINE / REPLACE ]</span>
                              </div>
                            </div>

                            {/* Specimen Footer */}
                            <div className="specimen-plate-footer">
                              <div className="specimen-footer-top">
                                <span className="specimen-plate-no">{artifact.plate}</span>
                                <span className="specimen-title-en">{artifact.titleEn}</span>
                                <span className="specimen-title-ar">{artifact.titleAr}</span>
                              </div>
                              <span className="specimen-dyad-line">{artifact.dyadEn}</span>
                            </div>
                          </div>

                          {/* RESTRAINED ARCHIVAL SEPARATOR BETWEEN SYMBOLS */}
                          <div className="archival-separator-unit">
                            <span className="sep-num-ar">{sep.numAr}</span>
                            <div className="sep-rule-assembly" style={{ height: `${sep.ruleHeight}px` }}>
                              <div className="sep-hairline top" />
                              <div className="sep-glyph-node">
                                <span className="sep-symbol">{sep.glyph}</span>
                              </div>
                              <div className="sep-hairline bottom" />
                            </div>
                            <div className="sep-meta-stack">
                              <span className="sep-coord-text">{sep.coord}</span>
                              <span className="sep-crosshair">+</span>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            

            {/* Hidden native file input for optional user photo replacement */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </section>
        </main>

        {/* Minimal Clean Footer */}
        <footer className="clean-minimal-footer">
          <div className="footer-line">
            <span>ALAA</span>
            <span>MMXXVI</span>
          </div>
        </footer>
      </motion.div>

      {/* CLEAN INSPECTION & UPLOAD MODAL */}
      <AnimatePresence>
        {selectedArtifact && (
          <motion.div
            className="dossier-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtifact(null)}
          >
            <motion.div
              className="dossier-modal"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="dossier-close"
                onClick={() => setSelectedArtifact(null)}
                title="Close"
              >
                ✕
              </button>

              <div className="clean-modal-layout">
                <div className="clean-modal-visual">
                  <div className="clean-modal-frame">
                    {photos[selectedArtifact.id] ? (
                      <img
                        src={photos[selectedArtifact.id]}
                        alt={selectedArtifact.titleEn}
                        className="dossier-img"
                      />
                    ) : (
                      <img
                        src={selectedArtifact.svgPath}
                        alt={selectedArtifact.titleEn}
                        className="dossier-svg"
                      />
                    )}
                    <span className="modal-reg tl">┌</span>
                    <span className="modal-reg tr">┐</span>
                    <span className="modal-reg bl">└</span>
                    <span className="modal-reg br">┘</span>
                  </div>
                </div>

                <div className="clean-modal-info">
                  <div className="modal-header-line">
                    <span className="modal-acc">{selectedArtifact.accession}</span>
                    <span className="modal-plate">{selectedArtifact.plate}</span>
                  </div>

                  <h2 className="modal-title-en">{selectedArtifact.titleEn}</h2>
                  <h3 className="modal-title-ar">{selectedArtifact.titleAr}</h3>
                  <span className="modal-dyad">{selectedArtifact.dyadEn}</span>

                  <div className="modal-button-stack">
                    <button
                      type="button"
                      className="clean-modal-btn primary"
                      onClick={() => triggerUploadForArtifact(selectedArtifact.id)}
                    >
                      {photos[selectedArtifact.id] ? 'CHANGE PICTURE' : '+ ADD PICTURE'}
                    </button>
                    {photos[selectedArtifact.id] && (
                      <button
                        type="button"
                        className="clean-modal-btn secondary"
                        onClick={() => resetPhoto(selectedArtifact.id)}
                      >
                        RESET TO SYMBOL
                      </button>
                    )}
                    <button
                      type="button"
                      className="clean-modal-btn dismiss"
                      onClick={() => setSelectedArtifact(null)}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
