import React, { useState, useEffect } from 'react';

/**
 * DallahPourSequence Component
 * Orchestrates the cinematic 4-phase coffee pour interaction:
 * Phase 1: Breakout & Center
 * Phase 2: The Tip (-35deg) & Espresso Stream
 * Phase 3: The Rising Fill (0vh -> 100vh with #1E120A)
 * Phase 4: Theme Swap (data-theme="coffee") & Smooth Reveal
 */
export default function DallahPourSequence({ isActive, onComplete, currentTheme, onThemeChange }) {
  const [stage, setStage] = useState('idle'); // 'idle' | 'breakout' | 'pour' | 'fill' | 'reveal'

  useEffect(() => {
    if (!isActive) {
      setStage('idle');
      return;
    }

    // Phase 1: Breakout & Center (0s -> 0.6s)
    setStage('breakout');

    // Phase 2: The Tip & Stream (starts at 0.6s)
    const pourTimer = setTimeout(() => {
      setStage('pour');
    }, 600);

    // Phase 3: The Rising Fill (starts at 1.1s)
    const fillTimer = setTimeout(() => {
      setStage('fill');
    }, 1100);

    // Phase 4: Theme Swap & Reveal (starts at 2.1s when 100% filled)
    const revealTimer = setTimeout(() => {
      if (onThemeChange) {
        onThemeChange('coffee');
      } else {
        document.documentElement.setAttribute('data-theme', 'coffee');
        document.body.setAttribute('data-theme', 'coffee');
      }
      setStage('reveal');
    }, 2100);

    // Clean up animation state and re-enable navigation (at 2.75s)
    const completeTimer = setTimeout(() => {
      setStage('idle');
      if (onComplete) onComplete();
    }, 2750);

    return () => {
      clearTimeout(pourTimer);
      clearTimeout(fillTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [isActive]);

  if (stage === 'idle') return null;

  return (
    <div className={`dallah-cinematic-overlay stage-${stage}`} aria-hidden="true">
      {/* Phase 3 & 4: Rising Espresso Fill Layer */}
      <div className="dallah-rising-fill" />

      {/* Phase 2: Espresso Stream from dallah spout down to bottom */}
      <div className="dallah-espresso-stream" />

      {/* Phase 1 & 2: High-Resolution Dallah Hero Clone */}
      <div className="dallah-hero-clone">
        <img
          src="/archive/02-dallah.png"
          alt="Golden Dallah Cinematic"
          className="dallah-hero-img"
        />
      </div>
    </div>
  );
}

