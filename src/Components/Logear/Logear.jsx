import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Logear.css";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, postLogin } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/img/amatistaPNG.png";
import Loading from "../Loading/Loading";

export default function Logear() {
    //------------------------Constantes------------------------>
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    //------------------------UseEffect------------------------>
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, data]);

    //------------------------Handles------------------------>
    const handleChange = (e) => {
        if (e.target.name === "email") {
            setData({
                ...data,

                [e.target.name]: e.target.value.toLowerCase(),
            });
        } else {
            setData({
                ...data,

                [e.target.name]: e.target.value,
            });
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!data.email) return alert("🖋️ Primero complete los campos...");
        if (!data.password) return alert("🖋️ Primero complete los campos...");

        // ----Filtro la coincidencia en el usuario logeado para guardarlo en el estado local.------->
        const usersArr = users?.filter((e) => e.email == data.email);

        if (!usersArr) {
            return alert("🖋️ Email no encontrado en la base de datos");
        }
        if (usersArr[0]?.email !== data.email)
            return alert(" Email o contraseña incorrecta");

        //----------- Uso bcrypt desde el front con "bcryptjs" para comparar las PSS------------------>
        const match = await bcrypt.compare(data.password, usersArr[0].password);

        if (!match) {
            return alert("Email o contraseña incorrecta");
        }
        //--------------Mando la inf para el login y guardo el OBJ para validaciones------------------>

        localStorage.setItem("emailLogeado", usersArr[0]?.email);
        dispatch(postLogin(data));
        // dispatch(saveEmailAfterLogin(usersArr));

        return navigate("/");
    };
    //------------------------Return------------------------>

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
                    <div className="login-container">
                        <form onSubmit={handleSubmit}>
                            <div className="register-img">
                                <h2 className="title-login">Login</h2>
                                <img className="img-registro" src={img} />
                            </div>
                            <h4 className="form-grup-login">
                                Email:
                                <input
                                    className="input-login"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => handleChange(e)}
                                />
                            </h4>
                            <h4 className="form-grup-login">
                                Password:
                                <input
                                    className="input-login"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => handleChange(e)}
                                />
                            </h4>
                            <button className="button-login" type="submit">
                                Login
                            </button>
                            <div className="container-no-cuenta">
                                <h3 className="no-cuenta">No tenes cuenta ?</h3>
                                <Link to="/Register">
                                    <h6 className="registrate">Registrate</h6>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
