const Book = require("../models/book/Book");

exports.getAllBooks = async (req, res) => {
  const books = await Book.find({ userId: req.userId });
  res.json(books);
};

exports.createBook = async (req, res) => {
  const book = new Book({ ...req.body, userId: req.userId });
  await book.save();
  res.status(201).json(book);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id, userId: req.userId });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const result = await Book.deleteOne({ _id: req.params.id, userId: req.userId });
  if (result.deletedCount === 0) return res.status(404).json({ message: "Book not found" });
  res.json({ message: "Book deleted" });
};