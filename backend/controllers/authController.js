const User = require('../models/User');

const loginUser = async (req, res) => {
  const { email, name, googleId } = req.body;
console.log('email', email)
  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not found
      user = new User({ email, name, googleId });
      await user.save();
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { loginUser };
