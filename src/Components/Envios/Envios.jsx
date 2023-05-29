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
                                    {usuario[0].nombreApellido
                                        ? usuario[0].nombreApellido
                                        : "N/A"}
                                </h6>

                                <h4>Dirección</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].direccion
                                        ? usuario[0].direccion
                                        : "N/A"}
                                </h6>

                                <h4>DNI</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].dni ? usuario[0].dni : "N/A"}
                                </h6>
                                <h4>Numero Celular</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].numeroCelular
                                        ? usuario[0].numeroCelular
                                        : "N/A"}
                                </h6>
                            </div>
                            <div>
                                <h4>Provincia</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].provincia
                                        ? usuario[0].provincia
                                        : "N/A"}
                                </h6>

                                <h4>Ciudad</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].ciudad
                                        ? usuario[0].ciudad
                                        : "N/A"}
                                </h6>
                                <h4>CP</h4>
                                <h6 className="info-usuario">
                                    {usuario[0].codigoPostal
                                        ? usuario[0].codigoPostal
                                        : "N/A"}
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
                                    <div>
                                        <h4>Retirar en local (Punta Alta)</h4>
                                        {/* <h6 className="fecha-envio">
                                                📅 Llega de 6 a 9 dias habiles
                                            </h6> */}
                                    </div>
                                </h2>
                            </Link>
                            {usuario[0].direccion &&
                            usuario[0].ciudad &&
                            usuario[0].provincia &&
                            usuario[0].codigoPostal &&
                            usuario[0].dni ? (
                                <Link to="/EnvioDomicilioPuntaAlta">
                                    <h2 className="envios-h2">
                                        <img
                                            className="img-local"
                                            src={imgLocal}
                                        />
                                        <div className="titulo-envio">
                                            <h4>
                                                Envio a domicilio (Punta Alta)
                                            </h4>
                                            <h6 className="fecha-envio">
                                                Llega entre hoy y mañana
                                            </h6>
                                        </div>
                                        <h6 className="montoAgregado-Envio">
                                            + $300
                                        </h6>
                                    </h2>
                                </Link>
                            ) : (
                                <div
                                    onClick={() =>
                                        alert(
                                            "Informacion de envio necesaria(Provincia, Ciudad, CP, Direccion, DNI, Nombre y Apellido, Nro. Celular)"
                                        )
                                    }
                                >
                                    <h2 className="envios-h2">
                                        <img
                                            className="img-local"
                                            src={imgLocal}
                                        />
                                        <div className="titulo-envio">
                                            <h4>
                                                Envio a domicilio (Punta Alta)
                                            </h4>
                                            <h6 className="fecha-envio">
                                                Llega entre hoy y mañana
                                            </h6>
                                        </div>
                                        <h6 className="montoAgregado-Envio">
                                            + $300
                                        </h6>
                                    </h2>
                                </div>
                            )}
                            {usuario[0].direccion &&
                            usuario[0].ciudad &&
                            usuario[0].provincia &&
                            usuario[0].codigoPostal &&
                            usuario[0].dni ? (
                                <Link to="/EnvioCorreo">
                                    <h2 className="envios-h2">
                                        <img
                                            className="img-envio"
                                            src={imgEnvio}
                                        />
                                        <div className="titulo-envio">
                                            <h4>
                                                Correo Argentino - Envio al
                                                sucursal
                                            </h4>
                                            <h6 className="fecha-envio">
                                                Llega de 6 a 9 dias habiles
                                            </h6>
                                        </div>
                                        <h6 className="montoAgregado-Envio">
                                            + $700
                                        </h6>
                                    </h2>
                                </Link>
                            ) : (
                                <div
                                    onClick={() =>
                                        alert(
                                            "Informacion de envio necesaria(Provincia, Ciudad, CP, Direccion, DNI, Nombre y Apellido, Nro. Celular)"
                                        )
                                    }
                                >
                                    <h2 className="envios-h2">
                                        <img
                                            className="img-envio"
                                            src={imgEnvio}
                                        />
                                        <div className="titulo-envio">
                                            <h4>
                                                Correo Argentino - Envio al
                                                sucursal
                                            </h4>
                                            <h6 className="fecha-envio">
                                                Llega de 6 a 9 dias habiles
                                            </h6>
                                        </div>

                                        <h6 className="montoAgregado-Envio">
                                            + $700
                                        </h6>
                                    </h2>
                                </div>
                            )}
                            {usuario[0].direccion &&
                            usuario[0].ciudad &&
                            usuario[0].provincia &&
                            usuario[0].codigoPostal &&
                            usuario[0].dni ? (
                                <Link to="/EnvioDomicilio">
                                    <h2 className="envios-h2">
                                        <img
                                            className="img-envio"
                                            src={imgEnvio}
                                        />
                                        <div className="titulo-envio">
                                            <h4>
                                                Correo Argentino - Envio a
                                                domicilio
                                            </h4>
                                            <h6 className="fecha-envio">
                                                Llega de 6 a 9 dias habiles
                                            </h6>
                                        </div>

                                        <h6 className="montoAgregado-Envio">
                                            + $1000
                                        </h6>
                                    </h2>
                                </Link>
                            ) : (
                                <div
                                    onClick={() =>
                                        alert(
                                            "Informacion de envio necesaria(Provincia, Ciudad, CP, Direccion, DNI, Nombre y Apellido, Nro. Celular)"
                                        )
                                    }
                                >
                                    <h2 className="envios-h2">
                                        <img
                                            className="img-envio"
                                            src={imgEnvio}
                                        />
                                        <div className="titulo-envio">
                                            <h4>
                                                Correo Argentino - Envio a
                                                domicilio
                                            </h4>
                                            <h6 className="fecha-envio">
                                                Llega de 6 a 9 dias habiles
                                            </h6>
                                        </div>
                                        <h6 className="montoAgregado-Envio">
                                            + $1000
                                        </h6>
                                    </h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
