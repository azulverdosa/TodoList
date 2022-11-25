const express = require('express');
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');

const {
  userLogin,
  userLogout,
  userRegistration,
  userRefreshToken,
} = require('../controllers/userControllers');

router.route('/login').post(userLogin);

router.route('/register').post(userRegistration);

router.route('/logout').get(userLogout);

router.route('/refresh').get(userRefreshToken);

module.exports = router;
