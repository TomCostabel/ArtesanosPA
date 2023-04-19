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

//--------------------------Exports----------------------------->
const getProducts = async (req, res) => {
    try {
        const datosDB = await productsDB();
        res.json(datosDB);
    } catch (error) {
        console.log({ Message: error.message });
    }
};

//-------------------Update Price & Stock----------------------->
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
            // new:true indica que devuelve el documento modificado después de aplicar la actualización
            { new: true }
        );
        res.json(product);
    } catch (error) {
        console.log({ Message: error.message });
    }
};
//-------------Agregar datos para realizar ENVIO --------------->
const agregarInformacionEnvio = async (req, res) => {
    // FORMATO DEL BODY
    //     {
    //         "email":"",
    //         "provincia":" ",
    //         "ciudad":"",
    //         "direccion":" ",
    //         "codigoPostal":"",
    //         "dni":"",
    //         "nombreApellido":" ",
    //         "numeroCelular":" "

    //     }
    const {
        email,
        provincia,
        ciudad,
        direccion,
        codigoPostal,
        dni,
        nombreApellido,
        numeroCelular,
    } = req.body;
    try {
        const findUser = await User.findOneAndUpdate(
            { email },
            {
                provincia,
                ciudad,
                direccion,
                codigoPostal,
                dni,
                nombreApellido,
                numeroCelular,
            },
            { new: true }
        );
        res.json(findUser);
    } catch (error) {
        console.log({ Message: error.message });
    }
};
//-------------------------Register----------------------------->
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

//--------------------------Login------------------------------->
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

        if (user.token) {
            // si ya tiene un token, lo devuelvo en lugar de generar uno nuevo
            return res.json({ token: user.token });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        user.token = token; // establecer el token generado en el modelo de User
        await user.save(); // guardar el modelo actualizado en la base de datos

        // Guard oel token en el local storage para validar el login en el front
        res.cookie("token", token, { httpOnly: true });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al intentar iniciar sesión" });
    }
};

//--------------------------Logout------------------------------>
const logout = async (req, res) => {
    try {
        // Eliminar el token del usuario en el servidor
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        user.token = null;
        await user.save();
        res.clearCookie("token");

        res.status(200).json({ message: "Usuario deslogueado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al intentar desloguear al usuario",
        });
    }
};

//--------------Obtener carrito de usuario x email-------------->
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

//--------------Agregar producto al cart de x USER-------------->
const addProductToCart = async (req, res) => {
    //-----------------Este es el formato a pasar por body ----------->

    // {
    //     "email": "Tomasperalta1997@hotmail.com",
    //     "productId": 27,
    //     "quantity": 33
    //   }

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
        productId;

        // Si no existe, lo crea
        if (quantity > product.stock) {
            return res.status(500).json({
                message: "Quantity no puede superar la cantidad en STOCK",
            });
        }
        if (!cart) {
            cart = await Cart.create({ user: email, items: [] });
        }

        // Busca si el producto ya está en el carrito
        const cartItem = cart.items.find(
            (item) => item.productId === product.id
        );

        // Si ya está, aumenta la cantidad
        if (cartItem) {
            const newQuantity = cartItem.quantity + quantity;
            if (newQuantity > product.stock) {
                return res.status(500).json({
                    message: "La cantidad a agregar supera el stock disponible",
                });
            }
            cartItem.quantity = newQuantity;
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

//------------------Eliminar producto del cart------------------>
const deleteProductFromCart = async (req, res) => {
    const { productId } = req.body;
    const { email } = req.body;

    // ------por body----->
    // {
    //     "email": "locazo@outlook.com",
    //     "productId":1

    //   }

    try {
        // buscar el cart del usuario
        const cart = await Cart.findOne({ user: email });

        // buscar el producto en el cart
        const productIndex = cart.items.findIndex(
            (item) => item.productId === productId
        );

        // si el producto no está en el cart, lanzar un error
        if (productIndex === -1) {
            return res
                .status(404)
                .json({ message: "Producto no encontrado en el carrito" });
        }

        // eliminar el producto del cart
        cart.items.splice(productIndex, 1);

        // guardar el cart actualizado
        const updatedCart = await cart.save();

        res.status(200).json(updatedCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al eliminar producto del carrito",
        });
    }
};

//--------------Sumar uno en cantidad al producto--------- ----->
const sumarUnoCantidad = async (req, res) => {
    const { email, productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: email });
        const product = await ArtesanosProducts.findOne({ id: productId });
        // Busco el producto en el CART
        const productIndex = cart.items.findIndex(
            (item) => item.productId === productId
        );

        if (productIndex >= 0) {
            if (cart.items[productIndex].quantity === product.stock) {
                return res
                    .status(500)
                    .json({ message: "Cantidad maxima en stock" });
            }
            cart.items[productIndex].quantity += 1;
            await cart.save();
            return res.json({ message: "Cantidad del producto actualizada" });
        }
        res.status(404).json({
            message: "Producto no encontrado en el carrito",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al intentar agregar un producto",
        });
    }
};

//--------------Restar uno en cantidad al producto--------- ---->
const restarUnoCantidad = async (req, res) => {
    const { email, productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: email });

        // Busco el producto en el CART
        const productIndex = cart.items.findIndex(
            (item) => item.productId === productId
        );

        if (productIndex >= 0) {
            if (cart.items[productIndex].quantity === 1) {
                return res.status(500).json({
                    message: "Cantidad producto en el menor permitido",
                });
            }
            cart.items[productIndex].quantity -= 1;
            await cart.save();
            return res.json({ message: "Cantidad del producto actualizada" });
        }
        res.status(404).json({
            message: "Producto no encontrado en el carrito",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al intentar agregar un producto",
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
    deleteProductFromCart,
    logout,
    sumarUnoCantidad,
    restarUnoCantidad,
    agregarInformacionEnvio,
};
