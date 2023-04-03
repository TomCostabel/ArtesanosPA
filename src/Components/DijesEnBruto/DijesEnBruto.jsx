import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import Productos from "../../productos.json";
import Card from "../Card/Card";
import "../DijesEnBruto/DijesEnBruto.css";
export default function DijesEnBruto() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1200);
    const filtro = Productos?.filter((e) => e.categoria == "DIJES EN BRUTO");
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