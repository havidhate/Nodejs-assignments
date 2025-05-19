const express = require("express");
const {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    searchTodos
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", addTodo);
router.get("/search", searchTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
