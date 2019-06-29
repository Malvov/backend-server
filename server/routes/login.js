const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const app = express();

app.post('/login', (req, res) => {


    let body = req.body;

    User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid email or password'
            });
        }

        if (bcrypt.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid email or password'
            });
        }

        let token = jwt.sign({
            user
        }, process.env.SEED, { expiresIn: process.env.EXPIRES_IN });

        res.json({
            ok: true,
            user,
            token
        });
    });
});


module.exports = app;