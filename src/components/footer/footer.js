import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
          <img 
          src="/logo.png" 
          alt="Weather App Logo" 
          className="nav-logo"
        />
      </div>
    </footer>
  );
};

export default Footer;