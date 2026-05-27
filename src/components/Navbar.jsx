import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="#" className="nav-brand">
          <img src="/logo.png" alt="Nilebyte Logo" className="nav-logo" />
          <span className="nav-brand-text">Nilebyte</span>
        </a>
      </div>
      <ul className="nav-links">
        <li><a href="#home" className="nav-link">Home</a></li>
        <li><a href="#services" className="nav-link">Services</a></li>
        <li><a href="#portfolio" className="nav-link">Portfolio</a></li>
        <li><a href="#about" className="nav-link">About Us</a></li>
      </ul>
      <div className="nav-right nav-socials">
        <a href="#" className="social-circle social-instagram">
          <Instagram size={18} />
        </a>
        <a href="#" className="social-circle social-linkedin">
          <Linkedin size={18} />
        </a>
        <a href="#" className="social-circle social-facebook">
          <Facebook size={18} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
