const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  surname: String,
  dateOfBirth: String,
  phoneNumber: String,
  password: String,
  role: {
    type: String,
    enum: ["Admin", "Agent", "Customer"],
    default: "Customer",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
