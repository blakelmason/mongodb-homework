//env
require('dotenv').config()

//packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//routes
const routes = require('./routes')

//mongoose connection
mongoose.connect(process.env.MLAB_KEY);

//app
const app = express();

//port
const PORT = process.env.PORT || 3000;

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use(routes.comment);
app.use(routes.scrape);

//static
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//listen
app.listen(PORT, function () {
  console.log("Server on port " + PORT);
});