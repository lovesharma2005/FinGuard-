const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signupUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ error: 'Email or Username already exists' });
        }

        // Create a new user
        const newUser = new User({
            email,
            username,
            password,
        });

        await newUser.save();
        return res.status(201).json({ message: 'User successfully created', user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ 
            message: 'Login successful', 
            user: { 
                id: user._id,
                email: user.email,
                username: user.username
            } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login' });
    }
};

