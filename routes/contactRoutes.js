const express = require("express");
const {
  getAllContact,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateTokenHandle = require("../middleware/validateTokenHandle");

const router = express.Router();

router.use(validateTokenHandle);
router.route("/").get(getAllContact).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
