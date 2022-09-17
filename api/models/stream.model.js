const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const streamSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
      trim: true,
      maxLength: [100, `Title must be <= 100 chars`],
    },
    description: {
      type: String,
      required: "Description is required",
    },
    author: {
      type: String,
      required: "Author is required",
      trim: true,
    },
    url: {
      type: String,
      required: "Url is required",
      trim: true,
    },
    views: {
      type: Number,
    },
    category: {
      type: String,
      required: "Category is required",
      trim: true,
    },
    duration: {
      type: Number,
    },
    thumbnail: {
      type: String,
      required: "Thumbnail is required",
      trim: true,
    },
    private: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Stream = mongoose.model("Stream", streamSchema);
module.exports = Stream;
