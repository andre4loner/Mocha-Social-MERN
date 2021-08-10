
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 35
    },
    username: {
      type: String,
      required: true,
      min: 3,
      max: 25,
      unique: true
    },
    email: {
      type: String,
      required: true,
      max: 50
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    profilePicture: {
      type: String
    },
    coverPicture: {
      type: String,
      default: "",
    },
    following: {
      type: Array,
      default: []
    },
    followers: {
      type: Array,
      default: []
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    bio: {
      type: String,
      max: 50
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)