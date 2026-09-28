const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'archive');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Common Archival Frame elements
function getArchivalFrame(accCode, plateNum, titleAr, titleEn) {
  return `
  <!-- Outer Archival Crop Marks & Registration -->
  <rect x="20" y="20" width="560" height="560" fill="none" stroke="#000000" stroke-width="1.5"/>
  <rect x="26" y="26" width="548" height="548" fill="none" stroke="#000000" stroke-width="0.75" stroke-dasharray="4 2"/>
  
  <!-- Corner Registration Brackets -->
  <path d="M10,20 L20,20 L20,10" fill="none" stroke="#000000" stroke-width="1.5"/>
  <path d="M590,20 L580,20 L580,10" fill="none" stroke="#000000" stroke-width="1.5"/>
  <path d="M10,580 L20,580 L20,590" fill="none" stroke="#000000" stroke-width="1.5"/>
  <path d="M590,580 L580,580 L580,590" fill="none" stroke="#000000" stroke-width="1.5"/>

  <!-- Center Crosshairs -->
  <path d="M300,8 L300,20 M300,580 L300,592 M8,300 L20,300 M580,300 L592,300" stroke="#000000" stroke-width="1"/>

  <!-- Archival Metadata Header -->
  <text x="36" y="44" font-family="'Space Mono', monospace, sans-serif" font-size="9" font-weight="700" letter-spacing="1.5" fill="#000000">THE ARCHIVE // الأرشيف</text>
  <text x="564" y="44" text-anchor="end" font-family="'Space Mono', monospace, sans-serif" font-size="9" font-weight="700" letter-spacing="1.5" fill="#000000">${accCode}</text>
  
  <!-- Archival Metadata Footer -->
  <text x="36" y="562" font-family="'Space Mono', monospace, sans-serif" font-size="9" font-weight="700" letter-spacing="2" fill="#000000">${plateNum}</text>
  <text x="300" y="562" text-anchor="middle" font-family="'Amiri', 'Traditional Arabic', serif" font-size="12" font-weight="700" fill="#000000">${titleAr} — ${titleEn}</text>
  <text x="564" y="562" text-anchor="end" font-family="'Space Mono', monospace, sans-serif" font-size="9" letter-spacing="1" fill="#000000">EDITION 1/1 • MONO</text>
  `;
}

