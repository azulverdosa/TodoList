const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

const findUserByEmail = (email) => User.findOne({ email });

router.route('/').post((req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  findUserByEmail(email).then((user) => {
    if (user) {
      return res.status(400).send('Email already in use');
    }

    const newUser = new User({
      name,
      email,
      password,
    });

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

module.exports = router;
