const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    userid: {
      type: String,
      default: `user_${Date.now()}`,
    },
    courses: {
      type: mongoose.Types.ObjectId,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

const model = new mongoose.model("users", schema);

module.exports = model;
