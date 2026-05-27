import React, { useState, useEffect, useCallback } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0 = dark, 1-4 = each quarter lit
  const [fadeOut, setFadeOut] = useState(false);

  const finish = useCallback(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timers = [];

    // Small initial pause for dramatic effect
    timers.push(setTimeout(() => setStage(1), 600));
    timers.push(setTimeout(() => setStage(2), 1200));
    timers.push(setTimeout(() => setStage(3), 1800));
    timers.push(setTimeout(() => setStage(4), 2400));

    // Hold the fully-lit logo for a moment, then fade out
    timers.push(setTimeout(() => setFadeOut(true), 3400));

    // Remove from DOM after fade transition completes
    timers.push(setTimeout(() => finish(), 4400));

    return () => timers.forEach(clearTimeout);
  }, [finish]);

  return (
    <div className={`loading-screen ${fadeOut ? 'loading-screen--fade' : ''}`}>
      {/* Subtle ambient particles */}
      <div className="loading-particles">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="loading-particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="loading-logo-container">
        {/* 4 quarter slices, each clips to its 25% horizontal band */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`loading-quarter ${stage > i ? 'loading-quarter--lit' : ''}`}
            style={{
              clipPath: `inset(0 ${(3 - i) * 25}% 0 ${i * 25}%)`,
            }}
          >
            <img
              src="/SecondaryIcon.png"
              alt=""
              className="loading-logo-img"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Continuous loading bar — fills in 4 phases */}
      <div className="loading-bar">
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${stage * 25}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default LoadingScreen;
