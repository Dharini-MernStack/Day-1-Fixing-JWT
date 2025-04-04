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
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000 // Increase timeout to 10 seconds
})
.then(() => {
    console.log("Connected to MongoDB successfully!");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});

app.listen(5000, () => console.log("Server running on port 5000"));
