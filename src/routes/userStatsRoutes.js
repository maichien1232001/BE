const express = require("express");
const router = express.Router();
const userStatsController = require("../controllers/userStatsController");

router.get("/:userId", userStatsController.getUserStats);

module.exports = router;
