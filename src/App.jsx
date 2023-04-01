import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import SobreNosotros from "./Components/SobreNosotros/SobreNosotros";
import Catalogo from "./Components/Catalogo/Catalogo";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SobreNosotros" element={<SobreNosotros />} />
            <Route path="/Catalogo" element={<Catalogo />} />
        </Routes>
    );
}

export default App;
