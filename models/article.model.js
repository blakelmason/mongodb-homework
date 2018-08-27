//packages
const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;

//User schema
const ArticleSchema = new Schema({
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
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

//User model
const Article = mongoose.model('Article', ArticleSchema);

//export
module.exports = Article;


