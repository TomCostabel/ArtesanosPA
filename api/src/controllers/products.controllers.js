const ArtesanosProducts = require("../models/Product.js");
require("../database/database.js");
const jsonProducts = require("../../../src/productos.json");

const productsDB = async () => {
    let info = jsonProducts;

    info.forEach(async (e) => {
        if (!(await ArtesanosProducts.findOne({ sku: e.sku }))) {
            const product = new ArtesanosProducts(e);
            await product.save();
        }
    });
    const product = await ArtesanosProducts.find();

    return product;
};

const getProducts = async (req, res) => {
    try {
        const datosDB = await productsDB();
        // res.json(jsonProducts);
        res.json(datosDB);
    } catch (error) {
        console.log("HOLAAAAAAAAAAAAAA");
        console.log({ Message: error.message });
    }
};

module.exports = {
    getProducts,
};
