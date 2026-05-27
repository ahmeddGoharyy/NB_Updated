import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className={`hero-cosmic ${loaded ? 'is-loaded' : ''}`}>
      {/* Background */}
      <div className="hero-bg"></div>

      {/* Small moon floating on the right side of the sky */}
      <div className="hero-moon-sky">
        <div className="moon-wrapper">
          <img src="/nb2-removebg-preview.png" alt="Moon" className="moon-image" />
        </div>
      </div>

      <div className="hero-cosmic-container">
        <div className="hero-layout">
          {/* Left Text */}
          <div className="hero-text-left">
            <h1 className="hero-title">Rooted in the Nile.</h1>
          </div>

          {/* Right Text */}
          <div className="hero-text-right">
            <h1 className="hero-title">Built for the future.</h1>
          </div>
        </div>

        {/* Sub header row */}
        <div className="hero-sub-row">
          <p className="hero-sub">From intelligent automation to full-stack systems</p>
          <span className="hero-sub-dot">·</span>
          <p className="hero-sub">we build the engine behind your growth.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
