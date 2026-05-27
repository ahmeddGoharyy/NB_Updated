import React, { useEffect, useState, useRef } from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [overLight, setOverLight] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setScrolled(currentY > 80);

        // Detect if navbar is overlapping a light-background section
        const nav = navRef.current;
        if (nav) {
          const navBottom = nav.getBoundingClientRect().bottom;
          const lightSections = document.querySelectorAll('[data-theme="light"]');
          let isOverLight = false;
          lightSections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (navBottom > rect.top && nav.getBoundingClientRect().top < rect.bottom) {
              isOverLight = true;
            }
          });
          setOverLight(isOverLight);
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const classes = [
    'navbar',
    scrolled ? 'navbar--scrolled' : '',
    overLight ? 'navbar--light' : '',
  ].filter(Boolean).join(' ');

  return (
    <nav ref={navRef} className={classes}>
      <div className="nav-left">
        <a href="#" className="nav-brand">
          <img src="/logo.png" alt="Nilebyte Logo" className="nav-logo" />
          <span className="nav-brand-text">Nilebyte</span>
        </a>
      </div>
      <ul className="nav-links">
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
