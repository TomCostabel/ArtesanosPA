import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import swal from "sweetalert";

export default function DijesConFormas() {
    const [loading, setLoading] = useState(true);
    const productos = useSelector((state) => state.productos);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    setTimeout(() => {
        setLoading(false);
    }, 1200);
    const filtro = productos?.filter((e) => e.categoria == "DIJES CON FORMAS");
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
                                    stock={e.stock}
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
