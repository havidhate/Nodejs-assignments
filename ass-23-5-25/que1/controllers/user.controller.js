const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.addresses.push(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserSummary = async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;
    const totalAddresses = users.reduce((acc, user) => acc + user.addresses.length, 0);
    const summary = users.map(u => ({
      name: u.name,
      addressCount: u.addresses.length
    }));
    res.json({ totalUsers, totalAddresses, summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { userId, index } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.addresses.length <= index) {
      return res.status(400).json({ error: "Address index invalid" });
    }

    user.addresses.splice(index, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
