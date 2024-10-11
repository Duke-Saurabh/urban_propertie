import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";


const AuthContext = createContext();

// const BASE_URL = "http://localhost:3000/"; // Corrected the URL scheme
// const BASE_URL = "/"; // Corrected the URL scheme

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

   useState(()=>{
    const token=localStorage.getItem('accessToken');
    if(token){
      setIsAuthenticated(true);
    }

   },[isAuthenticated])
  
  function logout() {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
   alert("Logged Out Successfully");
  }

  return (
    <AuthContext.Provider
      value={{
        
        logout,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
       
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuth, AuthProvider, AuthContext };