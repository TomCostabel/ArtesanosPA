const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    token: { type: String, default: null },
    provincia: { type: String, default: null },
    ciudad: { type: String, default: null },
    codigoPostal: { type: String, default: null },
    direccion: { type: String, default: null },
    dni: { type: String, default: null },
});

module.exports = mongoose.model("User", UserSchema);
