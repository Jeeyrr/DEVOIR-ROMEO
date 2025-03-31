import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Projet from "./pages/Projet";
import Epi from "./pages/Epi";



function App() {
    console.log("");

    return (
        <BrowserRouter>
          <div>
            <nav>
              <Link to="/projets">Projets</Link>
              <Link to="/epi">EPI</Link>

            </nav>
      
            <Routes>
              <Route path="/projets" element={<Projet />} />
              <Route path="/epi" element={<Epi />} />

            </Routes>
          </div>
        </BrowserRouter>
      );
}

export default App;
