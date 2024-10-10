// src/components/Header.jsx
import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <header className="header">
     <div className="menu-toggle" onClick={toggleNav}>
          &#9776; 
        </div>
      <div className="header-container">   
        <div className="logo">Urban Properties</div>
        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><a href="/home">Home</a></li>
            <li className="nav-item"><a href="/listings">Listings</a></li>
            <li className="nav-item"><a href="/profile">Profile</a></li>
            <li className="nav-item"><a href="/login">Login</a></li>
            <li className="nav-item"><a href="/signup">Signup</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
