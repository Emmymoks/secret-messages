const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const genLink = require('../utils/generateLink');
require('dotenv').config();

router.post('/register', async (req,res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ error: 'Missing fields' });
  try{
    const exists = await User.findOne({ username });
    if(exists) return res.status(400).json({ error: 'Username taken' });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const linkId = genLink();
    const user = await User.create({ username, passwordHash, linkId });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { username: user.username, linkId: user.linkId } });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req,res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ error: 'Missing fields' });
  try{
    const user = await User.findOne({ username });
    if(!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { username: user.username, linkId: user.linkId } });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
