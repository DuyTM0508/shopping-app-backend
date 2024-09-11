const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { constant } = require("../constants/constant");

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
    const accessToken = getAccessToken(user);
    res.status(200).json({accessToken});
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//! Get user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

//! Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const deleteUser = await User.findByIdAndDelete(req.params.id);

  res.status(200).json(deleteUser);
});

//! Update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updateUser);
});

//! Get current user
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const getAccessToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: constant.ACCESS_TOKEN_EXPIRE,
    }
  );
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  deleteUser,
  getUser,
  updateUser,
};
