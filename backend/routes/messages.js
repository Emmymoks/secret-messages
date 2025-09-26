const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Send a message to a user ID (public link)
router.post('/send/:userId', async (req, res) => {
  const { userId } = req.params;
  const { fromName, content } = req.body;
  if(!content) return res.status(400).json({ message: 'content required' });
  try {
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ message: 'recipient not found' });
    const msg = new Message({ toUser: user._id, fromName: fromName || 'anon', content });
    await msg.save();
    res.json({ ok: true, message: 'sent' });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

// Get messages for authenticated user
router.get('/my', auth, async (req, res) => {
  try {
    const msgs = await Message.find({ toUser: req.userId }).sort({ createdAt: -1 });
    res.json({ messages: msgs });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;
