import React from 'react';
import PropertyList from '../components/PropertyList';
import './Profile.css'; 
const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    properties: [
      {
        id: 1,
        title: "Cozy Apartment in City Center",
        image: "https://via.placeholder.com/300",
        description: "A beautiful apartment located in the heart of the city.",
      },
      {
        id: 2,
        title: "Spacious Family House",
        image: "https://via.placeholder.com/300",
        description: "A spacious house perfect for families.",
      },
      {
        id: 3,
        title: "Modern Studio Apartment",
        image: "https://via.placeholder.com/300",
        description: "A modern studio with all amenities.",
      },
    ],
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-header">
        <h1>{user.name}'s Profile</h1>
        <p>Email: {user.email}</p>
      </div>
      <div className="user-properties-section">
        <h2>Your Properties</h2>
        <PropertyList properties={user.properties} /> {/* Pass properties to PropertyList */}
      </div>
    </div>
  );
};

export default Profile;
