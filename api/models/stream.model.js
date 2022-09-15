const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streamSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required',
    trim: true,
    maxLength: [20, `Title must be <= 20 chars`]
  }
}, { timestamps: true });

const Stream = mongoose.model('Stream', streamSchema);
module.exports = Stream;