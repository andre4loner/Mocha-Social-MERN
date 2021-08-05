
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const multer = require("multer")

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
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, "public/images")
  },
  filename: (req, file, cb)=> {
    cb(null, file.originalname)
  }
})
const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (req, res)=> {
  try {
    return res.status(200).json("File uploaded")
  }
  catch(err) {
    console.log(err)
  }
})

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)


app.get("/", (req, res)=> {
  res.send("beibi..")
})


app.listen(7222, ()=> {
  console.log("Server running...")
})
