import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios"; 
const PropertiesContext = createContext();

function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      console.log('fetching properties')
      try {
        const response = await axios.get("/api/properties/"); 
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

PropertiesProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export { useProperties, PropertiesProvider };
