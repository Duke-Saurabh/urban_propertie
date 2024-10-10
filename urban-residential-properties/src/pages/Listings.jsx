import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listings.css'; // Optional: Import CSS for styling

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/properties');
        setProperties(response.data);
      } catch (err) {
        setError('Failed to fetch properties.');
      } finally {
        setLoading(false); // Set loading to false once fetch is done
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div>{error}</div>; // Display error message
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
            <a href={`/property/${property._id}`}>View Details</a> {/* Link to property details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listings;
