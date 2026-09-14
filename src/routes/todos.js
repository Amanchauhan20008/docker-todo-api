const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

router.post("/", async (req, res) => {
  const todo = await Todo.create({ title: req.body.title });
  res.status(201).json(todo);
});

router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});

router.put("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(204).send();
});

module.exports = router;