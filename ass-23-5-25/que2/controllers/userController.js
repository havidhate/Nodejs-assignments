const User = require("../models/User");

exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    user.profiles.push(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const { profile } = req.query;
  try {
    let users = await User.find();
    if (profile) {
      users = users.filter(user =>
        user.profiles.some(p => p.profileName === profile)
      );
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchUser = async (req, res) => {
  const { name, profile } = req.query;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });

    const matchedProfile = user.profiles.find(p => p.profileName === profile);
    if (matchedProfile) return res.status(200).json({ user, matchedProfile });

    res.status(200).json({
      message: "User found, but profile not found",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId, profileName } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const profile = user.profiles.find(p => p.profileName === profileName);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    profile.url = req.body.url || profile.url;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { userId, profileName } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.profiles = user.profiles.filter(p => p.profileName !== profileName);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
