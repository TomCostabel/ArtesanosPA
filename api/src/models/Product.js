import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArtesanosProducts = new Schema({
    id: {
        type: Number,
    },
    titulo: {
        type: String,
    },
    description: {
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
    images: {
        type: String,
    },
});

export default mongoose.model("ArtesanosProducts", ArtesanosProducts);
