
const router = require("express").Router()
const Post = require("../models/post.js")
const User = require("../models/user.js")

router.get("/all", async (req, res)=> {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  }
  catch (err) {
    res.status(500).json(err)
  }
  res.send("posts test")
})


// Create a post
router.post("/create", async (req, res)=> {
  const post = new Post(req.body)
  try {
    const createdPost = await post.save()
    res.status(200).json(createdPost)
  }
  catch (err) {
    res.status(500).json(err)
  }
})


// Update post
router.put("/update/:id", async (req, res)=> {
  try {
    const post = await Post.findById(req.params.id)
    if (req.body.userID === post.userID) {
      await Post.updateOne({
        $set: req.body
      })
      res.status(200).json("Post updated")
    }
    else {
      return res.status(403).json("You can delete only your post")
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
})


// Delete post
router.delete("/delete/:id", async (req, res)=> {
  // console.log(req.body.userID)
  try {
    const post = await Post.findById(req.params.id)

    if (req.body.userID === post.userID || req.body.isAdmin) {
      await Post.findByIdAndDelete(req.params.id)
      res.status(200).json("Post deleted")
    }
    else {
      return res.status(403).json("You can delete only your post")
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
})


// Like and unlike post
router.put("/like/:id", async (req, res)=> {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.likes.includes(req.body.userID)) {
      await post.updateOne({
        $push: {likes: req.body.userID}
      })
      // console.log(post.userID)
      // console.log(req.body.userID)
      res.status(200).json("Post is now liked")
    }
    else {
      await post.updateOne({
        $pull: {likes: req.body.userID}
      })
      res.status(200).json("Post is no longer liked")
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
})


// Get a post
router.get("/post/:id", async (req, res)=> {
  try {
      const post = await Post.findById(req.params.id)
      res.status(200).json(post)
  }
  catch (err) {
    res.status(500).json(err)
  }
})


// Get timeline posts
router.get("/timeline/:id", async (req, res)=> {
  // let postArray = []
  try {
    const user = await User.findById(req.params.id)
    const userPosts = await Post.find({ userID: req.params.id })
    const followingPosts = await Promise.all(
      user.following.map((followingID)=> {
        return Post.find({ userID: followingID})
      })
    )
    res.status(200).json(userPosts.concat(...followingPosts))
  }
  catch (err) {
    res.status(500).json(err)
  }
})


// Get user's posts
router.get("/profile/:username", async (req, res)=> {
  // let postArray = []
  try {
    const user = await User.findOne({username: req.params.username})
    const posts = await Post.find({userID: user._id})
    res.status(200).json(posts)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router