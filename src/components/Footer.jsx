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

          {/* Column 2: Social Media */}
          <div className="footer-col-socials">
            <h4 className="footer-heading">SOCIAL MEDIA</h4>
            <div className="footer-brand-socials">
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <div className="footer-social-icon-circle social-instagram">
                  <Instagram size={16} />
                </div>
                <span>Instagram</span>
              </a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">
                <div className="footer-social-icon-circle social-linkedin">
                  <Linkedin size={16} />
                </div>
                <span>LinkedIn</span>
              </a>
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <div className="footer-social-icon-circle social-facebook">
                  <Facebook size={16} />
                </div>
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Column 3: Why Nilebyte Disclaimer */}
          <div className="footer-col-disclaimer">
            <h4 className="footer-heading">Why Nilebyte?</h4>
            <p className="footer-disclaimer-text">
              Because you deserve a technical partner that actually understands your business — not just your tech stack. 
              <br /><br />
              At Nilebyte, we don't start with tools, we start with your problem. We map your bottlenecks, architect the right solution from the ground up, and build systems that think, automate, and run themselves — with a team that stays accountable to the results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
