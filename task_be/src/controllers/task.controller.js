const Task = require("../models/task.model.js")
const createTask = async (req, res) => {
  try {
    const { name, description, checklist, dueDate, labels, creatorName } =
      req.body
    const creatorUserId = req.userId

    const createdBy = {
      author: creatorUserId,
      name: creatorName,
    }

    const newTask = new Task({
      name,
      description,
      checklist,
      comments: [],
      dueDate,
      labels,
      assignedUsers: [],
      createdBy,
    })

    await newTask.save()
    res.status(201).json(newTask)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const addComment = async (req, res) => {
  try {
    const { text, name } = req.body
    const { taskId } = req.params
    const userId = req.userId

    const task = await Task.findById(taskId)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    if (
      !task.assignedUsers.some((user) => user.author.equals(userId)) &&
      !task.createdBy.author.equals(userId)
    ) {
      return res.status(403).json({
        error: "User is not assigned to this task and not the creator",
      })
    }
    const newComment = {
      text,
      author: userId,
      name,
    }
    task.comments.push(newComment)
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const addAssignedUser = async (req, res) => {
  try {
    const { userIdToAdd, userName } = req.body
    const { taskId } = req.params
    const userId = req.userId
    const task = await Task.findById(taskId)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    if (
      !task.assignedUsers.some((user) => user.author.equals(userId)) &&
      !task.createdBy.author.equals(userId)
    ) {
      return res.status(403).json({
        error: "User is not assigned to this task and not the creator",
      })
    }

    if (task.assignedUsers.some((user) => user.author.equals(userIdToAdd))) {
      return res
        .status(400)
        .json({ error: "User is already assigned to this task" })
    }

    const newAssignedUser = {
      author: userIdToAdd,
      name: userName,
    }

    task.assignedUsers.push(newAssignedUser)
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getTasks = async (req, res) => {
  try {
    const userId = req.userId
    const unassignedTasks = await Task.find({
      "createdBy.author": userId,
    })
    res.status(200).json(unassignedTasks)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const getAssignedTasks = async (req, res) => {
  try {
    const userId = req.userId
    const tasksAssignedToMe = await Task.find({
      $or: [{ assignedUsers: { $elemMatch: { author: userId } } }],
    })

    res.status(200).json(tasksAssignedToMe)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = {
  createTask,
  addComment,
  addAssignedUser,
  getTasks,
  getAssignedTasks,
}
