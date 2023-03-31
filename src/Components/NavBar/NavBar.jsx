import React from "react";
import "../NavBar/NavBar.css";
import img from "../../assets/img/artesanosLogoWhite.jpg";
export default function NavBar() {
    return (
        <div className="container-navbar">
            <div className="logo-title-navBar">
                <img className="logo-navBar" src={img} />
                <h2 className="title-navBar">Artesanos</h2>
            </div>
            <div className="list-navbar">
                <h4>Home</h4>
                <h4>Sobre nosotros</h4>
                <h4>Catalogo</h4>
            </div>
            <div>
                <h3>Sol/Luna</h3>
            </div>
        </div>
    );
}
