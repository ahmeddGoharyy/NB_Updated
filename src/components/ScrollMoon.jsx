import React, { useEffect, useRef, useState } from 'react';

const ScrollMoon = () => {
  const terminalRef = useRef(null);
  const [ready, setReady] = useState(true);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const term = terminalRef.current;
    if (!term) return;

    let rafId = null;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function onScroll() {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scrollY = window.scrollY;

      // === Hero wrapper scroll range ===
      const heroWrapper = document.querySelector('.hero-scroll-wrapper');
      if (!heroWrapper) return;

      const wrapperTop = heroWrapper.offsetTop;
      const scrollRange = vh * 4.2; /* Multi-stage cinematic scroll runway */
      const rawProgress = (scrollY - wrapperTop) / scrollRange;
      const heroProgress = Math.min(Math.max(rawProgress, 0), 1);

      // === Phase 3: Land in About logo ===
      const aboutSection = document.getElementById('about');
      const logoCircle = document.querySelector('.about-logo-circle');
      let reverseProgress = 0;

      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        const reverseRange = vh * 2.2; /* Scroll runway to travel to About */
        const reverseRaw = (scrollY - (aboutTop - vh)) / reverseRange;
        reverseProgress = Math.min(Math.max(reverseRaw, 0), 1);
      }

      const centerX = vw / 2;
      const centerY = vh / 2;
      
      // Responsive vertical offset
      const lockedCenterY = centerY + (vw < 768 ? 40 : 65); 

      // --- Starting position (sitting at the bottom part of the Hero, rising up) ---
      const startX = centerX;
      const startY = vh * (vw < 768 ? 0.68 : 0.75);

      // --- Dynamic Target Logo Dimensions ---
      let logoX = centerX;
      let logoY = centerY;
      let logoW = (vw < 768 ? 200 : (vw < 1024 ? 280 : 360)); // Robust theme fallbacks

      if (logoCircle) {
        const rect = logoCircle.getBoundingClientRect();
        logoX = rect.left + rect.width / 2;
        logoY = rect.top + rect.height / 2;
        logoW = rect.width;
      }

      // Seamless design: morph size is exactly identical to target logo width in all states!
      const circleSize = logoW;

      // --- Dynamic Dimensions for Responsive Screen Sizes ---
      let startW, startH, maxW, maxH;

      if (vw < 768) {
        // Mobile Viewports (Safe margins, elegant taller terminal window)
        maxW = vw - 40; // Elegant margins
        maxH = 260; // Taller standard shape (not flat!)
        startW = vw - 80;
        startH = 150;
      } else if (vw < 1024) {
        // Tablet Viewports
        maxW = Math.min(580, vw - 60);
        maxH = maxW * 0.62;
        startW = 300;
        startH = 185;
      } else {
        // Desktop Viewports (Elite layout size)
        maxW = 720;
        maxH = 430;
        startW = 320;
        startH = 200;
      }

      let currentW, currentH, currentX, currentY;
      let borderRadius = '16px';
      let termContentOpacity = 1;
      let frontLogoOpacity = 0;

      if (reverseProgress > 0 && heroProgress >= 1) {
        // Phase 3: Moving to About Us Logo
        const travelRaw = reverseProgress / 0.52;
        const tTravel = easeOutCubic(Math.min(Math.max(travelRaw, 0), 1));

        currentW = lerp(circleSize, logoW, tTravel);
        currentH = lerp(circleSize, logoW, tTravel);
        currentX = lerp(centerX, logoX, tTravel);
        currentY = lerp(lockedCenterY, logoY, tTravel);

        borderRadius = '50%';
        termContentOpacity = 0;
        frontLogoOpacity = 1;
      } else if (heroProgress <= 0.30) {
        // Phase 1: Rising from below and expanding
        const t = easeOutCubic(heroProgress / 0.30);
        currentW = lerp(startW, maxW, t);
        currentH = lerp(startH, maxH, t);
        currentX = lerp(startX, centerX, t);
        currentY = lerp(startY, lockedCenterY, t);

        borderRadius = '16px';
        termContentOpacity = 1;
        frontLogoOpacity = 0;
      } else if (heroProgress > 0.30 && heroProgress <= 0.75) {
        // Stage 2: Locked in center typing and erasing
        currentW = maxW;
        currentH = maxH;
        currentX = centerX;
        currentY = lockedCenterY;

        borderRadius = '16px';
        termContentOpacity = 1;
        frontLogoOpacity = 0;
      } else if (heroProgress > 0.75 && heroProgress <= 0.95) {
        // Stage 3: Morphing into a perfect circle & turning terminal into Logo
        const tMorph = (heroProgress - 0.75) / 0.20;
        const eMorph = easeOutCubic(tMorph);

        currentW = lerp(maxW, circleSize, eMorph);
        currentH = lerp(maxH, circleSize, eMorph);
        currentX = centerX;
        currentY = lockedCenterY;

        borderRadius = `${lerp(16, 50, eMorph)}%`;
        termContentOpacity = lerp(1, 0, eMorph);
        frontLogoOpacity = lerp(0, 1, eMorph);
      } else {
        // Stage 4: Solid circle waiting to travel (Logo is fully active on front face)
        currentW = circleSize;
        currentH = circleSize;
        currentX = centerX;
        currentY = lockedCenterY;

        borderRadius = '50%';
        termContentOpacity = 0;
        frontLogoOpacity = 1;
      }

      // Apply transforms & dimension styles dynamically
      term.style.width = `${currentW}px`;
      term.style.height = `${currentH}px`;
      term.style.transform = `translate(${currentX - currentW / 2}px, ${currentY - currentH / 2}px)`;

      // Apply internal shape changes
      const inner = term.querySelector('.scroll-terminal-inner');
      const termHeader = term.querySelector('.terminal-header');
      const termBody = term.querySelector('.terminal-body');
      const frontLogo = term.querySelector('.terminal-front-logo');

      if (inner) {
        inner.style.borderRadius = borderRadius;
        // 3D Flip trigger during the landing travel stage
        if (reverseProgress >= 0.26) {
          inner.classList.add('is-flipped');
        } else {
          inner.classList.remove('is-flipped');
        }
      }

      if (termHeader) termHeader.style.opacity = termContentOpacity;
      if (termBody) termBody.style.opacity = termContentOpacity;
      if (frontLogo) frontLogo.style.opacity = frontLogoOpacity;

      // Smooth Fade-in after some scroll (starts fading in after 5% scroll, fully solid at 20%)
      let currentOpacity = 1;
      if (heroProgress <= 0.05) {
        currentOpacity = 0;
      } else if (heroProgress > 0.05 && heroProgress <= 0.20) {
        currentOpacity = (heroProgress - 0.05) / 0.15; // Smooth fade-in
      }

      // Settle and switch visibility with About Us static logo
      const settled = reverseProgress >= 0.98;
      term.style.opacity = settled ? '0' : `${currentOpacity}`;

      if (logoCircle) {
        logoCircle.style.opacity = settled ? '1' : '0';
      }

      // Fade out hero texts
      const heroContent = document.querySelector('.hero-cosmic-container');
      if (heroContent) {
        const textOpacity = Math.max(1 - heroProgress * 2.5, 0);
        heroContent.style.opacity = textOpacity;
      }

      // Real-time console typing animation (Line 3 has no > prefix)
      const fullText = "> We are Nilebyte.\n> And we are here to make\na BIG change.";

      if (reverseProgress > 0.05) {
        setTypedText("");
      } else if (heroProgress > 0.30 && heroProgress <= 0.50) {
        // Typing Phase (0.20 runway)
        const tType = (heroProgress - 0.30) / 0.20;
        const charCount = Math.min(Math.floor(tType * (fullText.length + 2)), fullText.length);
        setTypedText(fullText.slice(0, charCount));
      } else if (heroProgress > 0.50 && heroProgress <= 0.76) {
        // Prolonged Pause Phase (0.26 runway - static text visible much longer!)
        setTypedText(fullText);
      } else if (heroProgress > 0.76 && heroProgress <= 0.82) {
        // Fast Erasing Phase (0.06 runway) - erases at high speed
        const tErase = (heroProgress - 0.76) / 0.06;
        const charCount = Math.max(fullText.length - Math.floor(tErase * (fullText.length + 2)), 0);
        setTypedText(fullText.slice(0, charCount));
      } else {
        setTypedText("");
      }
    }

    function handleScroll() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const typedLines = typedText.split('\n');

  return (
    <div
      ref={terminalRef}
      className="scroll-terminal"
      style={{ opacity: 0 }} // Start completely hidden
    >
      <div className="scroll-terminal-inner">
        {/* Terminal window face (Front Face) */}
        <div className="terminal-window">
          {/* Fading Terminal Header Chrome */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="terminal-title">/Nilebyte.exe</div>
          </div>
          {/* Fading Terminal Console Body */}
          <div className="terminal-body">
            {typedLines.map((line, idx) => {
              const isCommand = line.startsWith('>');
              const displayText = isCommand ? line.substring(1).trim() : line;
              // Dynamically capture the word "Nilebyte" to highlight it in brand blue
              const parts = displayText.split(/(Nilebyte)/g);

              return (
                <div key={idx} className="terminal-line">
                  {isCommand && <span className="terminal-prompt">&gt; </span>}
                  {!isCommand && line !== "" && <span className="terminal-prompt-spacer" />}
                  <span className="terminal-text">
                    {parts.map((part, pIdx) => {
                      if (part === "Nilebyte") {
                        return <span key={pIdx} className="terminal-highlight-blue">{part}</span>;
                      }
                      return part;
                    })}
                  </span>
                  {idx === typedLines.length - 1 && typedText !== "" && (
                    <span className="terminal-cursor">_</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Front Logo Viewport (Faded in during Stage 3 inside Hero) */}
          <div className="terminal-front-logo" style={{ opacity: 0 }}>
            <img
              src="/logo.png"
              alt="Nilebyte Logo"
              className="terminal-logo-img"
            />
          </div>
        </div>

        {/* Logo overlay face (Back Face of the Flip Card) */}
        <div className="terminal-logo-overlay">
          <img
            src="/logo.png"
            alt="Nilebyte Logo"
            className="terminal-logo-img"
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollMoon;
