import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="about-section" data-theme="light">
      <div className="about-wrapper">
        {/* Left side - Text content */}
        <div className="about-left">
          <div className="about-badge">ABOUT US</div>
          <h2 className="about-heading">About Nilebyte</h2>
          <p className="about-description">
            Nilebyte is a technical solutions agency that builds the systems businesses actually need — custom software, AI automations, and intelligent workflows engineered to eliminate manual work and accelerate growth. <br />We don't template. We architect.
          </p>

          <div className="about-contact-list">
            <div className="contact-row">
              <div className="contact-icon-wrapper"><Mail size={20} /></div>
              <span>nilebytee@gmail.com</span>
            </div>
            <div className="contact-row">
              <div className="contact-icon-wrapper"><Phone size={20} /></div>
              <span>+20 123 456 7890</span>
            </div>
            <div className="contact-row">
              <div className="contact-icon-wrapper"><MapPin size={20} /></div>
              <span>Cairo, Egypt</span>
            </div>
          </div>
          <div className="about-stats-divider"></div>

          <div className="about-stats">
            <div className="stat-item">
              <h3>20+</h3>
              <p>Projects Delivered<br />across multiple industries</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>Satisfied Clients from<br />from around the world</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Always Available to<br />support your business</p>
            </div>
          </div>
        </div>

        {/* Right side - Circle logo instead of woman pic */}
        <div className="about-right">
          <div className="about-image-container">
            <div className="about-logo-circle">
              <img src="/logo.png" alt="Nilebyte Logo" className="about-logo-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
