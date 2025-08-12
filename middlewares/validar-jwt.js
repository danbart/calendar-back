const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const validarJwt = (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ ok: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ ok: false, message: 'Invalid token' });
        }

        req.uid = decoded.uid;
        req.name = decoded.name;
        next();
    });
};

module.exports = {
    validarJwt
};