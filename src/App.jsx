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
    sub: 'COLLECTION // SPECIMEN A'
  },
  {
    id: 'sep-2',
    numAr: '٠٢',
    numEn: '02',
    coord: 'BEIRUT // 33⅓ RPM',
    glyph: '⌖',
    ruleHeight: 135,
    sub: 'SHELLAC // MATRIX 74'
  },
  {
    id: 'sep-3',
    numAr: '٠٣',
    numEn: '03',
    coord: 'AXIS // PHL-III',
    glyph: '◇',
    ruleHeight: 95,
    sub: 'MARBLE // FRACTURE'
  },
  {
    id: 'sep-4',
    numAr: '٠٤',
    numEn: '04',
    coord: 'DAMASCUS // 1924',
    glyph: '⊙',
    ruleHeight: 125,
    sub: 'FOLIA // ROSA DAMASCENA'
  },
  {
    id: 'sep-5',
    numAr: '٠٥',
    numEn: '05',
    coord: 'EXL // 33°N LATITUDE',
    glyph: '+',
    ruleHeight: 145,
    sub: 'CHIVALRIC // SHAMSHIR'
  },
  {
    id: 'sep-6',
    numAr: '٠٦',
    numEn: '06',
    coord: 'ALEPPO // SEMA STUDY',
    glyph: '⌖',
    ruleHeight: 105,
    sub: 'ORBITAL // REVOLUTION'
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
    dyadEn: 'IDENTITY / BIOGRAPHY',
    dyadAr: 'الأَثَـرُ وَالسِّيرَة',
    classification: 'Wax & Brass Matrix // Intaglio Seal Impression',
    symbolism: 'Arabic Literary Heritage & Personal Sovereignty',
    quoteAr: 'مَنْ كَانَ بِلَا أَثَرٍ كَانَ كَمَنْ لَمْ يَعْبُر • خَاتَمُ السِّيرَةِ وَالمَحْفُوظَاتِ الخَاصَّةِ لِتَوْثِيقِ الوُجُودِ فِي مُوَاجَهَةِ الفَنَاءِ.',
    quoteEn: 'He who leaves no trace walks as though he never crossed. The seal of private codices, forging biography against oblivion.',
    svgPath: '/archive/01-seal.svg',
    plate: 'PLATE 01'
  },
  {
    id: 2,
    number: '02',
    accession: 'ARC.02 / SND',
    titleEn: 'THE VINYL',
    titleAr: 'الأُسْطُوَانَة',
    dyadEn: 'SOLITUDE / MUSIC / MEMORY',
    dyadAr: 'العُزْلَةُ وَالصَّوْتُ وَالذَّاكِرَة',
    classification: 'Beirut 1974 // Shellac Micro-Groove Disc • 33⅓ RPM',
    symbolism: 'Vintage Lebanese Music Culture & Melancholic Solitude',
    quoteAr: 'صَوْتٌ خَارِجٌ مِنْ رُكَامِ بَيْرُوتَ القَدِيمَة؛ حَيْثُ تَلْتَقِي نَبْرَةُ فَيْرُوز بِعُزْلَةِ زِيَاد، مَحْفُورَةً فِي دَوَرَانِ أُسْطُوَانَةٍ لَا تَتَوَقَّف.',
    quoteEn: 'A sound rising from the rubble of old Beirut; where Fairouz\'s longing meets Ziad\'s quiet despair, pressed into infinite rotations.',
    svgPath: '/archive/02-vinyl.svg',
    plate: 'PLATE 02'
  },
  {
    id: 3,
    number: '03',
    accession: 'ARC.03 / PHL',
    titleEn: 'THE BUST',
    titleAr: 'التِّمْثَال',
    dyadEn: 'PHILOSOPHY / FRACTURED THOUGHT',
    dyadAr: 'الفِكْرُ الكَلَاسِيكِيُّ وَالشَّتَات',
    classification: 'Levantine Antique Cast // Bisected Marble Profile',
    symbolism: 'Classical Philosophy & Existential Literature (Averroes / Camus)',
    quoteAr: 'أَنَا أُفَكِّرُ إِذَنْ أَنَا مَنْفِيّ • حِوَارٌ بَيْنَ رُشْدِيَّةِ القُرْطُبِيِّ وَعَدَمِيَّةِ الغُرَبَاءِ؛ فِكْرٌ مَشْطُورٌ وَعَقْلٌ يَسْكُنُ الشَّتَات.',
    quoteEn: 'I think, therefore I am exiled. Classical intellect cleaved by existential doubt; the mind as an unresolved fracture.',
    svgPath: '/archive/03-bust.svg',
    plate: 'PLATE 03'
  },
  {
    id: 4,
    number: '04',
    accession: 'ARC.04 / LIT',
    titleEn: 'THE ROSE',
    titleAr: 'الوَرْدَة',
    dyadEn: 'LOVE / LONGING / POETRY',
    dyadAr: 'الشَّوْقُ وَالغَزَلُ وَالشِّعْر',
    classification: 'Herbarium Specimen // Woodcut Engraving (Rosa Damascena)',
    symbolism: 'Classical Botanical Engraving & Levantine Poetic Ghazal',
    quoteAr: 'يَا نَاعِماً كَالشَّوْكِ فِي كَبِدِي • وَرْدَةٌ دِمَشْقِيَّةٌ بَرِّيَّةٌ صَلْبَة؛ شَوْكُهَا حَادٌّ كَالحَنِين، وَأَوْرَاقُهَا سُطُورُ غَزَلٍ لَمْ يَكْتَمِل.',
    quoteEn: 'O gentle as the thorn in my breast. A wild Damascene briar; love stripped of sentimentality, sharp with the pain of longing.',
    svgPath: '/archive/04-rose.svg',
    plate: 'PLATE 04'
  },
  {
    id: 5,
    number: '05',
    accession: 'ARC.05 / EXL',
    titleEn: 'THE SWORD',
    titleAr: 'السَّيْف',
    dyadEn: 'EXILE / ENDURANCE / WANDERING',
    dyadAr: 'الفُرُوسِيَّةُ وَالصَّبْرُ وَالتِّيه',
    classification: 'Damascene High-Carbon Steel // Shamshir Blade',
    symbolism: 'Arab Chivalric Symbolism & Chivalric Code (Al-Mutanabbi)',
    quoteAr: 'وَالصَّبْرُ أَمْضَى مِنْ حُسَامِ التِّيهِ • سَيْفٌ مَشْرِقِيٌّ لَمْ يُشْهَرْ لِغَزْوٍ بَلْ لِصَلَابَةِ الرُّوحِ فِي مَفَازَاتِ التَّشَرُّدِ وَالغُرْبَة.',
    quoteEn: 'Endurance is keener than the blade of wandering. The curved steel of chivalric patience across deserts of solitary exile.',
    svgPath: '/archive/05-sword.svg',
    plate: 'PLATE 05'
  },
  {
    id: 6,
    number: '06',
    accession: 'ARC.06 / SFM',
    titleEn: 'THE DERVISH',
    titleAr: 'الدَّرْوِيش',
    dyadEn: 'TRANSCENDENCE / MOVEMENT / SURRENDER',
    dyadAr: 'الوَجْدُ وَالفَنَاءُ وَالارْتِقَاء',
    classification: 'Kinetic Architectural Study // Aleppo Sema Archive 1912',
    symbolism: 'Sufi Architectural Movement & Cosmic Centrifugal Rotation',
    quoteAr: 'فَلَا شَيْءَ فِي الوُجُودِ إِلَّا الحُضُور • دَوَرَانٌ صُوفِيٌّ هَنْدَسِيٌّ يَخْلَعُ ثِقَلَ المَادَّة؛ يَدٌ تَسْتَقْبِلُ السَّمَاءَ وَيَدٌ تُفِيضُ عَلَى التُّرَاب.',
    quoteEn: 'Nothing exists except the Presence. The geometry of spiritual ecstasy; the body becoming pure architectural velocity.',
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
  // Double array for seamless infinite marquee loop
  const marqueeItems = [...ARCHIVE_ARTIFACTS, ...ARCHIVE_ARTIFACTS];

  return (
    <div className="portfolio-wrapper">
      {/* CONTINUOUS LOGO / AVATAR LAYER (Pure Black Ink Archival Founder Silhouette) */}
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
        {/* Top Archival Navigation Bar */}
        <header className="navbar-header">
          <div className="avatar-placeholder" onClick={triggerWink} style={{ cursor: 'pointer' }} title="Codex Emblem" />
          <div className="nav-brand">
            <span className="nav-brand-title">THE ARCHIVE</span>
            <span className="nav-brand-arabic">الأَرْشِيفُ الشَّخْصِيُّ</span>
          </div>
          <nav className="nav-links">
            <a href="#hero">Genesis</a>
            <a href="#marquee-strip">Codex Strip</a>
            <a href="#catalogue">Index</a>
            <a href="#manifesto">Manifesto</a>
            <a href="#colophon">Colophon</a>
          </nav>
        </header>

        <main className="main-content">
          {/* CENTERED HERO SECTION - THE ARCHIVE / ALAA */}
          <section className="hero-section" id="hero">
            <div className="archival-stamp-badge">
              <span className="badge-reg">+</span>
              <span className="badge-text">ACCESSION NO. 2026 // CODEX ALAA</span>
              <span className="badge-arabic">المَحْفُوظَاتُ الخَاصَّة</span>
              <span className="badge-reg">+</span>
            </div>

            <h1 className="hero-title">ALAA</h1>

            <div className="hero-tagline-wrap">
              <p className="hero-tagline-ar">
                مَجْمُوعَةٌ أَرْشِيفِيَّةٌ تَجْمَعُ بَيْنَ الفُرُوسِيَّةِ، الفِكْرِ الكَلَاسِيكِيِّ، وَالصَّوْتِ اللُّبْنَانِيِّ القَدِيم
              </p>
              <p className="hero-tagline-en">
                A monochrome personal codex forged in pure black and white. Blending Arabic literary heritage, classical philosophy, archival printmaking, and brutalist high-fashion editorial silhouettes.
              </p>
            </div>

            {/* Archival Specification Bar */}
            <div className="archival-spec-bar">
              <div className="spec-item">
                <span className="spec-label">MEDIUM</span>
                <span className="spec-val">INTAGLIO & WOODCUT</span>
              </div>
              <div className="spec-divider">/</div>
              <div className="spec-item">
                <span className="spec-label">PALETTE</span>
                <span className="spec-val">PURE BLACK & PURE WHITE</span>
              </div>
              <div className="spec-divider">/</div>
              <div className="spec-item">
                <span className="spec-label">SYMBOLS</span>
                <span className="spec-val">VI ARCHIVAL PLATES</span>
              </div>
              <div className="spec-divider">/</div>
              <div className="spec-item">
                <span className="spec-label">CURATION</span>
                <span className="spec-val">ALAA ESTATE // MMXXVI</span>
              </div>
            </div>
          </section>

          {/* ==========================================================================
          EXPERIMENTAL FASHION EDITORIAL STRIP (CONTINUOUS MOVING ARCHIVE MARQUEE)
          Order: SEAL → VINYL → BUST → ROSE → SWORD → DERVISH → repeat
          ========================================================================== */}
          <section className="archive-strip-section" id="marquee-strip">
            {/* Minimalist Archival Header Ribbon */}
            <div className="strip-editorial-header">
              <div className="strip-header-left">
                <span className="strip-reg-tick">+</span>
                <span className="strip-header-label">THE ARCHIVE // CONTINUOUS CODEX STRIP</span>
                <span className="strip-header-ar">شَرِيطُ المَحْفُوظَاتِ المَسْتُورَة</span>
              </div>
              <div className="strip-header-right">
                <span className="strip-order-guide">SEAL → VINYL → BUST → ROSE → SWORD → DERVISH</span>
                <span className="strip-reg-tick">+</span>
              </div>
            </div>

            {/* Continuous Seamless Infinite Moving Ribbon (Left to Right) */}
            <div className="strip-viewport">
              <div className="strip-motion-track">
                {/* We render Set A and Set B for 100% seamless linear infinite loop */}
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
                            {/* Specimen Fine Header */}
                            <div className="specimen-plate-header">
                              <span className="specimen-acc">{artifact.accession}</span>
                              <span className="specimen-ar-kicker">{artifact.titleAr}</span>
                            </div>

                            {/* Specimen Artwork Floating in Generous Whitespace */}
                            <div className="specimen-art-frame">
                              {hasCustom ? (
                                <img src={photos[artifact.id]} alt={artifact.titleEn} className="specimen-graphic-img" />
                              ) : (
                                <img src={artifact.svgPath} alt={artifact.titleEn} className="specimen-graphic-svg" />
                              )}

                              {/* Subtle Corner Registration Ticks */}
                              <span className="specimen-tick tl">┌</span>
                              <span className="specimen-tick tr">┐</span>
                              <span className="specimen-tick bl">└</span>
                              <span className="specimen-tick br">┘</span>

                              {/* Hover Archival Inspection Tooltip */}
                              <div className="specimen-hover-cue">
                                <span className="cue-action">[ EXAMINE DOSSIER ]</span>
                                <span className="cue-sub">Click to inspect artifact</span>
                              </div>
                            </div>

                            {/* Understated Physical Print Label */}
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
                            {/* Top Arabic Numeral */}
                            <span className="sep-num-ar">{sep.numAr}</span>

                            {/* Thin Vertical Rule with Subtle Registration Glyph */}
                            <div className="sep-rule-assembly" style={{ height: `${sep.ruleHeight}px` }}>
                              <div className="sep-hairline top" />
                              <div className="sep-glyph-node">
                                <span className="sep-symbol">{sep.glyph}</span>
                              </div>
                              <div className="sep-hairline bottom" />
                            </div>

                            {/* Micro Typographic Coordinates & Notes */}
                            <div className="sep-meta-stack">
                              <span className="sep-coord-text">{sep.coord}</span>
                              <span className="sep-sub-text">{sep.sub}</span>
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

            {/* Minimalist Archival Footer Ribbon */}
            <div className="strip-editorial-footer">
              <span className="strip-footer-reg">⌖</span>
              <span className="strip-footer-mono">MONOCHROME INTAGLIO SPECIMEN REEL • CONTINUOUS HORIZONTAL FLOW</span>
              <span className="strip-footer-pause-note">HOVER SPECIMEN TO PAUSE • CLICK TO OPEN CURATED DOSSIER</span>
              <span className="strip-footer-reg">⌖</span>
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

          {/* THE CATALOGUE INDEX - 6 BESPOKE ARCHIVAL PLATES GRID */}
          <section className="catalogue-section" id="catalogue">
            <div className="catalogue-header">
              <div className="cat-title-block">
                <span className="cat-kicker">MUSEUM CODEX CATALOGUE</span>
                <h2 className="cat-heading">THE RECURRING SYMBOLS</h2>
                <p className="cat-arabic-desc">
                  كُلُّ رَمْزٍ هُوَ قِطْعَةٌ أَثَرِيَّةٌ مِنْ أَرْشِيفٍ وَاحِد: هُوِيَّة، عُزْلَة، فِكْر، شَوْق، صَبْر، وَوَجْد.
                </p>
              </div>
              <div className="cat-stamp-box">
                <span className="stamp-title">PRINT CERTIFICATE</span>
                <span className="stamp-sub">STRICT MONOCHROME ONLY</span>
                <span className="stamp-code">NO GRADIENT // NO COLOR</span>
              </div>
            </div>

            <div className="catalogue-grid">
              {ARCHIVE_ARTIFACTS.map((artifact) => {
                const hasCustom = Boolean(photos[artifact.id]);
                return (
                  <article
                    key={'cat-' + artifact.id}
                    className="catalogue-entry"
                    onClick={() => handleCardClick(artifact)}
                  >
                    <div className="entry-frame">
                      {hasCustom ? (
                        <img src={photos[artifact.id]} alt={artifact.titleEn} className="entry-img" />
                      ) : (
                        <img src={artifact.svgPath} alt={artifact.titleEn} className="entry-svg" />
                      )}

                      <span className="entry-reg tl">┌</span>
                      <span className="entry-reg tr">┐</span>
                      <span className="entry-reg bl">└</span>
                      <span className="entry-reg br">┘</span>

                      <div className="entry-plate-tag">{artifact.plate}</div>
                    </div>

                    <div className="entry-meta">
                      <div className="entry-top">
                        <span className="entry-accession">{artifact.accession}</span>
                        <span className="entry-arabic-name">{artifact.titleAr}</span>
                      </div>
                      <h3 className="entry-title">{artifact.titleEn}</h3>
                      <h4 className="entry-dyad">{artifact.dyadEn}</h4>
                      <p className="entry-quote-ar">{artifact.quoteAr}</p>
                      <p className="entry-quote-en">"{artifact.quoteEn}"</p>

                      <div className="entry-actions">
                        <button
                          type="button"
                          className="btn-inspect"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(artifact);
                          }}
                        >
                          EXAMINE ARTIFACT →
                        </button>
                        <button
                          type="button"
                          className="btn-upload"
                          onClick={(e) => triggerUploadForArtifact(artifact.id, e)}
                        >
                          {hasCustom ? 'EDIT PHOTO' : 'REPLACE PIC'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* MANIFESTO / PHILOSOPHY STATEMENT */}
          <section className="manifesto-section" id="manifesto">
            <div className="manifesto-inner">
              <span className="manifesto-tag">ARCHIVAL MANIFESTO // المَانِفِسْتُو</span>
              <h2 className="manifesto-title">
                ON THE POETICS OF THE MONOCHROME ARCHIVE
              </h2>
              <div className="manifesto-columns">
                <div className="manifesto-col">
                  <h4 className="col-subheading">I. THE PURITY OF BLACK INK</h4>
                  <p className="col-text">
                    Color is an ephemeral distraction. By reducing the visual architecture to pure black and pure white, every silhouette carries the moral weight of a carved monument. In the tradition of early Arabic lithography and classical woodcut printing, negative space is not emptiness—it is the breath that allows thought to endure.
                  </p>
                  <p className="col-arabic">
                    السَّوَادُ لَيْسَ غِيَاباً لِلضَّوْءِ، بَلْ هُوَ ثِقَلُ الحِبْرِ عَلَى مَدَارِ الزَّمَان. وَالبَيَاضُ هُوَ الصَّمْتُ الَّذِي يَسْمَحُ لِلْمَعْنَى بِالحُضُور.
                  </p>
                </div>
                <div className="manifesto-col">
                  <h4 className="col-subheading">II. THE CHIVALRIC CODEX</h4>
                  <p className="col-text">
                    From the tragic stoicism of pre-Islamic poetry to the existential exile of Beirut’s vinyl echoes, this archive stands at the intersection of literary severity and modern luxury. The seal represents our name; the sword, our endurance; the dervish, our ultimate surrender to the infinite.
                  </p>
                  <p className="col-arabic">
                    مِنْ سَيْفِ المُتَنَبِّي إِلَى أُسْطُوَانَةِ بَيْرُوت، تَتَشَكَّلُ هَذِهِ المَحْفُوظَاتُ كَمَقَامٍ أَدَبِيٍّ مُعَاصِرٍ يُخَاطِبُ عَيْنَ الحَاضِرِ بِصَلَابَةِ الأَمْس.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* COLOPHON / PRINT RECORD FOOTER */}
          <footer className="colophon-section" id="colophon">
            <div className="colophon-grid">
              <div className="colophon-block">
                <span className="col-label">ESTATE</span>
                <p className="col-val">THE PERSONAL ARCHIVE OF ALAA</p>
                <p className="col-val-sub">BEIRUT • MILAN • PARIS</p>
              </div>
              <div className="colophon-block">
                <span className="col-label">CATALOGUE STATUS</span>
                <p className="col-val">CODEX MMXXVI // VOL. I</p>
                <p className="col-val-sub">REGISTERED MONOCHROME REPOSITORY</p>
              </div>
              <div className="colophon-block">
                <span className="col-label">TYPOGRAPHY</span>
                <p className="col-val">AMIRI • CINZEL • SPACE MONO</p>
                <p className="col-val-sub">BULAQ PRESS & ROMAN EPIGRAPHY</p>
              </div>
              <div className="colophon-block">
                <span className="col-label">DISCIPLINE</span>
                <p className="col-val">STRICT BLACK & WHITE</p>
                <p className="col-val-sub">ZERO GRADIENTS // ZERO TONES</p>
              </div>
            </div>

            <div className="colophon-bottom">
              <div className="bottom-left">
                <span className="seal-tick">⌖</span>
                <span>COPYRIGHT © MMXXVI THE ARCHIVE. ALL RIGHTS PRESERVED.</span>
              </div>
              <div className="bottom-right">
                <span className="ar-colophon">حُفِظَتْ هَذِهِ المَحْفُوظَاتُ بِحِبْرٍ أَسْوَدَ لَا يَبِيد</span>
              </div>
            </div>
          </footer>
        </main>
      </motion.div>

      {/* ARCHIVAL DOSSIER MODAL (Full Screen Inspection Dialog) */}
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
              {/* Modal Close Button */}
              <button
                type="button"
                className="dossier-close"
                onClick={() => setSelectedArtifact(null)}
                title="Close dossier"
              >
                ✕
              </button>

              <div className="dossier-layout">
                {/* Visual Plate Column */}
                <div className="dossier-visual">
                  <div className="dossier-frame">
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

                  <div className="dossier-photo-tools">
                    <button
                      type="button"
                      className="dossier-action-btn"
                      onClick={() => triggerUploadForArtifact(selectedArtifact.id)}
                    >
                      {photos[selectedArtifact.id] ? 'REPLACE CUSTOM PHOTO' : '+ UPLOAD CUSTOM PHOTO'}
                    </button>
                    {photos[selectedArtifact.id] && (
                      <button
                        type="button"
                        className="dossier-action-btn secondary"
                        onClick={() => resetPhoto(selectedArtifact.id)}
                      >
                        REVERT TO ARCHIVAL EMBLEM
                      </button>
                    )}
                  </div>
                </div>

                {/* Archival Record Details Column */}
                <div className="dossier-content">
                  <div className="dossier-acc-header">
                    <span className="dossier-acc-code">{selectedArtifact.accession}</span>
                    <span className="dossier-plate-no">{selectedArtifact.plate} OF VI</span>
                  </div>

                  <h2 className="dossier-ar-title">{selectedArtifact.titleAr}</h2>
                  <h3 className="dossier-en-title">{selectedArtifact.titleEn}</h3>
                  <h4 className="dossier-dyad-title">{selectedArtifact.dyadEn}</h4>

                  <div className="dossier-info-table">
                    <div className="table-row">
                      <span className="row-k">CLASSIFICATION</span>
                      <span className="row-v">{selectedArtifact.classification}</span>
                    </div>
                    <div className="table-row">
                      <span className="row-k">ART DIRECTION</span>
                      <span className="row-v">{selectedArtifact.symbolism}</span>
                    </div>
                    <div className="table-row">
                      <span className="row-k">AUTHENTICITY</span>
                      <span className="row-v">PURE BLACK & WHITE // VECTOR INTAGLIO</span>
                    </div>
                  </div>

                  <div className="dossier-quote-block">
                    <p className="dossier-quote-ar">{selectedArtifact.quoteAr}</p>
                    <p className="dossier-quote-en">"{selectedArtifact.quoteEn}"</p>
                  </div>

                  <div className="dossier-stamp-footer">
                    <div className="stamp-seal">
                      <span>VERIFIED ARTIFACT</span>
                      <span>CODEX ALAA // MMXXVI</span>
                    </div>
                    <button
                      type="button"
                      className="dossier-dismiss-btn"
                      onClick={() => setSelectedArtifact(null)}
                    >
                      CLOSE EXAMINATION
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
