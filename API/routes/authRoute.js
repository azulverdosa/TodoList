const express = require('express');
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');

const { userLogin, userLogout, userRefreshToken } = require('../controllers/authControllers');

router.route('/').post(userLogin);

router.route('/refresh').get(verifyJWT, userRefreshToken);

router.route('/logout').get(verifyJWT, userLogout);

module.exports = router;
