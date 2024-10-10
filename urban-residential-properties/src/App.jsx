// src/App.jsx
import "./App.css";
import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Profile from "./pages/Profile";
import Signup from "./components/Signup"; // Import the Signup component
import Login from "./components/Login"; // Import the Login component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/protectedRoute";
import AddProperty from "./components/AddProperty";
import { PropertiesProvider } from "./context/propertiesContext";

const App = () => {
  return (
    <PropertiesProvider>
      <AuthProvider>
        <Router>
          <div className="Container">
            <div className="header-container">
              <Header />
            </div>
            <div className="main-container">
              <Routes>
                <Route path="/" element={<Signup />} />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/listings"
                  element={
                    <ProtectedRoute>
                      <Listings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/AddProperty"
                  element={
                    <ProtectedRoute>
                      <AddProperty />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/signup" element={<Signup />} />{" "}
                {/* Adding Signup route */}
                <Route path="/login" element={<Login />} />{" "}
                {/* Adding Login route */}
                {/* Add more routes as needed */}
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </PropertiesProvider>
  );
};

export default App;
