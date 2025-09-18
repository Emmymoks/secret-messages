const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Send message to a user by linkId (public)
router.post('/send/:linkId', async (req,res) => {
  const { linkId } = req.params;
  const { fromName, body } = req.body;
  if(!body) return res.status(400).json({ error: 'Message body required' });
  try{
    const user = await User.findOne({ linkId });
    if(!user) return res.status(404).json({ error: 'Recipient not found' });
    const msg = await Message.create({ toUser: user._id, fromName: fromName || 'Anonymous', body });
    res.json({ ok: true, message: 'Sent' });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get messages for logged-in user
router.get('/', auth, async (req,res) => {
  try{
    const msgs = await Message.find({ toUser: req.user.id }).sort({ createdAt: -1 }).limit(200);
    res.json({ msgs });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
