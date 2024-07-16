const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Token = require("../models/Token");
require("dotenv").config();

// Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    const token = jwt.sign(
      { user_id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await new Token({
      user_id: req.user._id,
      token: token,
      expiry: expiry,
    }).save();

    res.redirect(
      `http://localhost:3000/login?token=${token}&expiry=${expiry.toISOString()}&role=${
        req.user.role
      }`
    );
  }
);

// Facebook Auth
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  async (req, res) => {
    const token = jwt.sign(
      { user_id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await new Token({
      user_id: req.user._id,
      token: token,
      expiry: expiry,
    }).save();

    res.redirect(
      `http://localhost:3000/login?token=${token}&expiry=${expiry.toISOString()}&role=${
        req.user.role
      }`
    );
  }
);

module.exports = router;
