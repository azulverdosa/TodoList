const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('../models/userModel');

const findUserByEmail = (email) => User.findOne({ email });

router.route('/login').post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const foundUser = await findUserByEmail(email);
  const userHashedId = bcrypt.hashSync(foundUser._id.toString(), bcrypt.genSaltSync());

  if (foundUser) {
    const accessToken = await jwt.sign({ email }, process.env.ACCESS_SECRET, {
      expiresIn: '2m',
    });

    const refreshToken = await jwt.sign({ email: email }, process.env.REFRESH_SECRET, {
      expiresIn: '10m',
    });

    try {
      const doesPasswordMatch = await bcrypt.compareSync(password, foundUser.password);

      if (doesPasswordMatch) {
        // req.session.user = foundUser;
        // res.cookie('token', userHashedId);
        // console.log('Cookies: ', req.cookies);
        // console.log('session: ', req.session);

        return res.json({
          cookieStatus: 'cookie set',
          userHashedId: userHashedId,
          accessToken,
          refreshToken,
        });
      }
    } catch (err) {
      console.error(err);

      return res.status(500).send('Oops! Something happened!');
    }
  }

  console.log('No User Found');
  return res.status(400).send('No User Found');
});

router.route('/register').post(async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync());

  findUserByEmail(email).then((user) => {
    if (user) {
      return res.status(400).send('Email already in use');
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    res.cookie('token', newUser._id);
    req.session.newUser = newUser;

    newUser
      .save()
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(() => {
        return res.sendStatus(500);
      });
  });
});

router.route('/logout').get(async (req, res) => {
  res.clearCookie('token');
  res.send("cookie 'token' cleared");
  req.session.destroy();
  req.session = null;
});

module.exports = router;
