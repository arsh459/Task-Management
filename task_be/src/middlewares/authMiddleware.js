const jwt = require("jsonwebtoken")
const authMiddleware = async (req, res, next) => {
  let token = req.header("authorization")
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" })
  }
  token = token.split(" ")[1]
  try {
    const decoded = jwt.verify(token, "Zxcvbnm1")
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" })
  }
}

module.exports = authMiddleware
