//packages
const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;

//User schema
const CommentSchema = new Schema({
  comment: {
    type: String,
    trim: true,
    required: true
  },
  article: {
    type: String,
    trim: true,
    required: true
  }
})

//Comment schema
const Comment = mongoose.model('Comment', CommentSchema);

//export
module.exports = Comment;


