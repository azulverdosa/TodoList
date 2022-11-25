require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// const findUserByEmail = require('../helpers/databaseHelpers'); - not working??
const findUserByEmail = (email) => User.findOne({ email });

const userLogin = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const foundUser = await findUserByEmail(email);

  if (foundUser) {
    try {
      const doesPasswordMatch = await bcrypt.compareSync(password, foundUser.password);

      if (doesPasswordMatch) {
        console.log('PSWD MATCH');

        const accessToken = await jwt.sign(
          { 'foundUser._id': foundUser._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '30s', //change to 5m
          }
        );

        const refreshToken = await jwt.sign(
          { 'foundUser._id': foundUser._id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '10m',
          }
        );

        //save to database for logout use later:
        // const otherUsers = userDB.users.filter(person => person.username !== foundUser.username)
        // const currentuser = { ...foundUser, refreshToken}
        //usersDB.setUsers([...otherUsers, currentUser])

        // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        console.log('Cookies: ', req.cookies);

        return res
          .json({ accessToken })
          .cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      }
    } catch (err) {
      console.error(err);

      return res.status(500).send('Oops! Something happened!');
    }
  }

  console.log('No User Found');
  return res.status(401).send('No User Found');
};

const userRegistration = async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  const user = await findUserByEmail(email);

  if (user) {
    return res.status(400).send('Email already in use');
  }

  try {
    const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync());

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    newUser
      .save()
      .then(() => {
        console.log('New User Created');
        req.session.newUser = newUser;
        res.status(201).cookie('jwt', newUser._id);
      })
      .catch((err) => {
        console.log('why send? :>> ', err);
        res.sendStatus(500);
      });
  } catch (err) {
    console.log('error :>> ', err);
    res.status(500).send('Oops! Something happened!');
  }
};

const userLogout = async (req, res) => {
  //On client, also delete accessToken
  res.clearCookie('jwt');
  res.send("cookie 'jwt' cleared");
  req.session.destroy();
  req.session = null;
};

const userRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (cookies?.jwt) {
    try {
      console.log(cookies.jwt);

      const refreshToken = cookies.jwt;

      const foundUser = findUserByEmail(email); //should change
      if (!foundUser) return res.status(403).send('Forbidden');

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser._id !== decoded.foundUser._id) return res.sendStatus(403);

        const accessToken = jwt.sign(
          { 'foundUser._id': decoded.foundUser._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
        );

        return res.json({ accessToken });
      });
    } catch (err) {
      console.error(err);

      return res.status(500).send('Oops! Something happened!');
    }
  }

  console.log('No Cookie Found');
  return res.status(401).send('No Cookie Found');
};

module.exports = {
  userLogin,
  userLogout,
  userRegistration,
  userRefreshToken,
};
