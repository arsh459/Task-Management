const express = require("express")
const {
  login,
  register,
  getAllUsers,
} = require("../controllers/user.controller")

//router definition
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/users", getAllUsers)

module.exports = router
