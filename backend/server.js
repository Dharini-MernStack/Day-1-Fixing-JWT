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
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error(err));


const connectDB= async()=>{
   try{
     mongoose.connect(process.env.MONGO_URI);
     console.log("MongoDB is connected");
   }catch(err){
      console.log("Collection ",err.message);
   }
}
connectDB();
const PORT=process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