// 01. THE SEAL (الخاتم) - Identity / Biography
const sealSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <rect width="600" height="600" fill="#FFFFFF"/>
  ${getArchivalFrame('ARC.01 / IDN', 'PLATE 01', 'الخَاتَم', 'THE SEAL')}

  <g transform="translate(0, -6)">
    <!-- Outer Heavy Ring with Notched Edge (Intaglio physical stamp effect) -->
    <circle cx="300" cy="300" r="214" fill="#000000"/>
    <circle cx="300" cy="300" r="206" fill="#FFFFFF"/>
    <circle cx="300" cy="300" r="201" fill="#000000"/>
    <circle cx="300" cy="300" r="199" fill="#FFFFFF"/>

    <!-- Concentric Dotted Archival Calibration Ring -->
    <circle cx="300" cy="300" r="185" fill="none" stroke="#000000" stroke-width="1.5" stroke-dasharray="3 3"/>

    <!-- Circular Calligraphic & Archival Text -->
    <def>
      <path id="sealArcTop" d="M 125,300 A 175,175 0 0,1 475,300" fill="none"/>
      <path id="sealArcBottom" d="M 475,300 A 175,175 0 0,1 125,300" fill="none"/>
    </def>
    <text font-family="'Amiri', 'Traditional Arabic', serif" font-size="14" font-weight="700" letter-spacing="2" fill="#000000">
      <textPath href="#sealArcTop" startOffset="50%" text-anchor="middle">
        خَاتَمُ المَحْفُوظَاتِ الخَاصَّةِ • الأَرْشِيفُ الشَّخْصِيُّ
      </textPath>
    </text>
    <text font-family="'Space Mono', monospace" font-size="9.5" font-weight="700" letter-spacing="3" fill="#000000">
      <textPath href="#sealArcBottom" startOffset="50%" text-anchor="middle">
        • CODEX ALAA • PRIVATE ARCHIVE • MMXXVI •
      </textPath>
    </text>

    <!-- Inner Geometric Rosette (Interlocking Octagram in Pure Ink) -->
    <circle cx="300" cy="300" r="148" fill="#000000"/>
    <polygon points="300,160 340,260 440,260 360,320 390,420 300,360 210,420 240,320 160,260 260,260" fill="#FFFFFF"/>
    <circle cx="300" cy="300" r="126" fill="#000000"/>

    <!-- Fine Concentric White Hairline -->
    <circle cx="300" cy="300" r="121" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>

    <!-- Central Matrix: Calligraphic Monogram 'علاء' (Alaa) in stark white carving -->
    <!-- Architectural Kufic / Thuluth glyphs -->
    <!-- Main shaft Lam & Alif (verticals) -->
    <rect x="286" y="218" width="12" height="110" fill="#FFFFFF"/>
    <rect x="312" y="218" width="12" height="110" fill="#FFFFFF"/>
    
    <!-- Lam-Alif finial crossbars -->
    <polygon points="286,218 298,206 298,218" fill="#FFFFFF"/>
    <polygon points="312,218 324,206 324,218" fill="#FFFFFF"/>

    <!-- 'Ain' (ع) bold contour -->
    <path d="M 235,286 C 235,260 260,250 286,252 L 286,266 C 268,264 250,270 250,284 C 250,298 266,306 286,306 L 286,328 C 248,328 235,310 235,286 Z" fill="#FFFFFF"/>

    <!-- Base ligature connecting base of 'ع' to 'ل' -->
    <rect x="250" y="316" width="74" height="12" fill="#FFFFFF"/>

    <!-- Hamza (ء) at top-right -->
    <path d="M 338,242 C 338,232 348,226 358,226 C 368,226 374,232 374,238 L 364,242 C 364,238 360,235 358,235 C 354,235 348,238 348,244 C 348,250 356,254 366,254 L 372,264 L 340,264 L 340,254 L 358,254 C 348,252 338,248 338,242 Z" fill="#FFFFFF"/>

    <!-- Archival Sub-stamp inside matrix -->
    <text x="300" y="356" text-anchor="middle" font-family="'Amiri', serif" font-size="14" font-weight="700" letter-spacing="3" fill="#FFFFFF">الأَثَـر</text>
    <line x1="260" y1="368" x2="340" y2="368" stroke="#FFFFFF" stroke-width="1.5"/>
    <polygon points="300,365 304,368 300,371 296,368" fill="#FFFFFF"/>
    <text x="300" y="386" text-anchor="middle" font-family="'Space Mono', monospace" font-size="8.5" font-weight="700" letter-spacing="2" fill="#FFFFFF">ACCN: 01-IDN</text>

    <!-- Four Cardinal Registration Ticks on Outer Border -->
    <line x1="300" y1="74" x2="300" y2="86" stroke="#000000" stroke-width="2.5"/>
    <line x1="300" y1="514" x2="300" y2="526" stroke="#000000" stroke-width="2.5"/>
    <line x1="74" y1="300" x2="86" y2="300" stroke="#000000" stroke-width="2.5"/>
    <line x1="514" y1="300" x2="526" y2="300" stroke="#000000" stroke-width="2.5"/>
  </g>
