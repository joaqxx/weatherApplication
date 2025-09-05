import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img 
          src="/logo.png" 
          alt="Weather App Logo" 
          className="nav-logo"
        />
        <span className="nav-title">WeatherApp</span>
      </div>
    </nav>
  );
};

export default Navbar;
