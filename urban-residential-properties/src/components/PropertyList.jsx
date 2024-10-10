import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import './PropertyList.css'; 

const PropertyList = ({ properties }) => {
  return (
    <div className="property-list">
      {properties && properties.length > 0 ? (
        properties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.image} alt={property.title} />
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <Link to={`/property/${property.id}`}>
              <button className="view-button">View Details</button>
            </Link>
          </div>
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </div>
  );
};

// Adding PropTypes
PropertyList.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PropertyList;
