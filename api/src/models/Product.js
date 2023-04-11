const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtesanosProducts = new Schema({
    id: {
        type: Number,
    },

    titulo: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    },

    categoria: {
        type: String,
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model("ArtesanosProducts", ArtesanosProducts);
