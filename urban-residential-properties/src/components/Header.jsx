// src/components/Header.jsx
import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  console.log("isNavOpen",isNavOpen)
  return (
    <header className="header-container">
      <div className="toggle-button" onClick={toggleNav}>
        &#9776; 
      </div>
      <div className="header-logo">Urban Properties</div>
      <div className="header-content">   
        
        <nav className={`navigation ${isNavOpen ? 'open' : 'close'}`}>
          <ul className="navigation-list">
            <li className="navigation-item"><a href="/home">Home</a></li>
            <li className="navigation-item"><a href="/AddProperty">Sell Properties</a></li>
            <li className="navigation-item"><a href="/listings">Listings</a></li>
            <li className="navigation-item"><a href="/profile">Profile</a></li>
            <li className="navigation-item"><a href="/login">Login</a></li>
            <li className="navigation-item"><a href="/signup">Signup</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
