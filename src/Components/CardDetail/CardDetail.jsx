import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
// import Productos from "../../productos.json";
import "../CardDetail/CardDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { agregarProductoAlCarrito, getProducts } from "../../redux/actions";

export default function CardDetail() {
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.productos);
    console.log(productos);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    const { id } = useParams();
    const userLogeado = localStorage.getItem("emailLogeado");

    const data = {
        email: userLogeado,
        productId: id,
        quantity: 1,
    };
    return (
        <div>
            <NavBar />
            <div className="container-detail">
                <div className="container-centrado-detail">
                    <img
                        className="img-detail"
                        src={productos[id - 1]?.image}
                    />
                    <div className="titulo-propiedades-detail">
                        <h1 className="titulo-detail">
                            {productos[id - 1]?.titulo}
                        </h1>
                        <h4 className="propiedades-detail">
                            {productos[id - 1]?.descripcion}
                        </h4>
                        <div className="price-button-detail">
                            <div>
                                <h1 className="stock-detail">
                                    Stock: {productos[id - 1]?.stock}
                                </h1>
                            </div>
                            <div className="price-button">
                                <h1 className="price-detail">
                                    ${productos[id - 1]?.price}
                                </h1>
                                <h5
                                    onClick={() =>
                                        dispatch(agregarProductoAlCarrito(data))
                                    }
                                    className="button-detail"
                                >
                                    Agregar al carrito
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
