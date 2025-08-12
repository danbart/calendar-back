const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    try {
        const { name, email, password } = req.body;

        let existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ ok: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ nombre: name, email, password: hashedPassword });

        await usuario.save();

        const token = await jwt.generateToken({ uid: usuario._id, name: usuario.nombre });

        res.status(201).json({ ok: true, message: 'User registered successfully!', token });
    } catch (error) {
        console.log("🚀 ~ createUser ~ error:", error)
        res.status(500).json({ ok: false, message: 'Error registering user' });
    }
}

const loginUser = async (req, res = response) => {

    try {

        const { email, password } = req.body;
        let existingUser = await Usuario.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ ok: false, message: 'Email or password not found' });
        }

        const isMatch = bcrypt.compareSync(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ ok: false, message: 'Email or password not found' });
        }

        const token = await jwt.generateToken({ uid: existingUser._id, name: existingUser.nombre });

        res.json({ ok: true, message: 'Hello, World!', token });
    } catch (error) {
        console.log("🚀 ~ loginUser ~ error:", error)
        res.status(500).json({ ok: false, message: 'Error logging in user' });
    }
}

const logoutUser = (req, res = response) => {
    // Logic to log out a user
}

const renewToken = (req, res = response) => {
    // Logic to renew a user's token
    res.json({ message: 'Token renewed successfully!' });
}

const profile = (req, res = response) => {
    // Implement your profile retrieval logic here
    res.json({ message: 'User profile retrieved successfully!' });
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    renewToken,
    profile
};