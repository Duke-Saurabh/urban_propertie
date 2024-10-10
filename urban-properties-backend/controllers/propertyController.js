const Property = require('../models/Property.js');

const properties = [
  {
    _id: '1',
    title: 'Luxury Apartment',
    description: 'Located in the city center with stunning views.',
    price: '$2000/month',
  },
  {
    _id: '2',
    title: 'Cozy Cottage',
    description: 'A beautiful cottage surrounded by nature.',
    price: '$1200/month',
  },
  {
    _id: '3',
    title: 'Modern Villa',
    description: 'A spacious villa with a private pool.',
    price: '$3000/month',
  },
];

// Get all properties
exports.getProperties = async (req, res) => {
  try {
    // const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new property
exports.createProperty = async (req, res) => {
  const { title, price, description, location, type, imageUrl } = req.body;

  try {
    const newProperty = new Property({
      title,
      price,
      description,
      location,
      type,
      imageUrl
    });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
