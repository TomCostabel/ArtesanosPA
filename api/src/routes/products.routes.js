const Router = require("express");
const {
    getProducts,
    putProducts,
    postUser,
} = require("../controllers/products.controllers.js");

const router = Router();

router.get("/products", getProducts);
router.put("/products/:id", putProducts);

//----------------------------------------------->

// Registro de usuario
router.post("/register", postUser);

module.exports = router;
