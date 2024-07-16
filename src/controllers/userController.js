const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Đăng ký người dùng mới và đăng nhập ngay lập tức
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Kiểm tra mật khẩu có được cung cấp không
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    // Tạo token
    const token = jwt.sign(
      { user_id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newToken = new Token({
      user_id: user._id,
      token: token,
      expiry: expiry,
    });

    await newToken.save();

    res.status(200).json({
      token: newToken.token,
      expiry: newToken.expiry,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Kiểm tra mật khẩu nếu có
    if (user.password && !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Tạo token
    const token = jwt.sign(
      { user_id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newToken = new Token({
      user_id: user._id,
      token: token,
      expiry: expiry,
    });

    await newToken.save();

    res.status(200).json({
      token: newToken.token,
      expiry: newToken.expiry,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
