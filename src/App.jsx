import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DallahPourSequence from './components/DallahPourSequence';
import SwordScratchEffect from './components/SwordScratchEffect';

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
  1: { rotate: '54deg', translateY: '9.5px', scale: 1.15 }, // Natural drag tilt: pommel kissing divider line, blade trailing gracefully behind leftward motion
  2: { rotate: '2deg', translateY: '0px', scale: 1.20 },    // Dallah (compensated for 20.6% transparent padding)
  3: { rotate: '-1deg', translateY: '0px', scale: 1.00 },   // Statue (fills 96.6% canvas)
  4: { rotate: '4deg', translateY: '0px', scale: 1.00 },    // Rose (fills 97.9% canvas)
  5: { rotate: '-2deg', translateY: '0px', scale: 0.98 },   // Keffiyeh / Shmag (fills 100% canvas)
  6: { rotate: '0deg', translateY: '0px', scale: 1.18 }     // Disk (compensated for 17.8% transparent padding)
};

export const ARCHIVE_ARTIFACTS = [
  {
    id: 1,
    number: '01',
    accession: 'ARC.01 / EXL',
    titleEn: 'THE SWORD',
    titleAr: 'السَّيْف',
    dyadEn: 'ENDURANCE',
    svgPath: '/archive/01-sword.png',
    plate: 'PLATE 01'
  },
  {
    id: 2,
    number: '02',
    accession: 'ARC.02 / DAL',
    titleEn: 'THE DALLAH',
    titleAr: 'الدَّلَّة',
    dyadEn: 'HOSPITALITY',
    svgPath: '/archive/02-dallah.png',
    plate: 'PLATE 02'
  },
  {
    id: 3,
    number: '03',
    accession: 'ARC.03 / PHL',
    titleEn: 'THE STATUE',
    titleAr: 'التِّمْثَال',
    dyadEn: 'PHILOSOPHY',
    svgPath: '/archive/03-statue.png',
    plate: 'PLATE 03'
  },
  {
    id: 4,
    number: '04',
    accession: 'ARC.04 / LIT',
    titleEn: 'THE ROSE',
    titleAr: 'الوَرْدَة',
    dyadEn: 'LONGING',
    svgPath: '/archive/04-rose.png',
    plate: 'PLATE 04'
  },
  {
    id: 5,
    number: '05',
    accession: 'ARC.05 / KEF',
    titleEn: 'THE KEFFIYEH',
    titleAr: 'الكُوفِيَّة',
    dyadEn: 'RESILIENCE',
    svgPath: '/archive/05-keffiyeh.png',
    plate: 'PLATE 05'
  },
  {
    id: 6,
    number: '06',
    accession: 'ARC.06 / DSK',
    titleEn: 'THE DISK',
    titleAr: 'الأُسْطُوَانَة',
    dyadEn: 'MELODY',
    svgPath: '/archive/disk.png',
    plate: 'PLATE 06'
  }
];

export default function App() {
  const [phase, setPhase] = useState('void');
  const [isHoverWinking, setIsHoverWinking] = useState(false);
  const [isDallahPouring, setIsDallahPouring] = useState(false);
  const [theme, setTheme] = useState('default'); // 'default' | 'coffee' | 'monochrome'
  const [previousTheme, setPreviousTheme] = useState('default');
  const navbarRef = useRef(null);

  // Synchronize unified theme to root and body attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    document.body.classList.remove('monochrome-theme', 'dallah-pour');
  }, [theme]);

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
    <div className="portfolio-wrapper" data-theme={theme}>
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
          top: phase === 'navbar' ? '42.5px' : '50%',
          left: phase === 'navbar' ? 'var(--nav-avatar-left, calc(2.5rem + 27.5px))' : '50%',
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
        <header className="navbar-header" ref={navbarRef}>
          <div className="avatar-placeholder" onClick={triggerWink} style={{ cursor: 'pointer' }} title="Codex Emblem" />
          
          {/* Continuous Seamless Infinite Moving Ribbon */}
          <div className="strip-viewport">
            <div className="strip-motion-track">
              {[0, 1].map((setIndex) => (
                <div key={'strip-set-' + setIndex} className="strip-specimen-group">
                  {ARCHIVE_ARTIFACTS.map((artifact, itemIndex) => {
                    const transform = ARTIFACT_EDITORIAL_TRANSFORMS[artifact.id] || { rotate: '0deg', translateY: '0px', scale: 1 };
                    
                    const isSword = artifact.id === 1;
                    const isShmag = artifact.id === 5;
                    const isDallah = artifact.id === 2;
                    
                    const handleInteraction = (e) => {
                      e.stopPropagation();
                      if (isSword) return; // Completely non-interactive
                      if (isShmag) {
                        if (theme === 'monochrome') {
                          // Smoothly revert to previous theme ('coffee' or 'default')
                          const restored = previousTheme === 'monochrome' ? 'default' : previousTheme;
                          setTheme(restored);
                        } else {
                          setPreviousTheme(theme);
                          setTheme('monochrome');
                        }
                      } else if (isDallah) {
                        if (!isDallahPouring) {
                          setIsDallahPouring(true);
                        }
                      }
                    };

                    return (
                      <React.Fragment key={'specimen-' + setIndex + '-' + artifact.id}>
                        {/* THE SPECIMEN PLATE */}
                        <div
                          className={`specimen-plate-container ${isShmag ? 'interest-shmag' : ''} ${isDallah ? 'interest-dallah' : ''} ${isSword ? 'sword-artifact' : ''}`}
                          onClick={handleInteraction}
                          role={(isShmag || isDallah) ? 'button' : undefined}
                          tabIndex={(isShmag || isDallah) ? 0 : undefined}
                          aria-label={isShmag ? 'Toggle Monochrome Theme' : isDallah ? 'Pour Dallah Coffee' : artifact.titleEn}
                          style={{
                            transform: `translateY(${transform.translateY}) rotate(${transform.rotate}) scale(${transform.scale})`,
                            zIndex: transform.zIndex || 1,
                            cursor: isSword ? 'default' : (isShmag || isDallah) ? 'pointer' : 'default',
                            pointerEvents: isSword ? 'none' : (isShmag || isDallah) ? 'auto' : 'none',
                          }}
                        >
                          {/* Specimen Artwork Frame */}
                          <div className="specimen-art-frame">
                            <img src={artifact.svgPath} alt={artifact.titleEn} className="specimen-graphic-svg pop-out-shader" />
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Friction Contact & Spark Trail Layer strictly contained inside navbar */}
          <SwordScratchEffect navbarRef={navbarRef} />
        </header>

        <main className="main-content">
          {/* CENTERED HERO SECTION - CLEAN & BOLD */}
          <section className="hero-section" id="hero">
            <h1 className="hero-title">ALAA</h1>
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

      {/* CINEMATIC DALLAH COFFEE POUR OVERLAY */}
      <DallahPourSequence
        isActive={isDallahPouring}
        onComplete={() => setIsDallahPouring(false)}
        currentTheme={theme}
        onThemeChange={(newTheme) => {
          setPreviousTheme(theme === 'monochrome' ? 'default' : theme);
          setTheme(newTheme);
        }}
      />
    </div>
  );
}
