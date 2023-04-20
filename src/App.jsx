import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import SobreNosotros from "./Components/SobreNosotros/SobreNosotros";
import Catalogo from "./Components/Catalogo/Catalogo";
import DijesEnBruto from "./Components/DijesEnBruto/DijesEnBruto";
import CardDetail from "./Components/CardDetail/CardDetail";
import DijesEnBrutoConAlpaca from "./Components/DijesEnBrutoConAlpaca/DijesEnBrutoConAlpaca";
import DijesRolados from "./Components/DijesRolados/DijesRolados";
import DijesImportados from "./Components/DijesImportados/DijesImportados";
import DijesConFormas from "./Components/DijesConFormas/DijesConFormas";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/propiedades/:id" element={<CardDetail />} />
            <Route path="/SobreNosotros" element={<SobreNosotros />} />
            <Route path="/Catalogo" element={<Catalogo />} />
            <Route path="/Catalogo/DijesEnBruto" element={<DijesEnBruto />} />
            <Route
                path="/Catalogo/DijesEnBrutoConAlpaca"
                element={<DijesEnBrutoConAlpaca />}
            />
            <Route path="/Catalogo/DijesRolados" element={<DijesRolados />} />
            <Route
                path="/Catalogo/DijesImportados"
                element={<DijesImportados />}
            />
            <Route
                path="/Catalogo/DijesConFormas"
                element={<DijesConFormas />}
            />
            <Route path="/Catalogo" element={<Catalogo />} />
            <Route path="/Catalogo" element={<Catalogo />} />
            <Route path="/Catalogo" element={<Catalogo />} />
        </Routes>
    );
}

export default App;
