import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import { getProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function DijesEnBrutoConAlpaca() {
    const [loading, setLoading] = useState(true);
    const productos = useSelector((state) => state.productos);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    setTimeout(() => {
        setLoading(false);
    }, 1200);
    const filtro = productos?.filter(
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
                                    stock={e.stock}
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
