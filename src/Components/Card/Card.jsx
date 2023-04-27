import React from "react";
import "../Card/Card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { agregarProductoAlCarrito } from "../../redux/actions";
export default function Card(props) {
    const dispatch = useDispatch();
    const userLogeado = localStorage.getItem("emailLogeado");

    const data = {
        email: userLogeado,
        productId: props.id,
        quantity: 1,
    };

    return (
        <div className="container-centrado-cards">
            <div className="container-card">
                <div className="img-titulo-card">
                    <Link to={`/propiedades/${props.id}`}>
                        <img
                            className="img-card"
                            src={props.image}
                            alt="imagen muestra producto"
                        />
                        <h5 className="titulo-card">{props.titulo}</h5>
                    </Link>
                </div>
                <h5 className="price-card">${props.price}</h5>
                <div className="container-button">
                    <h5
                        onClick={() => dispatch(agregarProductoAlCarrito(data))}
                        className="agregar-carrito"
                    >
                        Agregar al carrito
                    </h5>
                </div>
            </div>
        </div>
    );
}
