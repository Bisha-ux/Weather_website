import express from "express";
import cors from "cors"; // Import CORS package
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend requests
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    credentials: true, // Allow cookies if using authentication
  })
);

app.use((err, _req, res, _next) => {
    console.error("🔥 Internal Server Error:", err); // Log exact error
    res.status(500).json({ message: "Server error, try again later" });
  });
  

// Middleware
app.use(express.json()); // Parse JSON requests

// Import routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(5001, () => console.log("Server running on port 5001"));
  })
  .catch((error) => console.error("MongoDB connection error:", error));
