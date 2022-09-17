const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Fields:
//   title: String
//   author: String (de momento)
//   url: String
//   description: String
//   views: Number
//   createdAt: Date *
//   updatedAt: Date *
//   category: String
//   duration: Number
//   thumbnail: String
//   private: Boolean

const streamSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
      trim: true,
      maxLength: [20, `Title must be <= 20 chars`],
    },
  },
  { timestamps: true }
);

const Stream = mongoose.model("Stream", streamSchema);
module.exports = Stream;
