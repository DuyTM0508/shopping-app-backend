const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  currentUser,
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/userController");
const validateTokenHandle = require("../middleware/validateTokenHandle");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateTokenHandle, currentUser);

router.delete("/:id", deleteUser);

router.get("/:id", getUser);

router.put("/:id", updateUser);

module.exports = router;
