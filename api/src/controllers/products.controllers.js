const ArtesanosProducts = require("../models/Product.js");
require("../database/database.js");
const jsonProducts = require("../../../src/productos.json");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart.js");
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
const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Email o contraseña incorrectos" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Email o contraseña incorrectos" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            //Con expiresIn: 1h estoy haciendo que despues de ese tiempo, el user tenga que solicitar un nuevo TOKEN para seguir navegando
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al intentar iniciar sesión" });
    }
};

// Obtener el carrito de un usuario
const getCart = async (req, res) => {
    try {
        const email = req.params.email.replace("%", "@"); // Reemplazamos el % por @ en el email
        const cart = await Cart.findOne({ user: email });
        if (!cart)
            return res
                .status(404)
                .json({ message: "No se encontró el carrito" });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el carrito" });
    }
};

// Agregar un producto al carrito de un usuario
const addProductToCart = async (req, res) => {
    // Extraer los datos del producto del cuerpo de la petición
    const { email, productId, quantity } = req.body;

    try {
        // Busca el producto por su id normal
        const product = await ArtesanosProducts.findOne({ id: productId });

        // Si no existe, devuelve un error
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Busca el carrito del usuario por su email
        let cart = await Cart.findOne({ user: email });

        // Si no existe, lo crea
        if (!cart) {
            cart = await Cart.create({ user: email, items: [] });
        }

        // Busca si el producto ya está en el carrito
        const cartItem = cart.items.find(
            (item) => item.productId === product.id
        );

        // Si ya está, aumenta la cantidad
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            // Si no está, lo agrega al carrito
            cart.items.push({
                productId: product.id,
                quantity: quantity,
                titulo: product.titulo,
                price: product.price,
                images: product.image,
            });
        }

        // Guarda los cambios en el carrito
        await cart.save();

        // Devuelve el carrito actualizado
        res.status(200).json({ cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al agregar el producto al carrito",
        });
    }
};

module.exports = {
    getProducts,
    putProducts,
    postUser,
    postLogin,
    getCart,
    addProductToCart,
};
