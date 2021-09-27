const express = require('express');

const app = express();

app.use(require('./login'));
app.use(require('./users'));
app.get('/hello_world', function (request, response) {
    return response.status(200).send({ ok: true });
});

module.exports = app;
