import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

// const { MONGOUSER, MONGOPASSWORD, MONGOHOST, MONGOPORT } = process.env;

mongoose.set("strictQuery", false);
mongoose
    // .connect(url, {})
    .connect(process.env.MONGO_URL, {})

    .then(() => {
        console.log("Base de datos conectada 🔋🔌");
    })
    .catch((err) => {
        console.log(err);
    });
