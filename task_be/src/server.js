const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

// routes
const userRoutes = require("./routes/user.routes.js")
const taskRoutes = require("./routes/task.routes.js")

// initializing the app
const app = express()

// Middleware to parse JSON requests
app.use(express.json())
dotenv.config()
app.use(cors())

// Use the API routes
app.use("/api", userRoutes)
app.use("/api", taskRoutes)

// starting the server
app.listen(8000, async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://arshgoyal459:Zxcvbnm1@cluster0.0lsykzj.mongodb.net/tasksmanager?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log(`Database connected`)
    console.log(`Server is running`)
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ error: err.message })
  }
})
