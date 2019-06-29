require('../server/config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/index'));

app.use(bodyParser.json());
 
// Database connection
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to database');
  }
});


app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});