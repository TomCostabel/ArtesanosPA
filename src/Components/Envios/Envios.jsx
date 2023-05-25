import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "../Envios/Envios.css";
import Loading from "../Loading/Loading";
import imgLocal from "../../assets/img/local.webp";
import imgEnvio from "../../assets/img/envio.png";
import { Link } from "react-router-dom";
import imgDelivery from "../../assets/img/delivery.png";
import imglapiz from "../../assets/img/lapiz.png";

import { getUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
export default function () {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const userLogeado = localStorage.getItem("emailLogeado");
    const usuario = users.filter((e) => e.email === userLogeado);
    setTimeout(() => {
        setLoading(false);
    }, 1200);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <NavBar />
                    <div className="container-centrado-envios">
                        {/* <img className="imgDelivery" src={imgDelivery} /> */}
                        <div className="container-informacion">
                            <div>
                                <h4>Nombre y Apellido</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].nombreApellido}
                                </h6>

                                <h4>Dirección</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].direccion}
                                </h6>

                                <h4>DNI</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].dni}
                                </h6>
                                <h4>Numero Celular</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].numeroCelular}
                                </h6>
                            </div>
                            <div>
                                <h4>Provincia</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].provincia}
                                </h6>

                                <h4>Ciudad</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].ciudad}
                                </h6>
                                <h4>CP</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].codigoPostal}
                                </h6>
                                <div className="container-editar">
                                    <Link to="/infoEnvios">
                                        <h6 className="button-editar-info">
                                            Editar{" "}
                                            <img
                                                className="img-lapiz"
                                                src={imglapiz}
                                            />
                                        </h6>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link to="/RetiroLocal">
                                <h2 className="envios-h2">
                                    <img className="img-local" src={imgLocal} />
                                    Retirar en local (Punta Alta)
                                </h2>
                            </Link>
                            <Link to="/EnvioDomicilioPuntaAlta">
                                <h2 className="envios-h2">
                                    <img className="img-local" src={imgLocal} />
                                    Envio a domicilio (Punta Alta) <br />
                                    <h6 className="montoAgregado-Envio">
                                        + $300
                                    </h6>
                                </h2>
                            </Link>
                            <Link to="/EnvioCorreo">
                                <h2 className="envios-h2">
                                    <img className="img-envio" src={imgEnvio} />
                                    Envio al correo (Otra ciudad){" "}
                                    <h6 className="montoAgregado-Envio">
                                        + $700
                                    </h6>
                                </h2>
                            </Link>
                            <Link to="/EnvioDomicilio">
                                <h2 className="envios-h2">
                                    <img className="img-envio" src={imgEnvio} />
                                    Envio a domicilio (Otra ciudad)
                                    <h6 className="montoAgregado-Envio">
                                        + $1000
                                    </h6>
                                </h2>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
