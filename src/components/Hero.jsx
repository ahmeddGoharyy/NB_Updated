import React, { useEffect, useRef, useState } from 'react';

const Hero = ({ loading }) => {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Don't start animations until loading screen is done
    if (loading) return;
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [loading]);

  // Interactive Dot Grid Canvas (Static 3D Dome, Spotlight Vignette, Top Fade, Smooth Navbar Shield)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;

    // Set dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse coordinate tracker (starts off-screen)
    const mouse = {
      x: -10000,
      y: -10000,
      targetX: -1000,
      targetY: -1000
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // --- Dot Grid Setup ---
    const dots = [];
    const spacing = 26; // Stable grid spacing

    const initGrid = () => {
      dots.length = 0;
      const cols = Math.ceil(window.innerWidth / spacing) + 1;
      const rows = Math.ceil(window.innerHeight / spacing) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: c * spacing,
            y: r * spacing,
            colorType: 0, // Assigned on hover entry
            activeRatio: 0
          });
        }
      }
    };
    initGrid();

    // Re-initialize grid on window resize
    window.addEventListener('resize', initGrid);

    // --- Animation loop ---
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Coordinate tracking ---
      let targetX = -10000;
      let targetY = -10000;

      if (mouse.targetX !== -1000) {
        targetX = mouse.targetX;
        targetY = mouse.targetY;
      }

      // Smoothly slide the active coordinates toward the cursor
      if (mouse.x === -10000) {
        mouse.x = targetX;
        mouse.y = targetY;
      } else {
        mouse.x += (targetX - mouse.x) * 0.15;
        mouse.y += (targetY - mouse.y) * 0.15;
      }

      const activeCenterX = mouse.x;
      const activeCenterY = mouse.y;

      // --- SMOOTH NAVBAR SHIELD INTENSITY GRADIENT ---
      // Fade hover intensity continuously from 0% at 90px depth to 100% at 140px depth.
      // This guarantees zero visual glitching or snaps when moving near the top!
      let hoverIntensity = 1.0;
      if (activeCenterY !== -10000) {
        hoverIntensity = Math.max(0, Math.min(1, (activeCenterY - 90) / 50));
      } else {
        hoverIntensity = 0;
      }

      // Update and Draw Dotted Background
      dots.forEach((dot) => {
        let targetRatio = 0;

        const dx = dot.x - activeCenterX;
        const dy = dot.y - activeCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Massive expanded active footprint (270px radius)
        const activeRadius = 270;

        if (dist < activeRadius) {
          const envelope = (activeRadius - dist) / activeRadius;
          
          // --- SINE-HERMITE INTERPOLATION ---
          const sinRatio = Math.sin(envelope * Math.PI / 2);
          // Scale target active ratio smoothly by the vertical hover intensity
          targetRatio = Math.pow(sinRatio, 1.8) * hoverIntensity;

          // Assign dynamic, premium deep blue shades on hover entry:
          if (dot.activeRatio < 0.03) {
            const rand = Math.random();
            if (rand < 0.70) {
              dot.colorType = 0;
            } else {
              dot.colorType = 1;
            }
          }
        }

        // Smooth transition trail
        dot.activeRatio += (targetRatio - dot.activeRatio) * 0.14;

        // --- SUBTLE HORIZONTAL SIDE FADE ---
        const distFromCenterX = Math.abs(dot.x - canvas.width / 2);
        const sideRatio = distFromCenterX / (canvas.width / 2);
        const sideFade = 1.0 - (sideRatio * 0.55);

        // --- SUBTLE VERTICAL TOP FADE ---
        // Smoothly dims dots near the very top of the viewport under the navbar
        const topFade = Math.min(1, 0.45 + (dot.y / 150) * 0.55);

        // Combined horizontal and vertical vignettes
        const baseOpacity = 0.18 * sideFade * topFade;

        // Base Idle Slate-Grey Opacity scales with vignettes
        let targetR = 110, targetG = 125, targetB = 145, targetOpacity = baseOpacity;

        if (dot.activeRatio > 0.01) {
          switch (dot.colorType) {
            case 0: // Nilebyte Brand Blue
              targetR = 18;
              targetG = 75;
              targetB = 179;
              targetOpacity = 1.0;
              break;
            case 1: // Deep Indigo Royal Blue
            default:
              targetR = 79;
              targetG = 70;
              targetB = 229;
              targetOpacity = 1.0;
              break;
          }
        }

        // --- STATIC 3D PERSPECTIVE DOME PROJECTION ---
        const z = dot.activeRatio * 22;
        const fov = 450;
        const scale = fov / (fov - z); // Perspective multiplier

        const drawX = activeCenterX + dx * scale;
        const drawY = activeCenterY + dy * scale;

        // Smooth color and opacity interpolation
        const r = Math.round(110 + (targetR - 110) * dot.activeRatio);
        const g = Math.round(125 + (targetG - 125) * dot.activeRatio);
        const b = Math.round(145 + (targetB - 145) * dot.activeRatio);
        
        const opacity = baseOpacity + (targetOpacity - baseOpacity) * dot.activeRatio;
        const radius = 2.2 + dot.activeRatio * 2.3;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', initGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-scroll-wrapper">
      <section
        id="home"
        className={`hero-cosmic ${loaded ? 'is-loaded' : ''}`}
        data-theme="light"
      >
        {/* Dynamic Canvas Background */}
        <canvas ref={canvasRef} className="hero-canvas" />

        <div className="hero-cosmic-container">
          {/* Brand Badge (Logo + Name) Centered Above */}
          <div className="hero-brand-badge animate-fade-in">
            <img src="/logo.png" alt="Nilebyte Logo" className="hero-brand-logo" />
            <span className="hero-brand-name">Nilebyte</span>
          </div>

          {/* Centered Main Big Heading (Single Line Tagline) */}
          <h1 className="hero-main-title animate-fade-in-delayed">
            Rooted in the Nile. Built for the future.
          </h1>

          {/* Centered Subtitle (Slightly Larger) */}
          <p className="hero-main-subtitle animate-fade-in-delayed">
            From intelligent automation to full-stack systems · we build the engine behind your growth.
          </p>

          {/* Centered Dual CTA Buttons ("Our Services" and "Recent Projects") */}
          <div className="hero-cta-group animate-fade-in-delayed">
            <a href="#services" className="hero-cta-primary">
              Our Services
              <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#portfolio" className="hero-cta-secondary">
              Recent Projects
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
