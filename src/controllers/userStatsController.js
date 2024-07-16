const UserStats = require("../models/UserStats");

exports.getUserStats = async (req, res) => {
  const { userId } = req.params;

  try {
    const userStats = await UserStats.findOne({ user_id: userId });
    if (userStats) {
      res.json(userStats);
    } else {
      res.status(404).json({ message: "User stats not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
