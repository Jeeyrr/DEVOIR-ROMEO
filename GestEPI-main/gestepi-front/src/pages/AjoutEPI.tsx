import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AjoutEPI = () => {
  const [epi, setEpi] = useState<any>({});
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpi({ ...epi, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5500/api/epi", epi, { headers: { role } })
      .then(() => {
        alert("EPI ajouté !");
        navigate("/gestion-epi");
      })
      .catch((err) => console.error("Erreur ajout EPI", err));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Ajouter un EPI
        </Typography>

        <Stack spacing={2} sx={{ maxWidth: 600 }}>
          <TextField name="marque" label="Marque" onChange={handleChange} />
          <TextField name="modele" label="Modèle" onChange={handleChange} />
          <TextField name="numeroSerie" label="N° Série" onChange={handleChange} />
          <TextField name="identifiantPersonnalise" label="Identifiant" onChange={handleChange} />
          <TextField name="taille" label="Taille" onChange={handleChange} />
          <TextField name="couleur" label="Couleur" onChange={handleChange} />
          <TextField type="date" name="dateAchat" label="Date achat" InputLabelProps={{ shrink: true }} onChange={handleChange} />
          <TextField type="date" name="dateFabrication" label="Date fabrication" InputLabelProps={{ shrink: true }} onChange={handleChange} />
          <TextField type="date" name="dateMiseEnService" label="Date mise en service" InputLabelProps={{ shrink: true }} onChange={handleChange} />
          <TextField type="number" name="periodiciteControle" label="Périodicité (jours)" onChange={handleChange} />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Ajouter
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AjoutEPI;
