const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware.js")
const {
  createTask,
  addComment,
  addAssignedUser,
  getTasks,
  getAssignedTasks,
} = require("../controllers/task.controller.js")

const router = express.Router()

router.post("/tasks", authMiddleware, createTask)
router.post("/tasks/:taskId/comments", authMiddleware, addComment)
router.post("/tasks/:taskId/adduser", authMiddleware, addAssignedUser)
router.get("/tasks/unassigned", authMiddleware, getTasks)
router.get("/tasks/assigned", authMiddleware, getAssignedTasks)
module.exports = router
