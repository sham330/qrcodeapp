const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

passport.use(new GoogleTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,  // No clientSecret needed
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { googleId: profile.id } });

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        qrCodeLink:[],
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return done(null, { user, token });
  } catch (err) {
    return done(err, null);
  }
}));

module.exports = passport;
