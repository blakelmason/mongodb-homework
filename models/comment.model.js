//packages
const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;

//User schema
const CommentSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
  }
})

//Comment schema
const Comment = mongoose.model('Comment', CommentSchema);

//export
module.exports = Comment;


