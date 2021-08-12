
const router = require("express").Router()
const aws = require("aws-sdk")
const multer = require("multer")
const multerS3 = require("multer-s3")
const uuid = require("uuid").v4
const path = require("path")

const Post = require("../models/post.js")
const User = require("../models/user.js")

// AWS Credentials
const s3 = new aws.S3({ apiVersion: '2006-03-01' })
let fileName = ""
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mocha-posts",
    acl: "public-read-write",
    metadata: (req, file, cb)=> {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb)=> {
      const ext = path.extname(file.originalname)
      fileName = `${uuid()}${ext}`
      cb(null, fileName)
    }
  })
})

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
// Upload image to AWS
router.post("/image/upload", upload.single("file"), (req, res)=> {
  try{
    const fileURL  = req.file.location
    return res.status(200).send(fileURL)
  }
  catch(err) {
    console.log(err)
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
// Delete image from AWS
router.delete("/image/delete", async (req, res)=> {
  console.log(req.body.name)
  s3.deleteObject({ Bucket: "mocha-posts", Key: req.body.name }, (err, data)=> {
    if (err) throw err
    return res.status(200).json("Image deleted")
  })
})

// Like and unlike post
router.put("/like/:id", async (req, res)=> {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.likes.includes(req.body.userID)) {
      await post.updateOne({
        $push: {likes: req.body.userID}
      })
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
  let posts = []
  try {
    const user = await User.findById(req.params.id)
    // const userPosts = await Post.find({ userID: req.params.id })
    const followingPosts = await Promise.all(
      user.following.map((followingID)=> {
        return Post.find({ userID: followingID})
      })
    )
    // res.status(200).json(userPosts.concat(...followingPosts))
    res.status(200).json(posts.concat(...followingPosts))
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