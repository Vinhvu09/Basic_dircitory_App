const { default: mongoose } = require("mongoose");
const Todo = require("../model/item");

async function getAllitem(req, res) {
  const todos = await Todo.find();
  if (todos.length !== 0) {
    res.json(todos);
  } else {
    res.json({
      message: "Empty",
    });
  }
}

async function getItemid(req, res) {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
}

async function creatItem(req, res) {
  const todo = new Todo({
    name: req.body.name,
    completed: req.body.completed,
  });
  await todo.save();
  res.json(todo);
}

async function updateItem(req, res) {
  const todo = await Todo.findById(req.params.id);
  todo.name = req.body.name;
  todo.completed = req.body.completed;
  await todo.save();
  res.json(todo);
}

async function deleteItem(req, res) {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({
    message: "Todo item deleted",
  });
}

module.exports = {
  getAllitem,
  getItemid,
  creatItem,
  updateItem,
  deleteItem,
};
