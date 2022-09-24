const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = require('../data/categories');

const isURL = (value) => {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
}

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
    url: {
      type: String,
      required: "Url is required",
      trim: true,
      validate: {
        validator: isURL,
        message: 'URL is not valid'
      }
    },
    views: Number,
    categories: {
      type: [{
        type: String,
        required: "Category is required",
        enum: categories.map(category => category.value),
        trim: true,
      }],
      default: []
    },
    thumbnail: {
      type: String,
      required: "Thumbnail is required",
      trim: true,
      validate: {
        validator: isURL,
        message: 'URL is not valid'
      }
    },
    private: {
      type: Boolean,
      default: false
    },
    owner: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const Stream = mongoose.model("Stream", streamSchema);
module.exports = Stream;
