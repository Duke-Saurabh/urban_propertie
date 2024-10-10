// src/components/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import the CSS for styling
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Signup = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userFullName,setUserFullName] = useState('');

  const {createUser}=useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        email: userEmail,
        password: userPassword,
        fullName: userFullName,
      });
   
      setUserEmail('');
      setUserFullName('');
      setUserPassword('');
      console.log('Signup successful', response.data);
      alert(`Welcome, ${response.data.user.fullName}! You have signed up successfully.`);
    } catch (error) {
      console.error('Signup failed', error);
      alert('Signup failed. Please try again.'); // You can customize this message based on the error
    }
    // console.log('signup clicked')
    // createUser(userEmail,userPassword,userFullName);
    // // setUserEmail('');
    // // setUserPassword('');
    // // setUserFullName('');
 
  };
  

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSignup} className="signup-form-container">
        <h2>Signup</h2>
        <input
          type="text"
          value={userFullName}
          onChange={(e) => setUserFullName(e.target.value)}
          placeholder="Name"
          required
          className="email-input"
        />
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Email"
          required
          className="email-input"
        />
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="Password"
          required
          className="password-input"
        />
        <button type="submit" className="submit-button">Signup</button>
        <p style={{ marginTop: '5px' }}>If you are already Registered <Link to='/login'>Sign-In</Link> here</p>
      </form>
      
    </div>
  );
};

export default Signup;
