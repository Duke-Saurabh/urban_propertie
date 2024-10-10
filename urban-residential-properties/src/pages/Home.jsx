// src/pages/Home.jsx
import React from 'react';
import './Home.css';
const Home = () => {
    
    

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Urban Residential Properties</h1>
        <p>Your dream home is just a click away!</p>
      </header>

      <main className="home-content">
        <section className="featured-properties">
          <h2>Featured Properties</h2>
          <div className="property-cards">
            <div className="property-card">
              <img src="https://via.placeholder.com/300" alt="Property 1" />
              <h3>Luxury Apartment</h3>
              <p>Located in the city center with stunning views.</p>
              <button className="btn">View Details</button>
            </div>

            <div className="property-card">
              <img src="https://via.placeholder.com/300" alt="Property 2" />
              <h3>Cozy Cottage</h3>
              <p>A beautiful cottage surrounded by nature.</p>
              <button className="btn">View Details</button>
            </div>

            <div className="property-card">
              <img src="https://via.placeholder.com/300" alt="Property 3" />
              <h3>Modern Villa</h3>
              <p>A spacious villa with a private pool.</p>
              <button className="btn">View Details</button>
            </div>
          </div>
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
