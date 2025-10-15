require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./booklist');

const app = express();
const PORT = 3000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware
app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book List API! Use /books to interact.');
});

// ✅ Create a new book
app.post('/books', async (req, res) => {
  try {
    const { title, author, read } = req.body;
    const book = new Book({ title, author, read });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Save error:', err.message);
    res.status(400).json({ error: 'Invalid book data.' });
  }
});

// ✅ Return all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books.' });
  }
});

// ✅ Return book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found.' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format.' });
  }
});

// ✅ Edit book by ID
app.put('/books/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Book not found.' });
    res.json(updated);
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(400).json({ error: 'Invalid update or ID.' });
  }
});

// ✅ Delete book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Book not found.' });
    res.json({ message: 'Book deleted.', book: deleted });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format.' });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`📚 Book List API running at http://localhost:${PORT}`);
});