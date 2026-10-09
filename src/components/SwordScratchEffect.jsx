import React, { useEffect, useRef } from 'react';

/**
 * SwordScratchEffect Component
 * Tracks the sword (Artifact #1) at its natural drag tilt as its pommel base
 * glides along the navbar bottom divider border.
 *
 * Visual & Lifecycle Features:
 * 1. Natural Drag Tilt Tracking: Accurately tracks the contact coordinate where
 *    the trailing steel base meets the baseline.
 * 2. Complete Canvas & Particle Cleanup: Full ctx.clearRect() of the backing buffer
 *    every frame; strict dead-particle filtering; flush on loop to eliminate ghost dots.
 * 3. Continuous Glowing Scratch Wake: An unbroken line segment along the divider
 *    directly behind the sword with a hot incandescent core (#FFF4CC fading to #D49A3D over 1.5s).
 * 4. Microscopic Sparks: Only 2–3 tiny subtle sparks flicking upward inside the navbar
 *    and dissolving almost immediately (200ms - 340ms).
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
      const height = 50; // 50px tall layer anchored to the bottom of the 85px navbar

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

      // 1. Full Canvas Buffer Cleanup (Wipes every backing pixel every frame)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Contact line coordinate inside 50px canvas (top edge of 2px navbar border)
      const contactY = 48;

      // Find all rendered sword artifacts
      const swordElements = document.querySelectorAll('.sword-artifact');
      let activeContactX = null;

      swordElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // At natural drag tilt (rotate: 54deg), the pommel base is -10px offset from container center
        const pommelX = rect.left + rect.width / 2 - 10;

        if (navRect) {
          const relX = pommelX - navRect.left;
          const minX = 105;
          const maxX = navRect.width + 10;

          if (relX >= minX && relX <= maxX) {
            activeContactX = relX;
          }
        }
      });

      // 2. Loop Detection & Wake Recording
      if (activeContactX !== null) {
        // Detect marquee loop: when contactX jumps back to the right by > 80px
        if (lastContactX !== null && activeContactX > lastContactX + 80) {
          wakePoints = [];
          sparks = [];
        }
        lastContactX = activeContactX;

        // Append point to continuous wake path (avoid redundant tiny steps)
        if (wakePoints.length === 0 || Math.abs(wakePoints[0].x - activeContactX) >= 1.2) {
          wakePoints.unshift({ x: activeContactX, birth: now });
        }

        // Emit at most 2–3 tiny subtle sparks flicking upward
        if (sparks.length < 3 && Math.random() < 0.22) {
          sparks.push({
            x: activeContactX + (Math.random() - 0.5) * 1.5,
            y: contactY - 0.5,
            vx: (Math.random() - 0.2) * 0.6,
            vy: -(Math.random() * 1.0 + 0.7), // upward flick inside navbar
            birth: now,
            lifespan: Math.random() * 140 + 200, // vanishes in 200ms - 340ms
            size: Math.random() * 0.25 + 0.45,  // microscopic 0.45px - 0.7px
          });
        }
      } else {
        // Sword is not on screen: if wake has fully cooled, flush arrays completely
        if (wakePoints.length > 0 && now - wakePoints[0].birth > 1500) {
          wakePoints = [];
          sparks = [];
          lastContactX = null;
        }
      }

      // Strict Dead Object Filtering (purges stale points from memory)
      wakePoints = wakePoints.filter((pt) => now - pt.birth <= 1500);
      sparks = sparks.filter((p) => now - p.birth < p.lifespan);

      // 3. Render Continuous Hot Friction Scratch Line
      if (wakePoints.length > 1) {
        // Pass A: Outer Warm Ambient Bloom along the line
        for (let i = 0; i < wakePoints.length - 1; i++) {
          const p1 = wakePoints[i];
          const p2 = wakePoints[i + 1];
          const age = now - p1.birth;
          const progress = Math.min(1, Math.max(0, age / 1500));
          const bloomAlpha = Math.max(0, (1 - progress) * 0.4);

          if (bloomAlpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p1.x, contactY);
            ctx.lineTo(p2.x, contactY);
            ctx.lineWidth = 3.2;
            ctx.strokeStyle = `rgba(212, 154, 61, ${bloomAlpha})`;
            ctx.stroke();
          }
        }

        // Pass B: Hot Incandescent Core Line (#FFF4CC fading to #D49A3D over 1.5s)
        for (let i = 0; i < wakePoints.length - 1; i++) {
          const p1 = wakePoints[i];
          const p2 = wakePoints[i + 1];
          const age = now - p1.birth;
          const progress = Math.min(1, Math.max(0, age / 1500));

          // Interpolation from #FFF4CC (255, 244, 204) to #D49A3D (212, 154, 61)
          const r = Math.round(255 + (212 - 255) * progress);
          const g = Math.round(244 + (154 - 244) * progress);
          const b = Math.round(204 + (61 - 204) * progress);
          const coreAlpha = Math.max(0, Math.pow(1 - progress, 1.25) * 0.95);

          if (coreAlpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p1.x, contactY);
            ctx.lineTo(p2.x, contactY);
            ctx.lineWidth = 1.4;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${coreAlpha})`;
            ctx.stroke();
          }
        }
      }

      // 4. Sharp, Bright Friction Contact Point directly where sword's base touches line
      if (activeContactX !== null) {
        const flicker = Math.sin(now * 0.06) * 0.1 + 0.9;

        // Focused incandescent contact glow (radius 3.5px)
        const glow = ctx.createRadialGradient(
          activeContactX, contactY, 0.3,
          activeContactX, contactY, 3.5
        );
        glow.addColorStop(0, `rgba(255, 255, 240, ${0.98 * flicker})`);
        glow.addColorStop(0.35, `rgba(255, 244, 204, ${0.85 * flicker})`);
        glow.addColorStop(0.7, `rgba(212, 154, 61, ${0.4 * flicker})`);
        glow.addColorStop(1, 'rgba(212, 154, 61, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(activeContactX, contactY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // 1px brilliant white contact core
        ctx.fillStyle = `rgba(255, 255, 255, ${0.98 * flicker})`;
        ctx.beginPath();
        ctx.arc(activeContactX, contactY, 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Micro horizontal glint along border
        ctx.fillStyle = `rgba(255, 244, 204, ${0.7 * flicker})`;
        ctx.fillRect(activeContactX - 2.5, contactY - 0.5, 5.0, 1.0);
      }

      // 5. Update & Draw Subtle Microscopic Upward Sparks
      for (const p of sparks) {
        const age = now - p.birth;
        const progress = age / p.lifespan;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045; // gentle deceleration

        if (p.y >= contactY) {
          p.y = contactY;
          p.vy = -Math.abs(p.vy) * 0.2;
        }

        const alpha = Math.max(0, (1 - progress) * (1 - progress) * 0.85);
        const safeY = Math.min(p.y, contactY - p.size);

        ctx.fillStyle = `rgba(255, 244, 204, ${alpha})`;
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
