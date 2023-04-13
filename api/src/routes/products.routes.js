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
} = require("../controllers/products.controllers.js");

const router = Router();

router.get("/products", getProducts);
router.put("/products/:id", putProducts);

//--------------Registro de usuario-------------------->

router.post("/register", postUser);
router.post("/login", postLogin);
router.post("/logout", logout);
//--------------Carrito-------------------->

router.get("/carrito/:email", getCart);
router.post("/carritoAdd", addProductToCart);
router.post("/deleteProduct", deleteProductFromCart);
router.post("/sumarUnoCantidad", sumarUnoCantidad);

router.post("/restarUnoCantidad", restarUnoCantidad);

module.exports = router;
