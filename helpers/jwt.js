const jwt = require('jsonwebtoken');

const generateToken = ({ uid, name }) => {
    const payload = {
        uid,
        name
    };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                console.log("🚀 ~ generateToken ~ err:", err)
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateToken
};