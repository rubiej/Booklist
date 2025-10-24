const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

router.get("/", controller.getAllBooks);
router.post("/", controller.createBook);
router.get("/:id", controller.getBookById);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
// POST new book
router.post("/", createBook);

// PUT update book
router.put("/:id", updateBook);

// DELETE book
router.delete("/:id", deleteBook);

module.exports = router;