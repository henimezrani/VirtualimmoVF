const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  date: Date,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
