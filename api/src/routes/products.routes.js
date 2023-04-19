const Router = require("express");
const {
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
} = require("../controllers/products.controllers.js");

const router = Router();

//----------------- Productos ------------------->
router.get("/products", getProducts);
router.put("/products/:id", putProducts);

//----------- Registro de usuario --------------->
router.post("/register", postUser);
router.post("/login", postLogin);
router.post("/logout", logout);

router.put("/agregarInformacionEnvio", agregarInformacionEnvio);
//------------------Carrito---------------------->
router.get("/carrito/:email", getCart);
router.post("/carritoAdd", addProductToCart);
router.post("/deleteProduct", deleteProductFromCart);
router.post("/sumarUnoCantidad", sumarUnoCantidad);
router.post("/restarUnoCantidad", restarUnoCantidad);

module.exports = router;
