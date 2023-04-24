import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Logear.css";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, saveEmailAfterLogin } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

export default function Logear() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);
    const saveEmail = useSelector((state) => state.emailAfterLogin);
    console.log("acaaa", saveEmail);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!data.email) return alert("🖋️ Primero complete los campos...");
        dispatch(postLogin(data));
        // Filtro la coincidencia en el usuario logeado para guardarlo en el estado global.
        const usersArr = users?.filter((e) => e.email == data.email);
        console.log("Logeadooooooo", usersArr.email);
        dispatch(saveEmailAfterLogin(usersArr.email));
        if (saveEmail) {
            return navigate("/");
        }
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
