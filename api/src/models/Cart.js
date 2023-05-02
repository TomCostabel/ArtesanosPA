const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    user: { type: String, required: true },
    items: [
        {
            productId: {
                type: Number,
                required: true,
            },
            quantity: { type: Number, default: 1 },
            titulo: { type: String },
            descripcion: { type: String },
            categoria: { type: String },

            price: { type: Number },
            images: { type: String },
        },
    ],
});

module.exports = mongoose.model("Cart", CartSchema);
