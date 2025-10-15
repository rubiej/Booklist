// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./booklist');

const app = express();
const PORT = 3000;

// ✅ MongoDB Atlas connection string with credentials
const MONGO_URI = process.env.MONGO_URI;

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book List API! Use /books to interact.');
});

// ✅ Add a new book
app.post('/books', async (req, res) => {
  try {
    const { title, author, read } = req.body;
    const book = new Book({ title, author, read });
    const savedBook = await book.save();
    res.status(201).json(savedBook);

  } catch (err) {
    res.status(400).json({ error: 'Invalid book data.' });
  }
});

// ✅ Get all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// ✅ Get a book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found.' });
    res.json(book);
  } catch {
    res.status(400).json({ error: 'Invalid ID format.' });
  }
});

// ✅ Edit a book by ID
app.put('/books/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Book not found.' });
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Invalid update or ID.' });
  }
});

// ✅ Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Book not found.' });
    res.json({ message: 'Book deleted.', book: deleted });
  } catch {
    res.status(400).json({ error: 'Invalid ID format.' });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`📚 Book List API running at http://localhost:${PORT}`);
});