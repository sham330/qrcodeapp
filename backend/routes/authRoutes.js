const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/auth/google', passport.authenticate('google-token', { session: false }), (req, res) => {
  res.json({ user: req.user.user, token: req.user.token });
});

module.exports = router;
