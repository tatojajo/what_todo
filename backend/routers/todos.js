const express = require("express");
const { Todo } = require("../models/todos");
const { default: mongoose } = require("mongoose");
const router = express.Router();

// GET todos

router.get("/:userId", async (req, res) => {
  try {
    const todoList = await Todo.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });

    if (!todoList) {
      return res.status(400).send("Todos not found");
    }

    res.status(200).send(todoList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST todos

router.post("/:userId", async (req, res) => {
  try {
    let newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      user: req.params.userId,
    });

    newTodo = await newTodo.save();

    if (!newTodo) {
      return res.status(400).send("Todo cannot be created");
    }
    res.status(201).send(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE todos

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid todo Id");
    }
    const todo = await Todo.findByIdAndDelete({ _id: req.params.id });
    if (!todo)
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });

    res.status(200).json({ success: true, message: "Todo was deleted" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// PUT todos

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid todo Id");
    }
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    if (!todo) {
      return res.status(400).send("Todo cannot be updated");
    }
    res.status(201).send(todo);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
