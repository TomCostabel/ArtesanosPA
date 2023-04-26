import React from "react";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartUser } from "../../redux/actions";
import "../Carrito/Carrito.css";

export default function Carrito() {
    const dispatch = useDispatch();
    const carritoUser = useSelector((state) => state.carritoUser);
    const userLogeado = localStorage.getItem("emailLogeado");
    let totalPagar = 0;

    useEffect(() => {
        dispatch(getCartUser(userLogeado));
    }, [dispatch]);
    return (
        <div>
            <NavBar />
            <div className="principal-carrito">
                <div className="container-carrito">
                    {carritoUser?.map((e) => {
                        const pricePorQuantity = e.price * e.quantity;
                        totalPagar = totalPagar + pricePorQuantity;

                        return (
                            <div
                                className="container-cada-producto"
                                key={e._id}
                            >
                                <img
                                    src={e.images}
                                    className="img-producto-carrito"
                                    alt="imgagen para carrito"
                                />
                                <div className="titulo-eliminar">
                                    <h3 className="container-titulo">
                                        {e.titulo}
                                    </h3>
                                    <h6 className="eliminar">Eliminar</h6>
                                </div>
                                <div className="container-quantity">
                                    <h6 className="button-mas-menos">-</h6>
                                    <h3 className="numero-quantity">
                                        {e.quantity}
                                    </h3>
                                    <h6 className="button-mas-menos">+</h6>
                                </div>
                                <h4 className="container-price">
                                    ${e.price * e.quantity}
                                </h4>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div>${totalPagar}</div>
                    <button>Pagar</button>
                </div>
            </div>
        </div>
    );
}
