const { Schema, model } = require("mongoose");

const LogSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Log text is Required"],
  },
  priority: {
    type: String,
    trim: true,
    default: "low",
    enum: ["low", "moderate", "high"],
    required: [true, "Log Priority is Required"],
  },
  user: {
    type: String,
    trim: true,
    required: [true, "User is Required"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Log", LogSchema);
