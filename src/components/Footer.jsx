import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-swedish">
      <div className="footer-glow-top"></div>
      <div className="footer-container">
        {/* Top Grid Section */}
        <div className="footer-grid">
          {/* Column 1: Logo */}
          <div className="footer-col-logo">
            <div className="footer-brand-container">
              <img src="/SecondaryIcon.png" alt="Secondary Brand Icon" className="footer-brand-logo" />
            </div>
          </div>

          {/* Column 2: Quick Links / Socials */}
          <div className="footer-col-links">
            <h4 className="footer-heading">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#" className="footer-link">
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Why Nilebyte */}
          <div className="footer-col-disclaimer">
            <h4 className="footer-heading">Why Nilebyte?</h4>
            <p className="footer-disclaimer-text">
              Because you deserve a technical partner that actually understands your business — not just your tech stack. 
              <br /><br />
              At Nilebyte, we don't start with tools, we start with your problem. We map your bottlenecks, architect the right solution from the ground up, and build systems that think, automate, and run themselves — with a team that stays accountable to the results.
            </p>
          </div>
        </div>

        {/* Bottom Section: Giant wide logo watermark */}
        <div className="footer-giant-logo-container">
          <span className="footer-binary-text">01001110</span>
          <img src="/logowide.png" alt="Swedish Peptides Large Brand" className="footer-giant-logo" />
          <span className="footer-binary-text">01000010</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
