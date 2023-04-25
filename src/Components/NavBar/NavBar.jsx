import React from "react";
import "../NavBar/NavBar.css";
import img from "../../assets/img/artesanosLogoWhite.jpg";
// import img1 from "../../assets/img/ig.png";
// import img2 from "../../assets/img/wsp.png";
// import img3 from "../../assets/img/fb.png";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const emailLogeado = localStorage.getItem("emailLogeado");

    const cerrarSesion = () => {
        localStorage.setItem("emailLogeado", []);
        return navigate(0);
    };
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
                    <h2
                        href="https://www.ejempl.es"
                        target="_parent"
                        className="title-navBar-list"
                    >
                        Catalogo
                    </h2>
                </Link>
            </div>
            {/* <div >
                <img className="img-ig" src={img1} />
                <img className="img-ig" src={img2} />
                <img className="img-ig" src={img3} />
            </div> */}
            <div className="login-logout">
                <Link to="/carrito">
                    <h6>Carrito</h6>
                </Link>
                {!emailLogeado ? (
                    <Link to="/Login">
                        <h5>Iniciar Sesión</h5>
                    </Link>
                ) : (
                    <button onClick={() => cerrarSesion()}>
                        Cerrar Sesión
                    </button>
                )}
            </div>
        </div>
    );
}
