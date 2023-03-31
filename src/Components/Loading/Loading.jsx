import React from "react";
import "../Loading/Loading.css";
import NavBar from "../NavBar/NavBar";

export default function Loading() {
    return (
        <>
            <NavBar />
            <div className="container-loading">
                <div className="spinner"> </div>
            </div>
        </>
    );
}
