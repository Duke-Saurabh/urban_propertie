const { User, generateAccessToken, generateRefreshToken } = require('../models/User'); // Ensure the path is correct
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Full name, email, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ fullName, email, password });
        await newUser.save();

        const accessToken = generateAccessToken({ id: newUser._id });
        const refreshToken = generateRefreshToken({ id: newUser._id });

        res.status(201).json({ accessToken, refreshToken, user: { id: newUser._id, fullName, email } });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
   
    console.log(req.body);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

      

        const isMatch = await user.comparePassword(password);

       
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password. Try again or use forgot password.' });
        }

       
        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });

        console.log(refreshToken);
        res.status(200).json({ accessToken, refreshToken, user: { id: user._id, fullName: user.fullName, email: user.email } });
    } catch (error) {
        console.error('Error during login:', error);
        if (error instanceof APIError) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getProfile = (req, res) => {
    const user = req.user; 
    res.status(200).json({ user });
};
