require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);

// Connect to MongoDB
const connectDB = async () =>{
  try{
    mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB connected"); 
  }catch(error){
    console.log("Mongo DB connection failed",error);
  }
}
connectDB();



app.listen(5000, () => console.log("Server running on port 5000"));