const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("./config/passportConfig");
const session = require("express-session");

const userRoutes = require("./routes/userRoutes");
const prizeRoutes = require("./routes/prizeRoutes");
const userStatsRoutes = require("./routes/userStatsRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const authRoutes = require("./routes/authRoutes"); // Thêm dòng này
const profileRoutes = require("./routes/profileRoutes"); // Thêm dòng này

const app = express();

// Kết nối cơ sở dữ liệu
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "e2a8da48788bc058842e60065b32c4c7caf8a0187cb5464049302e372c3e76c8", // Thay thế bằng một chuỗi bí mật của bạn
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // Thêm dòng này
app.use(passport.session()); // Thêm dòng này nếu sử dụng session

// Routes
app.use("/api/users", userRoutes);
app.use("/api/prizes", prizeRoutes);
app.use("/api/user-stats", userStatsRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/auth", authRoutes); // Thêm dòng này
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
