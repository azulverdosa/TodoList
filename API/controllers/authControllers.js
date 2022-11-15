require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// const findUserByEmail = require('../helpers/databaseHelpers'); - not working??
const findUserByEmail = (email) => User.findOne({ email });

//@desc Login
//@route POST /auth/login
//@access Public
const userLogin = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const foundUser = await findUserByEmail(email);

  if (foundUser) {
    try {
      const doesPasswordMatch = bcrypt.compareSync(password, foundUser.password);

      if (doesPasswordMatch) {
        const payload = { userId: foundUser._id };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '10s', //change to xm
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '10s', //change to xdays
        });

        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 60, //change to 24 * 60 * 60 * 1000
        });
        console.log('Cookies: ', req.cookies);

        console.log('PSWD MATCH');
        return res.json({ accessToken, refreshToken });
      }
    } catch (err) {
      console.error(err);

      return res.status(500).send('Oops! Something happened!');
    }
  }

  console.log('No User Found');
  return res.status(401).send('No User Found');
};

//@desc Refresh
//@route GET /auth/refresh
//@access Public - because access token has expired
const userRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (cookies?.jwt) {
    try {
      console.log(cookies.jwt);

      const refreshToken = cookies.jwt;

      const foundUser = await findUserByEmail(email); //should change
      if (!foundUser) return res.status(403).send('Forbidden');

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser._id !== decoded.foundUser._id)
          return res.send(403).status('Not allowed');

        const accessToken = jwt.sign(
          { 'foundUser._id': decoded.foundUser._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '10s' }
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

//@desc Logout
//@route POST /auth/logout
//@access Public - clear cookies
const userLogout = async (req, res) => {
  //On client, also delete accessToken

  //delete refresh token in DB
  // const otherUsers = Users.filter((person) => person.refreshToken !== founduser.refreshToken);
  // const currenUser = { ...founduser, refreshToken: '' };
  const cookies = req.cookies;

  if (cookies?.jwt) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send('jwt cookie cleared');
    // req.session.destroy();
    // req.session = null;
  }
  console.log('No cookie found');
  return res.status(204).send('No Content');
};

module.exports = {
  userLogin,
  userLogout,
  userRefreshToken,
};
