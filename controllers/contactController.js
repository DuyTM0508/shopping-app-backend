const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//! Get all contacts
const getAllContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get all contacts from the backend!",
  });
});

//! Get single contact
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if(!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

//! Create a contact
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("All input is required");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(200).json(contact);
});

//! Update a contact
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if(!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  res.status(200).json(updateContact);
});

//! Delete a contact
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if(!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const deleteContact = await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json(deleteContact);
});

module.exports = {
  getAllContact,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
