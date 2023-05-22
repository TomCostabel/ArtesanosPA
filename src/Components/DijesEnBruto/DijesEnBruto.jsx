import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import Card from "../Card/Card";
import "../DijesEnBruto/DijesEnBruto.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
export default function DijesEnBruto() {
    const [loading, setLoading] = useState(true);
    const productos = useSelector((state) => state.productos);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    setTimeout(() => {
        setLoading(false);
    }, 1200);
    const filtro = productos?.filter((e) => e.categoria == "DIJES EN BRUTO");
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
