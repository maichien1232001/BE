const express = require("express");
const router = express.Router();
const prizeController = require("../controllers/prizeController");

router.post("/withdraw", prizeController.withdrawPrize);

module.exports = router;
