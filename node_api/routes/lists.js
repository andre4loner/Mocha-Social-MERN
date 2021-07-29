
const lists = require("express").Router()


lists.get("/", (req, res)=> {
  res.send("just lists test...")
})

lists.get("/wish", (req, res)=> {
  res.send("wish test...")
})

lists.get("/shopping", (req, res)=> {
  res.send("shopping test...")
})

lists.get("/deleted", (req, res)=> {
  res.send("deleted test...")
})

module.exports = lists