</svg>`;

// 02. THE VINYL (الأسطوانة) - Solitude / Music / Memory
const vinylSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <rect width="600" height="600" fill="#FFFFFF"/>
  ${getArchivalFrame('ARC.02 / SND', 'PLATE 02', 'الأُسْطُوَانَة', 'THE VINYL')}

  <g transform="translate(0, -6)">
    <!-- Vinyl Disc Body -->
    <circle cx="300" cy="300" r="218" fill="#000000"/>

    <!-- Microgroove Engravings (Fine pure white hairline tracks) -->
    <circle cx="300" cy="300" r="210" fill="none" stroke="#FFFFFF" stroke-width="0.8"/>
    <circle cx="300" cy="300" r="206" fill="none" stroke="#FFFFFF" stroke-width="0.4"/>
    <circle cx="300" cy="300" r="202" fill="none" stroke="#FFFFFF" stroke-width="0.5"/>
    
    <!-- Track Gap 01 -->
    <circle cx="300" cy="300" r="192" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>
    <circle cx="300" cy="300" r="188" fill="none" stroke="#FFFFFF" stroke-width="0.4"/>
    <circle cx="300" cy="300" r="184" fill="none" stroke="#FFFFFF" stroke-width="0.6"/>
    <circle cx="300" cy="300" r="178" fill="none" stroke="#FFFFFF" stroke-width="0.4"/>

    <!-- Track Gap 02 -->
    <circle cx="300" cy="300" r="166" fill="none" stroke="#FFFFFF" stroke-width="1.4"/>
    <circle cx="300" cy="300" r="160" fill="none" stroke="#FFFFFF" stroke-width="0.4"/>
    <circle cx="300" cy="300" r="154" fill="none" stroke="#FFFFFF" stroke-width="0.7"/>
    <circle cx="300" cy="300" r="148" fill="none" stroke="#FFFFFF" stroke-width="0.4"/>

    <!-- Lead-out Zone -->
    <circle cx="300" cy="300" r="136" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>
    <circle cx="300" cy="300" r="126" fill="none" stroke="#FFFFFF" stroke-width="0.5"/>
    <circle cx="300" cy="300" r="118" fill="none" stroke="#FFFFFF" stroke-width="0.8" stroke-dasharray="140 10"/>

    <!-- Matrix Inscription stamped on run-out dead wax in tiny white letters -->
    <def>
      <path id="matrixArc" d="M 200,300 A 100,100 0 0,1 400,300" fill="none"/>
    </def>
    <text font-family="'Space Mono', monospace" font-size="6.5" font-weight="700" letter-spacing="1.5" fill="#FFFFFF">
      <textPath href="#matrixArc" startOffset="50%" text-anchor="middle">
        MTX • BEIRUT-1974-Z.RAHBANI-MONO // 33⅓ RPM
      </textPath>
    </text>

    <!-- Center Label Disc -->
    <circle cx="300" cy="300" r="96" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
    <circle cx="300" cy="300" r="90" fill="none" stroke="#000000" stroke-width="0.8"/>
    <circle cx="300" cy="300" r="86" fill="none" stroke="#000000" stroke-width="1.5"/>

    <!-- Center Spindle Hole & 45 RPM Adapter Geometry -->
    <circle cx="300" cy="300" r="24" fill="#000000"/>
    <circle cx="300" cy="300" r="8" fill="#FFFFFF"/>
    <!-- Tri-wing cutout -->
    <path d="M 300,282 L 305,294 L 318,294 L 308,302 L 312,315 L 300,307 L 288,315 L 292,302 L 282,294 L 295,294 Z" fill="#000000"/>

    <!-- Archival Lebanese Music Label Typography -->
    <def>
      <path id="labelTopArc" d="M 225,300 A 75,75 0 0,1 375,300" fill="none"/>
      <path id="labelBottomArc" d="M 375,300 A 75,75 0 0,1 225,300" fill="none"/>
    </def>
    <text font-family="'Amiri', serif" font-size="12" font-weight="700" letter-spacing="1" fill="#000000">
      <textPath href="#labelTopArc" startOffset="50%" text-anchor="middle">
        صَوْتٌ مِنْ رُكَامِ الذَّاكِرَة
      </textPath>
    </text>
    <text font-family="'Space Mono', monospace" font-size="7.5" font-weight="700" letter-spacing="2" fill="#000000">
      <textPath href="#labelBottomArc" startOffset="50%" text-anchor="middle">
        BEIRUT • 1974 • ARCHIVE
      </textPath>
    </text>

    <!-- Label Badges Left and Right -->
    <text x="240" y="296" text-anchor="middle" font-family="'Space Mono', monospace" font-size="8" font-weight="700" fill="#000000">33⅓</text>
    <text x="240" y="306" text-anchor="middle" font-family="'Space Mono', monospace" font-size="6" letter-spacing="1" fill="#000000">RPM</text>

    <text x="360" y="296" text-anchor="middle" font-family="'Amiri', serif" font-size="10" font-weight="700" fill="#000000">الوَجْه أ</text>
    <text x="360" y="306" text-anchor="middle" font-family="'Space Mono', monospace" font-size="6" letter-spacing="1" fill="#000000">SIDE A</text>

    <text x="300" y="342" text-anchor="middle" font-family="'Amiri', serif" font-size="11" font-weight="700" fill="#000000">قَصِيدَةُ العُزْلَة</text>
    <line x1="265" y1="348" x2="335" y2="348" stroke="#000000" stroke-width="0.8"/>
    <text x="300" y="358" text-anchor="middle" font-family="'Space Mono', monospace" font-size="6.5" letter-spacing="1.5" fill="#000000">SOLITUDE // NO. 02</text>

    <!-- Stylized Brutalist Tonearm & Stylus Tracking at 45° -->
    <path d="M 480,95 L 435,175 L 400,215" fill="none" stroke="#000000" stroke-width="4"/>
    <circle cx="480" cy="95" r="14" fill="#000000"/>
    <circle cx="480" cy="95" r="8" fill="#FFFFFF"/>
    <circle cx="480" cy="95" r="3" fill="#000000"/>
    <!-- Headshell & Cartridge resting on groove -->
    <polygon points="400,215 390,227 378,217 388,205" fill="#000000"/>
    <polygon points="380,219 374,224 372,222 378,217" fill="#000000"/>
    <line x1="372" y1="222" x2="366" y2="228" stroke="#000000" stroke-width="1.5"/>
  </g>
</svg>`;

