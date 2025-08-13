const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const validarJwt = (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ ok: false, message: 'No token provided' });
    }

    try {

        jwt.verify(token, process.env.JWT_SECRET, (err, { uid = '', name = '' }) => {
            if (err) {
                return res.status(401).json({ ok: false, message: 'Invalid token' });
            }

            req.uid = uid;
            req.name = name;
            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ ok: false, message: 'Token validation failed' });
    }
};

module.exports = {
    validarJwt
};