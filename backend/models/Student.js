const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  roll: String,
});

module.exports = mongoose.model('Student', studentSchema);
