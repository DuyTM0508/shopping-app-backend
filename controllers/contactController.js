const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//! Get all contacts
const getAllContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

//! Get single contact
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
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
    user_id: req.user.id,
  });

  res.status(200).json(contact);
});

//! Update a contact
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "You are not authorized to update this contact information"
    );
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updateContact);
});

//! Delete a contact
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You are not authorized to delete this contact");
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
