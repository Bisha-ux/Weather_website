import express from "express";
import User from "../models/User.js"; // Ensure this is the correct path
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
      console.log("🔥 Request Body:", req.body); // Debugging
  
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("🔥 Registration Error:", error);
      res.status(500).json({ message: "Server error, try again later" });
    }
  });
  
  
  

export default router;
