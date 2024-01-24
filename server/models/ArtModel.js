const mongoose = require("mongoose");

const artSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artistId: {
      type: String,
    },
    category: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    isAvailable:{
      type:Boolean,
      default: true,
    },
    artPath: String, //arts
  },
  { timestamps: true }
);

const Art = mongoose.model("Art", artSchema);

module.exports = Art;
