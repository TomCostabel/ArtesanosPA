import React from "react";
import "../NavBar/NavBar.css";
import img from "../../assets/img/artesanosLogoWhite.jpg";
// import img1 from "../../assets/img/ig.png";
// import img2 from "../../assets/img/wsp.png";
// import img3 from "../../assets/img/fb.png";
import imgCarrito from "../../assets/img/carrito2.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartUser } from "../../redux/actions";

export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const emailLogeado = localStorage.getItem("emailLogeado");
    const carritoUser = useSelector((state) => state.carritoUser);
    const cerrarSesion = () => {
        localStorage.setItem("emailLogeado", []);

        return navigate("/");
    };
    let cantidadProductosCarrito = 0;
    if (carritoUser.length) {
        carritoUser?.forEach((e) => {
            cantidadProductosCarrito = cantidadProductosCarrito + e.quantity;
        });
    }

    useEffect(() => {
        if (emailLogeado) {
            dispatch(getCartUser(emailLogeado));
        }
    }, [dispatch, carritoUser]);

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
                        Catálogo
                    </h2>
                </Link>
            </div>

            <div className="login-logout">
                <div className="changuito">
                    {emailLogeado ? (
                        <Link to="/carrito">
                            {emailLogeado ? (
                                <div>
                                    <div className="numero-sobre-carrito">
                                        {cantidadProductosCarrito}
                                    </div>
                                </div>
                            ) : null}
                            <img className="carrito-png" src={imgCarrito} />
                        </Link>
                    ) : null}
                </div>
                <div>
                    {!emailLogeado ? (
                        <Link to="/Login">
                            <button className="button-cerrar-sesion">
                                Iniciar Sesión
                            </button>
                        </Link>
                    ) : (
                        <button
                            className="button-cerrar-sesion"
                            onClick={() => {
                                swal({
                                    title: "Estas seguro/a ?",
                                    text: "La sesión se cerrara",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                }).then((willDelete) => {
                                    if (willDelete) {
                                        cerrarSesion();
                                        swal("Sesión cerrada. ", {
                                            icon: "success",
                                        });
                                    } else {
                                        swal("La sesión permanecera abierta.");
                                    }
                                });
                            }}
                        >
                            Cerrar Sesión
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
