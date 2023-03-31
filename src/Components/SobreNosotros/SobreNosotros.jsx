import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import "../SobreNosotros/SobreNosotros.css";
import img from "../../assets/img/pareja.png";

export default function SobreNosotros() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1000);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <NavBar />
                    <div className="container-sobrenosotros">
                        <div className="container-central">
                            <h2 className="text-sobrenosotros">
                                Somos una pareja de artesanos, dedicados a
                                buscar la sanación mediante la energía de la
                                naturaleza. Empezamos en el año 2021 vendiendo
                                en diferentes ferias, y estamos muy contentos de
                                poder decir que a dia de hoy nos encontramos
                                realizando envios a todo el pais.
                            </h2>

                            <img className="img-pareja" src={img} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
