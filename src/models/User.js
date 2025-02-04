const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  role: { type: String, default: "user" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
