import React, { useState, useEffect } from 'react';
import './Home.css';
import { useProperties } from '../context/propertiesContext';
import FilterComponent from '../components/Filter';

const Home = () => {
  const { properties, loading, error } = useProperties(); 
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    setFilteredProperties(properties); 
  }, [properties]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Urban Residential Properties</h1>
        <p>Your dream home is just a click away!</p>
      </header>
      <FilterComponent filteredData={properties} setFilteredData={setFilteredProperties} />
      <main className="home-content">
        <section className="featured-properties">
          <h2>Featured Properties</h2>

          {/* Display loading, error, or properties */}
          {loading ? (
            <p>Loading properties...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="property-cards">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div key={property._id} className="property-card">
                    <img
                      src={property.imageUrl || "https://via.placeholder.com/300"} 
                      alt={property.title}
                    />
                    <h3>{property.title}</h3>
                    <p>{property.description}</p>
                    <p><strong>Price:</strong> ${property.price}</p>
                    <p><strong>Location:</strong> {property.location}</p>
                    <button className="btn">View Details</button>
                  </div>
                ))
              ) : (
                <p>No properties available</p>
              )}
            </div>
          )}
        </section>

        <section className="about">
          <h2>About Us</h2>
          <p>
            We are dedicated to helping you find the perfect home. Our team
            specializes in urban residential properties that suit your lifestyle
            and budget.
          </p>
          <button className="btn">Learn More</button>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Urban Residential Properties</p>
      </footer>
    </div>
  );
};

export default Home;
