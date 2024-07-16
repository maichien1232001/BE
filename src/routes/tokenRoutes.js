const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");

router.post("/login", tokenController.login);
router.get("/:userId", tokenController.getToken);

module.exports = router;
