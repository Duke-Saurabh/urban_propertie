import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Using axios for API requests

const PropertiesContext = createContext();

function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all properties from the backend when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      console.log('fetching properties')
      try {
        const response = await axios.get("http://localhost:3000/api/properties/"); // Replace with your actual API URL
        setProperties(response.data);
        console.log(response.data)
        setError(null);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []); 

  console.log("fetched properties",properties)
  return (
    <PropertiesContext.Provider
      value={{
        properties,
        loading,
        error,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

function useProperties() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertiesProvider");
  }
  return context;
}

// Prop validation for PropertiesProvider
PropertiesProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures `children` is passed and is a React node
};

export { useProperties, PropertiesProvider };
