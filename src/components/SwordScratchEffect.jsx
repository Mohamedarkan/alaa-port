import React, { useEffect, useRef } from 'react';

/**
 * SwordScratchEffect Component
 * Tracks the aggressively tilted sword (Artifact #1) as its sharp blade tip
 * drags directly along the navbar bottom divider line.
 *
 * Visual & Rendering Specifications:
 * 1. Stacking Context & Full Coverage: Canvas mounted at height: 100%, width: 100%
 *    with z-index: 999 !important, forcing the scratch and sparks on top of all
 *    backgrounds and borders.
 * 2. Bold, High-Contrast Continuous Scratch:
 *    - Main stroke width: 3.5px directly along y = navbarHeight - 1.
 *    - Core color: Bright hot incandescent #FFF7D6.
 *    - Base / outer stroke: Glowing orange-amber #E0982D.
 *    - Trail lifespan: Fades smoothly over 2.0 seconds.
 * 3. Sparks: 4–6 visible sparks spraying upward into the navbar space and extinguishing.
 * 4. Zero Stuck Dots / Full Buffer Clear: Full ctx.clearRect() of the entire backing
 *    canvas buffer on every frame; strict filtering of dead elements; instant flush on loop.
 */
export default function SwordScratchEffect({ navbarRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let wakePoints = []; // Array of { x, birth }
    let sparks = [];     // Array of { x, y, vx, vy, birth, lifespan, size }
    let lastContactX = null;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const navEl = navbarRef?.current || canvas.parentElement;
      const width = navEl ? navEl.clientWidth : window.innerWidth;
      const height = navEl ? navEl.clientHeight : 85;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Render loop
    const render = (now) => {
      const dpr = window.devicePixelRatio || 1;
      const navEl = navbarRef?.current || canvas.parentElement;
      const navRect = navEl ? navEl.getBoundingClientRect() : null;

      // 1. Full Canvas Buffer Cleanup (Wipes every backing pixel on every frame)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Contact line coordinate directly along the bottom divider line: y = navbarHeight - 1
      const navbarHeight = navRect ? navRect.height : (navEl ? navEl.clientHeight : 85);
      const contactY = navbarHeight - 1;

      // Find rendered sword artifact
      const swordElements = document.querySelectorAll('.sword-artifact');
      let activeContactX = null;

      swordElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // For transform rotate(145deg) scaleX(-1) translateY(-12px) scale(1.15),
        // the sharp blade tip dragging the ground is offset +6.5px from container horizontal center
        const tipX = rect.left + rect.width / 2 + 6.5;

        if (navRect) {
          const relX = tipX - navRect.left;
          const minX = 105;
          const maxX = navRect.width + 10;

          if (relX >= minX && relX <= maxX) {
            activeContactX = relX;
          }
        }
      });

      // 2. Loop Detection & Wake Recording
      if (activeContactX !== null) {
        // Detect loop: if contactX jumps back to the right by > 80px, flush cleanly
        if (lastContactX !== null && activeContactX > lastContactX + 80) {
          wakePoints = [];
          sparks = [];
        }
        lastContactX = activeContactX;

        // Record point along baseline (avoid sub-pixel redundancy)
        if (wakePoints.length === 0 || Math.abs(wakePoints[0].x - activeContactX) >= 1.0) {
          wakePoints.unshift({ x: activeContactX, birth: now });
        }

        // Maintain 4–6 visible sparks spraying upward into navbar space
        while (sparks.length < 5) {
          sparks.push({
            x: activeContactX + (Math.random() - 0.5) * 3.5,
            y: contactY - 1,
            vx: Math.random() * 1.6 + 0.5,       // Kicks backward to the right
            vy: -(Math.random() * 1.8 + 1.2),    // Sprays upward into navbar space
            birth: now,
            lifespan: Math.random() * 300 + 450, // 450ms - 750ms visible lifetime
            size: Math.random() * 0.7 + 1.2,     // 1.2px - 1.9px bright visible sparks
          });
        }
      } else {
        // Off-screen flush when cooled
        if (wakePoints.length > 0 && now - wakePoints[0].birth > 2000) {
          wakePoints = [];
          sparks = [];
          lastContactX = null;
        }
      }

      // Strict Dead Object Filtering (2.0s lifespan)
      wakePoints = wakePoints.filter((pt) => now - pt.birth <= 2000);
      sparks = sparks.filter((p) => now - p.birth < p.lifespan);

      // 3. Render High-Contrast Continuous Scratch Trail (2.0s lifespan)
      if (wakePoints.length > 1) {
        // Layer 1: Ambient Orange-Amber Glow Halo (#E0982D) - 7px wide
        for (let i = 0; i < wakePoints.length - 1; i++) {
          const p1 = wakePoints[i];
          const p2 = wakePoints[i + 1];
          const age = now - p1.birth;
          const progress = Math.min(1, Math.max(0, age / 2000));
          const bloomAlpha = Math.max(0, Math.pow(1 - progress, 1.2) * 0.55);

          if (bloomAlpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p1.x, contactY);
            ctx.lineTo(p2.x, contactY);
            ctx.lineWidth = 7.0;
            ctx.strokeStyle = `rgba(224, 152, 45, ${bloomAlpha})`;
            ctx.stroke();
          }
        }

        // Layer 2: Main High-Contrast Stroke (3.5px width) - Glowing Orange-Amber (#E0982D)
        for (let i = 0; i < wakePoints.length - 1; i++) {
          const p1 = wakePoints[i];
          const p2 = wakePoints[i + 1];
          const age = now - p1.birth;
          const progress = Math.min(1, Math.max(0, age / 2000));
          const strokeAlpha = Math.max(0, Math.pow(1 - progress, 1.1) * 0.95);

          if (strokeAlpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p1.x, contactY);
            ctx.lineTo(p2.x, contactY);
            ctx.lineWidth = 3.5;
            ctx.strokeStyle = `rgba(224, 152, 45, ${strokeAlpha})`;
            ctx.stroke();
          }
        }

        // Layer 3: Bright Hot Incandescent Core (#FFF7D6) - 1.8px width
        for (let i = 0; i < wakePoints.length - 1; i++) {
          const p1 = wakePoints[i];
          const p2 = wakePoints[i + 1];
          const age = now - p1.birth;
          const progress = Math.min(1, Math.max(0, age / 2000));
          const coreAlpha = Math.max(0, Math.pow(1 - progress, 1.3) * 0.98);

          if (coreAlpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p1.x, contactY);
            ctx.lineTo(p2.x, contactY);
            ctx.lineWidth = 1.8;
            ctx.strokeStyle = `rgba(255, 247, 214, ${coreAlpha})`;
            ctx.stroke();
          }
        }
      }

      // 4. Sharp, Bright Friction Contact Point directly where blade tip touches line
      if (activeContactX !== null) {
        const flicker = Math.sin(now * 0.08) * 0.12 + 0.88;

        // Intense contact radial bloom
        const glow = ctx.createRadialGradient(
          activeContactX, contactY, 0.5,
          activeContactX, contactY, 6.0
        );
        glow.addColorStop(0, `rgba(255, 255, 255, ${0.98 * flicker})`);
        glow.addColorStop(0.3, `rgba(255, 247, 214, ${0.92 * flicker})`); // #FFF7D6
        glow.addColorStop(0.7, `rgba(224, 152, 45, ${0.55 * flicker})`);  // #E0982D
        glow.addColorStop(1, 'rgba(224, 152, 45, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(activeContactX, contactY, 6.0, 0, Math.PI * 2);
        ctx.fill();

        // 1.5px crisp white-hot core
        ctx.fillStyle = `rgba(255, 255, 255, ${0.98 * flicker})`;
        ctx.beginPath();
        ctx.arc(activeContactX, contactY, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Tangential friction glint along border
        ctx.fillStyle = `rgba(255, 247, 214, ${0.85 * flicker})`;
        ctx.fillRect(activeContactX - 4, contactY - 1, 8, 2);
      }

      // 5. Update & Draw 4–6 Visible Sparks spraying upward into navbar space
      for (const p of sparks) {
        const age = now - p.birth;
        const progress = age / p.lifespan;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.055; // gentle downward deceleration
        p.vx *= 0.98;

        const alpha = Math.max(0, (1 - progress) * (1 - progress) * 0.9);
        const safeY = Math.min(p.y, contactY - p.size);

        // Spark outer warm halo (#E0982D)
        ctx.fillStyle = `rgba(224, 152, 45, ${alpha * 0.45})`;
        ctx.beginPath();
        ctx.arc(p.x, safeY, p.size * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Spark bright incandescent core (#FFF7D6)
        ctx.fillStyle = `rgba(255, 247, 214, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, safeY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [navbarRef]);

  return (
    <canvas
      ref={canvasRef}
      className="navbar-scratch-canvas"
      aria-hidden="true"
    />
  );
}
