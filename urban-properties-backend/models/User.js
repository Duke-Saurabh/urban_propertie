const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User schema definition
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    return await bcrypt.compare(plainPassword, this.password);
  } catch (err) {
    console.error('Error comparing passwords:', err);
    throw new Error('Password comparison failed.');
  }
};

// Define constants for token secrets and lifetimes
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'yourrefreshtokensecrethere';
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE || '7h';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecrethere';
const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || '1h';

// Function to generate a refresh token
const generateRefreshToken = (payload) => {
  try {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFE });
  } catch (error) {
    throw new Error('Error generating refresh token');
  }
};

// Function to generate an access token
const generateAccessToken = (payload) => {
  try {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });
  } catch (error) {
    throw new Error('Error generating access token');
  }
};

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model and token generation functions
module.exports = { User, generateAccessToken, generateRefreshToken, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET };
