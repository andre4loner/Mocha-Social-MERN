
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

const app = express()
dotenv.config()

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=> {
  console.log("Database connected")
})
.catch((err)=> {
  console.log(err)
})

app.use(express.json())
app.use(morgan("common"))
app.use(cors())

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)


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
    res.send("running on 5000")
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
  console.log("Server running...")
})
