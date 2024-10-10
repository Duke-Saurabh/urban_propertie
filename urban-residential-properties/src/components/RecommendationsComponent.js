import React, { useEffect, useState } from 'react';
import './RecommendationsComponent.css'
const RecommendationsComponent = () => {
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/recommendations');  
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setRecommendedProperties(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recommendations">
      <h2>Recommended Properties for You</h2>
      <div className="property-list">
        {recommendedProperties.length > 0 ? (
          recommendedProperties.map((property) => (
            <div key={property._id} className="property-card">
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p>{property.price}</p>
            </div>
          ))
        ) : (
          <p>No recommendations available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationsComponent;
