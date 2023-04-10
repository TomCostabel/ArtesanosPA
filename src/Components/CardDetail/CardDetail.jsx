import React from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import Productos from "../../productos.json";
import "../CardDetail/CardDetail.css";

export default function CardDetail() {
    const { id } = useParams();
    return (
        <div>
            <NavBar />
            <div className="container-detail">
                <div className="container-centrado-detail">
                    <img className="img-detail" src={Productos[id - 3].image} />
                    <div className="titulo-propiedades-detail">
                        <h1 className="titulo-detail">
                            {Productos[id - 3].titulo}
                        </h1>
                        <h4 className="propiedades-detail">
                            {Productos[id - 3].descripcion}
                        </h4>
                        <div className="price-button-detail">
                            <div>
                                <h1 className="stock-detail">
                                    Stock: {Productos[id - 3].stock}
                                </h1>
                            </div>
                            <div className="price-button">
                                <h1 className="price-detail">
                                    ${Productos[id - 3].price}
                                </h1>
                                <h5 className="button-detail">
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
