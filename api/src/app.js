const express = require("express");
const app = express();
const cors = require("cors");
const productsRoutes = require("./routes/products.routes.js");

app.use(express.json());
const corsOptions = {
    origin: "https://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(productsRoutes);

module.exports = app;
