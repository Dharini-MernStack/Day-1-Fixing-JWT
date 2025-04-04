const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Not used correctly
const User = require("../models/User");
require('dotenv').config();


const router = express.Router();
router.post("/register", async (req, res) => {
  // const { username, password } = req.body;
  // const user = new User({ username, password });
  // await user.save();
  // res.json({ message: "User registered successfully" });
  try{
    const {username,password}=req.body;
    if(!username || !password){
       return res.status(400).json({message : "username and password is required"});
    }
    const existingUser=await User.findOne({username});
    if(existingUser){
       return res.status(400).json({message: "Username already exists"});
    }

    const hashPassword=await bcrypt.hash(password,10);
    const user=new User({username,password:hashPassword});
    await user.save();
    res.status(200).json({message: "User registered successfully"});
  }catch(err){
     console.log(err.message);
     res.status(500).json({message: "Server problem"})
  }
});




router.post("/login", async (req, res) => {
  // const { username, password } = req.body;
  // const user = await User.findOne({ username });
  // if (!user) {
  //   return res.status(400).json({ message: "User not found" });
  // }
  // if (user.password !== password) {
  //   return res.status(400).json({ message: "Invalid credentials" });
  // }
  // const token = jwt.sign({ userId: user._id }, "insecuresecret", { expiresIn: "1h" });
  // res.json({ token });
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "The username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "The user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "The server problem" });
  }
});


module.exports = router;