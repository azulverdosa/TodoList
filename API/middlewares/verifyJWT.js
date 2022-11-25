require('dotenv').config();

const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('req.headers :>> ', req.headers);
  console.log('authHeader :>> ', authHeader);

  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Nope, no header auth');
    console.log(req.headers.cookie);
    return res.sendStatus(401);
  }

  console.log('authHeader: >>', authHeader); //Bearer jwt

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.sendStatus(403); //forbidden - invalid jwt
    }

    req.userId = payload.userId;
    next();
  });
};

module.exports = verifyJWT;
