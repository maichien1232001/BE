const express = require("express");
const authenticateJWT = require("../middleware/authenticateJWT");
const User = require("../models/User");

const router = express.Router();

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
