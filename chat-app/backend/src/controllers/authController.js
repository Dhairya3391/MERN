const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const authController = {
    // Register new user
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const user = new User({
                username,
                email,
                password,
                uniqueId: uuidv4()
            });

            await user.save();

            // Create token
            const token = jwt.sign(
                { id: user._id, uniqueId: user.uniqueId },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    uniqueId: user.uniqueId
                }
            });

        } catch (err) {
            res.status(500).json({ message: 'Error registering user', error: err.message });
        }
    },

    // Login user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User does not exist' });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Create token
            const token = jwt.sign(
                { id: user._id, uniqueId: user.uniqueId },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    uniqueId: user.uniqueId
                }
            });

        } catch (err) {
            res.status(500).json({ message: 'Error logging in', error: err.message });
        }
    },

    // Get user profile
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching profile', error: err.message });
        }
    }
};

module.exports = authController;