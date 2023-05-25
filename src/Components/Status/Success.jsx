import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
    return (
        <div>
            Success
            <Link to="/">
                <h1>Regresar al inicio</h1>
            </Link>
        </div>
    );
}
