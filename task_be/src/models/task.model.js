const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  checklist: [{ text: String, completed: Boolean }],
  comments: [
    {
      text: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
    },
  ],
  dueDate: Date,
  labels: [String],
  assignedUsers: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
    },
  ],
  createdBy: {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
  },
})

module.exports = mongoose.model("Task", taskSchema)
