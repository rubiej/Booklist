const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController"); // ✅ fixed path

// CRUD routes for books
router.get("/", controller.getAllBooks);
router.post("/", controller.createBook);
router.get("/:id", controller.getBookById);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;