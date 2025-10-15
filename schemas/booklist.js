// models/Book.js
const mongoose = require('mongoose');

// Define the schema for a book
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  read: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
