const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/userModel');

// Desc : Register new user -- Temporary Route
// Route : POST

const registerUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await UserModel.findOne({username})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await UserModel.create({
        username,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
    res.json({ message: 'User Registered'})
});

// Desc : Login User
// Route : POST

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    // Check for username
    const user = await UserModel.findOne({ username })

    // Check for password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.json(400)
        throw new Error('Invalid credentials')
    }
});

// Desc : Get the admin dashboard
// Route : GET

const getDashboard = asyncHandler(async (req, res) => {
    const {_id, username} = await UserModel.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        username: username
    })
});

// Desc: Change Password
// Route: POST

const changePassword = asyncHandler(async (req, res) => {
    const { username, oldPassword, newPassword } = req.body; 
    const user = await UserModel.findOne({ username });
    try {
        // Compare old pass to database pass
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            // Salt and hash new pass
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            // Update new pass in mongo
            const updatePassword = await user.updateOne( { password: hashedPassword });
            if (updatePassword) {
                return res.status(200).json({ msg: `${username} successfully changed password` })
            }
        }
    } catch (error) {
        console.error(error)
    }
})

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
};

module.exports = {
    registerUser,
    loginUser,
    getDashboard,
    changePassword
}