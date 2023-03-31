import React from "react";
import "../Home/Home.css";
import NavBar from "../NavBar/NavBar";
import img from "../../assets/img/yoga.png";
import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div className="container-home">
            <NavBar />
            <div className="title-img-home">
                <div className="title-buttonCatalogo">
                    <h1 className="title-home">
                        Te agradecemos por interesarte en nuestro emprendimiento
                    </h1>
                    <h2 className="title-menor-home">
                        Estamos muy emocionados por mostrarte todos nuestros
                        productos.
                    </h2>
                    <Link to="/Catalogo">
                        <h2 className="button-catalogo">Catalogo ➜</h2>
                    </Link>
                </div>
                <img className="img-home" src={img} />
            </div>
        </div>
    );
}
