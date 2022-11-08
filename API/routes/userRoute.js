const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const { userLogin, userLogout, userRegistration } = require('../controllers/userControllers');

router.route('/login').post(userLogin);

router.route('/register').post(userRegistration);

router.route('/logout').get(userLogout);

module.exports = router;
