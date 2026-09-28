const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// Read current App.jsx and index.css
const appJsxPath = path.join(rootDir, 'src', 'App.jsx');
const indexCssPath = path.join(rootDir, 'src', 'index.css');

let appJsx = fs.readFileSync(appJsxPath, 'utf8');
let indexCss = fs.readFileSync(indexCssPath, 'utf8');

// Define the Separators data
const separatorsData = `
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
`;

// Insert the separators data right after ARCHIVE_ARTIFACTS definition
if (!appJsx.includes('export const ARCHIVE_SEPARATORS')) {
  appJsx = appJsx.replace(
    'export const ARCHIVE_ARTIFACTS = [',
    `${separatorsData}\nexport const ARCHIVE_ARTIFACTS = [`
  );
}

// Build the magazine strip JSX component
const newMarqueeSectionJsx = `{/* ==========================================================================
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
                              transform: \`translateY(\${transform.translateY}) rotate(\${transform.rotate}) scale(\${transform.scale})\`
                            }}
                            onClick={() => handleCardClick(artifact)}
                            title={\`Examine \${artifact.titleEn} (\${artifact.titleAr})\`}
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
                            <div className="sep-rule-assembly" style={{ height: \`\${sep.ruleHeight}px\` }}>
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
          </section>`;

// Replace the previous marquee-section in App.jsx
const marqueeRegex = /{\/\* HORIZONTAL MOVING ARTIFACT STRIP[\s\S]*?<\/section>/;
if (marqueeRegex.test(appJsx)) {
  appJsx = appJsx.replace(marqueeRegex, newMarqueeSectionJsx);
  console.log('Replaced old marquee-section with experimental editorial strip');
} else {
  // Try matching <section className="marquee-section" id="marquee-strip">...</section>
  const altRegex = /<section className="marquee-section" id="marquee-strip">[\s\S]*?<\/section>/;
  if (altRegex.test(appJsx)) {
    appJsx = appJsx.replace(altRegex, newMarqueeSectionJsx);
    console.log('Replaced old marquee-section (alt pattern)');
  } else {
    console.error('Could not find marquee-section in App.jsx!');
  }
}

fs.writeFileSync(appJsxPath, appJsx, 'utf8');
if (fs.existsSync(path.join(rootDir, 'portfolio', 'src', 'App.jsx'))) {
  fs.writeFileSync(path.join(rootDir, 'portfolio', 'src', 'App.jsx'), appJsx, 'utf8');
}

// 2. Update index.css for the new editorial strip styles
const newEditorialStripCss = `
/* ==========================================================================
   EXPERIMENTAL FASHION EDITORIAL STRIP (CONTINUOUS MOVING ARCHIVE MARQUEE)
   Pure Black & White. Generous Whitespace. Subtle Asymmetry & Rotation.
   Order: SEAL → VINYL → BUST → ROSE → SWORD → DERVISH → repeat
   ========================================================================== */

.archive-strip-section {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
  background-color: var(--paper);
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  padding: 1.5rem 0 2rem 0;
  user-select: none;
}

/* Minimalist Editorial Header Ribbon */
.strip-editorial-header {
  max-width: 100%;
  padding: 0 3rem 1.25rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--ink);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink);
}

.strip-header-left, .strip-header-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.strip-header-ar {
  font-family: var(--font-arabic);
  font-size: 13px;
  font-weight: 700;
  border-left: 1px solid var(--ink);
  padding-left: 1rem;
}

.strip-order-guide {
  font-size: 9px;
  letter-spacing: 0.15em;
  color: var(--ink);
}

.strip-reg-tick {
  font-size: 13px;
}

/* Strip Viewport & Seamless Infinite Track */
.strip-viewport {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 4.5rem 0 5rem 0;
}

.strip-motion-track {
  display: flex;
  align-items: center;
  width: max-content;
  will-change: transform;
  /* Continuously glides horizontally from Left to Right */
  animation: editorial-strip-flow 62s linear infinite;
}

.strip-motion-track:hover {
  animation-play-state: paused;
}

@keyframes editorial-strip-flow {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.strip-specimen-group {
  display: flex;
  align-items: center;
}

/* ==========================================================================
   SPECIMEN PLATE CONTAINER (Editorial Fashion Monograph Specimen)
   ========================================================================== */
.specimen-plate-container {
  width: 340px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.5rem;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  position: relative;
}

.specimen-plate-container:hover {
  /* Subtle focus lift without breaking editorial flow */
  filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.08));
}

.specimen-plate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 4px;
}

.specimen-acc {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--ink);
}

.specimen-ar-kicker {
  font-family: var(--font-arabic);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}

/* Floating Art Frame with Pure White Space */
.specimen-art-frame {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--paper);
  border: 1px solid var(--ink);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.specimen-plate-container:hover .specimen-art-frame {
  border-width: 1.5px;
}

.specimen-graphic-svg, .specimen-graphic-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* Minimalist Corner Brackets */
.specimen-tick {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1;
  pointer-events: none;
}
.specimen-tick.tl { top: 4px; left: 4px; }
.specimen-tick.tr { top: 4px; right: 4px; }
.specimen-tick.bl { bottom: 4px; left: 4px; }
.specimen-tick.br { bottom: 4px; right: 4px; }

/* Understated Hover Cue */
.specimen-hover-cue {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.94);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.2s ease;
  border: 1px solid var(--ink);
}

.specimen-plate-container:hover .specimen-hover-cue {
  opacity: 1;
}

.cue-action {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--ink);
}

.cue-sub {
  font-family: var(--font-serif);
  font-size: 11px;
  font-style: italic;
  color: var(--ink);
}

/* Specimen Footer Label */
.specimen-plate-footer {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.specimen-footer-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.specimen-plate-no {
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  color: var(--ink);
}

.specimen-title-en {
  font-family: var(--font-serif);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--ink);
}

.specimen-title-ar {
  font-family: var(--font-arabic);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
}

.specimen-dyad-line {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink);
}

/* ==========================================================================
   RESTRAINED ARCHIVAL SEPARATOR COMPONENT
   ========================================================================== */
.archival-separator-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 4rem;
  gap: 1.25rem;
  flex-shrink: 0;
  user-select: none;
}

.sep-num-ar {
  font-family: var(--font-arabic);
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1;
}

.sep-rule-assembly {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.sep-hairline {
  width: 1px;
  flex: 1;
  background-color: var(--ink);
}

.sep-glyph-node {
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sep-symbol {
  font-size: 11px;
  color: var(--ink);
  line-height: 1;
}

.sep-meta-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  text-align: center;
}

.sep-coord-text {
  font-family: var(--font-mono);
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--ink);
  white-space: nowrap;
}

.sep-sub-text {
  font-family: var(--font-mono);
  font-size: 7.5px;
  letter-spacing: 0.12em;
  color: var(--ink);
  white-space: nowrap;
  opacity: 0.75;
}

.sep-crosshair {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--ink);
  margin-top: 4px;
}

/* Editorial Footer Ribbon */
.strip-editorial-footer {
  max-width: 100%;
  padding: 1.25rem 3rem 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--ink);
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink);
  flex-wrap: wrap;
  gap: 1rem;
}

.strip-footer-reg {
  font-size: 13px;
}

.strip-footer-mono {
  letter-spacing: 0.22em;
}

.strip-footer-pause-note {
  font-size: 8.5px;
  letter-spacing: 0.15em;
  opacity: 0.8;
}
`;

// Replace old marquee styles in index.css
const oldMarqueeRegex = /\/\* ==========================================================================\s+HORIZONTAL MOVING CAROUSEL[\s\S]*?\/\* ==========================================================================\s+CATALOGUE INDEX SECTION/;
if (oldMarqueeRegex.test(indexCss)) {
  indexCss = indexCss.replace(
    oldMarqueeRegex,
    `${newEditorialStripCss}\n/* ==========================================================================\n   CATALOGUE INDEX SECTION`
  );
  console.log('Replaced old marquee CSS with experimental editorial strip styles');
} else {
  // Append new styles if not found
  indexCss += `\n${newEditorialStripCss}`;
  console.log('Appended new editorial strip CSS');
}

fs.writeFileSync(indexCssPath, indexCss, 'utf8');
if (fs.existsSync(path.join(rootDir, 'portfolio', 'src', 'index.css'))) {
  fs.writeFileSync(path.join(rootDir, 'portfolio', 'src', 'index.css'), indexCss, 'utf8');
}

console.log('Update script finished successfully!');
