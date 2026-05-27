import React, { useEffect, useRef, useState } from 'react';

const ScrollMoon = () => {
  const moonRef = useRef(null);
  const [ready, setReady] = useState(true);
  const [showTyping, setShowTyping] = useState(false);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const moon = moonRef.current;
    if (!moon) return;

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

      // === Phase 3: Reverse into About logo (made slower) ===
      const aboutSection = document.getElementById('about');
      const logoCircle = document.querySelector('.about-logo-circle');
      let reverseProgress = 0;

      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        // Make the scroll zone wider for a slower, smoother scroll experience
        const reverseRange = vh * 2.2; /* Expanded runway for slower landing and flip */
        const reverseRaw = (scrollY - (aboutTop - vh)) / reverseRange;
        reverseProgress = Math.min(Math.max(reverseRaw, 0), 1);
      }

      // --- Starting position (read dynamically from CSS to prevent jump) ---
      let startW = 15;
      let startX = vw - (vw * 0.30) - startW / 2;
      let startY = vh * 0.25 + startW / 2;

      const heroMoonSky = document.querySelector('.hero-moon-sky');
      if (heroMoonSky) {
        const rect = heroMoonSky.getBoundingClientRect();
        // Since we are relative to viewport, getBoundingClientRect is perfect
        startW = rect.width > 0 ? rect.width : 15;
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height / 2;
      }

      // --- Center of viewport ---
      const centerX = vw / 2;
      const centerY = vh / 2;
      const lockedCenterY = centerY + 65; // Placed down slightly by 65px

      // --- Sizes ---
      const midW = 550; // Beautiful centered size
      const endW = 750; // Slightly less enlarged center size

      // --- Logo target (relative to viewport since moon is fixed) ---
      let logoX = centerX, logoY = centerY, logoW = 340;
      if (logoCircle) {
        const rect = logoCircle.getBoundingClientRect();
        logoX = rect.left + rect.width / 2;
        logoY = rect.top + rect.height / 2;
        logoW = rect.width;
      }

      let currentW, currentX, currentY;

      if (reverseProgress > 0 && heroProgress >= 1) {
        // Phase 3: Reverse — shrink and move to logo position slower (stays larger longer)
        const travelRaw = reverseProgress / 0.52;
        const tTravel = easeOutCubic(Math.min(Math.max(travelRaw, 0), 1));
        
        currentW = lerp(endW, logoW, tTravel);
        currentX = lerp(centerX, logoX, tTravel);
        currentY = lerp(lockedCenterY, logoY, tTravel);
      } else if (heroProgress <= 0.30) {
        // Sub-phase 1: Zoom & Enlarge to full center size
        const t = easeOutCubic(heroProgress / 0.30);
        currentW = lerp(startW, endW, t); // Zoom directly to final max size!
        currentX = lerp(startX, centerX, t);
        currentY = lerp(startY, lockedCenterY, t);
      } else {
        // Sub-phase 2, 3, and 4: Locked in center at maximum size
        currentW = endW;
        currentX = centerX;
        currentY = lockedCenterY;
      }

      // Apply transform sizing and translate
      moon.style.width = `${currentW}px`;
      moon.style.height = `${currentW}px`;
      moon.style.transform = `translate(${currentX - currentW / 2}px, ${currentY - currentW / 2}px)`;

      // Flip trigger: Execute the flip slightly earlier (26% progress) while the moon is still larger
      const innerCard = moon.querySelector('.scroll-moon-inner');
      if (innerCard) {
        if (reverseProgress >= 0.26) {
          innerCard.classList.add('is-flipped');
        } else {
          innerCard.classList.remove('is-flipped');
        }
      }

      // Glow & float trigger: active whenever scrolling through hero (starts immediately upon scroll)
      const isPhase2 = heroProgress > 0 && reverseProgress === 0;
      if (isPhase2) {
        moon.classList.add('is-phase2');
      } else {
        moon.classList.remove('is-phase2');
      }

      // Hide moon once settled on logo
      const settled = reverseProgress >= 0.98;

      // Toggle visibility between static hero moon and root scroll-moon
      const heroMoon = document.querySelector('.hero-moon-sky');
      if (heroProgress === 0) {
        if (heroMoon) heroMoon.style.opacity = '1';
        moon.style.opacity = '0';
      } else {
        if (heroMoon) heroMoon.style.opacity = '0';
        moon.style.opacity = settled ? '0' : '1';
      }

      // Show/hide static About logo
      if (logoCircle) {
        logoCircle.style.opacity = settled ? '1' : '0';
      }

      // Fade out hero text
      const heroContent = document.querySelector('.hero-cosmic-container');
      if (heroContent) {
        const textOpacity = Math.max(1 - heroProgress * 2.5, 0);
        heroContent.style.opacity = textOpacity;
      }

      // Real-time scroll-linked typing & erasing animation with a long pause
      const fullText = "We are Nilebyte.\nAnd we are here to make\na BIG change.";
      if (reverseProgress > 0.05) {
        // Transitioning to about us section — keep fully erased
        setTypedText("");
        setShowTyping(false);
      } else if (heroProgress > 0.30 && heroProgress <= 0.52) {
        // Sub-phase 2: Slowly appear (typing)
        const tType = (heroProgress - 0.30) / 0.22;
        const charCount = Math.min(Math.floor(tType * (fullText.length + 1.5)), fullText.length);
        setTypedText(fullText.slice(0, charCount));
        setShowTyping(charCount > 0);
      } else if (heroProgress > 0.52 && heroProgress <= 0.74) {
        // Sub-phase 2.5: Long Pause - text remains fully typed and static
        setTypedText(fullText);
        setShowTyping(true);
      } else if (heroProgress > 0.74 && heroProgress <= 0.96) {
        // Sub-phase 3: Slowly erase
        const tErase = (heroProgress - 0.74) / 0.22;
        const charCount = Math.max(fullText.length - Math.floor(tErase * (fullText.length + 1.5)), 0);
        setTypedText(fullText.slice(0, charCount));
        setShowTyping(charCount > 0);
      } else {
        // Fully erased during Sub-phase 1 and Sub-phase 4
        setTypedText("");
        setShowTyping(false);
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
      ref={moonRef}
      className="scroll-moon"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <div className="scroll-moon-inner">
        {/* Front side (Moon image) */}
        <div className="scroll-moon-front">
          <img
            src="/moon3.png"
            alt="Moon"
            className="scroll-moon-img"
          />
          <div className="moon-light-gray-overlay"></div>
          <div className={`moon-typing-container ${showTyping ? 'is-visible' : ''}`}>
            <div className="moon-typing-content">
              {typedLines.map((line, idx) => {
                const showPrompt = idx < 2;
                return (
                  <div key={idx} className="moon-terminal-line">
                    {showPrompt && <span className="moon-terminal-prompt">&gt; </span>}
                    {!showPrompt && <span style={{ width: '1.2rem', display: 'inline-block' }} />}
                    <span className="moon-typing-text">{line}</span>
                    {idx === typedLines.length - 1 && typedText !== "" && (
                      <span className="moon-terminal-cursor">_</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Back side (Branded Logo with light glow / matching style) */}
        <div className="scroll-moon-back">
          <img
            src="/logo.png"
            alt="Nilebyte Logo"
            className="scroll-moon-logo-img"
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollMoon;
