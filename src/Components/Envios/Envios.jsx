import React from "react";
import NavBar from "../NavBar/NavBar";
import "../Envios/Envios.css";
export default function () {
    return (
        <div>
            <NavBar />
            <div className="container-centrado-envios">
                <h2>Retirar por el comercio (Punta Alta)</h2>
                <h2>Envio a domicilio otra ciudad</h2>
                <h2>Envio al correo otra ciudad</h2>
            </div>
        </div>
    );
}
