const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Not used correctly
const User = require("../models/User");

const router = express.Router();
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

module.exports = router;