// 03. THE BUST (التمثال) - Philosophy / Fractured Thought
const bustSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <rect width="600" height="600" fill="#FFFFFF"/>
  ${getArchivalFrame('ARC.03 / PHL', 'PLATE 03', 'التِّمْثَال', 'THE BUST')}

  <g transform="translate(0, -6)">
    <!-- Archival Coordinate Quadrant Lines -->
    <line x1="120" y1="300" x2="480" y2="300" stroke="#000000" stroke-width="0.5" stroke-dasharray="4 4"/>
    <line x1="300" y1="100" x2="300" y2="500" stroke="#000000" stroke-width="0.5" stroke-dasharray="4 4"/>
    <circle cx="300" cy="300" r="180" fill="none" stroke="#000000" stroke-width="0.5" stroke-dasharray="2 4"/>

    <!-- Classical Pedestal Base in Heavy Black -->
    <rect x="200" y="440" width="200" height="16" fill="#000000"/>
    <rect x="220" y="424" width="160" height="16" fill="#000000"/>
    <polygon points="230,424 250,380 350,380 370,424" fill="#000000"/>

    <!-- Classical Philosopher Bust Profile (Left Half / Rear of Head) -->
    <!-- Solid black silhouette sculpted with precision -->
    <path d="
      M 300,120
      C 270,120 230,132 210,165
      C 192,192 190,225 194,255
      C 188,265 180,285 186,305
      C 192,325 210,345 228,360
      C 240,370 250,380 260,390
      L 300,390
      L 300,120 Z
    " fill="#000000"/>

    <!-- Classical Philosopher Bust Profile (Right Half / Face & Brow) -->
    <!-- Offset by 12px down-right along fracture plane -->
    <g transform="translate(8, 10)">
      <path d="
        M 300,120
        C 325,120 348,130 360,150
        C 370,165 372,185 365,200
        C 362,205 358,212 368,220
        C 378,228 395,245 398,258
        C 400,265 392,270 380,272
        C 375,274 382,284 382,295
        C 382,305 370,312 360,315
        C 365,325 372,345 365,365
        C 358,380 338,390 300,390
        L 300,120 Z
      " fill="#000000"/>

      <!-- Facial Feature Negative Space Engraving (Classical Greek Nose & Eye) -->
      <polygon points="352,228 385,258 358,264" fill="#FFFFFF"/>
      <circle cx="346" cy="224" r="5" fill="#FFFFFF"/>
      <path d="M 334,212 C 344,208 356,212 360,218" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <!-- Beard Texture Hatching Lines in White -->
      <path d="M 330,320 C 345,325 360,335 355,355" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
      <path d="M 320,335 C 335,342 345,355 342,370" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
      <path d="M 310,350 C 322,356 332,368 330,380" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
    </g>

    <!-- Hair Curls Texture (Left side) -->
    <path d="M 230,160 C 220,180 235,200 245,190 C 255,180 240,165 230,160 Z" fill="#FFFFFF"/>
    <path d="M 210,210 C 205,230 220,245 230,235 C 240,225 225,210 210,210 Z" fill="#FFFFFF"/>
    <path d="M 215,260 C 210,275 225,290 235,280" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>

    <!-- THE FRACTURE: Diagonal Razor-Sharp Fissure slicing through the skull -->
    <polygon points="296,90 308,90 316,210 304,210" fill="#FFFFFF"/>
    <polygon points="304,210 316,210 308,340 296,340" fill="#FFFFFF"/>
    <polygon points="296,340 308,340 318,480 306,480" fill="#FFFFFF"/>
    
    <!-- Fracture Jagged White Teeth & Hatching -->
    <line x1="290" y1="180" x2="320" y2="180" stroke="#000000" stroke-width="2"/>
    <line x1="292" y1="240" x2="322" y2="240" stroke="#000000" stroke-width="2"/>
    <line x1="288" y1="310" x2="318" y2="310" stroke="#000000" stroke-width="2"/>
    <line x1="294" y1="370" x2="324" y2="370" stroke="#000000" stroke-width="2"/>

    <!-- Philosophical Maxim in intentional, bold Arabic typography -->
    <text x="300" y="476" text-anchor="middle" font-family="'Amiri', serif" font-size="15" font-weight="700" letter-spacing="1" fill="#000000">
      أَنَا أُفَكِّرُ إِذَنْ أَنَا مَنْفِيّ
    </text>
    <text x="300" y="494" text-anchor="middle" font-family="'Space Mono', monospace" font-size="8" font-weight="700" letter-spacing="2" fill="#000000">
      COGITO ERGO EXSUL // IBN RUSHD • AVERROES
    </text>

    <!-- Archival Crosshair Marks -->
    <circle cx="150" cy="180" r="12" fill="none" stroke="#000000" stroke-width="1"/>
    <line x1="138" y1="180" x2="162" y2="180" stroke="#000000" stroke-width="1"/>
    <line x1="150" y1="168" x2="150" y2="192" stroke="#000000" stroke-width="1"/>
    <text x="170" y="184" font-family="'Space Mono', monospace" font-size="8" fill="#000000">SEC. 03/A</text>

    <circle cx="450" cy="400" r="12" fill="none" stroke="#000000" stroke-width="1"/>
    <line x1="438" y1="400" x2="462" y2="400" stroke="#000000" stroke-width="1"/>
    <line x1="450" y1="388" x2="450" y2="412" stroke="#000000" stroke-width="1"/>
    <text x="430" y="424" font-family="'Space Mono', monospace" font-size="8" fill="#000000">QUADRANT-PHL</text>
  </g>
