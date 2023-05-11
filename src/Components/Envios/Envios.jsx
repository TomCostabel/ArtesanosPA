import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "../Envios/Envios.css";
import Loading from "../Loading/Loading";
import imgLocal from "../../assets/img/local.webp";
import imgEnvio from "../../assets/img/envio.png";
import { Link } from "react-router-dom";

export default function () {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1200);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <NavBar />
                    <div className="container-centrado-envios">
                        <h1 className="titulo-envios">
                            Seleccione su opción de envío
                        </h1>
                        <Link to="/infoEnvios">
                            <h2 className="envios-h2">
                                <img className="img-local" src={imgLocal} />
                                Retirar en local (Punta Alta)
                            </h2>
                        </Link>
                        <Link to="/infoEnvios">
                            <h2 className="envios-h2">
                                <img className="img-envio" src={imgEnvio} />
                                Envio a domicilio (Otra ciudad)
                            </h2>
                        </Link>
                        <Link to="/infoEnvios">
                            <h2 className="envios-h2">
                                <img className="img-envio" src={imgEnvio} />
                                Envio al correo (Otra ciudad)
                            </h2>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
