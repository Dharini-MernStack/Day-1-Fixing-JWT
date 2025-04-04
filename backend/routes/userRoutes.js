const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(400).json({ message: "Please fill all fields"});
  }
  try{
    const existingUser = await User.findOne({username});
    console.log(existingUser)
    if(existingUser){
      return res.status(400).json({message: "User already exists"});
    }
    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered successfully" });
  }catch(error){
    res.status(500).json({ message: "Error registering user"});
  }
});

const jwtSecret = process.env.JWT_SECRET;
if(!jwtSecret){
  console.error("JWT seceret is not defined in .env file");
}
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
     return res.status(400),json({message: "Please fill all fields"});
  }
  try{
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" }); 
    }
  
    if (user.password !== password) { 
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(400).json({ message: "Invalid credientials"});
    }
  
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" }); 
    res.json({ token });
  }catch(error){
    res.status(500).json({message:"Error logging in"});
  }
});

module.exports = router;