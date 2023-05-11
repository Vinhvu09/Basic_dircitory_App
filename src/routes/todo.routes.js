const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.get("/api/todos", todoController.getAllitem);

router.get("/api/todos/:id", todoController.getItemid);

router.post("/api/todos", todoController.creatItem);

router.put("/api/todos/:id", todoController.updateItem);

router.delete("/api/todos/:id", todoController.deleteItem);

module.exports = router;
