
const router = require("express").Router()
const User = require("../models/user.js")
const bcrypt = require("bcrypt")

router.get("/", (req, res)=> {
  res.send("auth testing...")
})

// Register
router.post("/register", async (req, res)=> {
  try {
    // Password encryption
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    // Creating user from User model
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })
    // Saving user to databse
    const newUser = await user.save()
    res.status(200).json(newUser)
  }
  catch (err) {
    console.log(err)
  }
})

// Login
router.post("/login", async (req, res)=> {
  try {
    // Searching with User model
    const user = await User.findOne({
      username: req.body.username
    })
    !user && res.status(404).json("User not found")
    // Comparing password from request with user password in database
    const passwordValid = await bcrypt.compare(req.body.password, user.password)
    !passwordValid && res.status(404).json("Password incorrect")
    
    res.status(200).json(user)
  }
  catch (err) {
    console.log(err)
  }
})

// Getting all users
router.get("/users", async (req, res)=> {
  users = await User.find()
  res.send(users)
})

module.exports = router