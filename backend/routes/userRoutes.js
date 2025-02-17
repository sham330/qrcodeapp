const express = require('express');
const { loginOrSignup } = require('../controllers/userController');

const router = express.Router();

router.post('/auth', loginOrSignup);

module.exports = router;