</svg>`;

// 04. THE ROSE (الوردة) - Love / Longing / Poetry
const roseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <rect width="600" height="600" fill="#FFFFFF"/>
  ${getArchivalFrame('ARC.04 / LIT', 'PLATE 04', 'الوَرْدَة', 'THE ROSE')}

  <g transform="translate(0, -6)">
    <!-- Archival Botanical Plate Header Grid -->
    <rect x="230" y="74" width="140" height="22" fill="#000000"/>
    <text x="300" y="89" text-anchor="middle" font-family="'Space Mono', monospace" font-size="8.5" font-weight="700" letter-spacing="2" fill="#FFFFFF">ROSA DAMASCENA</text>

    <!-- The Bloom: Monumental Woodcut Damask Rose in pure black silhouette & white engraved cuts -->
    <!-- Outer Petal Crown -->
    <path d="
      M 300,120
      C 260,115 220,135 210,170
      C 200,205 215,240 240,255
      C 265,270 335,270 360,255
      C 385,240 400,205 390,170
      C 380,135 340,115 300,120 Z
    " fill="#000000"/>

    <!-- Concentric White Woodcut Petal Carvings (Pure white negative lines) -->
    <!-- Center Spiral Vortex -->
    <path d="M 294,152 C 304,146 314,150 316,160 C 318,172 304,180 292,176 C 278,170 278,154 290,144 C 306,132 328,136 334,154 C 340,176 322,198 298,198 C 270,198 250,174 256,148 C 262,122 292,106 322,114" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>

    <!-- Outer Petal Ridges & Fluting -->
    <path d="M 230,175 C 240,210 270,230 300,230 C 330,230 360,210 370,175" fill="none" stroke="#FFFFFF" stroke-width="2.2"/>
    <path d="M 220,205 C 240,240 275,255 300,255 C 325,255 360,240 380,205" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M 250,225 C 270,245 290,250 310,250 C 330,250 350,245 365,225" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>

    <!-- Calyx & Sepals (Sharp triangular leaves grasping base of bloom) -->
    <polygon points="260,260 250,285 272,270" fill="#000000"/>
    <polygon points="340,260 350,285 328,270" fill="#000000"/>
    <polygon points="300,265 300,295 294,270" fill="#000000"/>

    <!-- The Stem: Sturdy, curved, organic vertical black spine -->
    <path d="M 300,265 C 298,320 304,380 296,440 L 304,440 C 312,380 306,320 308,265 Z" fill="#000000"/>

    <!-- Severed Stem 45° Angle Cut at base -->
    <polygon points="296,440 304,440 308,448 292,448" fill="#000000"/>
    <line x1="288" y1="448" x2="312" y2="448" stroke="#000000" stroke-width="1"/>

    <!-- Severe, Sharp Thorns (Menacing architectural points) -->
    <!-- Thorn 1 (Left, High) -->
    <path d="M 298,300 C 285,302 265,312 258,322 C 270,324 290,320 298,318 Z" fill="#000000"/>
    <line x1="258" y1="322" x2="298" y2="308" stroke="#FFFFFF" stroke-width="1"/>

    <!-- Thorn 2 (Right, Mid) -->
    <path d="M 306,345 C 320,348 340,360 348,370 C 335,372 315,366 306,364 Z" fill="#000000"/>
    <line x1="348" y1="370" x2="306" y2="354" stroke="#FFFFFF" stroke-width="1"/>

    <!-- Thorn 3 (Left, Low) -->
    <path d="M 296,395 C 282,398 266,408 260,418 C 272,420 288,414 296,412 Z" fill="#000000"/>

    <!-- Botanical Leaves with Crisp Vector Engraving Veins -->
    <!-- Leaf 01 (Left Cluster) -->
    <g transform="translate(0, 0)">
      <path d="M 298,335 C 260,330 210,310 180,285 C 195,315 230,345 298,348 Z" fill="#000000"/>
      <!-- White Central Vein & Lateral Veins -->
      <path d="M 298,342 C 255,335 220,318 180,285" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
      <line x1="260" y1="334" x2="250" y2="318" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="235" y1="324" x2="225" y2="308" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="210" y1="310" x2="200" y2="296" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="265" y1="338" x2="260" y2="348" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="240" y1="330" x2="235" y2="340" stroke="#FFFFFF" stroke-width="1"/>
    </g>

    <!-- Leaf 02 (Right Cluster) -->
    <g transform="translate(0, 0)">
      <path d="M 306,375 C 345,370 395,350 425,325 C 410,355 375,385 306,388 Z" fill="#000000"/>
      <!-- White Central Vein & Lateral Veins -->
      <path d="M 306,382 C 350,375 385,358 425,325" fill="none" stroke="#FFFFFF" stroke-width="1.8"/>
      <line x1="345" y1="374" x2="355" y2="358" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="370" y1="364" x2="380" y2="348" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="395" y1="350" x2="405" y2="336" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="340" y1="378" x2="345" y2="388" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="365" y1="370" x2="370" y2="380" stroke="#FFFFFF" stroke-width="1"/>
    </g>

    <!-- Poetic Inscription & Levantine Botanical Label -->
    <text x="300" y="482" text-anchor="middle" font-family="'Amiri', serif" font-size="15" font-weight="700" letter-spacing="1" fill="#000000">
      يَا نَاعِماً كَالشَّوْكِ فِي كَبِدِي
    </text>
    <text x="300" y="500" text-anchor="middle" font-family="'Space Mono', monospace" font-size="8" font-weight="700" letter-spacing="2" fill="#000000">
      LONGING // LEVANTINE HERBARIUM 1924
    </text>
  </g>
</svg>`;

