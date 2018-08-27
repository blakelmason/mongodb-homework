//packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');

//models
const db = require('./models');

//mongoose connection
mongoose.connect("mongodb://localhost/mongodb_homework", { useNewUrlParser: true });

//app
const app = express();

//port
const PORT = process.env.PORT || 5000;

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//static
app.use(express.static('./client'));

//routes
app.get('/scrape', (req, res) => {
  //axios request
  axios.get('https://www.dndbeyond.com/')
    .then((res2 => {
      //cheerio
      const $ = cheerio.load(res2.data);
      //html elements
      $('p', 'div .post-excerpt__description').each((i, elem) => {
        const summary = (elem.children[0].data);
        const link = elem.parent.parent.children[0].next.children[0].next.attribs.href;
        const title = elem.parent.parent.children[0].next.children[0].next.children[0].data;
        //check if exists in database
        db.Article.findOne({ link: link })
          .then((res3) => {
            if (res3 === null) {
              //create if not found in database
              db.Article.create({
                title: title,
                link: link,
                summary: summary
              })
                .then(article => {
                  console.log(article);
                })
                .catch(function (err) {
                  console.error(err);
                });
            } else {
              // if already exists
              console.log(`already exists :${title}`);
            }
          })
          .catch(err => {
            console.error(err);
          })
      });
    }))
    .then(() => {
      //find all articles in datbase
      db.Article.find({}).sort({ date: 'descending' }).limit(10)
        .then(res4 => {
          res.json(res4)
        })
        .catch(err => {
          res.send(err);
        })
    })
    .catch(err => {
      console.error(err);
    })
})

//listen
app.listen(PORT, function () {
  console.log("Server on port " + PORT);
});