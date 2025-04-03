import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Epi from "./pages/Epi";



function App() {
    console.log("");

    return (
        <BrowserRouter>
          <div>
            <nav>
              <Link to="/epi">EPI</Link>

            </nav>
      
            <Routes>
              <Route path="/epi" element={<Epi />} />

            </Routes>
          </div>
        </BrowserRouter>
      );
}

export default App;
