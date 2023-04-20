import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";

export default function DijesRolados() {
    const [loading, setLoading] = useState(true);
    const productos = useSelector((state) => state.productos);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    setTimeout(() => {
        setLoading(false);
    }, 1200);
    const filtro = productos?.filter((e) => e.categoria == "DIJES ROLADOS");
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
