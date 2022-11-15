require('dotenv').config();

const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Nope, no header auth', authHeader);
    console.log(req.headers);
    return res.sendStatus(401);
  }

  console.log('authHeader: >>', authHeader); //Bearer jwt

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //forbidden - invalid jwt
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyJWT;
