const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.status(200).json({
        message: 'user routes'
    })
});

module.exports = app;