import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

const ModifEPI = () => {
  const [epi, setEpi] = useState<any>({});
  const { id } = useParams();
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5500/api/epi/${id}`, { headers: { role } })
      .then((res) => {
        const e = res.data;
        setEpi({
          ...e,
          dateAchat: e.dateAchat?.split("T")[0] || "",
          dateFabrication: e.dateFabrication?.split("T")[0] || "",
          dateMiseEnService: e.dateMiseEnService?.split("T")[0] || "",
        });
      })
      .catch((err) => console.error("Erreur chargement EPI", err));
  }, [id, role]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpi({ ...epi, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5500/api/epi/${id}`, epi, { headers: { role } })
      .then(() => {
        alert("EPI modifié !");
        navigate("/gestion-epi");
      })
      .catch((err) => console.error("Erreur modification EPI", err));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Modifier un EPI
        </Typography>

        <Stack spacing={2} sx={{ maxWidth: 600 }}>
          <TextField name="marque" label="Marque" value={epi.marque || ""} onChange={handleChange} />
          <TextField name="modele" label="Modèle" value={epi.modele || ""} onChange={handleChange} />
          <TextField name="numeroSerie" label="N° Série" value={epi.numeroSerie || ""} onChange={handleChange} />
          <TextField name="identifiantPersonnalise" label="Identifiant" value={epi.identifiantPersonnalise || ""} onChange={handleChange} />
          <TextField name="taille" label="Taille" value={epi.taille || ""} onChange={handleChange} />
          <TextField name="couleur" label="Couleur" value={epi.couleur || ""} onChange={handleChange} />

          <TextField
            type="date"
            name="dateAchat"
            label="Date achat"
            InputLabelProps={{ shrink: true }}
            value={epi.dateAchat || ""}
            onChange={handleChange}
          />
          <TextField
            type="date"
            name="dateFabrication"
            label="Date fabrication"
            InputLabelProps={{ shrink: true }}
            value={epi.dateFabrication || ""}
            onChange={handleChange}
          />
          <TextField
            type="date"
            name="dateMiseEnService"
            label="Date mise en service"
            InputLabelProps={{ shrink: true }}
            value={epi.dateMiseEnService || ""}
            onChange={handleChange}
          />

          <TextField
            type="number"
            name="periodiciteControle"
            label="Périodicité (jours)"
            value={epi.periodiciteControle || ""}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Enregistrer les modifications
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ModifEPI;
