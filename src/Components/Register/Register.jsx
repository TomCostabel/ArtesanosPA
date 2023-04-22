import React, { useEffect, useState } from "react";
import "./Register.css";
import NavBar from "../NavBar/NavBar";
import { getUsers, postRegister } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const usersArr = users.filter((e) => e.email === data.email);
    console.log("aca la coincidencia", usersArr);
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (usersArr.length === 1) {
            alert("Email ya registrado");
            console.log(data);
            return;
        }
        if (data.password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        } else {
            dispatch(postRegister(data));
            console.log("registradooooooo");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="register-form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Registro</h2>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}