// 05. THE SWORD (السيف) - Exile / Endurance / Wandering
const swordSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <rect width="600" height="600" fill="#FFFFFF"/>
  ${getArchivalFrame('ARC.05 / EXL', 'PLATE 05', 'السَّيْف', 'THE SWORD')}

  <g transform="translate(0, -6)">
    <!-- Astrolabe Celestial Coordinates in Upper Right (Exile & Wandering) -->
    <circle cx="460" cy="140" r="40" fill="none" stroke="#000000" stroke-width="0.8"/>
    <circle cx="460" cy="140" r="34" fill="none" stroke="#000000" stroke-width="0.5" stroke-dasharray="2 2"/>
    <line x1="460" y1="92" x2="460" y2="188" stroke="#000000" stroke-width="0.8"/>
    <line x1="412" y1="140" x2="508" y2="140" stroke="#000000" stroke-width="0.8"/>
    <!-- 8-Point Compass Star -->
    <polygon points="460,115 464,136 485,140 464,144 460,165 456,144 435,140 456,136" fill="#000000"/>
    <text x="460" y="196" text-anchor="middle" font-family="'Space Mono', monospace" font-size="7" font-weight="700" letter-spacing="1.5" fill="#000000">33°N • EXILE</text>

    <!-- Main Shamshir / Sayf Blade (Dynamic Diagonal Arc from top-left to bottom-right) -->
    <!-- Blade Silhouette -->
    <path d="
      M 195,215
      C 230,225 320,270 380,335
      C 430,390 470,455 490,485
      C 475,470 415,385 355,325
      C 295,265 210,215 185,205
      Z
    " fill="#000000"/>

    <!-- Fuller / Blood Groove carved in Stark White Negative Space -->
    <path d="
      M 198,214
      C 235,224 318,268 372,328
      C 418,380 452,435 470,465
      C 460,450 415,385 365,332
      C 310,272 232,226 194,210
      Z
    " fill="#FFFFFF"/>

    <!-- Inscribed Damascene Arabic Calligraphy inside the fuller -->
    <def>
      <path id="swordBladePath" d="M 215,220 C 275,255 350,320 445,430" fill="none"/>
    </def>
    <text font-family="'Amiri', serif" font-size="11" font-weight="700" letter-spacing="1" fill="#000000">
      <textPath href="#swordBladePath" startOffset="50%" text-anchor="middle">
        وَالصَّبْرُ أَمْضَى مِنْ حُسَامِ التِّيهِ
      </textPath>
    </text>

    <!-- Crossguard & Quillons (Arab-Mamluk geometry) -->
    <polygon points="182,192 208,226 200,232 174,198" fill="#000000"/>
    <polygon points="174,198 152,172 160,166 182,192" fill="#000000"/>
    <!-- Pointed Langets gripping the blade forte -->
    <polygon points="186,212 210,230 200,240 180,218" fill="#000000"/>
    <!-- Quillon Terminals -->
    <circle cx="152" cy="166" r="6" fill="#000000"/>
    <circle cx="208" cy="232" r="6" fill="#000000"/>

    <!-- Grip (Wrapped handle) -->
    <polygon points="168,185 130,138 118,148 156,195" fill="#000000"/>
    <!-- Fine White Grip Wrap Hatchings -->
    <line x1="162" y1="180" x2="152" y2="188" stroke="#FFFFFF" stroke-width="1.8"/>
    <line x1="152" y1="168" x2="142" y2="176" stroke="#FFFFFF" stroke-width="1.8"/>
    <line x1="142" y1="156" x2="132" y2="164" stroke="#FFFFFF" stroke-width="1.8"/>
    <line x1="132" y1="144" x2="122" y2="152" stroke="#FFFFFF" stroke-width="1.8"/>

    <!-- Pommel (Falcon / Hook curve) -->
    <path d="M 120,146 C 110,134 95,130 85,140 C 76,150 82,165 96,165 C 108,165 116,156 122,150 Z" fill="#000000"/>
    <circle cx="94" cy="148" r="4" fill="#FFFFFF"/>

    <!-- Archival Tassel Cord draping from pommel ring -->
    <path d="M 96,165 C 90,195 110,225 105,255 C 100,285 115,315 110,345" fill="none" stroke="#000000" stroke-width="2.5"/>
    <!-- Tassel Knot & Fringe -->
    <rect x="104" y="345" width="12" height="10" fill="#000000"/>
    <polygon points="102,355 118,355 124,395 96,395" fill="#000000"/>
    <!-- Tassel strands -->
    <line x1="100" y1="395" x2="98" y2="408" stroke="#000000" stroke-width="1.5"/>
    <line x1="106" y1="395" x2="106" y2="412" stroke="#000000" stroke-width="1.5"/>
    <line x1="112" y1="395" x2="114" y2="412" stroke="#000000" stroke-width="1.5"/>
    <line x1="118" y1="395" x2="122" y2="408" stroke="#000000" stroke-width="1.5"/>

    <!-- Archival Chivalric Text Footnote -->
    <text x="300" y="492" text-anchor="middle" font-family="'Amiri', serif" font-size="15" font-weight="700" letter-spacing="1" fill="#000000">
      السَّيْفُ وَالصَّبْرُ وَرِحْلَةُ التِّيهِ
    </text>
    <text x="300" y="510" text-anchor="middle" font-family="'Space Mono', monospace" font-size="8" font-weight="700" letter-spacing="2" fill="#000000">
      CHIVALRIC CODEX // AL-MUTANABBI ARCHIVE
    </text>
  </g>
