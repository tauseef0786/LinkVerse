const User = require('../models/User');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('posts')
      .populate('followers')
      .populate('following');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Follow a user
const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.userId);

    if (!userToFollow || !currentUser) return res.status(404).json({ error: 'User not found' });

    if (currentUser.following.includes(userToFollow._id)) {
      currentUser.following = currentUser.following.filter((id) => id.toString() !== userToFollow._id.toString());
      userToFollow.followers = userToFollow.followers.filter((id) => id.toString() !== currentUser._id.toString());
    } else {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    }

    await currentUser.save();
    await userToFollow.save();
    res.json({ message: 'Follow status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserProfile, followUser };