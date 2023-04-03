import React, { useState } from "react";
import Productos from "../../productos.json";
import Loading from "../Loading/Loading";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";

export default function DijesRolados() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1200);
    const filtro = Productos?.filter((e) => e.categoria == "DIJES ROLADOS");
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
