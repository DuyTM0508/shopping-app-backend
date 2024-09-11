const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//! Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all input is provided
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All input is required");
  }

  // Check if user already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//! Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password is required");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
