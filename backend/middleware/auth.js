const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next){
  const auth = req.header('Authorization') || '';
  if(!auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  const token = auth.slice(7);
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  }catch(e){
    res.status(401).json({ error: 'Invalid token' });
  }
}
