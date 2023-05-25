import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { infoEnvioAlBack } from "../../redux/actions";

export default function RealizarPago() {
    const userLogeado = localStorage.getItem("emailLogeado");
    const preferenceId = useSelector((state) => state.preferenceId);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const infoEnvio = pathname.slice(1);
    const data = {
        email: userLogeado,
        costoEnvioType: infoEnvio,
    };
    useEffect(() => {
        if (data.email && data.costoEnvioType) {
            dispatch(infoEnvioAlBack(data));
        }
    }, []);
    return (
        <div>
            <Link
                to={`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`}
            >
                <h4>Pagar MP</h4>
            </Link>
        </div>
    );
}
