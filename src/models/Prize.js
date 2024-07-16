const mongoose = require("mongoose");
const { Schema } = mongoose;

const prizeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, default: 10000000 }, // 10.000.000 VND
  count: { type: Number, default: 20 }, // Giới hạn count là 20
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prize", prizeSchema);
