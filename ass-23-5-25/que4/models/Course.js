const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  schedule: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: [{ type: String }] // e.g. ["Monday", "Wednesday"]
  }
});

module.exports = mongoose.model('Course', courseSchema);
