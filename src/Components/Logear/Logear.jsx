import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Logear.css";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, postLogin } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

export default function Logear() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);
    // const saveEmail = useSelector((state) => state.emailAfterLogin);
    // console.log("aca", saveEmail[0].password);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, data]);
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

    return (
        <div>
            <NavBar />
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <div>
                    <h3>No tenes cuenta ?</h3>
                    <Link to="/Register">
                        <h6>Registrate</h6>
                    </Link>
                </div>
            </div>
        </div>
    );
}
