
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6,
      unique: true
    },
    profilePicture: {
      type: String,
      default: ""
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
    desc: {
      type: String,
      max: 50
    },
    from: {
      type: Object,
      default: {
        city: "",
        country: ""
      }
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)