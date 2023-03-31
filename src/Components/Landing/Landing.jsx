import React from "react";
import "../Landing/Landing.css";
import { Link } from "react-router-dom";
export default function Landing() {
    return (
        <div className="container-landing">
            <div className="container-centrado-landing">
                <h1 className="title-landing">Bienvenido a Artesanos</h1>
                <Link to="/Home">
                    <h1 className="button-home">HOME</h1>
                </Link>
            </div>
        </div>
    );
}
