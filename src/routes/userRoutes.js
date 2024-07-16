const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Đăng ký người dùng mới
router.post("/register", userController.register);

// Lấy tất cả người dùng
router.get("/", userController.getAllUsers);

module.exports = router;
