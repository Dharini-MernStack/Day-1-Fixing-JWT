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

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI not found in environment variables.");
  process.exit(1); // Exit the app if the connection string is missing
}

mongoose.connect(mongoURI)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => {
  console.error("❌ Failed to connect to MongoDB:", err);
  process.exit(1); // Exit the app if DB connection fails
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
