import React, { useState, useEffect, useCallback } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const finish = useCallback(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2800; // Smooth 2.8 seconds rising animation
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressValue = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressValue);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    // Hold the fully-filled logo for a moment, then fade out
    const fadeTimer = setTimeout(() => setFadeOut(true), 3400);

    // Remove from DOM after fade transition completes
    const finishTimer = setTimeout(() => finish(), 4400);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [finish]);

  return (
    <div className={`loading-screen ${fadeOut ? 'loading-screen--fade' : ''}`}>
      {/* Subtle ambient particles */}
      <div className="loading-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="loading-particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="loading-logo-container">
        {/* Darkened background logo */}
        <div className="loading-logo-bg-wrapper">
          <img
            src="/SecondaryIcon.png"
            alt=""
            className="loading-logo-img--dark"
            draggable={false}
          />
        </div>

        {/* Rising water colored logo */}
        <div
          className="loading-logo-water-fill"
          style={{ height: `${progress}%` }}
        >
          <div className="loading-logo-water-inner">
            <img
              src="/SecondaryIcon.png"
              alt=""
              className="loading-logo-img--lit"
              draggable={false}
            />
          </div>
        </div>

        {/* Liquid Waves overlay at the water level */}
        <div
          className="loading-water-waves"
          style={{ bottom: `calc(${progress}% - 20px)` }}
        >
          {/* Back Wave (slower, deep blue reflection, moving left) */}
          <div className="loading-water-wave loading-water-wave--back">
            <svg width="640" height="40" viewBox="0 0 640 40" preserveAspectRatio="none">
              <path
                d="M0,20 Q80,26 160,20 T320,20 T480,20 T640,20"
                fill="none"
                stroke="rgba(18, 75, 179, 0.75)"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          {/* Front Wave (faster, glowing white light reflection, moving right) */}
          <div className="loading-water-wave loading-water-wave--front">
            <svg width="640" height="40" viewBox="0 0 640 40" preserveAspectRatio="none">
              <path
                d="M0,20 Q80,14 160,20 T320,20 T480,20 T640,20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        {/* Liquid bubbles/droplets floating inside the cup rising */}
        {progress > 0 && progress < 100 && (
          <div className="loading-water-bubbles">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="loading-bubble"
                style={{
                  '--i': i,
                  '--left': `${15 + i * 14}%`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;

