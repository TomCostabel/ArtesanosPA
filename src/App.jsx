import { Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/Home" element={<Home />} />
        </Routes>
    );
}

export default App;
