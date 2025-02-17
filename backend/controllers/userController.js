const User = require('../models/User');

exports.loginOrSignup = async (req, res) => {
  try {
    const { googleId, name, email, avatar, qrCodeLink } = req.body;

    if (!googleId || !name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ where: { googleId } });

    if (user) {
      // Update QR code details on login
      user.qrCodeLink = qrCodeLink;
      await user.save();
      return res.status(200).json({ message: "User logged in", user });
    } 

    // If user does not exist, create a new user
    user = await User.create({ googleId, name, email, avatar, qrCodeLink });
    return res.status(201).json({ message: "User signed up", user });

  } catch (error) {
    console.error("Error in login/signup:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
