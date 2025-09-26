const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const auth = require("../middleware/auth");

// 📩 Send a message to a user ID (public, no login required)
router.post("/send/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { fromName, content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Message content is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    const msg = new Message({
      toUser: user._id,
      fromName: fromName?.trim() || "Anonymous",
      content: content.trim(),
    });

    await msg.save();

    res.json({ ok: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Send message error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// 📥 Get messages for the authenticated user
router.get("/my", auth, async (req, res) => {
  try {
    const msgs = await Message.find({ toUser: req.userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ messages: msgs });
  } catch (err) {
    console.error("Fetch messages error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
