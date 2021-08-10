
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const multer = require("multer")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const { promisify } = require("util")

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

const app = express()
dotenv.config()

mongoose.connect(
  process.env.MONGO_URL,
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=> {
  console.log("Database connected")
})
.catch((err)=> {
  console.log(err)
})

app.use(express.json())
app.use(morgan("common"))
app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    file = req.file
    cb(null, "public/images/post")
  },
  filename: (req, file, cb)=> {
    cb(null, file.originalname)
  }
})
const upload = multer({storage})
// upload file
app.post("/api/upload", upload.single("file"), (req, res)=> {
  console.log("\n\n", req.body, "\n\n")
  try {
    return res.status(200).json("File uploaded")
  }
  catch(err) {
    console.log(err)
  }
})
// delete file
app.delete("/api/delete", async (req, res)=> {
  const unlinkAsync = promisify(fs.unlink)
  try {
    await unlinkAsync(`./public/images/post/${req.body.img}`)
    res.status(200).json("Post photo deleted")
  }
  catch(err) {
    res.status(500).json(err)
  }
})

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)


// app.get("/", (req, res)=> {
  //   res.sendFile("index.html", {root: "client/public"})
  // })
  
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build/")))
    app.use("/images", express.static(path.join(__dirname, "public/images")))
    
  app.get("*", (req, res)=> {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
  })
}
else {
  app.use(express.static(path.join(__dirname, "/client/public")))

  app.get("*", (req, res)=> {
    res.send("running on 7222")
  })
}

const PORT = process.env.PORT || 7222
app.listen(PORT, ()=> {
  console.log("Server running...")
})
