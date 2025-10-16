const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  read: { type: Boolean, required: true, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
