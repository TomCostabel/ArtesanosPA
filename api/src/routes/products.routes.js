const Router = require("express");

const { getProducts } = require("../controllers/products.controllers.js");

const router = Router();

router.get("/products", getProducts);

// export default router;
module.exports = router;
