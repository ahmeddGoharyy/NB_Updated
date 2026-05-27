import React, { useEffect, useState } from 'react';

const Hero = ({ loading }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Don't start animations until loading screen is done
    if (loading) return;

    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="hero-scroll-wrapper">
      <section
        id="home"
        className={`hero-cosmic ${loaded ? 'is-loaded' : ''}`}
        data-theme="light"
      >
        {/* Background */}
        <div className="hero-bg"></div>

        {/* Moon placeholder/wrapper inside hero section to serve as starting size/position context */}
        <div className="hero-moon-sky">
          <div className="moon-wrapper">
            <img src="/moon3.png" alt="Moon" className="moon-image" />
          </div>
        </div>

        <div className="hero-cosmic-container">
          <div className="hero-layout">
            <div className="hero-text-left">
              <h1 className="hero-title">Rooted in the Nile.</h1>
            </div>
            <div className="hero-text-right">
              <h1 className="hero-title">Built for the future.</h1>
            </div>
          </div>

          <div className="hero-sub-row">
            <p className="hero-sub">From intelligent automation to full-stack systems</p>
            <span className="hero-sub-dot">·</span>
            <p className="hero-sub">we build the engine behind your growth.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
