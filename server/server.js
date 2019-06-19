require('../server/config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
 
app.use(require('./routes/users'));
 
// Database connection
mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true }, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to database');
  }
});


app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});