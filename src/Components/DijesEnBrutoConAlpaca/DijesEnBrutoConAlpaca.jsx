import React, { useState } from "react";
import Loading from "../Loading/Loading";
import Productos from "../../productos.json";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";

export default function DijesEnBrutoConAlpaca() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1200);
    const filtro = Productos?.filter(
        (e) => e.categoria == "DIJES EN BRUTO CON ALPACA"
    );
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <NavBar />

                    <div className="items-dijesEnBruto">
                        {filtro?.map((e) => {
                            return (
                                <Card
                                    key={e.id}
                                    titulo={e.titulo}
                                    price={e.price}
                                    id={e.id}
                                    image={e.image}
                                    categoria={e.categoria}
                                    descripcion={e.descripcion}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
