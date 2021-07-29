
const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user.js")

// router.get("/", (req, res)=> {
//   res.send("user route test...")
// })

// router.get("/plus", (req, res)=> {
//   res.send("user route test plus...")
// })


// Update user
router.put("/:id", async (req, res)=> {
  if (req.body.userID === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      }
      catch (err) {
        return res.status(500).json(err)
      }
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.params.id, 
        { $set: req.body }
        )
      res.status(200).json("Account has been updated")
    }
    catch (err) {
      return res.status(500).json(err)
    }

  }
  else {
    res.status(403).json("You can update only your account")
  }
})


// Delete user
router.delete("/:id", async (req, res)=> {
  if (req.body.userID === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.body.userID)
      res.status(200).json("Account has been deleted")
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }
  else {
    res.status(403).json("You can delete only your account")
  }
})


// Get user
router.get("/", async (req, res)=> {
  const userID = req.query.userID
  const username = req.query.username
  try {
    const user = userID
      ? await User.findById(userID)
      : await User.findOne({username: username})
    const {password, updatedAt, createdAt, ...other} = user._doc
    res.status(200).json(other)
  }
  catch (err) {
    res.status(500).json(err)
  }
})


// Follow user
router.put("/follow/:id", async (req, res)=> {
  if (req.body.userID !== req.params.id) {
    try {
      const user = await User.findById(req.body.userID)
      const toFollow = await User.findById(req.params.id)
      if (!user.following.includes(req.params.id)) {
        await user.updateOne({ $push: {following: req.params.id} })
        await toFollow.updateOne({ $push: {followers: req.body.userID} })
        res.status(200).json(user)
      }
      else {
        res.status(403).json("You are already following user")
      }
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }
  else {
    res.status(403).json("You cant follow yourself")
  }
})


// Unfollow user
router.put("/unfollow/:id", async (req, res)=> {
  if (req.body.userID !== req.params.id) {
    try {
      const user = await User.findById(req.body.userID)
      const toFollow = await User.findById(req.params.id)
      if (user.following.includes(req.params.id)) {
        await user.updateOne({ $pull: {following: req.params.id} })
        await toFollow.updateOne({ $pull: {followers: req.body.userID} })
        res.status(200).json(user)
      }
      else {
        res.status(403).json("You are not following user")
      }
    }
    catch (err) {
      return res.status(500).json(err)
    }
  }
  else {
    res.status(403).json("You cant unfollow yourself")
  }
})


module.exports = router