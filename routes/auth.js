const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')

const { createUser, loginUser, profile, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
    '/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validarCampos
    ],
    loginUser
);

router.post(
    '/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validarCampos
],
    createUser);

router.get('/profile', profile);

router.post('/renew-token', renewToken);

module.exports = router;