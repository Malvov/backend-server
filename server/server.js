const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
 
app.post('/users', function (req, res) {
  let body = req.body;
  res.json({
    person: body
  });
})
 
app.listen(3000, () => {
    console.log('Listening on port 3000');
});