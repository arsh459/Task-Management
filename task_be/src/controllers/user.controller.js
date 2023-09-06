const User = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" })
    }
    const token = jwt.sign({ userId: user._id }, "Zxcvbnm1", {
      expiresIn: "10d",
    })

    res.status(200).json({ token, name: user.name })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    const token = jwt.sign({ userId: newUser._id }, "Zxcvbnm1", {
      expiresIn: "10d",
    })
    res.status(201).json({ token, name: newUser.name })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = { login, register, getAllUsers }
