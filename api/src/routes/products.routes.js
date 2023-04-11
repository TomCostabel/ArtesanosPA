const Router = require("express");
const {
    getProducts,
    putProducts,
    postUser,
    postLogin,
    getCart,
    addProductToCart,
} = require("../controllers/products.controllers.js");

const router = Router();

router.get("/products", getProducts);
router.put("/products/:id", putProducts);

//--------------Registro de usuario-------------------->

router.post("/register", postUser);
router.post("/login", postLogin);
//--------------Carrito-------------------->

router.get("/carrito/:email", getCart);
router.post("/carritoAdd", addProductToCart);

module.exports = router;
