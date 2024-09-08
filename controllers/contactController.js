const asyncHandler = require("express-async-handler");

//! Get all contacts
const getAllContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get all contacts from the backend!",
  });
});

//! Get single contact
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Get contact from the backend! ${req.params.id}`,
  });
});

//! Create a contact
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("All input is required");
  }

  res.status(200).json({
    message: "Post to the backend!",
  });
});

//! Update a contact
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `update from the backend! ${req.params.id}`,
  });
});

//! Delete a contact
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete from the backend! ${req.params.id}`,
  });
});

module.exports = {
  getAllContact,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
