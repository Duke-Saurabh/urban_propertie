// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the new CSS for styling
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const navigate=useNavigate();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setIsAuthenticated}=useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('logging clicked')
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      console.log('Login successful', response.data);
      // Show a welcome message
      
    

      alert(`Welcome back, ${response.data.user.fullName}! You have logged in successfully.`);
      // Store tokens (localStorage, state, etc.)
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsAuthenticated(true); 
      navigate('/home');
  
    } catch (error) {
      console.error('Login failed', error);
      // Show an alert with the error message
      alert(error.response ? error.response.data.message : 'Login failed. Please try again.');
    }
  };
  

  return (
    <div className="login-wrapper"> {/* New class for login wrapper */}
      <form onSubmit={handleLogin} className="login-form-container"> {/* New class for login form */}
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="login-input email-input" // New class for email input
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input password-input" // New class for password input
        />
        <button type="submit" className="login-button">Login</button>
        
        <p style={{ marginTop: '5px' }}>
    If you are not registered <Link to='/signup'>Sign-Up</Link> here
</p>
      </form>
    </div>
  );
};

export default Login;
