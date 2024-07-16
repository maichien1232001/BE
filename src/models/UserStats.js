const mongoose = require("mongoose");
const { Schema } = mongoose;

const userStatsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  total_amount: { type: Number, default: 0 },
  withdraw_count: { type: Number, default: 0 },
});

module.exports = mongoose.model("UserStats", userStatsSchema);
