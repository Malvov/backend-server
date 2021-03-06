const jwt = require('jsonwebtoken');


let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();
    });
};


let verifyAdminRole = (req, res, next) => {
    let user = req.user;

    if (user.role === 'USER_ROLE') {
        return res.status(403).json({
            ok: false
        });
    }

    next();
};


module.exports = { verifyToken, verifyAdminRole };