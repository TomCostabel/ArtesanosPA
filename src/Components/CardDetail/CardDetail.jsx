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
                    <img className="img-detail" src={Productos[id - 1].image} />
                    <div className="titulo-propiedades-detail">
                        <h1>{Productos[id - 1].titulo}</h1>
                        <h4 className="propiedades-detail">
                            {Productos[id - 1].descripcion}
                        </h4>
                        <div className="price-button-detail">
                            <h1 className="price-detail">
                                ${Productos[id - 1].price}
                            </h1>
                            <h5 className="button-detail">
                                Agregar al carrito
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
