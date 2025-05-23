// models/User.js
const mongoose = require('mongoose');
const addressSchema = require('./Address');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  age: Number,
  addresses: [addressSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
