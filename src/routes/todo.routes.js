const express = require("express");
const Todo = require("../model/item");
const router = express.Router();

router.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post("/api/todos", async (req, res) => {
  const todo = new Todo({
    name: req.body.name,
    completed: req.body.completed,
  });
  await todo.save();
  res.json(todo);
});

router.put("/api/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = req.body.completed;
  await todo.save();
  res.json(todo);
});

router.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo item deleted" });
});
module.exports = router;
