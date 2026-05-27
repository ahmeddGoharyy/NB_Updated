import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

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

          {/* Column 2: Social Media Platform Rows (Icon + Text) */}
          <div className="footer-col-links">
            <h4 className="footer-heading">SOCIAL MEDIA</h4>
            <ul className="footer-social-list">
              <li>
                <a href="#" className="footer-social-link" aria-label="Instagram">
                  <div className="footer-social-icon-circle social-instagram">
                    <Instagram size={16} />
                  </div>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="footer-social-link" aria-label="LinkedIn">
                  <div className="footer-social-icon-circle social-linkedin">
                    <Linkedin size={16} />
                  </div>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" className="footer-social-link" aria-label="Facebook">
                  <div className="footer-social-icon-circle social-facebook">
                    <Facebook size={16} />
                  </div>
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
