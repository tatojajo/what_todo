const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

todoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

todoSchema.set("toJSON", {
  virtuals: true,
});

exports.Todo = mongoose.model("Todo", todoSchema);
exports.todoSchema = todoSchema;
