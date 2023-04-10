const ArtesanosProducts = require("../models/Product.js");
require("../database/database.js");
const jsonProducts = require("../../../src/productos.json");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const productsDB = async () => {
    let info = jsonProducts;
    info.forEach(async (e) => {
        if (!(await ArtesanosProducts.findOne({ id: e.id }))) {
            const product = new ArtesanosProducts(e);
            await product.save();
        }
    });
    const product = await ArtesanosProducts.find();
    return product;
};
//-------------------Exports------------------------->
const getProducts = async (req, res) => {
    try {
        const datosDB = await productsDB();
        res.json(datosDB);
    } catch (error) {
        console.log({ Message: error.message });
    }
};
const putProducts = async (req, res) => {
    // --- DE ESTA FORMA TENGO QUE MANDAR POR BODY PARA HACER EL UPDATE---------->
    //   {
    //     "stock": 50,
    //     "price": 900
    //   }
    // -------------------------------------------------------------------------->
    const { ID } = req.params;
    const { stock, price } = req.body;
    try {
        const product = await ArtesanosProducts.findOneAndUpdate(
            { ID },
            { stock, price },
            { new: true }
        );
        res.json(product);
    } catch (error) {
        console.log({ Message: error.message });
    }
};
const postUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el email ya está en uso
        let user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ msg: "El correo electrónico ya está en uso" });
        }

        // Crear un nuevo usuario
        user = new User({
            name,
            email,
            password,
        });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos
        await user.save();

        res.json({ msg: "Usuario registrado exitosamente" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error del servidor");
    }
};

module.exports = {
    getProducts,
    putProducts,
    postUser,
};
