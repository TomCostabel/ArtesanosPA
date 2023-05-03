import React, { useEffect, useState } from "react";
import "./Register.css";
import NavBar from "../NavBar/NavBar";
import { getUsers, postRegister } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/img/amatistaPNG.png";
export default function Register() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const usersArr = users.filter((e) => e.email === data.email);

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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (usersArr.length === 1) {
            swal("", "Email ya registrado", "warning");
            return;
        }
        if (data.password !== confirmPassword) {
            swal("", "Las contraseñas no coinciden", "warning");
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
                    <div className="register-img">
                        <h2>Registro</h2>
                        <img className="img-registro" src={img} />
                    </div>
                    <div className="form-group">
                        <h4 className="name-form" htmlFor="name">
                            Nombre
                        </h4>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <h4 className="name-form" htmlFor="email">
                            Email
                        </h4>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <h4 className="name-form" htmlFor="password">
                            Contraseña
                        </h4>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <h4 className="name-form" htmlFor="confirmPassword">
                            Confirmar Contraseña
                        </h4>
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
