const express = require("express");
const { createTodo, deleteTodo, getTodo, updateTodo } = require("../controller/todoController");
const router = express.Router();

router.get("/",getTodo);
router.post("/test",createTodo);
router.delete("/delete/:id",deleteTodo);
router.put("/update/:id",updateTodo);

module.exports = router;

