const Token = require("../models/Token");
const User = require("../models/User");
const jwt = require("jsonwebtoken"); // Sử dụng jwt để tạo token
const bcrypt = require("bcryptjs");
// Đăng nhập và tạo token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  try {
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
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 ngày sau

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

// Lấy token hiện tại của user
exports.getToken = async (req, res) => {
  const { userId } = req.params;

  try {
    const token = await Token.findOne({ user_id: userId });
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    res.status(200).json({ token: token.token, expiry: token.expiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
