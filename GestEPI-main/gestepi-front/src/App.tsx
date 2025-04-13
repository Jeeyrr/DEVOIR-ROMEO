import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import GestionEPI from "./pages/GestionEPI";
import ModifEPI from "./pages/ModifEPI";
import AjoutEPI from "./pages/AjoutEPI";
import ListeEPIPourControles from "./pages/ListeEPIPourControles";
import ListeControlesEPI from "./pages/ListeControlesEPI";
import AjoutControle from "./pages/AjoutControle";
import GestionUtilisateurs from "./pages/GestionUtilisateurs";
import AjoutUtilisateur from "./pages/AjoutUtilisateur";
import ModifierUtilisateur from "./pages/ModifierUtilisateur";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gestion-epi" element={<GestionEPI />} />
        <Route path="/modif-epi/:id" element={<ModifEPI />} />
        <Route path="/ajout-epi" element={<AjoutEPI />} />

        {/* Nouvelles routes ajoutées */}
        <Route path="/controle" element={<ListeEPIPourControles />} />
        <Route path="/controle/:epiId" element={<ListeControlesEPI />} />
        <Route path="/ajout-controle/:epiId" element={<AjoutControle />} />
        <Route path="/admin/utilisateurs" element={<GestionUtilisateurs />} />
        <Route path="/utilisateurs" element={<GestionUtilisateurs />} />
        <Route path="/ajout-utilisateur" element={<AjoutUtilisateur />} />
        <Route path="/modifier-utilisateur/:id" element={<ModifierUtilisateur />} />

      </Routes>
    </Router>
  );
};

export default App;
