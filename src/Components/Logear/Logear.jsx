import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Logear.css";
import { useDispatch } from "react-redux";
import { postLogin } from "../../redux/actions";

export default function Logear() {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    useEffect(() => {
        // dispatch(postLogin());
        console.log(data);
    }, [dispatch, data]);
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
        console.log("Logeadooooooo");
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
            </div>
        </div>
    );
}
