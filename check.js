const mongoose = require("mongoose");
const User = require("./src/models/User");
const connectDB = require("./src/config/db");

connectDB();

const createSuperAdmin = async () => {
  const email = "admin@gmail.com";
  const password = "admin@123";

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name: "Super Admin",
        email,
        password,
        role: "admin", // Đảm bảo rằng vai trò là "admin"
      });
      await user.save();
      console.log("Super Admin created");
    } else {
      console.log("Super Admin already exists");
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

createSuperAdmin();
