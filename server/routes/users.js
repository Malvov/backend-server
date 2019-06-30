const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

const app = express();

app.get('/users', verifyToken, (req, res) => {

    let from = req.query.from || 0;
    let perPage = req.query.perPage || 5;

    perPage = Number(perPage);
    from = Number(from);

    User.find({ isActive: true }, 'name email img role isActive')
    .skip(from)
    .limit(perPage)
    .exec((err, users) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        User.countDocuments({ isActive: true }, (err, count) =>{
            res.json({
                ok: true,
                activeUsers: count,
                users
            });
        });
    });
});

app.get('/users/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    User.findById(id, (err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (user === null) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user
        })
    });
});

app.post('/users', [verifyToken, verifyAdminRole], (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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

app.put('/users/:id', [verifyToken, verifyAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, 'name', 'email', 'img', 'role', 'isActive');

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user
        });
    });
});

app.delete('/users/:id', [verifyToken, verifyAdminRole], (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id, { isActive: false },  { new: true, context: 'query' }, (err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (user === null) {
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user
        })
    });
});

module.exports = app;