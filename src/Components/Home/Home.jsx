import React from "react";
import "../Home/Home.css";
import NavBar from "../NavBar/NavBar";
import img from "../../assets/img/yoga.png";
export default function Home() {
    return (
        <div className="container-home">
            <NavBar />
            <div className="title-img-home">
                <div className="title-buttonCatalogo">
                    <h1 className="title-home">
                        Te agradecemos por interesarte en nuestro emprendimiento
                    </h1>
                    <h2 className="button-catalogo">Catalogo ➜</h2>
                </div>
                <img src={img} />
            </div>
        </div>
    );
}
