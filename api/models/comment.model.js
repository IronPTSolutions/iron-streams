const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    stream: {
      ref: "Stream",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
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

const Comment = mongoose.model("Comment", schema);
module.exports = Comment;
