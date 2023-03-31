import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import SobreNosotros from "./Components/SobreNosotros/SobreNosotros";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SobreNosotros" element={<SobreNosotros />} />
        </Routes>
    );
}

export default App;
