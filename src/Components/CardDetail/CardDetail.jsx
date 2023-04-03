import React from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import Productos from "../../productos.json";

export default function CardDetail() {
    const { id } = useParams();
    return (
        <div>
            <NavBar />
            <img src={Productos[id - 1].image} />
            <h1>{Productos[id - 1].titulo}</h1>
            <h4>{Productos[id - 1].descripcion}</h4>
        </div>
    );
}
