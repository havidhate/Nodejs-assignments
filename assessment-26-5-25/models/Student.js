const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  age: {
    type: Number,
    required: true,
    min: 10,
    max: 20
  },
  grade: {
    type: String,
    enum: ['9th', '10th', '11th', '12th']
  },
  section: {
    type: String,
    enum: ['A', 'B', 'C', 'D']
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
