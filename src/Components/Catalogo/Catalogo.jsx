import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import "../Catalogo/Catalogo.css";
import imgCatalogo from "../../assets/img/catalogo.png";
import { Link } from "react-router-dom";
// import Productos from "../../productos.json";

export default function Catalogo() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
        // console.log(Productos);
    }, 1200);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <NavBar />
                    <div className="container-principal">
                        <img
                            className="img-catalogo-inicio"
                            src={imgCatalogo}
                        />
                        <div className="container-principal-categoria">
                            <Link to="/Catalogo/DijesEnBrutoConAlpaca">
                                <div className="card-individual-catalogo">
                                    {/* <img className="img-catalogo" src={img} /> */}

                                    <h3 className="titulo-catalogo">
                                        DIJES EN BRUTO CON ALPACA
                                    </h3>
                                </div>
                            </Link>
                            <Link to="/Catalogo/DijesEnBruto">
                                <div className="card-individual-catalogo">
                                    {/* <img className="img-catalogo" src={img} /> */}

                                    <h3 className="titulo-catalogo">
                                        DIJES EN BRUTO
                                    </h3>
                                </div>
                            </Link>
                            <Link to="/Catalogo/DijesRolados">
                                <div className="card-individual-catalogo">
                                    {/* <img className="img-catalogo" src={img} /> */}

                                    <h3 className="titulo-catalogo">
                                        DIJES ROLADOS
                                    </h3>
                                </div>
                            </Link>

                            <Link to="/Catalogo/DijesImportados">
                                <div className="card-individual-catalogo">
                                    {/* <img className="img-catalogo" src={img} /> */}

                                    <h3 className="titulo-catalogo">
                                        DIJES IMPORTADOS
                                    </h3>
                                </div>
                            </Link>
                            <Link to="/Catalogo/DijesConFormas">
                                <div className="card-individual-catalogo">
                                    {/* <img className="img-catalogo" src={img} /> */}
                                    <h3 className="titulo-catalogo">
                                        DIJES CON FORMAS
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
