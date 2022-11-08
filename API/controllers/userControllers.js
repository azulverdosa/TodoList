const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
// const findUserByEmail = require('../helpers/databaseHelpers');
const findUserByEmail = (email) => User.findOne({ email });

const userLogin = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const foundUser = await findUserByEmail(email);
  const userHashedId = bcrypt.hashSync(foundUser._id.toString(), bcrypt.genSaltSync());

  if (foundUser) {
    try {
      const doesPasswordMatch = await bcrypt.compareSync(password, foundUser.password);

      if (doesPasswordMatch) {
        const accessToken = await jwt.sign(
          { 'foundUser._id': foundUser._id },
          process.env.ACCESS_SECRET,
          {
            expiresIn: '2m',
          }
        );

        const refreshToken = await jwt.sign(
          { 'foundUser._id': foundUser._id },
          process.env.REFRESH_SECRET,
          {
            expiresIn: '10m',
          }
        );

        req.session.user = foundUser;
        res.cookie('token', accessToken);
        // console.log('Cookies: ', req.cookies);
        // console.log('session: ', req.session);

        return res.json({
          cookieStatus: 'cookie set',
          userHashedId,
          foundUserId: foundUser._id,
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
};

const userRegistration = async (req, res) => {
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
};

const userLogout = async (req, res) => {
  res.clearCookie('token');
  res.send("cookie 'token' cleared");
  req.session.destroy();
  req.session = null;
};

module.exports = {
  userLogin,
  userLogout,
  userRegistration,
};
