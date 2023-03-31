import React from "react";
import "../NavBar/NavBar.css";
import img from "../../assets/img/artesanosLogoWhite.jpg";

import img1 from "../../assets/img/ig.png";

import { Link } from "react-router-dom";
export default function NavBar() {
    return (
        <div className="container-navbar">
            <div className="logo-title-navBar">
                <img className="logo-navBar" src={img} />
                <h2 className="title-navBar">Artesanos</h2>
            </div>
            <div className="list-navbar">
                <Link to="/">
                    <h2 className="title-navBar-list">Inicio</h2>
                </Link>
                <Link to="/SobreNosotros">
                    <h2 className="title-navBar-list">Sobre nosotros</h2>
                </Link>
                <Link to="/Catalogo">
                    <h2 className="title-navBar-list">Catalogo</h2>
                </Link>
            </div>
            <div className="redes">
                <img className="img-ig" src={img1} />
            </div>
        </div>
    );
}