</svg>`;

// 06. THE DERVISH (الدرويش) - Transcendence / Movement / Surrender
const dervishSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <rect width="600" height="600" fill="#FFFFFF"/>
  ${getArchivalFrame('ARC.06 / SFM', 'PLATE 06', 'الدَّرْوِيش', 'THE DERVISH')}

  <g transform="translate(0, -6)">
    <!-- Centrifugal Whirling Cosmic Orbits in background -->
    <ellipse cx="300" cy="330" rx="200" ry="80" fill="none" stroke="#000000" stroke-width="0.8" stroke-dasharray="6 4" transform="rotate(-8 300 330)"/>
    <ellipse cx="300" cy="330" rx="160" ry="60" fill="none" stroke="#000000" stroke-width="0.5" stroke-dasharray="3 3" transform="rotate(12 300 330)"/>

    <!-- Circular Sufi Calligraphy along orbit arc -->
    <def>
      <path id="orbitArc" d="M 120,310 C 180,240 420,240 480,310" fill="none"/>
    </def>
    <text font-family="'Amiri', serif" font-size="13" font-weight="700" letter-spacing="2" fill="#000000">
      <textPath href="#orbitArc" startOffset="50%" text-anchor="middle">
        فَلَا شَيْءَ فِي الوُجُودِ إِلَّا الحُضُور
      </textPath>
    </text>

    <!-- Head & Sikke (Conical Cap inclined at ecstatic angle) -->
    <g transform="rotate(14 300 170)">
      <!-- Tall felt Sikke cap -->
      <polygon points="288,105 312,105 318,162 282,162" fill="#000000"/>
      <!-- Cap brim band in white -->
      <rect x="280" y="156" width="40" height="6" fill="#FFFFFF"/>
      <rect x="280" y="156" width="40" height="6" fill="none" stroke="#000000" stroke-width="1.5"/>
      <!-- Head / Face profile looking downward in submission -->
      <path d="M 288,162 C 282,175 285,190 294,196 C 304,198 312,192 314,180 Z" fill="#000000"/>
    </g>

    <!-- Torso & Arms (Ecstatic Cross-Polar Geometry) -->
    <!-- Right Arm: Raised Heavenward (receiving light) -->
    <path d="M 300,195 L 375,130 L 388,142 L 315,210 Z" fill="#000000"/>
    <!-- Right Open Palm Facing Up -->
    <path d="M 375,130 C 382,118 396,118 402,126 C 406,132 400,140 388,142 Z" fill="#000000"/>

    <!-- Left Arm: Lowered Earthward (transmitting light) -->
    <path d="M 290,210 L 210,265 L 198,252 L 280,195 Z" fill="#000000"/>
    <!-- Left Open Palm Facing Down -->
    <path d="M 210,265 C 200,274 190,270 186,260 C 182,254 190,248 198,252 Z" fill="#000000"/>

    <!-- Torso Vest / Destegul garment wrapped tight -->
    <polygon points="280,195 320,195 330,265 270,265" fill="#000000"/>
    <!-- Belt / Kamarband in white -->
    <rect x="268" y="260" width="64" height="8" fill="#FFFFFF"/>
    <rect x="268" y="260" width="64" height="8" fill="none" stroke="#000000" stroke-width="1.5"/>

    <!-- The Whirling Skirt (Tanoura): Monumental Centrifugal Architectural Bell -->
    <!-- Solid Black Silhouette with Sweeping Flared Silhouette -->
    <path d="
      M 268,268
      C 220,290 140,360 115,445
      C 160,470 240,480 300,480
      C 360,480 440,470 485,445
      C 460,360 380,290 332,268
      Z
    " fill="#000000"/>

    <!-- Sharp Architectural Knife-Pleats Carved in Stark White Negative Space -->
    <!-- Radiating from the cinched waist to the sweeping hem -->
    <path d="M 285,268 C 255,330 200,400 160,455" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M 292,268 C 275,340 245,415 220,468" fill="none" stroke="#FFFFFF" stroke-width="2.2"/>
    <path d="M 300,268 C 300,350 295,425 285,475" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M 308,268 C 315,350 330,425 350,475" fill="none" stroke="#FFFFFF" stroke-width="2.2"/>
    <path d="M 315,268 C 335,340 375,410 415,462" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M 324,268 C 355,330 410,395 450,450" fill="none" stroke="#FFFFFF" stroke-width="2.2"/>

    <!-- Dynamic Hemline Undulations -->
    <path d="
      M 115,445
      Q 140,460 160,455
      Q 190,472 220,468
      Q 255,482 285,475
      Q 318,482 350,475
      Q 385,470 415,462
      Q 450,460 485,445
    " fill="none" stroke="#FFFFFF" stroke-width="2.5"/>

    <!-- Archival Sema Inscription -->
    <text x="300" y="508" text-anchor="middle" font-family="'Amiri', serif" font-size="15" font-weight="700" letter-spacing="1" fill="#000000">
      الوَجْدُ وَالفَنَاءُ وَالحَرَكَة
    </text>
    <text x="300" y="526" text-anchor="middle" font-family="'Space Mono', monospace" font-size="8" font-weight="700" letter-spacing="2" fill="#000000">
      SUFI KINETIC STUDY // ALEPPO SEMA 1912
    </text>
  </g>
</svg>`;

// Write all SVGs to public/archive/
const artifacts = [
  { file: '01-seal.svg', content: sealSvg },
  { file: '02-vinyl.svg', content: vinylSvg },
  { file: '03-bust.svg', content: bustSvg },
  { file: '04-rose.svg', content: roseSvg },
  { file: '05-sword.svg', content: swordSvg },
  { file: '06-dervish.svg', content: dervishSvg },
];

artifacts.forEach((art) => {
  const filePath = path.join(outputDir, art.file);
  fs.writeFileSync(filePath, art.content, 'utf8');
  console.log(`Generated ${art.file} -> ${filePath}`);
});

console.log('All 6 archival SVGs generated successfully!');
