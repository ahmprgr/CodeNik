const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover:{
      type: String,
     required: true,
    } ,
    slug: {
      type: String,
      required: true,
    },
    headlines: {
      type: mongoose.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["completing", "completed"],
      default:"completing",
    },
  },
  {
    timestamps: true,
  }
);

const model = new mongoose.model("courses", schema);

module.exports = model
