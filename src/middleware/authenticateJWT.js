const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }
  console.log(process.env.JWT_SECRET, 2222);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Thêm thông tin người dùng vào đối tượng req
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateJWT;
