import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import img from "../../assets/img/amatistaPNG.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../InfoEnvios/InfoEnvios.css";
import { agregarInformacionEnvio } from "../../redux/actions";
export default function InfoEnvios() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);
    const userLogeado = localStorage.getItem("emailLogeado");

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        email: userLogeado,
        provincia: " ",
        ciudad: "",
        direccion: " ",
        codigoPostal: "",
        dni: "",
        nombreApellido: " ",
        numeroCelular: " ",
    });

    setTimeout(() => {
        setLoading(false);
    }, 1200);
    //------------------------Handles------------------------>
    const handleChange = (e) => {
        setData({
            ...data,

            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        // ----Filtro la coincidencia en el usuario logeado para guardarlo en el estado local.------->
        // const usersArr = users?.filter((e) => e.email == data.email);

        // if (!usersArr) {
        //     return alert("🖋️ Email no encontrado en la base de datos");
        // }
        // if (usersArr[0]?.email !== data.email)
        //     return alert(" Email o contraseña incorrecta");

        if (
            !data.email ||
            !data.provincia ||
            !data.ciudad ||
            !data.codigoPostal ||
            !data.dni ||
            !data.nombreApellido ||
            !data.numeroCelular
        ) {
            return alert("🖋️ Primero complete los campos ...");
        }

        dispatch(agregarInformacionEnvio(data));

        return navigate("/Pagar");
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <NavBar />
                    <div className="infoEnvios-container">
                        <h1 className="titulo-infoEnvios">
                            DATOS NECESARIOS PARA REALIZAR EL ENVIO
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <h4 className="grup-info">
                                Provincia:
                                <input
                                    className="input-login"
                                    type="text"
                                    placeholder="Ej: Buenos Aires, Neuquen, Jujuy ..."
                                    name="provincia"
                                    value={data.provincia}
                                    onChange={(e) => handleChange(e)}
                                />
                            </h4>
                            <h4 className="grup-info">
                                Ciudad:
                                <input
                                    className="input-login"
                                    type="text"
                                    name="ciudad"
                                    placeholder="Ej: Bahia Blanca"
                                    value={data.ciudad}
                                    onChange={(e) => handleChange(e)}
                                />
                            </h4>
                            <h4 className="grup-info">
                                Codigo Postal:
                                <input
                                    className="input-login"
                                    type="number"
                                    placeholder="Ej: 8109"
                                    name="codigoPostal"
                                    value={data.codigoPostal}
                                    onChange={(e) => handleChange(e)}
                                />
                            </h4>
                            <h4 className="grup-info">
                                Direccion:
                                <input
                                    className="input-login"
                                    type="text"
                                    placeholder="Ej: Buchardo 822"
                                    name="direccion"
                                    value={data.direccion}
                                    onChange={(e) => handleChange(e)}
                                />
                            </h4>
                            <h4 className="grup-info">
                                DNI:
                                <input
                                    className="input-login"
                                    type="number"
                                    name="dni"
                                    value={data.dni}
                                    onChange={(e) => handleChange(e)}
                                />
                            </h4>
                            <h4 className="grup-info">
                                Nombre y Apellido:
                                <input
                                    className="input-login"
                                    type="text"
                                    placeholder="Ej: Maria Sanchez"
                                    name="nombreApellido"
                                    value={data.nombreApellido}
                                    onChange={(e) => handleChange(e)}
                                />
                            </h4>
                            <h4 className="grup-info">
                                Celular:
                                <input
                                    className="input-login"
                                    type="number"
                                    placeholder="Ej: +54 1234 123456"
                                    name="numeroCelular"
                                    value={data.numeroCelular}
                                    onChange={(e) => handleChange(e)}
                                />
                            </h4>
                            <button className="button-login" type="submit">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
