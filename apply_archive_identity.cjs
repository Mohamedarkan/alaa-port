const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// 1. Update index.html
const indexHtmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/archive/01-seal.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>THE ARCHIVE // الأرشيف الشخصي — ALAA</title>
    <!-- Google Fonts: Amiri (Arabic heritage), Cinzel (Brutalist Roman), Space Mono (Archival Monospace) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cinzel:wght@400;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtmlContent, 'utf8');
if (fs.existsSync(path.join(rootDir, 'portfolio', 'index.html'))) {
  fs.writeFileSync(path.join(rootDir, 'portfolio', 'index.html'), indexHtmlContent, 'utf8');
}
console.log('index.html updated with Google Fonts and Archival Title');

// 2. src/App.jsx
const appJsxContent = `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    quoteEn: 'A sound rising from the rubble of old Beirut; where Fairouz\\'s longing meets Ziad\\'s quiet despair, pressed into infinite rotations.',
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

          {/* HORIZONTAL MOVING ARTIFACT STRIP (LEFT TO RIGHT) */}
          <section className="marquee-section" id="marquee-strip">
            <div className="section-header">
              <div className="section-title-wrap">
                <span className="section-num">ARCHIVE STRIP // 01 — 06</span>
                <h2 className="section-title">THE SIX PLATES • اللَّوْحَاتُ السِّتّ</h2>
              </div>
              <div className="marquee-actions">
                <span className="marquee-hint">← GLIDING LEFT TO RIGHT • CLICK TO INSPECT DOSSIER</span>
              </div>
            </div>

            <div className="marquee-container">
              <div className="marquee-track">
                {marqueeItems.map((item, index) => {
                  const hasCustom = Boolean(photos[item.id]);
                  return (
                    <div
                      key={'marquee-' + item.id + '-' + index}
                      className="marquee-card"
                      onClick={() => handleCardClick(item)}
                      title="Click to inspect archival dossier"
                    >
                      {/* Card Media Container */}
                      <div className="card-media">
                        {hasCustom ? (
                          <img src={photos[item.id]} alt={item.titleEn} className="card-img" />
                        ) : (
                          <div className="card-svg-wrap">
                            <img src={item.svgPath} alt={item.titleEn} className="card-svg-asset" />
                          </div>
                        )}

                        {/* Corner Archival Registration Ticks */}
                        <span className="card-reg top-left">┌</span>
                        <span className="card-reg top-right">┐</span>
                        <span className="card-reg bottom-left">└</span>
                        <span className="card-reg bottom-right">┘</span>

                        {/* Top Accession Stamp */}
                        <div className="card-header-badge">
                          <span className="badge-acc">{item.accession}</span>
                          <span className="badge-ar-name">{item.titleAr}</span>
                        </div>

                        {/* Hover Overlay with Action Buttons */}
                        <div className="card-hover-overlay">
                          <button
                            type="button"
                            className="overlay-btn primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(item);
                            }}
                          >
                            INSPECT DOSSIER
                          </button>
                          <button
                            type="button"
                            className="overlay-btn secondary"
                            onClick={(e) => triggerUploadForArtifact(item.id, e)}
                            title="Replace slot with custom photograph"
                          >
                            {hasCustom ? 'CHANGE PHOTO' : '+ ADD PHOTO'}
                          </button>
                          {hasCustom && (
                            <button
                              type="button"
                              className="overlay-btn reset"
                              onClick={(e) => resetPhoto(item.id, e)}
                            >
                              RESET EMBLEM
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Card Information Footer */}
                      <div className="card-info">
                        <div className="card-title-row">
                          <span className="card-plate">{item.number} / VI</span>
                          <span className="card-name">{item.titleEn}</span>
                          <span className="card-arabic-title">{item.titleAr}</span>
                        </div>
                        <span className="card-dyad">{item.dyadEn}</span>
                        <span className="card-class">{item.classification}</span>
                      </div>
                    </div>
                  );
                })}
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
`;

fs.writeFileSync(path.join(rootDir, 'src', 'App.jsx'), appJsxContent, 'utf8');
if (fs.existsSync(path.join(rootDir, 'portfolio', 'src', 'App.jsx'))) {
  fs.writeFileSync(path.join(rootDir, 'portfolio', 'src', 'App.jsx'), appJsxContent, 'utf8');
}
console.log('src/App.jsx updated with The Archive visual identity');

