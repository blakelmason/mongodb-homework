//packages
const express = require('express')

//models
const db = require('../models');

//router
const router = express.Router();

//routes
//get comments
router.get('/comments', (req, res) => {
  db.Article.find(req.query).populate('comments').sort({ date: 'ascending' })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    })
})

//new comment
router.post('/comments', (req, res) => {
  const newComment = {
    comment: req.body.comment,
    article: req.body.article
  }
  const article = {
    title: req.body.article
  }
  db.Comment.create(newComment)
    .then(comment => {
      return db.Article.findOneAndUpdate(article, { $push: { comments: comment._id } }, { new: true })
    })
    .then(article => {
      console.log(article);
      res.json(article);
    })
    .catch(err => {
      console.error(err)
      res.json(err);
    });
});

router.delete('/comments', (req, res) => {
  db.Comment.deleteOne({ _id: req.body.id })
    .then(deleted => {
      console.log(deleted);
      res.json('deleted ' + req.body.id);
      db.Article.update({ 'comments': req.body.id }, { '$pull': { 'comments': req.body.id } })
        .then(article => {
          console.log(article);
        })
        .catch(err => {
          console.log(err);
          res.json(err);
        })
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    })
})

//export
module.exports = router