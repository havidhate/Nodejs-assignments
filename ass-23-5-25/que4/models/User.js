const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["student", "instructor", "admin"], required: true },
  profile: {
    bio: { type: String },
    socialLinks: [
      {
        platform: String,
        url: { type: String, validate: /^https?:\/\/.+/ }
      }
    ],
    preferences: {
      preferredLanguage: String
    }
  }
});

module.exports = mongoose.model('User', userSchema);
