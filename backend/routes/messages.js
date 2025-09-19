const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const auth = require("../middleware/auth");

// 📩 Send a message to a user by linkId (public)
router.post("/send/:linkId", async (req, res) => {
  const { linkId } = req.params;
  const { fromName, body } = req.body;

  if (!body || body.trim() === "") {
    return res.status(400).json({ error: "Message body is required" });
  }

  try {
    const user = await User.findOne({ linkId });
    if (!user) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    const msg = await Message.create({
      toUser: user._id,
      fromName: fromName && fromName.trim() !== "" ? fromName : "Anonymous",
      body: body.trim(),
    });

    res.json({
      ok: true,
      message: "Message sent successfully",
      msgId: msg._id,
    });
  } catch (err) {
    console.error("🔥 Error sending message:", err.message);
    res.status(500).json({ error: "Server error while sending message" });
  }
});

// 📬 Get messages for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const msgs = await Message.find({ toUser: req.user.id })
      .sort({ createdAt: -1 })
      .limit(200);

    res.json({ msgs });
  } catch (err) {
    console.error("🔥 Error fetching messages:", err.message);
    res.status(500).json({ error: "Server error while fetching messages" });
  }
});

module.exports = router;
