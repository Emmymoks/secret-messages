const jwt = require('jsonwebtoken');
module.exports = function(req, res, next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'no token' });
  const token = auth.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'no token' });
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.userId = decoded.id;
    next();
  } catch(err){
    return res.status(401).json({ message: 'invalid token' });
  }
}
