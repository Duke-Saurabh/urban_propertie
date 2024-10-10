import './AddProperty.css';
import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    rooms: '',
    type: 'sale',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:3000/api/properties/add-property', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Property added successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        price: '',
        rooms: '',
        type: 'sale',
        image: null,
      });
    } catch (error) {
      console.error('Error adding property', error);
      alert('Failed to add property');
    }
  };

  return (
    <div className='addPropertyForm'>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Property Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Number of Rooms:</label>
        <input type="number" name="rooms" value={formData.rooms} onChange={handleChange}  />
      </div>
      <div>
        <label>Property Type:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
      </div>
      <div>
        <label>Property Image:</label>
        <input type="file" name="image" onChange={handleChange} />
      </div>
      <button type="submit">Add Property</button>
    </form>
    </div>
  );
};

export default AddProperty;
