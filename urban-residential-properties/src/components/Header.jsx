// src/components/Header.jsx
import React, { useState } from 'react';
import './Header.css';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const {logout,isAuthenticated}=useAuth();

  const navigate=useNavigate();


  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const handleLogout=async ()=>{
    await logout();
    navigate('/login');
  }
  console.log("isNavOpen",isNavOpen)
  return (
    <header className="header-container">
      <div className="toggle-button" onClick={toggleNav}>
        &#9776; 
      </div>
      <div className="header-logo">
      <h2>Urban Properties</h2></div>
      <div className="header-content">   
        
        <nav className={`navigation ${isNavOpen ? 'open' : 'close'}`}>
          <ul className="navigation-list">
            {isAuthenticated && (<li className="navigation-item"><a href="/home">Home</a></li>)}
            {isAuthenticated && (<li className="navigation-item"><a href="/AddProperty">Sell Properties</a></li>)}
            {isAuthenticated && (<li className="navigation-item"><a href="/listings">Listings</a></li>)}
            {isAuthenticated && (<li className="navigation-item"><a href="/profile">Profile</a></li>)}
            {!isAuthenticated && (<li className="navigation-item"><a href="/login">Login</a></li>)}
            {isAuthenticated && (<li className="navigation-item"><a onClick={handleLogout}>Logout</a></li>)}
            {!isAuthenticated && (<li className="navigation-item"><a href="/signup">Signup</a></li>)}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
