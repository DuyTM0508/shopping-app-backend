const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Contact Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Contact Phone is required"],
    },
    email: {
      type: String,
      required: [true, "Contact Email is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
