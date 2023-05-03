import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
// import Productos from "../../productos.json";
import "../CardDetail/CardDetail.css";
import { useDispatch, useSelector } from "react-redux";
import {
    actualizarStockYPrecio,
    agregarProductoAlCarrito,
    getProducts,
} from "../../redux/actions";

export default function CardDetail() {
    const dispatch = useDispatch();
    const productos = useSelector((state) => state.productos);
    const { id } = useParams();
    const userLogeado = localStorage.getItem("emailLogeado");

    const [dataUpdate, setDataUpdate] = useState({
        stock: 0,
        price: 0,
    });
    const data = {
        email: userLogeado,
        productId: id,
        quantity: 1,
    };
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, productos]);

    const handleChange = (e) => {
        // console.log(dataUpdate);
        setDataUpdate({
            ...dataUpdate,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(actualizarStockYPrecio(dataUpdate, id));
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
                                    onClick={() => {
                                        dispatch(
                                            agregarProductoAlCarrito(data)
                                        ),
                                            swal(
                                                "Producto agregado ",
                                                " ",
                                                "success"
                                            );
                                    }}
                                    className="button-detail"
                                >
                                    Agregar al carrito
                                </h5>
                            </div>
                            <div>
                                {userLogeado ==
                                "tomasperalta1997@hotmail.com" ? (
                                    <form onSubmit={handleSubmit}>
                                        nuevo precio
                                        <input
                                            type="number"
                                            name="price"
                                            value={dataUpdate.price}
                                            placeholder="nuevo precio"
                                            onChange={(e) => handleChange(e)}
                                        />
                                        nuevo stock
                                        <input
                                            type="number"
                                            name="stock"
                                            value={dataUpdate.stock}
                                            placeholder="nuevo stock"
                                            onChange={(e) => handleChange(e)}
                                        />
                                        <button type="submit">
                                            Cambiar stock y precio{" "}
                                        </button>
                                    </form>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
