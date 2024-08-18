const asyncHandler = require('express-async-handler');
const User = require("../models/user_model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//@desc Register new User
//@router POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already registered');
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Passowrd", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if (user) {
        res.status(201).json({
            message: "User Registered successfully",
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc User Login
//@router POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error('User does not exists');
    } 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error('Password Incorrect');
    }
    const token = jwt.sign({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'},
    );
    if (!token) {
        res.status(400);
        throw new Error('Email Password is not Valid');
    }
    res.status(200).json({
        message: "User Log in Successfull", data: {
            token,
        }
    });
});

//@desc Current User
//@router GET /api/users/current
//@access Private

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Current User` });
});


module.exports = { loginUser, registerUser, currentUser };
