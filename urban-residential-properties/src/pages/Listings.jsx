import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listings.css'; 

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/properties');
        setProperties(response.data);
      } catch (err) {
        setError('Failed to fetch properties.');
      } finally {
        setLoading(false); 
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="listings-container">
      <h2>Property Listings</h2>
      <ul className="property-list">
        {properties.map(property => (
          <li key={property._id} className="property-item">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price: {property.price}</p>
            <a href={`/property/${property._id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listings;
