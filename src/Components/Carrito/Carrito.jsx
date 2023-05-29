import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    deleteProductoCarrito,
    getCartUser,
    getProducts,
    restarUnoCantidad,
    sumarUnoCantidad,
} from "../../redux/actions";
import "../Carrito/Carrito.css";
import { Link } from "react-router-dom";
import img from "../../assets/img/mp.png";
import imgCarritoVacio from "../../assets/img/carritoVacio.png";
import Loading from "../Loading/Loading";

export default function Carrito() {
    const dispatch = useDispatch();
    const carritoUser = useSelector((state) => state.carritoUser);
    const productos = useSelector((state) => state.productos);
    const userLogeado = localStorage.getItem("emailLogeado");
    let totalPagar = 0;
    let stockMenorQ = [];
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1200);
    useEffect(() => {
        dispatch(getCartUser(userLogeado));
        dispatch(getProducts());
    }, []);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <NavBar />
                    {carritoUser?.length ? (
                        <div className="principal-carrito">
                            <div className="container-carrito">
                                {carritoUser?.map((e) => {
                                    const pricePorQuantity =
                                        e.price * e.quantity;
                                    totalPagar = totalPagar + pricePorQuantity;

                                    // -------------------- DATA PARA EL ACTION----------------------->
                                    let data = {
                                        email: userLogeado,
                                        productId: e.productId,
                                    };

                                    return (
                                        <div
                                            className="container-cada-producto"
                                            key={e.productId}
                                        >
                                            <Link
                                                to={`/propiedades/${e.productId}`}
                                            >
                                                <img
                                                    src={e.images}
                                                    className="img-producto-carrito"
                                                    alt="img"
                                                />
                                            </Link>
                                            <div className="titulo-eliminar">
                                                <h3 className="container-titulo">
                                                    {e.titulo}
                                                </h3>
                                                <h6 className="categoria">
                                                    {e.categoria}
                                                </h6>

                                                {/* ------------------Eliminar producto------------------ */}
                                                <h6
                                                    onClick={() =>
                                                        swal({
                                                            title: "Estas seguro/a ?",
                                                            text: "Eliminaras este producto de tu carrito.",
                                                            icon: "warning",
                                                            buttons: true,
                                                            dangerMode: true,
                                                        }).then(
                                                            (willDelete) => {
                                                                if (
                                                                    willDelete
                                                                ) {
                                                                    dispatch(
                                                                        deleteProductoCarrito(
                                                                            data
                                                                        )
                                                                    );
                                                                    swal(
                                                                        "Producto eliminado del carrito! ",
                                                                        {
                                                                            icon: "success",
                                                                        }
                                                                    );
                                                                } else {
                                                                    swal(
                                                                        "El producto seguira en el carrito."
                                                                    );
                                                                }
                                                            }
                                                        )
                                                    }
                                                    className="eliminar"
                                                >
                                                    Eliminar
                                                </h6>
                                            </div>
                                            <div className="container-quantity">
                                                {/* ------------------Restar producto------------------- */}

                                                <h6
                                                    onClick={() =>
                                                        dispatch(
                                                            restarUnoCantidad(
                                                                data
                                                            )
                                                        )
                                                    }
                                                    className="button-mas-menos"
                                                >
                                                    -
                                                </h6>
                                                <h3 className="numero-quantity">
                                                    {e.quantity}
                                                </h3>
                                                {/* ------------------Sumar producto------------------ */}

                                                <h6
                                                    onClick={() =>
                                                        dispatch(
                                                            sumarUnoCantidad(
                                                                data
                                                            )
                                                        )
                                                    }
                                                    className="button-mas-menos"
                                                >
                                                    +
                                                </h6>
                                            </div>
                                            <h6>
                                                {productos.map((element) => {
                                                    if (
                                                        e.productId ==
                                                        element.id
                                                    ) {
                                                        if (
                                                            e.quantity >
                                                            element.stock
                                                        ) {
                                                            stockMenorQ.push(
                                                                "1"
                                                            );
                                                            console.log(
                                                                stockMenorQ
                                                            );
                                                        }
                                                    }
                                                    // return element.titulo ==
                                                    //     e.titulo ? (
                                                    //     <h2>
                                                    //         {e.quantity >
                                                    //         element.stock
                                                    //             ? "Sin Stock"
                                                    //             : null}
                                                    //     </h2>
                                                    // ) : null;
                                                })}
                                            </h6>
                                            {/* ------------------Total productos a pagar------------- */}

                                            <h4 className="container-price">
                                                ${e.price * e.quantity}
                                            </h4>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="container-pagar">
                                <div className="totalPagar">${totalPagar}</div>
                                <div className="button-logo-pagar">
                                    {!stockMenorQ.length ? (
                                        <Link to="/Envios">
                                            <button>Pagar</button>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                alert("Producto sin stock")
                                            }
                                        >
                                            Pagar
                                        </button>
                                    )}

                                    <img
                                        className="mp-logo"
                                        src={img}
                                        alt="logo metodo de pago"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="container-carrito-vacio">
                            <h2 className="carrito-vacio-text">
                                Aun no agregaste productos a tu carrito
                            </h2>
                            <img
                                className="img-carrito-vacio"
                                src={imgCarritoVacio}
                            />
                            <h2 className="carrito-vacio-text">
                                visita nuestro catalogo para hacerlo
                            </h2>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
