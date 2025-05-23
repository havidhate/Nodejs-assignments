// models/Address.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: {
    type: String,
    default: 'India'
  },
  pincode: String
});

module.exports = addressSchema;
