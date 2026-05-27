import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-wrapper">
        {/* Left side - Text content */}
        <div className="about-left">
          <div className="about-badge">ABOUT US</div>
          <h2 className="about-heading">About our firm</h2>
          <p className="about-description">
            At our firm, we pride ourselves on delivering tailored solutions
            that empower businesses to thrive. With years of experience
            across various industries, our dedicated team is committed to
            driving growth and operational excellence.
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
              <h3>95%</h3>
              <p>Complete customer<br/>satisfaction</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>Innovation and<br/>valuable insight</p>
            </div>
            <div className="stat-item">
              <h3>$10m</h3>
              <p>Highly efficient<br/>financial strategies</p>
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
