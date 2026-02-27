require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Message Schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Sanjeev's backend server! 🚀" });
});

// Contact form route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    console.log("📬 New message saved to database!");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    res.status(200).json({
      success: true,
      message: `Thanks ${name}! Your message has been saved!`,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Get all messages route
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch messages" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});