const express = require('express');
const User = require('../models/user');

const app = express();

app.get('/users', (req, res) => {
    res.status(200).json({
        message: 'user routes'
    })
});

app.post('/users', (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    });

    user.save((err, response) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: response
        });
    });
});

module.exports = app;