// 3. src/index.css
const indexCssContent = `/* ==========================================================================
   THE ARCHIVE — PURE BLACK & PURE WHITE VISUAL IDENTITY
   Strict Monochrome Design System: #000000 & #FFFFFF Only.
   No Gradients. No Color. Archival Intaglio & Woodcut Printmaking.
   ========================================================================== */

:root {
  --ink: #000000;
  --paper: #ffffff;
  --font-serif: 'Cinzel', serif;
  --font-arabic: 'Amiri', 'Traditional Arabic', serif;
  --font-mono: 'Space Mono', monospace;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: var(--paper);
  color: var(--ink);
  font-family: var(--font-serif);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* ==========================================================================
   PORTFOLIO WRAPPER & AVATAR INTEGRATION
   ========================================================================== */
.portfolio-wrapper {
  min-height: 100vh;
  position: relative;
  background-color: var(--paper);
}

.avatar-container {
  position: fixed;
  z-index: 100;
  width: 480px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
}

.content-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ==========================================================================
   NAVBAR (ARCHIVAL HEADER)
   ========================================================================== */
.navbar-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  background-color: var(--paper);
  border-bottom: 2px solid var(--ink);
  z-index: 50;
}

.avatar-placeholder {
  width: 55px;
  height: 55px;
  flex-shrink: 0;
}

.nav-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1.5rem;
}

.nav-brand-title {
  font-family: var(--font-serif);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: var(--ink);
  text-transform: uppercase;
}

.nav-brand-arabic {
  font-family: var(--font-arabic);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.05em;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-links a {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--ink);
  text-decoration: none;
  position: relative;
  padding: 4px 0;
  transition: opacity 0.2s ease;
}

.nav-links a:hover {
  text-decoration: underline;
  text-underline-offset: 6px;
}

/* ==========================================================================
   MAIN CONTENT CONTAINER
   ========================================================================== */
.main-content {
  padding-top: 10rem;
  padding-bottom: 8rem;
  width: 100%;
}

/* ==========================================================================
   CENTERED HERO SECTION
   ========================================================================== */
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 7rem;
  padding: 0 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.archival-stamp-badge {
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
  border: 1px solid var(--ink);
  padding: 6px 18px;
  margin-bottom: 2.5rem;
  background-color: var(--paper);
}

.badge-reg {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
}

.badge-text {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.badge-arabic {
  font-family: var(--font-arabic);
  font-size: 13px;
  font-weight: 700;
  border-left: 1px solid var(--ink);
  padding-left: 1rem;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(5.5rem, 17vw, 14rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.82;
  text-align: center;
  margin: 0 0 2rem 0;
  color: var(--ink);
}

.hero-tagline-wrap {
  max-width: 760px;
  margin: 0 auto 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hero-tagline-ar {
  font-family: var(--font-arabic);
  font-size: 1.35rem;
  line-height: 1.8;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

.hero-tagline-en {
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--ink);
  letter-spacing: 0.04em;
  margin: 0;
  font-weight: 400;
}

.archival-spec-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  padding: 1rem 2rem;
  width: 100%;
  max-width: 900px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.spec-label {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink);
}

.spec-val {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
}

.spec-divider {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
}

/* ==========================================================================
   HORIZONTAL MOVING CAROUSEL (GLIDES LEFT TO RIGHT)
   ========================================================================== */
.marquee-section {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
  padding: 4rem 0 6rem 0;
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  background-color: var(--paper);
}

.section-header {
  max-width: 1400px;
  margin: 0 auto 2.5rem auto;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.section-title-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-num {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--ink);
  text-transform: uppercase;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--ink);
  margin: 0;
}

.marquee-hint {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.marquee-track {
  display: flex;
  gap: 2.5rem;
  width: max-content;
  /* Continuously glides horizontally from Left to Right */
  animation: scroll-left-to-right 38s linear infinite;
  will-change: transform;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes scroll-left-to-right {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

/* ==========================================================================
   MARQUEE CARD COMPONENT (INTAGLIO ARCHIVAL PLATE)
   ========================================================================== */
.marquee-card {
  width: 310px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.marquee-card:hover {
  transform: translateY(-8px);
}

.card-media {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--paper);
  border: 2px solid var(--ink);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-svg-wrap {
  width: 100%;
  height: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--paper);
}

.card-svg-asset {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Corner registration marks */
.card-reg {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1;
  pointer-events: none;
}
.card-reg.top-left { top: 6px; left: 6px; }
.card-reg.top-right { top: 6px; right: 6px; }
.card-reg.bottom-left { bottom: 6px; left: 6px; }
.card-reg.bottom-right { bottom: 6px; right: 6px; }

.card-header-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}

.badge-acc {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  background-color: var(--paper);
  padding: 2px 6px;
  border: 1px solid var(--ink);
}

.badge-ar-name {
  font-family: var(--font-arabic);
  font-size: 12px;
  font-weight: 700;
  background-color: var(--paper);
  padding: 1px 6px;
  border: 1px solid var(--ink);
}

/* Card Hover Overlay */
.card-hover-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.96);
  border: 2px solid var(--ink);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.marquee-card:hover .card-hover-overlay {
  opacity: 1;
}

.overlay-btn {
  width: 100%;
  max-width: 200px;
  padding: 10px 16px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  border: 2px solid var(--ink);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.overlay-btn.primary {
  background-color: var(--ink);
  color: var(--paper);
}
.overlay-btn.primary:hover {
  background-color: var(--paper);
  color: var(--ink);
}

.overlay-btn.secondary {
  background-color: var(--paper);
  color: var(--ink);
}
.overlay-btn.secondary:hover {
  background-color: var(--ink);
  color: var(--paper);
}

.overlay-btn.reset {
  background: none;
  border: none;
  font-size: 9px;
  text-decoration: underline;
  color: var(--ink);
  cursor: pointer;
}

/* Card Info Row */
.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.card-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.card-plate {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--ink);
}

.card-name {
  font-family: var(--font-serif);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--ink);
}

.card-arabic-title {
  font-family: var(--font-arabic);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
}

.card-dyad {
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink);
}

.card-class {
  font-family: var(--font-serif);
  font-size: 11px;
  color: var(--ink);
  font-style: italic;
}

/* ==========================================================================
   CATALOGUE INDEX SECTION
   ========================================================================== */
.catalogue-section {
  max-width: 1400px;
  margin: 6rem auto;
  padding: 0 3rem;
}

.catalogue-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 2rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.cat-title-block {
  max-width: 700px;
}

.cat-kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.cat-heading {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 900;
  letter-spacing: 0.04em;
  margin: 0.5rem 0 1rem 0;
}

.cat-arabic-desc {
  font-family: var(--font-arabic);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.8;
  margin: 0;
}

.cat-stamp-box {
  border: 2px solid var(--ink);
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

.stamp-title {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.stamp-sub, .stamp-code {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.15em;
}

.catalogue-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.catalogue-entry {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: pointer;
  border: 1px solid var(--ink);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.catalogue-entry:hover {
  transform: translateY(-6px);
  box-shadow: 8px 8px 0px var(--ink);
}

.entry-frame {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 2px solid var(--ink);
  position: relative;
  background-color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.entry-svg, .entry-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.entry-reg {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
}
.entry-reg.tl { top: 6px; left: 6px; }
.entry-reg.tr { top: 6px; right: 6px; }
.entry-reg.bl { bottom: 6px; left: 6px; }
.entry-reg.br { bottom: 6px; right: 6px; }

.entry-plate-tag {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  background-color: var(--paper);
  border: 1px solid var(--ink);
  padding: 2px 6px;
}

.entry-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.entry-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entry-accession {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.entry-arabic-name {
  font-family: var(--font-arabic);
  font-size: 15px;
  font-weight: 700;
}

.entry-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin: 0;
}

.entry-dyad {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin: 0;
}

.entry-quote-ar {
  font-family: var(--font-arabic);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.7;
  margin: 0.5rem 0 0 0;
}

.entry-quote-en {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  line-height: 1.6;
  font-style: italic;
  margin: 0;
}

.entry-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ink);
}

.btn-inspect {
  flex: 1;
  padding: 8px 12px;
  background-color: var(--ink);
  color: var(--paper);
  border: 1px solid var(--ink);
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
}

.btn-inspect:hover {
  background-color: var(--paper);
  color: var(--ink);
}

.btn-upload {
  padding: 8px 12px;
  background-color: var(--paper);
  color: var(--ink);
  border: 1px solid var(--ink);
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
}

.btn-upload:hover {
  background-color: var(--ink);
  color: var(--paper);
}

/* ==========================================================================
   MANIFESTO SECTION
   ========================================================================== */
.manifesto-section {
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  padding: 6rem 3rem;
  background-color: var(--paper);
}

.manifesto-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.manifesto-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.manifesto-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: 0.04em;
  margin: 1rem 0 3.5rem 0;
}

.manifesto-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.col-subheading {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin: 0 0 1.25rem 0;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 0.5rem;
}

.col-text {
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.8;
  margin: 0 0 1.5rem 0;
}

.col-arabic {
  font-family: var(--font-arabic);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.9;
  margin: 0;
}

/* ==========================================================================
   COLOPHON / FOOTER
   ========================================================================== */
.colophon-section {
  max-width: 1400px;
  margin: 6rem auto 0 auto;
  padding: 0 3rem 4rem 3rem;
}

.colophon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  border-top: 2px solid var(--ink);
  padding-top: 3rem;
  margin-bottom: 4rem;
}

.col-label {
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.5rem;
}

.col-val {
  font-family: var(--font-serif);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin: 0 0 4px 0;
}

.col-val-sub {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  margin: 0;
}

.colophon-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--ink);
  padding-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.bottom-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
}

.seal-tick {
  font-size: 14px;
}

.ar-colophon {
  font-family: var(--font-arabic);
  font-size: 14px;
  font-weight: 700;
}

/* ==========================================================================
   ARCHIVAL DOSSIER MODAL
   ========================================================================== */
.dossier-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.88);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.dossier-modal {
  background-color: var(--paper);
  border: 3px solid var(--ink);
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 3rem;
  box-shadow: 16px 16px 0px #000000;
}

.dossier-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border: 2px solid var(--ink);
  background-color: var(--paper);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dossier-close:hover {
  background-color: var(--ink);
  color: var(--paper);
}

.dossier-layout {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 3.5rem;
  align-items: start;
}

.dossier-visual {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dossier-frame {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 2px solid var(--ink);
  position: relative;
  background-color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.dossier-svg, .dossier-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modal-reg {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 700;
}
.modal-reg.tl { top: 8px; left: 8px; }
.modal-reg.tr { top: 8px; right: 8px; }
.modal-reg.bl { bottom: 8px; left: 8px; }
.modal-reg.br { bottom: 8px; right: 8px; }

.dossier-photo-tools {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dossier-action-btn {
  width: 100%;
  padding: 10px 16px;
  background-color: var(--ink);
  color: var(--paper);
  border: 2px solid var(--ink);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
}

.dossier-action-btn:hover {
  background-color: var(--paper);
  color: var(--ink);
}

.dossier-action-btn.secondary {
  background-color: var(--paper);
  color: var(--ink);
}

.dossier-action-btn.secondary:hover {
  background-color: var(--ink);
  color: var(--paper);
}

.dossier-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dossier-acc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 0.75rem;
}

.dossier-acc-code, .dossier-plate-no {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.dossier-ar-title {
  font-family: var(--font-arabic);
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0.5rem 0 0 0;
  line-height: 1.2;
}

.dossier-en-title {
  font-family: var(--font-serif);
  font-size: 1.85rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  margin: 0;
}

.dossier-dyad-title {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 0;
}

.dossier-info-table {
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.table-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.row-k {
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.row-v {
  font-family: var(--font-serif);
  font-size: 11px;
  font-weight: 600;
  text-align: right;
}

.dossier-quote-block {
  border-left: 3px solid var(--ink);
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.dossier-quote-ar {
  font-family: var(--font-arabic);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.8;
  margin: 0;
}

.dossier-quote-en {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  line-height: 1.6;
  font-style: italic;
  margin: 0;
}

.dossier-stamp-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--ink);
  padding-top: 1.5rem;
  margin-top: 1rem;
}

.stamp-seal {
  display: flex;
  flex-direction: column;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.dossier-dismiss-btn {
  padding: 8px 16px;
  background-color: var(--ink);
  color: var(--paper);
  border: 1px solid var(--ink);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
}

.dossier-dismiss-btn:hover {
  background-color: var(--paper);
  color: var(--ink);
}

/* ==========================================================================
   RESPONSIVE QUERIES
   ========================================================================== */
@media (max-width: 1024px) {
  .catalogue-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .colophon-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .manifesto-columns {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .dossier-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .navbar-header {
    padding: 0 1.5rem;
  }

  .nav-links {
    display: none;
  }

  .main-content {
    padding-top: 7rem;
  }

  .catalogue-grid {
    grid-template-columns: 1fr;
  }

  .colophon-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    padding: 0 1.5rem;
  }

  .marquee-card {
    width: 250px;
  }

  .catalogue-section, .manifesto-section, .colophon-section {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .dossier-modal {
    padding: 1.5rem;
  }
}
`;

fs.writeFileSync(path.join(rootDir, 'src', 'index.css'), indexCssContent, 'utf8');
if (fs.existsSync(path.join(rootDir, 'portfolio', 'src', 'index.css'))) {
  fs.writeFileSync(path.join(rootDir, 'portfolio', 'src', 'index.css'), indexCssContent, 'utf8');
}
console.log('src/index.css updated with pure monochrome design system');

console.log('Archive visual identity application script completed!');
