const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  token: String,
  expiry: Date,
});

module.exports = mongoose.model("Token", tokenSchema);
