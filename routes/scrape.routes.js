//packages
const express = require('express');

//packages
const cheerio = require('cheerio');
const axios = require('axios');

//models
const db = require('../models');

//router
const router = express.Router()

//routes
//scrape
router.get('/scrape', (req, res) => {
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
                  console.log('New Article\n-------------------- ')
                  console.log(article);
                  console.log('--------------------')
                })
                .catch(function (err) {
                  console.error(err);
                });
            }
          })
          .catch(err => {
            console.error(err);
          })
      });
    }))
    .then(() => {
      //find all articles in datbase and send data
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

//export
module.exports = router