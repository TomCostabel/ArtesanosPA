import React from "react";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    deleteProductoCarrito,
    getCartUser,
    restarUnoCantidad,
    sumarUnoCantidad,
} from "../../redux/actions";
import "../Carrito/Carrito.css";
import { Link } from "react-router-dom";
import img from "../../assets/img/mp.png";

export default function Carrito() {
    const dispatch = useDispatch();
    const carritoUser = useSelector((state) => state.carritoUser);
    const userLogeado = localStorage.getItem("emailLogeado");
    let totalPagar = 0;

    useEffect(() => {
        dispatch(getCartUser(userLogeado));
    }, []);
    return (
        <div>
            <NavBar />
            <div className="principal-carrito">
                <div className="container-carrito">
                    {carritoUser?.map((e) => {
                        const pricePorQuantity = e.price * e.quantity;
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
                                <Link to={`/propiedades/${e.productId}`}>
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
                                    <h6 className="categoria">{e.categoria}</h6>

                                    {/* ------------------Eliminar producto------------------ */}
                                    <h6
                                        onClick={() =>
                                            dispatch(
                                                deleteProductoCarrito(data)
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
                                            dispatch(restarUnoCantidad(data))
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
                                            dispatch(sumarUnoCantidad(data))
                                        }
                                        className="button-mas-menos"
                                    >
                                        +
                                    </h6>
                                </div>
                                {/* ------------------Total productos a pagar------------- */}

                                <h4 className="container-price">
                                    ${e.price * e.quantity}
                                </h4>
                            </div>
                        );
                    })}
                </div>
                <div className="container-pagar">
                    <div>${totalPagar}</div>
                    <div className="button-logo-pagar">
                        <button>Pagar</button>
                        <img
                            className="mp-logo"
                            src={img}
                            alt="logo metodo de pago"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
