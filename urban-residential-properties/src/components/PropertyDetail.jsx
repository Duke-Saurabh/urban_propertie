// src/components/PropertyDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './PropertyDetail.css'; // Import CSS for styling

const PropertyDetail = () => {
  const { id } = useParams();

  // Simulate property details based on the property id
  const propertyDetails = {
    1: {
      title: 'Beautiful House',
      description: 'A beautiful house located in the heart of the city.',
      image: 'https://via.placeholder.com/600x400',
      features: ['3 Bedrooms', '2 Bathrooms', 'Garden', 'Garage'],
      price: '$500,000',
    },
    2: {
      title: 'Cozy Apartment',
      description: 'A cozy apartment with a stunning view.',
      image: 'https://via.placeholder.com/600x400',
      features: ['2 Bedrooms', '1 Bathroom', 'Balcony', 'Pool'],
      price: '$300,000',
    },
    3: {
      title: 'Luxury Villa',
      description: 'A luxury villa with all modern amenities.',
      image: 'https://via.placeholder.com/600x400',
      features: ['5 Bedrooms', '4 Bathrooms', 'Swimming Pool', 'Garden'],
      price: '$1,200,000',
    },
    // Add more dummy properties as needed
  };

  const property = propertyDetails[id] || propertyDetails[1]; // Fallback to the first property if id not found

  return (
    <div className="property-detail">
      <h1>{property.title}</h1>
      <img src={property.image} alt={property.title} className="property-image" />
      <p>{property.description}</p>
      <h2>Price: {property.price}</h2>
      <h3>Features:</h3>
      <ul className="feature-list">
        {property.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="contact-button">Contact Agent</button>
    </div>
  );
};

export default PropertyDetail;
