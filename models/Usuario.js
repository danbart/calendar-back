
const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = model('Usuario', usuarioSchema);
