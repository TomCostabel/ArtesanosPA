const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    user: { type: String, required: true },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ArtesanosProducts",
            },
            quantity: { type: Number, default: 1 },
        },
    ],
});

module.exports = mongoose.model("Cart", CartSchema);
